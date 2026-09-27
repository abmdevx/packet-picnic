import type { Request, Response } from "express";
import { nanoid } from "nanoid";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { generateUploadSignature, uploadOnCloudinary, generateDownloadUrl } from "../utils/cloudinary.js";
import { File } from "../models/file.model.js";

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
          downloadCount: file.downloadCount,
        },
        "File found successfully"
      )
    );
  }
);

export const downloadFile = asyncHandler(
  async (
    req: Request<{ uniqueId: string }>,
    res: Response
  ) => {
    const { uniqueId } = req.params;

    const file = await File.findOne({ uniqueId });

    if (!file) {
      throw new ApiError(404, "File not found");
    }

    const downloadUrl = generateDownloadUrl(
      file.cloudinaryPublicId,
      file.cloudinaryResourceType
    );

    await File.findOneAndUpdate(
      { uniqueId },
      { $inc: { downloadCount: 1 } }
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          downloadUrl,
          originalName: file.originalName,
        },
        "Download URL generated successfully"
      )
    );
  }
);

export const saveUploadedFile = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      originalName,
      storedName,
      mimeType,
      size,
      storageUrl,
      cloudinaryPublicId,
      cloudinaryResourceType,
    } = req.body;

    const uniqueId = nanoid(10);

    const file = await File.create({
      originalName,
      storedName,
      mimeType,
      size,
      storageUrl,
      cloudinaryPublicId,
      cloudinaryResourceType,
      uniqueId,
    });

    const shareUrl = `${process.env.CLIENT_URL}/files/${file.uniqueId}`;

    return res.status(201).json(
      new ApiResponse(
        201,
        {
          uniqueId: file.uniqueId,
          shareUrl,
        },
        "File metadata saved successfully"
      )
    );
  }
);

export const getUploadSignature = asyncHandler(
  async (req: Request, res: Response) => {
    const timestamp = Math.round(Date.now() / 1000);

    const signature = generateUploadSignature(timestamp);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          timestamp,
          signature,
        },
        "Upload signature generated successfully"
      )
    );
  }
);