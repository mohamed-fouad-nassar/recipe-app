import {
  addLike as addLikeApi,
  removeLike as removeLikeApi,
  getAllLikes as getAllLikesApi,
} from "./like.service";
import { NextFunction, Response } from "express";
import { catchAsync } from "../../common/utils/catch-async";
import { AuthRequest } from "../../common/middlewares/protect";
import { httpStatus } from "../../common/constants/http-status";

export const getAllLikes = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const likes = await getAllLikesApi(req.user?.id);
    res.json({
      status: httpStatus.SUCCESS,
      message: "Likes fetched successfully",
      data: { likes },
    });
  },
);

export const addLike = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id: recipeId } = req.params;
    const like = await addLikeApi(recipeId as string, req.user?.id);
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Like added successfully",
      data: like,
    });
  },
);

export const removeLike = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id: recipeId } = req.params;
    await removeLikeApi(recipeId as string, req.user?.id);
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Like removed successfully",
      data: null,
    });
  },
);
