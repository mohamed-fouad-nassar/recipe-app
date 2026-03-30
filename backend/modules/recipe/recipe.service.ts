import mongoose from "mongoose";
import { Recipe } from "./recipe.model";
import HttpError from "../../common/utils/http-error";
import { IRecipe, IRecipeWithFavorite } from "./recipe.types";
import { httpStatus } from "../../common/constants/http-status";

export const getAllRecipes = async (query: any, userId: string) => {
  const { search, category, page = 1, limit = 10 } = query;

  const match: any = {};

  if (search) match.title = { $regex: search, $options: "i" };

  if (category) {
    if (!mongoose.Types.ObjectId.isValid(category)) {
      throw new HttpError(400, httpStatus.FAIL, "Invalid category id");
    }
    match.category = new mongoose.Types.ObjectId(category);
  }

  const userObjectId = new mongoose.Types.ObjectId(userId);

  const pipeline: any[] = [
    { $match: match },

    {
      $facet: {
        data: [
          {
            $lookup: {
              from: "favorites",
              let: { recipeId: "$_id" },
              pipeline: [
                { $match: { $expr: { $eq: ["$recipeId", "$$recipeId"] } } },
                { $count: "count" },
              ],
              as: "favoritesCountData",
            },
          },
          {
            $lookup: {
              from: "likes",
              let: { recipeId: "$_id" },
              pipeline: [
                { $match: { $expr: { $eq: ["$recipeId", "$$recipeId"] } } },
                { $count: "count" },
              ],
              as: "likesCountData",
            },
          },
          {
            $lookup: {
              from: "favorites",
              let: { recipeId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$recipeId", "$$recipeId"] },
                        { $eq: ["$userId", userObjectId] },
                      ],
                    },
                  },
                },
                { $limit: 1 },
              ],
              as: "isFavoriteData",
            },
          },
          {
            $lookup: {
              from: "likes",
              let: { recipeId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$recipeId", "$$recipeId"] },
                        { $eq: ["$userId", userObjectId] },
                      ],
                    },
                  },
                },
                { $limit: 1 },
              ],
              as: "isLikedData",
            },
          },
          {
            $addFields: {
              favoritesCount: {
                $ifNull: [
                  { $arrayElemAt: ["$favoritesCountData.count", 0] },
                  0,
                ],
              },
              likesCount: {
                $ifNull: [{ $arrayElemAt: ["$likesCountData.count", 0] }, 0],
              },
              isFavorite: { $gt: [{ $size: "$isFavoriteData" }, 0] },
              isLiked: { $gt: [{ $size: "$isLikedData" }, 0] },
            },
          },
          {
            $project: {
              favoritesCountData: 0,
              likesCountData: 0,
              isFavoriteData: 0,
              isLikedData: 0,
            },
          },
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "category",
            },
          },
          {
            $unwind: {
              path: "$category",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              "category.name": 1,
              "category._id": 1,
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
              __v: 0,
            },
          },
          { $sort: { createdAt: -1 } },
          { $skip: (page - 1) * limit },
          { $limit: Number(limit) },
        ],
        total: [{ $count: "count" }],
      },
    },
    {
      $addFields: {
        total: {
          $ifNull: [{ $arrayElemAt: ["$total.count", 0] }, 0],
        },
      },
    },
  ];

  const result = await Recipe.aggregate(pipeline);

  return {
    recipes: result[0]?.data || [],
    total: result[0]?.total || 0,
  };
};

export const createRecipe = async (
  data: any,
  userId: string,
): Promise<IRecipe> => {
  const recipe = await Recipe.create({ ...data, createdBy: userId });
  return recipe;
};

export const getRecipeById = async (id: string): Promise<IRecipe> => {
  const recipe = await Recipe.findById(id)
    .populate("createdBy", "name email")
    .populate("category", "name");
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

export const getRecipesByUser = async (
  userId: string,
): Promise<IRecipeWithFavorite[]> => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const pipeline: any[] = [
    {
      $match: {
        createdBy: userObjectId,
      },
    },
    {
      $lookup: {
        from: "favorites",
        let: { recipeId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$recipeId", "$$recipeId"] } } },
          { $count: "count" },
        ],
        as: "favoritesCountData",
      },
    },
    {
      $lookup: {
        from: "likes",
        let: { recipeId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$recipeId", "$$recipeId"] } } },
          { $count: "count" },
        ],
        as: "likesCountData",
      },
    },
    {
      $lookup: {
        from: "favorites",
        let: { recipeId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$recipeId", "$$recipeId"] },
                  { $eq: ["$userId", userObjectId] },
                ],
              },
            },
          },
          { $limit: 1 },
        ],
        as: "isFavoriteData",
      },
    },
    {
      $lookup: {
        from: "likes",
        let: { recipeId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$recipeId", "$$recipeId"] },
                  { $eq: ["$userId", userObjectId] },
                ],
              },
            },
          },
          { $limit: 1 },
        ],
        as: "isLikedData",
      },
    },
    {
      $addFields: {
        favoritesCount: {
          $ifNull: [{ $arrayElemAt: ["$favoritesCountData.count", 0] }, 0],
        },
        likesCount: {
          $ifNull: [{ $arrayElemAt: ["$likesCountData.count", 0] }, 0],
        },
        isFavorite: { $gt: [{ $size: "$isFavoriteData" }, 0] },
        isLiked: { $gt: [{ $size: "$isLikedData" }, 0] },
      },
    },
    {
      $project: {
        favoritesCountData: 0,
        likesCountData: 0,
        isFavoriteData: 0,
        isLikedData: 0,
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: {
        path: "$category",
        preserveNullAndEmptyArrays: true,
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
        __v: 0,
      },
    },
    { $sort: { createdAt: -1 } },
  ];

  return await Recipe.aggregate<IRecipeWithFavorite>(pipeline);
};
