import { useMemo, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import DashboardToolbar from "@/components/dashboard/DashboardToolbar";
import FileList from "@/components/dashboard/FileList";
import FileUploader from "@/components/FileUploader";
import type { FileItem } from "@/components/dashboard/FileCard";

const DashboardPage = () => {
  const [uploadOpen, setUploadOpen] = useState(false);

  // Temporary data; replace with your API response later.
  const [files, setFiles] = useState<FileItem[]>([
    {
      uniqueId: "demo-001",
      originalName: "project-report.pdf",
      size: 2450000,
      mimeType: "application/pdf",
      uploadedAt: new Date().toISOString(),
      downloadCount: 12,
    },
    {
      uniqueId: "demo-002",
      originalName: "presentation.pptx",
      size: 8200000,
      mimeType:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      uploadedAt: new Date().toISOString(),
      downloadCount: 5,
    },
    {
      uniqueId: "demo-003",
      originalName: "profile-picture.png",
      size: 850000,
      mimeType: "image/png",
      uploadedAt: new Date().toISOString(),
      downloadCount: 2,
    },
  ]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState<"list" | "grid">("list");

  const filteredFiles = useMemo(() => {
    const result = files.filter((file) =>
      file.originalName.toLowerCase().includes(search.toLowerCase())
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

  const handleDelete = (file: FileItem) => {
    setFiles((current) =>
      current.filter((item) => item.uniqueId !== file.uniqueId)
    );

    toast.success(`${file.originalName} removed from this view.`);
  };

  const handleDownload = (file: FileItem) => {
    if (!file.storageUrl) {
      toast.error("Download URL is not available.");
      return;
    }

    window.open(file.storageUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="mx-auto w-full max-w-[1600px]">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pb-2 pt-6 sm:px-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            My Files
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and share your uploaded files.
          </p>
        </div>

        <span className="text-sm text-muted-foreground">
          {filteredFiles.length}{" "}
          {filteredFiles.length === 1 ? "file" : "files"}
        </span>
      </div>

      {/* Toolbar */}
      <DashboardToolbar
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        view={view}
        onViewChange={setView}
        onUpload={() => setUploadOpen(true)}
      />

      {/* Files */}
      <FileList
        files={filteredFiles}
        view={view}
        onDelete={handleDelete}
        onDownload={handleDownload}
      />

      {/* Upload Dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="w-[calc(100%-2rem)] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Select files to upload</DialogTitle>

            <DialogDescription>
              Upload a file and get a shareable link.
            </DialogDescription>
          </DialogHeader>

          <FileUploader />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DashboardPage;