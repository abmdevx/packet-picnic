import type { Request, Response } from "express";
import { nanoid } from "nanoid";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { File } from "../models/file.model.js";

export const uploadFile = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      throw new ApiError(400, "File is required");
    }

    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

    if (!cloudinaryResponse) {
      throw new ApiError(500, "File upload failed");
    }

    const uniqueId = nanoid(10);

    const file = await File.create({
      originalName: req.file.originalname,
      storedName: cloudinaryResponse.public_id,
      mimeType: req.file.mimetype,
      size: req.file.size,
      uniqueId,
      storageUrl: cloudinaryResponse.secure_url,
    });

    const downloadUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/files/${file.uniqueId}`;

    return res.status(201).json(
      new ApiResponse(
        201,
        {
          uniqueId: file.uniqueId,
          downloadUrl,
        },
        "File uploaded successfully"
      )
    );
  }
);