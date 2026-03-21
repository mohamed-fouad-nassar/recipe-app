import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET as string,
  jwtAccessExpiry: process.env
    .JWT_ACCESS_TOKEN_EXPIRY as import("ms").StringValue,
  jwtRefreshExpiry: process.env
    .JWT_REFRESH_TOKEN_EXPIRY as import("ms").StringValue,
  tokenSecret: process.env.TOKEN_SECRET as string,
};
