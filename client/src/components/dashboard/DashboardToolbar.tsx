import {
  Search,
  ArrowDownAZ,
  Filter,
  Upload,
  List,
  LayoutGrid,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DashboardToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  sort: string;
  onSortChange: (value: string) => void;

  view: "list" | "grid";
  onViewChange: (value: "list" | "grid") => void;

  onUpload: () => void;
}

const DashboardToolbar = ({
  search,
  onSearchChange,
  sort,
  onSortChange,
  view,
  onViewChange,
  onUpload,
}: DashboardToolbarProps) => {
  return (
    <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Search */}
      <div className="relative w-full lg:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search your files..."
          className="pl-9"
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Sort */}
        <div className="flex items-center gap-2">
          <ArrowDownAZ className="size-4 text-muted-foreground" />

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="h-9 rounded-md border bg-background px-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            aria-label="Sort files"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="name">Name</option>
            <option value="size">File size</option>
          </select>
        </div>

        {/* Filter */}
        <Button
          variant="outline"
          size="icon"
          title="Filter files"
          onClick={() => onSortChange("newest")}
        >
          <Filter className="size-4" />
        </Button>

        {/* View */}
        <div className="flex items-center rounded-lg border p-1">
          <Button
            variant={view === "list" ? "secondary" : "ghost"}
            size="icon"
            title="List view"
            onClick={() => onViewChange("list")}
          >
            <List className="size-4" />
          </Button>

          <Button
            variant={view === "grid" ? "secondary" : "ghost"}
            size="icon"
            title="Grid view"
            onClick={() => onViewChange("grid")}
          >
            <LayoutGrid className="size-4" />
          </Button>
        </div>

        {/* Upload */}
        <Button onClick={onUpload}>
          <Upload className="mr-2 size-4" />
          Upload
        </Button>
      </div>
    </div>
  );
};

export default DashboardToolbar;