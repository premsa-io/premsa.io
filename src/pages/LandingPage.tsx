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
        <section className="w-full bg-white px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center text-center">
            <h1 className="max-w-[900px] font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 md:text-6xl">
              La intel·ligència regulatòria que et manté
              <br />
              <span className="text-primary-900">3 passos per davant</span>
            </h1>
            <p className="mt-6 max-w-[700px] font-body text-lg leading-relaxed text-gray-700 md:text-xl">
              Detectem, interpretem i contextualitzem els canvis normatius abans que afectin el teu negoci. Perquè les sorpreses del BOE no haurien de ser sorpreses.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={scrollToDemo}
                className="rounded-xl bg-primary-900 px-8 py-4 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-800 hover:shadow-lg"
              >
                Veure Com Funciona
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl border-2 border-primary-900 px-8 py-4 font-semibold text-primary-900 transition-all duration-200 hover:bg-primary-900 hover:text-white"
              >
                <Link to="/book-demo">Parlar amb Sales</Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-16">
              <p className="mb-6 font-body text-sm font-medium uppercase tracking-widest text-gray-500">
                Trusted by:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-12">
                {["Client 1", "Client 2", "Client 3", "Client 4"].map((client) => (
                  <div
                    key={client}
                    className="h-8 font-heading text-lg font-bold text-gray-400 opacity-60 grayscale transition-opacity duration-300 hover:opacity-100"
                  >
                    {client}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Product Screenshot */}
        <section className="w-full bg-gradient-to-b from-white to-gray-50 px-6 py-24 md:px-12">
          <div className="mx-auto max-w-[1400px]">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-2xl">
              <div className="aspect-[16/9] w-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="font-body text-lg text-gray-500">Dashboard Screenshot Placeholder</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 2: PROBLEM ===== */}
        <section className="w-full bg-gray-50 px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="mx-auto mb-20 max-w-[800px] text-center font-heading text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">
              El problema que ningú veu fins que és massa tard
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <ProblemCard
                icon="📊"
                title="150+ documents normatius"
                body="Publicats cada dia a Espanya entre BOE i 17 boletins autonòmics. Un volum impossible de processar manualment."
              />
              <ProblemCard
                icon="⏰"
                title="El teu equip legal llegeix ~5/dia"
                body="Mentre els altres 145 documents queden sense revisar. Això és una ruleta russa per la teva empresa."
              />
              <ProblemCard
                icon="❓"
                title="Els altres 145? Ruleta russa"
                body="Un d'aquests documents podria: descarrilar el teu Q3 amb una multa de 7 xifres, posar en risc una operació M&A, o generar non-compliance que afecti la reputació."
              />
            </div>
            <p className="mt-16 text-center font-body text-lg text-gray-600">
              Hi ha una manera millor ↓
            </p>
          </div>
        </section>

        {/* ===== SECTION 3: SOLUTION (3 PILLARS) ===== */}
        <section className="w-full bg-white px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="mb-24 text-center font-heading text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Com funciona PREMSA.IO
            </h2>

            {/* Pillar 1: Detection - Text Left, Image Right */}
            <div className="mb-32 grid items-center gap-16 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <Badge variant="outline" className="mb-4 border-primary-200 bg-primary-50 px-4 py-1.5 font-semibold tracking-wide text-primary-900">
                  Detecció Primerenca
                </Badge>
                <h3 className="mb-4 font-heading text-2xl font-bold text-gray-900 md:text-3xl">
                  No esperis que el BOE et sorprengui
                </h3>
                <p className="mb-8 font-body text-lg leading-relaxed text-gray-700">
                  Monitoring 24/7 de BOE + 17 boletins autonòmics amb alertes en menys de 24h des de publicació oficial. Tracking de tràmits parlamentaris i anteproyectos abans que es publiquin.
                </p>
                <ul className="mb-6 space-y-3">
                  <FeatureItem text="Cobertura completa: BOE + 17 CCAA" />
                  <FeatureItem text="Alertes temps real (<24h publicació)" />
                  <FeatureItem text="Tracking pre-publicació (tràmits parlamentaris)" />
                </ul>
                <Link
                  to="/product#detection"
                  className="font-body text-base font-semibold text-primary-700 underline transition-colors duration-200 hover:text-primary-900 hover:no-underline"
                >
                  Learn more →
                </Link>
              </div>
              <div className="lg:col-span-2">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-lg">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-50 to-gray-100">
                    <span className="font-body text-sm text-gray-500">Dashboard Alerts Screenshot</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2: Interpretation - Image Left, Text Right */}
            <div className="mb-32 grid items-center gap-16 lg:grid-cols-5">
              <div className="order-2 lg:order-1 lg:col-span-2">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-lg">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-50 to-gray-100">
                    <span className="font-body text-sm text-gray-500">Legal Bedrock Analysis Screenshot</span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 lg:col-span-3">
                <Badge variant="outline" className="mb-4 border-cyan-200 bg-cyan-50 px-4 py-1.5 font-semibold tracking-wide text-cyan-900">
                  Interpretació Contextual
                </Badge>
                <h3 className="mb-4 font-heading text-2xl font-bold text-gray-900 md:text-3xl">
                  Més enllà del text legal: entén l'impacte real
                </h3>
                <p className="mb-8 font-body text-lg leading-relaxed text-gray-700">
                  IA que explica conseqüències operatives concretes. Legal Bedrock connecta cada normativa amb el context legal existent. Identifiquem contradiccions, llacunes i impactes encadenats.
                </p>
                <ul className="mb-6 space-y-3">
                  <FeatureItem text="Anàlisi IA amb Legal Bedrock™" />
                  <FeatureItem text="Connexió amb normativa existent" />
                  <FeatureItem text="Detecció contradiccions i llacunes" />
                </ul>
                <Link
                  to="/product#interpretation"
                  className="font-body text-base font-semibold text-primary-700 underline transition-colors duration-200 hover:text-primary-900 hover:no-underline"
                >
                  Learn more →
                </Link>
              </div>
            </div>

            {/* Pillar 3: Memory - Text Left, Image Right */}
            <div className="grid items-center gap-16 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <Badge variant="outline" className="mb-4 border-amber-200 bg-amber-50 px-4 py-1.5 font-semibold tracking-wide text-amber-900">
                  Memòria Institucional
                </Badge>
                <h3 className="mb-4 font-heading text-2xl font-bold text-gray-900 md:text-3xl">
                  La plataforma que aprèn què importa al teu negoci
                </h3>
                <p className="mb-8 font-body text-lg leading-relaxed text-gray-700">
                  Aprèn de les teves reaccions, prioritats i àrees de compliance. Filtra automàticament el soroll: només rebràs alertes que realment importen. Trajectory tracking de normatives EU → BOE → CCAA.
                </p>
                <ul className="mb-6 space-y-3">
                  <FeatureItem text="Machine learning de prioritats" />
                  <FeatureItem text="Filtering automàtic del soroll" />
                  <FeatureItem text="Trajectory tracking EU → ESP → CCAA" />
                </ul>
                <Link
                  to="/product#memory"
                  className="font-body text-base font-semibold text-primary-700 underline transition-colors duration-200 hover:text-primary-900 hover:no-underline"
                >
                  Learn more →
                </Link>
              </div>
              <div className="lg:col-span-2">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-lg">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-50 to-gray-100">
                    <span className="font-body text-sm text-gray-500">Personalized Dashboard Screenshot</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 4: DEMO SELECTOR ===== */}
        <section id="demo-selector" className="w-full bg-primary-900 px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="mb-16 text-center font-heading text-3xl font-bold text-white md:text-4xl">
              🎮 Descobreix com funciona pel teu sector
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <DemoCard
                icon={<Scale className="h-12 w-12" />}
                title="LEGAL"
                subtitle="Bufets & Consultories"
                href="/demo/legal"
              />
              <DemoCard
                icon={<Building2 className="h-12 w-12" />}
                title="BANCA"
                subtitle="Entitats financeres"
                href="/demo/banking"
              />
              <DemoCard
                icon={<Zap className="h-12 w-12" />}
                title="ENERGIA"
                subtitle="Generació i distribució"
                href="/demo/energy"
              />
              <DemoCard
                icon={<Radio className="h-12 w-12" />}
                title="TELECOMS"
                subtitle="Operadors i ISPs"
                href="/demo/telecoms"
              />
            </div>
            <p className="mt-12 text-center">
              <Link
                to="/contact"
                className="font-body text-base text-white/80 underline transition-colors duration-200 hover:text-white"
              >
                No veus el teu sector? Contacta'ns →
              </Link>
            </p>
          </div>
        </section>

        {/* ===== SECTION 5: METRICS ===== */}
        <section className="w-full bg-white px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="mb-20 text-center font-heading text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Els números que importen
            </h2>
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard number="<24h" label="Alertes mitjanes des de publicació BOE" />
              <MetricCard number="100%" label="Cobertura BOE + 17 CCAA (zero blind spots)" />
              <MetricCard number="15h/setmana" label="Temps estalviat per advocat" />
              <MetricCard number="10:1" label="ROI típic (1 multa evitada = 10 anys subscripció)" />
            </div>
          </div>
        </section>

        {/* ===== SECTION 6: FINAL CTA ===== */}
        <section className="w-full bg-gray-50 px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto flex max-w-[800px] flex-col items-center text-center">
            <h2 className="font-heading text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              Prou sorpreses del BOE. Comença a anticipar.
            </h2>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-xl bg-primary-900 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-800 hover:shadow-lg"
              >
                <Link to="/book-demo">Veure Demo Personalitzada</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl border-2 border-primary-900 px-8 py-4 text-lg font-semibold text-primary-900 transition-all duration-200 hover:bg-primary-900 hover:text-white"
              >
                <Link to="/contact?type=analysis">Rebre Anàlisi Gratuït</Link>
              </Button>
            </div>
            <p className="mt-6 font-body text-base text-gray-600">
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
  <Card className="rounded-2xl border-0 bg-white p-10 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <span className="block text-5xl">{icon}</span>
    <h3 className="mt-6 font-heading text-2xl font-bold text-gray-900">{title}</h3>
    <p className="mt-4 font-body text-base leading-relaxed text-gray-700">{body}</p>
  </Card>
);

const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3">
    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
    <span className="font-body text-base text-gray-700">{text}</span>
  </li>
);

const MetricCard = ({ number, label }: { number: string; label: string }) => (
  <div className="text-center">
    <span className="font-heading text-5xl font-bold leading-none text-primary-900 md:text-6xl">
      {number}
    </span>
    <p className="mt-2 font-body text-base leading-relaxed text-gray-600">{label}</p>
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
    <Card className="group cursor-pointer rounded-2xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20">
      <div className="mb-4 flex justify-center text-white">{icon}</div>
      <h3 className="mb-2 font-heading text-xl font-bold uppercase tracking-widest text-white">
        {title}
      </h3>
      <p className="mb-6 font-body text-sm text-white/80">{subtitle}</p>
      <Button
        variant="ghost"
        className="border border-white px-4 py-2 font-semibold text-white transition-colors duration-200 group-hover:bg-white group-hover:text-primary-900"
      >
        Veure Demo →
      </Button>
    </Card>
  </Link>
);

export default LandingPage;
