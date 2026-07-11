import {
  LayoutDashboard,
  Users,
  FileText,
  FlaskConical,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import logoAsset from "@/assets/protocolpad-logo.png.asset.json";

const navItems = [
  { icon: LayoutDashboard, label: "Painel", path: "/app" },
  { icon: Users, label: "Clientes", path: "/app/clients" },
  { icon: FileText, label: "Protocolos", path: "/app/protocols" },
  { icon: FlaskConical, label: "Modelos de Exames", path: "/app/templates" },
  { icon: BarChart3, label: "Insights", path: "/app/insights" },
  { icon: Settings, label: "Configurações", path: "/app/settings" },
];

interface AppSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function AppSidebar({ mobileOpen = false, onMobileClose }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/40 z-40"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`
          flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300
          fixed lg:static inset-y-0 left-0 z-50
          ${collapsed ? "lg:w-16" : "lg:w-60"}
          w-60
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-0 px-3 h-16 border-b border-sidebar-border">
          <img src={logoAsset.url} alt="Protocol Pad" className="w-11 h-11 object-contain shrink-0" />
          {!collapsed && (
            <span className="font-display text-lg tracking-tight text-sidebar-foreground flex-1">
              Protocol Pad
            </span>
          )}
          <button
            onClick={onMobileClose}
            className="lg:hidden p-1 text-sidebar-foreground/60"
            aria-label="Fechar menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/app"}
              onClick={onMobileClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`
              }
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Collapse toggle (desktop) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center h-12 border-t border-sidebar-border text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Disclaimer */}
        {!collapsed && (
          <div className="px-3 pb-3">
            <p className="text-[10px] leading-tight text-sidebar-foreground/40">
              Ferramenta de apoio à decisão clínica. Não se destina a diagnosticar, tratar ou prescrever.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
