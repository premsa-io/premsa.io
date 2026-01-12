import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

const routeTranslations: Record<string, string> = {
  dashboard: "sidebar.dashboard",
  alerts: "sidebar.alerts",
  matches: "sidebar.matches",
  reports: "sidebar.reports",
  knowledge: "sidebar.knowledge",
  settings: "sidebar.settings",
};

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  const { t } = useTranslation();
  const location = useLocation();

  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  const getCurrentPageTitle = () => {
    const lastSegment = pathSegments[pathSegments.length - 1];
    return t(routeTranslations[lastSegment] || lastSegment);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-4 lg:px-8">
      {/* Hamburger menu (mobile only) */}
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Breadcrumbs (desktop only) */}
      <Breadcrumb className="hidden lg:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
                <Home className="h-4 w-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathSegments.length > 1 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium">
                  {getCurrentPageTitle()}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page title (mobile only) */}
      <h1 className="font-heading font-semibold text-foreground lg:hidden">
        {getCurrentPageTitle()}
      </h1>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right side - can add notifications, quick actions later */}
      <div className="flex items-center gap-4">
        {/* Placeholder for future features */}
      </div>
    </header>
  );
};

export default DashboardHeader;
