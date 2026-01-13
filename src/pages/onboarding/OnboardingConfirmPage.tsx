import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useOnboarding } from "@/context/OnboardingContext";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { Loader2, Check, Building2, Globe, FileText, CreditCard, Rocket } from "lucide-react";
import { toast } from "sonner";
import OnboardingLayoutV2 from "./OnboardingLayoutV2";

const STRIPE_PRICES: Record<string, string> = {
  starter_monthly: 'price_1Sp8byFP6rFyUDE1Lwb4AKzP',
  starter_yearly: 'price_1Sp8byFP6rFyUDE1or1GfwBZ',
  professional_monthly: 'price_1Sp8duFP6rFyUDE1PW9qJH6w',
  professional_yearly: 'price_1Sp8duFP6rFyUDE1c9qkRp3w',
  business_monthly: 'price_1Sp8fLFP6rFyUDE1af3msxWM',
  business_yearly: 'price_1Sp8fLFP6rFyUDE1oig3uNvk',
};

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

const OnboardingConfirmPage = () => {
  const navigate = useNavigate();
  const { data, resetData } = useOnboarding();
  const { user, account, loading: authLoading } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect checks
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
    if (!authLoading && account?.onboarding_completed_at) {
      navigate('/dashboard');
    }
  }, [authLoading, user, account, navigate]);

  // Redirect to step 5 if no plan selected
  useEffect(() => {
    if (!data.selectedPlan) {
      navigate('/onboarding/plan');
    }
  }, [data.selectedPlan, navigate]);

  const selectedTopics = data.selectedTopics?.filter(t => t.selected) || [];
  const isTrial = data.selectedPlan === 'trial';

  const handleCompleteOnboarding = async () => {
    if (!account?.id || !user?.id) {
      toast.error("Error: No s'ha trobat el compte");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Update account with company info
      const { error: accountError } = await supabase
        .from('accounts' as any)
        .update({
          company_name: data.companyName,
          company_size: data.companySize,
          sector: data.sector,
          website: data.website || null,
          onboarding_completed_at: new Date().toISOString(),
        })
        .eq('id', account.id);

      if (accountError) throw accountError;

      // 2. Update user profile with language preferences
      const { error: profileError } = await supabase
        .from('user_profiles' as any)
        .update({
          interface_language: data.interfaceLanguage,
          content_language: data.contentLanguage,
        })
        .eq('user_id', user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        // Non-blocking - continue with onboarding
      }

      // 3. Insert country selection
      if (data.selectedCountry) {
        await supabase.from('account_countries' as any).upsert({
          account_id: account.id,
          country: data.selectedCountry,
        }, { onConflict: 'account_id,country' });
      }

      // 4. Insert selected topics
      for (const topic of selectedTopics) {
        await supabase.from('subscribed_topics' as any).insert({
          account_id: account.id,
          topic_id: topic.id,
          custom_name: topic.title,
          priority: topic.relevance === 'high' ? 1 : topic.relevance === 'medium' ? 2 : 3,
        });
      }

      // 5. Create CKB entry with business description
      await supabase.from('client_knowledge_base' as any).insert({
        account_id: account.id,
        content_type: 'onboarding_description',
        original_content: data.businessDescription,
        processed_summary: data.aiSummary || null,
        inferred_domains: selectedTopics.map(t => t.primary_ambit),
        confidence_score: 0.8,
      });

      // Clear localStorage
      resetData();

      toast.success("Configuració completada!");
      
      // Force reload to refresh auth state
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Onboarding error:', error);
      toast.error("Error en completar la configuració. Torna-ho a provar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStripeCheckout = async () => {
    if (!account?.id || !user?.email) {
      toast.error("Error: No s'ha trobat el compte");
      return;
    }

    setIsSubmitting(true);

    try {
      const priceKey = `${data.selectedPlan}_${data.billingCycle}`;
      const priceId = STRIPE_PRICES[priceKey];

      if (!priceId) {
        throw new Error(`Preu no trobat per ${priceKey}`);
      }

      // First complete onboarding data (without marking complete)
      const { error: accountError } = await supabase
        .from('accounts' as any)
        .update({
          company_name: data.companyName,
          company_size: data.companySize,
          sector: data.sector,
          website: data.website || null,
        })
        .eq('id', account.id);

      if (accountError) throw accountError;

      // Create Stripe checkout session
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('stripe-checkout', {
        body: {
          action: 'create-checkout-session',
          price_id: priceId,
          account_id: account.id,
          user_email: user.email,
          success_url: `${window.location.origin}/onboarding/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/onboarding/plan`,
        }
      });

      if (checkoutError) throw checkoutError;

      if (checkoutData?.url) {
        window.location.href = checkoutData.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error('Stripe checkout error:', error);
      toast.error("Error en iniciar el pagament. Torna-ho a provar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (isTrial) {
      handleCompleteOnboarding();
    } else {
      handleStripeCheckout();
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
    <OnboardingLayoutV2
      title={isTrial ? "Tot llest!" : "Confirma la teva subscripció"}
      subtitle={isTrial ? "Revisa la configuració i comença a utilitzar PREMSA.IO" : "Revisa el resum i procedeix al pagament"}
    >
      <div className="space-y-6">
        {/* Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resum de la configuració</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Company */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Building2 className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Empresa</p>
                <p className="text-sm text-muted-foreground">
                  {data.companyName} • {data.companySize} empleats • {data.sector}
                </p>
              </div>
              <Check className="w-5 h-5 text-green-500" />
            </div>

            <Separator />

            {/* Country */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">País</p>
                <p className="text-sm text-muted-foreground">
                  {COUNTRY_FLAGS[data.selectedCountry]} {COUNTRY_NAMES[data.selectedCountry]} + UE
                </p>
              </div>
              <Check className="w-5 h-5 text-green-500" />
            </div>

            <Separator />

            {/* Topics */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Tòpics regulatoris</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedTopics.slice(0, 5).map((topic) => (
                    <Badge key={topic.id} variant="secondary" className="text-xs">
                      {topic.title}
                    </Badge>
                  ))}
                  {selectedTopics.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{selectedTopics.length - 5} més
                    </Badge>
                  )}
                </div>
              </div>
              <Check className="w-5 h-5 text-green-500" />
            </div>

            <Separator />

            {/* Plan */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Pla seleccionat</p>
                <p className="text-sm text-muted-foreground">
                  {data.selectedPlan === 'trial' && 'Trial gratuït (14 dies)'}
                  {data.selectedPlan === 'starter' && `Starter (${data.billingCycle === 'yearly' ? 'anual' : 'mensual'})`}
                  {data.selectedPlan === 'professional' && `Professional (${data.billingCycle === 'yearly' ? 'anual' : 'mensual'})`}
                  {data.selectedPlan === 'business' && `Business (${data.billingCycle === 'yearly' ? 'anual' : 'mensual'})`}
                </p>
              </div>
              <Check className="w-5 h-5 text-green-500" />
            </div>
          </CardContent>
        </Card>

        {/* Info Note */}
        <div className="p-4 bg-muted rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            Podràs modificar les teves preferències en qualsevol moment des de la configuració.
          </p>
          {isTrial && (
            <p className="text-sm text-muted-foreground mt-2">
              Les primeres alertes arribaran en menys de 24 hores.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button 
            onClick={handleSubmit} 
            className="w-full" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isTrial ? 'Completant...' : 'Redirigint a Stripe...'}
              </>
            ) : isTrial ? (
              <>
                <Rocket className="w-4 h-4 mr-2" />
                Començar a utilitzar PREMSA.IO
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Pagar amb Stripe
              </>
            )}
          </Button>
        </div>
      </div>
    </OnboardingLayoutV2>
  );
};

export default OnboardingConfirmPage;
