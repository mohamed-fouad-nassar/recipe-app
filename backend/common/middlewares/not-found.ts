import HttpError from "../utils/http-error";
import { httpStatus } from "../constants/http-status";
import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  return next(
    new HttpError(404, httpStatus.FAIL, `Route ${req.originalUrl} not found`),
  );
};
