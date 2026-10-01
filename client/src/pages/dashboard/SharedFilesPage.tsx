import { Share2, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const SharedFilesPage = () => {
  return (
    <section className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Shared Files
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage the files you've shared with others.
        </p>
      </div>

      <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
          <Share2 className="size-6 text-muted-foreground" />
        </div>

        <h2 className="font-semibold">No shared files yet</h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Files you share will appear here once sharing is connected.
        </p>

        <Link
          to="/dashboard/upload"
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Upload className="size-4" />
          Upload a file
        </Link>
      </div>
    </section>
  );
};

export default SharedFilesPage;