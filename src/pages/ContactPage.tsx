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
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
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
    
    // Simulate API call (replace with actual edge function call when ready)
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
        <section className="bg-white py-16 md:py-24 px-6 md:px-12">
          <div className="mx-auto max-w-[700px] text-center">
            <h1 className="font-heading font-extrabold text-[40px] md:text-[56px] text-foreground mb-6">
              Parlem
            </h1>
            <p className="font-sans text-lg md:text-xl leading-relaxed text-muted-foreground">
              Tens preguntes? Vols veure una demo? Necessites ajuda?
              <br />
              Estem aquí per ajudar.
            </p>
          </div>
        </section>

        {/* SECTION 2: Contact Options */}
        <section className="bg-muted py-16 md:py-24 px-6 md:px-12">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {/* Card 1: Email */}
              <Card className="bg-white rounded-2xl p-10 text-center hover:shadow-lg transition-shadow">
                <Mail className="w-12 h-12 text-primary mx-auto mb-5" />
                <h3 className="font-heading font-bold text-2xl text-foreground mb-3">Email</h3>
                <p className="font-sans text-[15px] text-muted-foreground mb-5">
                  Per consultes generals o preguntes sobre el producte
                </p>
                <a 
                  href="mailto:hello@premsa.io" 
                  className="font-sans font-semibold text-lg text-primary hover:text-primary/80 underline transition-colors"
                >
                  hello@premsa.io
                </a>
                <p className="font-sans text-[13px] text-muted-foreground mt-2">
                  Resposta en &lt;24h
                </p>
              </Card>

              {/* Card 2: Book Demo */}
              <Card className="bg-white rounded-2xl p-10 text-center hover:shadow-lg transition-shadow border-2 border-primary/20">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-5" />
                <h3 className="font-heading font-bold text-2xl text-foreground mb-3">Agendar Demo</h3>
                <p className="font-sans text-[15px] text-muted-foreground mb-5">
                  Veure PREMSA.IO en acció amb les teves dades
                </p>
                <Button className="w-full" asChild>
                  <Link to="/book-demo">Book 30 min Demo →</Link>
                </Button>
                <p className="font-sans text-[13px] text-muted-foreground mt-3">
                  Disponibilitat immediata
                </p>
              </Card>

              {/* Card 3: Chat */}
              <Card className="bg-white rounded-2xl p-10 text-center hover:shadow-lg transition-shadow">
                <MessageCircle className="w-12 h-12 text-primary mx-auto mb-5" />
                <h3 className="font-heading font-bold text-2xl text-foreground mb-3">Chat amb Sales</h3>
                <p className="font-sans text-[15px] text-muted-foreground mb-5">
                  Preguntes ràpides? Xateja amb nosaltres
                </p>
                <Button variant="outline" className="w-full">
                  Iniciar Chat →
                </Button>
                <p className="font-sans text-[13px] text-muted-foreground mt-3">
                  Dilluns-Divendres 9-18h CET
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 3: Contact Form */}
        <section className="bg-white py-16 md:py-24 px-6 md:px-12">
          <div className="mx-auto max-w-[700px]">
            <h2 className="font-heading font-bold text-[28px] md:text-[36px] text-foreground text-center mb-12">
              O envia'ns un missatge
            </h2>

            <div className="bg-muted border border-border rounded-2xl p-8 md:p-12 shadow-sm">
              {isSubmitted ? (
                /* Success State */
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                  <h3 className="font-heading font-bold text-[28px] text-foreground mb-4">
                    Missatge enviat!
                  </h3>
                  <p className="font-sans text-base text-muted-foreground mb-8">
                    Gràcies per contactar-nos. Rebràs resposta en menys de 24 hores (normalment molt abans).
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/">← Tornar a Homepage</Link>
                  </Button>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Joan García"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-destructive text-sm">{errors.name}</p>
                      )}
                    </div>
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
                      {errors.email && (
                        <p className="text-destructive text-sm">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Company */}
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
                    {errors.company && (
                      <p className="text-destructive text-sm">{errors.company}</p>
                    )}
                  </div>

                  {/* Row 3: Role */}
                  <div className="space-y-2">
                    <Label htmlFor="role">Càrrec</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) => handleInputChange("role", value)}
                    >
                      <SelectTrigger>
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
                  <div className="space-y-2">
                    <Label htmlFor="reason">Motiu del contacte *</Label>
                    <Select
                      value={formData.reason}
                      onValueChange={(value) => handleInputChange("reason", value)}
                    >
                      <SelectTrigger className={errors.reason ? "border-destructive" : ""}>
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
                    {errors.reason && (
                      <p className="text-destructive text-sm">{errors.reason}</p>
                    )}
                  </div>

                  {/* Row 5: Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Missatge *</Label>
                    <Textarea
                      id="message"
                      placeholder="Explica'ns com et podem ajudar..."
                      rows={6}
                      maxLength={1000}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    <div className="flex justify-between">
                      {errors.message && (
                        <p className="text-destructive text-sm">{errors.message}</p>
                      )}
                      <p className="text-muted-foreground text-sm ml-auto">
                        {formData.message.length}/1000
                      </p>
                    </div>
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
                        </Link>{" "}
                        i els{" "}
                        <Link to="/legal/terms" className="text-primary underline hover:text-primary/80">
                          Terms & Conditions
                        </Link>
                      </label>
                      {errors.privacy && (
                        <p className="text-destructive text-sm">{errors.privacy}</p>
                      )}
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
                      "Enviar Missatge"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 4: Office Info */}
        <section className="bg-muted py-12 md:py-16 px-6 md:px-12">
          <div className="mx-auto max-w-[700px] text-center">
            <h3 className="font-heading font-bold text-2xl text-foreground mb-6">On som</h3>
            <div className="flex items-center justify-center gap-3">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="font-sans text-base text-muted-foreground">Barcelona, España</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
