import type { Request, Response } from "express";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { googleClient } from "../config/google.js";
import { env } from "../config/env.js";
import { googlePayloadSchema } from "../schemas/user.schema.js";

export const googleLogin = asyncHandler(
  async (req: Request, res: Response) => {
    const { credential } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const result = googlePayloadSchema.safeParse(payload);

    if (!result.success) {
      throw new ApiError(401, "Invalid Google credential");
    }

    const googleUser = result.data;

    const email = googleUser.email.toLowerCase();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        googleId: googleUser.sub,
        name: googleUser.name || "Google User",
        email,
        picture: googleUser.picture || null,
      }); 
    }

    const token = generateToken(user._id.toString());

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
          },
          token,
        },
        "Google login successful"
      )
    );
  }
);