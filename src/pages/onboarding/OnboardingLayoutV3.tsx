import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface OnboardingLayoutV3Props {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
}

const STEPS = [
  { path: '/onboarding/step-1', labelKey: 'onboarding.steps.account' },
  { path: '/onboarding/step-2', labelKey: 'onboarding.steps.business' },
  { path: '/onboarding/step-3', labelKey: 'onboarding.steps.company' },
  { path: '/onboarding/step-4', labelKey: 'onboarding.steps.country' },
  { path: '/onboarding/step-5', labelKey: 'onboarding.steps.topics' },
  { path: '/onboarding/step-6', labelKey: 'onboarding.steps.review' },
  { path: '/onboarding/step-7', labelKey: 'onboarding.steps.plan' },
];

const OnboardingLayoutV3 = ({ 
  children, 
  title, 
  subtitle,
  showBack = true,
  onBack 
}: OnboardingLayoutV3Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
  const currentStepIndex = STEPS.findIndex(s => s.path === location.pathname);
  const currentStep = currentStepIndex + 1;
  const totalSteps = STEPS.length;
  const progressValue = (currentStep / totalSteps) * 100;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (currentStepIndex > 0) {
      navigate(STEPS[currentStepIndex - 1].path);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with logo */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">PREMSA.IO</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {t('onboarding.navigation.step')} {currentStep} {t('onboarding.navigation.of', 'de')} {totalSteps}
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="w-full bg-muted">
        <Progress value={progressValue} className="h-1 rounded-none" />
      </div>

      {/* Step indicators */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-1 overflow-x-auto">
            {STEPS.map((step, index) => {
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;
              
              return (
                <div 
                  key={step.path}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : isCompleted 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    isActive 
                      ? 'bg-primary-foreground/20' 
                      : isCompleted 
                        ? 'bg-primary/30' 
                        : 'bg-muted-foreground/20'
                  }`}>
                    {isCompleted ? '✓' : index + 1}
                  </span>
                  <span className="hidden md:inline">{t(step.labelKey, step.labelKey.split('.').pop())}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
          <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col">
            {/* Title section */}
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              {subtitle && (
                <p className="text-muted-foreground">{subtitle}</p>
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              {children}
            </div>

            {/* Back button (optional) */}
            {showBack && currentStepIndex > 0 && (
              <div className="mt-8 pt-4 border-t border-border">
                <Button variant="ghost" onClick={handleBack} className="text-muted-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('onboarding.navigation.back')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OnboardingLayoutV3;
