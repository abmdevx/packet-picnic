import { FileText, Trash2, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const DashboardSidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="flex h-full flex-col">
      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`
          }
        >
          <FileText className="size-4" />
          My Files
        </NavLink>

        <NavLink
          to="/dashboard/trash"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`
          }
        >
          <Trash2 className="size-4" />
          Trash
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="border-t p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:bg-muted hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="size-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;