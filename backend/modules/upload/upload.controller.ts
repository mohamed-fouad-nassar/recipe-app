import { saveFileData } from "./upload.service";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../common/utils/catch-async";
import { httpStatus } from "../../common/constants/http-status";

export const uploadFile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const fileData = saveFileData(req.file);
    res.json({
      status: httpStatus.SUCCESS,
      message: "File uploaded successfully",
      data: fileData,
    });
  },
);
