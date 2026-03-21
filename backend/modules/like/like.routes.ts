import { Router } from "express";
import { protect } from "../../common/middlewares/protect";
import { validate } from "../../common/middlewares/validate";
import { addLike, getAllLikes, removeLike } from "./like.controller";
import { objectIdValidation } from "../../common/validations/object-id";

const router = Router();

router.use(protect);

router.get("/", getAllLikes);

router
  .route("/:id")
  .all(objectIdValidation, validate)
  .post(addLike)
  .delete(removeLike);

export default router;
