import { OAuth2Client } from "google-auth-library";
import { env } from "./env.js";

if (!env.GOOGLE_CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID is not configured");
}

export const googleClient = new OAuth2Client(
  env.GOOGLE_CLIENT_ID
);