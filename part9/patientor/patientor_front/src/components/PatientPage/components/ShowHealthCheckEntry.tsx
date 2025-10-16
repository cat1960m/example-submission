import {
  HealthCheckEntry,
  HealthCheckRating,
} from "../../../../../shared/types";

export const ShowHealthCheckEntry = ({
  entry,
}: {
  entry: HealthCheckEntry;
}) => {
  const { healthCheckRating } = entry;
  const obj = HealthCheckRating as object;
  console.log("typeof HealthCheckRating", typeof HealthCheckRating);
  return (
    <>
      <div>
        rating:{" "}
        {Object.keys(obj).find(
          (key) =>
            HealthCheckRating[key as keyof typeof HealthCheckRating] ===
            healthCheckRating
        ) ?? ""}
      </div>
    </>
  );
};
