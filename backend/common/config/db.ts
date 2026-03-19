import { env } from "./env";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
    process.exit(1);
  }
};
