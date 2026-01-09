import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const integrations = [
    "Slack",
    "Teams",
    "Email",
    "Salesforce",
    "API REST",
    "Webhooks",
  ];

  const securityFeatures = [
    t("product.security.feature1"),
    t("product.security.feature2"),
    t("product.security.feature3"),
    t("product.security.feature4"),
    t("product.security.feature5"),
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* ===== SECTION 1: HERO PRODUCT ===== */}
        <section className="w-full bg-background px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[720px] text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-[42px]">
              {t("product.hero.title")}
            </h1>
            <p className="mx-auto mt-3 max-w-[580px] text-base text-muted-foreground">
              {t("product.hero.description")}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="sm"
                className="rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Link to="/demo">{t("product.hero.ctaDemo")}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-md border-primary px-5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/playground">{t("product.hero.ctaPlayground")}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ===== SECTION 2: HOW IT WORKS ===== */}
        <section className="w-full bg-muted/40 px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-[880px]">
            <h2 className="mb-10 text-center text-xl font-semibold text-foreground md:text-2xl">
              {t("product.howItWorks.title")}
            </h2>

            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
              {/* Step 1 */}
              <div className="flex flex-1 flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Radar className="h-8 w-8 text-primary" />
                </div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {t("product.howItWorks.step")} 1
                </p>
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  {t("product.howItWorks.step1Title")}
                </h3>
                <p className="mx-auto max-w-[220px] text-sm text-muted-foreground">
                  {t("product.howItWorks.step1Description")}
                </p>
                <p className="mt-2 text-xs font-medium text-muted-foreground">
                  {t("product.howItWorks.step1Meta")}
                </p>
              </div>

              <div className="hidden items-center md:flex">
                <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
              </div>

              {/* Step 2 */}
              <div className="flex flex-1 flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10">
                  <Brain className="h-8 w-8 text-cyan-600" />
                </div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-600">
                  {t("product.howItWorks.step")} 2
                </p>
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  {t("product.howItWorks.step2Title")}
                </h3>
                <p className="mx-auto max-w-[220px] text-sm text-muted-foreground">
                  {t("product.howItWorks.step2Description")}
                </p>
                <p className="mt-2 text-xs font-medium text-muted-foreground">
                  {t("product.howItWorks.step2Meta")}
                </p>
              </div>

              <div className="hidden items-center md:flex">
                <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
              </div>

              {/* Step 3 */}
              <div className="flex flex-1 flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10">
                  <Bell className="h-8 w-8 text-amber-600" />
                </div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-amber-600">
                  {t("product.howItWorks.step")} 3
                </p>
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  {t("product.howItWorks.step3Title")}
                </h3>
                <p className="mx-auto max-w-[220px] text-sm text-muted-foreground">
                  {t("product.howItWorks.step3Description")}
                </p>
                <p className="mt-2 text-xs font-medium text-muted-foreground">
                  {t("product.howItWorks.step3Meta")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: FEATURES DEEP DIVE ===== */}
        <section className="w-full bg-background px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-[880px]">
            <h2 className="mb-10 text-center text-xl font-semibold text-foreground md:text-2xl">
              {t("product.features.title")}
            </h2>

            {/* Pillar 1: Detection */}
            <div id="detection" className="mb-12 grid items-center gap-6 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <Badge variant="outline" className="mb-2 border-primary/30 bg-primary/5 px-2 py-0.5 text-xs font-medium text-primary">
                  {t("product.features.detectionBadge")}
                </Badge>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {t("product.features.detectionTitle")}
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  {t("product.features.detectionDescription")}
                </p>
                <ul className="mb-3 space-y-1.5">
                  <FeatureItem text={t("product.features.detectionFeature1")} />
                  <FeatureItem text={t("product.features.detectionFeature2")} />
                  <FeatureItem text={t("product.features.detectionFeature3")} />
                  <FeatureItem text={t("product.features.detectionFeature4")} />
                </ul>
                <Link
                  to="/demo"
                  className="text-sm font-medium text-primary underline hover:text-primary/80 hover:no-underline"
                >
                  {t("product.features.detectionCta")}
                </Link>
              </div>
              <div className="lg:col-span-2">
                <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-gradient-to-br from-primary/5 to-muted">
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-xs text-muted-foreground">Dashboard Alerts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2: Interpretation */}
            <div id="interpretation" className="mb-12 grid items-center gap-6 lg:grid-cols-5">
              <div className="order-2 lg:order-1 lg:col-span-2">
                <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-gradient-to-br from-cyan-500/5 to-muted">
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-xs text-muted-foreground">Legal Bedrock</span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 lg:col-span-3">
                <Badge variant="outline" className="mb-2 border-cyan-500/30 bg-cyan-500/5 px-2 py-0.5 text-xs font-medium text-cyan-700">
                  {t("product.features.interpretationBadge")}
                </Badge>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {t("product.features.interpretationTitle")}
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  {t("product.features.interpretationDescription")}
                </p>
                <ul className="mb-3 space-y-1.5">
                  <FeatureItem text={t("product.features.interpretationFeature1")} />
                  <FeatureItem text={t("product.features.interpretationFeature2")} />
                  <FeatureItem text={t("product.features.interpretationFeature3")} />
                  <FeatureItem text={t("product.features.interpretationFeature4")} />
                </ul>
                <Link
                  to="/demo"
                  className="text-sm font-medium text-primary underline hover:text-primary/80 hover:no-underline"
                >
                  {t("product.features.interpretationCta")}
                </Link>
              </div>
            </div>

            {/* Pillar 3: Memory */}
            <div id="memory" className="grid items-center gap-6 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <Badge variant="outline" className="mb-2 border-amber-500/30 bg-amber-500/5 px-2 py-0.5 text-xs font-medium text-amber-700">
                  {t("product.features.memoryBadge")}
                </Badge>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {t("product.features.memoryTitle")}
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  {t("product.features.memoryDescription")}
                </p>
                <ul className="mb-3 space-y-1.5">
                  <FeatureItem text={t("product.features.memoryFeature1")} />
                  <FeatureItem text={t("product.features.memoryFeature2")} />
                  <FeatureItem text={t("product.features.memoryFeature3")} />
                  <FeatureItem text={t("product.features.memoryFeature4")} />
                </ul>
                <Link
                  to="/demo"
                  className="text-sm font-medium text-primary underline hover:text-primary/80 hover:no-underline"
                >
                  {t("product.features.memoryCta")}
                </Link>
              </div>
              <div className="lg:col-span-2">
                <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-gradient-to-br from-amber-500/5 to-muted">
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-xs text-muted-foreground">Personalized Dashboard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 4: INTEGRATIONS ===== */}
        <section id="integrations" className="w-full bg-background px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-[880px]">
            <h2 className="mb-6 text-center text-xl font-semibold text-foreground md:text-2xl">
              {t("product.integrations.title")}
            </h2>

            <div className="mx-auto mb-8 grid max-w-[640px] grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {integrations.map((integration) => (
                <Card
                  key={integration}
                  className="flex aspect-square items-center justify-center rounded-lg border border-border bg-muted/30 p-3 transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  <span className="text-xs font-medium text-muted-foreground">
                    {integration}
                  </span>
                </Card>
              ))}
            </div>

            <Card className="mx-auto max-w-[520px] rounded-lg border border-primary/20 bg-primary/5 p-5 text-center">
              <h3 className="mb-2 text-sm font-semibold text-primary">
                {t("product.integrations.apiTitle")}
              </h3>
              <p className="mb-3 text-xs text-muted-foreground">
                {t("product.integrations.apiDescription")}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-xs text-primary hover:bg-primary hover:text-primary-foreground"
              >
                {t("product.integrations.apiCta")}
              </Button>
            </Card>
          </div>
        </section>

        {/* ===== SECTION 5: SECURITY ===== */}
        <section id="security" className="w-full bg-foreground px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-[880px]">
            <h2 className="mb-8 text-center text-xl font-semibold text-background md:text-2xl">
              {t("product.security.title")}
            </h2>

            <div className="mx-auto mb-8 grid max-w-[720px] grid-cols-2 gap-4 md:grid-cols-4">
              <SecurityBadge icon={<Lock className="h-6 w-6" />} title={t("product.security.gdpr")} subtitle={t("product.security.gdprSubtitle")} />
              <SecurityBadge icon={<Shield className="h-6 w-6" />} title={t("product.security.soc2")} subtitle={t("product.security.soc2Subtitle")} />
              <SecurityBadge icon={<FileCheck className="h-6 w-6" />} title={t("product.security.iso")} subtitle={t("product.security.isoSubtitle")} />
              <SecurityBadge icon={<FileText className="h-6 w-6" />} title={t("product.security.dpa")} subtitle={t("product.security.dpaSubtitle")} />
            </div>

            <div className="mx-auto max-w-[520px] space-y-2">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" />
                  <span className="text-sm text-background/80">{feature}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center">
              <a
                href="#"
                className="text-sm font-medium text-background underline hover:text-background/80"
              >
                {t("product.security.whitepaper")}
              </a>
            </p>
          </div>
        </section>

        {/* ===== SECTION 6: FINAL CTA ===== */}
        <section className="w-full bg-primary/5 px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-[560px] text-center">
            <h2 className="text-xl font-semibold text-foreground md:text-2xl">
              {t("product.cta.title")}
            </h2>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="sm"
                className="rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Link to="/book-demo">{t("product.cta.demo")}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-md border-primary px-5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/playground">{t("product.cta.playground")}</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="px-5 text-sm font-medium text-primary hover:text-primary/80"
              >
                <Link to="/pricing">{t("product.cta.pricing")}</Link>
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
  <li className="flex items-start gap-2">
    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
    <span className="text-sm text-muted-foreground">{text}</span>
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
  <div className="flex flex-col items-center rounded-lg bg-background/10 p-4 text-center">
    <div className="mb-2 text-background">{icon}</div>
    <p className="text-sm font-semibold text-background">{title}</p>
    <p className="text-xs text-background/70">{subtitle}</p>
  </div>
);

export default ProductPage;
