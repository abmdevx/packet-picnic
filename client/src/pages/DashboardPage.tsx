import { useMemo, useState } from "react";
import { toast } from "sonner";

import DashboardHeader from "@/components/DashboardHeader";
import FileList from "@/components/FileList";
import StorageStats from "@/components/StorageStats";
import type { FileItem } from "@/components/FileCard";

const DashboardPage = () => {
  const [files, setFiles] = useState<FileItem[]>([
    {
      uniqueId: "demo-001",
      originalName: "project-report.pdf",
      size: 2_450_000,
      mimeType: "application/pdf",
      uploadedAt: new Date().toISOString(),
      downloadCount: 12,
    },
    {
      uniqueId: "demo-002",
      originalName: "presentation.pptx",
      size: 8_200_000,
      mimeType:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      uploadedAt: new Date().toISOString(),
      downloadCount: 5,
    },
    {
      uniqueId: "demo-003",
      originalName: "profile-picture.png",
      size: 850_000,
      mimeType: "image/png",
      uploadedAt: new Date().toISOString(),
      downloadCount: 2,
    },
  ]);

  const usedStorage = useMemo(() => {
    return files.reduce((total, file) => total + file.size, 0);
  }, [files]);

  const handleCopy = async (file: FileItem) => {
    const shareUrl = `${window.location.origin}/files/${file.uniqueId}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("File link copied!");
    } catch {
      toast.error("Failed to copy file link.");
    }
  };

  const handleDownload = (file: FileItem) => {
    if (!file.storageUrl) {
      toast.error("Download URL is not available.");
      return;
    }

    window.open(file.storageUrl, "_blank");
  };

  const handleDelete = (file: FileItem) => {
    setFiles((currentFiles) =>
      currentFiles.filter(
        (currentFile) => currentFile.uniqueId !== file.uniqueId
      )
    );

    toast.success(`${file.originalName} deleted.`);
  };

  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <StorageStats
          usedBytes={usedStorage}
          totalBytes={100 * 1000 * 1000}
          fileCount={files.length}
        />

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Your Files</h2>

            <p className="text-sm text-muted-foreground">
              Your recently uploaded files.
            </p>
          </div>

          <FileList
            files={files}
            onCopy={handleCopy}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;