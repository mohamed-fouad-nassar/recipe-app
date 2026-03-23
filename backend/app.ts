import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import cookieParser from "cookie-parser";

import { notFound } from "./common/middlewares/not-found";
import { errorHandler } from "./common/middlewares/error-handle";

import authRoute from "./modules/auth/auth.routes";
import likesRoute from "./modules/like/like.routes";
import recipesRoute from "./modules/recipe/recipe.routes";
import profileRoute from "./modules/profile/profile.routes";
import commentsRoute from "./modules/comment/comment.routes";
import favoritesRoute from "./modules/favorite/favorite.routes";

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

// API Health check
app.get("/api/health", (_, res) => {
  res.json({ message: "API is running 🚀" });
});

// App Routes
app.use("/api/auth", authRoute);
app.use("/api/likes", likesRoute);
app.use("/api/recipes", recipesRoute);
app.use("/api/profile", profileRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/favorites", favoritesRoute);

// Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
