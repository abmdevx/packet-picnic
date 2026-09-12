import mongoose from "mongoose";
import type { Request, Response } from "express";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

import asyncHandler from "../utils/asyncHandler.js";

export const healthcheck = asyncHandler(async (_, res: Response) => {

    const dbStatus = mongoose.connection.readyState === 1;

    if (!dbStatus) 
    {
        throw new ApiError(500, "Database not connected");
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {},
        "Server is running successfully!"
    ))
})