import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/AuthContext";
import {
  LayoutDashboard,
  Bell,
  FileText,
  BookOpen,
  Settings,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: t("sidebar.dashboard"), path: "/dashboard" },
    { icon: Bell, label: t("sidebar.alerts"), path: "/dashboard/alerts" },
    { icon: FileText, label: t("sidebar.reports"), path: "/dashboard/reports" },
    { icon: BookOpen, label: t("sidebar.knowledge"), path: "/dashboard/knowledge" },
    { icon: Settings, label: t("sidebar.settings"), path: "/dashboard/settings" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const getUserInitials = () => {
    const name = user?.user_metadata?.full_name || user?.email || "U";
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-60 flex-col bg-primary-900 px-4 py-6 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button (mobile) */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/60 hover:text-white lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Logo */}
        <div className="mb-6">
          <Link to="/dashboard" className="font-manrope text-xl font-bold text-white">
            PREMSA.IO
          </Link>
        </div>

        <div className="mb-6 border-b border-primary-700" />

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                  active
                    ? "border-l-[3px] border-accent-600 bg-primary-700 text-white"
                    : "text-white/80 hover:bg-primary-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="mt-auto border-t border-primary-700 pt-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-600 text-sm font-semibold text-white">
              {getUserInitials()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-white">
                {user?.user_metadata?.full_name || t("sidebar.user")}
              </p>
              <p className="truncate text-xs text-white/60">
                {user?.user_metadata?.company || user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="mt-4 flex w-full items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            {t("sidebar.logout")}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;