import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-card md:block">
        <DashboardSidebar />
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex h-14 items-center border-b bg-background px-4 md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu className="size-5" />
          </SheetTrigger>

          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="border-b px-4 py-4">
              <SheetTitle>Packet Picnic</SheetTitle>
            </SheetHeader>

            <DashboardSidebar />
          </SheetContent>
        </Sheet>

        <div className="ml-3 text-sm font-semibold">
          Packet Picnic
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;