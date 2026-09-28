import { Router } from "express";
import { googleLogin } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { googleLoginSchema } from "../schemas/user.schema.js";

const router = Router();

router.post(
  "/google",
  validate(googleLoginSchema),
  googleLogin
);

export default router;