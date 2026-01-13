import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useOnboarding } from "@/context/OnboardingContext";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";

const AVAILABLE_COUNTRIES = [
  { code: 'ES', name: 'Espanya', flag: '🇪🇸', note: 'inclou comunitats autònomes' },
  { code: 'FR', name: 'França', flag: '🇫🇷' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'DE', name: 'Alemanya', flag: '🇩🇪' },
  { code: 'IT', name: 'Itàlia', flag: '🇮🇹' },
];

const WAITLIST_COUNTRIES = [
  { code: 'GB', name: 'Regne Unit', flag: '🇬🇧' },
  { code: 'NL', name: 'Països Baixos', flag: '🇳🇱' },
  { code: 'BE', name: 'Bèlgica', flag: '🇧🇪' },
  { code: 'CH', name: 'Suïssa', flag: '🇨🇭' },
  { code: 'MX', name: 'Mèxic', flag: '🇲🇽' },
];

const OnboardingStep4 = () => {
  const { data, updateData, setCurrentStep } = useOnboarding();

  const handleCountryToggle = (countryCode: string) => {
    const current = data.selectedCountries;
    const updated = current.includes(countryCode)
      ? current.filter(c => c !== countryCode)
      : [...current, countryCode];
    updateData({ selectedCountries: updated });
  };

  const handleWaitlistToggle = (country: { code: string; name: string }) => {
    const current = data.waitlistCountries;
    const exists = current.find(c => c.code === country.code);
    const updated = exists
      ? current.filter(c => c.code !== country.code)
      : [...current, country];
    updateData({ waitlistCountries: updated });
  };

  const handleBack = () => {
    setCurrentStep(3);
  };

  const handleContinue = () => {
    if (data.selectedCountries.length === 0) return;
    setCurrentStep(5);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Quins països t'interessen?</h1>
        <p className="text-muted-foreground">
          Pas 3 de 4: Selecciona els països on operes
        </p>
      </div>

      {/* EU Note */}
      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
        <Info className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <p className="text-sm text-muted-foreground">
          La normativa europea (UE) s'inclou automàticament.
        </p>
      </div>

      {/* Available Countries */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Disponibles</CardTitle>
          <CardDescription>
            Països amb cobertura completa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {AVAILABLE_COUNTRIES.map((country) => (
              <div 
                key={country.code}
                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleCountryToggle(country.code)}
              >
                <Checkbox 
                  checked={data.selectedCountries.includes(country.code)}
                  onCheckedChange={() => handleCountryToggle(country.code)}
                />
                <span className="text-xl">{country.flag}</span>
                <div className="flex-1">
                  <span className="text-sm font-medium">{country.name}</span>
                  {country.note && (
                    <span className="text-xs text-muted-foreground ml-1">
                      ({country.note})
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Waitlist Countries */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Properament</CardTitle>
          <CardDescription>
            Avisa'm quan estiguin disponibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-2">
            {WAITLIST_COUNTRIES.map((country) => {
              const isInWaitlist = data.waitlistCountries.some(c => c.code === country.code);
              return (
                <div 
                  key={country.code}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-dashed border-border hover:bg-muted/50 transition-colors cursor-pointer opacity-80"
                  onClick={() => handleWaitlistToggle(country)}
                >
                  <Checkbox 
                    checked={isInWaitlist}
                    onCheckedChange={() => handleWaitlistToggle(country)}
                  />
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-sm">{country.name}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Plan Warning */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          ⚠️ El teu pla Starter inclou 1 país. 
          <Button variant="link" className="text-amber-800 dark:text-amber-200 underline p-0 h-auto ml-1">
            Veure plans superiors per més països
          </Button>
        </p>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Enrere
        </Button>
        <Button 
          onClick={handleContinue}
          disabled={data.selectedCountries.length === 0}
        >
          Continuar
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep4;
