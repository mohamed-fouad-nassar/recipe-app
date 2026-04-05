// VALIDATION ==> express-validator middleware
import { validationResult } from "express-validator";
import { httpStatus } from "../constants/http-status";
import { Request, Response, NextFunction } from "express";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();
  else {
    const formattedErrors = errors.array().map((err) => ({
      field: err.type === "field" ? err.path : undefined,
      message: err.msg,
    }));
    console.log("VALIDATION ERRORS", formattedErrors);
    return res.status(400).json({
      status: httpStatus.FAIL,
      message: "Validation Failed",
      errors: formattedErrors,
    });
  }
};
