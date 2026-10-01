import { Link } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";

const TrashPage = () => {
  return (
    <section className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Trash
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage files you've deleted.
        </p>
      </div>

      <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
          <Trash2 className="size-6 text-muted-foreground" />
        </div>

        <h2 className="font-semibold">Your trash is empty</h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Deleted files will appear here when trash functionality is implemented.
        </p>

        <Link
          to="/dashboard"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to My Files
        </Link>
      </div>
    </section>
  );
};

export default TrashPage;