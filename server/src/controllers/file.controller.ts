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
      storedName: cloudinaryResponse.original_filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      uniqueId,
      storageUrl: cloudinaryResponse.secure_url,
    });

    const shareUrl = `${process.env.CLIENT_URL}/files/${file.uniqueId}`;
    
    return res.status(201).json(
      new ApiResponse(
        201,
        {
          uniqueId: file.uniqueId,
          shareUrl,
        },
        "File uploaded successfully"
      )
    );
  }
);

export const getFile = asyncHandler(
  async (req: Request<{ uniqueId: string }>, res: Response) => {
    const { uniqueId } = req.params;

    const file = await File.findOne({ uniqueId });

    if (!file) {
      throw new ApiError(404, "File not found");
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          originalName: file.originalName,
          mimeType: file.mimeType,
          size: file.size,
          uniqueId: file.uniqueId,
        },
        "File found successfully"
      )
    );
  }
);

export const downloadFile = asyncHandler(
  async (req: Request<{ uniqueId: string }>, res: Response) => {
    const { uniqueId } = req.params;

    const file = await File.findOne({ uniqueId });

    if (!file) {
      throw new ApiError(404, "File not found");
    }

    return res.redirect(file.storageUrl);
  }
);