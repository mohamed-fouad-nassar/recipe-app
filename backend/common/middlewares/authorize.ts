import { AuthRequest } from "./protect";
import HttpError from "../utils/http-error";
import { Response, NextFunction } from "express";

export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new HttpError(401, "No User Provided, Login Required"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new HttpError(403, "You do not have permission to perform this action"),
      );
    }

    next();
  };
};
