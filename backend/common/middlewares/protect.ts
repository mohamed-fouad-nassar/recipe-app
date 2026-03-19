import jwt from "jsonwebtoken";
import { env } from "../config/env";
import HttpError from "../utils/http-error";
import { httpStatus } from "../constants/http-status";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: string;
  role: string;
}

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
    const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;

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
