import { FileX } from "lucide-react";

import FileRow from "./FileRow";
import FileCard, { type FileItem } from "./FileCard";

interface FileListProps {
  files: FileItem[];
  view: "list" | "grid";
  onDelete: (file: FileItem) => void;
  onDownload: (file: FileItem) => void;
}

const FileList = ({
  files,
  view,
  onDelete,
  onDownload,
}: FileListProps) => {
  if (files.length === 0) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
          <FileX className="size-6 text-muted-foreground" />
        </div>

        <h3 className="font-semibold">No files found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload a file or try a different search.
        </p>
      </div>
    );
  }

  if (view === "grid") {
    return (
      <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
        {files.map((file) => (
          <FileCard
            key={file.uniqueId}
            file={file}
            onDelete={onDelete}
            onDownload={onDownload}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="hidden items-center gap-12 border-b bg-muted/30 px-5 py-2 text-xs font-medium text-muted-foreground sm:flex">
        <span className="flex-1">Name</span>
        <span className="w-24 text-right">Size</span>
        <span className="hidden w-32 text-right md:block">
          Uploaded
        </span>
        <span className="w-9" />
      </div>

      {files.map((file) => (
        <FileRow
          key={file.uniqueId}
          file={file}
          onDelete={onDelete}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
};

export default FileList;