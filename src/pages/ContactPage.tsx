import { useState } from "react";
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
import { Mail, Calendar, MessageCircle, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, "El nom és obligatori").max(100, "Màxim 100 caràcters"),
  email: z.string().trim().email("Email no vàlid").max(255, "Màxim 255 caràcters"),
  company: z.string().trim().min(1, "L'empresa és obligatòria").max(100, "Màxim 100 caràcters"),
  role: z.string().optional(),
  reason: z.string().min(1, "Selecciona un motiu"),
  message: z.string().trim().min(1, "El missatge és obligatori").max(1000, "Màxim 1000 caràcters"),
  privacy: z.boolean().refine((val) => val === true, "Has d'acceptar la política de privacitat"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    role: "",
    reason: "",
    message: "",
    privacy: false,
  });

  const handleInputChange = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData;
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
        title: "Missatge enviat!",
        description: "Et respondrem en menys de 24 hores.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Hi ha hagut un error. Torna-ho a provar.",
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
              Parlem
            </h1>
            <p className="text-base text-muted-foreground">
              Tens preguntes? Vols veure una demo? Necessites ajuda?
              <br />
              Estem aquí per ajudar.
            </p>
          </div>
        </section>

        {/* SECTION 2: Contact Options */}
        <section className="bg-muted/40 py-10 md:py-14 px-4 md:px-8">
          <div className="mx-auto max-w-[880px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
              {/* Card 1: Email */}
              <Card className="bg-card rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="text-base font-semibold text-foreground mb-2">Email</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Per consultes generals o preguntes sobre el producte
                </p>
                <a 
                  href="mailto:hello@premsa.io" 
                  className="text-sm font-medium text-primary hover:text-primary/80 underline"
                >
                  hello@premsa.io
                </a>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Resposta en &lt;24h
                </p>
              </Card>

              {/* Card 2: Book Demo */}
              <Card className="bg-card rounded-lg p-6 text-center hover:shadow-md transition-shadow border-2 border-primary/20">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="text-base font-semibold text-foreground mb-2">Agendar Demo</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Veure PREMSA.IO en acció amb les teves dades
                </p>
                <Button size="sm" className="w-full text-sm" asChild>
                  <Link to="/book-demo">Book 30 min Demo →</Link>
                </Button>
                <p className="text-[11px] text-muted-foreground mt-2">
                  Disponibilitat immediata
                </p>
              </Card>

              {/* Card 3: Chat */}
              <Card className="bg-card rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="text-base font-semibold text-foreground mb-2">Chat amb Sales</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Preguntes ràpides? Xateja amb nosaltres
                </p>
                <Button variant="outline" size="sm" className="w-full text-sm">
                  Iniciar Chat →
                </Button>
                <p className="text-[11px] text-muted-foreground mt-2">
                  Dilluns-Divendres 9-18h CET
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 3: Contact Form */}
        <section className="bg-background py-10 md:py-14 px-4 md:px-8">
          <div className="mx-auto max-w-[520px]">
            <h2 className="text-xl font-semibold text-foreground text-center mb-6 md:text-2xl">
              O envia'ns un missatge
            </h2>

            <div className="bg-muted/30 border border-border rounded-lg p-6 shadow-sm">
              {isSubmitted ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Missatge enviat!
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Gràcies per contactar-nos. Rebràs resposta en menys de 24 hores.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/">← Tornar a Homepage</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs">Nom complet *</Label>
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
                  </div>

                  {/* Row 2: Company */}
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

                  {/* Row 3: Role */}
                  <div className="space-y-1.5">
                    <Label htmlFor="role" className="text-xs">Càrrec</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) => handleInputChange("role", value)}
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Selecciona el teu càrrec" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compliance-officer">Compliance Officer</SelectItem>
                        <SelectItem value="legal-director">Legal Director</SelectItem>
                        <SelectItem value="cfo">CFO</SelectItem>
                        <SelectItem value="ceo">CEO</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="other">Altre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Row 4: Reason */}
                  <div className="space-y-1.5">
                    <Label htmlFor="reason" className="text-xs">Motiu del contacte *</Label>
                    <Select
                      value={formData.reason}
                      onValueChange={(value) => handleInputChange("reason", value)}
                    >
                      <SelectTrigger className={`h-9 text-sm ${errors.reason ? "border-destructive" : ""}`}>
                        <SelectValue placeholder="Selecciona el motiu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="demo">Vull veure una demo</SelectItem>
                        <SelectItem value="product">Tinc preguntes sobre el producte</SelectItem>
                        <SelectItem value="pricing">Vull informació de pricing</SelectItem>
                        <SelectItem value="support">Necessito suport tècnic</SelectItem>
                        <SelectItem value="partnership">Interessat en partnership</SelectItem>
                        <SelectItem value="other">Altre</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.reason && <p className="text-destructive text-xs">{errors.reason}</p>}
                  </div>

                  {/* Row 5: Message */}
                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs">Missatge *</Label>
                    <Textarea
                      id="message"
                      placeholder="Explica'ns com et podem ajudar..."
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
                        Accepto la{" "}
                        <Link to="/legal/privacy" className="text-primary underline hover:text-primary/80">
                          Privacy Policy
                        </Link>{" "}
                        i els{" "}
                        <Link to="/legal/terms" className="text-primary underline hover:text-primary/80">
                          Terms & Conditions
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
                        Enviant...
                      </>
                    ) : (
                      "Enviar Missatge"
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
            <h3 className="text-base font-semibold text-foreground mb-3">On som</h3>
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
