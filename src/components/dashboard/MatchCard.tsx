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
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { ActionButton } from "@/components/dashboard/ActionButtons";
import { useIsMobile } from "@/hooks/use-mobile";

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();

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

  const getRelevanceBadgeClasses = (level: string | null) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800';
      case 'low': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
      default: return '';
    }
  };

  const formatRelevanceScore = (score: number | null) => {
    if (score === null) return null;
    const percentage = score <= 1 ? Math.round(score * 100) : Math.round(score);
    return `${percentage}%`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const modalContent = (
    <div className="space-y-4">
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

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <ActionButton
          action="requestInterpretation"
          variant="default"
          size="sm"
          showLabel
          matchId={match.id}
          topicId={match.topic_id}
          className="flex-1"
        />
        {match.normalized_item?.source_url && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
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
    </div>
  );

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`${t("matches.match")}: ${match.topic?.title || t("matches.unknownTopic")}`}
        className="rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:bg-accent/50 hover:shadow-md hover:border-primary/30 hover:scale-[1.01] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
                <Badge variant="outline" className={`text-xs ${getRelevanceBadgeClasses(match.relevance_level)}`}>
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

      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="max-h-[85vh]">
            <DrawerHeader>
              <DrawerTitle>{match.topic?.title || t("matches.unknownTopic")}</DrawerTitle>
              <DrawerDescription className="flex flex-wrap items-center gap-2">
                {match.topic?.primary_ambit && (
                  <Badge variant="secondary" className="text-xs">
                    {t(`ambits.${match.topic.primary_ambit.toLowerCase()}`, match.topic.primary_ambit)}
                  </Badge>
                )}
                {match.relevance_level && (
                  <Badge variant="outline" className={`text-xs ${getRelevanceBadgeClasses(match.relevance_level)}`}>
                    {t(`matches.${match.relevance_level}`)}
                  </Badge>
                )}
                <span>{timeAgo}</span>
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-6 overflow-y-auto">
              {modalContent}
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
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
                  <Badge variant="outline" className={`text-xs ${getRelevanceBadgeClasses(match.relevance_level)}`}>
                    {t(`matches.${match.relevance_level}`)}
                  </Badge>
                )}
                <span>{timeAgo}</span>
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              {modalContent}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
