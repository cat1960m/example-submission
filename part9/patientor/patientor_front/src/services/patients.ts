import axios from "axios";
import { PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";
import { NewEntryType, Patient } from "../../../shared/types";
import { toPatient, toPatients } from "../../../shared/utils";

const getAll = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/patients`);

  const patients: Patient[] = toPatients(data);

  return patients;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post(`${apiBaseUrl}/patients`, {
    ...object,
    entries: [],
  });

  const patient = toPatient(data);
  return patient;
};

const addEntry = async ({id, entry}: {id: string, entry: NewEntryType}) => {
  const {data} = await axios.put(`${apiBaseUrl}/patients/${id}/entry`, entry);

  const patientUpdated = toPatient(data);
  return patientUpdated;

};

export default {
  getAll,
  getPatient,
  create,
  addEntry
};
