import { Router } from "express";

import { uploadFile, getFile, downloadFile, getUploadSignature } from "../controllers/file.controller.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.post("/upload", upload.single("file"), uploadFile);
router.route("/:uniqueId").get(getFile);
router.route("/:uniqueId/download").get(downloadFile);
router.post("/upload/signature", getUploadSignature);

export default router;