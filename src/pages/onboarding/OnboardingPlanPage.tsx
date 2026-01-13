import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useOnboarding } from "@/context/OnboardingContext";
import { useAuth } from "@/lib/AuthContext";
import { ArrowRight, Loader2, Check, Sparkles } from "lucide-react";
import OnboardingLayoutV2 from "./OnboardingLayoutV2";

interface Plan {
  id: string;
  name: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  yearlyTotal?: number;
  trialDays?: number;
  features: string[];
  popular?: boolean;
  highlighted?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'trial',
    name: 'Trial',
    trialDays: 14,
    features: [
      '1 país',
      '10 tòpics',
      '10 documents CKB',
      '20 consultes chat/mes',
      'Alertes email setmanals',
    ],
    highlighted: true,
  },
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 1100,
    yearlyPrice: 950,
    yearlyTotal: 11400,
    features: [
      '1 país',
      '10 tòpics',
      '10 documents CKB',
      '20 consultes chat/mes',
      'Alertes configurables',
      'Suport email',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    monthlyPrice: 3200,
    yearlyPrice: 2750,
    yearlyTotal: 33000,
    features: [
      '1 país',
      '30 tòpics',
      '30 documents CKB',
      '75 consultes chat/mes',
      '3 workspaces',
      'Informes personalitzats',
      'Suport prioritari',
    ],
    popular: true,
  },
  {
    id: 'business',
    name: 'Business',
    monthlyPrice: 6500,
    yearlyPrice: 5500,
    yearlyTotal: 66000,
    features: [
      '2 països',
      '100 tòpics',
      '100 documents CKB',
      '200 consultes chat/mes',
      'Workspaces il·limitats',
      'API access',
      'SSO/SAML',
      'Account manager dedicat',
    ],
  },
];

const formatPrice = (cents: number) => {
  return new Intl.NumberFormat('ca-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
};

const OnboardingPlanPage = () => {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();
  const { user, account, loading: authLoading } = useAuth();
  
  const [selectedPlan, setSelectedPlan] = useState(data.selectedPlan || 'trial');
  const [isYearly, setIsYearly] = useState(data.billingCycle === 'yearly');

  // Redirect checks
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
    if (!authLoading && account?.onboarding_completed_at) {
      navigate('/dashboard');
    }
  }, [authLoading, user, account, navigate]);

  // Redirect to step 4 if topics not selected
  useEffect(() => {
    const selectedTopicsCount = data.selectedTopics?.filter(t => t.selected).length || 0;
    if (selectedTopicsCount === 0) {
      navigate('/onboarding/topics');
    }
  }, [data.selectedTopics, navigate]);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    updateData({
      selectedPlan,
      billingCycle: isYearly ? 'yearly' : 'monthly',
    });
    navigate('/onboarding/confirm');
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
      title="Selecciona el teu pla"
      subtitle="Pots començar amb el trial gratuït de 14 dies"
    >
      <div className="space-y-6">
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 p-4 bg-muted rounded-lg">
          <Label htmlFor="billing-toggle" className={!isYearly ? 'font-semibold' : 'text-muted-foreground'}>
            Mensual
          </Label>
          <Switch
            id="billing-toggle"
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <Label htmlFor="billing-toggle" className={isYearly ? 'font-semibold' : 'text-muted-foreground'}>
            Anual
          </Label>
          {isYearly && (
            <Badge variant="secondary" className="ml-2">
              Estalvia 14%
            </Badge>
          )}
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const price = plan.monthlyPrice 
              ? (isYearly ? plan.yearlyPrice : plan.monthlyPrice)
              : null;

            return (
              <Card
                key={plan.id}
                className={`cursor-pointer transition-all relative ${
                  isSelected 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'hover:border-primary/50'
                } ${plan.popular ? 'md:scale-105 md:z-10' : ''}`}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="secondary">Recomanat per començar</Badge>
                  </div>
                )}
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>
                    {plan.trialDays ? (
                      <span className="text-2xl font-bold text-foreground">Gratuït</span>
                    ) : (
                      <>
                        <span className="text-2xl font-bold text-foreground">
                          {formatPrice(price!)}
                        </span>
                        <span className="text-muted-foreground">/mes</span>
                      </>
                    )}
                    {plan.trialDays && (
                      <span className="block text-sm mt-1">{plan.trialDays} dies de prova</span>
                    )}
                    {isYearly && plan.yearlyTotal && (
                      <span className="block text-xs mt-1">
                        {formatPrice(plan.yearlyTotal)} facturats anualment
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2">
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

        {/* Continue Button */}
        <div className="pt-4">
          <Button 
            onClick={handleContinue} 
            className="w-full" 
            size="lg"
          >
            {selectedPlan === 'trial' ? 'Començar trial gratuït' : 'Continuar'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </OnboardingLayoutV2>
  );
};

export default OnboardingPlanPage;
