import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useOnboarding } from "@/context/OnboardingContext";
import { ArrowLeft, ArrowRight, Bot, Pencil } from "lucide-react";
import { useState } from "react";

const REGULATORY_DOMAINS = [
  { id: 'fiscal', label: 'Fiscal', description: 'impostos, taxes, tributació' },
  { id: 'labor', label: 'Laboral', description: 'contractes, convenis, seguretat social' },
  { id: 'commercial', label: 'Mercantil', description: 'societats, contractes comercials' },
  { id: 'digital', label: 'Digital', description: 'protecció de dades, telecomunicacions' },
  { id: 'environmental', label: 'Mediambiental', description: '' },
  { id: 'financial', label: 'Financer', description: 'banca, assegurances' },
  { id: 'administrative', label: 'Administratiu', description: '' },
  { id: 'health', label: 'Sanitari', description: '' },
  { id: 'education', label: 'Educació', description: '' },
  { id: 'energy', label: 'Energia', description: '' },
  { id: 'transport', label: 'Transport', description: '' },
  { id: 'social', label: 'Social', description: '' },
  { id: 'culture', label: 'Cultura', description: '' },
  { id: 'defense', label: 'Defensa', description: '' },
];

const OnboardingStep3 = () => {
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [isEditing, setIsEditing] = useState(false);

  const handleDomainToggle = (domainId: string) => {
    const current = data.selectedDomains;
    const updated = current.includes(domainId)
      ? current.filter(d => d !== domainId)
      : [...current, domainId];
    updateData({ selectedDomains: updated });
  };

  const handleBack = () => {
    setCurrentStep(2);
  };

  const handleContinue = () => {
    if (data.selectedDomains.length === 0) return;
    setCurrentStep(4);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Confirma els teus interessos</h1>
        <p className="text-muted-foreground">
          Pas 2 de 4: Àmbits regulatoris que t'interessen
        </p>
      </div>

      {/* AI Summary Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground">
                {data.aiSummary || data.description}
              </p>
              <div className="flex gap-2 mt-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className={!isEditing ? 'bg-primary/10 border-primary' : ''}
                >
                  ✓ Correcte
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="w-3 h-3 mr-1" />
                  Modificar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Domain Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Àmbits regulatoris</CardTitle>
          <CardDescription>
            Basats en l'anàlisi, pots modificar-los
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-3">
            {REGULATORY_DOMAINS.map((domain) => (
              <div 
                key={domain.id}
                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleDomainToggle(domain.id)}
              >
                <Checkbox 
                  checked={data.selectedDomains.includes(domain.id)}
                  onCheckedChange={() => handleDomainToggle(domain.id)}
                />
                <div className="flex-1">
                  <span className="text-sm font-medium">{domain.label}</span>
                  {domain.description && (
                    <span className="text-xs text-muted-foreground ml-1">
                      ({domain.description})
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Enrere
        </Button>
        <Button 
          onClick={handleContinue}
          disabled={data.selectedDomains.length === 0}
        >
          Continuar
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep3;
