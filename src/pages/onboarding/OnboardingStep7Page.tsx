import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useOnboarding } from "@/context/OnboardingContext";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { Loader2, Check, Sparkles, CreditCard } from "lucide-react";
import { toast } from "sonner";
import OnboardingLayoutV3 from "./OnboardingLayoutV3";
import { useTranslation } from "react-i18next";

interface Plan {
  id: 'starter' | 'professional' | 'business';
  name: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  features: string[];
  popular?: boolean;
  highlighted?: boolean;
}

interface Addon {
  id: string;
  name: string;
  price: number;
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 110000,
    yearlyPrice: 95000,
    features: ['1 país', '10 tòpics', '10 docs CKB', '20 preguntes/mes', '1 workspace', 'Suport email'],
  },
  {
    id: 'professional',
    name: 'Professional',
    monthlyPrice: 320000,
    yearlyPrice: 275000,
    features: ['1 país', '30 tòpics', '30 docs CKB', '75 preguntes/mes', '3 workspaces', 'Informes', 'Suport prioritari'],
    popular: true,
  },
  {
    id: 'business',
    name: 'Business',
    monthlyPrice: 650000,
    yearlyPrice: 550000,
    features: ['2 països', '100 tòpics', '100 docs CKB', '200 preguntes/mes', '10 workspaces', 'API access', 'SSO/SAML', 'Account manager'],
  },
];

const ADDONS: Addon[] = [
  { id: 'extra_country', name: '+1 País addicional', price: 250000 },
  { id: 'extra_topics', name: '+10 Tòpics addicionals', price: 10000 },
  { id: 'extra_ckb', name: '+20 Documents CKB', price: 5000 },
  { id: 'extra_questions', name: '+25 Preguntes chat', price: 2500 },
];

const STRIPE_PRICES: Record<string, string> = {
  starter_monthly: 'price_1Sp8byFP6rFyUDE1Lwb4AKzP',
  starter_yearly: 'price_1Sp8byFP6rFyUDE1or1GfwBZ',
  professional_monthly: 'price_1Sp8duFP6rFyUDE1PW9qJH6w',
  professional_yearly: 'price_1Sp8duFP6rFyUDE1c9qkRp3w',
  business_monthly: 'price_1Sp8fLFP6rFyUDE1af3msxWM',
  business_yearly: 'price_1Sp8fLFP6rFyUDE1oig3uNvk',
};

const formatPrice = (cents: number) => {
  return new Intl.NumberFormat('ca-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
};

const OnboardingStep7Page = () => {
  const navigate = useNavigate();
  const { data, updateData, resetData } = useOnboarding();
  const { user, account, loading: authLoading } = useAuth();
  const { t } = useTranslation();
  
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'professional' | 'business'>(data.selectedPlan);
  const [isYearly, setIsYearly] = useState(data.billingCycle === 'yearly');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(data.selectedAddons || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect checks
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/onboarding/step-1');
    }
    if (!authLoading && account?.onboarding_completed_at) {
      navigate('/dashboard');
    }
  }, [authLoading, user, account, navigate]);

  const handleSelectPlan = (planId: 'starter' | 'professional' | 'business') => {
    setSelectedPlan(planId);
  };

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const selectedPlanData = PLANS.find(p => p.id === selectedPlan)!;
  const planPrice = isYearly ? selectedPlanData.yearlyPrice! : selectedPlanData.monthlyPrice!;
  const addonsPrice = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find(a => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);
  const totalMonthly = planPrice + addonsPrice;
  const totalYearly = totalMonthly * 12;

  const handleSubmit = async () => {
    if (!account?.id || !user?.email) {
      toast.error("Error: No s'ha trobat el compte");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save onboarding data first
      await supabase.from('accounts').update({
        company_name: data.companyName,
        company_size: data.companySize,
        sector: data.sector,
        website: data.website || null,
      }).eq('id', account.id);

      // Create Stripe checkout
      const priceKey = `${selectedPlan}_${isYearly ? 'yearly' : 'monthly'}`;
      const priceId = STRIPE_PRICES[priceKey];

      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('stripe-checkout', {
        body: {
          action: 'create-checkout-session',
          price_id: priceId,
          account_id: account.id,
          user_email: user.email,
          success_url: `${window.location.origin}/onboarding/complete?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/onboarding/step-7`,
        }
      });

      if (checkoutError) throw checkoutError;

      if (checkoutData?.url) {
        updateData({
          selectedPlan,
          billingCycle: isYearly ? 'yearly' : 'monthly',
          selectedAddons,
        });
        window.location.href = checkoutData.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error("Error en iniciar el pagament");
    } finally {
      setIsSubmitting(false);
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
    <OnboardingLayoutV3
      title={t('onboarding.step7.title', 'Selecciona el teu pla')}
      subtitle={t('onboarding.step7.subtitle', "Tria el pla que millor s'adapti a les teves necessitats")}
    >
      <div className="space-y-6">
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 p-4 bg-muted rounded-lg">
          <Label className={!isYearly ? 'font-semibold' : 'text-muted-foreground'}>Mensual</Label>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <Label className={isYearly ? 'font-semibold' : 'text-muted-foreground'}>Anual</Label>
          {isYearly && <Badge variant="secondary">Estalvia 14%</Badge>}
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <Card
                key={plan.id}
                className={`cursor-pointer transition-all relative ${
                  isSelected ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'
                }`}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary"><Sparkles className="w-3 h-3 mr-1" />Popular</Badge>
                  </div>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-2xl font-bold text-foreground">{formatPrice(price!)}</span>
                    <span className="text-muted-foreground">/mes</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Addons */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">ADDONS (opcional)</CardTitle>
            <CardDescription>Pots afegir extres ara o més tard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {ADDONS.map((addon) => (
              <div key={addon.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedAddons.includes(addon.id)}
                    onCheckedChange={() => handleToggleAddon(addon.id)}
                  />
                  <span className="text-sm">{addon.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">+{formatPrice(addon.price)}/mes</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="bg-muted/50">
          <CardContent className="pt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Pla {selectedPlanData.name} ({isYearly ? 'anual' : 'mensual'})</span>
              <span>{formatPrice(planPrice)}/mes</span>
            </div>
            {selectedAddons.length > 0 && (
              <div className="flex justify-between text-sm mb-2">
                <span>Addons</span>
                <span>+{formatPrice(addonsPrice)}/mes</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>TOTAL</span>
              <span>{formatPrice(totalMonthly)}/mes</span>
            </div>
            {isYearly && (
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {formatPrice(totalYearly)}/any
              </p>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button onClick={handleSubmit} className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Redirigint a Stripe...</>
          ) : (
            <><CreditCard className="w-4 h-4 mr-2" />Pagar amb Stripe</>
          )}
        </Button>
      </div>
    </OnboardingLayoutV3>
  );
};

export default OnboardingStep7Page;
