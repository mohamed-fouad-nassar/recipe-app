import { Like } from "./like.model";
import { ILike } from "./like.types";
import HttpError from "../../common/utils/http-error";
import { httpStatus } from "../../common/constants/http-status";

export const getAllLikes = async (userId: string): Promise<ILike[]> => {
  const likes = await Like.find({ userId })
    .populate({
      path: "recipeId",
      populate: { path: "createdBy", select: "name email" },
    })
    .sort({ createdAt: -1 });
  return likes;
};

export const addLike = async (
  recipeId: string,
  userId: string,
): Promise<ILike> => {
  try {
    const like = await Like.create({ userId, recipeId });
    return like;
  } catch (err: any) {
    if (err.code === 11000)
      throw new HttpError(400, httpStatus.FAIL, "Recipe Already in likes");
    throw err;
  }
};

export const removeLike = async (
  recipeId: string,
  userId: string,
): Promise<void> => {
  const like = await Like.findOne({ userId, recipeId });
  if (!like) throw new HttpError(404, httpStatus.FAIL, "Recipe not in likes");
  await like.deleteOne();
};
