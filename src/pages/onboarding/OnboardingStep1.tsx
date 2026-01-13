import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useOnboarding } from "@/context/OnboardingContext";
import { Zap, ClipboardList } from "lucide-react";

const OnboardingStep1 = () => {
  const { updateData, setCurrentStep } = useOnboarding();

  const handleSelectMethod = (method: 'ai' | 'manual') => {
    updateData({ method });
    setCurrentStep(2);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Benvingut a PREMSA.IO!</h1>
        <p className="text-lg text-muted-foreground">
          Com vols configurar el teu compte?
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* AI Fast Track */}
        <Card 
          className="cursor-pointer transition-all hover:border-primary hover:shadow-lg group"
          onClick={() => handleSelectMethod('ai')}
        >
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-xl">Configuració Ràpida</CardTitle>
            <CardDescription className="text-primary font-medium">
              Recomanat
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              2 minuts amb IA
            </p>
            <p className="text-sm text-muted-foreground">
              La nostra IA analitza la teva web i configura les preferències automàticament
            </p>
          </CardContent>
        </Card>

        {/* Manual Setup */}
        <Card 
          className="cursor-pointer transition-all hover:border-primary hover:shadow-lg group"
          onClick={() => handleSelectMethod('manual')}
        >
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 group-hover:bg-muted/80 transition-colors">
              <ClipboardList className="w-8 h-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-xl">Configuració Manual</CardTitle>
            <CardDescription>
              Formularis pas a pas
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Tu tries cada opció
            </p>
            <p className="text-sm text-muted-foreground">
              Tu tries cada opció i preferència manualment
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingStep1;
