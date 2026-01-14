import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
import { supabase } from "@/lib/supabase";
import { ArrowRight, Loader2, Info, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import OnboardingLayoutV3 from "./OnboardingLayoutV3";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { value: 'ca', label: 'Català' },
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
];

const formSchema = z.object({
  fullName: z.string().min(2, "Mínim 2 caràcters"),
  email: z.string().email("Email no vàlid"),
  password: z.string().min(8, "Mínim 8 caràcters"),
  confirmPassword: z.string(),
  interfaceLanguage: z.string().min(1, "Selecciona un idioma"),
  contentLanguage: z.string().min(1, "Selecciona un idioma"),
  acceptTerms: z.boolean().refine(val => val === true, "Has d'acceptar els termes"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les contrasenyes no coincideixen",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const OnboardingStep1Page = () => {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();
  const { user, account, loading } = useAuth();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: data.fullName || '',
      email: data.email || '',
      password: '',
      confirmPassword: '',
      interfaceLanguage: data.interfaceLanguage || 'ca',
      contentLanguage: data.contentLanguage || 'ca',
      acceptTerms: false,
    },
  });

  // If already authenticated, redirect to step 2
  useEffect(() => {
    if (!loading && user) {
      if (account?.onboarding_completed_at) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding/step-2');
      }
    }
  }, [loading, user, account, navigate]);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      // Create user with Supabase
      const { data: authData, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            full_name: values.fullName,
          }
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast.error("Aquest email ja està registrat. Inicia sessió.");
          navigate('/login');
          return;
        }
        throw error;
      }

      if (!authData.user) {
        toast.error("Error en crear el compte");
        return;
      }

      // Wait a bit for the trigger to create account and profile
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user profile with language preferences and full name
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({
          full_name: values.fullName,
          interface_language: values.interfaceLanguage,
          content_language: values.contentLanguage,
        })
        .eq('user_id', authData.user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        // Non-blocking
      }

      // Save to context
      updateData({
        fullName: values.fullName,
        email: values.email,
        interfaceLanguage: values.interfaceLanguage,
        contentLanguage: values.contentLanguage,
      });

      toast.success("Compte creat correctament!");
      navigate('/onboarding/step-2');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || "Error en crear el compte");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <OnboardingLayoutV3
      title={t('onboarding.step1.title', "Crea el teu compte")}
      subtitle={t('onboarding.step1.subtitle', "En menys de 5 minuts tindràs tot configurat")}
      showBack={false}
    >
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Credentials Section */}
              <div className="space-y-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t('onboarding.step1.credentials', 'Credencials')}
                </p>

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('onboarding.step1.fullName', 'Nom complet')} *</FormLabel>
                      <FormControl>
                        <Input 
                          type="text" 
                          placeholder={t('onboarding.step1.fullNamePlaceholder', 'El teu nom i cognoms')}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('onboarding.step1.email', 'Email corporatiu')} *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="nom@empresa.com" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('onboarding.step1.password', 'Contrasenya')} *</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription>
                        {t('onboarding.step1.passwordHint', 'Mínim 8 caràcters')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('onboarding.step1.confirmPassword', 'Confirmar contrasenya')} *</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      {field.value && form.watch('password') === field.value && (
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <CheckCircle2 className="h-4 w-4" />
                          {t('onboarding.step1.passwordsMatch', 'Les contrasenyes coincideixen')}
                        </div>
                      )}
                      {field.value && form.watch('password') !== field.value && (
                        <div className="flex items-center gap-2 text-destructive text-sm">
                          <XCircle className="h-4 w-4" />
                          {t('onboarding.step1.passwordsNoMatch', 'Les contrasenyes no coincideixen')}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Language Section */}
              <div className="space-y-4 pt-4 border-t border-border">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t('onboarding.step1.languageSection', "Preferències d'idioma")}
                </p>

                <FormField
                  control={form.control}
                  name="interfaceLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('onboarding.step1.interfaceLanguage', 'Idioma de la interfície')} *</FormLabel>
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
                      <FormLabel>{t('onboarding.step1.contentLanguage', 'Idioma del contingut')} *</FormLabel>
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
                      <FormDescription>
                        {t('onboarding.step1.contentLanguageHint', "L'idioma del contingut és el dels informes i resums")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Terms */}
              <div className="space-y-4 pt-4 border-t border-border">
                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal">
                          {t('onboarding.step1.acceptTerms', 'He llegit i accepto els')}{' '}
                          <Link to="/legal/terms" target="_blank" className="text-primary underline">
                            {t('onboarding.step1.termsLink', 'Termes i Condicions')}
                          </Link>
                          {' '}{t('onboarding.step1.andThe', 'i la')}{' '}
                          <Link to="/legal/privacy" target="_blank" className="text-primary underline">
                            {t('onboarding.step1.privacyLink', 'Política de Privacitat')}
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Admin note */}
                <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                  <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    {t('onboarding.step1.adminNote', "Seràs l'administrador del compte. Podràs convidar el teu equip al final del procés.")}
                  </p>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t('onboarding.step1.creating', 'Creant compte...')}
                    </>
                  ) : (
                    <>
                      {t('onboarding.step1.submit', 'Crear el meu compte')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              {/* Login link */}
              <p className="text-center text-sm text-muted-foreground">
                {t('onboarding.step1.hasAccount', 'Ja tens compte?')}{' '}
                <Link to="/login" className="text-primary underline hover:no-underline">
                  {t('onboarding.step1.loginLink', 'Inicia sessió')}
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </OnboardingLayoutV3>
  );
};

export default OnboardingStep1Page;
