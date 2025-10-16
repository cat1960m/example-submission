import z from "zod";
import {
  Visibility,
  Weather,
  type DiaryEntry,
  type NewDiaryEntry,
} from "./types";

export const newDiarySchema = z.object({
  comment: z.string().optional(),
  date: z.string().date(),
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
});

export const toDiaryEntries = (data: unknown): DiaryEntry[] => {
  if (!Array.isArray(data)) {
    throw Error("dat not an array");
  }
  const diaryEntries: DiaryEntry[] = [];

  data.forEach((item) => {
    const entry: DiaryEntry = toDiaryEntry(item);
    diaryEntries.push(entry);
  });

  return diaryEntries;
};

export const toNewDiaryEntry = (item: unknown): NewDiaryEntry => {
  if (!(!!item && typeof item === "object")) {
    throw Error("incorrect data item");
  }
  const entry = z.parse(newDiarySchema, item);
  return entry;
};

export const toDiaryEntry = (item: unknown): DiaryEntry => {
  const newEntry: NewDiaryEntry = toNewDiaryEntry(item);

  if (!(!!item && typeof item === "object" && "id" in item)) {
    throw Error("incorrect data item - no id");
  }

  const id: number = z.number().min(1).parse(item.id);

  return { ...newEntry, id };
};

export const getErrorMessage = (error: unknown): string => {
  console.log("=======error", error);
  if (error instanceof z.ZodError) {
   return (
      error.issues.map((issue) => issue.path + " :" + issue.message).join("; ")
    );
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return "error!!";
  }
};
