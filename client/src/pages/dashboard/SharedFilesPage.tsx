import { Download, FileText, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFiles } from "@/hooks/useFiles";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const LOGO_URL = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/v1790490826/logo_yz7vqp.png`;

const SharedFilesPage = () => {
  const { uniqueId } = useParams();

  const {
    file,
    getFile,
    downloadFile,
  } = useFiles();

  useEffect(() => {
    if (!uniqueId) return;

    const fetchFile = async () => {
      await getFile(uniqueId);
    };

    fetchFile();
  }, [uniqueId]);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  const handleDownload = async () => {
    if (!uniqueId) return;

    await downloadFile(uniqueId);
  };

  if (!file) {
    return (
      <main className="flex min-h-screen items-start justify-center bg-background px-4 pt-16">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-5 flex justify-center">
            <img
              src={LOGO_URL}
              alt="Packet Picnic"
              className="h-26 w-auto object-contain"
            />
          </div>

          <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
            <p className="text-sm text-muted-foreground">
              Loading file...
            </p>
          </div>

          <footer className="mt-8 text-center text-[11px] text-muted-foreground/60">
            Fast file sharing, without the hassle.
          </footer>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-start justify-center bg-background px-4 pt-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-5 flex justify-center">
          <img
            src={LOGO_URL}
            alt="Packet Picnic"
            className="h-26 w-auto object-contain"
          />
        </div>

        {/* File Card */}
        <div className="rounded-xl border bg-card p-3 shadow-sm">
          <div className="flex items-center gap-3">
            {/* File Icon */}
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted">
              <FileText className="size-5 text-muted-foreground" />
            </div>

            {/* File Information */}
            <div className="min-w-0 flex-1">
              <p
                className="truncate text-sm font-medium"
                title={file.originalName}
              >
                {file.originalName}
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                {file.mimeType} · {file.size}
              </p>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-1.5">
              {/* Copy Link */}
              <Button
                variant="outline"
                size="icon"
                className="size-8 rounded-full"
                onClick={handleCopyLink}
                aria-label="Copy link"
              >
                <Link2 className="size-3.5" />
              </Button>

              {/* Download */}
              <Button
                size="icon"
                className="size-8 rounded-full"
                onClick={handleDownload}
                aria-label="Download file"
              >
                <Download className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-[11px] text-muted-foreground/60">
          Fast file sharing, without the hassle.
        </footer>
      </div>
    </main>
  );
};

export default SharedFilesPage;