import { JwtPayload } from "jsonwebtoken";
import HttpError from "../utils/http-error";
import { verifyToken } from "../utils/tokens";
import { httpStatus } from "../constants/http-status";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new HttpError(401, httpStatus.FAIL, "No Token Provided, Login Required"),
    );
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return next(
      new HttpError(
        401,
        httpStatus.FAIL,
        "Invalid or expired token, Login Again",
      ),
    );
  }
};
