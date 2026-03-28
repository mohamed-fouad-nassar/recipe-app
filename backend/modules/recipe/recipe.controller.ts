import {
  getRecipesByUser,
  updateRecipe as updateRecipeApi,
  createRecipe as createRecipeApi,
  removeRecipe as removeRecipeApi,
  getAllRecipes as getAllRecipesApi,
  getRecipeById as getRecipeByIdApi,
} from "./recipe.service";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../common/utils/catch-async";
import { AuthRequest } from "../../common/middlewares/protect";
import { httpStatus } from "../../common/constants/http-status";

export const getAllRecipes = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { recipes, total } = await getAllRecipesApi(req.query, req.user?.id);
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Recipes fetched successfully",
      data: { recipes, total },
    });
  },
);

export const createRecipe = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const recipe = await createRecipeApi(req.body, req.user?.id);
    return res.status(201).json({
      status: httpStatus.SUCCESS,
      message: "Recipe created successfully",
      data: { recipe },
    });
  },
);

export const getRecipeById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const recipe = await getRecipeByIdApi(req.params.id as string);
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Recipe fetched successfully",
      data: { recipe },
    });
  },
);

export const updateRecipe = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const recipe = await updateRecipeApi(
      req.params.id as string,
      req.body,
      req.user?.id,
    );
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Recipe updated successfully",
      data: { recipe },
    });
  },
);

export const removeRecipe = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    await removeRecipeApi(
      req.params.id as string,
      req.user?.id,
      req.user?.role,
    );
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Recipe deleted successfully",
      data: null,
    });
  },
);

export const getMyRecipes = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const recipes = await getRecipesByUser(req.user?.id as string);
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Recipes fetched successfully",
      data: { recipes },
    });
  },
);
