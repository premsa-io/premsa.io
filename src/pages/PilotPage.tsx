import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, CheckCircle, Loader2, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { z } from "zod";

const PilotPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    sector: "",
    companySize: "",
    interest: "",
    privacy: false,
  });

  // Validation schema for pilot applications
  const getPilotSchema = () => z.object({
    name: z.string().trim().min(3, t("bookDemo.validation.nameMin")).max(100, t("bookDemo.validation.nameMax")),
    email: z.string().trim().email(t("bookDemo.validation.emailInvalid")).max(255, t("bookDemo.validation.emailMax")),
    phone: z.string().trim().min(9, t("bookDemo.validation.phoneInvalid")).max(20, t("bookDemo.validation.phoneMax")),
    company: z.string().trim().min(1, t("bookDemo.validation.companyRequired")).max(100, t("bookDemo.validation.companyMax")),
    role: z.string().min(1, t("bookDemo.validation.roleRequired")),
    sector: z.string().min(1, t("bookDemo.validation.sectorRequired")),
    companySize: z.string().min(1, t("bookDemo.validation.companySizeRequired")),
    interest: z.string().trim().min(10, t("bookDemo.pilot.interestRequired")).max(1000, t("bookDemo.validation.messageMax")),
    privacy: z.boolean().refine((val) => val === true, t("bookDemo.validation.privacyRequired")),
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const pilotSchema = getPilotSchema();
    const result = pilotSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_requests").insert({
        request_type: 'pilot',
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company,
        message: formData.interest,
        source_page: '/pilot',
        source_params: '',
        status: 'new',
      });

      if (error) throw error;

      toast({
        title: t("bookDemo.pilot.successTitle"),
        description: t("bookDemo.pilot.successDescription"),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting pilot request:", error);
      toast({
        title: t("bookDemo.toast.error"),
        description: t("bookDemo.toast.errorDescription"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* SECTION 1: Hero */}
        <section className="bg-background py-10 md:py-12 px-4 md:px-8">
          <div className="mx-auto max-w-[560px] text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2 md:text-3xl">
              {t("bookDemo.pilot.title")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("bookDemo.pilot.subtitle")}
            </p>
          </div>
        </section>

        {/* SECTION 2: Form + Info */}
        <section className="bg-muted/40 py-10 md:py-14 px-4 md:px-8">
          <div className="mx-auto max-w-[960px]">
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8">
              {/* LEFT: Form */}
              <div className="bg-card rounded-lg p-6 shadow-sm">
                {!isSubmitted ? (
                  <>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-lg font-semibold text-foreground">
                        {t("bookDemo.pilot.formTitle")}
                      </h2>
                      <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-xs">
                        <Rocket className="w-3 h-3 mr-1" />
                        {t("bookDemo.planLabels.pilot")}
                      </Badge>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs">{t("bookDemo.form.name")}</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder={t("bookDemo.form.namePlaceholder", { defaultValue: "Joan García Martínez" })}
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={`h-9 text-sm ${errors.name ? "border-destructive" : ""}`}
                        />
                        {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs">{t("bookDemo.form.email")}</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t("bookDemo.form.emailPlaceholder", { defaultValue: "joan@empresa.com" })}
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`h-9 text-sm ${errors.email ? "border-destructive" : ""}`}
                        />
                        {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-xs">{t("bookDemo.form.phone")}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder={t("bookDemo.form.phonePlaceholder", { defaultValue: "+34 600 123 456" })}
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className={`h-9 text-sm ${errors.phone ? "border-destructive" : ""}`}
                        />
                        {errors.phone && <p className="text-destructive text-xs">{errors.phone}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="company" className="text-xs">{t("bookDemo.form.company")}</Label>
                        <Input
                          id="company"
                          type="text"
                          placeholder={t("bookDemo.form.companyPlaceholder")}
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className={`h-9 text-sm ${errors.company ? "border-destructive" : ""}`}
                        />
                        {errors.company && <p className="text-destructive text-xs">{errors.company}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs">{t("bookDemo.form.role")}</Label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) => handleInputChange("role", value)}
                        >
                          <SelectTrigger className={`h-9 text-sm ${errors.role ? "border-destructive" : ""}`}>
                            <SelectValue placeholder={t("bookDemo.form.rolePlaceholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="compliance-officer">{t("bookDemo.roles.complianceOfficer")}</SelectItem>
                            <SelectItem value="legal-director">{t("bookDemo.roles.legalDirector")}</SelectItem>
                            <SelectItem value="cfo">{t("bookDemo.roles.cfo")}</SelectItem>
                            <SelectItem value="ceo">{t("bookDemo.roles.ceo")}</SelectItem>
                            <SelectItem value="cto">{t("bookDemo.roles.cto")}</SelectItem>
                            <SelectItem value="risk-manager">{t("bookDemo.roles.riskManager")}</SelectItem>
                            <SelectItem value="other">{t("bookDemo.roles.other")}</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.role && <p className="text-destructive text-xs">{errors.role}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs">{t("bookDemo.form.sector")}</Label>
                        <Select
                          value={formData.sector}
                          onValueChange={(value) => handleInputChange("sector", value)}
                        >
                          <SelectTrigger className={`h-9 text-sm ${errors.sector ? "border-destructive" : ""}`}>
                            <SelectValue placeholder={t("bookDemo.form.sectorPlaceholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="legal">{t("bookDemo.sectors.legal")}</SelectItem>
                            <SelectItem value="banking">{t("bookDemo.sectors.banking")}</SelectItem>
                            <SelectItem value="energy">{t("bookDemo.sectors.energy")}</SelectItem>
                            <SelectItem value="telecoms">{t("bookDemo.sectors.telecoms")}</SelectItem>
                            <SelectItem value="pharma">{t("bookDemo.sectors.pharma")}</SelectItem>
                            <SelectItem value="insurance">{t("bookDemo.sectors.insurance")}</SelectItem>
                            <SelectItem value="transport">{t("bookDemo.sectors.transport")}</SelectItem>
                            <SelectItem value="construction">{t("bookDemo.sectors.construction")}</SelectItem>
                            <SelectItem value="other">{t("bookDemo.sectors.other")}</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.sector && <p className="text-destructive text-xs">{errors.sector}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs">{t("bookDemo.form.companySize")}</Label>
                        <Select
                          value={formData.companySize}
                          onValueChange={(value) => handleInputChange("companySize", value)}
                        >
                          <SelectTrigger className={`h-9 text-sm ${errors.companySize ? "border-destructive" : ""}`}>
                            <SelectValue placeholder={t("bookDemo.form.companySizePlaceholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="<100">{t("bookDemo.companySizes.under100")}</SelectItem>
                            <SelectItem value="100-500">{t("bookDemo.companySizes.100-500")}</SelectItem>
                            <SelectItem value="500-1000">{t("bookDemo.companySizes.500-1000")}</SelectItem>
                            <SelectItem value="1000-5000">{t("bookDemo.companySizes.1000-5000")}</SelectItem>
                            <SelectItem value="5000+">{t("bookDemo.companySizes.over5000")}</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.companySize && <p className="text-destructive text-xs">{errors.companySize}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="interest" className="text-xs">{t("bookDemo.pilot.interestLabel")} *</Label>
                        <Textarea
                          id="interest"
                          placeholder={t("bookDemo.pilot.interestPlaceholder")}
                          rows={4}
                          maxLength={1000}
                          value={formData.interest}
                          onChange={(e) => handleInputChange("interest", e.target.value)}
                          className={`text-sm ${errors.interest ? "border-destructive" : ""}`}
                        />
                        {errors.interest && <p className="text-destructive text-xs">{errors.interest}</p>}
                      </div>

                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="privacy"
                          checked={formData.privacy}
                          onCheckedChange={(checked) => handleInputChange("privacy", checked as boolean)}
                          className={errors.privacy ? "border-destructive" : ""}
                        />
                        <div className="grid gap-1 leading-none">
                          <label
                            htmlFor="privacy"
                            className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
                          >
                            {t("bookDemo.form.privacy")}{" "}
                            <Link to="/legal/privacy" className="text-primary underline hover:text-primary/80">
                              {t("bookDemo.form.privacyPolicy")}
                            </Link>
                          </label>
                          {errors.privacy && <p className="text-destructive text-xs">{errors.privacy}</p>}
                        </div>
                      </div>

                      <Button
                        type="submit"
                        size="sm"
                        className="w-full bg-amber-500 hover:bg-amber-600"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                            {t("bookDemo.form.submitting")}
                          </>
                        ) : (
                          t("bookDemo.pilot.submitButton")
                        )}
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-amber-500" />
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                      {t("bookDemo.pilot.successTitle")}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                      {t("bookDemo.pilot.successDescription")}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/">{t("bookDemo.thankyou.backHome")}</Link>
                    </Button>
                  </div>
                )}
              </div>

              {/* RIGHT: Info Panel */}
              <div className="space-y-5">
                {/* Benefits */}
                <div className="bg-card rounded-lg p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    {t("bookDemo.pilot.benefitsTitle", { defaultValue: t("bookDemo.whatToExpect.title") })}
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                      <span className="text-xs text-muted-foreground">{t("bookDemo.pilot.benefit1", { defaultValue: "50% discount for 6 months" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                      <span className="text-xs text-muted-foreground">{t("bookDemo.pilot.benefit2", { defaultValue: "Full Professional features" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                      <span className="text-xs text-muted-foreground">{t("bookDemo.pilot.benefit3", { defaultValue: "Priority support" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                      <span className="text-xs text-muted-foreground">{t("bookDemo.pilot.benefit4", { defaultValue: "Direct feedback channel" })}</span>
                    </li>
                  </ul>
                </div>

                {/* Price Info */}
                <div className="bg-card rounded-lg p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {t("bookDemo.pilot.priceTitle", { defaultValue: "Pilot Price" })}
                  </h3>
                  <p className="text-lg font-bold text-amber-500">
                    €2,750/month
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("bookDemo.pilot.priceNote", { defaultValue: "For 6 months (instead of €5,500)" })}
                  </p>
                </div>

                {/* Testimonial */}
                <div className="bg-muted/50 rounded-lg p-4 border-l-2 border-amber-500">
                  <p className="text-xs italic text-muted-foreground mb-2">
                    {t("bookDemo.testimonial.quote")}
                  </p>
                  <p className="text-[11px] font-medium text-foreground">
                    {t("bookDemo.testimonial.author")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PilotPage;
