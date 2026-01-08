import { Menu } from "lucide-react";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-gray-200 bg-white px-4 lg:px-8">
      {/* Hamburger menu (mobile only) */}
      <button
        onClick={onMenuClick}
        className="mr-4 rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Spacer - can add breadcrumbs or search here later */}
      <div className="flex-1" />

      {/* Right side - can add notifications, quick actions later */}
      <div className="flex items-center gap-4">
        {/* Placeholder for future features */}
      </div>
    </header>
  );
};

export default DashboardHeader;
