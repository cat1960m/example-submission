import express from "express";
import entries from "../services/diaryService";
import diaryService from "../services/diaryService";
import { NewDiaryEntry } from "../types";
import { toNewDiaryEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(entries.getEntries());
  //res.json(entries.getNonSensitiveEntries());
  //res.json([...entries.getNonSensitiveEntries(), {id: "ooo", visibility: "good"}]);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const entry = entries.getEntry(Number(id));
  if (entry) {
    res.send(entry);
  } else {
    res.sendStatus(404);
  }
  //res.send("all diaries send");
});

router.post<unknown, unknown, NewDiaryEntry>("/", (req, res) => {
  const newDiaryEntry = toNewDiaryEntry(req.body);

  const addedEntry = diaryService.addDiary(newDiaryEntry);
  res.json(addedEntry);
});

export default router;
