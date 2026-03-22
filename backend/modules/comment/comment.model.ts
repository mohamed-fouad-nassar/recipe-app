import { model, Schema } from "mongoose";
import { IComment } from "./comment.types";

const commentSchema = new Schema<IComment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: [true, "RecipeId is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      minLength: [3, "Content must be at least 3 characters"],
      maxLength: [500, "Content must be at most 500 characters"],
    },
  },
  { timestamps: true },
);

export const Comment = model<IComment>("Comment", commentSchema);
