import { HardDrive, Files, Database } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StorageStatsProps {
  usedBytes: number;
  totalBytes: number;
  fileCount: number;
}

const formatBytes = (bytes: number) => {
  if (bytes < 1000) {
    return `${bytes} B`;
  }

  if (bytes < 1000 * 1000) {
    return `${(bytes / 1000).toFixed(2)} KB`;
  }

  if (bytes < 1000 * 1000 * 1000) {
    return `${(bytes / (1000 * 1000)).toFixed(2)} MB`;
  }

  return `${(bytes / (1000 * 1000 * 1000)).toFixed(2)} GB`;
};

const StorageStats = ({
  usedBytes,
  totalBytes,
  fileCount,
}: StorageStatsProps) => {
  const percentage =
    totalBytes > 0
      ? Math.min((usedBytes / totalBytes) * 100, 100)
      : 0;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex items-center gap-4">
            <div className="flex size-11 items-center justify-center rounded-lg bg-muted">
              <HardDrive className="size-5 text-muted-foreground" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Storage Used
              </p>

              <p className="text-lg font-semibold">
                {formatBytes(usedBytes)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex size-11 items-center justify-center rounded-lg bg-muted">
              <Files className="size-5 text-muted-foreground" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Files
              </p>

              <p className="text-lg font-semibold">
                {fileCount}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex size-11 items-center justify-center rounded-lg bg-muted">
              <Database className="size-5 text-muted-foreground" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Available Storage
              </p>

              <p className="text-lg font-semibold">
                {formatBytes(Math.max(totalBytes - usedBytes, 0))}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">
              Storage
            </span>

            <span className="font-medium">
              {percentage.toFixed(1)}%
            </span>
          </div>

          <Progress value={percentage} />
        </div>
      </CardContent>
    </Card>
  );
};

export default StorageStats;