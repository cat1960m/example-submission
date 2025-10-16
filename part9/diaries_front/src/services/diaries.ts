import axios from "axios";
import { toDiaryEntries, toDiaryEntry } from "../utils";
import type { NewDiaryEntry } from "../types";

const baseURL = "/api/diaries";

const getDiaryEntries = async () => {
  console.log("getDiaries");
  const result = await axios.get(baseURL);
  console.log("result", result);

  return toDiaryEntries(result.data);
};

const addDiaryEntry = async (entry: NewDiaryEntry) => {
  console.log("addDiaryEntry");
  const result = await axios.post(baseURL, entry);
  console.log("result", result);

  return toDiaryEntry(result.data);
};

export default {getDiaryEntries, addDiaryEntry}
