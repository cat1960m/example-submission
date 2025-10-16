import { useParams } from "react-router-dom";
import { ChangeEventHandler, useEffect, useState } from "react";
import patientsServices from "../../services/patients";
import diagnosesServices from "../../services/diagnoses";
import Female from "@mui/icons-material/Female";
import Male from "@mui/icons-material/Male";
import Transgender from "@mui/icons-material/Transgender";
import {
  Diagnose,
  Gender,
  NewEntryType,
  Patient,
  Type,
} from "../../../../shared/types";
import { Entry } from "./components/Entry";
import { toPatient } from "../../../../shared/utils";
import { AddEntryMUI } from "./components/AddEntryMUI";

export const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnose[] | null>(null);
  const [entryType, setEntryType] = useState<Type>(Type.HealthCheck);
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);

  const id = useParams().id;
  console.log("id", id);

  useEffect(() => {
    if (!id) {
      return;
    }

    const getItem = async (id: string) => {
      const data = await patientsServices.getPatient(id);
      const patient: Patient = toPatient(data);

      setPatient(patient);
    };

    getItem(id);
  }, [id]);

  useEffect(() => {
    const getDiagnoses = async () => {
      const data = await diagnosesServices.getDiagnoses();
      setDiagnoses(data);
    };

    getDiagnoses();
  }, []);

  if (!patient || !diagnoses) {
    return null;
  }

  const { name, ssn, occupation, gender, entries } = patient;

  const showGender = () => {
    switch (gender) {
      case Gender.Male:
        return <Male />;
      case Gender.Female:
        return <Female />;
      default:
        return <Transgender />;
    }
  };

  const handleChangeEntryType: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const value = event.target.value;
    setEntryType(value as Type);
  };

  const addEntry = async (entry: NewEntryType) => {
    const patientUpdated = await patientsServices.addEntry({
      id: patient.id,
      entry,
    });

    setPatient(patientUpdated);
  };

  return (
    <div>
      <h2 style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        {name}
        {showGender()}
      </h2>
      <div>ssn: {ssn}</div>
      <div>occupation: {occupation}</div>
      {entries.map((entry) => (
        <Entry entry={entry} diagnoses={diagnoses} key={entry.id} />
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <select onChange={handleChangeEntryType}>
          {Object.values(Type).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button onClick={() => setIsNewEntryOpen(true)}>Add new Entry</button>
      </div>
      {isNewEntryOpen ? (
        <AddEntryMUI
          type={entryType}
          onCancel={() => setIsNewEntryOpen(false)}
          diagnoses={diagnoses}
          addEntry={addEntry}
        />
      ) : null}
    </div>
  );
};
