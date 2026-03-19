import { Router } from "express";
import { protect } from "../../common/middlewares/protect";
import { validate } from "../../common/middlewares/validate";
import { login, logout, refresh, register } from "./auth.controller";
import { loginValidation, registerValidation } from "./auth.validations";

const router = Router();

router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.post("/logout", protect, logout);
router.post("/refresh", refresh);

export default router;
