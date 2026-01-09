import { Loader2, Building2, FileText, Lightbulb, Target } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/AuthContext";
import { useClientKnowledgeBase } from "@/hooks/useClientKnowledgeBase";
import { useClientInterpretations } from "@/hooks/useClientInterpretations";
import { useInferredInterests } from "@/hooks/useInferredInterests";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const KnowledgePage = () => {
  const { t } = useTranslation();
  const { account } = useAuth();
  const { documents, isLoading: loadingDocs } = useClientKnowledgeBase();
  const { interpretations, isLoading: loadingInterp } = useClientInterpretations(5);
  const { ambits, isLoading: loadingAmbits } = useInferredInterests();

  const isLoading = loadingDocs || loadingInterp || loadingAmbits;
  const totalMatches = ambits.reduce((sum, a) => sum + a.matchCount, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-semibold text-foreground">
          {t("knowledge.title")}
        </h1>
        <p className="mt-2 text-muted-foreground">{t("knowledge.description")}</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Secció 1: Perfil de l'Empresa */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {t("knowledge.companyProfile")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">{t("knowledge.sector")}</p>
                  <p className="font-medium">
                    {account?.sector
                      ? t(`sectors.${account.sector}`, account.sector)
                      : t("settings.notSpecified")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("knowledge.size")}</p>
                  <p className="font-medium">
                    {account?.company_size || t("settings.notSpecified")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("knowledge.countries")}</p>
                  <div className="flex flex-wrap gap-1">
                    {account?.countries_of_operation?.length ? (
                      account.countries_of_operation.map((c: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {c}
                        </Badge>
                      ))
                    ) : (
                      <span>{t("settings.notSpecified")}</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Secció 2: Àmbits d'Interès Inferits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {t("knowledge.inferredInterests")}
              </CardTitle>
              <CardDescription>
                {t("knowledge.inferredInterestsDescription", { count: totalMatches })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ambits.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("knowledge.noInterests")}</p>
              ) : (
                <div className="space-y-4">
                  {ambits.slice(0, 5).map((ambit) => (
                    <div key={ambit.ambit} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">
                          {t(`ambits.${ambit.ambit}`, ambit.ambit)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {ambit.matchCount} matches
                        </span>
                      </div>
                      <Progress value={(ambit.matchCount / totalMatches) * 100} />
                      <div className="flex flex-wrap gap-1">
                        {ambit.topTopics.map((topic, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {topic.title} ({topic.count})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Secció 3: Documents Processats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t("knowledge.processedDocuments")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {documents.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("knowledge.noDocuments")}</p>
              ) : (
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="p-3 rounded-lg border border-border">
                      <div className="flex justify-between items-start">
                        <p className="font-medium">
                          {doc.title || t("knowledge.untitledDocument")}
                        </p>
                        <Badge
                          variant={doc.status === "validated" ? "default" : "secondary"}
                        >
                          {t(`knowledge.docStatus.${doc.status}`, doc.status || "unknown")}
                        </Badge>
                      </div>
                      {doc.keywords && doc.keywords.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {doc.keywords.slice(0, 5).map((kw, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {kw}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Secció 4: Interpretacions Recents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                {t("knowledge.recentInterpretations")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {interpretations.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  {t("knowledge.noInterpretations")}
                </p>
              ) : (
                <div className="space-y-3">
                  {interpretations.map((interp) => (
                    <div key={interp.id} className="p-3 rounded-lg border border-border">
                      <div className="flex justify-between items-start">
                        <p className="font-medium">{interp.title}</p>
                        {interp.impact_level && (
                          <Badge
                            variant={
                              interp.impact_level === "high"
                                ? "destructive"
                                : interp.impact_level === "medium"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {t(`knowledge.impact.${interp.impact_level}`)}
                          </Badge>
                        )}
                      </div>
                      {interp.summary && (
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {interp.summary}
                        </p>
                      )}
                      {interp.recommended_actions && interp.recommended_actions.length > 0 && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          {interp.recommended_actions.length} {t("knowledge.recommendedActions")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default KnowledgePage;
