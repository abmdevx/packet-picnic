import { Router } from "express";

import { getFile, downloadFile, getUploadSignature, saveUploadedFile } from "../controllers/file.controller.js";

import { validate } from "../middlewares/validate.js";
import { fileSchema } from "../schemas/file.schema.js";

const router = Router();

router.route("/:uniqueId").get(getFile);
router.route("/:uniqueId/download").get(downloadFile);
router.route("/upload/signature").post(getUploadSignature);
router.route("/").post(validate(fileSchema), saveUploadedFile);

export default router;