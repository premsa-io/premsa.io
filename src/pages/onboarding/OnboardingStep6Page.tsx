import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOnboarding } from "@/context/OnboardingContext";
import { useAuth } from "@/lib/AuthContext";
import { ArrowRight, Loader2, Building2, Globe, Languages, FileText, Pencil } from "lucide-react";
import OnboardingLayoutV3 from "./OnboardingLayoutV3";
import { useTranslation } from "react-i18next";

const COUNTRY_NAMES: Record<string, string> = {
  ES: 'Espanya',
  PT: 'Portugal',
  FR: 'França',
  IT: 'Itàlia',
};

const COUNTRY_FLAGS: Record<string, string> = {
  ES: '🇪🇸',
  PT: '🇵🇹',
  FR: '🇫🇷',
  IT: '🇮🇹',
};

const LANGUAGE_NAMES: Record<string, string> = {
  ca: 'Català',
  es: 'Español',
  en: 'English',
};

const OnboardingStep6Page = () => {
  const navigate = useNavigate();
  const { data } = useOnboarding();
  const { user, account, loading } = useAuth();
  const { t } = useTranslation();

  // Redirect checks
  useEffect(() => {
    if (!loading && !user) {
      navigate('/onboarding/step-1');
    }
    if (!loading && account?.onboarding_completed_at) {
      navigate('/dashboard');
    }
  }, [loading, user, account, navigate]);

  // Redirect to step 5 if topics not selected
  useEffect(() => {
    const selectedTopicsCount = data.selectedTopics?.filter(t => t.selected).length || 0;
    if (selectedTopicsCount === 0) {
      navigate('/onboarding/step-5');
    }
  }, [data.selectedTopics, navigate]);

  const selectedTopics = data.selectedTopics?.filter(t => t.selected) || [];
  const uniqueAmbits = [...new Set(selectedTopics.map(t => t.primary_ambit))];

  const handleContinue = () => {
    navigate('/onboarding/step-7');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <OnboardingLayoutV3
      title={t('onboarding.step6.title', 'Revisa la teva configuració')}
      subtitle={t('onboarding.step6.subtitle', "Abans de triar el teu pla, confirma que tot és correcte")}
    >
      <div className="space-y-4">
        {/* Company */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                {t('onboarding.step6.company', 'Empresa')}
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/onboarding/step-3')}
              >
                <Pencil className="w-3 h-3 mr-1" />
                {t('onboarding.step6.edit', 'Editar')}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="font-medium">{data.companyName}</p>
            <p className="text-sm text-muted-foreground">
              {t(`onboarding.sectors.${data.sector}`, data.sector)} · {data.companySize} empleats
            </p>
            {data.website && (
              <p className="text-sm text-muted-foreground">{data.website}</p>
            )}
          </CardContent>
        </Card>

        {/* Languages */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Languages className="w-4 h-4" />
                {t('onboarding.step6.languages', 'Idiomes')}
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/onboarding/step-1')}
              >
                <Pencil className="w-3 h-3 mr-1" />
                {t('onboarding.step6.edit', 'Editar')}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">
              {t('onboarding.step6.interface', 'Interfície')}: {LANGUAGE_NAMES[data.interfaceLanguage] || data.interfaceLanguage}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('onboarding.step6.content', 'Contingut')}: {LANGUAGE_NAMES[data.contentLanguage] || data.contentLanguage}
            </p>
          </CardContent>
        </Card>

        {/* Country */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {t('onboarding.step6.country', 'País')}
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/onboarding/step-4')}
              >
                <Pencil className="w-3 h-3 mr-1" />
                {t('onboarding.step6.edit', 'Editar')}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm">
              {COUNTRY_FLAGS[data.selectedCountry]} {COUNTRY_NAMES[data.selectedCountry]} + UE
            </p>
          </CardContent>
        </Card>

        {/* Topics */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {t('onboarding.step6.topics', 'Tòpics seleccionats')}
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/onboarding/step-5')}
              >
                <Pencil className="w-3 h-3 mr-1" />
                {t('onboarding.step6.edit', 'Editar')}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-2">
              {selectedTopics.length} {t('onboarding.step6.topicsSelected', 'tòpics seleccionats')}
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              {t('onboarding.step6.areas', 'Àmbits')}: {uniqueAmbits.join(', ')}
            </p>
            <div className="flex flex-wrap gap-1">
              {selectedTopics.slice(0, 5).map((topic) => (
                <Badge key={topic.id} variant="secondary" className="text-xs">
                  {topic.title}
                </Badge>
              ))}
              {selectedTopics.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  {t('onboarding.step6.andMore', 'i {{count}} més').replace('{{count}}', String(selectedTopics.length - 5))}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="pt-6">
          <Button 
            onClick={handleContinue} 
            className="w-full" 
            size="lg"
          >
            {t('onboarding.step6.continueToPlans', 'Continuar a selecció de pla')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </OnboardingLayoutV3>
  );
};

export default OnboardingStep6Page;
