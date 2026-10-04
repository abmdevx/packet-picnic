import { api } from "./client";
import axios from "axios";

export const files = {
  getInfo: async (uniqueId: string) => {
    const response = await api.get(`/files/${uniqueId}`);
    return response.data;
  },

  download: async (uniqueId: string) => {
    const response = await api.get(
      `/files/${uniqueId}/download`
    );

    const { downloadUrl, originalName } = response.data.data;

    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download = originalName;
    // link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return response.data;
  },

  getAllFiles: async () => {
    const response = await api.get("/files/get-all-files");
    return response.data;
  },

  post: async (
    file: File,
    onProgress?: (progress: number) => void
  ) => {
    // 1. Get upload signature from backend
    const signatureResponse = await files.getUploadSignature();

    const { timestamp, signature } = signatureResponse.data;

    // 2. Prepare Cloudinary upload data
    const formData = new FormData();

    formData.append("file", file);
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);

    // 3. Upload directly to Cloudinary
    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/raw/upload`,
      formData,
      {
        onUploadProgress: (event) => {
          if (event.total) {
            const progress = Math.round(
              (event.loaded * 100) / event.total
            );

            onProgress?.(progress);
          }
        },
      }
    );

    // 4. Send Cloudinary metadata to our backend
    const metadataResponse = await api.post("/files", {
      originalName: file.name,
      storedName: cloudinaryResponse.data.original_filename,
      mimeType: file.type,
      size: file.size,
      storageUrl: cloudinaryResponse.data.secure_url,
      cloudinaryPublicId: cloudinaryResponse.data.public_id,
      cloudinaryResourceType: cloudinaryResponse.data.resource_type,
    });

    return metadataResponse.data;
  },

  getUploadSignature: async () => {
    const response = await api.post("/files/upload/signature");
    return response.data;
  },

  put: async (id: string, data: unknown) => {
    const response = await api.put(`/files/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/files/${id}`);
    return response.data;
  },
};