import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Check, Scale, Building2, Zap, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LandingPage = () => {
  const scrollToDemo = () => {
    document.getElementById("demo-selector")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* ===== SECTION 1: HERO ===== */}
        <section className="w-full bg-background px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
            <h1 className="max-w-[720px] text-3xl font-bold leading-tight tracking-tight text-foreground md:text-[44px]">
              La intel·ligència regulatòria que et manté
              <br />
              <span className="text-primary">3 passos per davant</span>
            </h1>
            <p className="mt-4 max-w-[560px] text-base text-muted-foreground md:text-lg">
              Detectem, interpretem i contextualitzem els canvis normatius abans que afectin el teu negoci. Perquè les sorpreses del BOE no haurien de ser sorpreses.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="sm"
                onClick={scrollToDemo}
                className="rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Veure Com Funciona
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-md border-primary px-5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/book-demo">Parlar amb Sales</Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-10">
              <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Trusted by:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {["Client 1", "Client 2", "Client 3", "Client 4"].map((client) => (
                  <div
                    key={client}
                    className="text-sm font-semibold text-muted-foreground/50"
                  >
                    {client}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Product Screenshot */}
        <section className="w-full bg-gradient-to-b from-background to-muted/30 px-4 py-12 md:px-8">
          <div className="mx-auto max-w-[1000px]">
            <div className="overflow-hidden rounded-xl border border-border bg-muted/50 shadow-lg">
              <div className="aspect-[16/9] w-full bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Dashboard Screenshot Placeholder</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 2: PROBLEM ===== */}
        <section className="w-full bg-muted/40 px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[960px]">
            <h2 className="mx-auto mb-10 max-w-[600px] text-center text-xl font-semibold text-foreground md:text-2xl">
              El problema que ningú veu fins que és massa tard
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              <ProblemCard
                icon="📊"
                title="150+ documents normatius"
                body="Publicats cada dia a Espanya entre BOE i 17 boletins autonòmics."
              />
              <ProblemCard
                icon="⏰"
                title="El teu equip legal llegeix ~5/dia"
                body="Mentre els altres 145 documents queden sense revisar."
              />
              <ProblemCard
                icon="❓"
                title="Els altres 145? Ruleta russa"
                body="Un d'aquests documents podria descarrilar el teu Q3 amb una multa de 7 xifres."
              />
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Hi ha una manera millor ↓
            </p>
          </div>
        </section>

        {/* ===== SECTION 3: SOLUTION (3 PILLARS) ===== */}
        <section className="w-full bg-background px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[960px]">
            <h2 className="mb-12 text-center text-xl font-semibold text-foreground md:text-2xl">
              Com funciona PREMSA.IO
            </h2>

            {/* Pillar 1 */}
            <div className="mb-14 grid items-center gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <Badge variant="outline" className="mb-3 border-primary/30 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Detecció Primerenca
                </Badge>
                <h3 className="mb-2 text-lg font-semibold text-foreground md:text-xl">
                  No esperis que el BOE et sorprengui
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Monitoring 24/7 de BOE + 17 boletins autonòmics amb alertes en menys de 24h des de publicació oficial.
                </p>
                <ul className="mb-4 space-y-1.5">
                  <FeatureItem text="Cobertura completa: BOE + 17 CCAA" />
                  <FeatureItem text="Alertes temps real (<24h publicació)" />
                  <FeatureItem text="Tracking pre-publicació (tràmits parlamentaris)" />
                </ul>
                <Link
                  to="/product#detection"
                  className="text-sm font-medium text-primary underline hover:text-primary/80 hover:no-underline"
                >
                  Learn more →
                </Link>
              </div>
              <div className="lg:col-span-2">
                <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted/50">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-muted">
                    <span className="text-xs text-muted-foreground">Dashboard Alerts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="mb-14 grid items-center gap-8 lg:grid-cols-5">
              <div className="order-2 lg:order-1 lg:col-span-2">
                <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted/50">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500/5 to-muted">
                    <span className="text-xs text-muted-foreground">Legal Bedrock Analysis</span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 lg:col-span-3">
                <Badge variant="outline" className="mb-3 border-cyan-500/30 bg-cyan-500/5 px-2.5 py-0.5 text-xs font-medium text-cyan-700">
                  Interpretació Contextual
                </Badge>
                <h3 className="mb-2 text-lg font-semibold text-foreground md:text-xl">
                  Més enllà del text legal: entén l'impacte real
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  IA que explica conseqüències operatives concretes. Legal Bedrock connecta cada normativa amb el context legal existent.
                </p>
                <ul className="mb-4 space-y-1.5">
                  <FeatureItem text="Anàlisi IA amb Legal Bedrock™" />
                  <FeatureItem text="Connexió amb normativa existent" />
                  <FeatureItem text="Detecció contradiccions i llacunes" />
                </ul>
                <Link
                  to="/product#interpretation"
                  className="text-sm font-medium text-primary underline hover:text-primary/80 hover:no-underline"
                >
                  Learn more →
                </Link>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="grid items-center gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <Badge variant="outline" className="mb-3 border-amber-500/30 bg-amber-500/5 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                  Memòria Institucional
                </Badge>
                <h3 className="mb-2 text-lg font-semibold text-foreground md:text-xl">
                  La plataforma que aprèn què importa al teu negoci
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Aprèn de les teves reaccions, prioritats i àrees de compliance. Filtra automàticament el soroll.
                </p>
                <ul className="mb-4 space-y-1.5">
                  <FeatureItem text="Machine learning de prioritats" />
                  <FeatureItem text="Filtering automàtic del soroll" />
                  <FeatureItem text="Trajectory tracking EU → ESP → CCAA" />
                </ul>
                <Link
                  to="/product#memory"
                  className="text-sm font-medium text-primary underline hover:text-primary/80 hover:no-underline"
                >
                  Learn more →
                </Link>
              </div>
              <div className="lg:col-span-2">
                <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted/50">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-500/5 to-muted">
                    <span className="text-xs text-muted-foreground">Personalized Dashboard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 4: DEMO SELECTOR ===== */}
        <section id="demo-selector" className="w-full bg-foreground px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[960px]">
            <h2 className="mb-8 text-center text-xl font-semibold text-background md:text-2xl">
              🎮 Descobreix com funciona pel teu sector
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <DemoCard
                icon={<Scale className="h-8 w-8" />}
                title="LEGAL"
                subtitle="Bufets & Consultories"
                href="/demo/legal"
              />
              <DemoCard
                icon={<Building2 className="h-8 w-8" />}
                title="BANCA"
                subtitle="Entitats financeres"
                href="/demo/banking"
              />
              <DemoCard
                icon={<Zap className="h-8 w-8" />}
                title="ENERGIA"
                subtitle="Generació i distribució"
                href="/demo/energy"
              />
              <DemoCard
                icon={<Radio className="h-8 w-8" />}
                title="TELECOMS"
                subtitle="Operadors i ISPs"
                href="/demo/telecoms"
              />
            </div>
            <p className="mt-6 text-center">
              <Link
                to="/contact"
                className="text-sm text-background/70 underline hover:text-background"
              >
                No veus el teu sector? Contacta'ns →
              </Link>
            </p>
          </div>
        </section>

        {/* ===== SECTION 5: METRICS ===== */}
        <section className="w-full bg-background px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[960px]">
            <h2 className="mb-10 text-center text-xl font-semibold text-foreground md:text-2xl">
              Els números que importen
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard number="<24h" label="Alertes mitjanes des de publicació BOE" />
              <MetricCard number="100%" label="Cobertura BOE + 17 CCAA" />
              <MetricCard number="15h/set" label="Temps estalviat per advocat" />
              <MetricCard number="10:1" label="ROI típic" />
            </div>
          </div>
        </section>

        {/* ===== SECTION 6: FINAL CTA ===== */}
        <section className="w-full bg-muted/40 px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto flex max-w-[600px] flex-col items-center text-center">
            <h2 className="text-xl font-semibold text-foreground md:text-2xl">
              Prou sorpreses del BOE. Comença a anticipar.
            </h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="sm"
                className="rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Link to="/book-demo">Veure Demo Personalitzada</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-md border-primary px-5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/contact?type=analysis">Rebre Anàlisi Gratuït</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Pilot de 6 mesos disponible per primers 10 clients
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

/* ===== HELPER COMPONENTS ===== */

const ProblemCard = ({ icon, title, body }: { icon: string; title: string; body: string }) => (
  <Card className="rounded-lg border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
    <span className="block text-2xl">{icon}</span>
    <h3 className="mt-3 text-base font-semibold text-foreground">{title}</h3>
    <p className="mt-2 text-sm text-muted-foreground">{body}</p>
  </Card>
);

const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2">
    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
    <span className="text-sm text-muted-foreground">{text}</span>
  </li>
);

const MetricCard = ({ number, label }: { number: string; label: string }) => (
  <div className="text-center">
    <span className="text-3xl font-bold text-primary md:text-4xl">
      {number}
    </span>
    <p className="mt-1 text-sm text-muted-foreground">{label}</p>
  </div>
);

const DemoCard = ({
  icon,
  title,
  subtitle,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
}) => (
  <Link to={href}>
    <Card className="group cursor-pointer rounded-lg border border-background/20 bg-background/10 p-5 text-center backdrop-blur-sm transition-all hover:bg-background/20">
      <div className="mb-2 flex justify-center text-background">{icon}</div>
      <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-background">
        {title}
      </h3>
      <p className="mb-3 text-xs text-background/70">{subtitle}</p>
      <Button
        variant="ghost"
        size="sm"
        className="border border-background px-3 py-1.5 text-xs font-medium text-background group-hover:bg-background group-hover:text-foreground"
      >
        Veure Demo →
      </Button>
    </Card>
  </Link>
);

export default LandingPage;
