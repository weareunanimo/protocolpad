import { Outlet } from "react-router-dom";
import { useState } from "react";
import AppSidebar from "./AppSidebar";
import { Bell, Search, Menu } from "lucide-react";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-border bg-card shrink-0 gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>

          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Buscar…"
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xs font-semibold text-primary-foreground">DR</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
