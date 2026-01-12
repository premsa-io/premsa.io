import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { es, ca, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { Alert } from "@/hooks/useAlerts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface AlertCardProps {
  alert: Alert;
}

export const AlertCard = ({ alert }: AlertCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const getDateLocale = () => {
    switch (i18n.language) {
      case 'ca': return ca;
      case 'en': return enUS;
      default: return es;
    }
  };

  const timeAgo = formatDistanceToNow(new Date(alert.created_at), {
    addSuffix: true,
    locale: getDateLocale(),
  });

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:bg-accent/50 hover:shadow-md hover:border-primary/30 hover:scale-[1.01] cursor-pointer"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-heading font-medium text-foreground truncate">{alert.title}</p>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              {alert.alert_type && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {alert.alert_type}
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{alert.title}</DialogTitle>
            <DialogDescription className="flex items-center gap-2">
              {alert.alert_type && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {alert.alert_type}
                </span>
              )}
              <span>{timeAgo}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {alert.signal_score !== null && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{t("alerts.signalScore")}:</span>
                <span className="text-lg font-bold text-primary">{alert.signal_score}</span>
              </div>
            )}
            {alert.status && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{t("alerts.status")}:</span>
                <span className="font-medium capitalize">{alert.status}</span>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
