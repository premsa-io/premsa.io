import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
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
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import OnboardingLayoutV3 from "./OnboardingLayoutV3";
import { useTranslation } from "react-i18next";

const COMPANY_SIZES = [
  { value: '1-10', label: '1-10 empleats' },
  { value: '11-50', label: '11-50 empleats' },
  { value: '51-200', label: '51-200 empleats' },
  { value: '201-500', label: '201-500 empleats' },
  { value: '500+', label: 'Més de 500 empleats' },
];

const SECTORS = [
  { value: 'energia', label: 'Energia' },
  { value: 'financer', label: 'Financer' },
  { value: 'farmaceutic', label: 'Farmacèutic' },
  { value: 'tecnologia', label: 'Tecnologia' },
  { value: 'telecom', label: 'Telecomunicacions' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'retail', label: 'Retail' },
  { value: 'serveis', label: 'Serveis' },
  { value: 'altres', label: 'Altres' },
];

import { normalizeUrl } from "@/lib/normalizeUrl";

const websiteSchema = z.preprocess(
  (val) => (typeof val === 'string' && val.trim() !== '' ? normalizeUrl(val) : ''),
  z.union([z.literal(''), z.string().url("Introdueix una URL vàlida")])
);

const formSchema = z.object({
  companyName: z.string().min(2, "El nom de l'empresa és obligatori"),
  companySize: z.string().min(1, "Selecciona la mida de l'empresa"),
  sector: z.string().min(1, "Selecciona el sector"),
  website: websiteSchema,
});

type FormValues = z.infer<typeof formSchema>;

const OnboardingStep3Page = () => {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();
  const { user, account, loading, accountLoading } = useAuth();
  const { t } = useTranslation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: data.companyName || data.aiAnalysis?.company_name || '',
      companySize: data.companySize || data.aiAnalysis?.company_size || '',
      sector: data.sector || data.aiAnalysis?.sector || '',
      website: data.website || data.websiteUrl || '',
    },
  });

  // Redirect checks - wait for accountLoading to be false
  useEffect(() => {
    if (!loading && !user) {
      navigate('/onboarding/step-1');
    }
    if (!loading && !accountLoading && account?.onboarding_completed_at) {
      navigate('/dashboard');
    }
  }, [loading, accountLoading, user, account, navigate]);

  // Redirect to step 2 if no AI analysis
  useEffect(() => {
    if (!data.aiSummary && !data.description && !data.websiteUrl) {
      navigate('/onboarding/step-2');
    }
  }, [data.aiSummary, data.description, data.websiteUrl, navigate]);

  const onSubmit = (values: FormValues) => {
    updateData({
      companyName: values.companyName,
      companySize: values.companySize,
      sector: values.sector,
      website: values.website || '',
    });
    navigate('/onboarding/step-4');
  };

  if (loading || accountLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <OnboardingLayoutV3
      title={t('onboarding.step3.title', "Confirma les dades de l'empresa")}
      subtitle={t('onboarding.step3.subtitle', "Hem analitzat el teu perfil. Revisa i ajusta si cal.")}
    >
      <div className="space-y-6">
        {/* AI Summary */}
        {data.aiSummary && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">
                    {t('onboarding.step3.aiSummary', 'Segons la nostra anàlisi:')}
                  </p>
                  <p className="text-sm text-muted-foreground">{data.aiSummary}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form */}
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('onboarding.step3.companyName', "Nom de l'empresa")} *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom de l'empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('onboarding.step3.sector', 'Sector')} *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el sector" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SECTORS.map((sector) => (
                            <SelectItem key={sector.value} value={sector.value}>
                              {sector.label}
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
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('onboarding.step3.companySize', "Mida de l'empresa")} *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona la mida" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {COMPANY_SIZES.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.label}
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
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('onboarding.step3.website', 'Website (opcional)')}</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="exemple.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <Button type="submit" className="w-full" size="lg">
                    {t('onboarding.navigation.next', 'Continuar')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </OnboardingLayoutV3>
  );
};

export default OnboardingStep3Page;
