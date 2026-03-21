import { ILike } from "./like.types";
import { model, Schema } from "mongoose";

const likeSchema = new Schema<ILike>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId"],
    },
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: [true, "recipeId is required"],
    },
  },
  { timestamps: true },
);

likeSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

export const Like = model<ILike>("Like", likeSchema);
