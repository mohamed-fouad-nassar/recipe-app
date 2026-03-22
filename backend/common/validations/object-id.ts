import { param } from "express-validator";

export const objectIdValidation = (fieldName: string = "id") => [
  param(fieldName).isMongoId().withMessage("Invalid MongoDB ObjectId"),
];
