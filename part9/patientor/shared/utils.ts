import {
  Diagnose,
  Gender,
  HealthCheckRating,
  HospitalEntry,
  NewEntryType,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  NewPatient,
  Patient,
  Type,
  EntryType,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
} from "./types";
import z from "zod";

export const toNewPatientOld = (obj: unknown): NewPatient => {
  if (!obj || typeof obj !== "object") {
    throw Error("empty or incorrect data");
  }

  if (
    !(
      "name" in obj &&
      "dateOfBirth" in obj &&
      "ssn" in obj &&
      "gender" in obj &&
      "occupation" in obj
    )
  ) {
    throw Error("incorrect or empty data field ");
  }

  const newPatient: NewPatient = {
    name: parseName(obj.name),
    dateOfBirth: parseDateOfBirth(obj.dateOfBirth),
    ssn: parseSsn(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseOccupation(obj.occupation),
    entries: [],
  };

  return newPatient;
};

const isString = (str: unknown): str is Gender => {
  return (!!str && typeof str === "string") || str instanceof String;
};

const isGender = (gender: unknown): gender is Gender => {
  return (
    isString(gender) &&
    Object.values(Gender)
      .map((item) => item.toString())
      .includes(gender)
  );
};

const parseDateOfBirth = (item: unknown): string => {
  if (isString(item) && !!Date.parse(item)) {
    return item;
  } else {
    throw Error("Empty or incorrect date: " + item);
  }
};

const parseName = (item: unknown): string => {
  if (isString(item)) {
    return item;
  } else {
    throw Error("Empty or incorrect name: " + item);
  }
};

const parseSsn = (item: unknown): string => {
  if (isString(item)) {
    return item;
  } else {
    throw Error("Empty or incorrect ssn: " + item);
  }
};

const parseGender = (item: unknown): Gender => {
  if (isGender(item)) {
    return item;
  } else {
    throw Error("Empty or incorrect gender: " + item);
  }
};

const parseOccupation = (item: unknown): string => {
  if (isString(item)) {
    return item;
  } else {
    throw Error("Empty or incorrect occupation: " + item);
  }
};
///////////////////////
export const NewBaseEntrySchema = z.object({
  description: z.string().min(1),
  date: z.string(), // or z.coerce.date() if you want auto-parsing
  specialist: z.string().min(1),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const BaseEntrySchema = NewBaseEntrySchema.extend({
  id: z.string(),
});

export const NewHealthCheckEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal(Type.HealthCheck),
  healthCheckRating: z.enum(HealthCheckRating),
});

export const HealthCheckEntrySchema = NewHealthCheckEntrySchema.extend({
  id: z.string(),
});

export const NewOccupationalHealthcareEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal(Type.OccupationalHealthcare),
  employerName: z.string().min(1),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .refine((data) => data.startDate < data.endDate, {
      message: "startDate must be before endDate",
      path: ["endDate"], // optional: attach error to a specific field
    })
    .optional(),
});

export const OccupationalHealthcareEntrySchema =
  NewOccupationalHealthcareEntrySchema.extend({
    id: z.string(),
  });

export const NewHospitalEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal(Type.Hospital),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string().min(1),
  }),
});

export const HospitalEntrySchema = NewHospitalEntrySchema.extend({
  id: z.string(),
});

export const EntrySchema = z.union([
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);

export const NewEntrySchema = z.union([
  NewHealthCheckEntrySchema,
  NewOccupationalHealthcareEntrySchema,
  NewHospitalEntrySchema,
]);

export const newPatientsSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  dateOfBirth: z.iso.date(),
  ssn: z.string().min(1, { message: "SSN cannot be empty" }),
  gender: z.enum(Gender),
  occupation: z.string().min(1, { message: "Occupation cannot be empty" }),
  entries: z.array(EntrySchema),
});

export const patientSchema = newPatientsSchema.extend({
  id: z.string().min(1),
});

export const patientListSchema = z.array(patientSchema);

export const CodeSchema = z.string();

export const DiagnoseSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export const DiagnoseListSchema = z.array(DiagnoseSchema);

export const toPatients = (data: unknown): Patient[] => {
  try {
    const items: Patient[] = patientListSchema.parse(data);

    return items;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export const toNewPatient = (obj: unknown): NewPatient => {
  const newPatient: NewPatient = newPatientsSchema.parse(obj);
  return newPatient;
};

export const toPatient = (obj: unknown): Patient => {
  const patient: Patient = patientSchema.parse(obj);
  return patient;
};

export const toDiagnoses = (data: unknown): Diagnose[] => {
  try {
    const diagnoses: Diagnose[] = DiagnoseListSchema.parse(data);
    return diagnoses;
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.log(
        "Zod parse error:",
        error.issues.map((item) => item.message)?.join(",")
      );
    } else {
      console.log("Unknown error during parsing");
    }
    return [];
  }
};

export const toNewHospitalEntry = (data: unknown): NewHospitalEntry => {
  const entry: NewHospitalEntry = NewHospitalEntrySchema.parse(data);
  return entry;
};

export const toNewHealthCheckEntry = (data: unknown): NewHealthCheckEntry => {
  const entry: NewHealthCheckEntry = NewHealthCheckEntrySchema.parse(data);
  return entry;
};

export const toNewOccupationalHealthcareEntry = (
  data: unknown
): NewOccupationalHealthcareEntry => {
  const entry: NewOccupationalHealthcareEntry =
    NewOccupationalHealthcareEntrySchema.parse(data);
  return entry;
};

export const toNewEntry = (data: unknown): NewEntryType => {
  const newEntry: NewEntryType = NewEntrySchema.parse(data);
  return newEntry;
};

export const toEntry = (data: unknown, id: string): EntryType | null=> {
   const newEntry = toNewEntry(data);
  try {
   
    switch (newEntry.type) {
      case Type.Hospital: {
        const dat: HospitalEntry = { ...newEntry, id };
        return dat;
      }
      case Type.HealthCheck: {
        const dat: HealthCheckEntry = { ...newEntry, id };
        return dat;
      }
      case Type.OccupationalHealthcare: {
        const dat: OccupationalHealthcareEntry = { ...newEntry, id };
        return dat;
      }
      default: return null;
    }
  } catch (error) {
    return null;
  }
};
