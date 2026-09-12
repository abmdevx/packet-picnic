import { api } from "./client";

export const files = {
  get: async () => {
    const response = await api.get("/files");
    return response.data;
  },

  post: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/files", formData);
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