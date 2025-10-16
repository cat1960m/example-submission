import express from "express";
import patients from "../services/patientsServices";
import { NewPatient } from "../../../shared/types";
import { toNewPatient } from "../../../shared/utils";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("fetch patients");
  res.json(patients.getPatients());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("fetch patient with id:" + id);
  res.send(patients.getPatient(id));
});

router.post("/", (req, res) => {
  console.log("-----in post");
  const newPatient: NewPatient = toNewPatient(req.body);
  if (newPatient) {
    const patient = patients.addPatient(newPatient);

    res.json(patient);
  }
});

router.put("/:id/entry", (req, res) => {
  const id = req.params.id;
  const body: unknown = req.body;
  console.log("-----in post");
    const patientUpdated  = patients.getUpdatedPatient(id, body);

    res.json(patientUpdated);
  }
);

export default router;
