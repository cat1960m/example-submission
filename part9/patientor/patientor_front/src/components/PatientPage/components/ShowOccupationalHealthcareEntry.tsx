import { OccupationalHealthcareEntry } from "../../../../../shared/types";

export const ShowOccupationalHealthcareEntry = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  const { employerName, sickLeave } = entry;
  return (
    <>
      <div>employerName: {employerName}</div>
      {sickLeave ? (
        <div style={{padding: "10px", border: "1px solid lightgray"}}>
          <div>start: {sickLeave.startDate}</div>
          <div>end: {sickLeave.endDate}</div>
        </div>
      ) : null}
    </>
  );
};
