import { api } from "./client";

export const files = {
  getInfo: async (uniqueId: string) => {
    const response = await api.get(`/files/${uniqueId}`);
    return response.data;
  },

  download: async (uniqueId: string) => {
    const response = await api.get(`/files/${uniqueId}/download`);
    return response.data;
},

  post: async (
    file: File,
    onProgress?: (progress: number) => void
  ) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/files/upload", formData, {
      onUploadProgress: (event) => {
        if (event.total) {
          const progress = Math.round(
            (event.loaded * 100) / event.total
          );

          onProgress?.(progress);
        }
      },
    });

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