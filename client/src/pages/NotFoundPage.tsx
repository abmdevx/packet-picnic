import { Link } from "react-router-dom";
import { ArrowLeft, Home, PackageX } from "lucide-react";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <PackageX className="size-8" />
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Error 404
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
          Oops! The page you're looking for doesn't exist,
          may have been moved, or the URL is incorrect.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Home className="size-4" />
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <ArrowLeft className="size-4" />
            Go Back
          </button>
        </div>

        <p className="mt-12 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            Packet Picnic
          </span>{" "}
          · Share files, simply.
        </p>
      </div>
    </main>
  );
};

export default NotFoundPage;