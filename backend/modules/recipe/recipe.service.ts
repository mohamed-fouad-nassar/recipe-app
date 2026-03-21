import { Recipe } from "./recipe.model";
import HttpError from "../../common/utils/http-error";
import { httpStatus } from "../../common/constants/http-status";

export const getAllRecipes = async (query: any) => {
  const { search, category, page = 1, limit = 10 } = query;

  const filter: any = {};

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  if (category) {
    filter.category = { $regex: category, $options: "i" };
  }

  const recipes = await Recipe.find(filter)
    .populate("createdBy", "name email")
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  return recipes;
};

export const createRecipe = async (data: any, userId: string) => {
  const recipe = await Recipe.create({ ...data, createdBy: userId });
  return recipe;
};

export const getRecipeById = async (id: string) => {
  const recipe = await Recipe.findById(id).populate("createdBy", "name email");
  if (!recipe) throw new HttpError(404, httpStatus.FAIL, "Recipe not found");
  return recipe;
};

export const updateRecipe = async (id: string, data: any, userId: string) => {
  const recipe = await Recipe.findById(id);
  if (!recipe) throw new HttpError(404, httpStatus.FAIL, "Recipe not found");
  if (recipe.createdBy.toString() !== userId)
    throw new HttpError(
      403,
      httpStatus.FAIL,
      "You not don't have permission to perform this action",
    );

  Object.assign(recipe, data);
  await recipe.save();
  return recipe;
};

export const removeRecipe = async (
  id: string,
  userId: string,
  role: string,
) => {
  const recipe = await Recipe.findById(id);
  if (!recipe) throw new HttpError(404, httpStatus.FAIL, "Recipe not found");

  if (recipe.createdBy.toString() !== userId && role !== "admin")
    throw new HttpError(
      403,
      httpStatus.FAIL,
      "You not don't have permission to perform this action",
    );

  await recipe.deleteOne();
};
