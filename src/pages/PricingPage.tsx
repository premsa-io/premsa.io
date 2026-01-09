import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PricingPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* ===== SECTION 1: HERO PRICING ===== */}
        <section className="w-full bg-white px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[900px] text-center">
            <h1 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 md:text-6xl">
              Inverteix en intel·ligència, no en sorpreses
            </h1>
            <p className="mx-auto mt-6 max-w-[700px] font-body text-lg leading-relaxed text-gray-600 md:text-xl">
              El cost d'1 multa evitada paga 10 anys de subscripció
            </p>
          </div>
        </section>

        {/* ===== SECTION 2: PRICING CARDS ===== */}
        <section className="w-full bg-gray-50 px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[1100px]">
            {/* Cards Grid */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* FLEXIBLE Card */}
              <Card className="rounded-2xl border border-gray-200 bg-white p-12 shadow-md">
                <p className="font-heading text-sm font-bold uppercase tracking-widest text-gray-600">
                  FLEXIBLE
                </p>
                <div className="mt-4">
                  <span className="font-heading text-5xl font-bold text-gray-900">€6.500</span>
                  <span className="ml-1 font-body text-xl text-gray-600">/mes</span>
                </div>
                <p className="mt-2 font-body text-sm text-gray-600">
                  Cancel·la quan vulguis amb 30 dies
                </p>

                <div className="my-8 border-t border-gray-200" />

                <ul className="space-y-4">
                  <FeatureItem text="Monitoring il·limitat BOE + 17 CCAA" />
                  <FeatureItem text="5 àrees de compliance personalitzades" />
                  <FeatureItem text="Alertes temps real (<24h publicació)" />
                  <FeatureItem text="Briefings setmanals executius" />
                  <FeatureItem text="API access per integració" />
                  <FeatureItem text="Support resposta <4h (business hours)" />
                </ul>

                <Button
                  asChild
                  size="lg"
                  className="mt-8 w-full rounded-lg bg-primary-900 py-4 font-semibold text-white hover:bg-primary-800"
                >
                  <Link to="/book-demo?plan=flexible">Començar Ara</Link>
                </Button>
              </Card>

              {/* COMPROMÍS Card (Highlighted) */}
              <Card className="relative scale-100 rounded-2xl border-2 border-primary-900 bg-white p-12 shadow-lg md:scale-105">
                <Badge className="absolute -top-3 right-6 bg-amber-500 px-4 py-1.5 text-xs font-bold text-white shadow-md">
                  ⭐ RECOMANAT
                </Badge>

                <p className="font-heading text-sm font-bold uppercase tracking-widest text-primary-900">
                  COMPROMÍS
                </p>
                <div className="mt-4">
                  <span className="font-heading text-5xl font-bold text-gray-900">€5.500</span>
                  <span className="ml-1 font-body text-xl text-gray-600">/mes</span>
                </div>
                <p className="mt-1 font-body text-sm text-gray-600">(€66.000/any total)</p>
                <Badge className="mt-2 bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                  Estalvi €12.000/any vs Flexible
                </Badge>
                <p className="mt-2 font-body text-sm text-gray-600">
                  Contracte 12 mesos, pagament mensual
                </p>

                <div className="my-8 border-t border-gray-200" />

                <p className="mb-4 font-body text-sm font-medium text-primary-900">
                  Tot del Flexible +
                </p>
                <ul className="space-y-4">
                  <FeatureItem text="Monitoring il·limitat BOE + 17 CCAA" />
                  <FeatureItem text="5 àrees de compliance personalitzades" />
                  <FeatureItem text="Alertes temps real (<24h publicació)" />
                  <FeatureItem text="Briefings setmanals executius" />
                  <FeatureItem text="API access per integració" />
                  <FeatureItem text="Support resposta <4h (business hours)" />
                  <FeatureItem text="Dedicated Account Manager" highlighted />
                  <FeatureItem text="Exit clause mes 3" highlighted />
                  <FeatureItem text="Priority onboarding (2 setmanes)" highlighted />
                </ul>

                <Button
                  asChild
                  size="lg"
                  className="mt-8 w-full rounded-lg bg-primary-900 py-4 font-semibold text-white hover:bg-primary-800 hover:shadow-xl"
                >
                  <Link to="/book-demo?plan=compromis">Parlar amb Sales</Link>
                </Button>
              </Card>
            </div>

            {/* Pilot Program Callout */}
            <Card className="mx-auto mt-16 max-w-[900px] rounded-xl border border-primary-200 bg-primary-50 p-8 text-center">
              <span className="text-4xl">💡</span>
              <h3 className="mt-4 font-heading text-xl font-bold text-primary-900">
                PILOT PROGRAM (Primers 10 clients)
              </h3>
              <p className="mt-3 font-body text-lg font-medium text-gray-900">
                €2.750/mes × 6 mesos = €16.500 total
              </p>
              <p className="mt-2 font-body text-sm text-gray-700">
                50% discount · Exit clause mes 3 · Conversion automàtica post-pilot
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-6 border-2 border-primary-900 px-6 py-3 font-semibold text-primary-900 hover:bg-primary-900 hover:text-white"
              >
                <Link to="/book-demo?plan=pilot">Sol·licitar Pilot Program</Link>
              </Button>
            </Card>
          </div>
        </section>

        {/* ===== SECTION 3: FEATURE COMPARISON TABLE ===== */}
        <section className="w-full bg-white px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[1100px]">
            <h2 className="mb-12 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Compara les opcions
            </h2>

            <div className="overflow-hidden rounded-xl border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-[40%] py-4 font-heading text-sm font-semibold text-gray-900">
                      Feature
                    </TableHead>
                    <TableHead className="w-[20%] py-4 text-center font-heading text-sm font-semibold text-gray-900">
                      Flexible
                    </TableHead>
                    <TableHead className="w-[20%] bg-primary-50 py-4 text-center font-heading text-sm font-semibold text-primary-900">
                      Compromís
                    </TableHead>
                    <TableHead className="w-[20%] py-4 text-center font-heading text-sm font-semibold text-gray-900">
                      Pilot
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <ComparisonRow feature="Monitoring BOE + 17 CCAA" flexible pilot compromis />
                  <ComparisonRow feature="Alertes temps real (<24h)" flexible pilot compromis />
                  <ComparisonRow feature="5 àrees compliance" flexible pilot compromis />
                  <ComparisonRow feature="Briefings setmanals" flexible pilot compromis />
                  <ComparisonRow feature="API access" flexible pilot compromis />
                  <ComparisonRow feature="Support <4h" flexible pilot compromis />
                  <ComparisonRow feature="Dedicated Account Manager" pilot compromis />
                  <ComparisonRow feature="Exit clause mes 3" pilot compromis />
                  <ComparisonRow feature="Priority onboarding" pilot compromis />
                  <TableRow className="bg-gray-50">
                    <TableCell className="py-4 font-body text-sm font-medium text-gray-900">
                      Durada contracte
                    </TableCell>
                    <TableCell className="py-4 text-center font-body text-sm text-gray-700">
                      Monthly
                    </TableCell>
                    <TableCell className="bg-primary-50 py-4 text-center font-body text-sm font-medium text-primary-900">
                      12 mesos
                    </TableCell>
                    <TableCell className="py-4 text-center font-body text-sm text-gray-700">
                      6 mesos
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-4 font-body text-sm font-medium text-gray-900">
                      Preu
                    </TableCell>
                    <TableCell className="py-4 text-center font-heading text-lg font-bold text-gray-900">
                      €6.500/mes
                    </TableCell>
                    <TableCell className="bg-primary-50 py-4 text-center font-heading text-lg font-bold text-primary-900">
                      €5.500/mes
                    </TableCell>
                    <TableCell className="py-4 text-center font-heading text-lg font-bold text-gray-900">
                      €2.750/mes
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* ===== SECTION 4: FAQ PRICING ===== */}
        <section className="w-full bg-gray-50 px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[800px]">
            <h2 className="mb-12 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Preguntes freqüents
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-xl border border-gray-200 bg-white px-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <AccordionTrigger className="py-6 text-left font-heading text-lg font-semibold text-gray-900 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 font-body text-base leading-relaxed text-gray-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ===== SECTION 5: ROI CALCULATOR ===== */}
        <ROICalculator />

        {/* ===== SECTION 6: FINAL CTA PRICING ===== */}
        <section className="w-full bg-gray-900 px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[800px] text-center">
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              Encara tens dubtes? Parlem.
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-xl bg-white px-8 py-4 font-semibold text-gray-900 hover:bg-gray-100"
              >
                <Link to="/book-demo">Agendar Demo de 30 min</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl border-2 border-white px-8 py-4 font-semibold text-white hover:bg-white hover:text-gray-900"
              >
                <Link to="/contact">Enviar-nos un email</Link>
              </Button>
            </div>
            <p className="mt-8">
              <Link
                to="/playground"
                className="font-body text-base text-white/80 underline transition-colors hover:text-white hover:no-underline"
              >
                O prova tu mateix: Playground Interactiu →
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

/* ===== HELPER COMPONENTS ===== */

const FeatureItem = ({ text, highlighted = false }: { text: string; highlighted?: boolean }) => (
  <li className="flex items-start gap-3">
    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
    <span className={`font-body text-base ${highlighted ? "font-semibold text-gray-900" : "text-gray-700"}`}>
      {text}
    </span>
  </li>
);

const ComparisonRow = ({
  feature,
  flexible = false,
  compromis = false,
  pilot = false,
}: {
  feature: string;
  flexible?: boolean;
  compromis?: boolean;
  pilot?: boolean;
}) => (
  <TableRow className="transition-colors hover:bg-gray-50">
    <TableCell className="py-4 font-body text-sm text-gray-900">{feature}</TableCell>
    <TableCell className="py-4 text-center">
      {flexible ? (
        <Check className="mx-auto h-5 w-5 text-primary-600" />
      ) : (
        <X className="mx-auto h-5 w-5 text-gray-300" />
      )}
    </TableCell>
    <TableCell className="bg-primary-50 py-4 text-center">
      {compromis ? (
        <Check className="mx-auto h-5 w-5 text-primary-600" />
      ) : (
        <X className="mx-auto h-5 w-5 text-gray-300" />
      )}
    </TableCell>
    <TableCell className="py-4 text-center">
      {pilot ? (
        <Check className="mx-auto h-5 w-5 text-primary-600" />
      ) : (
        <X className="mx-auto h-5 w-5 text-gray-300" />
      )}
    </TableCell>
  </TableRow>
);

const ROICalculator = () => {
  const [lawyerCost, setLawyerCost] = useState(80000);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [fineCost, setFineCost] = useState(500000);

  const results = useMemo(() => {
    const hourlyRate = lawyerCost / 2080; // 40h/week * 52 weeks
    const timeSaved = hoursPerWeek * 52 * hourlyRate;
    const riskReduction = fineCost * 0.8;
    const totalBenefit = timeSaved + riskReduction;
    const premsaCost = 66000;
    const netBenefit = totalBenefit - premsaCost;

    return {
      timeSaved: Math.round(timeSaved),
      riskReduction: Math.round(riskReduction),
      totalBenefit: Math.round(totalBenefit),
      premsaCost,
      netBenefit: Math.round(netBenefit),
    };
  }, [lawyerCost, hoursPerWeek, fineCost]);

  return (
    <section className="w-full bg-white px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[700px]">
        <h2 className="mb-12 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
          Calcula el teu ROI amb PREMSA.IO
        </h2>

        <Card className="rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-md md:p-10">
          {/* Slider 1: Lawyer Cost */}
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <Label className="font-body text-sm font-medium text-gray-700">
                Cost advocat senior/any
              </Label>
              <span className="font-heading text-2xl font-bold text-gray-900">
                €{lawyerCost.toLocaleString()}
              </span>
            </div>
            <Slider
              value={[lawyerCost]}
              onValueChange={(value) => setLawyerCost(value[0])}
              min={60000}
              max={120000}
              step={5000}
              className="w-full"
            />
          </div>

          {/* Slider 2: Hours per week */}
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <Label className="font-body text-sm font-medium text-gray-700">
                Hores/setmana scanning BOE
              </Label>
              <span className="font-heading text-2xl font-bold text-gray-900">
                {hoursPerWeek}h/setmana
              </span>
            </div>
            <Slider
              value={[hoursPerWeek]}
              onValueChange={(value) => setHoursPerWeek(value[0])}
              min={5}
              max={20}
              step={1}
              className="w-full"
            />
          </div>

          {/* Input: Fine Cost */}
          <div className="mb-8">
            <Label className="mb-3 block font-body text-sm font-medium text-gray-700">
              Cost última multa regulatory (opcional)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
              <Input
                type="number"
                value={fineCost}
                onChange={(e) => setFineCost(Number(e.target.value) || 0)}
                placeholder="500.000"
                className="pl-8"
              />
            </div>
          </div>

          {/* Results Card */}
          <Card className="mt-8 rounded-xl border-2 border-primary-200 bg-white p-6 shadow-lg md:p-8">
            <h3 className="mb-6 font-heading text-xl font-bold text-primary-900">
              💰 EL TEU ROI AMB PREMSA.IO
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-body text-base text-gray-700">Temps estalviat:</span>
                <span className="font-body text-lg font-semibold text-gray-900">
                  €{results.timeSaved.toLocaleString()}/any
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-base text-gray-700">Risc multes reduït 80%:</span>
                <span className="font-body text-lg font-semibold text-gray-900">
                  €{results.riskReduction.toLocaleString()} (risk value)
                </span>
              </div>

              <div className="border-t border-dashed border-gray-300 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-body text-base font-medium text-green-700">
                    Total benefici potencial:
                  </span>
                  <span className="font-heading text-xl font-bold text-green-700">
                    €{results.totalBenefit.toLocaleString()}/any
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-body text-base text-gray-700">Cost PREMSA.IO:</span>
                <span className="font-body text-lg font-semibold text-gray-700">
                  -€{results.premsaCost.toLocaleString()}/any
                </span>
              </div>

              <div className="rounded-lg bg-green-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-lg font-bold text-green-900">NET BENEFIT:</span>
                  <span className="font-heading text-2xl font-bold text-green-900 md:text-3xl">
                    €{results.netBenefit.toLocaleString()}/any
                  </span>
                </div>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="mt-6 w-full rounded-lg bg-primary-900 py-4 font-semibold text-white hover:bg-primary-800"
            >
              <Link to={`/book-demo?plan=pilot&roi=${results.netBenefit}`}>
                Començar Pilot amb 50% Discount →
              </Link>
            </Button>
          </Card>

          <p className="mt-4 text-center font-body text-xs text-gray-500">
            Aquesta calculadora és una estimació basada en mitjanes del sector legal/compliance. El ROI real pot variar segons el teu cas específic.
          </p>
        </Card>
      </div>
    </section>
  );
};

/* ===== FAQ DATA ===== */

const faqData = [
  {
    question: "Per què pagar anual si puc fer monthly?",
    answer:
      "El pla Compromís (anual amb pagament mensual) t'estalvia €12.000/any vs el pla Flexible. A més, inclou Dedicated Account Manager, exit clause al mes 3 (no estàs trapped), i priority onboarding. La majoria dels nostres clients trien aquest pla perquè combina flexibilitat (pagament mensual) amb estalvi real.",
  },
  {
    question: "€66K upfront és massa per nosaltres",
    answer:
      "No cal pagar upfront! El pla Compromís és facturació mensual de €5.500/mes amb contracte de 12 mesos. Si prefereixes provar primer, tenim el Pilot Program a €2.750/mes durant 6 mesos (50% discount) amb exit clause al mes 3. Zero risc.",
  },
  {
    question: "Ja tenim equip legal fort, per què necessitem PREMSA.IO?",
    answer:
      "PREMSA.IO no substitueix el teu equip legal - el fa 10x més efectiu. Estalviem 15h/setmana per advocat en tasques de scanning manual del BOE. El teu equip es pot centrar en anàlisi jurídica de valor, estratègia i clients, mentre PREMSA.IO detecta i filtra automàticament què requereix atenció. Pensa-ho com un analista junior 24/7 que mai dorm i no es perd res.",
  },
  {
    question: "Com sabem que la IA és precisa?",
    answer:
      "La nostra IA està entrenada amb més de 50.000 documents normatius espanyols i combina múltiples models (ChatGPT per volum, Claude per anàlisi crítica, Gemini per fact-checking). A més, Legal Bedrock verifica cada alerta contra el corpus legal existent per detectar contradiccions. Taxa d'accuracy: >95% en classificació de rellevància. I sempre tens el link al document oficial del BOE per verificar.",
  },
  {
    question: "Què passa si volem cancel·lar?",
    answer:
      "Pla Flexible: Cancel·lació immediata amb 30 dies de preavís, zero penalització. Pla Compromís: Exit clause al mes 3. Si després de 3 mesos no hi veus valor, pots cancel·lar sense cost addicional. Després del mes 3, compromís fins final contracte (mes 12). Pilot: Exit clause al mes 3 també. Dissenyat per testejar sense risc.",
  },
  {
    question: "Poden adaptar-se a sectors específics com pharma o seguros?",
    answer:
      "Sí. PREMSA.IO permet configurar fins a 5 àrees de compliance personalitzades. Per exemple, per pharma: normativa sanitària, patents, AEMPS, protecció dades RGPD, laboral. La IA aprèn les teves prioritats amb el temps (Memòria Institucional) i filtra automàticament el que no és rellevant pel teu sector.",
  },
  {
    question: "Teniu integracions amb els nostres sistemes?",
    answer:
      "Sí, oferim: API REST per integrar amb CRM, JIRA, Asana, etc. Webhooks per rebre alerts en temps real. Email/Slack per notificacions automàtiques. Export formats: PDF, Excel, JSON. Si necessites integració custom, el nostre equip tècnic pot ajudar (inclòs en pla Compromís).",
  },
  {
    question: "Hi ha costos ocults o extra?",
    answer:
      "No. El preu que veus és el preu final. Inclou: Monitoring il·limitat (BOE + 17 CCAA), usuaris il·limitats dins la teva empresa, actualitzacions i millores del producte, i support tècnic. L'únic extra opcional seria customitzacions molt específiques d'integració, però això es parla abans i es factura apart (poc comú).",
  },
];

export default PricingPage;
