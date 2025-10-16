import { FormEventHandler, useState } from "react";
import {
  Diagnose,
  HealthCheckRating,
  NewEntryType,
  NewHospitalEntry,
  Type,
} from "../../../../../shared/types";
import {
  toNewHealthCheckEntry,
  toNewHospitalEntry,
  toNewOccupationalHealthcareEntry,
} from "../../../../../shared/utils";
import z from "zod";
import { TextFieldMUI } from "./TextFieldMUI";
import { DateMUI } from "./DateMUI";
import { SelectMultiMUI } from "./SelectMultiMUI";
import { SelectMUI } from "./SelectMUI";
import { Button } from "@mui/material";

interface Props {
  type: Type;
  onCancel: () => void;
  diagnoses: Diagnose[];
  addEntry: (entry: NewEntryType) => void;
}

export const AddEntryMUI = ({ type, onCancel, diagnoses, addEntry }: Props) => {
  const [error, setError] = useState<string>("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState<Date | null>(null);
  const [healthCheckRating, setHealthCheckRating] = useState<string>(
    HealthCheckRating.CriticalRisk.toString()
  );
  const [employeeName, setEmployeeName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [criteria, setCriteria] = useState("");

  const healthCheckRatingEntries = Object.entries(HealthCheckRating)
    .filter((item) => typeof item[1] === "number")
    .map((entry) => ({
      value: entry[1].toString(),
      name: entry[0].toString(),
    }));

  console.log(
    "healthCheckRatingEntries",
    healthCheckRatingEntries,
    Object.entries(Type),
    Object.entries(HealthCheckRating)
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    setError("");
    event.preventDefault();

    const dataBase = {
      description,
      date: date?.toISOString().slice(0, 10),
      specialist,
      diagnosisCodes,
      type,
    };
    console.log("dataBase", dataBase);

    try {
      switch (type) {
        case Type.Hospital: {
          const data = {
            ...dataBase,
            discharge: {
              date: dischargeDate?.toISOString().slice(0, 10),
              criteria: criteria,
            },
          };
          console.log("data", data);

          const entry: NewHospitalEntry = toNewHospitalEntry(data);
          console.log("========entry", entry);
          addEntry(entry);
          break;
        }
        case Type.HealthCheck: {
          const data = {
            ...dataBase,
            healthCheckRating: Number.parseInt(healthCheckRating),
          };
          console.log("data", data);
          const entry = toNewHealthCheckEntry(data);
          console.log("========entry", entry);
          addEntry(entry);
          break;
        }
        case Type.OccupationalHealthcare: {
          const data = {
            ...dataBase,
            employerName: employeeName,
            sickLeave: {
              startDate: startDate?.toISOString().slice(0, 10),
              endDate: endDate?.toISOString().slice(0, 10),
            },
          };

          console.log("data", data);
          const entry = toNewOccupationalHealthcareEntry(data);
          console.log("========entry", entry);
          addEntry(entry);
          break;
        }
      }

      onCancel();
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const message = error.issues
          .map((item) => item.path + ":" + item.message)
          .join(";");
        setError(message);
      } else {
        setError("error!!");
      }
      console.log("error", error);
    }
  };
  return (
    <div
      style={{
        border: "1px solid gray",
        borderRadius: "10px",
        backgroundColor: "lightgrey",
        margin: "10px",
        padding: "20px",
      }}
    >
      {error ? <div style={{ color: "red" }}>{error}</div> : null}

      <h2>Add Entry {type}</h2>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "5px" }}
        onSubmit={handleSubmit}
      >
        <TextFieldMUI
          label={"description"}
          value={description}
          setValue={setDescription}
        />
        <DateMUI label={"date"} date={date} setDate={setDate} />
        <TextFieldMUI
          label={"specialist"}
          value={specialist}
          setValue={setSpecialist}
        />
        <SelectMultiMUI
          label="diagnoses"
          options={diagnoses}
          values={diagnosisCodes}
          setValues={setDiagnosisCodes}
        />

        {type === Type.Hospital ? (
          <div>
            discharge:
            <DateMUI
              label={"dischargeDate"}
              date={dischargeDate}
              setDate={setDischargeDate}
            />
            <TextFieldMUI
              label={"criteria"}
              value={criteria}
              setValue={setCriteria}
            />
          </div>
        ) : null}

        {type === Type.HealthCheck ? (
          <SelectMUI
            label={"health check rating"}
            value={healthCheckRating}
            setValue={setHealthCheckRating}
            options={healthCheckRatingEntries}
          />
        ) : null}

        {type === Type.OccupationalHealthcare ? (
          <div>
            <TextFieldMUI
              label={"employeeName"}
              value={employeeName}
              setValue={setEmployeeName}
            />
            <DateMUI
              label={"startDate"}
              date={startDate}
              setDate={setStartDate}
            />
            <DateMUI label={"endDate"} date={endDate} setDate={setEndDate} />
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <Button type="submit" variant="contained" fullWidth>
            Save
          </Button>
          <Button variant="contained" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
