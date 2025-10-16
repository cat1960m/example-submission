import { HospitalEntry } from "../../../../../shared/types";

export const ShowHospitalEntry = ({ entry }: { entry: HospitalEntry }) => {
  const { discharge } = entry;
  return (
    <>
      <div>{discharge.date}</div>
      <div>{discharge.criteria}</div>
    </>
  );
};
