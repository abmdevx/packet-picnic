import { Clock3, Files } from "lucide-react";
import { Link } from "react-router-dom";

const RecentFilesPage = () => {
  return (
    <section className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Recent Files
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Quickly access your recently uploaded files.
        </p>
      </div>

      <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
          <Clock3 className="size-6 text-muted-foreground" />
        </div>

        <h2 className="font-semibold">No recent files</h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Your recently uploaded files will appear here.
        </p>

        <Link
          to="/dashboard"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <Files className="size-4" />
          Browse My Files
        </Link>
      </div>
    </section>
  );
};

export default RecentFilesPage;