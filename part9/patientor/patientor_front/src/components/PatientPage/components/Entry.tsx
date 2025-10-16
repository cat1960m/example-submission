import { Diagnose, EntryType, Type } from "../../../../../shared/types";
import { ShowHealthCheckEntry } from "./ShowHealthCheckEntry";
import { ShowHospitalEntry } from "./ShowHospitalEntry";
import { ShowOccupationalHealthcareEntry } from "./ShowOccupationalHealthcareEntry";

export const Entry = ({
  entry,
  diagnoses,
}: {
  entry: EntryType;
  diagnoses: Diagnose[];
}) => {
  const getItem = () => {
    switch (entry.type) {
      case Type.Hospital:
        return <ShowHospitalEntry entry={entry} />;
      case Type.HealthCheck:
        return <ShowHealthCheckEntry entry={entry} />;
      case Type.OccupationalHealthcare:
        return <ShowOccupationalHealthcareEntry entry={entry} />;
    }
  };

  const getColor = () => {
    switch (entry.type) {
      case Type.Hospital:
        return "lightpink";
      case Type.HealthCheck:
        return "lightblue";
      case Type.OccupationalHealthcare:
        return "lightyellow";
    }
  };
  
  return (
    <>
      <div style={{ fontStyle: "italic" }}>-{entry.description}</div>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code}{" "}
            {diagnoses.find((diagnose) => diagnose.code === code)?.name ?? ""}
          </li>
        ))}
        <div style={{margin: "10px", padding: "10px", backgroundColor: getColor()}}>
          {getItem()}
        </div>
      </ul>
    </>
  );
};
