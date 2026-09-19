import mongoose, { Schema, Document } from "mongoose";

interface IFile extends Document {
  originalName: string;
  storedName: string;
  mimeType: string;
  size: number;

  storageUrl: string;

  cloudinaryPublicId: string;
  cloudinaryResourceType: string;

  uniqueId: string;
  downloadCount: number;
}

const fileSchema = new Schema<IFile>(
  {
    originalName: {
      type: String,
      required: true,
    },

    storedName: {
      type: String,
      required: true,
      unique: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    storageUrl: {
      type: String,
      required: true,
    },

    cloudinaryPublicId: {
      type: String,
      required: true,
    },

    cloudinaryResourceType: {
      type: String,
      required: true,
    },

    uniqueId: {
      type: String,
      required: true,
      unique: true,
    },

    downloadCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const File = mongoose.model<IFile>("File", fileSchema);