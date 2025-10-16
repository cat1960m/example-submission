import diaryEntries from "../../data/entries";
import {
  DiaryEntry,
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
} from "../types";

const getEntries = (): DiaryEntry[] => diaryEntries;

const getEntry = (id: number): DiaryEntry | undefined =>
  diaryEntries.find((item) => item.id === id);

/* const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries;
}; */

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryEntries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = ({
  date,
  weather,
  visibility,
  comment,
}: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaryEntries.map((d) => d.id)) + 1,
    date,
    weather,
    visibility,
    comment,
  };

  diaryEntries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  getEntry,
  addDiary,
  getNonSensitiveEntries,
};
