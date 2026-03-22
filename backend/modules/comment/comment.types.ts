import mongoose, { Document } from "mongoose";

export interface IComment extends Document {
  userId: mongoose.Types.ObjectId;
  recipeId: mongoose.Types.ObjectId;
  content: string;
}
