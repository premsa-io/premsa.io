import { formatDistanceToNow } from "date-fns";
import { ca } from "date-fns/locale";
import { Match } from "@/hooks/useMatches";

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(match.matched_at), {
    addSuffix: true,
    locale: ca,
  });

  return (
    <div className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-heading font-medium text-foreground truncate">
            {match.topic?.title || "Tema desconegut"}
          </p>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            {match.topic?.primary_ambit && (
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                {match.topic.primary_ambit}
              </span>
            )}
            <span>{timeAgo}</span>
          </div>
        </div>
        {match.relevance_score !== null && (
          <div className="flex-shrink-0 text-right">
            <span className="text-lg font-bold text-primary">
              {Math.round(match.relevance_score * 100)}%
            </span>
            <p className="text-xs text-muted-foreground">rellevància</p>
          </div>
        )}
      </div>
    </div>
  );
};
