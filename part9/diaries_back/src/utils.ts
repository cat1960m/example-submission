import { NewDiaryEntry, Visibility, Weather } from "./types";
import z from "zod";

export const isString = (data: unknown): data is string => {
  return typeof data === "string" || data instanceof String;
};

export const parseComment = (comment: unknown): string | undefined => {
  if (!comment) {
    return undefined;
  }

  if (!isString(comment)) {
    throw Error("Incorrect comment");
  }

  return comment;
};

const isDate = (date: string): boolean => {
  return !!Date.parse(date);
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw Error("Incorrect or missing data");
  }

  return date;
};

const isVisibility = (visibility: string): visibility is Visibility => {
  return !!Object.values(Visibility)
    .map((item) => item.toString())
    .includes(visibility);
};

export const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
    throw Error("Incorrect or missing visibility: " + visibility);
  }

  return visibility;
};

const isWeather = (weather: string): weather is Weather => {
  return !!Object.values(Weather)
    .map((item) => item.toString())
    .includes(weather);
};

export const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isString(weather) || !isWeather(weather)) {
    throw Error("Incorrect or missing weather: " + weather);
  }

  return weather;
};

export const toNewDiaryEntryOld = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "comment" in object &&
    "date" in object &&
    "weather" in object &&
    "visibility" in object
  ) {
    const newEntry: NewDiaryEntry = {
      comment: parseComment(object.comment),
      date: parseDate(object.date),
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  const newDiary: NewDiaryEntry = newDiarySchema.parse(object);

  return newDiary;
};

export const newDiarySchema = z.object({
  comment: z.string().optional(),
  date: z.string().date(),
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
});
