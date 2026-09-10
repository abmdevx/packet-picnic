import type { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadFile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new ApiError(400, "File is required");
  }

  const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

  if (!cloudinaryResponse) {
    throw new ApiError(500, "File upload failed");
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        publicId: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
      "File uploaded successfully"
    )
  );
});