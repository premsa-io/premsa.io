import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Check } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-white px-4 py-24">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center text-center">
            <h1 className="max-w-[900px] font-heading text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl">
              La intel·ligència regulatòria que et manté 3 passos per davant
            </h1>
            <p className="mt-6 max-w-[700px] font-body text-lg leading-relaxed text-gray-600">
              Detectem, interpretem i contextualitzem els canvis normatius abans que afectin el teu negoci. Perquè les sorpreses del BOE no haurien de ser sorpreses.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button className="rounded-xl bg-primary-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-800">
                Veure Com Funciona
              </button>
              <button className="rounded-xl border-2 border-primary-900 px-6 py-3 font-semibold text-primary-900 transition-colors hover:bg-primary-50">
                Parlar amb Sales
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              14 dies gratis · Sense targeta · Cancel·la quan vulguis
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="w-full bg-gray-50 px-4 py-24">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="mb-12 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              El problema que ningú veu fins que és massa tard
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <ProblemCard
                icon="📊"
                title="150+ documents normatius"
                body="Publicats cada dia a Espanya entre BOE i 17 boletins autonòmics"
              />
              <ProblemCard
                icon="⏰"
                title="El teu equip legal en llegeix ~5"
                body="Mentre els altres 145 són una ruleta russa per la teva empresa"
              />
              <ProblemCard
                icon="❓"
                title="Els altres 145?"
                body="Un d'ells podria descarrilar el teu Q3 o generar multes de 7 xifres"
              />
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="w-full bg-white px-4 py-24">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="mb-16 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Com funciona PREMSA.IO
            </h2>

            {/* Pillar 1 */}
            <div className="mb-16 grid items-center gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-900">
                  Detecció Primerenca
                </span>
                <h3 className="mt-4 font-heading text-2xl font-bold text-gray-900">
                  No esperis que el BOE et sorprengui
                </h3>
                <p className="mt-3 text-gray-600">
                  Monitoring 24/7 de BOE + 17 boletins autonòmics amb alertes en menys de 24h des de publicació oficial.
                </p>
                <ul className="mt-4 space-y-2">
                  <FeatureItem text="Cobertura completa: BOE + 17 CCAA" />
                  <FeatureItem text="Alertes temps real (<24h)" />
                  <FeatureItem text="Tracking pre-publicació" />
                </ul>
              </div>
              <div className="lg:col-span-2">
                <div className="aspect-video rounded-2xl bg-gray-200" />
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="mb-16 grid items-center gap-8 lg:grid-cols-5">
              <div className="order-2 lg:order-1 lg:col-span-2">
                <div className="aspect-video rounded-2xl bg-gray-200" />
              </div>
              <div className="order-1 lg:order-2 lg:col-span-3">
                <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-900">
                  Interpretació Contextual
                </span>
                <h3 className="mt-4 font-heading text-2xl font-bold text-gray-900">
                  Més enllà del text legal: entén l'impacte real
                </h3>
                <p className="mt-3 text-gray-600">
                  IA que explica conseqüències operatives concretes. Legal Bedrock connecta cada normativa amb context existent.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="grid items-center gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-900">
                  Memòria Institucional
                </span>
                <h3 className="mt-4 font-heading text-2xl font-bold text-gray-900">
                  La plataforma que aprèn què importa al teu negoci
                </h3>
                <p className="mt-3 text-gray-600">
                  Aprèn de les teves reaccions i prioritats, filtra el soroll automàticament.
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="aspect-video rounded-2xl bg-gray-200" />
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="w-full bg-primary-900 px-4 py-24">
          <div className="mx-auto grid max-w-[1280px] gap-8 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard number="<24h" label="Alertes mitjanes des de publicació BOE" />
            <MetricCard number="100%" label="Cobertura BOE + 17 CCAA" />
            <MetricCard number="15h/setmana" label="Temps estalviat per advocat" />
            <MetricCard number="10:1" label="ROI (1 multa evitada = 10 anys subscripció)" />
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full bg-white px-4 py-24">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center text-center">
            <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Prou sorpreses del BOE. Comença a anticipar.
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button className="rounded-xl bg-primary-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-800">
                Veure Demo Personalitzada
              </button>
              <button className="rounded-xl border-2 border-primary-900 px-6 py-3 font-semibold text-primary-900 transition-colors hover:bg-primary-50">
                Rebre Anàlisi Gratuït
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Pilot de 6 mesos disponible per primers 10 clients
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const ProblemCard = ({ icon, title, body }: { icon: string; title: string; body: string }) => (
  <div className="rounded-2xl bg-white p-8 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
    <span className="text-5xl">{icon}</span>
    <h3 className="mt-4 font-heading text-xl font-bold text-gray-900">{title}</h3>
    <p className="mt-2 text-gray-600">{body}</p>
  </div>
);

const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-center gap-2 text-gray-700">
    <Check className="h-5 w-5 text-primary-900" />
    <span>{text}</span>
  </li>
);

const MetricCard = ({ number, label }: { number: string; label: string }) => (
  <div className="text-center">
    <span className="font-heading text-4xl font-bold text-white md:text-5xl">{number}</span>
    <p className="mt-2 text-sm text-white/80">{label}</p>
  </div>
);

export default LandingPage;
