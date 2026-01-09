import { formatDistanceToNow } from "date-fns";
import { ca } from "date-fns/locale";
import { Alert } from "@/hooks/useAlerts";

interface AlertCardProps {
  alert: Alert;
}

export const AlertCard = ({ alert }: AlertCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(alert.created_at), {
    addSuffix: true,
    locale: ca,
  });

  return (
    <div className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-heading font-medium text-foreground truncate">{alert.title}</p>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            {alert.type && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {alert.type}
              </span>
            )}
            <span>{timeAgo}</span>
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
  );
};
