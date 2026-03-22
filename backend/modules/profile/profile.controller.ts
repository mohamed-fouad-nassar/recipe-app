import { NextFunction, Response } from "express";
import { catchAsync } from "../../common/utils/catch-async";
import { AuthRequest } from "../../common/middlewares/protect";
import { httpStatus } from "../../common/constants/http-status";
import { getUserById, getUserFullData } from "../user/user.service";

export const getCurrentUserProfile = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = await getUserFullData(req.user?.id);
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Profile fetched successfully",
      data: { user },
    });
  },
);

export const getPublicUserProfile = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const user = await getUserById(userId as string);
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Profile fetched successfully",
      data: { user },
    });
  },
);
