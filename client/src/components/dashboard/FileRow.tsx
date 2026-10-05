import {
  File,
  FileArchive,
  FileImage,
  FileText,
  Download,
  Copy,
  MoreHorizontal,
  RotateCcw,
  Trash2,
} from "lucide-react";

import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { FileItem } from "./FileCard";

interface FileRowProps {
  file: FileItem;
  onCopy?: (file: FileItem) => void;
  onDownload?: (file: FileItem) => void;
  onDelete?: (file: FileItem) => void;
  onRestore?: (file: FileItem) => void;
  onPermanentDelete?: (file: FileItem) => void;
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1000) return `${bytes} B`;

  if (bytes < 1_000_000) {
    return `${(bytes / 1000).toFixed(2)} KB`;
  }

  if (bytes < 1_000_000_000) {
    return `${(bytes / 1_000_000).toFixed(2)} MB`;
  }

  return `${(bytes / 1_000_000_000).toFixed(2)} GB`;
};

const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith("image/")) return FileImage;

  if (mimeType === "application/pdf") return FileText;

  if (
    mimeType.includes("zip") ||
    mimeType.includes("compressed")
  ) {
    return FileArchive;
  }

  return File;
};

const FileRow = ({
  file,
  onDelete,
  onDownload,
  onCopy,
  onRestore,
  onPermanentDelete,
}: FileRowProps) => {
  const Icon = getFileIcon(file.mimeType);

  const handleCopy = async () => {
    const url = `${window.location.origin}/files/${file.uniqueId}`;

    try {
      await navigator.clipboard.writeText(url);
      toast.success("Share link copied!");
    } catch {
      toast.error("Couldn't copy the link.");
    }
  };

  return (
    <div className="group flex min-w-0 items-center gap-3 border-b px-4 py-3 transition-colors hover:bg-muted/40 sm:px-5">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-5 text-muted-foreground" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <p
            className="min-w-0 truncate text-sm font-medium"
            title={file.originalName}
          >
            {file.originalName}
          </p>

          {file.isNew && (
            <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
              NEW
            </span>
          )}
        </div>

        <p className="mt-0.5 text-xs text-muted-foreground sm:hidden">
          {formatFileSize(file.size)}
        </p>
      </div>

      <span className="hidden w-24 text-right text-sm text-muted-foreground sm:block">
        {formatFileSize(file.size)}
      </span>

      <span className="hidden w-32 text-right text-sm text-muted-foreground md:block">
        {file.uploadedAt
          ? new Date(
              file.uploadedAt
            ).toLocaleDateString()
          : "—"}
      </span>

      <button
        type="button"
        onClick={
          onCopy
            ? () => onCopy(file)
            : handleCopy
        }
        title="Copy share link"
        className="hidden rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground sm:inline-flex"
      >
        <Copy className="size-4" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {(onCopy || !onRestore) && (
            <DropdownMenuItem
              onClick={
                onCopy
                  ? () => onCopy(file)
                  : handleCopy
              }
            >
              <Copy className="mr-2 size-4" />
              Copy link
            </DropdownMenuItem>
          )}

          {onDownload && (
            <DropdownMenuItem
              onClick={() => onDownload(file)}
            >
              <Download className="mr-2 size-4" />
              Download
            </DropdownMenuItem>
          )}

          {!onRestore && (
            <DropdownMenuItem>
              <Copy className="mr-2 size-4" />
              Share
            </DropdownMenuItem>
          )}

          {(onRestore ||
            onPermanentDelete ||
            onDelete) && (
            <DropdownMenuSeparator />
          )}

          {onRestore && (
            <DropdownMenuItem
              onClick={() => onRestore(file)}
            >
              <RotateCcw className="mr-2 size-4" />
              Restore
            </DropdownMenuItem>
          )}

          {onPermanentDelete && (
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() =>
                onPermanentDelete(file)
              }
            >
              <Trash2 className="mr-2 size-4" />
              Delete permanently
            </DropdownMenuItem>
          )}

          {onDelete && (
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => onDelete(file)}
            >
              <Trash2 className="mr-2 size-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FileRow;