import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface OnboardingLayoutV2Props {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
}

const STEPS = [
  { path: '/onboarding/company', label: 'Empresa' },
  { path: '/onboarding/profile', label: 'Perfil' },
  { path: '/onboarding/country', label: 'País' },
  { path: '/onboarding/topics', label: 'Tòpics' },
  { path: '/onboarding/plan', label: 'Pla' },
  { path: '/onboarding/confirm', label: 'Confirmar' },
];

const OnboardingLayoutV2 = ({ 
  children, 
  title, 
  subtitle,
  showBack = true,
  onBack 
}: OnboardingLayoutV2Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  
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
            Pas {currentStep} de {totalSteps}
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
          <div className="flex items-center justify-center gap-2 overflow-x-auto">
            {STEPS.map((step, index) => {
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;
              
              return (
                <div 
                  key={step.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
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
                  <span className="hidden sm:inline">{step.label}</span>
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
                  Enrere
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OnboardingLayoutV2;
