import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useOnboarding, TopicRecommendation } from "@/context/OnboardingContext";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { ArrowRight, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import OnboardingLayoutV3 from "./OnboardingLayoutV3";
import { useTranslation } from "react-i18next";
import { getLocalizedField } from "@/lib/i18n-helpers";

const MAX_TOPICS = 10;

const OnboardingStep5Page = () => {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();
  const { user, account, loading: authLoading } = useAuth();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language?.substring(0, 2) || 'en';
  
  const [topics, setTopics] = useState<TopicRecommendation[]>(data.selectedTopics || []);
  const [isLoading, setIsLoading] = useState(data.selectedTopics.length === 0);
  const [error, setError] = useState<string | null>(null);

  // Redirect checks
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/onboarding/step-1');
    }
    if (!authLoading && account?.onboarding_completed_at) {
      navigate('/dashboard');
    }
  }, [authLoading, user, account, navigate]);

  // Redirect to step 4 if country not selected
  useEffect(() => {
    if (!data.selectedCountry) {
      navigate('/onboarding/step-4');
    }
  }, [data.selectedCountry, navigate]);

  // Fetch AI recommendations if not already loaded
  useEffect(() => {
    const fetchTopics = async () => {
      // If we already have topics from step 2, use those
      if (data.selectedTopics && data.selectedTopics.length > 0) {
        setTopics(data.selectedTopics);
        setIsLoading(false);
        return;
      }

      // Otherwise fetch from AI
      const description = data.description || data.businessDescription || data.aiSummary;
      if (!description) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { data: result, error: fnError } = await supabase.functions.invoke('onboarding-ai', {
          body: {
            action: 'analyze',
            description,
            sector: data.sector,
            country: data.selectedCountry,
            max_topics: MAX_TOPICS,
          }
        });

        if (fnError) throw fnError;

        if (result?.topics) {
          const formattedTopics: TopicRecommendation[] = result.topics.map((t: any) => ({
            id: t.id || crypto.randomUUID(),
            title: t.title,
            primary_ambit: t.primary_ambit || 'General',
            relevance: t.relevance || 'medium',
            reason: t.reason || '',
            selected: t.selected ?? true,
          }));

          setTopics(formattedTopics);
          updateData({ 
            selectedTopics: formattedTopics,
            aiSummary: result.summary || data.aiSummary,
          });
        }
      } catch (err) {
        console.error('Error fetching topics:', err);
        setError(t('onboarding.step5.loadError', "No s'han pogut carregar les recomanacions. Torna-ho a provar."));
        toast.error(t('onboarding.step5.loadErrorToast', "Error en carregar els tòpics recomanats"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const handleToggleTopic = (topicId: string) => {
    setTopics(prev => {
      const updated = prev.map(t => 
        t.id === topicId ? { ...t, selected: !t.selected } : t
      );
      updateData({ selectedTopics: updated });
      return updated;
    });
  };

  const handleSelectAll = () => {
    setTopics(prev => {
      const updated = prev.map(t => ({ ...t, selected: true }));
      updateData({ selectedTopics: updated });
      return updated;
    });
  };

  const handleDeselectAll = () => {
    setTopics(prev => {
      const updated = prev.map(t => ({ ...t, selected: false }));
      updateData({ selectedTopics: updated });
      return updated;
    });
  };

  const selectedCount = topics.filter(t => t.selected).length;

  const handleContinue = () => {
    if (selectedCount === 0) {
      toast.error(t('onboarding.step5.selectAtLeastOne', "Selecciona almenys un tòpic"));
      return;
    }
    navigate('/onboarding/step-6');
  };

  const getRelevanceBadgeVariant = (relevance: string) => {
    switch (relevance) {
      case 'high': return 'default';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  };

  const getRelevanceLabel = (relevance: string) => {
    switch (relevance) {
      case 'high': return t('onboarding.step5.relevanceHigh', 'Alta');
      case 'medium': return t('onboarding.step5.relevanceMedium', 'Mitjana');
      default: return t('onboarding.step5.relevanceLow', 'Baixa');
    }
  };

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case 'high': return '🟢';
      case 'medium': return '🟡';
      default: return '⚪';
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <OnboardingLayoutV3
      title={t('onboarding.step5.title', 'Tòpics regulatoris')}
      subtitle={t('onboarding.step5.subtitle', "Basant-nos en el teu perfil, et recomanem aquests tòpics")}
    >
      <div className="space-y-6">
        {/* AI Summary */}
        {data.aiSummary && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">{t('onboarding.step5.aiRecommendation', 'Recomanació IA')}</p>
                  <p className="text-sm text-muted-foreground">{data.aiSummary}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('onboarding.step5.analyzing', 'Analitzant el teu perfil...')}
              </CardTitle>
              <CardDescription>
                {t('onboarding.step5.analyzingDescription', 'Estem identificant els tòpics regulatoris més rellevants per al teu negoci')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
                  <Skeleton className="w-5 h-5 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-destructive">
                <AlertCircle className="w-5 h-5" />
                <p>{error}</p>
              </div>
              <Button 
                className="mt-4" 
                onClick={() => window.location.reload()}
              >
                {t('onboarding.step5.retry', 'Tornar a intentar')}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Topics List */}
        {!isLoading && !error && topics.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="text-lg">{t('onboarding.step5.recommendedTopics', 'Tòpics recomanats')}</CardTitle>
                <Badge variant="outline">
                  {selectedCount}/{MAX_TOPICS} {t('onboarding.step5.selected', 'seleccionats')}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleSelectAll}>
                  {t('onboarding.step5.selectAll', 'Seleccionar tots')}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDeselectAll}>
                  {t('onboarding.step5.deselectAll', 'Deseleccionar tots')}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                    topic.selected 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => handleToggleTopic(topic.id)}
                >
                  <Checkbox
                    checked={topic.selected}
                    onCheckedChange={() => handleToggleTopic(topic.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{getLocalizedField(topic, 'title', currentLanguage) || topic.title}</span>
                      <span className="text-xs">{getRelevanceColor(topic.relevance)}</span>
                      <Badge variant={getRelevanceBadgeVariant(topic.relevance)} className="text-xs">
                        {getRelevanceLabel(topic.relevance)}
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {t(`topics.categories.${topic.primary_ambit}`, topic.primary_ambit)}
                    </Badge>
                    {(topic.reason || getLocalizedField(topic, 'description', currentLanguage)) && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {getLocalizedField(topic, 'description', currentLanguage) || topic.reason}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Continue Button */}
        <div className="pt-4">
          <Button 
            onClick={handleContinue} 
            className="w-full" 
            size="lg"
            disabled={isLoading || selectedCount === 0}
          >
            {t('onboarding.navigation.next', 'Continuar')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </OnboardingLayoutV3>
  );
};

export default OnboardingStep5Page;
