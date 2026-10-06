import { Router } from "express";

import { getFile, downloadFile, getUploadSignature, saveUploadedFile, getAllFiles, updateTrashStatus, getTrashFiles, permanentlyDeleteFiles } from "../controllers/file.controller.js";

import { validate } from "../middlewares/validate.js";
import { fileIdsSchema, fileSchema, fileTrashSchema } from "../schemas/file.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-all-files").get(authMiddleware, getAllFiles)
router.route("/get-trash-files").get(authMiddleware, getTrashFiles);
router.route("/:uniqueId").get(getFile);
router.route("/:uniqueId/download").get(downloadFile);
router.route("/upload/signature").post(authMiddleware, getUploadSignature);
router.route("/").post(authMiddleware, validate(fileSchema), saveUploadedFile);
router.route("/update-trash-status").patch(authMiddleware, validate(fileTrashSchema), updateTrashStatus);
router.route("/permanent").delete(authMiddleware, validate(fileIdsSchema), permanentlyDeleteFiles);
export default router;