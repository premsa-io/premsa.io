import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { FileText, Download } from "lucide-react";

interface TocItem {
  id: string;
  label: string;
}

interface LegalLayoutProps {
  children: ReactNode;
  title: string;
  lastUpdated: string;
  summary?: string;
  tocItems: TocItem[];
  downloadLabel?: string;
}

const legalNavItems = [
  { label: "Terms & Conditions", path: "/legal/terms" },
  { label: "Privacy Policy", path: "/legal/privacy" },
  { label: "Cookie Policy", path: "/legal/cookies" },
  { label: "Data Processing Agreement", path: "/legal/dpa" },
  { label: "Service Level Agreement", path: "/legal/sla" },
];

const LegalLayout = ({
  children,
  title,
  lastUpdated,
  summary,
  tocItems,
  downloadLabel = "Descarregar com PDF",
}: LegalLayoutProps) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = tocItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tocItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Legal Navigation */}
      <nav className="bg-primary sticky top-0 z-30 border-b border-primary/80 overflow-x-auto">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="flex gap-6 md:gap-8 py-4">
            {legalNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "font-sans text-sm font-medium whitespace-nowrap transition-colors",
                  location.pathname === item.path
                    ? "text-primary-foreground border-b-2 border-accent pb-1"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-white py-12 md:py-16 px-6 md:px-12">
          <div className="mx-auto max-w-[900px] text-center">
            <h1 className="font-heading font-bold text-[36px] md:text-[48px] text-foreground mb-4">
              {title}
            </h1>
            <p className="font-sans text-sm text-muted-foreground">
              Última actualització: {lastUpdated}
            </p>

            {summary && (
              <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6 mt-8 text-left">
                <p className="font-sans text-[15px] leading-relaxed text-foreground">
                  {summary}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-muted py-12 md:py-16 px-6 md:px-12">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 lg:gap-16">
              {/* TOC Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-28 bg-white rounded-xl border border-border p-6">
                  <h3 className="font-heading font-bold text-sm uppercase tracking-wide text-foreground mb-4">
                    Contingut
                  </h3>
                  <nav className="space-y-2">
                    {tocItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                          "block w-full text-left text-sm transition-all duration-200 py-1",
                          activeSection === item.id
                            ? "text-primary font-semibold border-l-2 border-primary pl-3"
                            : "text-muted-foreground hover:text-foreground hover:pl-1"
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Main Content */}
              <article className="bg-white rounded-xl border border-border p-8 md:p-12 shadow-sm">
                <div className="prose prose-lg max-w-none legal-content">
                  {children}
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="bg-white border-t border-border py-8 px-6 md:px-12">
          <div className="mx-auto max-w-[900px] text-center">
            <p className="font-sans text-sm text-muted-foreground mb-4">
              Has llegit aquests Termes? Si tens dubtes, contacta'ns a{" "}
              <a href="mailto:legal@premsa.io" className="text-primary hover:underline">
                legal@premsa.io
              </a>
            </p>
            <button className="inline-flex items-center gap-2 font-sans text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              <Download className="w-4 h-4" />
              {downloadLabel}
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LegalLayout;
