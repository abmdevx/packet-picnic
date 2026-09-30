import { FileX } from "lucide-react";

import FileCard, { type FileItem } from "./FileCard";

interface FileListProps {
  files: FileItem[];
  onCopy?: (file: FileItem) => void;
  onDownload?: (file: FileItem) => void;
  onDelete?: (file: FileItem) => void;
}

const FileList = ({
  files,
  onCopy,
  onDownload,
  onDelete,
}: FileListProps) => {
  if (files.length === 0) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-8 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
          <FileX className="size-5 text-muted-foreground" />
        </div>

        <h3 className="font-medium">No files yet</h3>

        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Upload your first file and it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {files.map((file) => (
        <FileCard
          key={file.uniqueId}
          file={file}
          onCopy={onCopy}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default FileList;