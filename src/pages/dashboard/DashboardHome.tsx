import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useRecentAlerts } from "@/hooks/useAlerts";
import { useRecentMatches } from "@/hooks/useMatches";
import { useDomainBreakdown } from "@/hooks/useDomainBreakdown";
import { TrendingUp, Users, FileText, Layers, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/dashboard/StatCard";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { MatchCard } from "@/components/dashboard/MatchCard";
import { DomainChart } from "@/components/dashboard/DomainChart";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Bon dia";
  if (hour < 18) return "Bona tarda";
  return "Bon vespre";
};

const DashboardHome = () => {
  const { user, profile, account, loading } = useAuth();
  const stats = useDashboardStats();
  const { alerts, isLoading: alertsLoading } = useRecentAlerts(5);
  const { matches, isLoading: matchesLoading } = useRecentMatches(5);
  const { domains, isLoading: domainsLoading } = useDomainBreakdown();

  console.log("[DashboardHome] 🎯 Render state:", {
    loading,
    user: user?.email,
    profile: profile,
    account: account,
    stats: { ...stats },
    alertsCount: alerts.length,
    matchesCount: matches.length,
  });

  const userName = profile?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "Usuari";
  const companyName = account?.company_name || "La teva empresa";
  const tier = account?.tier || "starter";

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="mt-2 h-5 w-48" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          {getGreeting()}, {userName}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {companyName} · Pla {tier}
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={TrendingUp}
          value={stats.alertsCount}
          label="Alertes actives"
          isLoading={stats.isLoading}
          to="/dashboard/alerts"
        />
        <StatCard
          icon={Users}
          value={stats.matchesCount}
          label="Matches totals"
          isLoading={stats.isLoading}
          to="/dashboard/knowledge"
        />
        <StatCard
          icon={FileText}
          value={stats.reportsCount}
          label="Informes generats"
          isLoading={stats.isLoading}
          to="/dashboard/reports"
        />
        <StatCard
          icon={Layers}
          value={stats.topicsCount}
          label="Temes monitorats"
          isLoading={stats.isLoading}
          to="/dashboard/knowledge"
        />
      </div>

      {/* Two-column content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Alerts */}
        <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-foreground">Alertes recents</h2>
            <Link
              to="/dashboard/alerts"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
            >
              Veure totes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-3 min-h-[200px]">
            {alertsLoading ? (
              [...Array(3)].map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)
            ) : alerts.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">
                No hi ha alertes recents
              </p>
            ) : (
              alerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)
            )}
          </div>
        </div>

        {/* Recent Matches */}
        <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-foreground">Matches recents</h2>
            <Link
              to="/dashboard/knowledge"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
            >
              Veure tots
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-3 min-h-[200px]">
            {matchesLoading ? (
              [...Array(3)].map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)
            ) : matches.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">
                No hi ha matches recents
              </p>
            ) : (
              matches.map((match) => <MatchCard key={match.id} match={match} />)
            )}
          </div>
        </div>
      </div>

      {/* Domain Breakdown */}
      <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
        <h2 className="font-heading font-semibold text-foreground mb-4">Distribució per àmbit</h2>
        <DomainChart domains={domains} isLoading={domainsLoading} />
      </div>
    </div>
  );
};

export default DashboardHome;
