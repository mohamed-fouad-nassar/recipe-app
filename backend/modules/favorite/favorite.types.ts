import mongoose from "mongoose";

export interface IFavorite {
  userId: mongoose.Types.ObjectId;
  recipeId: mongoose.Types.ObjectId;
}
