import { FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useReports } from "@/hooks/useReports";
import { ReportCard } from "@/components/dashboard/ReportCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { ReportCardSkeleton } from "@/components/dashboard/ReportCardSkeleton";
import { ActionButton } from "@/components/dashboard/ActionButtons";

const ReportsPage = () => {
  const { t } = useTranslation();
  const { reports, isLoading } = useReports();

  return (
    <div>
      {/* Header with CTA */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-foreground">
            {t("reports.title")}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {t("reports.description")} · {reports.length} {t("reports.generated")}
          </p>
        </div>
        <ActionButton action="generateReport" showLabel size="default" />
      </div>

      <div className="mt-8">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <ReportCardSkeleton key={i} />
            ))}
          </div>
        ) : reports.length === 0 ? (
          <EmptyState
            icon={FileText}
            title={t("reports.noReports")}
            description={t("reports.noReportsDescription")}
          />
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
