import { body } from "express-validator";

export const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be at least 3 characters and at most 50 characters")
    .escape(),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .normalizeEmail()
    .escape(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) throw new Error("Passwords do not match");
    return true;
  }),
];

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .normalizeEmail()
    .escape(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
