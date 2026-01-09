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
        <section className="w-full bg-white px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[1000px] text-center">
            <h1 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 md:text-6xl">
              Intel·ligència regulatòria que anticipa, no reacciona
            </h1>
            <p className="mx-auto mt-6 max-w-[800px] font-body text-lg leading-relaxed text-gray-700 md:text-xl">
              Més enllà del monitoring: PREMSA.IO entén, contextualitza i aprèn què importa al teu negoci. 24/7, sense descansos ni vacances.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-xl bg-primary-900 px-8 py-4 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-800 hover:shadow-lg"
              >
                <Link to="/demo">Veure Demo en Viu</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl border-2 border-primary-900 px-8 py-4 font-semibold text-primary-900 transition-all duration-200 hover:bg-primary-900 hover:text-white"
              >
                <Link to="/playground">Provar Playground</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ===== SECTION 2: HOW IT WORKS (VISUAL FLOW) ===== */}
        <section className="w-full bg-gray-50 px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="mb-20 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Del BOE al teu inbox en 3 passos
            </h2>

            <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
              {/* Step 1 */}
              <div className="flex flex-1 flex-col items-center text-center">
                <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-primary-50">
                  <Radar className="h-16 w-16 text-primary-600" />
                </div>
                <p className="mb-2 font-body text-xs font-bold uppercase tracking-widest text-primary-700">
                  STEP 1
                </p>
                <h3 className="mb-4 font-heading text-2xl font-bold text-gray-900">
                  Detecció Automàtica
                </h3>
                <p className="mx-auto max-w-[300px] font-body text-base leading-relaxed text-gray-700">
                  BOE publica RD 47/2025 sobre modificació IRPF. PREMSA.IO el detecta automàticament en les primeres 2 hores via API oficial.
                </p>
                <p className="mt-3 font-body text-sm font-medium text-gray-600">
                  ⚡ &lt;2h temps resposta mitjà
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden items-center md:flex">
                <ArrowRight className="h-8 w-8 text-primary-400" />
              </div>

              {/* Step 2 */}
              <div className="flex flex-1 flex-col items-center text-center">
                <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-cyan-50">
                  <Brain className="h-16 w-16 text-cyan-600" />
                </div>
                <p className="mb-2 font-body text-xs font-bold uppercase tracking-widest text-cyan-700">
                  STEP 2
                </p>
                <h3 className="mb-4 font-heading text-2xl font-bold text-gray-900">
                  Anàlisi Intel·ligent
                </h3>
                <p className="mx-auto max-w-[300px] font-body text-base leading-relaxed text-gray-700">
                  La IA processa el document aplicant Legal Bedrock (context amb lleis existents) i Competence Rules (jurisdicció). Genera un informe: "Això afecta les teves operacions a Catalunya - Fiscal".
                </p>
                <p className="mt-3 font-body text-sm font-medium text-gray-600">
                  🧠 3 models IA col·laboratius
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden items-center md:flex">
                <ArrowRight className="h-8 w-8 text-primary-400" />
              </div>

              {/* Step 3 */}
              <div className="flex flex-1 flex-col items-center text-center">
                <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-amber-50">
                  <Bell className="h-16 w-16 text-amber-600" />
                </div>
                <p className="mb-2 font-body text-xs font-bold uppercase tracking-widest text-amber-700">
                  STEP 3
                </p>
                <h3 className="mb-4 font-heading text-2xl font-bold text-gray-900">
                  Alerta Personalitzada
                </h3>
                <p className="mx-auto max-w-[300px] font-body text-base leading-relaxed text-gray-700">
                  Reps email/Slack alert amb resum executiu: "RD 47/2025 - CRÍTIC - Acció abans 1 Febrer". L'equip legal pot actuar amb 3 setmanes de marge.
                </p>
                <p className="mt-3 font-body text-sm font-medium text-gray-600">
                  📧 Zero soroll, només el que importa
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: FEATURES DEEP DIVE ===== */}
        <section className="w-full bg-white px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="mb-24 text-center font-heading text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Tres pilars d'intel·ligència
            </h2>

            {/* Pillar 1: Detection */}
            <div id="detection" className="mb-32 grid items-center gap-16 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <Badge variant="outline" className="mb-4 border-primary-200 bg-primary-50 px-4 py-1.5 font-semibold tracking-wide text-primary-900">
                  Detecció Primerenca
                </Badge>
                <h3 className="mb-4 font-heading text-2xl font-bold text-gray-900 md:text-3xl">
                  Cobertura completa, zero blind spots
                </h3>
                <p className="mb-8 font-body text-lg leading-relaxed text-gray-700">
                  Monitoring 24/7 de totes les fonts oficials espanyoles. No només BOE - també 17 boletins autonòmics, tràmits parlamentaris en curs, i anteproyectos abans que es publiquin.
                </p>
                <ul className="mb-6 space-y-3">
                  <FeatureItem text="BOE + 17 CCAA (DOGC, BOCM, BOJA...)" />
                  <FeatureItem text="Tracking tràmits parlamentaris pre-publicació" />
                  <FeatureItem text="Alertes en <24h des de publicació oficial" />
                  <FeatureItem text="API directa amb fonts oficials (zero scraping)" />
                  <FeatureItem text="Cobertura normativa UE que afecta Espanya" />
                </ul>
                <Link
                  to="/demo"
                  className="font-body text-base font-semibold text-primary-700 underline transition-colors duration-200 hover:text-primary-900 hover:no-underline"
                >
                  Veure demo de detecció →
                </Link>
              </div>
              <div className="lg:col-span-2">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-primary-50 to-gray-100 shadow-lg">
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-body text-sm text-gray-500">Dashboard Alerts Screenshot</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2: Interpretation */}
            <div id="interpretation" className="mb-32 grid items-center gap-16 lg:grid-cols-5">
              <div className="order-2 lg:order-1 lg:col-span-2">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-cyan-50 to-gray-100 shadow-lg">
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-body text-sm text-gray-500">Legal Bedrock Analysis</span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 lg:col-span-3">
                <Badge variant="outline" className="mb-4 border-cyan-200 bg-cyan-50 px-4 py-1.5 font-semibold tracking-wide text-cyan-900">
                  Interpretació Contextual
                </Badge>
                <h3 className="mb-4 font-heading text-2xl font-bold text-gray-900 md:text-3xl">
                  Legal Bedrock™: context que cap humà pot igualar
                </h3>
                <p className="mb-8 font-body text-lg leading-relaxed text-gray-700">
                  Cada nova normativa s'analitza contra el corpus legal existent. Detectem contradiccions, llacunes, i impactes encadenats que passarien desapercebuts.
                </p>
                <ul className="mb-6 space-y-3">
                  <FeatureItem text="Connexió automàtica amb +50.000 normatives existents" />
                  <FeatureItem text="Detecció de contradiccions i derogacions implícites" />
                  <FeatureItem text="Anàlisi de competències (estatal vs autonòmica)" />
                  <FeatureItem text="3 models IA col·laboratius (GPT + Claude + Gemini)" />
                  <FeatureItem text="Explicació en llenguatge business, no només jurídic" />
                </ul>
                <Link
                  to="/demo"
                  className="font-body text-base font-semibold text-primary-700 underline transition-colors duration-200 hover:text-primary-900 hover:no-underline"
                >
                  Veure demo d'anàlisi →
                </Link>
              </div>
            </div>

            {/* Pillar 3: Memory */}
            <div id="memory" className="grid items-center gap-16 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <Badge variant="outline" className="mb-4 border-amber-200 bg-amber-50 px-4 py-1.5 font-semibold tracking-wide text-amber-900">
                  Memòria Institucional
                </Badge>
                <h3 className="mb-4 font-heading text-2xl font-bold text-gray-900 md:text-3xl">
                  Aprèn què importa al teu negoci
                </h3>
                <p className="mb-8 font-body text-lg leading-relaxed text-gray-700">
                  PREMSA.IO no és una eina genèrica - aprèn de les teves reaccions i prioritats. Amb el temps, filtra automàticament el soroll i només et mostra el que realment necessites.
                </p>
                <ul className="mb-6 space-y-3">
                  <FeatureItem text="Machine learning de les teves àrees de compliance" />
                  <FeatureItem text="Filtering progressiu del soroll irrelevant" />
                  <FeatureItem text="Trajectory tracking: normativa EU → BOE → CCAA" />
                  <FeatureItem text="Predicció d'impacte basada en històric" />
                  <FeatureItem text="Alertes cada cop més precises amb l'ús" />
                </ul>
                <Link
                  to="/demo"
                  className="font-body text-base font-semibold text-primary-700 underline transition-colors duration-200 hover:text-primary-900 hover:no-underline"
                >
                  Veure demo de personalització →
                </Link>
              </div>
              <div className="lg:col-span-2">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-amber-50 to-gray-100 shadow-lg">
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-body text-sm text-gray-500">Personalized Dashboard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 4: INTEGRATIONS ===== */}
        <section id="integrations" className="w-full bg-white px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="mb-12 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Integra amb les teves eines
            </h2>

            <div className="mx-auto mb-12 grid max-w-[900px] grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6">
              {integrations.map((integration) => (
                <Card
                  key={integration}
                  className="flex aspect-square items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all duration-200 hover:scale-105 hover:border-primary-300 hover:shadow-md"
                >
                  <span className="font-body text-sm font-medium text-gray-600">
                    {integration}
                  </span>
                </Card>
              ))}
            </div>

            <Card className="mx-auto max-w-[700px] rounded-xl border border-primary-200 bg-primary-50 p-8 text-center">
              <h3 className="mb-3 font-heading text-lg font-semibold text-primary-900">
                API REST completa per integració custom
              </h3>
              <p className="mb-5 font-body text-base text-gray-700">
                Endpoints per accedir a alertes, documents, reports i configuració. Autenticació OAuth 2.0. Rate limits generosos.
              </p>
              <Button
                variant="outline"
                className="border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white"
              >
                Veure Documentació API →
              </Button>
            </Card>
          </div>
        </section>

        {/* ===== SECTION 5: SECURITY & COMPLIANCE ===== */}
        <section id="security" className="w-full bg-gray-900 px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="mb-16 text-center font-heading text-3xl font-bold text-white md:text-4xl">
              Seguretat i compliance al centre
            </h2>

            <div className="mx-auto mb-16 grid max-w-[1000px] grid-cols-2 gap-6 md:grid-cols-4">
              <SecurityBadge icon={<Lock className="h-10 w-10" />} title="GDPR Compliant" subtitle="100% compliant amb RGPD" />
              <SecurityBadge icon={<Shield className="h-10 w-10" />} title="SOC 2 Type II" subtitle="Auditoria anual certificada" />
              <SecurityBadge icon={<FileCheck className="h-10 w-10" />} title="ISO 27001" subtitle="Estàndard internacional" />
              <SecurityBadge icon={<FileText className="h-10 w-10" />} title="DPA Available" subtitle="Per clients enterprise" />
            </div>

            <div className="mx-auto max-w-[700px] space-y-4">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                  <span className="font-body text-base text-white/90">{feature}</span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center">
              <a
                href="#"
                className="font-body text-base font-medium text-white underline transition-colors hover:text-white/80"
              >
                Veure Security Whitepaper →
              </a>
            </p>
          </div>
        </section>

        {/* ===== SECTION 6: FINAL CTA PRODUCT ===== */}
        <section className="w-full bg-primary-50 px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-[800px] text-center">
            <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Preparat per veure PREMSA.IO en acció?
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-xl bg-primary-900 px-8 py-4 font-semibold text-white hover:bg-primary-800"
              >
                <Link to="/book-demo">Agendar Demo</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl border-2 border-primary-900 px-8 py-4 font-semibold text-primary-900 hover:bg-primary-900 hover:text-white"
              >
                <Link to="/playground">Provar Playground</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="px-8 py-4 font-semibold text-primary-700 hover:text-primary-900"
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
  <li className="flex items-start gap-3">
    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
    <span className="font-body text-base text-gray-700">{text}</span>
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
  <div className="rounded-xl border border-white/20 bg-white/10 p-6 text-center">
    <div className="mb-3 flex justify-center text-white">{icon}</div>
    <h4 className="font-heading text-base font-bold text-white">{title}</h4>
    <p className="mt-1 font-body text-xs text-white/70">{subtitle}</p>
  </div>
);

/* ===== DATA ===== */

const integrations = [
  "Slack",
  "Email",
  "REST API",
  "Zapier",
  "Webhooks",
  "Excel",
  "JIRA",
  "Asana",
  "Notion",
  "Teams",
  "Drive",
  "More...",
];

const securityFeatures = [
  "Dades encriptades at-rest (AES-256) i in-transit (TLS 1.3)",
  "Hosting dins la UE (AWS Frankfurt) - dades mai surten d'Europa",
  "Backups diaris automàtics amb retenció 30 dies",
  "Access controls granulars amb autenticació 2FA obligatòria",
  "Audit logs complets de totes les accions (immutables)",
  "Pentesting anual per tercers certificats",
  "DPA (Data Processing Agreement) disponible per clients enterprise",
];

export default ProductPage;
