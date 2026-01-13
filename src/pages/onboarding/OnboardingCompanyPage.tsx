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
import { ArrowRight, Loader2 } from "lucide-react";
import OnboardingLayoutV2 from "./OnboardingLayoutV2";

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
  { value: 'legal', label: 'Legal / Consultoria' },
  { value: 'sanitat', label: 'Sanitat' },
  { value: 'construccio', label: 'Construcció / Immobiliari' },
  { value: 'altres', label: 'Altres' },
];

const formSchema = z.object({
  companyName: z.string().min(2, "El nom de l'empresa és obligatori"),
  companySize: z.string().min(1, "Selecciona la mida de l'empresa"),
  sector: z.string().min(1, "Selecciona el sector"),
  website: z.string().url("Introdueix una URL vàlida").optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

const OnboardingCompanyPage = () => {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();
  const { user, account, loading } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: data.companyName || '',
      companySize: data.companySize || '',
      sector: data.sector || '',
      website: data.website || '',
    },
  });

  // Redirect if not authenticated or onboarding completed
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    if (!loading && account?.onboarding_completed_at) {
      navigate('/dashboard');
    }
  }, [loading, user, account, navigate]);

  const onSubmit = (values: FormValues) => {
    updateData({
      companyName: values.companyName,
      companySize: values.companySize,
      sector: values.sector,
      website: values.website || '',
    });
    navigate('/onboarding/profile');
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
      title="Informació de l'empresa"
      subtitle="Aquestes dades ens ajuden a personalitzar la teva experiència"
      showBack={false}
    >
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l'empresa *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom de l'empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mida de l'empresa *</FormLabel>
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
                name="sector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sector *</FormLabel>
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
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Web corporativa (opcional)</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://exemple.com" {...field} />
                    </FormControl>
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

export default OnboardingCompanyPage;
