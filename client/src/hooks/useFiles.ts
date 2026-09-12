import { useState } from "react";
import { files } from "@/api/files";

export function useFiles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    try {
      setLoading(true);
      setError(null);

      const result = await files.post(file);

      return result;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    upload,
    loading,
    error,
  };
}