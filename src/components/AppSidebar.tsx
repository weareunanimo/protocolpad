import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  FlaskConical, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Painel", path: "/" },
  { icon: Users, label: "Clientes", path: "/clients" },
  { icon: FileText, label: "Protocolos", path: "/protocols" },
  { icon: FlaskConical, label: "Modelos de Exames", path: "/templates" },
  { icon: BarChart3, label: "Insights", path: "/insights" },
  { icon: Settings, label: "Configurações", path: "/settings" },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
          <FlaskConical className="w-4 h-4 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-display text-lg tracking-tight text-sidebar-foreground">
            Protocol Pad
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-sidebar-border text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Disclaimer */}
      {!collapsed && (
        <div className="px-3 pb-3">
          <p className="text-[10px] leading-tight text-sidebar-foreground/40">
            Clinical decision-support tool. Not intended to diagnose, treat, or prescribe.
          </p>
        </div>
      )}
    </aside>
  );
}
