import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import ApiError from "../utils/apiError.js";

export const validate = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new ApiError(
        400,
        result.error.issues.map((issue) => issue.message).join(", ")
      );
    }

    req.body = result.data;
    next();
  };
};