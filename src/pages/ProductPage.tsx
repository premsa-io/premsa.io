import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Radar,
  Brain,
  Bell,
  ArrowRight,
  Shield,
  Lock,
  FileCheck,
  FileText,
} from "lucide-react";

const ProductPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* ===== SECTION 1: HERO PRODUCT ===== */}
        <section className="w-full bg-background px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[720px] text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-[42px]">
              Intel·ligència regulatòria que anticipa, no reacciona
            </h1>
            <p className="mx-auto mt-3 max-w-[580px] text-base text-muted-foreground">
              Més enllà del monitoring: PREMSA.IO entén, contextualitza i aprèn què importa al teu negoci. 24/7, sense descansos ni vacances.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="sm"
                className="rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Link to="/demo">Veure Demo en Viu</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-md border-primary px-5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/playground">Provar Playground</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ===== SECTION 2: HOW IT WORKS ===== */}
        <section className="w-full bg-muted/40 px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-[880px]">
            <h2 className="mb-10 text-center text-xl font-semibold text-foreground md:text-2xl">
              Del BOE al teu inbox en 3 passos
            </h2>

            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
              {/* Step 1 */}
              <div className="flex flex-1 flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Radar className="h-8 w-8 text-primary" />
                </div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  STEP 1
                </p>
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  Detecció Automàtica
                </h3>
                <p className="mx-auto max-w-[220px] text-sm text-muted-foreground">
                  BOE publica RD 47/2025. PREMSA.IO el detecta en les primeres 2 hores.
                </p>
                <p className="mt-2 text-xs font-medium text-muted-foreground">
                  ⚡ &lt;2h temps resposta
                </p>
              </div>

              <div className="hidden items-center md:flex">
                <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
              </div>

              {/* Step 2 */}
              <div className="flex flex-1 flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10">
                  <Brain className="h-8 w-8 text-cyan-600" />
                </div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-600">
                  STEP 2
                </p>
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  Anàlisi Intel·ligent
                </h3>
                <p className="mx-auto max-w-[220px] text-sm text-muted-foreground">
                  La IA processa el document amb Legal Bedrock i genera un informe contextual.
                </p>
                <p className="mt-2 text-xs font-medium text-muted-foreground">
                  🧠 3 models IA col·laboratius
                </p>
              </div>

              <div className="hidden items-center md:flex">
                <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
              </div>

              {/* Step 3 */}
              <div className="flex flex-1 flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10">
                  <Bell className="h-8 w-8 text-amber-600" />
                </div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-amber-600">
                  STEP 3
                </p>
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  Alerta Personalitzada
                </h3>
                <p className="mx-auto max-w-[220px] text-sm text-muted-foreground">
                  Reps email/Slack alert amb resum executiu i acció recomanada.
                </p>
                <p className="mt-2 text-xs font-medium text-muted-foreground">
                  📧 Zero soroll
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: FEATURES DEEP DIVE ===== */}
        <section className="w-full bg-background px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-[880px]">
            <h2 className="mb-10 text-center text-xl font-semibold text-foreground md:text-2xl">
              Tres pilars d'intel·ligència
            </h2>

            {/* Pillar 1: Detection */}
            <div id="detection" className="mb-12 grid items-center gap-6 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <Badge variant="outline" className="mb-2 border-primary/30 bg-primary/5 px-2 py-0.5 text-xs font-medium text-primary">
                  Detecció Primerenca
                </Badge>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Cobertura completa, zero blind spots
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  Monitoring 24/7 de totes les fonts oficials espanyoles. No només BOE - també 17 boletins autonòmics.
                </p>
                <ul className="mb-3 space-y-1.5">
                  <FeatureItem text="BOE + 17 CCAA (DOGC, BOCM, BOJA...)" />
                  <FeatureItem text="Tracking tràmits parlamentaris" />
                  <FeatureItem text="Alertes en <24h des de publicació" />
                  <FeatureItem text="API directa amb fonts oficials" />
                </ul>
                <Link
                  to="/demo"
                  className="text-sm font-medium text-primary underline hover:text-primary/80 hover:no-underline"
                >
                  Veure demo de detecció →
                </Link>
              </div>
              <div className="lg:col-span-2">
                <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-gradient-to-br from-primary/5 to-muted">
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-xs text-muted-foreground">Dashboard Alerts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2: Interpretation */}
            <div id="interpretation" className="mb-12 grid items-center gap-6 lg:grid-cols-5">
              <div className="order-2 lg:order-1 lg:col-span-2">
                <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-gradient-to-br from-cyan-500/5 to-muted">
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-xs text-muted-foreground">Legal Bedrock</span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 lg:col-span-3">
                <Badge variant="outline" className="mb-2 border-cyan-500/30 bg-cyan-500/5 px-2 py-0.5 text-xs font-medium text-cyan-700">
                  Interpretació Contextual
                </Badge>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Legal Bedrock™: context que cap humà pot igualar
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  Cada nova normativa s'analitza contra el corpus legal existent. Detectem contradiccions i impactes encadenats.
                </p>
                <ul className="mb-3 space-y-1.5">
                  <FeatureItem text="Connexió amb +50.000 normatives" />
                  <FeatureItem text="Detecció de contradiccions" />
                  <FeatureItem text="3 models IA col·laboratius" />
                  <FeatureItem text="Explicació en llenguatge business" />
                </ul>
                <Link
                  to="/demo"
                  className="text-sm font-medium text-primary underline hover:text-primary/80 hover:no-underline"
                >
                  Veure demo d'anàlisi →
                </Link>
              </div>
            </div>

            {/* Pillar 3: Memory */}
            <div id="memory" className="grid items-center gap-6 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <Badge variant="outline" className="mb-2 border-amber-500/30 bg-amber-500/5 px-2 py-0.5 text-xs font-medium text-amber-700">
                  Memòria Institucional
                </Badge>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Aprèn què importa al teu negoci
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  PREMSA.IO aprèn de les teves reaccions i prioritats. Amb el temps, filtra automàticament el soroll.
                </p>
                <ul className="mb-3 space-y-1.5">
                  <FeatureItem text="Machine learning de les teves àrees" />
                  <FeatureItem text="Filtering progressiu del soroll" />
                  <FeatureItem text="Trajectory tracking: EU → BOE → CCAA" />
                  <FeatureItem text="Alertes cada cop més precises" />
                </ul>
                <Link
                  to="/demo"
                  className="text-sm font-medium text-primary underline hover:text-primary/80 hover:no-underline"
                >
                  Veure demo de personalització →
                </Link>
              </div>
              <div className="lg:col-span-2">
                <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-gradient-to-br from-amber-500/5 to-muted">
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-xs text-muted-foreground">Personalized Dashboard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 4: INTEGRATIONS ===== */}
        <section id="integrations" className="w-full bg-background px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-[880px]">
            <h2 className="mb-6 text-center text-xl font-semibold text-foreground md:text-2xl">
              Integra amb les teves eines
            </h2>

            <div className="mx-auto mb-8 grid max-w-[640px] grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {integrations.map((integration) => (
                <Card
                  key={integration}
                  className="flex aspect-square items-center justify-center rounded-lg border border-border bg-muted/30 p-3 transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  <span className="text-xs font-medium text-muted-foreground">
                    {integration}
                  </span>
                </Card>
              ))}
            </div>

            <Card className="mx-auto max-w-[520px] rounded-lg border border-primary/20 bg-primary/5 p-5 text-center">
              <h3 className="mb-2 text-sm font-semibold text-primary">
                API REST completa per integració custom
              </h3>
              <p className="mb-3 text-xs text-muted-foreground">
                Endpoints per accedir a alertes, documents, reports i configuració. OAuth 2.0.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-xs text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Veure Documentació API →
              </Button>
            </Card>
          </div>
        </section>

        {/* ===== SECTION 5: SECURITY ===== */}
        <section id="security" className="w-full bg-foreground px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-[880px]">
            <h2 className="mb-8 text-center text-xl font-semibold text-background md:text-2xl">
              Seguretat i compliance al centre
            </h2>

            <div className="mx-auto mb-8 grid max-w-[720px] grid-cols-2 gap-4 md:grid-cols-4">
              <SecurityBadge icon={<Lock className="h-6 w-6" />} title="GDPR" subtitle="100% compliant" />
              <SecurityBadge icon={<Shield className="h-6 w-6" />} title="SOC 2" subtitle="Auditoria anual" />
              <SecurityBadge icon={<FileCheck className="h-6 w-6" />} title="ISO 27001" subtitle="Certificat" />
              <SecurityBadge icon={<FileText className="h-6 w-6" />} title="DPA" subtitle="Enterprise" />
            </div>

            <div className="mx-auto max-w-[520px] space-y-2">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" />
                  <span className="text-sm text-background/80">{feature}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center">
              <a
                href="#"
                className="text-sm font-medium text-background underline hover:text-background/80"
              >
                Veure Security Whitepaper →
              </a>
            </p>
          </div>
        </section>

        {/* ===== SECTION 6: FINAL CTA ===== */}
        <section className="w-full bg-primary/5 px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-[560px] text-center">
            <h2 className="text-xl font-semibold text-foreground md:text-2xl">
              Preparat per veure PREMSA.IO en acció?
            </h2>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="sm"
                className="rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Link to="/book-demo">Agendar Demo</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-md border-primary px-5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/playground">Provar Playground</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="px-5 text-sm font-medium text-primary hover:text-primary/80"
              >
                <Link to="/pricing">Veure Pricing →</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

/* ===== HELPER COMPONENTS ===== */

const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2">
    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
    <span className="text-sm text-muted-foreground">{text}</span>
  </li>
);

const SecurityBadge = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) => (
  <div className="flex flex-col items-center rounded-lg bg-background/10 p-4 text-center">
    <div className="mb-2 text-background">{icon}</div>
    <p className="text-sm font-semibold text-background">{title}</p>
    <p className="text-xs text-background/70">{subtitle}</p>
  </div>
);

/* ===== DATA ===== */

const integrations = [
  "Slack",
  "Teams",
  "Email",
  "Salesforce",
  "API REST",
  "Webhooks",
];

const securityFeatures = [
  "Encriptació AES-256 at-rest i TLS 1.3 in-transit",
  "2FA obligatori per tots els usuaris",
  "SOC 2 Type II auditat anualment",
  "Hosting a EU (Frankfurt) - zero data transfer fora UE",
  "Pentesting anual per tercers certificats",
];

export default ProductPage;
