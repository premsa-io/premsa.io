import { formatDistanceToNow } from "date-fns";
import { es, ca, enUS } from "date-fns/locale";
import { BookOpen, Loader2, TrendingUp, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTopics } from "@/hooks/useTopics";
import { Badge } from "@/components/ui/badge";

const getDateLocale = (lang: string) => {
  switch (lang) {
    case 'ca': return ca;
    case 'en': return enUS;
    default: return es;
  }
};

const KnowledgePage = () => {
  const { t, i18n } = useTranslation();
  const { topics, isLoading } = useTopics();
  const dateLocale = getDateLocale(i18n.language);

  const getAmbitLabel = (ambit: string) => {
    return t(`ambits.${ambit}`, { defaultValue: ambit });
  };

  return (
    <div>
      <h1 className="text-2xl font-heading font-semibold text-foreground">{t("knowledge.title")}</h1>
      <p className="mt-2 text-muted-foreground">
        {t("knowledge.description")}
      </p>

      <div className="mt-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : topics.length === 0 ? (
          <div className="rounded-xl bg-card p-8 text-center border border-border">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">{t("knowledge.noTopics")}</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
              >
                <div className="flex flex-col gap-3">
                  <p className="font-heading font-medium text-foreground line-clamp-2">
                    {topic.title}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {topic.current_signal_score !== null && (
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5" />
                        {t("knowledge.signal")}: {topic.current_signal_score}
                      </span>
                    )}
                    {topic.event_count !== null && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {topic.event_count} {t("knowledge.events")}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {topic.primary_ambit && (
                      <Badge variant="secondary" className="text-xs">
                        {getAmbitLabel(topic.primary_ambit)}
                      </Badge>
                    )}
                  </div>
                  
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(topic.created_at), {
                      addSuffix: true,
                      locale: dateLocale,
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgePage;