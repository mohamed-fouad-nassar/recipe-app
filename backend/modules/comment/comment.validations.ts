import { body } from "express-validator";

export const commentValidation = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 3, max: 500 })
    .withMessage(
      "Content must be at least 3 characters, and at most 500 characters",
    )
    .escape(),
];
