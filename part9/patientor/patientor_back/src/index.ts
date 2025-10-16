import express from "express";
import patientRouter from "./routes/patients";
import diagnosesRouter from "./routes/diagnoses";
import { allError } from "./middlewares/allErrors";

const app = express();
app.use(express.json());

app.get("/api/ping", (_req, res) => {
    res.send("pong");
});

app.use("/api/patients", patientRouter);
app.use("/api/diagnoses", diagnosesRouter);

app.use(allError);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`serveRis running on port ${PORT}`);
});