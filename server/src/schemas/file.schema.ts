import { z } from "zod";

export const fileSchema = z.object({
  originalName: z.string().min(1, "Original name is required"),

  storedName: z.string().min(1, "Stored name is required"),

  mimeType: z.string().min(1, "MIME type is required"),

  size: z.number().positive("File size must be greater than 0"),

  storageUrl: z.url("Storage URL must be a valid URL"),

  cloudinaryPublicId: z
    .string()
    .min(1, "Cloudinary public ID is required"),

  cloudinaryResourceType: z
    .string()
    .min(1, "Cloudinary resource type is required"),
});

export const fileIdsSchema = z.object({
  fileIds: z
    .array(z.string().min(1))
    .min(1, "At least one file ID is required"),
});