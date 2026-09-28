import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  googleId: string;
  name: string;
  email: string;
  picture?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    picture: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);