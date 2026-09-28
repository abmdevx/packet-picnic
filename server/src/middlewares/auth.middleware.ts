import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { env } from "../config/env.js";
import { User } from "../models/user.model.js";

interface JwtPayload {
  userId: string;
}

export const authMiddleware = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new ApiError(401, "Authentication required");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Authentication required");
    }

    if (!env.JWT_SECRET) {
      throw new ApiError(500, "JWT secret is not configured");
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    const user = await User.findById(decoded.userId).select(
      "-__v"
    );

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    req.user = user;

    next();
  }
);