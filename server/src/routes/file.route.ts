import { Router } from "express";

import { getFile, downloadFile, getUploadSignature, saveUploadedFile } from "../controllers/file.controller.js";

const router = Router();

router.route("/:uniqueId").get(getFile);
router.route("/:uniqueId/download").get(downloadFile);
router.route("/upload/signature").post(getUploadSignature);
router.route("/").post(saveUploadedFile);

export default router;