import { Router } from "express";

import { uploadFile } from "../controllers/file.controller.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.post("/upload", upload.single("file"), uploadFile);

export default router;