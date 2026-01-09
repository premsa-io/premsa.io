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
    companyDetails: "Barcelona · 50 advocats · Especialitat: Fiscal, Mercantil, Laboral",
    badges: ["12 alertes/setmana", "5 àrees compliance", "BOE + DOGC"],
    link: "/demo/legal",
  },
  {
    icon: Landmark,
    title: "BANCA & FINANCES",
    description: "Entitats financeres, bancs, caixes, gestores d'actius, cooperatives de crèdit, fintech regulades.",
    companyName: "Banco Nacional SA",
    companyDetails: "Madrid · 2.500 empleats · Licència bancària Banc d'Espanya",
    badges: ["18 alertes/setmana", "Banking, CNMV, Fiscal", "BOE + Directivas UE"],
    link: "/demo/banking",
  },
  {
    icon: Zap,
    title: "ENERGIA",
    description: "Generació, distribució i comercialització d'energia elèctrica i gas. Renovables, convencional, xarxes.",
    companyName: "Ibérica Energía Renovable SL",
    companyDetails: "València · 800 empleats · Parcs eòlics i solars",
    badges: ["10 alertes/setmana", "Ambiental, Energia, Fiscal", "BOE + DOCV + UE"],
    link: "/demo/energy",
  },
  {
    icon: Radio,
    title: "TELECOMS",
    description: "Operadores de telefonia, ISPs, infraestructures de xarxa, cable, fibra, 5G.",
    companyName: "TeleConnect España SAU",
    companyDetails: "Madrid · 5.000 empleats · Operador nacional",
    badges: ["14 alertes/setmana", "Telecoms, CNMC, Fiscal", "BOE + Directivas UE"],
    link: "/demo/telecoms",
  },
];

const DemoSelectorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-background py-16 md:py-24 px-6 md:px-12">
          <div className="mx-auto max-w-[900px] text-center">
            <h1 className="font-manrope font-extrabold text-4xl md:text-6xl leading-tight tracking-tight text-foreground mb-6">
              Veure PREMSA.IO en acció pel teu sector
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-[800px] mx-auto">
              Tria el teu sector i explora una demo amb dades reals (fictícies) per entendre com funcionaria per la teva empresa.
            </p>
          </div>
        </section>

        {/* Sector Cards Section */}
        <section className="bg-muted/50 py-16 md:py-24 px-6 md:px-12">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sectors.map((sector) => (
                <SectorCard key={sector.title} {...sector} />
              ))}
            </div>
          </div>
        </section>

        {/* No trobes el teu sector? Section */}
        <section className="bg-background py-16 md:py-24 px-6 md:px-12">
          <div className="mx-auto max-w-[700px] text-center">
            <h2 className="font-manrope font-bold text-3xl md:text-4xl text-foreground mb-6">
              No trobes el teu sector?
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-10">
              PREMSA.IO s'adapta a qualsevol sector altament regulat: Pharma, Seguros, Transport, Construcció, Educació, Hostaleria, etc.
            </p>
            <Button asChild size="lg" className="rounded-xl px-8 py-6 text-base font-semibold">
              <Link to="/contact?type=custom-demo">
                Contacta'ns per una demo personalitzada
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Alternative CTA Section */}
        <section className="bg-primary/5 py-12 md:py-16 px-6 md:px-12">
          <div className="mx-auto max-w-[600px] text-center">
            <p className="text-muted-foreground mb-6">
              O si prefereixes experimentar tu mateix:
            </p>
            <Button asChild variant="outline" size="lg" className="rounded-xl px-8 py-6 text-base font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/playground">
                Provar Playground Interactiu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Configura àrees de compliance, veu alertes simulades, explora el dashboard. Reset automàtic quan surts - zero risc.
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
      <Card className="p-10 h-full bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <Icon className="h-16 w-16 text-primary mb-6" />
        
        <h3 className="font-manrope font-bold text-2xl md:text-3xl tracking-wide text-foreground mb-3">
          {title}
        </h3>
        
        <p className="text-base leading-relaxed text-muted-foreground mb-6">
          {description}
        </p>
        
        {/* Demo Company */}
        <div className="border-t border-border pt-5 mb-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
            Demo company:
          </p>
          <p className="font-manrope font-semibold text-lg text-primary">
            {companyName}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {companyDetails}
          </p>
        </div>
        
        <Button className="w-full rounded-lg py-6 text-base font-semibold group-hover:bg-primary/90">
          Veure Demo
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        {/* Feature Badges */}
        <div className="flex flex-wrap gap-2 mt-5">
          {badges.map((badge) => (
            <Badge key={badge} variant="outline" className="bg-muted/50 text-muted-foreground text-xs">
              {badge}
            </Badge>
          ))}
        </div>
      </Card>
    </Link>
  );
};

export default DemoSelectorPage;
