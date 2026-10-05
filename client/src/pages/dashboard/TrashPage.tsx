import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import DashboardToolbar from "@/components/dashboard/DashboardToolbar";
import FileList from "@/components/dashboard/FileList";
import type { FileItem } from "@/components/dashboard/FileCard";
import { useFiles } from "@/hooks/useFiles";

const TrashPage = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState<"list" | "grid">("list");

  const {
    getTrashFiles,
    updateTrashStatus,
    trashFiles,
    loading,
  } = useFiles();

  useEffect(() => {
    getTrashFiles();
  }, []);

  useEffect(() => {
    const formattedFiles: FileItem[] = trashFiles.map((file) => ({
      uniqueId: file.uniqueId,
      originalName: file.originalName,
      size: file.size,
      mimeType: file.mimeType,
      uploadedAt: file.createdAt,
      downloadCount: file.downloadCount,
      storageUrl: file.storageUrl,
    }));

    setFiles(formattedFiles);
  }, [trashFiles]);

  const filteredFiles = useMemo(() => {
    const result = files.filter((file) =>
      file.originalName
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    return [...result].sort((a, b) => {
      switch (sort) {
        case "oldest":
          return (
            new Date(a.uploadedAt ?? 0).getTime() -
            new Date(b.uploadedAt ?? 0).getTime()
          );

        case "name":
          return a.originalName.localeCompare(b.originalName);

        case "size":
          return b.size - a.size;

        default:
          return (
            new Date(b.uploadedAt ?? 0).getTime() -
            new Date(a.uploadedAt ?? 0).getTime()
          );
      }
    });
  }, [files, search, sort]);

  const handleRestore = async (file: FileItem) => {
    try {
      await updateTrashStatus([file.uniqueId], false);

      setFiles((current) =>
        current.filter(
          (item) => item.uniqueId !== file.uniqueId
        )
      );

      toast.success(`${file.originalName} restored.`);
    } catch {
      toast.error(
        `Failed to restore ${file.originalName}.`
      );
    }
  };

  return (
    <section className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <Link
          to="/dashboard"
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to My Files
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <Trash2 className="size-5 text-muted-foreground" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Trash
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage files you've deleted.
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="overflow-hidden rounded-xl border">
        <DashboardToolbar
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
          view={view}
          onViewChange={setView}
        />

        {/* Files */}
        {loading && files.length === 0 ? (
          <div className="flex min-h-72 items-center justify-center text-sm text-muted-foreground">
            Loading trash...
          </div>
        ) : (
          <FileList
            files={filteredFiles}
            view={view}
            onRestore={handleRestore}
          />
        )}
      </div>
    </section>
  );
};

export default TrashPage;