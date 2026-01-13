import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useOnboarding } from "@/context/OnboardingContext";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Check, Clock, Loader2, Rocket } from "lucide-react";
import { toast } from "sonner";

const DOMAIN_LABELS: Record<string, string> = {
  fiscal: 'Fiscal',
  labor: 'Laboral',
  commercial: 'Mercantil',
  digital: 'Digital',
  environmental: 'Mediambiental',
  financial: 'Financer',
  administrative: 'Administratiu',
  health: 'Sanitari',
  education: 'Educació',
  energy: 'Energia',
  transport: 'Transport',
  social: 'Social',
  culture: 'Cultura',
  defense: 'Defensa',
};

const COUNTRY_FLAGS: Record<string, string> = {
  ES: '🇪🇸',
  FR: '🇫🇷',
  PT: '🇵🇹',
  DE: '🇩🇪',
  IT: '🇮🇹',
  GB: '🇬🇧',
  NL: '🇳🇱',
  BE: '🇧🇪',
  CH: '🇨🇭',
  MX: '🇲🇽',
};

const COUNTRY_NAMES: Record<string, string> = {
  ES: 'Espanya',
  FR: 'França',
  PT: 'Portugal',
  DE: 'Alemanya',
  IT: 'Itàlia',
};

const OnboardingStep5 = () => {
  const { data, setCurrentStep } = useOnboarding();
  const { account } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    setCurrentStep(4);
  };

  const handleComplete = async () => {
    if (!account?.id) {
      toast.error("Error: No s'ha trobat el compte");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Update account with onboarding data
      const { error: accountError } = await supabase
        .from('accounts' as any)
        .update({
          onboarding_completed_at: new Date().toISOString(),
          onboarding_method: data.method,
          countries_of_operation: data.selectedCountries,
        })
        .eq('id', account.id);

      if (accountError) throw accountError;

      // 2. Create country_licenses for selected countries
      for (const countryCode of data.selectedCountries) {
        await supabase.from('country_licenses' as any).insert({
          account_id: account.id,
          country_code: countryCode,
          is_active: true,
        });
      }

      // 3. Create initial CKB entry
      await supabase.from('client_knowledge_base' as any).insert({
        account_id: account.id,
        content_type: 'onboarding_description',
        original_content: data.description || data.websiteUrl,
        processed_summary: data.aiSummary,
        inferred_domains: data.selectedDomains,
        confidence_score: 0.8,
      });

      // 4. Create account_preferences
      await supabase.from('account_preferences' as any).insert({
        account_id: account.id,
        domains_included: data.selectedDomains,
        alert_frequency: 'daily',
        preferred_language: 'ca',
      });

      // 5. Create country_requests for waitlist
      for (const country of data.waitlistCountries) {
        await supabase.from('country_requests' as any).insert({
          account_id: account.id,
          country_code: country.code,
          country_name: country.name,
          status: 'waiting',
        });
      }

      toast.success("Configuració completada!");
      
      // Force page reload to refresh auth state
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Onboarding error:', error);
      toast.error("Error en completar la configuració");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Resum de la configuració</h1>
        <p className="text-muted-foreground">
          Pas 4 de 4: Revisa i confirma
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          {/* Company Summary */}
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Descripció de l'empresa</p>
              <p className="text-sm text-muted-foreground">
                {data.aiSummary || data.description || data.websiteUrl}
              </p>
            </div>
          </div>

          {/* Domains */}
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Àmbits regulatoris</p>
              <p className="text-sm text-muted-foreground">
                {data.selectedDomains.map(d => DOMAIN_LABELS[d] || d).join(', ')}
              </p>
            </div>
          </div>

          {/* Countries */}
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Països</p>
              <p className="text-sm text-muted-foreground">
                {data.selectedCountries.map(c => `${COUNTRY_FLAGS[c]} ${COUNTRY_NAMES[c]}`).join(', ')} + UE
              </p>
            </div>
          </div>

          {/* Waitlist */}
          {data.waitlistCountries.length > 0 && (
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Llista d'espera</p>
                <p className="text-sm text-muted-foreground">
                  {data.waitlistCountries.map(c => `${COUNTRY_FLAGS[c.code]} ${c.name}`).join(', ')}
                  <span className="block text-xs mt-1">T'avisarem quan estiguin disponibles</span>
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="p-4 bg-muted rounded-lg text-center">
        <p className="text-sm text-muted-foreground">
          Podràs refinar les teves preferències en qualsevol moment des de l'àrea de configuració.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Les primeres alertes arribaran en menys de 24 hores si hi ha regulacions rellevants per al teu negoci.
        </p>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Enrere
        </Button>
        <Button 
          onClick={handleComplete}
          disabled={isSubmitting}
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Guardant...
            </>
          ) : (
            <>
              <Rocket className="w-4 h-4 mr-2" />
              Començar a utilitzar PREMSA.IO
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep5;
