import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { Recipe } from "./recipe.model";
import HttpError from "../../common/utils/http-error";
import { IRecipe, IRecipeWithFavorite } from "./recipe.types";
import { AuthRequest } from "../../common/middlewares/protect";
import { httpStatus } from "../../common/constants/http-status";

export const getAllRecipes = async (query: any, userId: string) => {
  const { search, category, page = 1, limit = 12 } = query;

  const pageNum = Number(page);
  const limitNum = Number(limit);

  const match: any = {};

  if (search && search.trim() !== "")
    match.title = { $regex: new RegExp(search.trim(), "i") };

  if (category) {
    if (!mongoose.Types.ObjectId.isValid(category))
      throw new HttpError(400, httpStatus.FAIL, "Invalid category id");

    match.category = new mongoose.Types.ObjectId(category);
  }

  const userObjectId = new mongoose.Types.ObjectId(userId);

  const dataPipeline = [
    { $match: match },
    { $sort: { createdAt: -1 } },
    { $skip: (pageNum - 1) * limitNum },
    { $limit: limitNum },
    {
      $lookup: {
        from: "favorites",
        let: { recipeId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$recipeId", "$$recipeId"] },
            },
          },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              isFavorite: {
                $max: {
                  $cond: [{ $eq: ["$userId", userObjectId] }, 1, 0],
                },
              },
            },
          },
        ],
        as: "favoritesData",
      },
    },
    {
      $lookup: {
        from: "likes",
        let: { recipeId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$recipeId", "$$recipeId"] },
            },
          },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              isLiked: {
                $max: {
                  $cond: [{ $eq: ["$userId", userObjectId] }, 1, 0],
                },
              },
            },
          },
        ],
        as: "likesData",
      },
    },
    {
      $addFields: {
        favoritesCount: {
          $ifNull: [{ $arrayElemAt: ["$favoritesData.count", 0] }, 0],
        },
        isFavorite: {
          $toBool: {
            $ifNull: [{ $arrayElemAt: ["$favoritesData.isFavorite", 0] }, 0],
          },
        },
        likesCount: {
          $ifNull: [{ $arrayElemAt: ["$likesData.count", 0] }, 0],
        },
        isLiked: {
          $toBool: {
            $ifNull: [{ $arrayElemAt: ["$likesData.isLiked", 0] }, 0],
          },
        },
      },
    },
    {
      $project: {
        favoritesData: 0,
        likesData: 0,
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
    { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        category: {
          _id: "$category._id",
          name: "$category.name",
        },
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
        "createdBy.refreshToken": 0,
        "createdBy.__v": 0,
        __v: 0,
      },
    },
  ];
  const totalPipeline = [{ $match: match }, { $count: "count" }];
  const [recipes, totalResult] = await Promise.all([
    Recipe.aggregate(dataPipeline),
    Recipe.aggregate(totalPipeline),
  ]);
  return {
    recipes,
    total: totalResult[0]?.count || 0,
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

  if (recipe.image && recipe.image.includes("uploads/recipes"))
    await deleteRecipeImage(recipe.image);

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

export const deleteRecipeImage = async (imagePath?: string) => {
  if (!imagePath) return;

  const match = imagePath.match(/uploads\/recipes\/(.+)$/);
  if (!match) return;

  const fileName = match[1];
  const fullPath = path.resolve(__dirname, "../../uploads/recipes", fileName);

  try {
    await fs.promises.rm(fullPath, { force: true });
  } catch (err: any) {
    throw new HttpError(
      500,
      httpStatus.FAIL,
      "Failed to delete old recipe image",
    );
  }
};

export const handleRecipeImage = async (
  req: AuthRequest,
): Promise<string | undefined> => {
  if (!req.file) return undefined;

  const newImagePath = `uploads/recipes/${req.file.filename}`;

  if (req.params.id) {
    try {
      const oldRecipe = await getRecipeById(req.params.id as string);
      if (
        oldRecipe.image &&
        oldRecipe.image !== `uploads/recipes/${req.file.filename}`
      )
        await deleteRecipeImage(oldRecipe.image);
    } catch (err) {
      throw new HttpError(500, httpStatus.FAIL, "Failed to get old recipe");
    }
  }
  return newImagePath;
};
