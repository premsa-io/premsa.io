import { useTranslation } from "react-i18next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Eye, Users, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* SECTION 1: Hero About */}
        <section className="bg-background py-12 md:py-16 px-4 md:px-8">
          <div className="mx-auto max-w-[640px] text-center">
            <h1 className="text-3xl font-bold leading-tight text-foreground md:text-[42px] mb-4">
              {t("about.hero.title")}
            </h1>
            <p className="text-base text-muted-foreground max-w-[560px] mx-auto">
              {t("about.hero.description")}
            </p>
          </div>
        </section>

        {/* SECTION 2: Our Story */}
        <section className="bg-muted/40 py-12 md:py-16 px-4 md:px-8">
          <div className="mx-auto max-w-[880px]">
            <h2 className="text-xl font-semibold text-foreground text-center mb-10 md:text-2xl">
              {t("about.story.title")}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left Column - Image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-4xl mb-2">📰</div>
                  <p className="text-muted-foreground text-xs">{t("about.story.imageAlt")}</p>
                </div>
              </div>

              {/* Right Column - Text */}
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t("about.story.paragraph1")}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t("about.story.paragraph2")}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t("about.story.paragraph3")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Mission & Values */}
        <section className="bg-background py-12 md:py-16 px-4 md:px-8">
          <div className="mx-auto max-w-[880px]">
            <h2 className="text-xl font-semibold text-foreground text-center mb-8 md:text-2xl">
              {t("about.mission.title")}
            </h2>

            {/* Mission Statement */}
            <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-5 max-w-[640px] mx-auto mb-10">
              <p className="text-sm font-medium leading-relaxed text-foreground">
                {t("about.mission.statement")}
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <ValueCard
                icon={<Award className="w-8 h-8 text-primary" />}
                title={t("about.values.excellence")}
                description={t("about.values.excellenceDesc")}
              />
              <ValueCard
                icon={<Eye className="w-8 h-8 text-primary" />}
                title={t("about.values.transparency")}
                description={t("about.values.transparencyDesc")}
              />
              <ValueCard
                icon={<Users className="w-8 h-8 text-primary" />}
                title={t("about.values.clientFirst")}
                description={t("about.values.clientFirstDesc")}
              />
            </div>
          </div>
        </section>

        {/* SECTION 4: Team */}
        <section className="bg-muted/40 py-12 md:py-16 px-4 md:px-8">
          <div className="mx-auto max-w-[880px]">
            <h2 className="text-xl font-semibold text-foreground text-center mb-10 md:text-2xl">
              {t("about.team.title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TeamMemberCard
                name="Ferran García"
                role="Founder & CEO"
                bio={t("about.team.member1Bio")}
                linkedinUrl="#"
              />
              <TeamMemberCard
                name="Marc Puig"
                role="CTO"
                bio={t("about.team.member2Bio")}
                linkedinUrl="#"
              />
              <TeamMemberCard
                name="Anna Martínez"
                role="Head of Legal Intelligence"
                bio={t("about.team.member3Bio")}
                linkedinUrl="#"
              />
            </div>
          </div>
        </section>

        {/* SECTION 5: Backed By (Bootstrapped) */}
        <section className="bg-background py-10 md:py-12 px-4 md:px-8">
          <div className="mx-auto max-w-[520px] text-center">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              {t("about.bootstrapped.title")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("about.bootstrapped.description")}
            </p>
          </div>
        </section>

        {/* SECTION 6: Join Us */}
        <section className="bg-primary py-10 md:py-12 px-4 md:px-8">
          <div className="mx-auto max-w-[560px] text-center">
            <h2 className="text-xl font-semibold text-primary-foreground mb-4 md:text-2xl">
              {t("about.cta.title")}
            </h2>
            <p className="text-sm text-primary-foreground/80 max-w-[480px] mx-auto mb-6">
              {t("about.cta.description")}
            </p>
            <Button 
              size="sm" 
              variant="secondary"
              className="text-sm font-medium"
              asChild
            >
              <Link to="/contact">
                {t("about.cta.button")}
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