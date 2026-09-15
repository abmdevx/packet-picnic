import { Router } from "express";

import { uploadFile, getFile } from "../controllers/file.controller.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.post("/upload", upload.single("file"), uploadFile);
router.route("/:uniqueId").get(getFile);

export default router;