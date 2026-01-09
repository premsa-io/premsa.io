import { FileText, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useReports } from "@/hooks/useReports";
import { ReportCard } from "@/components/dashboard/ReportCard";

const ReportsPage = () => {
  const { t } = useTranslation();
  const { reports, isLoading } = useReports();

  return (
    <div>
      <h1 className="text-2xl font-heading font-semibold text-foreground">
        {t("reports.title")}
      </h1>
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
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
