/* eslint-disable @typescript-eslint/no-unsafe-call */
import patients from "../../data/patients";
import {
  EntryType,
  NewPatient,
  Patient,
  PatientBase,
} from "../../../shared/types";
import { v1 as uuid } from "uuid";
import { toEntry } from "../../../shared/utils";

const getBasePatients = (): PatientBase[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

const getPatients = (): Patient[] => patients;

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (newPatient: NewPatient): Patient => {
  const id: string = uuid();

  const patient: Patient = {
    ...newPatient,
    id,
    entries: [],
  };
  patients.push(patient);
  return patient;
};

const getUpdatedPatient = (id: string, data: unknown): Patient | null => {
  try {
    const patientIndex = patients.findIndex((patient) => patient.id === id);
    if (patientIndex >= 0) {
      const patient = patients[patientIndex];
      const entry: EntryType | null = toEntry(data, uuid());

      if (entry) {
        patient.entries =[...patient.entries, entry];
        return patient;
      }

      return null;
    }
    return null;
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
};

export default {
  getPatients,
  getBasePatients,
  addPatient,
  getPatient,
  getUpdatedPatient,
};
