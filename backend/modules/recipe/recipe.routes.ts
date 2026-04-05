import {
  createRecipe,
  removeRecipe,
  updateRecipe,
  getMyRecipes,
  getAllRecipes,
  getRecipeById,
} from "./recipe.controller";
import {
  getRecipesValidation,
  updateRecipeValidation,
  createRecipeValidation,
} from "./recipe.validations";
import { Router } from "express";
import { protect } from "../../common/middlewares/protect";
import { validate } from "../../common/middlewares/validate";
import { uploadSingle } from "../../common/middlewares/upload";
import { objectIdValidation } from "../../common/validations/object-id";

const router = Router();

router.use(protect);

router
  .route("/")
  .get(getRecipesValidation, validate, getAllRecipes)
  .post(uploadSingle("image"), createRecipeValidation, validate, createRecipe);

router.get("/me", getMyRecipes);

router
  .route("/:id")
  .all(objectIdValidation(), validate)
  .get(getRecipeById)
  .patch(uploadSingle("image"), updateRecipeValidation, validate, updateRecipe)
  .delete(removeRecipe);

export default router;
