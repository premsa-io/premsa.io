import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useOnboarding } from "@/context/OnboardingContext";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { ArrowRight, Loader2, Globe, FileText, Info } from "lucide-react";
import { toast } from "sonner";
import OnboardingLayoutV3 from "./OnboardingLayoutV3";
import { useTranslation } from "react-i18next";

const OnboardingStep2Page = () => {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();
  const { user, account, loading, accountLoading } = useAuth();
  const { t } = useTranslation();
  
  const [websiteUrl, setWebsiteUrl] = useState(data.websiteUrl || '');
  const [description, setDescription] = useState(data.description || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);

  const normalizeUrl = (url: string): string => {
    if (!url) return '';
    let normalized = url.trim().toLowerCase();
    
    // Eliminar www. inicial si existeix
    if (normalized.startsWith('www.')) {
      normalized = normalized.substring(4);
    }
    
    // Afegir https:// si no té protocol
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = 'https://' + normalized;
    }
    
    return normalized;
  };

  // Redirect checks - wait for accountLoading to be false
  useEffect(() => {
    if (!loading && !user) {
      navigate('/onboarding/step-1');
    }
    if (!loading && !accountLoading && account?.onboarding_completed_at) {
      navigate('/dashboard');
    }
  }, [loading, accountLoading, user, account, navigate]);

  const analyzeWithAI = async (content: string, type: 'website' | 'description') => {
    setIsAnalyzing(true);
    
    try {
      const { data: result, error } = await supabase.functions.invoke('onboarding-ai', {
        body: {
          action: 'analyze',
          description: type === 'website' ? `Empresa amb web: ${content}` : content,
          sector: null,
          country: 'ES',
        }
      });
      
      if (error) throw error;
      
      // Store AI analysis results
      updateData({
        websiteUrl: type === 'website' ? content : '',
        description: type === 'description' ? content : '',
        aiSummary: result.summary || '',
        aiAnalysis: {
          company_name: result.company_name,
          sector: result.sector,
          company_size: result.company_size,
          topics: result.topics,
        },
        selectedTopics: result.topics || [],
        companyName: result.company_name || '',
        sector: result.sector || '',
        companySize: result.company_size || '',
        businessDescription: type === 'description' ? content : '',
      });
      
      navigate('/onboarding/step-3');
    } catch (error) {
      console.error('AI analysis error:', error);
      toast.error(t('onboarding.step2.analyzeError', "Error en l'anàlisi. Torna-ho a provar."));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeWebsite = () => {
    const normalizedUrl = normalizeUrl(websiteUrl);
    if (!normalizedUrl) return;
    analyzeWithAI(normalizedUrl, 'website');
  };

  const handleAnalyzeDescription = () => {
    if (!description || description.length < 50) {
      toast.error(t('onboarding.step2.descriptionMinLength', 'La descripció ha de tenir mínim 50 caràcters'));
      return;
    }
    analyzeWithAI(description, 'description');
  };

  if (loading || accountLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <OnboardingLayoutV3
      title={t('onboarding.step2.title', "Explica'ns el teu negoci")}
      subtitle={t('onboarding.step2.subtitle', "La nostra IA analitzarà el teu perfil per personalitzar l'experiència")}
    >
      <div className="space-y-6">
        {/* Website Option */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5" />
              {t('onboarding.step2.websiteLabel', 'Quina és la web de la teva empresa?')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="exemple.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="flex-1"
                disabled={isAnalyzing}
              />
              <Button 
                onClick={handleAnalyzeWebsite}
                disabled={!websiteUrl || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('onboarding.step2.analyzing', 'Analitzant...')}
                  </>
                ) : (
                  t('onboarding.step2.analyzeButton', 'Analitzar')
                )}
              </Button>
            </div>
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>{t('onboarding.step2.websiteHint', 'Analitzarem el contingut públic per entendre millor el vostre negoci i configurar les alertes.')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 border-t border-border" />
          <span className="text-sm text-muted-foreground">{t('onboarding.step2.orDivider', 'o')}</span>
          <div className="flex-1 border-t border-border" />
        </div>

        {/* Manual Description Option */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {t('onboarding.step2.descriptionOption', 'Prefereixo descriure el meu negoci')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={t('onboarding.step2.descriptionPlaceholder', "Descriu en 2-3 frases a què es dedica la teva empresa i quin és el vostre focus principal...")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px]"
              disabled={isAnalyzing}
            />
            <p className="text-xs text-muted-foreground">
              {t('onboarding.step2.descriptionHint', 'Mínim 50 caràcters')} ({description.length}/50)
            </p>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 {t('onboarding.step2.descriptionExample', 'Exemple: "Som una consultora fiscal a Barcelona especialitzada en assessorament a PIMES del sector tecnològic i startups."')}
              </p>
            </div>
            <Button 
              onClick={handleAnalyzeDescription}
              disabled={description.length < 50 || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t('onboarding.step2.analyzing', 'Analitzant...')}
                </>
              ) : (
                <>
                  {t('onboarding.step2.analyzeWithAI', 'Analitzar amb IA')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </OnboardingLayoutV3>
  );
};

export default OnboardingStep2Page;
