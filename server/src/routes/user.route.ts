import { Router } from "express";
import { googleLogin, getCurrentUser } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { googleLoginSchema } from "../schemas/user.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/google").post(validate(googleLoginSchema), googleLogin);
router.route("/me").get(authMiddleware, getCurrentUser);

export default router;