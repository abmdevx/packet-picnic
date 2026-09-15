import { useState } from "react";
import { files } from "@/api/files";

export function useFiles() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const upload = async (file: File) => {
    try {
      setLoading(true);
      setProgress(0);
      setError(null);
      setFileUrl(null);

      const result = await files.post(file, setProgress);

      setProgress(100);
      setFileUrl(result.data.shareUrl);

      return result;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "File upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    upload,
    loading,
    progress,
    error,
    fileUrl,
  };
}