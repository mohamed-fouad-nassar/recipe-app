import { Comment } from "./comment.model";
import HttpError from "../../common/utils/http-error";
import { httpStatus } from "../../common/constants/http-status";

export const getAllComments = async (recipeId: string) => {
  const comments = await Comment.find({ recipeId })
    .populate({ path: "userId", select: "name email" })
    .sort({ createdAt: -1 });

  if (!comments)
    throw new HttpError(404, httpStatus.FAIL, "Recipe Comments not found");

  return comments;
};

export const createComment = async (
  recipeId: string,
  userId: string,
  data: any,
) => {
  const comment = await Comment.create({
    content: data.content,
    userId,
    recipeId,
  });

  if (!comment)
    throw new HttpError(400, httpStatus.FAIL, "Comment not created");

  return comment;
};

export const updateComment = async (id: string, userId: string, data: any) => {
  const comment = await Comment.findById(id);
  if (!comment) throw new HttpError(404, httpStatus.FAIL, "Comment not found");

  if (comment.userId.toString() !== userId)
    throw new HttpError(
      403,
      httpStatus.FAIL,
      "You not don't have permission to perform this action",
    );

  comment.content = data.content;
  await comment.save();

  return comment;
};

export const deleteComment = async (
  id: string,
  userId: string,
  userRole: string,
) => {
  const comment = await Comment.findById(id);
  if (!comment) throw new HttpError(404, httpStatus.FAIL, "Comment not found");

  if (comment.userId.toString() !== userId && userRole !== "admin")
    throw new HttpError(
      403,
      httpStatus.FAIL,
      "You not don't have permission to perform this action",
    );

  await comment.deleteOne();
};
