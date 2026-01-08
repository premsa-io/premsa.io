import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const PricingPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-4 py-24">
        {/* Hero */}
        <div className="mx-auto max-w-[1280px] text-center">
          <h1 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
            Inverteix en intel·ligència, no en sorpreses
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-gray-600">
            El cost d'1 multa evitada paga 10 anys de subscripció
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-16 grid max-w-[1000px] gap-8 md:grid-cols-2">
          {/* FLEXIBLE Card */}
          <div className="rounded-2xl bg-white p-12 shadow-md">
            <h3 className="font-heading text-xl font-bold text-gray-900">FLEXIBLE</h3>
            <p className="mt-4 font-heading text-4xl font-bold text-gray-900">€6.500/mes</p>
            <p className="mt-2 text-sm text-gray-600">Cancel·la quan vulguis amb 30 dies</p>

            <ul className="mt-8 space-y-3">
              <FeatureItem text="Monitoring il·limitat BOE + 17 CCAA" />
              <FeatureItem text="5 àrees de compliance personalitzades" />
              <FeatureItem text="Alertes temps real (<24h)" />
              <FeatureItem text="Briefings setmanals executius" />
              <FeatureItem text="API access" />
              <FeatureItem text="Support <4h" />
            </ul>

            <Link
              to="/signup"
              className="mt-8 block w-full rounded-xl bg-primary-900 py-3 text-center font-semibold text-white transition-colors hover:bg-primary-800"
            >
              Començar Ara
            </Link>
          </div>

          {/* COMPROMÍS Card */}
          <div className="relative rounded-2xl border-2 border-primary-900 bg-white p-12 shadow-lg">
            <span className="absolute -top-3 right-6 rounded-full bg-accent-600 px-3 py-1 text-sm font-semibold text-white">
              ⭐ RECOMANAT
            </span>

            <h3 className="font-heading text-xl font-bold text-gray-900">COMPROMÍS</h3>
            <p className="mt-4 font-heading text-4xl font-bold text-gray-900">€5.500/mes</p>
            <p className="mt-1 text-sm text-gray-600">(€66.000/any total)</p>
            <span className="mt-2 inline-block rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-800">
              Estalvi €12.000/any
            </span>

            <ul className="mt-8 space-y-3">
              <FeatureItem text="Monitoring il·limitat BOE + 17 CCAA" />
              <FeatureItem text="5 àrees de compliance personalitzades" />
              <FeatureItem text="Alertes temps real (<24h)" />
              <FeatureItem text="Briefings setmanals executius" />
              <FeatureItem text="API access" />
              <FeatureItem text="Support <4h" />
              <FeatureItem text="Dedicated Account Manager" />
              <FeatureItem text="Exit clause mes 3" />
              <FeatureItem text="Priority onboarding" />
            </ul>

            <Link
              to="/signup"
              className="mt-8 block w-full rounded-xl bg-primary-900 py-3 text-center font-semibold text-white transition-colors hover:bg-primary-800"
            >
              Parlar amb Sales
            </Link>
          </div>
        </div>

        {/* Pilot Callout */}
        <div className="mx-auto mt-16 max-w-[900px] rounded-xl bg-primary-50 p-8 text-center">
          <p className="font-heading text-lg font-bold text-primary-900">
            💡 PILOT PROGRAM (Primers 10 clients)
          </p>
          <p className="mt-2 text-xl font-semibold text-gray-900">
            €2.750/mes × 6 mesos = €16.500 total
          </p>
          <p className="mt-2 text-gray-600">
            50% discount | Exit clause mes 3 | Conversion a preu standard després
          </p>
          <button className="mt-6 rounded-xl border-2 border-primary-900 px-6 py-3 font-semibold text-primary-900 transition-colors hover:bg-primary-100">
            Sol·licitar Pilot
          </button>
        </div>

        {/* FAQ Section */}
        <div className="mx-auto mt-24 max-w-[800px]">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold text-gray-900">
            Preguntes freqüents
          </h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-gray-200">
              <AccordionTrigger className="py-4 text-left font-semibold hover:no-underline">
                Per què pagar anual si puc fer monthly?
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-gray-600">
                El compromís anual ens permet oferir millor servei i preu. El pla Flexible existeix per qui necessita flexibilitat total.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-gray-200">
              <AccordionTrigger className="py-4 text-left font-semibold hover:no-underline">
                €66K upfront és massa per nosaltres
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-gray-600">
                Oferim facturació mensual (€5.500/mes) sense pagament anticipat. El Pilot Program (€16.500 total) és ideal per validar valor.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-gray-200">
              <AccordionTrigger className="py-4 text-left font-semibold hover:no-underline">
                Ja tenim un equip legal fort
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-gray-600">
                PREMSA.IO no substitueix el teu equip, l'amplifica. Estalvia 15h/setmana en monitoring perquè es dediquin a tasques d'alt valor.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-gray-200">
              <AccordionTrigger className="py-4 text-left font-semibold hover:no-underline">
                Com sabem que la IA és precisa?
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-gray-600">
                Legal Bedrock connecta cada interpretació amb la normativa font. Tot és verificable i traçable.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Final CTA */}
        <div className="mx-auto mt-24 max-w-[800px] pb-24 text-center">
          <p className="font-heading text-2xl font-bold text-gray-900">
            Encara tens dubtes? Parlem.
          </p>
          <button className="mt-6 rounded-xl bg-primary-900 px-8 py-3 font-semibold text-white transition-colors hover:bg-primary-800">
            Reservar Trucada
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-center gap-2 text-gray-700">
    <Check className="h-5 w-5 flex-shrink-0 text-primary-900" />
    <span>{text}</span>
  </li>
);

export default PricingPage;
