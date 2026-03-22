import { Router } from "express";
import { protect } from "../../common/middlewares/protect";
import { validate } from "../../common/middlewares/validate";
import { objectIdValidation } from "../../common/validations/object-id";
import {
  getPublicUserProfile,
  getCurrentUserProfile,
} from "./profile.controller";

const router = Router();

router.use(protect);

router.get("/", getCurrentUserProfile);
router.get(
  "/:userId",
  objectIdValidation("userId"),
  validate,
  getPublicUserProfile,
);

export default router;
