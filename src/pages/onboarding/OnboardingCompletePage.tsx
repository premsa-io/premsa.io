import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOnboarding } from "@/context/OnboardingContext";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { Loader2, CheckCircle, ArrowRight, Users } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const OnboardingCompletePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data, resetData } = useOnboarding();
  const { user, account, loading: authLoading } = useAuth();
  const { t } = useTranslation();
  
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/onboarding/step-1');
      return;
    }

    if (!sessionId) {
      navigate('/onboarding/step-7');
      return;
    }

    verifyPayment();
  }, [authLoading, user, sessionId]);

  const verifyPayment = async () => {
    if (!account?.id || !sessionId) return;

    try {
      // Verify Stripe session
      const { data: verifyData, error } = await supabase.functions.invoke('stripe-verify-session', {
        body: {
          sessionId: sessionId,
        }
      });

      if (error) throw error;

      if (!verifyData?.success) {
        throw new Error('Payment verification failed');
      }

      // Complete onboarding
      await supabase.from('accounts').update({
        onboarding_completed: true,
        onboarding_completed_at: new Date().toISOString(),
        tier: verifyData.tier,
        billing_period: verifyData.billingPeriod,
        stripe_customer_id: verifyData.customerId,
        stripe_subscription_id: verifyData.subscriptionId,
      }).eq('id', account.id);

      // Insert country
      if (data.selectedCountry) {
        await supabase.from('account_countries').upsert({
          account_id: account.id,
          country: data.selectedCountry,
        }, { onConflict: 'account_id,country' });
      }

      // Insert topics
      const selectedTopics = data.selectedTopics?.filter(t => t.selected) || [];
      for (const topic of selectedTopics) {
        await supabase.from('subscribed_topics').insert({
          account_id: account.id,
          topic_id: topic.id,
          custom_name: topic.title,
          priority: topic.relevance === 'high' ? 1 : 2,
        });
      }

      // Create CKB entry
      if (data.description || data.aiSummary) {
        await supabase.from('client_knowledge_base').insert({
          account_id: account.id,
          content_type: 'onboarding_description',
          original_content: data.description || data.businessDescription,
          processed_summary: data.aiSummary,
          confidence_score: 0.8,
        });
      }

      resetData();
      setIsVerifying(false);
      toast.success("Compte configurat correctament!");
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationError("Error verificant el pagament");
      setIsVerifying(false);
    }
  };

  const handleGoToDashboard = () => {
    window.location.href = '/dashboard';
  };

  if (authLoading || isVerifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">
          {t('onboarding.complete.verifying', 'Verificant el pagament...')}
        </p>
      </div>
    );
  }

  if (verificationError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <p className="text-destructive mb-4">{verificationError}</p>
            <Button onClick={() => navigate('/onboarding/step-7')}>
              Tornar a intentar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">
            {t('onboarding.complete.title', 'Tot llest!')}
          </CardTitle>
          <p className="text-muted-foreground">
            {t('onboarding.complete.subtitle', 'El teu compte està configurat i llest per utilitzar.')}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              {t('onboarding.complete.planContracted', 'Pla contractat')}: <strong>{data.selectedPlan}</strong>
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4" />
              <p className="font-medium text-sm">
                {t('onboarding.complete.inviteTeam.title', 'Vols convidar membres del teu equip?')}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('onboarding.complete.inviteTeam.laterNote', 'Pots convidar més persones des de Configuració')}
            </p>
          </div>

          <Button onClick={handleGoToDashboard} className="w-full" size="lg">
            {t('onboarding.complete.goToDashboard', 'Anar al dashboard')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingCompletePage;
