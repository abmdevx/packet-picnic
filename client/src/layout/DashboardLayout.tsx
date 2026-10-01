import { Outlet, Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const pageTitles: Record<string, string> = {
  "/dashboard": "My Files",
  "/dashboard/upload": "Upload Files",
  "/dashboard/recent": "Recent Files",
  "/dashboard/shared": "Shared Files",
  "/dashboard/trash": "Trash",
};

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <main className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              title="Home"
            >
              <Home className="size-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <ChevronRight className="size-4 text-muted-foreground" />

            <span className="font-medium">{title}</span>
          </div>

          <Link
            to="/dashboard/upload"
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Upload
          </Link>
        </header>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;