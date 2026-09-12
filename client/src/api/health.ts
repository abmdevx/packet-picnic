import { api } from "./client";

export const testBackend = async () => {
  const response = await api.get<{
    success: boolean;
    message: string;
  }>("/health");

  return response.data;
};