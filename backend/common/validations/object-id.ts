import { param } from "express-validator";

export const objectIdValidation = [
  param("id").isMongoId().withMessage("Invalid MongoDB ObjectId"),
];
