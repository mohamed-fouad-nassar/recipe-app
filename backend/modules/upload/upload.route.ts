import { Router } from "express";
import { uploadFile } from "./upload.controller";
import { protect } from "../../common/middlewares/protect";
import { uploadSingle } from "../../common/middlewares/upload";

const router = Router();

router.post("/", protect, uploadSingle("file"), uploadFile);

export default router;
