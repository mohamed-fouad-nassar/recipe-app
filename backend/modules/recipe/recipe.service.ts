import mongoose from "mongoose";
import { Recipe } from "./recipe.model";
import { IRecipe } from "./recipe.types";
import HttpError from "../../common/utils/http-error";
import { httpStatus } from "../../common/constants/http-status";

interface IRecipeWithFavorite extends IRecipe {
  isFavorite: boolean;
  isLiked: boolean;
  favoritesCount: number;
  likesCount: number;
}

export const getAllRecipes = async (
  query: any,
  userId: string,
): Promise<IRecipeWithFavorite[]> => {
  const { search, category, page = 1, limit = 10 } = query;
  const match: any = {};
  if (search) match.title = { $regex: search, $options: "i" };
  if (category) match.category = { $regex: category, $options: "i" };
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const pipeline: any[] = [
    { $match: match },
    {
      $lookup: {
        from: "favorites",
        localField: "_id",
        foreignField: "recipeId",
        as: "favorites",
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "recipeId",
        as: "likes",
      },
    },
    {
      $addFields: {
        favoritesCount: { $size: "$favorites" },
        likesCount: { $size: "$likes" },
        isFavorite: {
          $in: [userObjectId, "$favorites.userId"],
        },
        isLiked: {
          $in: [userObjectId, "$likes.userId"],
        },
      },
    },
    {
      $project: {
        favorites: 0,
        likes: 0,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
      },
    },
    { $unwind: "$createdBy" },
    {
      $project: {
        "createdBy.password": 0,
        "createdBy.__v": 0,
        "createdBy.refreshToken": 0,
        "createdBy.createdAt": 0,
        "createdBy.updatedAt": 0,
        __v: 0,
      },
    },
    { $sort: { createdAt: -1 } },
    { $skip: (page - 1) * limit },
    { $limit: Number(limit) },
  ];

  const recipes = await Recipe.aggregate<IRecipeWithFavorite>(pipeline);
  return recipes;
};
export const createRecipe = async (
  data: any,
  userId: string,
): Promise<IRecipe> => {
  const recipe = await Recipe.create({ ...data, createdBy: userId });
  return recipe;
};

export const getRecipeById = async (id: string): Promise<IRecipe> => {
  const recipe = await Recipe.findById(id).populate("createdBy", "name email");
  if (!recipe) throw new HttpError(404, httpStatus.FAIL, "Recipe not found");
  return recipe;
};

export const updateRecipe = async (
  id: string,
  data: any,
  userId: string,
): Promise<IRecipe> => {
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
): Promise<void> => {
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
