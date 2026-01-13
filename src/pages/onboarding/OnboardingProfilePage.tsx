import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOnboarding } from "@/context/OnboardingContext";
import { useAuth } from "@/lib/AuthContext";
import { ArrowRight, Loader2 } from "lucide-react";
import OnboardingLayoutV2 from "./OnboardingLayoutV2";

const LANGUAGES = [
  { value: 'ca', label: 'Català' },
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
];

const formSchema = z.object({
  interfaceLanguage: z.string().min(1, "Selecciona un idioma"),
  contentLanguage: z.string().min(1, "Selecciona un idioma"),
  businessDescription: z
    .string()
    .min(50, "La descripció ha de tenir almenys 50 caràcters")
    .max(500, "La descripció no pot superar els 500 caràcters"),
});

type FormValues = z.infer<typeof formSchema>;

const OnboardingProfilePage = () => {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();
  const { user, account, loading } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interfaceLanguage: data.interfaceLanguage || 'ca',
      contentLanguage: data.contentLanguage || 'ca',
      businessDescription: data.businessDescription || '',
    },
  });

  const descriptionLength = form.watch('businessDescription')?.length || 0;

  // Redirect checks
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    if (!loading && account?.onboarding_completed_at) {
      navigate('/dashboard');
    }
  }, [loading, user, account, navigate]);

  // Redirect to step 1 if company info not filled
  useEffect(() => {
    if (!data.companyName) {
      navigate('/onboarding/company');
    }
  }, [data.companyName, navigate]);

  const onSubmit = (values: FormValues) => {
    updateData({
      interfaceLanguage: values.interfaceLanguage,
      contentLanguage: values.contentLanguage,
      businessDescription: values.businessDescription,
    });
    navigate('/onboarding/country');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <OnboardingLayoutV2
      title="Configuració del teu perfil"
      subtitle="Com vols interactuar amb PREMSA.IO?"
    >
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="interfaceLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idioma de la interfície *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona idioma" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {LANGUAGES.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contentLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idioma del contingut *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona idioma" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {LANGUAGES.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="businessDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripció del negoci *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descriu breument el teu negoci: què feu, quins productes o serveis oferiu, i quins són els vostres principals reptes regulatoris..."
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="flex justify-between">
                      <span>
                        Això ens ajuda a recomanar els tòpics més rellevants
                      </span>
                      <span className={descriptionLength < 50 ? 'text-destructive' : 'text-muted-foreground'}>
                        {descriptionLength}/500
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button type="submit" className="w-full" size="lg">
                  Següent
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </OnboardingLayoutV2>
  );
};

export default OnboardingProfilePage;
