import { UploadedFileResponse } from "./upload.types";
import HttpError from "../../common/utils/http-error";
import { httpStatus } from "../../common/constants/http-status";

export const saveFileData = (
  file?: Express.Multer.File,
): UploadedFileResponse => {
  if (!file) throw new HttpError(400, httpStatus.FAIL, "No file uploaded");
  return {
    filename: file.filename,
    path: file.path,
    size: file.size,
    mimetype: file.mimetype,
  };
};
