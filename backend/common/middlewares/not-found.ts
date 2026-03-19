import HttpError from "../utils/http-error";
import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  return next(new HttpError(404, `Route ${req.originalUrl} not found`));
};
