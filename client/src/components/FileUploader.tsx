import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useFiles } from "@/hooks/useFiles";

export default function FileUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    upload,
    loading,
    progress,
    error,
    fileUrl,
  } = useFiles();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    await upload(file);
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

          {fileUrl && progress === 100 && (
            <Alert>
              <AlertDescription>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline break-all"
                >
                  {fileUrl}
                </a>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </main>
  );
}