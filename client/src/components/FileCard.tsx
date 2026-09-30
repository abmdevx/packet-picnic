import {
  Copy,
  Download,
  File,
  MoreHorizontal,
  Share2,
  Trash2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface FileItem {
  uniqueId: string;
  originalName: string;
  size: number;
  mimeType: string;
  storageUrl?: string;
  uploadedAt?: string;
  downloadCount?: number;
}

interface FileCardProps {
  file: FileItem;
  onCopy?: (file: FileItem) => void;
  onDownload?: (file: FileItem) => void;
  onDelete?: (file: FileItem) => void;
}

const formatFileSize = (bytes: number) => {
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

const FileCard = ({
  file,
  onCopy,
  onDownload,
  onDelete,
}: FileCardProps) => {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted">
              <File className="size-5 text-muted-foreground" />
            </div>

            <div className="min-w-0">
              <h3
                className="truncate font-medium"
                title={file.originalName}
              >
                {file.originalName}
              </h3>

              <p className="mt-1 text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-md hover:bg-muted"
                >
                <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onCopy?.(file)}>
                <Copy className="mr-2 size-4" />
                Copy link
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onDownload?.(file)}>
                <Download className="mr-2 size-4" />
                Download
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Share2 className="mr-2 size-4" />
                Share
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete?.(file)}
              >
                <Trash2 className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>

      <CardFooter className="border-t bg-muted/30 px-5 py-3">
        <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
          <span>
            {file.uploadedAt
              ? new Date(file.uploadedAt).toLocaleDateString()
              : "Recently uploaded"}
          </span>

          <span>
            {file.downloadCount ?? 0} downloads
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FileCard;