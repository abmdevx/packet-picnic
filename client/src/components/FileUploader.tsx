import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

import { useFiles } from "@/hooks/useFiles";

interface FileUploaderProps {
  onUploadComplete?: (uniqueId: string) => void;
}

export default function FileUploader({
  onUploadComplete,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(
    null
  );

  const {
    upload,
    loading,
    progress,
    error,
  } = useFiles();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    const result = await upload(file);

    if (result) {
      onUploadComplete?.(result.data.uniqueId);
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
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}