import { useState } from "react";
import { useSearchParams } from "react-router-dom";
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
import { Check, CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { z } from "zod";

// Auto-approve criteria
const AUTO_APPROVE_SECTORS = ["legal", "banking", "energy", "telecoms"];
const AUTO_APPROVE_SIZES = ["500-1000", "1000-5000", "5000+"];

const BookDemoPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const planFromUrl = searchParams.get("plan");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<"form" | "calendly" | "thankyou">("form");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    sector: "",
    companySize: "",
    message: "",
    privacy: false,
  });

  // Dynamic validation schema using translations
  const getBookingSchema = () => z.object({
    name: z.string().trim().min(3, t("bookDemo.validation.nameMin")).max(100, t("bookDemo.validation.nameMax")),
    email: z.string().trim().email(t("bookDemo.validation.emailInvalid")).max(255, t("bookDemo.validation.emailMax")),
    phone: z.string().trim().min(9, t("bookDemo.validation.phoneInvalid")).max(20, t("bookDemo.validation.phoneMax")),
    company: z.string().trim().min(1, t("bookDemo.validation.companyRequired")).max(100, t("bookDemo.validation.companyMax")),
    role: z.string().min(1, t("bookDemo.validation.roleRequired")),
    sector: z.string().min(1, t("bookDemo.validation.sectorRequired")),
    companySize: z.string().min(1, t("bookDemo.validation.companySizeRequired")),
    message: z.string().max(1000, t("bookDemo.validation.messageMax")).optional(),
    privacy: z.boolean().refine((val) => val === true, t("bookDemo.validation.privacyRequired")),
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const shouldAutoApprove = (sector: string, size: string) => {
    return AUTO_APPROVE_SECTORS.includes(sector) && AUTO_APPROVE_SIZES.includes(size);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookingSchema = getBookingSchema();
    const result = bookingSchema.safeParse(formData);
    
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
    
    const autoApproved = shouldAutoApprove(formData.sector, formData.companySize);

    try {
      const { error } = await supabase.from("leads").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        role: formData.role,
        sector: formData.sector,
        company_size: formData.companySize,
        message: formData.message || null,
        plan_interest: planFromUrl || null,
        auto_approved: autoApproved,
      });

      if (error) throw error;

      toast({
        title: t("bookDemo.toast.success"),
        description: autoApproved 
          ? t("bookDemo.toast.successCalendly")
          : t("bookDemo.toast.successManual"),
      });

      setSubmissionState(autoApproved ? "calendly" : "thankyou");
    } catch (error) {
      console.error("Error submitting lead:", error);
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
              {t("bookDemo.hero.title")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("bookDemo.hero.description")}
            </p>
          </div>
        </section>

        {/* SECTION 2: Form + Info */}
        <section className="bg-muted/40 py-10 md:py-14 px-4 md:px-8">
          <div className="mx-auto max-w-[960px]">
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8">
              {/* LEFT: Form */}
              <div className="bg-card rounded-lg p-6 shadow-sm">
                {submissionState === "form" && (
                  <>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-lg font-semibold text-foreground">
                        {t("bookDemo.form.title")}
                      </h2>
                      {planFromUrl && (
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                          {t(`bookDemo.planLabels.${planFromUrl}`, { defaultValue: planFromUrl })}
                        </Badge>
                      )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs">{t("bookDemo.form.name")}</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Joan García Martínez"
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
                          placeholder="joan@empresa.com"
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
                          placeholder="+34 600 123 456"
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
                        <Label htmlFor="message" className="text-xs">{t("bookDemo.form.message")}</Label>
                        <Textarea
                          id="message"
                          placeholder={t("bookDemo.form.messagePlaceholder")}
                          rows={3}
                          maxLength={1000}
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className="text-sm"
                        />
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
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                            {t("bookDemo.form.submitting")}
                          </>
                        ) : (
                          t("bookDemo.form.submit")
                        )}
                      </Button>
                    </form>
                  </>
                )}

                {submissionState === "calendly" && (
                  <div className="text-center py-6">
                    <div className="bg-muted rounded-lg p-6 mb-4">
                      <div className="bg-card border border-border rounded-lg p-8 min-h-[300px] flex items-center justify-center">
                        <div className="text-center">
                          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {t("bookDemo.calendly.title")}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {t("bookDemo.calendly.description")}
                          </p>
                          <Button size="sm" asChild>
                            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                              {t("bookDemo.calendly.button")}
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {submissionState === "thankyou" && (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                      {t("bookDemo.thankyou.title")}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                      {t("bookDemo.thankyou.description")}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/">{t("bookDemo.thankyou.backHome")}</Link>
                    </Button>
                  </div>
                )}
              </div>

              {/* RIGHT: What to expect */}
              <div className="space-y-5">
                <div className="bg-card rounded-lg p-5 border border-border">
                  <h3 className="text-base font-semibold text-foreground mb-4">
                    {t("bookDemo.whatToExpect.title")}
                  </h3>
                  <ul className="space-y-2">
                    {[
                      t("bookDemo.whatToExpect.item1"),
                      t("bookDemo.whatToExpect.item2"),
                      t("bookDemo.whatToExpect.item3"),
                      t("bookDemo.whatToExpect.item4"),
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card rounded-lg p-5 border border-border">
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {t("bookDemo.duration.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("bookDemo.duration.time")}
                  </p>
                </div>

                <div className="bg-primary/5 rounded-lg p-5 border border-primary/10">
                  <p className="text-sm italic text-muted-foreground mb-2">
                    {t("bookDemo.testimonial.quote")}
                  </p>
                  <p className="text-xs font-medium text-foreground">
                    — {t("bookDemo.testimonial.author")}
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

export default BookDemoPage;