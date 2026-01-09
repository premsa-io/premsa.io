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
        <section className="bg-white py-16 md:py-24 px-6 md:px-12">
          <div className="mx-auto max-w-[800px] text-center">
            <h1 className="font-heading font-extrabold text-[38px] md:text-[56px] leading-[1.1] text-foreground mb-8">
              Qui som i per què existim
            </h1>
            <p className="font-sans text-lg md:text-xl leading-relaxed text-muted-foreground max-w-[900px] mx-auto">
              La intel·ligència regulatòria no hauria de ser un luxe reservat per les Fortune 500. 
              La vam crear per empreses espanyoles que necessiten anticipar-se, no reaccionar.
            </p>
          </div>
        </section>

        {/* SECTION 2: Our Story */}
        <section className="bg-muted py-24 md:py-32 px-6 md:px-12">
          <div className="mx-auto max-w-[1100px]">
            <h2 className="font-heading font-bold text-[32px] md:text-[40px] text-foreground text-center mb-16">
              La nostra història
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              {/* Left Column - Image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl shadow-xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">📰</div>
                  <p className="text-muted-foreground text-sm">Imatge il·lustrativa</p>
                </div>
              </div>

              {/* Right Column - Text */}
              <div>
                <p className="font-sans text-lg leading-[1.7] text-muted-foreground mb-6">
                  PREMSA.IO va néixer de la frustració. Després de veure com desenes d'empreses 
                  espanyoles rebien multes de sis i set xifres per canvis normatius que podrien 
                  haver anticipat, vam decidir que havia d'existir una solució millor.
                </p>
                <p className="font-sans text-lg leading-[1.7] text-muted-foreground mb-6">
                  El problema no era que no existissin professionals capacitats. El problema era 
                  el volum: 150+ documents normatius publicats cada dia entre BOE i les 17 comunitats 
                  autònomes. Cap equip legal, per més gran que sigui, pot processar això eficaçment.
                </p>
                <p className="font-sans text-lg leading-[1.7] text-muted-foreground mb-6">
                  Així que construïm PREMSA.IO: una plataforma que combina la velocitat de la 
                  tecnologia amb la profunditat d'anàlisi d'una consultora. No substituïm advocats 
                  ni compliance officers. Els equipem amb intel·ligència que els permet fer la 
                  seva feina 10 vegades millor.
                </p>
                <p className="font-sans text-lg leading-[1.7] text-muted-foreground">
                  Avui, PREMSA.IO serveix empreses de tots els sectors altament regulats a Espanya, 
                  des de banca fins energia, des de legal fins telecoms. I només estem començant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Mission & Values */}
        <section className="bg-white py-24 md:py-32 px-6 md:px-12">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="font-heading font-bold text-[32px] md:text-[40px] text-foreground text-center mb-16">
              La nostra missió i valors
            </h2>

            {/* Mission Statement */}
            <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-8 max-w-[900px] mx-auto mb-20">
              <p className="font-sans font-medium text-xl leading-relaxed text-foreground">
                Democratitzar l'accés a intel·ligència regulatòria d'alt nivell per totes les 
                empreses espanyoles, no només les més grans. Volem que cap empresa rebi mai una 
                multa o perdi una oportunitat per no estar al dia amb els canvis normatius.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ValueCard
                icon={<Award className="w-12 h-12 text-primary" />}
                title="Excellence"
                description="No fem compromissos amb la qualitat. Cada alerta, cada anàlisi, cada report ha de ser impecable. Si no estem orgullosos del resultat, no surt."
              />
              <ValueCard
                icon={<Eye className="w-12 h-12 text-primary" />}
                title="Transparència"
                description="Pricing obert. Terms clars. Exit clause al mes 3. No lletra petita, no sorpreses. Si alguna cosa no funciona, ho diem. I ho arreglem."
              />
              <ValueCard
                icon={<Users className="w-12 h-12 text-primary" />}
                title="Client-First"
                description="El teu èxit és el nostre èxit. Cada feature, cada decisió de producte, cada interacció de support està dissenyada pensant en com ajudar-te més."
              />
            </div>
          </div>
        </section>

        {/* SECTION 4: Team */}
        <section className="bg-muted py-24 md:py-32 px-6 md:px-12">
          <div className="mx-auto max-w-[1100px]">
            <h2 className="font-heading font-bold text-[32px] md:text-[40px] text-foreground text-center mb-16">
              L'equip
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <TeamMemberCard
                name="Ferran García"
                role="Founder & CEO"
                bio="Ex-consultant estratègic. Construint eines que les empreses necessiten, no les que impressionen a VCs."
                linkedinUrl="#"
              />
              <TeamMemberCard
                name="Marc Puig"
                role="CTO"
                bio="20 anys construint sistemes que no fallen. Obsessionat amb la precisió i l'escalabilitat."
                linkedinUrl="#"
              />
              <TeamMemberCard
                name="Anna Martínez"
                role="Head of Legal Intelligence"
                bio="15 anys en compliance. Sap exactament què necessiten els CLOs perquè ho era."
                linkedinUrl="#"
              />
            </div>
          </div>
        </section>

        {/* SECTION 5: Backed By (Bootstrapped) */}
        <section className="bg-white py-16 md:py-24 px-6 md:px-12">
          <div className="mx-auto max-w-[700px] text-center">
            <h2 className="font-heading font-bold text-[28px] text-foreground mb-4">
              Bootstrapped i orgullosos
            </h2>
            <p className="font-sans text-base leading-relaxed text-muted-foreground">
              Construïm PREMSA.IO sense inversors externs. Això ens permet centrar-nos 100% 
              en el producte i els clients, no en exits artificials o mètriques de vanitat.
            </p>
          </div>
        </section>

        {/* SECTION 6: Join Us */}
        <section className="bg-primary py-16 md:py-24 px-6 md:px-12">
          <div className="mx-auto max-w-[800px] text-center">
            <h2 className="font-heading font-bold text-[32px] md:text-[40px] leading-[1.2] text-primary-foreground mb-8">
              Ajuda'ns a construir el futur de la intel·ligència regulatòria
            </h2>
            <p className="font-sans text-lg leading-relaxed text-primary-foreground/90 max-w-[700px] mx-auto mb-10">
              Busquem persones que vulguin resoldre problemes reals per empreses reals. 
              Si t'emociona la idea de construir eines que realment importen, parlem.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="px-8 py-6 text-base font-semibold"
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
  <Card className="bg-white border border-border rounded-2xl p-10 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <div className="mb-5 flex justify-center">{icon}</div>
    <h3 className="font-heading font-bold text-2xl text-foreground mb-4">{title}</h3>
    <p className="font-sans text-base leading-relaxed text-muted-foreground">{description}</p>
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
    <div className="w-40 h-40 mx-auto mb-5 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-4 border-white shadow-lg flex items-center justify-center">
      <span className="text-4xl">👤</span>
    </div>
    <h3 className="font-heading font-bold text-xl text-foreground mb-1">{name}</h3>
    <p className="font-sans text-[15px] text-muted-foreground mb-3">{role}</p>
    <p className="font-sans text-sm leading-relaxed text-muted-foreground max-w-[280px] mx-auto mb-3">
      {bio}
    </p>
    <a 
      href={linkedinUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block text-primary hover:text-primary/80 transition-colors"
    >
      <Linkedin className="w-5 h-5" />
    </a>
  </div>
);

export default AboutPage;
