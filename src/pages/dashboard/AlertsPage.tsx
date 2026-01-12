import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { es, ca, enUS } from "date-fns/locale";
import { Bell, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAllAlerts } from "@/hooks/useAllAlerts";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { AlertCardSkeleton } from "@/components/dashboard/AlertCardSkeleton";

const getDateLocale = (lang: string) => {
  switch (lang) {
    case 'ca': return ca;
    case 'en': return enUS;
    default: return es;
  }
};

const AlertsPage = () => {
  const { t, i18n } = useTranslation();
  const { alerts, isLoading } = useAllAlerts();
  const dateLocale = getDateLocale(i18n.language);
  
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'sent' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter alerts based on tab and search
  const filteredAlerts = alerts.filter((alert) => {
    const matchesTab = activeTab === 'all' || alert.status === activeTab;
    const matchesSearch = searchQuery === '' || 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (alert.summary && alert.summary.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div>
      <h1 className="text-2xl font-heading font-semibold text-foreground">{t("alerts.title")}</h1>
      <p className="mt-2 text-muted-foreground">
        {t("alerts.description")}
      </p>

      {/* Filters */}
      <div className="mt-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={t("alerts.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">{t("alerts.all")}</TabsTrigger>
            <TabsTrigger value="new">{t("alerts.new")}</TabsTrigger>
            <TabsTrigger value="sent">{t("alerts.sent")}</TabsTrigger>
            <TabsTrigger value="archived">{t("alerts.archived")}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <AlertCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredAlerts.length === 0 ? (
          <EmptyState
            icon={Bell}
            title={t("alerts.noAlerts")}
            description={searchQuery ? t("alerts.noSearchResults") : undefined}
          />
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t("alerts.showing", { count: filteredAlerts.length })}
            </p>
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                role="button"
                tabIndex={0}
                className="rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:bg-accent/50 hover:shadow-md hover:border-primary/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label={`${t("alerts.alert")}: ${alert.title}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-medium text-foreground">{alert.title}</p>
                    {alert.summary && (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {alert.summary}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      {alert.alert_type && (
                        <Badge variant="secondary" className="text-xs">
                          {alert.alert_type}
                        </Badge>
                      )}
                      {alert.status && (
                        <Badge 
                          variant={alert.status === "sent" ? "default" : alert.status === "new" ? "destructive" : "outline"} 
                          className="text-xs"
                        >
                          {t(`alerts.status_${alert.status}`, alert.status)}
                        </Badge>
                      )}
                      <span>
                        {formatDistanceToNow(new Date(alert.created_at), {
                          addSuffix: true,
                          locale: dateLocale,
                        })}
                      </span>
                    </div>
                  </div>
                  {alert.signal_score !== null && (
                    <div className="flex-shrink-0 text-right">
                      <span className="text-lg font-bold text-primary">{alert.signal_score}</span>
                      <p className="text-xs text-muted-foreground">{t("alerts.score")}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;
