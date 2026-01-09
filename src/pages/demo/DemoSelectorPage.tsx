import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Scale, Landmark, Zap, Radio, ArrowRight } from "lucide-react";

const sectors = [
  {
    icon: Scale,
    title: "LEGAL",
    description: "Bufets d'advocats, consultories legals, departaments mercantil, compliance, fiscal i laboral.",
    companyName: "Bufet Jurídic García & Asociados",
    companyDetails: "Barcelona · 50 advocats",
    badges: ["12 alertes/setmana", "5 àrees compliance"],
    link: "/demo/legal",
  },
  {
    icon: Landmark,
    title: "BANCA & FINANCES",
    description: "Entitats financeres, bancs, caixes, gestores d'actius, cooperatives de crèdit, fintech regulades.",
    companyName: "Banco Nacional SA",
    companyDetails: "Madrid · 2.500 empleats",
    badges: ["18 alertes/setmana", "Banking, CNMV"],
    link: "/demo/banking",
  },
  {
    icon: Zap,
    title: "ENERGIA",
    description: "Generació, distribució i comercialització d'energia elèctrica i gas. Renovables, convencional.",
    companyName: "Ibérica Energía Renovable SL",
    companyDetails: "València · 800 empleats",
    badges: ["10 alertes/setmana", "Ambiental, Energia"],
    link: "/demo/energy",
  },
  {
    icon: Radio,
    title: "TELECOMS",
    description: "Operadores de telefonia, ISPs, infraestructures de xarxa, cable, fibra, 5G.",
    companyName: "TeleConnect España SAU",
    companyDetails: "Madrid · 5.000 empleats",
    badges: ["14 alertes/setmana", "Telecoms, CNMC"],
    link: "/demo/telecoms",
  },
];

const DemoSelectorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-background py-12 md:py-16 px-4 md:px-8">
          <div className="mx-auto max-w-[680px] text-center">
            <h1 className="text-2xl font-bold leading-tight text-foreground mb-3 md:text-[36px]">
              Veure PREMSA.IO en acció pel teu sector
            </h1>
            <p className="text-base text-muted-foreground max-w-[560px] mx-auto">
              Tria el teu sector i explora una demo amb dades reals (fictícies) per entendre com funcionaria per la teva empresa.
            </p>
          </div>
        </section>

        {/* Sector Cards Section */}
        <section className="bg-muted/40 py-10 md:py-14 px-4 md:px-8">
          <div className="mx-auto max-w-[880px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {sectors.map((sector) => (
                <SectorCard key={sector.title} {...sector} />
              ))}
            </div>
          </div>
        </section>

        {/* No trobes el teu sector? Section */}
        <section className="bg-background py-10 md:py-14 px-4 md:px-8">
          <div className="mx-auto max-w-[520px] text-center">
            <h2 className="text-lg font-semibold text-foreground mb-3 md:text-xl">
              No trobes el teu sector?
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              PREMSA.IO s'adapta a qualsevol sector altament regulat: Pharma, Seguros, Transport, Construcció, etc.
            </p>
            <Button asChild size="sm" className="rounded-md text-sm font-medium">
              <Link to="/contact?type=custom-demo">
                Contacta'ns per una demo personalitzada
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Alternative CTA Section */}
        <section className="bg-primary/5 py-8 md:py-10 px-4 md:px-8">
          <div className="mx-auto max-w-[440px] text-center">
            <p className="text-sm text-muted-foreground mb-4">
              O si prefereixes experimentar tu mateix:
            </p>
            <Button asChild variant="outline" size="sm" className="rounded-md text-sm font-medium border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/playground">
                Provar Playground Interactiu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Reset automàtic quan surts - zero risc.
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
}

const SectorCard = ({ icon: Icon, title, description, companyName, companyDetails, badges, link }: SectorCardProps) => {
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
            Demo company:
          </p>
          <p className="text-sm font-semibold text-primary">
            {companyName}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {companyDetails}
          </p>
        </div>
        
        <Button size="sm" className="w-full rounded-md text-sm font-medium group-hover:bg-primary/90">
          Veure Demo
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
