import path from "path";
import { Request } from "express";
import HttpError from "../utils/http-error";
import multer, { FileFilterCallback } from "multer";
import { httpStatus } from "../constants/http-status";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/recipes/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const allowedTypes = /jpg|jpeg|png|webp|svg/;
  if (allowedTypes.test(file.mimetype)) cb(null, true);
  else cb(new HttpError(400, httpStatus.ERROR, "Only images are allowed"));
};

export const upload = multer({
  storage,
  fileFilter,
});
