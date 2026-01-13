import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { OnboardingProvider, useOnboarding } from "@/context/OnboardingContext";
import OnboardingLayout from "./OnboardingLayout";
import OnboardingStep1 from "./OnboardingStep1";
import OnboardingStep2 from "./OnboardingStep2";
import OnboardingStep3 from "./OnboardingStep3";
import OnboardingStep4 from "./OnboardingStep4";
import OnboardingStep5 from "./OnboardingStep5";
import { Loader2 } from "lucide-react";

const OnboardingContent = () => {
  const { currentStep } = useOnboarding();
  const { user, account, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If not logged in, redirect to login
    if (!loading && !user) {
      navigate('/login');
    }
    // If onboarding already completed, redirect to dashboard
    if (!loading && account?.onboarding_completed_at) {
      navigate('/dashboard');
    }
  }, [loading, user, account, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <OnboardingStep1 />;
      case 2:
        return <OnboardingStep2 />;
      case 3:
        return <OnboardingStep3 />;
      case 4:
        return <OnboardingStep4 />;
      case 5:
        return <OnboardingStep5 />;
      default:
        return <OnboardingStep1 />;
    }
  };

  // Map internal steps (1-5) to display steps (1-4) for the progress bar
  const getDisplayStep = () => {
    if (currentStep <= 2) return currentStep;
    return currentStep - 1; // Steps 3,4,5 become 2,3,4
  };

  return (
    <OnboardingLayout currentStep={getDisplayStep()} totalSteps={4}>
      {renderStep()}
    </OnboardingLayout>
  );
};

const OnboardingPage = () => {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
};

export default OnboardingPage;
