import {
  File,
  FileImage,
  FileText,
  FileArchive,
  Download,
  Copy,
  MoreHorizontal,
  Trash2,
  Share2,
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
  onDelete?: (file: FileItem) => void;
  onDownload?: (file: FileItem) => void;
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1000) return `${bytes} B`;
  if (bytes < 1_000_000) return `${(bytes / 1000).toFixed(2)} KB`;
  if (bytes < 1_000_000_000)
    return `${(bytes / 1_000_000).toFixed(2)} MB`;

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

const FileRow = ({ file, onDelete, onDownload }: FileRowProps) => {
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
        <p
          className="truncate text-sm font-medium"
          title={file.originalName}
        >
          {file.originalName}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground sm:hidden">
          {formatFileSize(file.size)}
        </p>
      </div>

      <span className="hidden w-24 text-right text-sm text-muted-foreground sm:block">
        {formatFileSize(file.size)}
      </span>

      <span className="hidden w-32 text-right text-sm text-muted-foreground md:block">
        {file.uploadedAt
          ? new Date(file.uploadedAt).toLocaleDateString()
          : "—"}
      </span>

      <button
        type="button"
        onClick={handleCopy}
        title="Copy share link"
        className="hidden rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground sm:inline-flex"
      >
        <Share2 className="size-4" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleCopy}>
            <Copy className="mr-2 size-4" />
            Copy link
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => onDownload?.(file)}>
            <Download className="mr-2 size-4" />
            Download
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
  );
};

export default FileRow;