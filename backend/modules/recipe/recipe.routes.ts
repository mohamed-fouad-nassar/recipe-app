import {
  createRecipeValidation,
  getRecipesValidation,
  updateRecipeValidation,
} from "./recipe.validations";
import {
  createRecipe,
  removeRecipe,
  updateRecipe,
  getAllRecipes,
  getRecipeById,
} from "./recipe.controller";
import { Router } from "express";
import { protect } from "../../common/middlewares/protect";
import { validate } from "../../common/middlewares/validate";
import { objectIdValidation } from "../../common/validations/object-id";

const router = Router();

router.use(protect);

router
  .route("/")
  .get(getRecipesValidation, validate, getAllRecipes)
  .post(createRecipeValidation, validate, createRecipe);

router
  .route("/:id")
  .all(objectIdValidation(), validate)
  .get(getRecipeById)
  .patch(updateRecipeValidation, validate, updateRecipe)
  .delete(removeRecipe);

export default router;
