import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { useStats, useRecentAlerts, useTrendingTopics } from "@/hooks/useDashboardData";
import { TrendingUp, Eye, FileText, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Bon dia";
  if (hour < 18) return "Bona tarda";
  return "Bon vespre";
};

const StatCard = ({
  icon: Icon,
  value,
  label,
  isLoading,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
  isLoading: boolean;
}) => (
  <div className="rounded-xl bg-white p-6 shadow-sm">
    <Icon className="h-6 w-6 text-primary-600" />
    {isLoading ? (
      <Skeleton className="mt-2 h-8 w-16" />
    ) : (
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
    )}
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

const DashboardHome = () => {
  const { user } = useAuth();
  const stats = useStats();
  const { alerts, isLoading: alertsLoading } = useRecentAlerts();
  const { topics, isLoading: topicsLoading } = useTrendingTopics();

  const userName = user?.user_metadata?.full_name?.split(" ")[0] || "Usuari";
  const companyName = user?.user_metadata?.company || "Empresa";

  return (
    <div>
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="font-manrope text-2xl font-bold text-gray-900">
          {getGreeting()}, {userName}
        </h1>
        <p className="mt-1 text-gray-500">
          {companyName} · Pla Gratuït
        </p>
      </div>

      {/* Stats Row */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={TrendingUp}
          value={stats.alertsCount}
          label="Alertes últims 30 dies"
          isLoading={stats.isLoading}
        />
        <StatCard
          icon={Eye}
          value={stats.openedCount}
          label="Alertes obertes"
          isLoading={stats.isLoading}
        />
        <StatCard
          icon={FileText}
          value={stats.reportsCount}
          label="Informes generats"
          isLoading={stats.isLoading}
        />
      </div>

      {/* Two-column content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Alerts Card */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900">Alertes recents</h2>
          
          <div className="mt-4 min-h-[120px]">
            {alertsLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : alerts.length === 0 ? (
              <p className="py-8 text-center text-gray-500">
                No hi ha alertes recents
              </p>
            ) : (
              <ul className="space-y-3">
                {alerts.map((alert) => (
                  <li
                    key={alert.id}
                    className="rounded-lg border border-gray-100 p-3"
                  >
                    <p className="font-medium text-gray-900">{alert.title}</p>
                    <p className="text-sm text-gray-500">
                      {alert.source} · {alert.date}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link
            to="/dashboard/alerts"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800"
          >
            Veure totes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Trending Topics Card */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900">Temes en tendència</h2>
          
          <div className="mt-4 min-h-[120px]">
            {topicsLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : topics.length === 0 ? (
              <p className="py-8 text-center text-gray-500">
                No hi ha temes actius
              </p>
            ) : (
              <ul className="space-y-3">
                {topics.map((topic) => (
                  <li
                    key={topic.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                  >
                    <p className="font-medium text-gray-900">{topic.topic}</p>
                    <span className="text-sm text-gray-500">
                      {topic.mentions} mencions
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
