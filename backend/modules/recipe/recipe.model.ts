import { model, Schema } from "mongoose";
import { IIngredient, IRecipe } from "./recipe.types";

const ingredientSchema = new Schema<IIngredient>({
  name: { type: String, required: [true, "Ingredient name is required"] },
  quantity: {
    type: String,
    required: [true, "Ingredient quantity is required"],
  },
});

const recipeSchema = new Schema<IRecipe>(
  {
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String, required: [true, "Description is required"] },
    image: String,
    ingredients: [ingredientSchema],
    steps: [{ type: String, required: [true, "Steps are required"] }],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },
  },
  { timestamps: true },
);

recipeSchema.index({ category: 1 });

export const Recipe = model<IRecipe>("Recipe", recipeSchema);
