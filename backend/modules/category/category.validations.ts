import { body } from "express-validator";

export const categoryValidation = [
  body("name")
    .notEmpty()
    .withMessage("Category Name is required")
    .isString()
    .withMessage("Category Name must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Category Name must be between 3 and 50 characters")
    .trim()
    .escape(),
];
