import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useOnboarding } from "@/context/OnboardingContext";
import { ArrowLeft, ArrowRight, Loader2, Globe, FileText } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// Map ambit names from Edge Function to domain IDs
const AMBIT_TO_DOMAIN: Record<string, string> = {
  'laboral i seguretat social': 'labor',
  'laboral': 'labor',
  'fiscal i tributari': 'fiscal',
  'fiscal': 'fiscal',
  'mercantil i societari': 'commercial',
  'mercantil': 'commercial',
  'protecció de dades': 'digital',
  'digital': 'digital',
  'medi ambient i sostenibilitat': 'environmental',
  'mediambiental': 'environmental',
  'financer i bancari': 'financial',
  'financer': 'financial',
  'administratiu': 'administrative',
  'sanitari': 'health',
  'educació': 'education',
  'energia': 'energy',
  'transport': 'transport',
  'social': 'social',
  'cultura': 'culture',
  'defensa': 'defense',
  'sectorial': 'commercial',
  'immobiliari i urbanisme': 'administrative',
};

const OnboardingStep2 = () => {
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showManualInput, setShowManualInput] = useState(data.method === 'manual');

  const handleAnalyzeWebsite = async () => {
    if (!data.websiteUrl) return;
    
    setIsAnalyzing(true);
    
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      const response = await fetch(
        'https://evdrqasjbwputqqejqqe.supabase.co/functions/v1/onboarding-ai',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionData.session?.access_token}`
          },
          body: JSON.stringify({
            action: 'analyze',
            description: `Empresa amb web: ${data.websiteUrl}`,
            sector: null,
            country: 'ES'
          })
        }
      );
      
      if (!response.ok) {
        throw new Error('Error en l\'anàlisi');
      }
      
      const result = await response.json();
      
      // Map topics to domain IDs (normalize ambit names to IDs)
      const inferredDomains = result.topics
        .filter((t: any) => t.selected)
        .map((t: any) => {
          const ambit = t.primary_ambit?.toLowerCase() || '';
          return AMBIT_TO_DOMAIN[ambit] || 'administrative';
        })
        .filter((d: string, i: number, arr: string[]) => arr.indexOf(d) === i);
      
      updateData({ 
        aiSummary: result.summary,
        selectedDomains: inferredDomains.length > 0 ? inferredDomains : ['administrative']
      });
      
      setCurrentStep(3);
    } catch (error) {
      console.error('AI analysis error:', error);
      toast.error("Error en l'anàlisi. Prova la configuració manual.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleManualContinue = async () => {
    if (!data.description) return;
    
    setIsAnalyzing(true);
    
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      const response = await fetch(
        'https://evdrqasjbwputqqejqqe.supabase.co/functions/v1/onboarding-ai',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionData.session?.access_token}`
          },
          body: JSON.stringify({
            action: 'analyze',
            description: data.description,
            sector: null,
            country: 'ES'
          })
        }
      );
      
      if (!response.ok) {
        throw new Error('Error en l\'anàlisi');
      }
      
      const result = await response.json();
      
      // Map topics to domain IDs (normalize ambit names to IDs)
      const inferredDomains = result.topics
        .filter((t: any) => t.selected)
        .map((t: any) => {
          const ambit = t.primary_ambit?.toLowerCase() || '';
          return AMBIT_TO_DOMAIN[ambit] || 'administrative';
        })
        .filter((d: string, i: number, arr: string[]) => arr.indexOf(d) === i);
      
      updateData({ 
        aiSummary: result.summary,
        selectedDomains: inferredDomains.length > 0 ? inferredDomains : ['administrative']
      });
      
      setCurrentStep(3);
    } catch (error) {
      console.error('AI analysis error:', error);
      toast.error("Error en l'anàlisi. Torna-ho a provar.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  if (showManualInput || data.method === 'manual') {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Explica'ns la teva empresa</h1>
          <p className="text-muted-foreground">
            Pas 1 de 4: Descriu en 2-3 frases a què es dedica la teva empresa
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Descripció de l'empresa
            </CardTitle>
            <CardDescription>
              Descriu el vostre focus principal i activitat
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Exemple: Som una consultora fiscal a Barcelona especialitzada en assessorament a PIMES del sector tecnològic i startups."
              value={data.description}
              onChange={(e) => updateData({ description: e.target.value })}
              className="min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground">
              Exemple: "Som una consultora fiscal a Barcelona especialitzada en assessorament a PIMES del sector tecnològic i startups."
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Enrere
          </Button>
          <Button 
            onClick={handleManualContinue}
            disabled={!data.description.trim() || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analitzant...
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Analitzem la teva empresa</h1>
        <p className="text-muted-foreground">
          Pas 1 de 4: Quina és la web de la teva empresa?
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="w-5 h-5" />
            URL del web corporatiu
          </CardTitle>
          <CardDescription>
            Analitzarem públicament el contingut per entendre millor el vostre negoci
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://exemple.com"
              value={data.websiteUrl}
              onChange={(e) => updateData({ websiteUrl: e.target.value })}
              className="flex-1"
            />
            <Button 
              onClick={handleAnalyzeWebsite}
              disabled={!data.websiteUrl || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analitzant...
                </>
              ) : (
                'Analitzar'
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            ℹ️ Analitzarem públicament el contingut per entendre millor el vostre negoci i configurar les alertes automàticament.
          </p>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button 
          variant="link" 
          onClick={() => setShowManualInput(true)}
          className="text-muted-foreground"
        >
          No tinc web / Prefereixo explicar-ho jo
        </Button>
      </div>

      <div className="flex justify-start">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Enrere
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep2;
