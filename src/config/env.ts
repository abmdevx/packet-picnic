import "dotenv/config";

export const env = {
  PORT: Number(process.env.PORT) || 5000,
  MONGO_URI: process.env.MONGO_URI || "",
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_CLOUD_NAME || ""
};