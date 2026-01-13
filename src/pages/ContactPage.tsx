import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Calendar, MessageCircle, MapPin, CheckCircle, Loader2, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const ContactPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    reason: "",
    message: "",
    privacy: false,
  });

  // Dynamic validation schema using translations
  const getContactSchema = () => z.object({
    name: z.string().trim().min(1, t("contact.validation.nameRequired")).max(100, t("contact.validation.nameMax")),
    email: z.string().trim().email(t("contact.validation.emailInvalid")).max(255, t("contact.validation.emailMax")),
    company: z.string().trim().min(1, t("contact.validation.companyRequired")).max(100, t("contact.validation.companyMax")),
    role: z.string().optional(),
    reason: z.string().min(1, t("contact.validation.reasonRequired")),
    message: z.string().trim().min(1, t("contact.validation.messageRequired")).max(1000, t("contact.validation.messageMax")),
    privacy: z.boolean().refine((val) => val === true, t("contact.validation.privacyRequired")),
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const contactSchema = getContactSchema();
    const result = contactSchema.safeParse(formData);
    
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      toast({
        title: t("contact.toast.success"),
        description: t("contact.toast.successDescription"),
      });
    } catch {
      toast({
        title: t("contact.toast.error"),
        description: t("contact.toast.errorDescription"),
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
        {/* SECTION 1: Hero Contact */}
        <section className="bg-background py-12 md:py-16 px-4 md:px-8">
          <div className="mx-auto max-w-[560px] text-center">
            <h1 className="text-3xl font-bold text-foreground mb-3 md:text-[42px]">
              {t("contact.hero.title")}
            </h1>
            <p className="text-base text-muted-foreground">
              {t("contact.hero.description")}
              <br />
              {t("contact.hero.descriptionExtra")}
            </p>
          </div>
        </section>

        {/* SECTION 2: Contact Options */}
        <section className="bg-muted/40 py-10 md:py-14 px-4 md:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {/* Card 1: Email */}
              <Card className="bg-card rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="text-base font-semibold text-foreground mb-2">{t("contact.options.emailTitle")}</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {t("contact.options.emailDescription")}
                </p>
                <a 
                  href="mailto:hello@premsa.io" 
                  className="text-sm font-medium text-primary hover:text-primary/80 underline"
                >
                  hello@premsa.io
                </a>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {t("contact.options.emailResponse")}
                </p>
              </Card>

              {/* Card 2: Book Demo */}
              <Card className="bg-card rounded-lg p-6 text-center hover:shadow-md transition-shadow border-2 border-primary/20">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="text-base font-semibold text-foreground mb-2">{t("contact.options.demoTitle")}</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {t("contact.options.demoDescription")}
                </p>
                <Button size="sm" className="w-full text-sm" asChild>
                  <Link to="/book-demo">{t("contact.options.demoButton")}</Link>
                </Button>
                <p className="text-[11px] text-muted-foreground mt-2">
                  {t("contact.options.demoAvailability")}
                </p>
              </Card>

              {/* Card 3: Pilot Program */}
              <Card className="bg-card rounded-lg p-6 text-center hover:shadow-md transition-shadow border-2 border-amber-500/20">
                <Rocket className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-foreground mb-2">{t("contact.options.pilotTitle")}</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {t("contact.options.pilotDescription")}
                </p>
                <Button size="sm" className="w-full text-sm bg-amber-500 hover:bg-amber-600" asChild>
                  <Link to="/pilot">{t("contact.options.pilotButton")}</Link>
                </Button>
                <p className="text-[11px] text-muted-foreground mt-2">
                  {t("contact.options.pilotLimit")}
                </p>
              </Card>

              {/* Card 4: Chat */}
              <Card className="bg-card rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="text-base font-semibold text-foreground mb-2">{t("contact.options.chatTitle")}</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {t("contact.options.chatDescription")}
                </p>
                <Button variant="outline" size="sm" className="w-full text-sm">
                  {t("contact.options.chatButton")}
                </Button>
                <p className="text-[11px] text-muted-foreground mt-2">
                  {t("contact.options.chatHours")}
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 3: Contact Form */}
        <section className="bg-background py-10 md:py-14 px-4 md:px-8">
          <div className="mx-auto max-w-[520px]">
            <h2 className="text-xl font-semibold text-foreground text-center mb-6 md:text-2xl">
              {t("contact.form.title")}
            </h2>

            <div className="bg-muted/30 border border-border rounded-lg p-6 shadow-sm">
              {isSubmitted ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {t("contact.form.success")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {t("contact.form.successDescription")}
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/">{t("contact.form.backHome")}</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs">{t("contact.form.name")}</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Joan García"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`h-9 text-sm ${errors.name ? "border-destructive" : ""}`}
                      />
                      {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs">{t("contact.form.email")}</Label>
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
                  </div>

                  {/* Row 2: Company */}
                  <div className="space-y-1.5">
                    <Label htmlFor="company" className="text-xs">{t("contact.form.company")}</Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder={t("contact.form.companyPlaceholder")}
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className={`h-9 text-sm ${errors.company ? "border-destructive" : ""}`}
                    />
                    {errors.company && <p className="text-destructive text-xs">{errors.company}</p>}
                  </div>

                  {/* Row 3: Role */}
                  <div className="space-y-1.5">
                    <Label htmlFor="role" className="text-xs">{t("contact.form.role")}</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) => handleInputChange("role", value)}
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder={t("contact.form.rolePlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compliance-officer">{t("contact.roles.complianceOfficer")}</SelectItem>
                        <SelectItem value="legal-director">{t("contact.roles.legalDirector")}</SelectItem>
                        <SelectItem value="cfo">{t("contact.roles.cfo")}</SelectItem>
                        <SelectItem value="ceo">{t("contact.roles.ceo")}</SelectItem>
                        <SelectItem value="it">{t("contact.roles.it")}</SelectItem>
                        <SelectItem value="other">{t("contact.roles.other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Row 4: Reason */}
                  <div className="space-y-1.5">
                    <Label htmlFor="reason" className="text-xs">{t("contact.form.reason")}</Label>
                    <Select
                      value={formData.reason}
                      onValueChange={(value) => handleInputChange("reason", value)}
                    >
                      <SelectTrigger className={`h-9 text-sm ${errors.reason ? "border-destructive" : ""}`}>
                        <SelectValue placeholder={t("contact.form.reasonPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="demo">{t("contact.reasons.demo")}</SelectItem>
                        <SelectItem value="product">{t("contact.reasons.product")}</SelectItem>
                        <SelectItem value="pricing">{t("contact.reasons.pricing")}</SelectItem>
                        <SelectItem value="support">{t("contact.reasons.support")}</SelectItem>
                        <SelectItem value="partnership">{t("contact.reasons.partnership")}</SelectItem>
                        <SelectItem value="other">{t("contact.reasons.other")}</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.reason && <p className="text-destructive text-xs">{errors.reason}</p>}
                  </div>

                  {/* Row 5: Message */}
                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs">{t("contact.form.message")}</Label>
                    <Textarea
                      id="message"
                      placeholder={t("contact.form.messagePlaceholder")}
                      rows={4}
                      maxLength={1000}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={`text-sm ${errors.message ? "border-destructive" : ""}`}
                    />
                    <div className="flex justify-between">
                      {errors.message && <p className="text-destructive text-xs">{errors.message}</p>}
                      <p className="text-muted-foreground text-xs ml-auto">
                        {formData.message.length}/1000
                      </p>
                    </div>
                  </div>

                  {/* Privacy Checkbox */}
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
                        {t("contact.form.privacy")}{" "}
                        <Link to="/legal/privacy" className="text-primary underline hover:text-primary/80">
                          {t("contact.form.privacyPolicy")}
                        </Link>{" "}
                        {t("contact.form.termsAnd")}{" "}
                        <Link to="/legal/terms" className="text-primary underline hover:text-primary/80">
                          {t("contact.form.terms")}
                        </Link>
                      </label>
                      {errors.privacy && <p className="text-destructive text-xs">{errors.privacy}</p>}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="sm"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                        {t("contact.form.submitting")}
                      </>
                    ) : (
                      t("contact.form.submit")
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 4: Office Info */}
        <section className="bg-muted/40 py-8 md:py-10 px-4 md:px-8">
          <div className="mx-auto max-w-[520px] text-center">
            <h3 className="text-base font-semibold text-foreground mb-3">{t("contact.office.title")}</h3>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Barcelona, España</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;