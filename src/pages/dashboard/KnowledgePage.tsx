import { formatDistanceToNow } from "date-fns";
import { ca } from "date-fns/locale";
import { BookOpen, Loader2 } from "lucide-react";
import { useTopics } from "@/hooks/useTopics";
import { Badge } from "@/components/ui/badge";

const KnowledgePage = () => {
  const { topics, isLoading } = useTopics();

  return (
    <div>
      <h1 className="text-2xl font-heading font-semibold text-foreground">Coneixement</h1>
      <p className="mt-2 text-muted-foreground">
        Temes regulatoris que estem monitoritzant pel teu compte.
      </p>

      <div className="mt-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : topics.length === 0 ? (
          <div className="rounded-xl bg-card p-8 text-center border border-border">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">Encara no tens cap tema configurat.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
              >
                <div className="flex flex-col gap-2">
                  <p className="font-heading font-medium text-foreground line-clamp-2">
                    {topic.title}
                  </p>
                  {topic.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {topic.description}
                    </p>
                  )}
                  <div className="mt-auto flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    {topic.primary_ambit && (
                      <Badge variant="secondary" className="text-xs">
                        {topic.primary_ambit}
                      </Badge>
                    )}
                    {topic.status && (
                      <Badge 
                        variant={topic.status === "active" ? "default" : "outline"} 
                        className="text-xs"
                      >
                        {topic.status}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(topic.created_at), {
                      addSuffix: true,
                      locale: ca,
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
