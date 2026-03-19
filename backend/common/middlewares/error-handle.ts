import HttpError from "../utils/http-error";
import { httpStatus } from "../constants/http-status";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("ERROR: ", err);
  res.status(err.statusCode || 500).json({
    status: httpStatus.ERROR,
    message: err.message || "Internal Server Error",
  });
};
