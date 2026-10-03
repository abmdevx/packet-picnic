import { NavLink } from "react-router-dom";
import {
  Files,
  Trash2,
  Home,
} from "lucide-react";

const menuItems = [
  { label: "My Files", path: "/dashboard", icon: Files },
  { label: "Trash", path: "/dashboard/trash", icon: Trash2 },
];

const LOGO_URL = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/v1790490826/logo_yz7vqp.png`;

const DashboardSidebar = () => {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r bg-card md:flex">
      <div className="flex h-16 items-center gap-3 border-b px-5">
        <img
          src={LOGO_URL}
          alt="Packet Picnic"
          className="size-40 shrink-0 object-contain"
        />
      </div>
      <div className="flex-1 space-y-6 p-4">
        <div>
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Workspace
          </p>

          <nav className="space-y-1">
            {menuItems.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                <Icon className="size-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t p-4">
        <NavLink
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Home className="size-4" />
          Back to Home
        </NavLink>
      </div>
    </aside>
  );
};

export default DashboardSidebar;