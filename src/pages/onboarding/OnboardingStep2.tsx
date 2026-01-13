import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useOnboarding } from "@/context/OnboardingContext";
import { ArrowLeft, ArrowRight, Loader2, Globe, FileText } from "lucide-react";

const OnboardingStep2 = () => {
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showManualInput, setShowManualInput] = useState(data.method === 'manual');

  const handleAnalyzeWebsite = async () => {
    if (!data.websiteUrl) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis (TODO: implement real analysis via edge function)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI summary based on URL
    const mockSummary = `Empresa basada en ${data.websiteUrl}. Detectem activitat en el sector tecnològic amb focus en serveis digitals i consultoria.`;
    
    // Mock inferred domains
    const mockDomains = ['digital', 'commercial', 'labor'];
    
    updateData({ 
      aiSummary: mockSummary,
      selectedDomains: mockDomains
    });
    
    setIsAnalyzing(false);
    setCurrentStep(3);
  };

  const handleManualContinue = () => {
    if (!data.description) return;
    
    // Mock AI summary from description
    const mockSummary = data.description;
    
    // Mock inferred domains based on keywords
    const mockDomains: string[] = [];
    const desc = data.description.toLowerCase();
    if (desc.includes('fiscal') || desc.includes('impostos') || desc.includes('taxes')) mockDomains.push('fiscal');
    if (desc.includes('laboral') || desc.includes('treballadors') || desc.includes('personal')) mockDomains.push('labor');
    if (desc.includes('digital') || desc.includes('tecnològic') || desc.includes('dades')) mockDomains.push('digital');
    if (desc.includes('comercial') || desc.includes('mercantil') || desc.includes('vendes')) mockDomains.push('commercial');
    if (mockDomains.length === 0) mockDomains.push('administrative'); // Default
    
    updateData({ 
      aiSummary: mockSummary,
      selectedDomains: mockDomains
    });
    
    setCurrentStep(3);
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
            disabled={!data.description.trim()}
          >
            Continuar
            <ArrowRight className="w-4 h-4 ml-2" />
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
