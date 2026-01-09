import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const faqData = [
    { question: t("pricing.faq.q1"), answer: t("pricing.faq.a1") },
    { question: t("pricing.faq.q2"), answer: t("pricing.faq.a2") },
    { question: t("pricing.faq.q3"), answer: t("pricing.faq.a3") },
    { question: t("pricing.faq.q4"), answer: t("pricing.faq.a4") },
    { question: t("pricing.faq.q5"), answer: t("pricing.faq.a5") },
    { question: t("pricing.faq.q6"), answer: t("pricing.faq.a6") },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* ===== SECTION 1: HERO PRICING ===== */}
        <section className="w-full bg-background px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[720px] text-center">
            <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-foreground md:text-[42px]">
              {t("pricing.hero.title")}
            </h1>
            <p className="mx-auto mt-3 max-w-[520px] text-base text-muted-foreground">
              {t("pricing.hero.description")}
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
                  {t("pricing.plans.flexible")}
                </p>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-foreground">{t("pricing.plans.flexiblePrice")}</span>
                  <span className="ml-1 text-base text-muted-foreground">{t("pricing.plans.flexiblePeriod")}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("pricing.plans.flexibleCancel")}
                </p>

                <div className="my-5 border-t border-border" />

                <ul className="space-y-2.5">
                  <FeatureItem text={t("pricing.plans.feature1")} />
                  <FeatureItem text={t("pricing.plans.feature2")} />
                  <FeatureItem text={t("pricing.plans.feature3")} />
                  <FeatureItem text={t("pricing.plans.feature4")} />
                  <FeatureItem text={t("pricing.plans.feature5")} />
                  <FeatureItem text={t("pricing.plans.feature6")} />
                </ul>

                <Button
                  asChild
                  size="sm"
                  className="mt-5 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <Link to="/book-demo?plan=flexible">{t("pricing.plans.flexibleCta")}</Link>
                </Button>
              </Card>

              {/* COMPROMÍS Card (Highlighted) */}
              <Card className="relative rounded-xl border-2 border-primary bg-card p-6 shadow-md">
                <Badge className="absolute -top-2.5 right-4 bg-amber-500 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                  {t("pricing.plans.recommended")}
                </Badge>

                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {t("pricing.plans.compromis")}
                </p>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-foreground">{t("pricing.plans.compromisPrice")}</span>
                  <span className="ml-1 text-base text-muted-foreground">{t("pricing.plans.flexiblePeriod")}</span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{t("pricing.plans.compromisTotal")}</p>
                <Badge className="mt-1.5 bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  {t("pricing.plans.compromisSaving")}
                </Badge>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("pricing.plans.compromisContract")}
                </p>

                <div className="my-5 border-t border-border" />

                <p className="mb-2.5 text-xs font-medium text-primary">
                  {t("pricing.plans.allFromFlexible")}
                </p>
                <ul className="space-y-2.5">
                  <FeatureItem text={t("pricing.plans.feature1")} />
                  <FeatureItem text={t("pricing.plans.feature2")} />
                  <FeatureItem text={t("pricing.plans.feature3")} />
                  <FeatureItem text={t("pricing.plans.feature4")} />
                  <FeatureItem text={t("pricing.plans.feature5")} />
                  <FeatureItem text={t("pricing.plans.feature6")} />
                  <FeatureItem text={t("pricing.plans.feature7")} highlighted />
                  <FeatureItem text={t("pricing.plans.feature8")} highlighted />
                  <FeatureItem text={t("pricing.plans.feature9")} highlighted />
                </ul>

                <Button
                  asChild
                  size="sm"
                  className="mt-5 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <Link to="/book-demo?plan=compromis">{t("pricing.plans.compromisCta")}</Link>
                </Button>
              </Card>
            </div>

            {/* Pilot Program Callout */}
            <Card className="mx-auto mt-8 max-w-[600px] rounded-lg border border-primary/20 bg-primary/5 p-5 text-center">
              <span className="text-2xl">💡</span>
              <h3 className="mt-2 text-base font-semibold text-primary">
                {t("pricing.pilot.title")}
              </h3>
              <p className="mt-1.5 text-sm font-medium text-foreground">
                {t("pricing.pilot.price")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("pricing.pilot.details")}
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="mt-4 border-primary text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/book-demo?plan=pilot">{t("pricing.pilot.cta")}</Link>
              </Button>
            </Card>
          </div>
        </section>

        {/* ===== SECTION 3: FEATURE COMPARISON TABLE ===== */}
        <section className="w-full bg-background px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-[880px]">
            <h2 className="mb-6 text-center text-xl font-semibold text-foreground md:text-2xl">
              {t("pricing.comparison.title")}
            </h2>

            <div className="overflow-hidden rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[40%] py-2.5 text-xs font-semibold text-foreground">
                      {t("pricing.comparison.feature")}
                    </TableHead>
                    <TableHead className="w-[20%] py-2.5 text-center text-xs font-semibold text-foreground">
                      {t("pricing.plans.flexible")}
                    </TableHead>
                    <TableHead className="w-[20%] bg-primary/10 py-2.5 text-center text-xs font-semibold text-primary">
                      {t("pricing.plans.compromis")}
                    </TableHead>
                    <TableHead className="w-[20%] py-2.5 text-center text-xs font-semibold text-foreground">
                      Pilot
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <ComparisonRow feature={t("pricing.plans.feature1")} flexible pilot compromis />
                  <ComparisonRow feature={t("pricing.plans.feature3")} flexible pilot compromis />
                  <ComparisonRow feature={t("pricing.plans.feature2")} flexible pilot compromis />
                  <ComparisonRow feature={t("pricing.plans.feature4")} flexible pilot compromis />
                  <ComparisonRow feature={t("pricing.plans.feature5")} flexible pilot compromis />
                  <ComparisonRow feature={t("pricing.plans.feature6")} flexible pilot compromis />
                  <ComparisonRow feature={t("pricing.plans.feature7")} pilot compromis />
                  <ComparisonRow feature={t("pricing.plans.feature8")} pilot compromis />
                  <ComparisonRow feature={t("pricing.plans.feature9")} pilot compromis />
                  <TableRow className="bg-muted/30">
                    <TableCell className="py-2.5 text-xs font-medium text-foreground">
                      {t("pricing.comparison.duration")}
                    </TableCell>
                    <TableCell className="py-2.5 text-center text-xs text-muted-foreground">
                      {t("pricing.comparison.monthly")}
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
                      {t("pricing.comparison.price")}
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
              {t("pricing.faq.title")}
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
              {t("pricing.cta.title")}
            </h2>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="sm"
                className="rounded-md bg-background px-5 text-sm font-medium text-foreground hover:bg-background/90"
              >
                <Link to="/book-demo">{t("pricing.cta.demo")}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-md border-background/50 px-5 text-sm font-medium text-background hover:bg-background hover:text-foreground"
              >
                <Link to="/contact">{t("pricing.cta.contact")}</Link>
              </Button>
            </div>
            <p className="mt-5">
              <Link
                to="/playground"
                className="text-sm text-background/70 underline transition-colors hover:text-background hover:no-underline"
              >
                {t("pricing.cta.playground")}
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
  const { t } = useTranslation();
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
          {t("pricing.roi.title")}
        </h2>

        <Card className="rounded-xl border border-border bg-muted/30 p-5 shadow-sm">
          {/* Slider 1: Lawyer Cost */}
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <Label className="text-xs font-medium text-muted-foreground">
                {t("pricing.roi.lawyerCost")}
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
                {t("pricing.roi.hoursPerWeek")}
              </Label>
              <span className="text-lg font-bold text-foreground">
                {hoursPerWeek}h/week
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
              {t("pricing.roi.fineCost")}
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
          <div className="mt-6 space-y-3 border-t border-border pt-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{t("pricing.roi.timeSaved")}</span>
              <span className="text-sm font-medium text-foreground">
                €{results.timeSaved.toLocaleString()}{t("pricing.roi.year")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{t("pricing.roi.riskReduction")}</span>
              <span className="text-sm font-medium text-foreground">
                €{results.riskReduction.toLocaleString()}{t("pricing.roi.year")}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="text-xs font-medium text-muted-foreground">{t("pricing.roi.totalBenefit")}</span>
              <span className="text-sm font-bold text-foreground">
                €{results.totalBenefit.toLocaleString()}{t("pricing.roi.year")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{t("pricing.roi.premsaCost")}</span>
              <span className="text-sm font-medium text-destructive">
                -€{results.premsaCost.toLocaleString()}{t("pricing.roi.year")}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-primary/10 p-3">
              <span className="text-sm font-semibold text-primary">{t("pricing.roi.netBenefit")}</span>
              <span className="text-lg font-bold text-primary">
                €{results.netBenefit.toLocaleString()}{t("pricing.roi.year")}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default PricingPage;
