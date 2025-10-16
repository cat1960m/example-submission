import z from "zod"
import type { newDiarySchema } from "./utils"

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

export type NewDiaryEntry = z.infer<typeof newDiarySchema >

export interface DiaryEntry extends NewDiaryEntry {
    id: number;
}
