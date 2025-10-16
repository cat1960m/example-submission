import { NextFunction, Request, Response } from "express";
import z from "zod";

export const allError = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  //const message = error instanceof Error ? error.message : "some error";
  const message = error instanceof z.ZodError ? error.issues : "some error";
  res.status(400).send({ error: message });
  next(error);
};
