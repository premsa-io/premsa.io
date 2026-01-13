import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Scale, Landmark, Zap, Radio, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const DemoSelectorPage = () => {
  const { t } = useTranslation();

  const sectors = [
    {
      icon: Scale,
      titleKey: "demo.sectors.legal.title",
      descriptionKey: "demo.sectors.legal.description",
      companyNameKey: "demo.sectors.legal.companyName",
      companyDetailsKey: "demo.sectors.legal.companyDetails",
      badges: [
        t("demo.badges.alertsWeek", { count: 12 }),
        t("demo.badges.complianceAreas", { count: 5 }),
      ],
      link: "/demo/legal",
    },
    {
      icon: Landmark,
      titleKey: "demo.sectors.banking.title",
      descriptionKey: "demo.sectors.banking.description",
      companyNameKey: "demo.sectors.banking.companyName",
      companyDetailsKey: "demo.sectors.banking.companyDetails",
      badges: [
        t("demo.badges.alertsWeek", { count: 18 }),
        "Banking, CNMV",
      ],
      link: "/demo/banking",
    },
    {
      icon: Zap,
      titleKey: "demo.sectors.energy.title",
      descriptionKey: "demo.sectors.energy.description",
      companyNameKey: "demo.sectors.energy.companyName",
      companyDetailsKey: "demo.sectors.energy.companyDetails",
      badges: [
        t("demo.badges.alertsWeek", { count: 10 }),
        t("demo.badges.areas", { defaultValue: "Ambiental, Energía" }),
      ],
      link: "/demo/energy",
    },
    {
      icon: Radio,
      titleKey: "demo.sectors.telecoms.title",
      descriptionKey: "demo.sectors.telecoms.description",
      companyNameKey: "demo.sectors.telecoms.companyName",
      companyDetailsKey: "demo.sectors.telecoms.companyDetails",
      badges: [
        t("demo.badges.alertsWeek", { count: 14 }),
        "Telecoms, CNMC",
      ],
      link: "/demo/telecoms",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-background py-12 md:py-16 px-4 md:px-8">
          <div className="mx-auto max-w-[680px] text-center">
            <h1 className="text-2xl font-bold leading-tight text-foreground mb-3 md:text-[36px]">
              {t("demo.hero.title")}
            </h1>
            <p className="text-base text-muted-foreground max-w-[560px] mx-auto">
              {t("demo.hero.description")}
            </p>
          </div>
        </section>

        {/* Sector Cards Section */}
        <section className="bg-muted/40 py-10 md:py-14 px-4 md:px-8">
          <div className="mx-auto max-w-[880px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {sectors.map((sector) => (
                <SectorCard
                  key={sector.titleKey}
                  icon={sector.icon}
                  title={t(sector.titleKey)}
                  description={t(sector.descriptionKey)}
                  companyName={t(sector.companyNameKey)}
                  companyDetails={t(sector.companyDetailsKey)}
                  badges={sector.badges}
                  link={sector.link}
                  ctaText={t("demo.seeDemo")}
                  demoCompanyLabel={t("demo.demoCompany")}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Not your sector? Section */}
        <section className="bg-background py-10 md:py-14 px-4 md:px-8">
          <div className="mx-auto max-w-[520px] text-center">
            <h2 className="text-lg font-semibold text-foreground mb-3 md:text-xl">
              {t("demo.notYourSector.title")}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {t("demo.notYourSector.description")}
            </p>
            <Button asChild size="sm" className="rounded-md text-sm font-medium">
              <Link to="/contact?type=custom-demo">
                {t("demo.notYourSector.cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Alternative CTA Section */}
        <section className="bg-primary/5 py-8 md:py-10 px-4 md:px-8">
          <div className="mx-auto max-w-[440px] text-center">
            <p className="text-sm text-muted-foreground mb-4">
              {t("demo.playground.prefix")}
            </p>
            <Button asChild variant="outline" size="sm" className="rounded-md text-sm font-medium border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/playground">
                {t("demo.playground.cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              {t("demo.playground.suffix")}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

interface SectorCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  companyName: string;
  companyDetails: string;
  badges: string[];
  link: string;
  ctaText: string;
  demoCompanyLabel: string;
}

const SectorCard = ({
  icon: Icon,
  title,
  description,
  companyName,
  companyDetails,
  badges,
  link,
  ctaText,
  demoCompanyLabel,
}: SectorCardProps) => {
  return (
    <Link to={link} className="block group">
      <Card className="p-5 h-full bg-card hover:shadow-md transition-all cursor-pointer">
        <Icon className="h-10 w-10 text-primary mb-4" />
        
        <h3 className="text-lg font-semibold tracking-wide text-foreground mb-2">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        
        {/* Demo Company */}
        <div className="border-t border-border pt-4 mb-4">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {demoCompanyLabel}
          </p>
          <p className="text-sm font-semibold text-primary">
            {companyName}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {companyDetails}
          </p>
        </div>
        
        <Button size="sm" className="w-full rounded-md text-sm font-medium group-hover:bg-primary/90">
          {ctaText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        
        {/* Feature Badges */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {badges.map((badge) => (
            <Badge key={badge} variant="outline" className="bg-muted/50 text-muted-foreground text-[10px]">
              {badge}
            </Badge>
          ))}
        </div>
      </Card>
    </Link>
  );
};

export default DemoSelectorPage;
