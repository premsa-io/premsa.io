import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useOnboarding } from "@/context/OnboardingContext";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { Loader2, CheckCircle2, XCircle, Rocket } from "lucide-react";
import { toast } from "sonner";

const OnboardingSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data, resetData } = useOnboarding();
  const { user, account, loading: authLoading } = useAuth();
  
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [isCompleting, setIsCompleting] = useState(false);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (!sessionId) {
      navigate('/onboarding/plan');
      return;
    }

    verifyPayment();
  }, [authLoading, user, sessionId]);

  const verifyPayment = async () => {
    try {
      const { data: verifyData, error } = await supabase.functions.invoke('stripe-verify-session', {
        body: { sessionId }
      });

      if (error) throw error;

      if (verifyData?.success) {
        setStatus('success');
        await completeOnboarding();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setStatus('error');
    }
  };

  const completeOnboarding = async () => {
    if (!account?.id || !user?.id) return;

    setIsCompleting(true);

    try {
      const selectedTopics = data.selectedTopics?.filter(t => t.selected) || [];

      // Complete onboarding in database
      const { error: accountError } = await supabase
        .from('accounts' as any)
        .update({
          onboarding_completed_at: new Date().toISOString(),
        })
        .eq('id', account.id);

      if (accountError) throw accountError;

      // Update user profile
      await supabase
        .from('user_profiles' as any)
        .update({
          interface_language: data.interfaceLanguage,
          content_language: data.contentLanguage,
        })
        .eq('user_id', user.id);

      // Insert country
      if (data.selectedCountry) {
        await supabase.from('account_countries' as any).upsert({
          account_id: account.id,
          country: data.selectedCountry,
        }, { onConflict: 'account_id,country' });
      }

      // Insert topics
      for (const topic of selectedTopics) {
        await supabase.from('subscribed_topics' as any).insert({
          account_id: account.id,
          topic_id: topic.id,
          custom_name: topic.title,
          priority: topic.relevance === 'high' ? 1 : topic.relevance === 'medium' ? 2 : 3,
        });
      }

      // Create CKB entry
      await supabase.from('client_knowledge_base' as any).insert({
        account_id: account.id,
        content_type: 'onboarding_description',
        original_content: data.businessDescription,
        processed_summary: data.aiSummary || null,
        inferred_domains: selectedTopics.map(t => t.primary_ambit),
        confidence_score: 0.8,
      });

      resetData();
      toast.success("Subscripció activada correctament!");
    } catch (error) {
      console.error('Complete onboarding error:', error);
      toast.error("Error en completar la configuració");
    } finally {
      setIsCompleting(false);
    }
  };

  const handleGoToDashboard = () => {
    window.location.href = '/dashboard';
  };

  if (authLoading || status === 'verifying') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
              <div>
                <h2 className="text-xl font-semibold">Verificant el pagament...</h2>
                <p className="text-muted-foreground mt-2">
                  Estem confirmant la teva subscripció amb Stripe
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <CardTitle>Error en el pagament</CardTitle>
            <CardDescription>
              No hem pogut verificar el teu pagament. Si us plau, torna-ho a intentar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => navigate('/onboarding/plan')} 
              className="w-full"
            >
              Tornar a la selecció de pla
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/contact')} 
              className="w-full"
            >
              Contactar suport
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Subscripció activada!</CardTitle>
          <CardDescription>
            Gràcies per confiar en PREMSA.IO. La teva subscripció ja està activa.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Les primeres alertes arribaran en menys de 24 hores si hi ha regulacions rellevants per al teu negoci.
            </p>
          </div>
          
          <Button 
            onClick={handleGoToDashboard} 
            className="w-full"
            size="lg"
            disabled={isCompleting}
          >
            {isCompleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Completant configuració...
              </>
            ) : (
              <>
                <Rocket className="w-4 h-4 mr-2" />
                Anar al dashboard
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingSuccessPage;
