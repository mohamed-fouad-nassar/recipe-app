import mongoose from "mongoose";

export interface IIngredient {
  name: string;
  quantity: string;
}

export interface IRecipe extends Document {
  title: string;
  description: string;
  image?: string;
  ingredients: IIngredient[];
  steps: string[];
  category: string;
  createdBy: mongoose.Types.ObjectId;
}

export interface IRecipeWithFavorite extends IRecipe {
  isFavorite: boolean;
  isLiked: boolean;
  favoritesCount: number;
  likesCount: number;
}
