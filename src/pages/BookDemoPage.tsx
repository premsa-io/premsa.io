import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Validation schema
const bookingSchema = z.object({
  name: z.string().trim().min(3, "Mínim 3 caràcters").max(100, "Màxim 100 caràcters"),
  email: z.string().trim().email("Email no vàlid").max(255, "Màxim 255 caràcters"),
  phone: z.string().trim().min(9, "Telèfon no vàlid").max(20, "Màxim 20 caràcters"),
  company: z.string().trim().min(1, "L'empresa és obligatòria").max(100, "Màxim 100 caràcters"),
  role: z.string().min(1, "Selecciona un càrrec"),
  sector: z.string().min(1, "Selecciona un sector"),
  companySize: z.string().min(1, "Selecciona la mida de l'empresa"),
  message: z.string().max(1000, "Màxim 1000 caràcters").optional(),
  privacy: z.boolean().refine((val) => val === true, "Has d'acceptar la política de privacitat"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

// Auto-approve criteria
const AUTO_APPROVE_SECTORS = ["legal", "banking", "energy", "telecoms"];
const AUTO_APPROVE_SIZES = ["500-1000", "1000-5000", "5000+"];

const BookDemoPage = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const planFromUrl = searchParams.get("plan");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<"form" | "calendly" | "thankyou">("form");
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  
  const [formData, setFormData] = useState<BookingFormData>({
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

  const handleInputChange = (field: keyof BookingFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const shouldAutoApprove = (sector: string, size: string) => {
    return AUTO_APPROVE_SECTORS.includes(sector) && AUTO_APPROVE_SIZES.includes(size);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = bookingSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BookingFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof BookingFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    const autoApproved = shouldAutoApprove(formData.sector, formData.companySize);

    try {
      // Save lead to Supabase
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
        title: "Sol·licitud enviada!",
        description: autoApproved 
          ? "Ara pots seleccionar un horari per la demo." 
          : "Et contactarem en menys de 24 hores.",
      });

      setSubmissionState(autoApproved ? "calendly" : "thankyou");
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast({
        title: "Error",
        description: "Hi ha hagut un error. Torna-ho a provar.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const planLabels: Record<string, string> = {
    pilot: "Pilot Program",
    flexible: "Pla Flexible",
    growth: "Pla Growth",
    enterprise: "Pla Enterprise",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* SECTION 1: Hero */}
        <section className="bg-white py-12 md:py-16 px-6 md:px-12">
          <div className="mx-auto max-w-[700px] text-center">
            <h1 className="font-heading font-extrabold text-[36px] md:text-[48px] text-foreground mb-4">
              Agendar Demo de PREMSA.IO
            </h1>
            <p className="font-sans text-lg leading-relaxed text-muted-foreground">
              Veurem com PREMSA.IO funciona específicament pel teu sector i cas d'ús
            </p>
          </div>
        </section>

        {/* SECTION 2: Form + Info */}
        <section className="bg-muted py-16 md:py-24 px-6 md:px-12">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12">
              {/* LEFT: Form */}
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
                {submissionState === "form" && (
                  <>
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="font-heading font-bold text-2xl text-foreground">
                        Les teves dades
                      </h2>
                      {planFromUrl && planLabels[planFromUrl] && (
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          Sol·licitud: {planLabels[planFromUrl]}
                        </Badge>
                      )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Row 1: Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Joan García Martínez"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                      </div>

                      {/* Row 2: Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email corporatiu *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="joan@empresa.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                      </div>

                      {/* Row 3: Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telèfon *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+34 600 123 456"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
                      </div>

                      {/* Row 4: Company */}
                      <div className="space-y-2">
                        <Label htmlFor="company">Empresa *</Label>
                        <Input
                          id="company"
                          type="text"
                          placeholder="Nom de l'empresa"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className={errors.company ? "border-destructive" : ""}
                        />
                        {errors.company && <p className="text-destructive text-sm">{errors.company}</p>}
                      </div>

                      {/* Row 5: Role */}
                      <div className="space-y-2">
                        <Label>Càrrec *</Label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) => handleInputChange("role", value)}
                        >
                          <SelectTrigger className={errors.role ? "border-destructive" : ""}>
                            <SelectValue placeholder="Selecciona el teu càrrec" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="compliance-officer">Compliance Officer</SelectItem>
                            <SelectItem value="legal-director">Legal Director</SelectItem>
                            <SelectItem value="cfo">CFO</SelectItem>
                            <SelectItem value="ceo">CEO</SelectItem>
                            <SelectItem value="cto">CTO</SelectItem>
                            <SelectItem value="risk-manager">Risk Manager</SelectItem>
                            <SelectItem value="other">Altre</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.role && <p className="text-destructive text-sm">{errors.role}</p>}
                      </div>

                      {/* Row 6: Sector */}
                      <div className="space-y-2">
                        <Label>Sector *</Label>
                        <Select
                          value={formData.sector}
                          onValueChange={(value) => handleInputChange("sector", value)}
                        >
                          <SelectTrigger className={errors.sector ? "border-destructive" : ""}>
                            <SelectValue placeholder="Selecciona el teu sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="legal">Legal</SelectItem>
                            <SelectItem value="banking">Banca & Finances</SelectItem>
                            <SelectItem value="energy">Energia</SelectItem>
                            <SelectItem value="telecoms">Telecoms</SelectItem>
                            <SelectItem value="pharma">Pharma</SelectItem>
                            <SelectItem value="insurance">Seguros</SelectItem>
                            <SelectItem value="transport">Transport</SelectItem>
                            <SelectItem value="construction">Construcció</SelectItem>
                            <SelectItem value="other">Altre</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.sector && <p className="text-destructive text-sm">{errors.sector}</p>}
                      </div>

                      {/* Row 7: Company Size */}
                      <div className="space-y-2">
                        <Label>Mida de l'empresa *</Label>
                        <Select
                          value={formData.companySize}
                          onValueChange={(value) => handleInputChange("companySize", value)}
                        >
                          <SelectTrigger className={errors.companySize ? "border-destructive" : ""}>
                            <SelectValue placeholder="Selecciona la mida" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="<100">&lt;100 empleats</SelectItem>
                            <SelectItem value="100-500">100-500 empleats</SelectItem>
                            <SelectItem value="500-1000">500-1.000 empleats</SelectItem>
                            <SelectItem value="1000-5000">1.000-5.000 empleats</SelectItem>
                            <SelectItem value="5000+">5.000+ empleats</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.companySize && <p className="text-destructive text-sm">{errors.companySize}</p>}
                      </div>

                      {/* Row 8: Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message">Què vols veure a la demo? (opcional)</Label>
                        <Textarea
                          id="message"
                          placeholder="Ex: Com detecteu canvis en normativa fiscal? Podeu integrar-vos amb el nostre CRM?"
                          rows={4}
                          maxLength={1000}
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                        />
                      </div>

                      {/* Privacy Checkbox */}
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="privacy"
                          checked={formData.privacy}
                          onCheckedChange={(checked) => handleInputChange("privacy", checked as boolean)}
                          className={errors.privacy ? "border-destructive" : ""}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="privacy"
                            className="text-[13px] text-muted-foreground leading-relaxed cursor-pointer"
                          >
                            Accepto la{" "}
                            <Link to="/legal/privacy" className="text-primary underline hover:text-primary/80">
                              Privacy Policy
                            </Link>
                            . PREMSA.IO usarà aquestes dades per contactar-me.
                          </label>
                          {errors.privacy && <p className="text-destructive text-sm">{errors.privacy}</p>}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full py-6"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Enviant...
                          </>
                        ) : (
                          "Continuar a Calendari →"
                        )}
                      </Button>
                    </form>
                  </>
                )}

                {submissionState === "calendly" && (
                  <div className="text-center py-8">
                    <div className="bg-muted rounded-lg p-8 mb-6">
                      <p className="text-muted-foreground mb-4">
                        Integració de Calendly (configura l'URL al codi)
                      </p>
                      {/* Calendly embed would go here */}
                      <div className="bg-white border border-border rounded-lg p-12 min-h-[400px] flex items-center justify-center">
                        <div className="text-center">
                          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                          <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                            Dades rebudes correctament!
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            Aquí apareixerà el calendari per seleccionar horari.
                          </p>
                          <Button asChild>
                            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                              Obrir Calendly →
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {submissionState === "thankyou" && (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                    <h2 className="font-heading font-bold text-[32px] text-foreground mb-4">
                      Gràcies per l'interès!
                    </h2>
                    <p className="font-sans text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                      El nostre equip revisarà la teva sol·licitud i et contactarà en menys de 24 hores per agendar la demo.
                    </p>
                    
                    <p className="font-sans font-semibold text-base text-foreground mb-6">
                      Mentrestant, pots:
                    </p>
                    <div className="flex flex-col gap-3 max-w-xs mx-auto">
                      <Button variant="outline" asChild>
                        <Link to="/demo">Explorar demos per sector →</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/playground">Provar el Playground interactiu →</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/pricing">Llegir sobre pricing →</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT: Info Card */}
              <div className="lg:sticky lg:top-24 self-start">
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-10">
                  <h3 className="font-heading font-bold text-xl text-primary mb-6">
                    Què incloem a la demo
                  </h3>

                  <ul className="space-y-5 mb-8">
                    {[
                      "30 minuts de demo personalitzada pel teu sector",
                      "Veuràs alertes reals (anonimitzades) d'empreses similars",
                      "Q&A amb el nostre equip tècnic",
                      "Anàlisi ROI estimat pel teu cas",
                      "Informació sobre Pilot Program (50% discount)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="font-sans text-base text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-primary/20 pt-6 mb-6">
                    <p className="font-sans text-[15px] italic text-muted-foreground mb-3">
                      "La demo ens va convèncer en 15 minuts. Vam veure exactament com detectarien canvis que ens afecten."
                    </p>
                    <p className="font-sans font-medium text-[13px] text-muted-foreground">
                      - Carlos M., Compliance Officer
                    </p>
                  </div>

                  <div className="border-t border-primary/20 pt-6">
                    <p className="font-sans font-semibold text-sm text-foreground mb-2">
                      No et preocupis per l'agenda
                    </p>
                    <p className="font-sans text-[13px] text-muted-foreground">
                      Si les nostres disponibilitats no encaixen, et contactarem per trobar un horari que funcioni.
                    </p>
                  </div>
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
