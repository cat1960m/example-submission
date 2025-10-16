import { useState, type SyntheticEvent } from "react";
import {
    Visibility,
 // Visibility,
  Weather,
  type DiaryEntry,
  type NewDiaryEntry,
} from "../types";
import { getErrorMessage, toNewDiaryEntry } from "../utils";
import services from "../services/diaries";
import z from "zod";

interface Props {
  setError: (value: string) => void;
  addEntry: (value: DiaryEntry) => void;
}

export const AddDiaryEntry = ({ setError, addEntry }: Props) => {
  const [incorrectItems, setIncorrectItems] = useState<string[]>([]);
  const handleSubmit = async (event: SyntheticEvent) => {
    setIncorrectItems([]);
    event.preventDefault();
    console.log("event.target", event.target);
    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);

    const values = {
      date: formData.get("date"),
      weather: formData.get("weather"),
      visibility: formData.get("visibility"),
      comment: formData.get("comment"),
    };
    console.log("values", values)

    try {
      const entry: NewDiaryEntry = toNewDiaryEntry(values);
      const data = await services.addDiaryEntry(entry);
      addEntry(data);
      form.reset();
    } catch (error) {
      setError(getErrorMessage(error));
      if (error instanceof z.ZodError) {
        setIncorrectItems(error.issues.map((issue) => issue.path.toString()));
      }
    }

    console.log("Form values:", values);
  };

  const isError = (path: string) => incorrectItems.includes(path);
  const getStyle = (path: string) => {
    return {
      border: isError(path) ? "1px solid red" : "1px solid transparent",
      padding: "4px"
    };
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "5px" }}
      >
        <label style={getStyle("date")}>
          date:
          <input name="date" placeholder="YYYY-MM-DD" type="date"/>
        </label>
        <label style={getStyle("weather")}>
          weather:
          <select name="weather">
            {Object.values(Weather).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label style={getStyle("visibility")}>
          visibility:
          {Object.values(Visibility).map((item) => (
              <span><input name="visibility" type="radio" value={item}/> {item}{"   "}</span>
            ))}
         {/*  <select name="visibility">
            {Object.values(Visibility).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select> */}
        </label>
        <label style={getStyle("comment")}>
          {" "}
          comment:
          <input name="comment" placeholder="comment" />
        </label>
        <button type="submit" style={{ maxWidth: "50px" }}>
          Add
        </button>
      </form>
    </>
  );
};
