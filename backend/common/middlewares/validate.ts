// VALIDATION ==> express-validator middleware

import HttpError from "../utils/http-error";
import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.type === "field" ? err.path : undefined,
      message: err.msg,
    }));
    return next(new HttpError(400, JSON.stringify(formattedErrors)));
  }

  return next();
};
