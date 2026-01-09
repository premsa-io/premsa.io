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
        <section className="w-full bg-background px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[720px] text-center">
            <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-foreground md:text-[42px]">
              Inverteix en intel·ligència, no en sorpreses
            </h1>
            <p className="mx-auto mt-3 max-w-[520px] text-base text-muted-foreground">
              El cost d'1 multa evitada paga 10 anys de subscripció
            </p>
          </div>
        </section>

        {/* ===== SECTION 2: PRICING CARDS ===== */}
        <section className="w-full bg-muted/40 px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-[880px]">
            {/* Cards Grid */}
            <div className="grid gap-5 md:grid-cols-2">
              {/* FLEXIBLE Card */}
              <Card className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  FLEXIBLE
                </p>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-foreground">€6.500</span>
                  <span className="ml-1 text-base text-muted-foreground">/mes</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Cancel·la quan vulguis amb 30 dies
                </p>

                <div className="my-5 border-t border-border" />

                <ul className="space-y-2.5">
                  <FeatureItem text="Monitoring il·limitat BOE + 17 CCAA" />
                  <FeatureItem text="5 àrees de compliance personalitzades" />
                  <FeatureItem text="Alertes temps real (<24h publicació)" />
                  <FeatureItem text="Briefings setmanals executius" />
                  <FeatureItem text="API access per integració" />
                  <FeatureItem text="Support resposta <4h (business hours)" />
                </ul>

                <Button
                  asChild
                  size="sm"
                  className="mt-5 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <Link to="/book-demo?plan=flexible">Començar Ara</Link>
                </Button>
              </Card>

              {/* COMPROMÍS Card (Highlighted) */}
              <Card className="relative rounded-xl border-2 border-primary bg-card p-6 shadow-md">
                <Badge className="absolute -top-2.5 right-4 bg-amber-500 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                  ⭐ RECOMANAT
                </Badge>

                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  COMPROMÍS
                </p>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-foreground">€5.500</span>
                  <span className="ml-1 text-base text-muted-foreground">/mes</span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">(€66.000/any total)</p>
                <Badge className="mt-1.5 bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  Estalvi €12.000/any vs Flexible
                </Badge>
                <p className="mt-1 text-xs text-muted-foreground">
                  Contracte 12 mesos, pagament mensual
                </p>

                <div className="my-5 border-t border-border" />

                <p className="mb-2.5 text-xs font-medium text-primary">
                  Tot del Flexible +
                </p>
                <ul className="space-y-2.5">
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
                  size="sm"
                  className="mt-5 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <Link to="/book-demo?plan=compromis">Parlar amb Sales</Link>
                </Button>
              </Card>
            </div>

            {/* Pilot Program Callout */}
            <Card className="mx-auto mt-8 max-w-[600px] rounded-lg border border-primary/20 bg-primary/5 p-5 text-center">
              <span className="text-2xl">💡</span>
              <h3 className="mt-2 text-base font-semibold text-primary">
                PILOT PROGRAM (Primers 10 clients)
              </h3>
              <p className="mt-1.5 text-sm font-medium text-foreground">
                €2.750/mes × 6 mesos = €16.500 total
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                50% discount · Exit clause mes 3 · Conversion automàtica post-pilot
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="mt-4 border-primary text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/book-demo?plan=pilot">Sol·licitar Pilot Program</Link>
              </Button>
            </Card>
          </div>
        </section>

        {/* ===== SECTION 3: FEATURE COMPARISON TABLE ===== */}
        <section className="w-full bg-background px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-[880px]">
            <h2 className="mb-6 text-center text-xl font-semibold text-foreground md:text-2xl">
              Compara les opcions
            </h2>

            <div className="overflow-hidden rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[40%] py-2.5 text-xs font-semibold text-foreground">
                      Feature
                    </TableHead>
                    <TableHead className="w-[20%] py-2.5 text-center text-xs font-semibold text-foreground">
                      Flexible
                    </TableHead>
                    <TableHead className="w-[20%] bg-primary/10 py-2.5 text-center text-xs font-semibold text-primary">
                      Compromís
                    </TableHead>
                    <TableHead className="w-[20%] py-2.5 text-center text-xs font-semibold text-foreground">
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
                  <TableRow className="bg-muted/30">
                    <TableCell className="py-2.5 text-xs font-medium text-foreground">
                      Durada contracte
                    </TableCell>
                    <TableCell className="py-2.5 text-center text-xs text-muted-foreground">
                      Monthly
                    </TableCell>
                    <TableCell className="bg-primary/10 py-2.5 text-center text-xs font-medium text-primary">
                      12 mesos
                    </TableCell>
                    <TableCell className="py-2.5 text-center text-xs text-muted-foreground">
                      6 mesos
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-2.5 text-xs font-medium text-foreground">
                      Preu
                    </TableCell>
                    <TableCell className="py-2.5 text-center text-sm font-bold text-foreground">
                      €6.500/mes
                    </TableCell>
                    <TableCell className="bg-primary/10 py-2.5 text-center text-sm font-bold text-primary">
                      €5.500/mes
                    </TableCell>
                    <TableCell className="py-2.5 text-center text-sm font-bold text-foreground">
                      €2.750/mes
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* ===== SECTION 4: FAQ PRICING ===== */}
        <section className="w-full bg-muted/40 px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-[640px]">
            <h2 className="mb-6 text-center text-xl font-semibold text-foreground md:text-2xl">
              Preguntes freqüents
            </h2>

            <Accordion type="single" collapsible className="space-y-2">
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-lg border border-border bg-card px-4 shadow-sm"
                >
                  <AccordionTrigger className="py-3 text-left text-sm font-medium text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-sm leading-relaxed text-muted-foreground">
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
        <section className="w-full bg-foreground px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-[560px] text-center">
            <h2 className="text-xl font-semibold text-background md:text-2xl">
              Encara tens dubtes? Parlem.
            </h2>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="sm"
                className="rounded-md bg-background px-5 text-sm font-medium text-foreground hover:bg-background/90"
              >
                <Link to="/book-demo">Agendar Demo de 30 min</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-md border-background/50 px-5 text-sm font-medium text-background hover:bg-background hover:text-foreground"
              >
                <Link to="/contact">Enviar-nos un email</Link>
              </Button>
            </div>
            <p className="mt-5">
              <Link
                to="/playground"
                className="text-sm text-background/70 underline transition-colors hover:text-background hover:no-underline"
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
  <li className="flex items-start gap-2">
    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
    <span className={`text-sm ${highlighted ? "font-medium text-foreground" : "text-muted-foreground"}`}>
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
  <TableRow className="transition-colors hover:bg-muted/30">
    <TableCell className="py-2.5 text-xs text-foreground">{feature}</TableCell>
    <TableCell className="py-2.5 text-center">
      {flexible ? (
        <Check className="mx-auto h-3.5 w-3.5 text-primary" />
      ) : (
        <X className="mx-auto h-3.5 w-3.5 text-muted-foreground/40" />
      )}
    </TableCell>
    <TableCell className="bg-primary/10 py-2.5 text-center">
      {compromis ? (
        <Check className="mx-auto h-3.5 w-3.5 text-primary" />
      ) : (
        <X className="mx-auto h-3.5 w-3.5 text-muted-foreground/40" />
      )}
    </TableCell>
    <TableCell className="py-2.5 text-center">
      {pilot ? (
        <Check className="mx-auto h-3.5 w-3.5 text-primary" />
      ) : (
        <X className="mx-auto h-3.5 w-3.5 text-muted-foreground/40" />
      )}
    </TableCell>
  </TableRow>
);

const ROICalculator = () => {
  const [lawyerCost, setLawyerCost] = useState(80000);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [fineCost, setFineCost] = useState(500000);

  const results = useMemo(() => {
    const hourlyRate = lawyerCost / 2080;
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
    <section className="w-full bg-background px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-[520px]">
        <h2 className="mb-6 text-center text-xl font-semibold text-foreground md:text-2xl">
          Calcula el teu ROI amb PREMSA.IO
        </h2>

        <Card className="rounded-xl border border-border bg-muted/30 p-5 shadow-sm">
          {/* Slider 1: Lawyer Cost */}
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <Label className="text-xs font-medium text-muted-foreground">
                Cost advocat senior/any
              </Label>
              <span className="text-lg font-bold text-foreground">
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
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <Label className="text-xs font-medium text-muted-foreground">
                Hores/setmana scanning BOE
              </Label>
              <span className="text-lg font-bold text-foreground">
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
          <div className="mb-5">
            <Label className="mb-2 block text-xs font-medium text-muted-foreground">
              Cost última multa regulatory (opcional)
            </Label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">€</span>
              <Input
                type="number"
                value={fineCost}
                onChange={(e) => setFineCost(Number(e.target.value))}
                className="h-9 pl-7 text-sm"
              />
            </div>
          </div>

          {/* Results */}
          <div className="mt-6 space-y-2 rounded-lg bg-background p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Temps estalviat (valor):</span>
              <span className="font-medium text-foreground">€{results.timeSaved.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Reducció risc (80%):</span>
              <span className="font-medium text-foreground">€{results.riskReduction.toLocaleString()}</span>
            </div>
            <div className="border-t border-border pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Benefici total:</span>
                <span className="font-medium text-foreground">€{results.totalBenefit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Cost PREMSA.IO:</span>
                <span className="font-medium text-foreground">-€{results.premsaCost.toLocaleString()}</span>
              </div>
            </div>
            <div className="border-t border-border pt-2">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-foreground">Benefici net anual:</span>
                <span className="text-lg font-bold text-green-600">€{results.netBenefit.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

/* ===== FAQ DATA ===== */
const faqData = [
  {
    question: "Quin és el compromís mínim?",
    answer:
      "El pla Flexible no té compromís mínim: pots cancel·lar amb 30 dies de preavís. El pla Compromís requereix 12 mesos, però inclou una exit clause al mes 3 si no estàs satisfet.",
  },
  {
    question: "Com funciona el Pilot Program?",
    answer:
      "El Pilot Program està pensat per a 10 primers clients que vulguin provar la plataforma amb un 50% de descompte durant 6 mesos. Inclou exit clause al mes 3 i conversió automàtica al pla Compromís després del pilot.",
  },
  {
    question: "Quins mètodes de pagament accepteu?",
    answer:
      "Acceptem transferència bancària i targeta de crèdit. El pagament és mensual per a tots els plans.",
  },
  {
    question: "Puc canviar de pla?",
    answer:
      "Sí, pots passar del pla Flexible al Compromís en qualsevol moment. El canvi de Compromís a Flexible requereix completar el període de 12 mesos.",
  },
  {
    question: "Què passa si necessito més de 5 àrees de compliance?",
    answer:
      "Contacta'ns per a una proposta personalitzada. Podem adaptar el servei a les teves necessitats específiques.",
  },
  {
    question: "Hi ha descomptes per a startups o ONGs?",
    answer:
      "Sí, oferim condicions especials per a startups en fases inicials i organitzacions sense ànim de lucre. Contacta'ns per més informació.",
  },
];

export default PricingPage;
