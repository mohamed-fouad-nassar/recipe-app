import { Types } from "mongoose";
import { User } from "./user.model";
import HttpError from "../../common/utils/http-error";
import { httpStatus } from "../../common/constants/http-status";

export const getUserById = async (id: string) => {
  const user = await User.findById(id).select("-password, -refreshToken, -__v");
  if (!user) throw new HttpError(404, httpStatus.FAIL, "User not found");

  return user;
};

export const getUserFullData = async (id: string) => {
  const userObjectId = new Types.ObjectId(id);

  const pipeline = [
    { $match: { _id: userObjectId } },
    {
      $lookup: {
        from: "recipes",
        let: { userId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$createdBy", "$$userId"] },
            },
          },
          { $count: "count" },
        ],
        as: "recipesData",
      },
    },
    {
      $lookup: {
        from: "favorites",
        let: { userId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$userId", "$$userId"] },
            },
          },
          { $count: "count" },
        ],
        as: "favoritesData",
      },
    },
    {
      $lookup: {
        from: "likes",
        let: { userId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$userId", "$$userId"] },
            },
          },
          { $count: "count" },
        ],
        as: "likesData",
      },
    },
    {
      $addFields: {
        recipesCount: {
          $ifNull: [{ $arrayElemAt: ["$recipesData.count", 0] }, 0],
        },
        favoritesCount: {
          $ifNull: [{ $arrayElemAt: ["$favoritesData.count", 0] }, 0],
        },
        likesCount: {
          $ifNull: [{ $arrayElemAt: ["$likesData.count", 0] }, 0],
        },
      },
    },
    {
      $project: {
        password: 0,
        recipesData: 0,
        favoritesData: 0,
        refreshToken: 0,
        likesData: 0,
        __v: 0,
      },
    },
  ];

  const user = await User.aggregate(pipeline);
  if (!user) throw new HttpError(404, httpStatus.FAIL, "User not found");

  return user[0];
};
