import {newDiarySchema} from "./utils";
import z from "zod";

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Windy = "windy",
  Stormy = "stormy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface DiaryEntryOld {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NewDiaryEntryOld = Omit<DiaryEntryOld, "id">;

export type NewDiaryEntry = z.infer<typeof newDiarySchema>;
export interface DiaryEntry extends NewDiaryEntry {
  id: number;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
