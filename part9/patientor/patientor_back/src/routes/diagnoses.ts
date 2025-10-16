import { Request, Response, Router } from "express";
import { getDiagnoses } from "../services/diagnosesServices";
const diagnosesRouter = Router();

diagnosesRouter.get("/",
  (_req: Request, res: Response) => {
    res.send(getDiagnoses());
  });

export default diagnosesRouter;
