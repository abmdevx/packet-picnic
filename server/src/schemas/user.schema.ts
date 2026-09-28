import { z } from "zod";

export const googleLoginSchema = z.object({
  credential: z
    .string()
    .min(1, "Google credential is required"),
});

export const googlePayloadSchema = z.object({
  sub: z.string().min(1),
  email: z.email(),
  email_verified: z.literal(true),
  name: z.string().optional(),
  picture: z.url().optional(),
});