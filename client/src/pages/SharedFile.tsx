import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useFiles } from "@/hooks/useFiles";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SharedFile = () => {
  const { uniqueId } = useParams();
  const { getFile, file, loading, error } = useFiles();

  useEffect(() => {
    if (!uniqueId) return;

    getFile(uniqueId);
  }, [uniqueId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading file...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="text-xl font-semibold">
              File Not Found
            </h1>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!file) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-xl font-semibold">
            {file.originalName}
          </h1>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Type
            </p>
            <p>{file.mimeType}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Size
            </p>
            <p>{(file.size / 1000).toFixed(2)} kb</p>
          </div>

          <Button className="w-full" disabled>
            Download File
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SharedFile;