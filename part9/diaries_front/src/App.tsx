import { useEffect, useState } from "react";
import type { DiaryEntry } from "./types";
import services from "./services/diaries";
import { DiaryItem } from "./components/DiaryItem";
import { AddDiaryEntry } from "./components/AddDiaryEntry";
import { getErrorMessage } from "./utils";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[] | null>(null);
  const [error, setError] = useState<string>("");
  console.log("app");

  const setErrorMessage = (error: string) => {
    setError(error);
    setTimeout(() => setError(""), 5000);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await services.getDiaryEntries();
        setDiaries(data ?? []);
      } catch (error: unknown) {
        setErrorMessage(getErrorMessage(error))
      }
    };

    getData();
  }, []);

  const addEntry = (data: DiaryEntry) => {
    if (!diaries) {
      return;
    }
    setDiaries([...diaries, data]);
  };

  return (
    <>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <AddDiaryEntry setError={setErrorMessage} addEntry={addEntry} />
      {diaries ? (
        <div>
          <h2>Diary entries</h2>
          {diaries.map((item) => (
            <DiaryItem key={item.id} diary={item} />
          ))}
        </div>
      ) : null}
    </>
  );
}

export default App;
