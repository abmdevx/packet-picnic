import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { saveFile, type StoredFile, getFiles } from "@/utils/storage";
import { useFiles } from "@/hooks/useFiles";

export default function FileUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [copiedFileId, setCopiedFileId] = useState<string | null>(null);
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
    <main className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">
              Packet Picnic
            </h1>

            <p className="text-sm text-muted-foreground">
              Upload a file and get a shareable link.
            </p>
          </div>

          <Input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <Button
            className="w-full"
            onClick={handleChooseFile}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Choose File"}
          </Button>

          {selectedFile && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="truncate">
                  {selectedFile.name}
                </span>

                <span>{progress}%</span>
              </div>

              <Progress value={progress} />
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}
          {storedFiles.length > 0 && (
            <div className="space-y-3">
              {storedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between gap-4 rounded-md border p-3"
                >
                  <span className="truncate text-sm">
                    {file.originalName}
                  </span>

                  <Button
                    type="button"
                    variant="default"
                    onClick={() => handleCopy(file)}
                  >
                    {copiedFileId === file.id ? "Copied!" : "Copy"}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}