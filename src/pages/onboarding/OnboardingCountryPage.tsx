import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useOnboarding } from "@/context/OnboardingContext";
import { useAuth } from "@/lib/AuthContext";
import { ArrowRight, Loader2, Info } from "lucide-react";
import OnboardingLayoutV2 from "./OnboardingLayoutV2";

interface Country {
  code: string;
  name: string;
  flag: string;
  available: boolean;
  comingSoon?: boolean;
}

const COUNTRIES: Country[] = [
  { code: 'ES', name: 'España', flag: '🇪🇸', available: true },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', available: false, comingSoon: true },
  { code: 'FR', name: 'France', flag: '🇫🇷', available: false, comingSoon: true },
  { code: 'IT', name: 'Italia', flag: '🇮🇹', available: false, comingSoon: true },
];

const OnboardingCountryPage = () => {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();
  const { user, account, loading } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState(data.selectedCountry || '');

  // Redirect checks
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    if (!loading && account?.onboarding_completed_at) {
      navigate('/dashboard');
    }
  }, [loading, user, account, navigate]);

  // Redirect to step 2 if profile info not filled
  useEffect(() => {
    if (!data.businessDescription) {
      navigate('/onboarding/profile');
    }
  }, [data.businessDescription, navigate]);

  const handleSelectCountry = (code: string, available: boolean) => {
    if (!available) return;
    setSelectedCountry(code);
  };

  const handleContinue = () => {
    if (!selectedCountry) return;
    updateData({ selectedCountry });
    navigate('/onboarding/topics');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <OnboardingLayoutV2
      title="Àmbit geogràfic"
      subtitle="Quin país vols monitoritzar inicialment?"
    >
      <div className="space-y-6">
        {/* EU Note */}
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <Info className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            La normativa europea (UE) s'inclou automàticament amb qualsevol país.
          </p>
        </div>

        {/* Country Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {COUNTRIES.map((country) => {
            const isSelected = selectedCountry === country.code;
            const isDisabled = !country.available;

            return (
              <Card
                key={country.code}
                className={`cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : isDisabled 
                      ? 'opacity-60 cursor-not-allowed' 
                      : 'hover:border-primary/50'
                }`}
                onClick={() => handleSelectCountry(country.code, country.available)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{country.flag}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{country.name}</h3>
                      {country.comingSoon && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          Properament
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground text-sm">✓</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <Button 
            onClick={handleContinue} 
            className="w-full" 
            size="lg"
            disabled={!selectedCountry}
          >
            Següent
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </OnboardingLayoutV2>
  );
};

export default OnboardingCountryPage;
