import { useState } from "react";
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
import { supabase } from "@/lib/supabase";
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
    compromis: "Pla Compromís",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* SECTION 1: Hero */}
        <section className="bg-background py-10 md:py-12 px-4 md:px-8">
          <div className="mx-auto max-w-[560px] text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2 md:text-3xl">
              Agendar Demo de PREMSA.IO
            </h1>
            <p className="text-sm text-muted-foreground">
              Veurem com PREMSA.IO funciona específicament pel teu sector i cas d'ús
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
                        Les teves dades
                      </h2>
                      {planFromUrl && planLabels[planFromUrl] && (
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                          {planLabels[planFromUrl]}
                        </Badge>
                      )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs">Nom complet *</Label>
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
                        <Label htmlFor="email" className="text-xs">Email corporatiu *</Label>
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
                        <Label htmlFor="phone" className="text-xs">Telèfon *</Label>
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
                        <Label htmlFor="company" className="text-xs">Empresa *</Label>
                        <Input
                          id="company"
                          type="text"
                          placeholder="Nom de l'empresa"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className={`h-9 text-sm ${errors.company ? "border-destructive" : ""}`}
                        />
                        {errors.company && <p className="text-destructive text-xs">{errors.company}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs">Càrrec *</Label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) => handleInputChange("role", value)}
                        >
                          <SelectTrigger className={`h-9 text-sm ${errors.role ? "border-destructive" : ""}`}>
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
                        {errors.role && <p className="text-destructive text-xs">{errors.role}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs">Sector *</Label>
                        <Select
                          value={formData.sector}
                          onValueChange={(value) => handleInputChange("sector", value)}
                        >
                          <SelectTrigger className={`h-9 text-sm ${errors.sector ? "border-destructive" : ""}`}>
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
                        {errors.sector && <p className="text-destructive text-xs">{errors.sector}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs">Mida de l'empresa *</Label>
                        <Select
                          value={formData.companySize}
                          onValueChange={(value) => handleInputChange("companySize", value)}
                        >
                          <SelectTrigger className={`h-9 text-sm ${errors.companySize ? "border-destructive" : ""}`}>
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
                        {errors.companySize && <p className="text-destructive text-xs">{errors.companySize}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="message" className="text-xs">Què vols veure a la demo? (opcional)</Label>
                        <Textarea
                          id="message"
                          placeholder="Ex: Com detecteu canvis en normativa fiscal?"
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
                            Accepto la{" "}
                            <Link to="/legal/privacy" className="text-primary underline hover:text-primary/80">
                              Privacy Policy
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
                  <div className="text-center py-6">
                    <div className="bg-muted rounded-lg p-6 mb-4">
                      <div className="bg-card border border-border rounded-lg p-8 min-h-[300px] flex items-center justify-center">
                        <div className="text-center">
                          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            Dades rebudes!
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Aquí apareixerà el calendari per seleccionar horari.
                          </p>
                          <Button size="sm" asChild>
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
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                      Gràcies per l'interès!
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                      El nostre equip revisarà la teva sol·licitud i et contactarà en menys de 24 hores.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/">← Tornar a Home</Link>
                    </Button>
                  </div>
                )}
              </div>

              {/* RIGHT: What to expect */}
              <div className="space-y-5">
                <div className="bg-card rounded-lg p-5 border border-border">
                  <h3 className="text-base font-semibold text-foreground mb-4">
                    Què veuràs a la demo
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Dashboard en viu amb alertes reals",
                      "Com detectem canvis al BOE i CCAA",
                      "Anàlisi IA contextual pel teu sector",
                      "Integració amb les teves eines",
                      "Pricing i opcions de contracte",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-muted/50 rounded-lg p-5 border border-border">
                  <p className="text-xs text-muted-foreground mb-3">
                    "La demo ens va convèncer que PREMSA.IO era exactament el que necessitàvem."
                  </p>
                  <p className="text-xs font-medium text-foreground">
                    — Legal Director, Empresa Fortune 500
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    ⏱️ Durada: 30 minuts
                  </p>
                  <p className="text-xs text-muted-foreground">
                    📅 Disponibilitat: Dilluns-Divendres
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
