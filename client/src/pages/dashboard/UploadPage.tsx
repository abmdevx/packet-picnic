import { Link } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";

import FileUploader from "@/components/FileUploader";

const UploadPage = () => {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-6 p-4 sm:p-6">
      <div>
        <Link
          to="/dashboard"
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to My Files
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Upload className="size-5" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Upload Files
            </h1>
            <p className="text-sm text-muted-foreground">
              Upload your files and share them with a link.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-4 shadow-sm sm:p-6">
        <FileUploader />
      </div>
    </section>
  );
};

export default UploadPage;