import { formatDistanceToNow } from "date-fns";
import { es, ca, enUS } from "date-fns/locale";
import { FileText, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useReports } from "@/hooks/useReports";
import { Badge } from "@/components/ui/badge";

const getDateLocale = (lang: string) => {
  switch (lang) {
    case 'ca': return ca;
    case 'en': return enUS;
    default: return es;
  }
};

const ReportsPage = () => {
  const { t, i18n } = useTranslation();
  const { reports, isLoading } = useReports();
  const dateLocale = getDateLocale(i18n.language);

  return (
    <div>
      <h1 className="text-2xl font-heading font-semibold text-foreground">{t("reports.title")}</h1>
      <p className="mt-2 text-muted-foreground">
        {t("reports.description")}
      </p>

      <div className="mt-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : reports.length === 0 ? (
          <div className="rounded-xl bg-card p-8 text-center border border-border">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">{t("reports.noReports")}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-medium text-foreground">{report.title}</p>
                    {report.executive_summary && (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {report.executive_summary}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      {report.report_type && (
                        <Badge variant="secondary" className="text-xs">
                          {report.report_type}
                        </Badge>
                      )}
                      {report.status && (
                        <Badge 
                          variant={report.status === "published" ? "default" : "outline"} 
                          className="text-xs"
                        >
                          {report.status}
                        </Badge>
                      )}
                      <span>
                        {formatDistanceToNow(new Date(report.created_at), {
                          addSuffix: true,
                          locale: dateLocale,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
