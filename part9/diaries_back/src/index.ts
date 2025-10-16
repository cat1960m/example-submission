import express from "express";
import diariesRouter from "./routers/diaries";
import { errorMiddleware } from "./middleware/errorMiddleware";


const app = express();
app.use(express.json()); //it is needed to Express can parse JSON bodies

app.get("/api/ping", (_req,res) => {
  res.send("pong");
});

app.use("/api/diaries", diariesRouter);

app.use("/api/ping", (_req,res) => {
  res.send("pong");
});

app.use(errorMiddleware);

const PORT = 3000;

app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
});