import { Router } from "express";

import { getFile, downloadFile, getUploadSignature, saveUploadedFile } from "../controllers/file.controller.js";

import { validate } from "../middlewares/validate.js";
import { fileSchema } from "../schemas/file.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/:uniqueId").get(authMiddleware, getFile);
router.route("/:uniqueId/download").get(authMiddleware, downloadFile);
router.route("/upload/signature").post(authMiddleware, getUploadSignature);
router.route("/").post(authMiddleware, validate(fileSchema), saveUploadedFile);

export default router;