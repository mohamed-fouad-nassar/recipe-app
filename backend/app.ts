import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import cookieParser from "cookie-parser";

import { notFound } from "./common/middlewares/not-found";
import { errorHandler } from "./common/middlewares/error-handle";

import authRoutes from "./modules/auth/auth.routes";
import recipeRoutes from "./modules/recipe/recipe.routes";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

// API Health check
app.get("/api/health", (_, res) => {
  res.json({ message: "API is running 🚀" });
});

// App Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
