import { body, query } from "express-validator";

export const createRecipeValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters")
    .trim()
    .escape(),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .trim()
    .escape(),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .trim()
    .escape(),
  body("ingredients")
    .isArray({ min: 1 })
    .withMessage("Ingredients must be a non-empty array"),
  body("ingredients.*.name")
    .notEmpty()
    .withMessage("Ingredient name is required")
    .trim()
    .escape(),
  body("ingredients.*.quantity")
    .notEmpty()
    .withMessage("Ingredient quantity is required")
    .trim()
    .escape(),
  body("steps")
    .isArray({ min: 1 })
    .withMessage("Steps must be a non-empty array"),
  body("steps.*")
    .notEmpty()
    .withMessage("Each step must be a non-empty string")
    .trim()
    .escape(),
];

export const updateRecipeValidation = [
  body("title").optional().isLength({ min: 3 }),
  body("description").optional(),
  body("category").optional(),
  body("ingredients").optional().isArray(),
  body("steps").optional().isArray(),
];

export const getRecipesValidation = [
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1 }),
  query("search").optional().isString(),
  query("category").optional().isString(),
];
