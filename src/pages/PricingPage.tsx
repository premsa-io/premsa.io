import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Check, X, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { toast } from "sonner";

type BillingPeriod = "monthly" | "annual";
type TierId = "starter" | "professional" | "business" | "enterprise";

interface PricingTier {
  id: TierId;
  monthlyPrice: number | null;
  annualPrice: number | null;
  popular: boolean;
  ctaType: "checkout" | "contact";
  features: string[];
  notIncluded: string[];
}

const PricingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("annual");
  const { startCheckout, isLoading, error, isAuthenticated } = useStripeCheckout();

  // Pricing data with correct prices
  const tiers: PricingTier[] = [
    {
      id: "starter",
      monthlyPrice: 1100,
      annualPrice: 950,
      popular: false,
      ctaType: "checkout",
      features: [
        t("pricing.features.countries", { count: 1 }),
        t("pricing.features.topics", { count: 10 }),
        t("pricing.features.ckbDocs", { count: 10 }),
        t("pricing.features.chatQuestions", { count: 20 }),
        t("pricing.features.unlimitedUsers"),
        t("pricing.features.weeklyReports"),
        t("pricing.features.exportPdf"),
        t("pricing.features.supportEmail"),
      ],
      notIncluded: [
        t("pricing.features.exportCsv"),
        t("pricing.features.apiAccess"),
        t("pricing.features.sso"),
      ],
    },
    {
      id: "professional",
      monthlyPrice: 3200,
      annualPrice: 2750,
      popular: true,
      ctaType: "checkout",
      features: [
        t("pricing.features.countries", { count: 1 }),
        t("pricing.features.topics", { count: 30 }),
        t("pricing.features.ckbDocs", { count: 30 }),
        t("pricing.features.chatQuestions", { count: 75 }),
        t("pricing.features.unlimitedUsers"),
        t("pricing.features.exportPdfCsv"),
        t("pricing.features.workspaces", { count: 3 }),
        t("pricing.features.support24h"),
      ],
      notIncluded: [
        t("pricing.features.apiAccess"),
        t("pricing.features.sso"),
      ],
    },
    {
      id: "business",
      monthlyPrice: 6500,
      annualPrice: 5500,
      popular: false,
      ctaType: "contact",
      features: [
        t("pricing.features.countries", { count: 2 }),
        t("pricing.features.topics", { count: 100 }),
        t("pricing.features.ckbDocs", { count: 100 }),
        t("pricing.features.chatQuestions", { count: 200 }),
        t("pricing.features.apiAccess"),
        t("pricing.features.sso"),
        t("pricing.features.divergenceAlerts"),
        t("pricing.features.supportPriority"),
        t("pricing.features.guidedOnboarding"),
      ],
      notIncluded: [],
    },
    {
      id: "enterprise",
      monthlyPrice: null,
      annualPrice: null,
      popular: false,
      ctaType: "contact",
      features: [
        t("pricing.features.allFromBusiness"),
        t("pricing.features.unlimitedCountries"),
        t("pricing.features.whitelabel"),
        t("pricing.features.slaContractual"),
        t("pricing.features.accountManager"),
      ],
      notIncluded: [],
    },
  ];

  const faqData = [
    { question: t("pricing.faq.q1"), answer: t("pricing.faq.a1") },
    { question: t("pricing.faq.q2"), answer: t("pricing.faq.a2") },
    { question: t("pricing.faq.q3"), answer: t("pricing.faq.a3") },
    { question: t("pricing.faq.q4"), answer: t("pricing.faq.a4") },
    { question: t("pricing.faq.q5"), answer: t("pricing.faq.a5") },
    { question: t("pricing.faq.q6"), answer: t("pricing.faq.a6") },
  ];

  const handleCTA = async (tier: PricingTier) => {
    if (tier.ctaType === "contact") {
      navigate(`/contact?plan=${tier.id}`);
      return;
    }

    if (!isAuthenticated) {
      navigate(`/signup?redirect=/pricing&tier=${tier.id}`);
      return;
    }

    const lookupKey = `${tier.id}_${billingPeriod}`;
    await startCheckout(lookupKey);

    if (error) {
      toast.error(error);
    }
  };

  const getPrice = (tier: PricingTier) => {
    if (tier.monthlyPrice === null) return null;
    return billingPeriod === "monthly" ? tier.monthlyPrice : tier.annualPrice;
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return t("pricing.tiers.enterprise.customPrice");
    return `€${price.toLocaleString("es-ES")}`;
  };

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

            {/* Billing Toggle */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className={`text-sm font-medium ${billingPeriod === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>
                {t("pricing.billing.monthly")}
              </span>
              <Switch
                checked={billingPeriod === "annual"}
                onCheckedChange={(checked) => setBillingPeriod(checked ? "annual" : "monthly")}
              />
              <span className={`text-sm font-medium ${billingPeriod === "annual" ? "text-foreground" : "text-muted-foreground"}`}>
                {t("pricing.billing.annual")}
              </span>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                {t("pricing.billing.save")}
              </Badge>
            </div>
          </div>
        </section>

        {/* ===== SECTION 2: PRICING CARDS ===== */}
        <section className="w-full bg-muted/40 px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {tiers.map((tier) => (
                <Card
                  key={tier.id}
                  className={`relative flex flex-col rounded-xl border p-6 shadow-sm ${
                    tier.popular
                      ? "border-2 border-primary bg-card shadow-md"
                      : "border-border bg-card"
                  }`}
                >
                  {tier.popular && (
                    <Badge className="absolute -top-2.5 right-4 bg-amber-500 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                      {t("pricing.tiers.professional.popular")}
                    </Badge>
                  )}

                  <p className={`text-xs font-semibold uppercase tracking-wide ${tier.popular ? "text-primary" : "text-muted-foreground"}`}>
                    {t(`pricing.tiers.${tier.id}.name`)}
                  </p>
                  
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(`pricing.tiers.${tier.id}.description`)}
                  </p>

                  <div className="mt-4">
                    <span className="text-3xl font-bold text-foreground">
                      {formatPrice(getPrice(tier))}
                    </span>
                    {tier.monthlyPrice !== null && (
                      <span className="ml-1 text-base text-muted-foreground">
                        {t("pricing.billing.perMonth")}
                      </span>
                    )}
                  </div>
                  
                  {billingPeriod === "annual" && tier.annualPrice !== null && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {t("pricing.billing.billedAnnually")}
                    </p>
                  )}

                  <div className="my-5 border-t border-border" />

                  <ul className="flex-1 space-y-2.5">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                    {tier.notIncluded.map((feature, index) => (
                      <li key={`not-${index}`} className="flex items-start gap-2">
                        <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
                        <span className="text-sm text-muted-foreground/60 line-through">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="sm"
                    className={`mt-5 w-full rounded-md text-sm font-medium ${
                      tier.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                    onClick={() => handleCTA(tier)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      t(`pricing.tiers.${tier.id}.cta`)
                    )}
                  </Button>
                </Card>
              ))}
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
                {t("pricing.pilot.description")}
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
          <div className="mx-auto max-w-[1000px]">
            <h2 className="mb-6 text-center text-xl font-semibold text-foreground md:text-2xl">
              {t("pricing.comparison.title")}
            </h2>

            <div className="overflow-x-auto rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[30%] py-2.5 text-xs font-semibold text-foreground">
                      {t("pricing.comparison.feature")}
                    </TableHead>
                    <TableHead className="w-[17.5%] py-2.5 text-center text-xs font-semibold text-foreground">
                      Starter
                    </TableHead>
                    <TableHead className="w-[17.5%] bg-primary/10 py-2.5 text-center text-xs font-semibold text-primary">
                      Professional
                    </TableHead>
                    <TableHead className="w-[17.5%] py-2.5 text-center text-xs font-semibold text-foreground">
                      Business
                    </TableHead>
                    <TableHead className="w-[17.5%] py-2.5 text-center text-xs font-semibold text-foreground">
                      Enterprise
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <ComparisonRow feature={t("pricing.comparison.countries")} values={["1", "1", "2", t("pricing.comparison.unlimited")]} highlightCol={1} />
                  <ComparisonRow feature={t("pricing.comparison.topics")} values={["10", "30", "100", t("pricing.comparison.unlimited")]} highlightCol={1} />
                  <ComparisonRow feature={t("pricing.comparison.ckbDocs")} values={["10", "30", "100", t("pricing.comparison.unlimited")]} highlightCol={1} />
                  <ComparisonRow feature={t("pricing.comparison.chatQuestions")} values={["20", "75", "200", t("pricing.comparison.unlimited")]} highlightCol={1} />
                  <ComparisonRow feature={t("pricing.comparison.users")} values={[true, true, true, true]} highlightCol={1} />
                  <ComparisonRow feature={t("pricing.comparison.exportPdf")} values={[true, true, true, true]} highlightCol={1} />
                  <ComparisonRow feature={t("pricing.comparison.exportCsv")} values={[false, true, true, true]} highlightCol={1} />
                  <ComparisonRow feature={t("pricing.comparison.apiAccess")} values={[false, false, true, true]} highlightCol={1} />
                  <ComparisonRow feature={t("pricing.comparison.sso")} values={[false, false, true, true]} highlightCol={1} />
                  <ComparisonRow feature={t("pricing.comparison.divergence")} values={[false, false, true, true]} highlightCol={1} />
                  <ComparisonRow feature={t("pricing.comparison.accountManager")} values={[false, false, false, true]} highlightCol={1} />
                  <ComparisonRow feature={t("pricing.comparison.sla")} values={[false, false, false, true]} highlightCol={1} />
                  <TableRow className="bg-muted/30">
                    <TableCell className="py-2.5 text-xs font-medium text-foreground">
                      {t("pricing.comparison.priceMonthly")}
                    </TableCell>
                    <TableCell className="py-2.5 text-center text-sm font-bold text-foreground">
                      €1.100
                    </TableCell>
                    <TableCell className="bg-primary/10 py-2.5 text-center text-sm font-bold text-primary">
                      €3.200
                    </TableCell>
                    <TableCell className="py-2.5 text-center text-sm font-bold text-foreground">
                      €6.500
                    </TableCell>
                    <TableCell className="py-2.5 text-center text-sm font-bold text-foreground">
                      Custom
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-2.5 text-xs font-medium text-foreground">
                      {t("pricing.comparison.priceAnnual")}
                    </TableCell>
                    <TableCell className="py-2.5 text-center text-sm font-bold text-green-600">
                      €950
                    </TableCell>
                    <TableCell className="bg-primary/10 py-2.5 text-center text-sm font-bold text-green-600">
                      €2.750
                    </TableCell>
                    <TableCell className="py-2.5 text-center text-sm font-bold text-green-600">
                      €5.500
                    </TableCell>
                    <TableCell className="py-2.5 text-center text-sm font-bold text-foreground">
                      Custom
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

const ComparisonRow = ({
  feature,
  values,
  highlightCol,
}: {
  feature: string;
  values: (boolean | string)[];
  highlightCol: number;
}) => (
  <TableRow className="transition-colors hover:bg-muted/30">
    <TableCell className="py-2.5 text-xs text-foreground">{feature}</TableCell>
    {values.map((value, index) => (
      <TableCell
        key={index}
        className={`py-2.5 text-center ${index === highlightCol ? "bg-primary/10" : ""}`}
      >
        {typeof value === "boolean" ? (
          value ? (
            <Check className="mx-auto h-3.5 w-3.5 text-primary" />
          ) : (
            <X className="mx-auto h-3.5 w-3.5 text-muted-foreground/40" />
          )
        ) : (
          <span className="text-xs font-medium text-foreground">{value}</span>
        )}
      </TableCell>
    ))}
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
    const premsaCost = 33000; // Professional annual (€2,750 x 12)
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
