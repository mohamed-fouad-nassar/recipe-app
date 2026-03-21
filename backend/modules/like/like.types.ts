import mongoose, { Document } from "mongoose";

export interface ILike extends Document {
  userId: mongoose.Types.ObjectId;
  recipeId: mongoose.Types.ObjectId;
}
