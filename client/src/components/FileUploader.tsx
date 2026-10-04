import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

import {
  saveFile,
  type StoredFile,
  getFiles,
} from "@/utils/storage";

import { useFiles } from "@/hooks/useFiles";

export default function FileUploader() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(
    null
  );

  const [copiedFileId, setCopiedFileId] = useState<string | null>(
    null
  );

  const [storedFiles, setStoredFiles] = useState<StoredFile[]>([]);

  const {
    upload,
    loading,
    progress,
    error,
  } = useFiles();

  useEffect(() => {
    const files = getFiles();
    setStoredFiles(files);
  }, []);

  const handleCopy = async (file: StoredFile) => {
    await navigator.clipboard.writeText(file.url);

    setCopiedFileId(file.id);

    setTimeout(() => {
      setCopiedFileId(null);
    }, 2000);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    const result = await upload(file);

    if (result) {
      const newFile = {
        id: result.data.uniqueId,
        originalName: file.name,
        url: result.data.shareUrl,
        size: file.size,
        uploadedAt: new Date().toISOString(),
      };

      saveFile(newFile);

      setStoredFiles((prev) => [...prev, newFile]);
    }
  };

  const handleChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-5">
      {/* Hidden File Input */}
      <Input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Upload Area */}
      <button
        type="button"
        onClick={handleChooseFile}
        disabled={loading}
        className="flex w-full items-center justify-center rounded-lg border-2 border-dashed py-14 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-muted/30 hover:text-foreground disabled:pointer-events-none disabled:opacity-50 sm:py-16"
      >
        <div className="text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-lg bg-muted">
            <span className="text-3xl font-light">+</span>
          </div>

          <p className="text-sm font-medium">
            {loading ? "Uploading..." : "Choose a file"}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Select a file from your device
          </p>
        </div>
      </button>

      {/* Upload Progress */}
      {selectedFile && (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span
              className="min-w-0 truncate"
              title={selectedFile.name}
            >
              {selectedFile.name}
            </span>

            <span className="shrink-0 text-xs text-muted-foreground">
              {progress}%
            </span>
          </div>

          <Progress value={progress} />
        </div>
      )}

      {/* Error */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Uploaded Files */}
      {storedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Uploaded files
          </p>

          {storedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 rounded-lg border p-3"
            >
              <span
                className="min-w-0 flex-1 truncate text-sm"
                title={file.originalName}
              >
                {file.originalName}
              </span>

              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => handleCopy(file)}
              >
                {copiedFileId === file.id
                  ? "Copied!"
                  : "Copy"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}