import type { DiaryEntry } from "../types";

interface Props {
  diary: DiaryEntry;
}

export const DiaryItem = ({ diary }: Props) => {
  const { date, visibility, weather, comment } = diary;
  const com: string = comment || "-";
  console.log("com", com)
  return (
    <div>
      <h3>{date}</h3>
      <div>visibility: {visibility}</div>
      <div>weather: {weather}</div>
      <div>comment: {com}</div>
    </div>
  );
};
