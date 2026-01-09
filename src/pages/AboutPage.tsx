import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Eye, Users, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* SECTION 1: Hero About */}
        <section className="bg-background py-12 md:py-16 px-4 md:px-8">
          <div className="mx-auto max-w-[640px] text-center">
            <h1 className="text-3xl font-bold leading-tight text-foreground md:text-[42px] mb-4">
              Qui som i per què existim
            </h1>
            <p className="text-base text-muted-foreground max-w-[560px] mx-auto">
              La intel·ligència regulatòria no hauria de ser un luxe reservat per les Fortune 500. 
              La vam crear per empreses espanyoles que necessiten anticipar-se, no reaccionar.
            </p>
          </div>
        </section>

        {/* SECTION 2: Our Story */}
        <section className="bg-muted/40 py-12 md:py-16 px-4 md:px-8">
          <div className="mx-auto max-w-[880px]">
            <h2 className="text-xl font-semibold text-foreground text-center mb-10 md:text-2xl">
              La nostra història
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left Column - Image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-4xl mb-2">📰</div>
                  <p className="text-muted-foreground text-xs">Imatge il·lustrativa</p>
                </div>
              </div>

              {/* Right Column - Text */}
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  PREMSA.IO va néixer de la frustració. Després de veure com desenes d'empreses 
                  espanyoles rebien multes de sis i set xifres per canvis normatius que podrien 
                  haver anticipat, vam decidir que havia d'existir una solució millor.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  El problema no era que no existissin professionals capacitats. El problema era 
                  el volum: 150+ documents normatius publicats cada dia entre BOE i les 17 comunitats 
                  autònomes. Cap equip legal, per més gran que sigui, pot processar això eficaçment.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Així que construïm PREMSA.IO: una plataforma que combina la velocitat de la 
                  tecnologia amb la profunditat d'anàlisi d'una consultora. No substituïm advocats 
                  ni compliance officers. Els equipem amb intel·ligència que els permet fer la 
                  seva feina 10 vegades millor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Mission & Values */}
        <section className="bg-background py-12 md:py-16 px-4 md:px-8">
          <div className="mx-auto max-w-[880px]">
            <h2 className="text-xl font-semibold text-foreground text-center mb-8 md:text-2xl">
              La nostra missió i valors
            </h2>

            {/* Mission Statement */}
            <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-5 max-w-[640px] mx-auto mb-10">
              <p className="text-sm font-medium leading-relaxed text-foreground">
                Democratitzar l'accés a intel·ligència regulatòria d'alt nivell per totes les 
                empreses espanyoles, no només les més grans.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <ValueCard
                icon={<Award className="w-8 h-8 text-primary" />}
                title="Excellence"
                description="No fem compromissos amb la qualitat. Cada alerta, cada anàlisi ha de ser impecable."
              />
              <ValueCard
                icon={<Eye className="w-8 h-8 text-primary" />}
                title="Transparència"
                description="Pricing obert. Terms clars. Exit clause al mes 3. No lletra petita, no sorpreses."
              />
              <ValueCard
                icon={<Users className="w-8 h-8 text-primary" />}
                title="Client-First"
                description="El teu èxit és el nostre èxit. Cada feature està dissenyada pensant en com ajudar-te."
              />
            </div>
          </div>
        </section>

        {/* SECTION 4: Team */}
        <section className="bg-muted/40 py-12 md:py-16 px-4 md:px-8">
          <div className="mx-auto max-w-[880px]">
            <h2 className="text-xl font-semibold text-foreground text-center mb-10 md:text-2xl">
              L'equip
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TeamMemberCard
                name="Ferran García"
                role="Founder & CEO"
                bio="Ex-consultant estratègic. Construint eines que les empreses necessiten."
                linkedinUrl="#"
              />
              <TeamMemberCard
                name="Marc Puig"
                role="CTO"
                bio="20 anys construint sistemes que no fallen. Obsessionat amb la precisió."
                linkedinUrl="#"
              />
              <TeamMemberCard
                name="Anna Martínez"
                role="Head of Legal Intelligence"
                bio="15 anys en compliance. Sap exactament què necessiten els CLOs."
                linkedinUrl="#"
              />
            </div>
          </div>
        </section>

        {/* SECTION 5: Backed By (Bootstrapped) */}
        <section className="bg-background py-10 md:py-12 px-4 md:px-8">
          <div className="mx-auto max-w-[520px] text-center">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Bootstrapped i orgullosos
            </h2>
            <p className="text-sm text-muted-foreground">
              Construïm PREMSA.IO sense inversors externs. Això ens permet centrar-nos 100% 
              en el producte i els clients.
            </p>
          </div>
        </section>

        {/* SECTION 6: Join Us */}
        <section className="bg-primary py-10 md:py-12 px-4 md:px-8">
          <div className="mx-auto max-w-[560px] text-center">
            <h2 className="text-xl font-semibold text-primary-foreground mb-4 md:text-2xl">
              Ajuda'ns a construir el futur de la intel·ligència regulatòria
            </h2>
            <p className="text-sm text-primary-foreground/80 max-w-[480px] mx-auto mb-6">
              Busquem persones que vulguin resoldre problemes reals per empreses reals.
            </p>
            <Button 
              size="sm" 
              variant="secondary"
              className="text-sm font-medium"
              asChild
            >
              <Link to="/contact">
                Veure Posicions Obertes →
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Helper Components
const ValueCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <Card className="bg-card border border-border rounded-lg p-5 text-center hover:shadow-md transition-shadow">
    <div className="mb-3 flex justify-center">{icon}</div>
    <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </Card>
);

const TeamMemberCard = ({ 
  name, 
  role, 
  bio, 
  linkedinUrl 
}: { 
  name: string; 
  role: string; 
  bio: string;
  linkedinUrl: string;
}) => (
  <div className="text-center">
    {/* Photo placeholder */}
    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-background shadow flex items-center justify-center">
      <span className="text-2xl">👤</span>
    </div>
    <h3 className="text-base font-semibold text-foreground mb-0.5">{name}</h3>
    <p className="text-xs text-muted-foreground mb-2">{role}</p>
    <p className="text-sm text-muted-foreground max-w-[200px] mx-auto mb-2">
      {bio}
    </p>
    <a 
      href={linkedinUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block text-primary hover:text-primary/80 transition-colors"
    >
      <Linkedin className="w-4 h-4" />
    </a>
  </div>
);

export default AboutPage;
