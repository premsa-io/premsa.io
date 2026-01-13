import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useOnboarding } from "@/context/OnboardingContext";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { ArrowRight, Loader2, Info, Bell } from "lucide-react";
import { toast } from "sonner";
import OnboardingLayoutV3 from "./OnboardingLayoutV3";
import { useTranslation } from "react-i18next";

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

const OnboardingStep4Page = () => {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();
  const { user, account, loading } = useAuth();
  const { t } = useTranslation();
  
  const [selectedCountry, setSelectedCountry] = useState(data.selectedCountry || '');
  const [waitlistCountries, setWaitlistCountries] = useState<string[]>(data.waitlistCountries || []);
  const [isSubmittingWaitlist, setIsSubmittingWaitlist] = useState<string | null>(null);

  // Redirect checks
  useEffect(() => {
    if (!loading && !user) {
      navigate('/onboarding/step-1');
    }
    if (!loading && account?.onboarding_completed_at) {
      navigate('/dashboard');
    }
  }, [loading, user, account, navigate]);

  // Redirect to step 3 if company not filled
  useEffect(() => {
    if (!data.companyName) {
      navigate('/onboarding/step-3');
    }
  }, [data.companyName, navigate]);

  const handleSelectCountry = (code: string, available: boolean) => {
    if (!available) return;
    setSelectedCountry(code);
  };

  const handleWaitlist = async (country: Country) => {
    if (!account?.id) return;
    
    setIsSubmittingWaitlist(country.code);
    
    try {
      await supabase.from('country_requests').insert({
        account_id: account.id,
        country_code: country.code,
        country_name: country.name,
        status: 'waiting',
      });
      
      setWaitlistCountries(prev => [...prev, country.code]);
      toast.success(t('onboarding.step4.notifySuccess', "T'avisarem quan estigui disponible"));
    } catch (error) {
      console.error('Waitlist error:', error);
      toast.error("Error. Torna-ho a provar.");
    } finally {
      setIsSubmittingWaitlist(null);
    }
  };

  const handleContinue = () => {
    if (!selectedCountry) return;
    updateData({ 
      selectedCountry,
      waitlistCountries,
    });
    navigate('/onboarding/step-5');
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
      title={t('onboarding.step4.title', 'Àmbit geogràfic')}
      subtitle={t('onboarding.step4.subtitle', 'Quin país vols monitoritzar?')}
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
            const isOnWaitlist = waitlistCountries.includes(country.code);

            return (
              <Card
                key={country.code}
                className={`transition-all ${
                  isSelected 
                    ? 'border-primary ring-2 ring-primary/20 cursor-pointer' 
                    : isDisabled 
                      ? 'opacity-80' 
                      : 'hover:border-primary/50 cursor-pointer'
                }`}
                onClick={() => handleSelectCountry(country.code, country.available)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{country.flag}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{country.name}</h3>
                      {country.available ? (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
                          {t('onboarding.step4.available', 'Disponible')}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          {t('onboarding.step4.comingSoon', 'Properament')}
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground text-sm">✓</span>
                      </div>
                    )}
                    {!country.available && !isOnWaitlist && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWaitlist(country);
                        }}
                        disabled={isSubmittingWaitlist === country.code}
                      >
                        {isSubmittingWaitlist === country.code ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Bell className="w-3 h-3 mr-1" />
                            {t('onboarding.step4.notifyMe', 'Avisar-me')}
                          </>
                        )}
                      </Button>
                    )}
                    {isOnWaitlist && (
                      <span className="text-xs text-primary">✓ A la llista</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info note */}
        <p className="text-sm text-muted-foreground text-center">
          {t('onboarding.step4.addMoreLater', "Pots afegir més països des del teu perfil un cop estiguin disponibles.")}
        </p>

        {/* Continue Button */}
        <div className="pt-4">
          <Button 
            onClick={handleContinue} 
            className="w-full" 
            size="lg"
            disabled={!selectedCountry}
          >
            {t('onboarding.navigation.next', 'Continuar')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </OnboardingLayoutV3>
  );
};

export default OnboardingStep4Page;
