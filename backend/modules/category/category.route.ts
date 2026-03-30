import {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
  getAllCategories,
} from "./category.controller";
import { Router } from "express";
import { protect } from "../../common/middlewares/protect";
import { categoryValidation } from "./category.validations";
import { validate } from "../../common/middlewares/validate";
import { authorize } from "../../common/middlewares/authorize";
import { objectIdValidation } from "../../common/validations/object-id";

const router = Router();

router.use(protect);

router
  .route("/")
  .get(getAllCategories)
  .post(authorize("admin"), categoryValidation, validate, createCategory);

router
  .route("/:id")
  .all(objectIdValidation(), validate)
  .get(getCategoryById)
  .patch(authorize("admin"), categoryValidation, validate, updateCategory)
  .delete(authorize("admin"), deleteCategory);

export default router;
