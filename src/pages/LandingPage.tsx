import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Check, Scale, Building2, Zap, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LandingPage = () => {
  const { t } = useTranslation();

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
              {t("landing.hero.title")}
              <br />
              <span className="text-primary">{t("landing.hero.titleHighlight")}</span>
            </h1>
            <p className="mt-4 max-w-[560px] text-base text-muted-foreground md:text-lg">
              {t("landing.hero.description")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="sm"
                onClick={scrollToDemo}
                className="rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {t("landing.hero.cta")}
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-md border-primary px-5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/book-demo">{t("landing.hero.ctaSecondary")}</Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-10">
              <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t("landing.hero.trustedBy")}
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
                <span className="text-sm text-muted-foreground">{t("landing.screenshot")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 2: PROBLEM ===== */}
        <section className="w-full bg-muted/40 px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[960px]">
            <h2 className="mx-auto mb-10 max-w-[600px] text-center text-xl font-semibold text-foreground md:text-2xl">
              {t("landing.problem.title")}
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              <ProblemCard
                icon="📊"
                title={t("landing.problem.card1Title")}
                body={t("landing.problem.card1Body")}
              />
              <ProblemCard
                icon="⏰"
                title={t("landing.problem.card2Title")}
                body={t("landing.problem.card2Body")}
              />
              <ProblemCard
                icon="❓"
                title={t("landing.problem.card3Title")}
                body={t("landing.problem.card3Body")}
              />
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: SOLUTION (3 PILLARS) ===== */}
        <section className="w-full bg-background px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[960px]">
            <h2 className="mb-12 text-center text-xl font-semibold text-foreground md:text-2xl">
              {t("landing.solution.title")}
            </h2>

            {/* Pillar 1 */}
            <div className="mb-14 grid items-center gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <Badge variant="outline" className="mb-3 border-primary/30 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {t("landing.solution.pillar1Badge")}
                </Badge>
                <h3 className="mb-2 text-lg font-semibold text-foreground md:text-xl">
                  {t("landing.solution.pillar1Title")}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t("landing.solution.pillar1Description")}
                </p>
                <ul className="mb-4 space-y-1.5">
                  <FeatureItem text={t("landing.solution.pillar1Feature1")} />
                  <FeatureItem text={t("landing.solution.pillar1Feature2")} />
                  <FeatureItem text={t("landing.solution.pillar1Feature3")} />
                </ul>
                <Link
                  to="/product#detection"
                  className="text-sm font-medium text-primary underline hover:text-primary/80 hover:no-underline"
                >
                  {t("common.learnMore")}
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
                  {t("landing.solution.pillar2Badge")}
                </Badge>
                <h3 className="mb-2 text-lg font-semibold text-foreground md:text-xl">
                  {t("landing.solution.pillar2Title")}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t("landing.solution.pillar2Description")}
                </p>
                <ul className="mb-4 space-y-1.5">
                  <FeatureItem text={t("landing.solution.pillar2Feature1")} />
                  <FeatureItem text={t("landing.solution.pillar2Feature2")} />
                  <FeatureItem text={t("landing.solution.pillar2Feature3")} />
                </ul>
                <Link
                  to="/product#interpretation"
                  className="text-sm font-medium text-primary underline hover:text-primary/80 hover:no-underline"
                >
                  {t("common.learnMore")}
                </Link>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="grid items-center gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <Badge variant="outline" className="mb-3 border-amber-500/30 bg-amber-500/5 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                  {t("landing.solution.pillar3Badge")}
                </Badge>
                <h3 className="mb-2 text-lg font-semibold text-foreground md:text-xl">
                  {t("landing.solution.pillar3Title")}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t("landing.solution.pillar3Description")}
                </p>
                <ul className="mb-4 space-y-1.5">
                  <FeatureItem text={t("landing.solution.pillar3Feature1")} />
                  <FeatureItem text={t("landing.solution.pillar3Feature2")} />
                  <FeatureItem text={t("landing.solution.pillar3Feature3")} />
                </ul>
                <Link
                  to="/product#memory"
                  className="text-sm font-medium text-primary underline hover:text-primary/80 hover:no-underline"
                >
                  {t("common.learnMore")}
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
              {t("landing.demo.title")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <DemoCard
                icon={<Scale className="h-8 w-8" />}
                title={t("landing.demo.legal")}
                subtitle={t("landing.demo.legalSubtitle")}
                href="/demo/legal"
                ctaText={t("landing.demo.seeDemo")}
              />
              <DemoCard
                icon={<Building2 className="h-8 w-8" />}
                title={t("landing.demo.banking")}
                subtitle={t("landing.demo.bankingSubtitle")}
                href="/demo/banking"
                ctaText={t("landing.demo.seeDemo")}
              />
              <DemoCard
                icon={<Zap className="h-8 w-8" />}
                title={t("landing.demo.energy")}
                subtitle={t("landing.demo.energySubtitle")}
                href="/demo/energy"
                ctaText={t("landing.demo.seeDemo")}
              />
              <DemoCard
                icon={<Radio className="h-8 w-8" />}
                title={t("landing.demo.telecoms")}
                subtitle={t("landing.demo.telecomsSubtitle")}
                href="/demo/telecoms"
                ctaText={t("landing.demo.seeDemo")}
              />
            </div>
            <p className="mt-6 text-center">
              <Link
                to="/contact"
                className="text-sm text-background/70 underline hover:text-background"
              >
                {t("landing.demo.notYourSector")}
              </Link>
            </p>
          </div>
        </section>

        {/* ===== SECTION 5: METRICS ===== */}
        <section className="w-full bg-background px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[960px]">
            <h2 className="mb-10 text-center text-xl font-semibold text-foreground md:text-2xl">
              {t("landing.metrics.title")}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard number={t("landing.metrics.metric1Value")} label={t("landing.metrics.metric1Label")} />
              <MetricCard number={t("landing.metrics.metric2Value")} label={t("landing.metrics.metric2Label")} />
              <MetricCard number={t("landing.metrics.metric3Value")} label={t("landing.metrics.metric3Label")} />
              <MetricCard number={t("landing.metrics.metric4Value")} label={t("landing.metrics.metric4Label")} />
            </div>
          </div>
        </section>

        {/* ===== SECTION 6: FINAL CTA ===== */}
        <section className="w-full bg-muted/40 px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto flex max-w-[600px] flex-col items-center text-center">
            <h2 className="text-xl font-semibold text-foreground md:text-2xl">
              {t("landing.cta.title")}
            </h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="sm"
                className="rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Link to="/book-demo">{t("landing.cta.primary")}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-md border-primary px-5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/contact?type=analysis">{t("landing.cta.secondary")}</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("landing.cta.pilot")}
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
  ctaText,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
  ctaText: string;
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
        {ctaText}
      </Button>
    </Card>
  </Link>
);

export default LandingPage;
