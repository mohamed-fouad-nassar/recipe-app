import {
  addFavorite,
  removeFavorite,
  getAllFavorites,
} from "./favorite.controller";
import { Router } from "express";
import { protect } from "../../common/middlewares/protect";
import { validate } from "../../common/middlewares/validate";
import { objectIdValidation } from "../../common/validations/object-id";

const router = Router();

router.use(protect);

router.route("/").get(getAllFavorites);

router
  .route("/:id")
  .all(objectIdValidation, validate)
  .post(addFavorite)
  .delete(removeFavorite);

export default router;
