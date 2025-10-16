import z from "zod";
import { newPatientsSchema,  patientSchema, BaseEntrySchema, DiagnoseSchema, HospitalEntrySchema, OccupationalHealthcareEntrySchema, HealthCheckEntrySchema, NewHospitalEntrySchema, NewOccupationalHealthcareEntrySchema, NewHealthCheckEntrySchema } from "./utils";

export type Code = string;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum Type {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
}

/* export interface Diagnose {
  code: Code;
  name: string;
  latin?: string;
} */

/* export interface BaseEntryType {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose["code"]>;
} */

/* export interface HealthCheckEntry extends BaseEntryType {
  type: Type.HealthCheck;
  healthCheckRating: HealthCheckRating;
} */

/* export interface OccupationalHealthcareEntry extends BaseEntryType {
  type: Type.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
} */

/* export interface HospitalEntry extends BaseEntryType {
  type: Type.Hospital;
  discharge: {
    date: string;
    criteria: string;
  };
} */

/* export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NewPatient = Omit<Patient, "id">; 

export type Entry =
  | OccupationalHealthcareEntry
  | HospitalEntry
  | HealthCheckEntry;*/

export type NewPatient = z.infer<typeof newPatientsSchema>;

export type Patient = z.infer<typeof patientSchema>;

export type PatientBase = Omit<Patient, "ssn" | "entries">;

export type BaseEntry = z.infer<typeof BaseEntrySchema>;
export type Diagnose = z.infer<typeof DiagnoseSchema>;

export type HospitalEntry =z.infer<typeof HospitalEntrySchema>;
export type NewHospitalEntry = z.infer<typeof NewHospitalEntrySchema>;

export type OccupationalHealthcareEntry = z.infer<typeof OccupationalHealthcareEntrySchema>;
export type NewOccupationalHealthcareEntry = z.infer<typeof NewOccupationalHealthcareEntrySchema>;

export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;
export type NewHealthCheckEntry =  z.infer<typeof NewHealthCheckEntrySchema>;


export type EntryType = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
export type NewEntryType = NewHospitalEntry | NewOccupationalHealthcareEntry | NewHealthCheckEntry;
