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

interface Props {
  type: Type;
  onCancel: () => void;
  diagnoses: Diagnose[];
  addEntry: (entry: NewEntryType) => void;
}

export const AddEntry = ({ type, onCancel, diagnoses, addEntry }: Props) => {
  const [error, setError] = useState<string>("");

  const healthCheckRatingEntries = Object.entries(HealthCheckRating).filter(
    (item) => typeof item[1] === "number"
  );

  console.log("healthCheckRatingEntries", healthCheckRatingEntries, Object.entries(Type), Object.entries(HealthCheckRating));

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    setError("");
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const formData: FormData = new FormData(form);

    const dataBase = {
      description: formData.get("description"),
      date: formData.get("date"),
      specialist: formData.get("specialist"),
      diagnosisCodes: formData.getAll("diagnoseCode"),
      type,
    };

    try {
      switch (type) {
        case Type.Hospital: {
          const data = {
            ...dataBase,
            discharge: {
              date: formData.get("dischargeDate"),
              criteria: formData.get("criteria"),
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
            healthCheckRating: Number.parseInt(
              formData.get("healthCheckRating")?.toString() ?? ""
            ),
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
            employerName: formData.get("employeeName"),
            sickLeave: {
              startDate: formData.get("startDate"),
              endDate: formData.get("endDate"),
            },
          };

          console.log("data", data);
          const entry = toNewOccupationalHealthcareEntry(data);
          console.log("========entry", entry);
          addEntry(entry);
          break;
        }
      }

      form.reset();
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
        <label>
          description: <input name="description" />{" "}
        </label>
        <label>
          date: <input name="date" type="date" />
        </label>
        <label>
          specialist: <input name="specialist" />
        </label>
        <label>
          diagnoses:{" "}
          <select multiple name="diagnoseCode">
            {diagnoses.map((item) => (
              <option value={item.code} key={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        {type === Type.Hospital ? (
          <div>
            discharge:
            <div>
              data: <input name="dischargeDate" type="date" />
            </div>
            <div>
              criteria: <input name="criteria" />
            </div>
          </div>
        ) : null}

        {type === Type.HealthCheck ? (
          <div>
            healthCheckRating:
            <select name="healthCheckRating">
              {healthCheckRatingEntries.map((item) => (
                <option value={item[1]} key={item[1]}>
                  {item[0]}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        {type === Type.OccupationalHealthcare ? (
          <div>
            <div>
              employeeName: <input name="employeeName" />
            </div>
            <div>
              sickLeave:
              <div>
                startDate:
                <input name="startDate" type="date" />
              </div>
              <div>
                endDate:
                <input name="endDate" type="date" />
              </div>
            </div>
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
          <button type="submit">Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};
