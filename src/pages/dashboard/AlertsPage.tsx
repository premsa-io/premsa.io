import { formatDistanceToNow } from "date-fns";
import { ca } from "date-fns/locale";
import { Bell, Loader2 } from "lucide-react";
import { useAllAlerts } from "@/hooks/useAllAlerts";
import { Badge } from "@/components/ui/badge";

const AlertsPage = () => {
  const { alerts, isLoading } = useAllAlerts();

  return (
    <div>
      <h1 className="text-2xl font-heading font-semibold text-foreground">Alertes</h1>
      <p className="mt-2 text-muted-foreground">
        Totes les alertes generades pel teu compte.
      </p>

      <div className="mt-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : alerts.length === 0 ? (
          <div className="rounded-xl bg-card p-8 text-center border border-border">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">Encara no tens cap alerta.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
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
                          variant={alert.status === "sent" ? "default" : "outline"} 
                          className="text-xs"
                        >
                          {alert.status}
                        </Badge>
                      )}
                      <span>
                        {formatDistanceToNow(new Date(alert.created_at), {
                          addSuffix: true,
                          locale: ca,
                        })}
                      </span>
                    </div>
                  </div>
                  {alert.signal_score !== null && (
                    <div className="flex-shrink-0 text-right">
                      <span className="text-lg font-bold text-primary">{alert.signal_score}</span>
                      <p className="text-xs text-muted-foreground">score</p>
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
