import { Favorite } from "./favorite.model";
import { IFavorite } from "./favorite.types";
import HttpError from "../../common/utils/http-error";
import { httpStatus } from "../../common/constants/http-status";

export const getAllFavorites = async (userId: string): Promise<IFavorite[]> => {
  const favorites = await Favorite.find({ userId })
    .populate({
      path: "recipeId",
      populate: { path: "createdBy", select: "name email" },
    })
    .sort({ createdAt: -1 });
  return favorites;
};

export const addFavorite = async (
  recipeId: string,
  userId: string,
): Promise<IFavorite> => {
  try {
    const favorite = await Favorite.create({ userId, recipeId });
    return favorite;
  } catch (err: any) {
    if (err.code === 11000)
      throw new HttpError(400, httpStatus.FAIL, "Recipe Already in favorites");
    throw err;
  }
};

export const removeFavorite = async (
  recipeId: string,
  userId: string,
): Promise<void> => {
  const favorite = await Favorite.findOne({ userId, recipeId });
  if (!favorite)
    throw new HttpError(404, httpStatus.FAIL, "Recipe not in favorites");

  await favorite.deleteOne();
};
