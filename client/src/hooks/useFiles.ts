import { useState } from "react";
import { files } from "@/api/files";

type FileData = {
  originalName: string;
  mimeType: string;
  size: number;
  uniqueId: string;
  shareUrl?: string;
  downloadCount: number;
  storageUrl?: string;
  createdAt?: string;
};

export function useFiles() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [file, setFile] = useState<FileData | null>(null);
  const [allFiles, setAllFiles] = useState<FileData[]>([]);
  const [trashFiles, setTrashFiles] = useState<FileData[]>([]);

  const upload = async (file: File) => {
    try {
      setLoading(true);
      setProgress(0);
      setError(null);
      setFileUrl(null);

      const result = await files.post(file, setProgress);

      setProgress(100);
      setFileUrl(result.data.shareUrl);
      setFile(result.data);

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

  const getFile = async (uniqueId: string) => {
    try {
      setLoading(true);
      setError(null);
      setFile(null);

      const result = await files.getInfo(uniqueId);

      setFile(result.data);

      return result;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch file"
      );
    } finally {
      setLoading(false);
    }
  };

  const getAllFiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await files.getAllFiles();

      setAllFiles(result.data);

      return result;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch files"
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async (uniqueId: string) => {
    try {
      setLoading(true);
      setError(null);

      const result = await files.download(uniqueId);

      return result;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to download file"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateTrashStatus = async (
    fileIds: string[],
    isTrashed: boolean
  ) => {
    try {
      setLoading(true);
      setError(null);

      const result = await files.updateTrashStatus(
        fileIds,
        isTrashed
      );

      return result;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update file status"
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getTrashFiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await files.getTrashFiles();

      setTrashFiles(result.data);

      return result;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch trash files"
      );
    } finally {
      setLoading(false);
    }
  };

  const permanentlyDeleteFiles = async (fileIds: string[]) => {
    try {
      setLoading(true);
      setError(null);

      const result = await files.permanentlyDelete(fileIds);

      return result;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to permanently delete files"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    upload,
    getFile,
    getAllFiles,
    getTrashFiles,
    updateTrashStatus,
    permanentlyDeleteFiles,
    downloadFile,
    loading,
    progress,
    error,
    fileUrl,
    file,
    allFiles,
    trashFiles
  };
}