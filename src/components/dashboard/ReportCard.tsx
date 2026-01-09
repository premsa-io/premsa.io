import { useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import { es, ca, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { Download, FileText, Calendar, Tag } from "lucide-react";
import { Report } from "@/hooks/useReports";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ReportCardProps {
  report: Report;
}

export const ReportCard = ({ report }: ReportCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const getDateLocale = () => {
    switch (i18n.language) {
      case 'ca': return ca;
      case 'en': return enUS;
      default: return es;
    }
  };

  const timeAgo = formatDistanceToNow(new Date(report.created_at), {
    addSuffix: true,
    locale: getDateLocale(),
  });

  const formatPeriod = () => {
    if (!report.period_start || !report.period_end) return null;
    const start = format(new Date(report.period_start), "d MMM yyyy", { locale: getDateLocale() });
    const end = format(new Date(report.period_end), "d MMM yyyy", { locale: getDateLocale() });
    return `${start} - ${end}`;
  };

  return (
    <>
      {/* Clickable Card */}
      <div 
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:bg-accent/50 hover:shadow-md hover:border-primary/30 hover:scale-[1.01] cursor-pointer"
      >
        <div className="flex items-start justify-between gap-3">
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
                  {t(`reports.types.${report.report_type}`, report.report_type)}
                </Badge>
              )}
              {report.status && (
                <Badge 
                  variant={report.status === "published" ? "default" : "outline"} 
                  className="text-xs"
                >
                  {t(`reports.statuses.${report.status}`, report.status)}
                </Badge>
              )}
              <span>{timeAgo}</span>
            </div>
          </div>
          {report.pdf_url && (
            <FileText className="h-5 w-5 text-primary flex-shrink-0" />
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{report.title}</DialogTitle>
            <DialogDescription className="flex flex-wrap items-center gap-2">
              {report.report_type && (
                <Badge variant="secondary" className="text-xs">
                  {t(`reports.types.${report.report_type}`, report.report_type)}
                </Badge>
              )}
              {report.status && (
                <Badge variant={report.status === "published" ? "default" : "outline"} className="text-xs">
                  {t(`reports.statuses.${report.status}`, report.status)}
                </Badge>
              )}
              <span>{timeAgo}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Period */}
            {formatPeriod() && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("reports.period")}:</span>
                <span className="text-sm font-medium">{formatPeriod()}</span>
              </div>
            )}

            {/* Executive Summary */}
            {report.executive_summary && (
              <div>
                <h4 className="text-sm font-medium mb-2">{t("reports.executiveSummary")}</h4>
                <p className="text-sm text-muted-foreground">{report.executive_summary}</p>
              </div>
            )}

            {/* Full Content */}
            {report.full_content && (
              <div>
                <h4 className="text-sm font-medium mb-2">{t("reports.fullContent")}</h4>
                <div className="text-sm text-muted-foreground whitespace-pre-wrap bg-muted/50 rounded-lg p-4 max-h-60 overflow-y-auto">
                  {report.full_content}
                </div>
              </div>
            )}

            {/* Topics Covered */}
            {report.topics_covered && report.topics_covered.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  {t("reports.topicsCovered")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {report.topics_covered.map((topic, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Interpretations Count */}
            {report.interpretations_count !== null && report.interpretations_count > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{t("reports.interpretationsCount")}:</span>
                <span className="text-sm font-medium">{report.interpretations_count}</span>
              </div>
            )}

            {/* Download PDF Button */}
            {report.pdf_url && (
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(report.pdf_url!, '_blank');
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                {t("reports.downloadPdf")}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
