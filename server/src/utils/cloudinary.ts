import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import ApiError from "./apiError.js";
import { env } from "../config/env.js";

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "raw",
    });

    // Remove temporary local file after successful upload
    try {
        fs.unlinkSync(localFilePath);
    } catch (cleanupError) {
        console.error("Failed to remove temporary file:", cleanupError);
    }

    return response;
  } catch (error) {
    // Remove temporary local file if Cloudinary upload fails
    try {
        fs.unlinkSync(localFilePath);
    } catch (cleanupError) {
        console.error("Failed to remove temporary file:", cleanupError);
    }

    if (error instanceof ApiError) {
      throw error;
    }

    const message =
      error instanceof Error
        ? error.message
        : "Error uploading file to Cloudinary";

    throw new ApiError(500, message);
  }
};

const deleteFromCloudinary = async (
  public_id: string,
  resourceType = "image"
) => {
  try {
    if (!public_id) {
      throw new ApiError(
        400,
        "Invalid public_id for the file to be deleted"
      );
    }

    const response = await cloudinary.uploader.destroy(public_id, {
      resource_type: resourceType,
    });

    if (
      response?.result !== "ok" &&
      response?.result !== "not found"
    ) {
      throw new ApiError(500, "Cloudinary failed to delete file");
    }

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    const message =
      error instanceof Error
        ? error.message
        : "Error deleting file from Cloudinary";

    throw new ApiError(500, message);
  }
};

export {
  uploadOnCloudinary,
  deleteFromCloudinary,
};