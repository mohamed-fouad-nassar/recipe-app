import {
  addFavorite as addFavoriteApi,
  removeFavorite as removeFavoriteApi,
  getAllFavorites as getAllFavoritesApi,
} from "./favorite.service";
import { NextFunction, Response } from "express";
import { catchAsync } from "../../common/utils/catch-async";
import { AuthRequest } from "../../common/middlewares/protect";
import { httpStatus } from "../../common/constants/http-status";

export const getAllFavorites = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const favorites = await getAllFavoritesApi(req.user?.id);
    res.json({
      status: httpStatus.SUCCESS,
      message: "Favorites fetched successfully",
      data: { favorites },
    });
  },
);

export const addFavorite = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id: recipeId } = req.params;
    const favorite = await addFavoriteApi(recipeId as string, req.user?.id);
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Favorite added successfully",
      data: favorite,
    });
  },
);

export const removeFavorite = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id: recipeId } = req.params;
    await removeFavoriteApi(recipeId as string, req.user?.id);
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Favorite removed successfully",
      data: null,
    });
  },
);
