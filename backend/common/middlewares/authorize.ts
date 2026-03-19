import { AuthRequest } from "./protect";
import HttpError from "../utils/http-error";
import { Response, NextFunction } from "express";
import { httpStatus } from "../constants/http-status";

export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new HttpError(401, httpStatus.FAIL, "No User Provided, Login Required"),
      );
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new HttpError(
          403,
          httpStatus.FAIL,
          "You do not have permission to perform this action",
        ),
      );
    }

    next();
  };
};
