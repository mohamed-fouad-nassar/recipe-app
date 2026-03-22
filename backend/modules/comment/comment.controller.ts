import {
  createComment,
  deleteComment,
  updateComment,
  getAllComments,
} from "./comment.service";
import { NextFunction, Response } from "express";
import { catchAsync } from "../../common/utils/catch-async";
import { AuthRequest } from "../../common/middlewares/protect";
import { httpStatus } from "../../common/constants/http-status";

export const getAllCommentsByRecipeId = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { recipeId } = req.params;
    const comments = await getAllComments(recipeId as string);
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Comments fetched successfully",
      data: { comments },
    });
  },
);

export const createCommentByRecipeId = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { recipeId } = req.params;
    const comment = await createComment(
      recipeId as string,
      req.user?.id,
      req.body,
    );
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Comment created successfully",
      data: { comment },
    });
  },
);

export const updateCommentById = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const comment = await updateComment(
      commentId as string,
      req.user?.id,
      req.body,
    );
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Comment updated successfully",
      data: { comment },
    });
  },
);

export const deleteCommentById = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    await deleteComment(commentId as string, req.user?.id, req.user?.role);
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Comment deleted successfully",
      data: null,
    });
  },
);
