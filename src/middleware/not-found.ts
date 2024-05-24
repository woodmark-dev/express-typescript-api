import { Response, Request, NextFunction } from "express";
import { CustomError } from "../lib/custom-error.ts";

export function notFound(req: Request, res: Response, next: NextFunction) {
  return next(new CustomError("Resource Not Found", 404));
}
