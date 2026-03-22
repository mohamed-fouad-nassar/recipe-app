import {
  getCommentById,
  deleteCommentById,
  updateCommentById,
  createCommentByRecipeId,
  getAllCommentsByRecipeId,
} from "./comment.controller";
import { Router } from "express";
import { commentValidation } from "./comment.validations";
import { protect } from "../../common/middlewares/protect";
import { validate } from "../../common/middlewares/validate";
import { objectIdValidation } from "../../common/validations/object-id";

const router = Router();

router.use(protect);

router
  .route("/:recipeId")
  .all(objectIdValidation("recipeId"), validate)
  .get(getAllCommentsByRecipeId)
  .post(commentValidation, validate, createCommentByRecipeId);

router
  .route("/:commentId")
  .all(objectIdValidation("commentId"), validate)
  .get(getCommentById)
  .patch(commentValidation, validate, updateCommentById)
  .delete(deleteCommentById);

export default router;
