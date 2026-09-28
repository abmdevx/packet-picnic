import "dotenv/config";
import type { SignOptions } from "jsonwebtoken";

export const env = {
  PORT: Number(process.env.PORT) || 5000,
  MONGO_URI: process.env.MONGO_URI || "",
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  JWT_SECRET: process.env.JWT_SECRET_TOKEN || "",
  JWT_SECRET_EXPIRY: (
    process.env.JWT_SECRET_TOKEN_EXPIRY || "1d"
  ) as NonNullable<SignOptions["expiresIn"]>,
};