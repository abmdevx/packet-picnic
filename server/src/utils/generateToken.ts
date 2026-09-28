import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateToken = (userId: string): string => {
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    {
      userId,
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_SECRET_EXPIRY,
    }
  );
};