import { useEffect, useState, useMemo } from "react";
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
import type { TFunction } from "i18next";

interface Plan {
  id: 'starter' | 'professional' | 'business';
  name: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  featureKeys: string[];
  popular?: boolean;
  highlighted?: boolean;
}

interface Addon {
  id: string;
  nameKey: string;
  price: number;
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 110000,
    yearlyPrice: 95000,
    featureKeys: ['1_country', '10_topics', '10_ckb', '20_questions', '1_workspace', 'emailSupport'],
  },
  {
    id: 'professional',
    name: 'Professional',
    monthlyPrice: 320000,
    yearlyPrice: 275000,
    featureKeys: ['1_country', '30_topics', '30_ckb', '75_questions', '3_workspaces', 'reports', 'prioritySupport'],
    popular: true,
  },
  {
    id: 'business',
    name: 'Business',
    monthlyPrice: 650000,
    yearlyPrice: 550000,
    featureKeys: ['2_countries', '100_topics', '100_ckb', '200_questions', '10_workspaces', 'apiAccess', 'ssoSaml', 'accountManager'],
  },
];

const ADDONS: Addon[] = [
  { id: 'extra_country', nameKey: 'extraCountry', price: 250000 },
  { id: 'extra_topics', nameKey: 'extraTopics', price: 10000 },
  { id: 'extra_ckb', nameKey: 'extraCkb', price: 5000 },
  { id: 'extra_questions', nameKey: 'extraQuestions', price: 2500 },
];

const STRIPE_PRICES: Record<string, string> = {
  // Plans - Monthly
  starter_monthly: 'price_1Sp8byFP6rFyUDE1Lwb4AKzP',
  professional_monthly: 'price_1Sp8duFP6rFyUDE1PW9qJH6w',
  business_monthly: 'price_1Sp8fLFP6rFyUDE1af3msxWM',
  // Plans - Annual
  starter_yearly: 'price_1Sp8byFP6rFyUDE1or1GfwBZ',
  professional_yearly: 'price_1Sp8duFP6rFyUDE1c9qkRp3w',
  business_yearly: 'price_1Sp8fLFP6rFyUDE1oig3uNvk',
  // Addons (monthly recurring)
  addon_extra_country: 'price_1Sp8gtFP6rFyUDE1euEn4G3T',   // €2,500/mes - +1 País addicional
  addon_extra_topics: 'price_1Sp8j0FP6rFyUDE1XbN4zGpR',    // €100/mes - +10 Tòpics addicionals
  addon_extra_ckb: 'price_1Sp8hcFP6rFyUDE1CpLztDPv',       // €50/mes - +20 Documents CKB
  addon_extra_questions: 'price_1Sp8iVFP6rFyUDE1kviMGEag', // €25/mes - +25 Preguntes chat
};

const formatPrice = (cents: number) => {
  return new Intl.NumberFormat('ca-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
};

// Helper to translate feature keys
const getFeatureText = (key: string, t: TFunction): string => {
  const featureMap: Record<string, () => string> = {
    '1_country': () => `1 ${t('onboarding.step7.features.countries')}`,
    '2_countries': () => `2 ${t('onboarding.step7.features.countriesPlural')}`,
    '10_topics': () => `10 ${t('onboarding.step7.features.topics')}`,
    '30_topics': () => `30 ${t('onboarding.step7.features.topics')}`,
    '100_topics': () => `100 ${t('onboarding.step7.features.topics')}`,
    '10_ckb': () => `10 ${t('onboarding.step7.features.ckbDocs')}`,
    '30_ckb': () => `30 ${t('onboarding.step7.features.ckbDocs')}`,
    '100_ckb': () => `100 ${t('onboarding.step7.features.ckbDocs')}`,
    '20_questions': () => `20 ${t('onboarding.step7.features.questions')}${t('onboarding.step7.perMonth')}`,
    '75_questions': () => `75 ${t('onboarding.step7.features.questions')}${t('onboarding.step7.perMonth')}`,
    '200_questions': () => `200 ${t('onboarding.step7.features.questions')}${t('onboarding.step7.perMonth')}`,
    '1_workspace': () => `1 ${t('onboarding.step7.features.workspaces')}`,
    '3_workspaces': () => `3 ${t('onboarding.step7.features.workspacesPlural')}`,
    '10_workspaces': () => `10 ${t('onboarding.step7.features.workspacesPlural')}`,
    'emailSupport': () => t('onboarding.step7.features.emailSupport'),
    'reports': () => t('onboarding.step7.features.reports'),
    'prioritySupport': () => t('onboarding.step7.features.prioritySupport'),
    'apiAccess': () => t('onboarding.step7.features.apiAccess'),
    'ssoSaml': () => t('onboarding.step7.features.ssoSaml'),
    'accountManager': () => t('onboarding.step7.features.accountManager'),
  };
  return featureMap[key]?.() ?? key;
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
      toast.error(t('onboarding.step7.errors.accountNotFound'));
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

      // Build line_items with base plan
      const priceKey = `${selectedPlan}_${isYearly ? 'yearly' : 'monthly'}`;
      const lineItems: { price: string; quantity: number }[] = [
        { price: STRIPE_PRICES[priceKey], quantity: 1 }
      ];

      // Add selected addons
      selectedAddons.forEach(addonId => {
        const addonPriceKey = `addon_${addonId}`;
        if (STRIPE_PRICES[addonPriceKey]) {
          lineItems.push({ price: STRIPE_PRICES[addonPriceKey], quantity: 1 });
        }
      });

      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('stripe-checkout', {
        body: {
          action: 'create-checkout-session',
          line_items: lineItems,
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
      toast.error(t('onboarding.step7.errors.paymentError'));
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
      title={t('onboarding.step7.title')}
      subtitle={t('onboarding.step7.subtitle')}
    >
      <div className="space-y-6">
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 p-4 bg-muted rounded-lg">
          <Label className={!isYearly ? 'font-semibold' : 'text-muted-foreground'}>{t('onboarding.step7.monthly')}</Label>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <Label className={isYearly ? 'font-semibold' : 'text-muted-foreground'}>{t('onboarding.step7.annual')}</Label>
          {isYearly && <Badge variant="secondary">{t('onboarding.step7.savePercent')}</Badge>}
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
                    <Badge className="bg-primary"><Sparkles className="w-3 h-3 mr-1" />{t('onboarding.step7.popular')}</Badge>
                  </div>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-2xl font-bold text-foreground">{formatPrice(price!)}</span>
                    <span className="text-muted-foreground">{t('onboarding.step7.perMonth')}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {plan.featureKeys.map((featureKey, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{getFeatureText(featureKey, t)}</span>
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
            <CardTitle className="text-base">{t('onboarding.step7.addons.title')}</CardTitle>
            <CardDescription>{t('onboarding.step7.addons.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {ADDONS.map((addon) => (
              <div key={addon.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedAddons.includes(addon.id)}
                    onCheckedChange={() => handleToggleAddon(addon.id)}
                  />
                  <span className="text-sm">{t(`onboarding.step7.addons.${addon.nameKey}`)}</span>
                </div>
                <span className="text-sm text-muted-foreground">+{formatPrice(addon.price)}{t('onboarding.step7.perMonth')}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="bg-muted/50">
          <CardContent className="pt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>{t('onboarding.step7.plan')} {selectedPlanData.name} ({isYearly ? t('onboarding.step7.annual').toLowerCase() : t('onboarding.step7.monthly').toLowerCase()})</span>
              <span>{formatPrice(planPrice)}{t('onboarding.step7.perMonth')}</span>
            </div>
            {selectedAddons.length > 0 && (
              <div className="flex justify-between text-sm mb-2">
                <span>{t('onboarding.step7.addonsLabel')}</span>
                <span>+{formatPrice(addonsPrice)}{t('onboarding.step7.perMonth')}</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>{t('onboarding.step7.summary.total')}</span>
              <span>{formatPrice(totalMonthly)}{t('onboarding.step7.perMonth')}</span>
            </div>
            {isYearly && (
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {formatPrice(totalYearly)}{t('onboarding.step7.perYear')}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button onClick={handleSubmit} className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t('onboarding.step7.redirectingToStripe')}</>
          ) : (
            <><CreditCard className="w-4 h-4 mr-2" />{t('onboarding.step7.payButton')}</>
          )}
        </Button>
      </div>
    </OnboardingLayoutV3>
  );
};

export default OnboardingStep7Page;