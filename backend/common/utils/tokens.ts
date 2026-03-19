import crypto from "crypto";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const signAccessToken = (id: string, role: string): string =>
  jwt.sign({ id, role }, env.jwtSecret, {
    expiresIn: env.jwtAccessExpiry as import("ms").StringValue,
  });

export const signRefreshToken = (userId: string): string =>
  jwt.sign({ id: userId }, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiry as import("ms").StringValue,
  });

export const hashToken = (token: string): string =>
  crypto.createHash("sha256").update(token).digest("hex");
