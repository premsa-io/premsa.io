import { Progress } from "@/components/ui/progress";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps?: number;
}

const OnboardingLayout = ({ children, currentStep, totalSteps = 5 }: OnboardingLayoutProps) => {
  const progressValue = (currentStep / totalSteps) * 100;

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

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default OnboardingLayout;
