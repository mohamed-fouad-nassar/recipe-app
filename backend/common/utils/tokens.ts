import crypto from "crypto";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
interface JwtPayload {
  id: string;
  role: string;
}

interface JwtRefreshPayload {
  id: string;
}

export const signAccessToken = (id: string, role: string): string =>
  jwt.sign({ id, role }, env.jwtSecret, {
    expiresIn: env.jwtAccessExpiry,
  });

export const signRefreshToken = (userId: string): string =>
  jwt.sign({ id: userId }, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiry,
  });

export const hashToken = (token: string): string =>
  crypto.createHmac("sha256", env.tokenSecret).update(token).digest("hex");

export const verifyToken = (token: string) =>
  jwt.verify(token, env.jwtSecret) as JwtPayload;

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, env.jwtRefreshSecret) as JwtRefreshPayload;
