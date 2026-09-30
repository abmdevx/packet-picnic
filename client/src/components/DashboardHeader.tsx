import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DashboardHeader = () => {
  return (
    <header className="flex flex-col gap-4 border-b bg-background px-6 py-5 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          My Files
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage and share your uploaded files.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search files..."
            className="w-full pl-9 sm:w-64"
          />
        </div>

        <Button render={<Link to="/upload" />}>
         <Plus className="mr-2 size-4" />
         Upload File
        </Button>

      </div>
    </header>
  );
};

export default DashboardHeader;