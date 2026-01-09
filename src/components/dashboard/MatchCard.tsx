import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ca } from "date-fns/locale";
import { Match } from "@/hooks/useMatches";
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

const ambitTranslations: Record<string, string> = {
  education: "Educació",
  labor: "Laboral",
  health: "Salut",
  environment: "Medi Ambient",
  economy: "Economia",
  technology: "Tecnologia",
  energy: "Energia",
  transport: "Transport",
  housing: "Habitatge",
  justice: "Justícia",
  security: "Seguretat",
  culture: "Cultura",
  social: "Social",
  agriculture: "Agricultura",
  industry: "Indústria",
  commerce: "Comerç",
  finance: "Finances",
  tourism: "Turisme",
  telecom: "Telecomunicacions",
};

const translateAmbit = (ambit: string): string => {
  const key = ambit.toLowerCase();
  return ambitTranslations[key] || ambit;
};

export const MatchCard = ({ match }: MatchCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(match.created_at), {
    addSuffix: true,
    locale: ca,
  });

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:bg-accent/50 hover:shadow-md hover:border-primary/30 hover:scale-[1.01] cursor-pointer"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-heading font-medium text-foreground truncate">
              {match.topic?.title || "Tema desconegut"}
            </p>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              {match.topic?.primary_ambit && (
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                  {translateAmbit(match.topic.primary_ambit)}
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{match.topic?.title || "Tema desconegut"}</DialogTitle>
            <DialogDescription className="flex items-center gap-2">
              {match.topic?.primary_ambit && (
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                  {translateAmbit(match.topic.primary_ambit)}
                </span>
              )}
              <span>{timeAgo}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {match.relevance_score !== null && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Rellevància:</span>
                <span className="text-lg font-bold text-primary">
                  {Math.round(match.relevance_score * 100)}%
                </span>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
