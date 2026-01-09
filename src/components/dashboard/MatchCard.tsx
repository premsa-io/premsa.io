import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { es, ca, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import { Match } from "@/hooks/useMatches";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const getDateLocale = () => {
    switch (i18n.language) {
      case 'ca': return ca;
      case 'en': return enUS;
      default: return es;
    }
  };

  const timeAgo = formatDistanceToNow(new Date(match.created_at), {
    addSuffix: true,
    locale: getDateLocale(),
  });

  const getRelevanceBadgeVariant = (level: string | null) => {
    switch (level) {
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const formatRelevanceScore = (score: number | null) => {
    if (score === null) return null;
    // If score is between 0 and 1, multiply by 100
    const percentage = score <= 1 ? Math.round(score * 100) : Math.round(score);
    return `${percentage}%`;
  };

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:bg-accent/50 hover:shadow-md hover:border-primary/30 hover:scale-[1.01] cursor-pointer"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-heading font-medium text-foreground truncate">
              {match.topic?.title || t("matches.unknownTopic")}
            </p>
            {match.normalized_item?.neutral_summary_original && (
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {match.normalized_item.neutral_summary_original}
              </p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              {match.topic?.primary_ambit && (
                <Badge variant="secondary" className="text-xs">
                  {t(`ambits.${match.topic.primary_ambit.toLowerCase()}`, match.topic.primary_ambit)}
                </Badge>
              )}
              {match.relevance_level && (
                <Badge variant={getRelevanceBadgeVariant(match.relevance_level)} className="text-xs">
                  {t(`matches.${match.relevance_level}`)}
                </Badge>
              )}
              {match.normalized_item?.jurisdiction && (
                <span className="text-xs">{match.normalized_item.jurisdiction}</span>
              )}
              <span>{timeAgo}</span>
            </div>
          </div>
          {match.relevance_score !== null && (
            <div className="flex-shrink-0 text-right">
              <span className="text-lg font-bold text-primary">
                {formatRelevanceScore(match.relevance_score)}
              </span>
              <p className="text-xs text-muted-foreground">{t("matches.relevance")}</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{match.topic?.title || t("matches.unknownTopic")}</DialogTitle>
            <DialogDescription className="flex flex-wrap items-center gap-2">
              {match.topic?.primary_ambit && (
                <Badge variant="secondary" className="text-xs">
                  {t(`ambits.${match.topic.primary_ambit.toLowerCase()}`, match.topic.primary_ambit)}
                </Badge>
              )}
              {match.relevance_level && (
                <Badge variant={getRelevanceBadgeVariant(match.relevance_level)} className="text-xs">
                  {t(`matches.${match.relevance_level}`)}
                </Badge>
              )}
              <span>{timeAgo}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Relevance Score */}
            {match.relevance_score !== null && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{t("matches.relevance")}:</span>
                <span className="text-lg font-bold text-primary">
                  {formatRelevanceScore(match.relevance_score)}
                </span>
              </div>
            )}

            {/* Document Summary */}
            {match.normalized_item?.neutral_summary_original && (
              <div>
                <h4 className="text-sm font-medium mb-2">{t("matches.summary")}</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap bg-muted/50 rounded-lg p-4">
                  {match.normalized_item.neutral_summary_original}
                </p>
              </div>
            )}

            {/* Document Info */}
            <div className="grid grid-cols-2 gap-4">
              {match.normalized_item?.document_type && (
                <div>
                  <span className="text-sm text-muted-foreground">{t("matches.documentType")}:</span>
                  <p className="text-sm font-medium">{match.normalized_item.document_type}</p>
                </div>
              )}
              {match.normalized_item?.jurisdiction && (
                <div>
                  <span className="text-sm text-muted-foreground">{t("matches.jurisdiction")}:</span>
                  <p className="text-sm font-medium">{match.normalized_item.jurisdiction}</p>
                </div>
              )}
            </div>

            {/* View Source Button */}
            {match.normalized_item?.source_url && (
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(match.normalized_item!.source_url!, '_blank');
                }}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {t("matches.viewSource")}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
