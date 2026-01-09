import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  X,
  LayoutDashboard,
  Bell,
  FileText,
  BarChart3,
  Mail,
  Settings,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  TrendingUp,
  Info,
  Users,
  CheckCircle,
  MessageSquare,
  Smartphone,
  Search,
} from "lucide-react";

type ViewType = "dashboard" | "alertes" | "documents" | "reports" | "emails" | "config";

const navItems = [
  { id: "dashboard" as ViewType, label: "Dashboard", icon: LayoutDashboard },
  { id: "alertes" as ViewType, label: "Alertes", icon: Bell },
  { id: "documents" as ViewType, label: "Documents", icon: FileText },
  { id: "reports" as ViewType, label: "Reports", icon: BarChart3 },
  { id: "emails" as ViewType, label: "Emails", icon: Mail },
  { id: "config" as ViewType, label: "Configuració", icon: Settings },
];

const DemoLegalPage = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [expandedAlerts, setExpandedAlerts] = useState<string[]>(["alert-1"]);

  const toggleAlert = (id: string) => {
    setExpandedAlerts((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const currentTime = new Date().toLocaleTimeString("ca-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      {/* Warning Banner */}
      {showBanner && (
        <div className="sticky top-0 z-40 bg-amber-50 border-b border-amber-200 px-6 md:px-12 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 text-amber-900">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">
              Això és una demo amb dades fictícies per il·lustració
            </span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="text-amber-700 hover:text-amber-900 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="bg-background border-b border-border px-6 md:px-12 py-5 flex justify-between items-center h-20">
        <div className="flex items-center gap-4">
          <span className="font-manrope font-extrabold text-lg text-primary">
            PREMSA.IO
          </span>
          <span className="text-sm text-muted-foreground">Demo -</span>
          <span className="font-manrope font-semibold text-lg text-foreground">
            Bufet Jurídic García & Asociados
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Última actualització:</p>
          <p className="text-sm font-semibold text-foreground">Avui, {currentTime}</p>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-60 bg-gray-900 text-white flex flex-col sticky top-0 h-[calc(100vh-5rem)]">
          <nav className="p-4 flex-1">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    currentView === item.id
                      ? "bg-primary/80 text-white border-l-4 border-accent"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
          
          <div className="p-4 border-t border-gray-800">
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Link to="/demo">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Sortir Demo
              </Link>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {currentView === "dashboard" && <DashboardView currentTime={currentTime} />}
          {currentView === "alertes" && (
            <AlertesView expandedAlerts={expandedAlerts} toggleAlert={toggleAlert} />
          )}
          {currentView === "documents" && <DocumentsView />}
          {currentView === "reports" && <ReportsView />}
          {currentView === "emails" && <EmailsView />}
          {currentView === "config" && <ConfigView />}
        </main>
      </div>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 z-30 bg-gray-900 text-white px-8 py-4 flex justify-between items-center border-t border-gray-800 shadow-xl">
        <span className="font-manrope font-semibold">T'agrada el que veus?</span>
        <div className="flex gap-3">
          <Button asChild className="bg-white text-gray-900 hover:bg-gray-100">
            <Link to="/book-demo">Book Demo Real →</Link>
          </Button>
          <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
            <Link to="/playground">Prova Playground →</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Dashboard View
const DashboardView = ({ currentTime }: { currentTime: string }) => (
  <div className="space-y-8">
    {/* Welcome */}
    <Card className="p-6">
      <h1 className="font-manrope font-bold text-2xl text-foreground">
        Benvingut, Marta Jiménez
        <span className="text-sm font-normal text-muted-foreground ml-2">
          (Partner - Departament Fiscal)
        </span>
      </h1>
      <p className="text-sm text-muted-foreground mt-1">
        Última actualització: Avui, {currentTime}
      </p>
    </Card>

    {/* Weekly Summary */}
    <div>
      <h2 className="font-manrope font-bold text-sm uppercase tracking-widest text-muted-foreground mb-5">
        Resum Setmanal (8-14 Gener 2025)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard number="12" label="Alertes noves" color="text-primary" />
        <StatCard number="3" label="Crítiques" color="text-destructive" />
        <StatCard number="1" label="En seguiment" color="text-amber-500" />
      </div>
    </div>

    {/* Critical Alerts */}
    <div>
      <h2 className="font-manrope font-bold text-lg text-foreground mb-5">
        Alertes Crítiques (Requereixen atenció)
      </h2>
      <AlertCard
        severity="critical"
        title="RD 23/2025 - Modificació IRPF retencions"
        source="BOE núm. 8 | Secció I"
        date="10 Gen 2025, 09:15"
        impact="Alt - Afecta assessoria fiscal clients"
        summary="Nous trams de retenció IRPF per rendiments >300K€. Obligatori aplicar des d'1 de febrer. Els vostres clients corporatius amb alts directius hauran d'ajustar nòmines."
        expanded
      />
    </div>

    {/* Activity Timeline */}
    <div>
      <h2 className="font-manrope font-bold text-lg text-foreground mb-5">
        Activitat Recent
      </h2>
      <Card className="p-6">
        <div className="space-y-4 border-l-2 border-border pl-6">
          <TimelineItem time="14:23" text="Nova alerta processada: Llei 2/2025 protecció dades" />
          <TimelineItem time="11:42" text="Alerta marcada com llegida per Joan García" />
          <TimelineItem time="09:15" text="Email setmanal enviat a 12 usuaris del bufet" />
          <TimelineItem time="Ahir 16:30" text="5 documents nous indexats del DOGC" />
        </div>
      </Card>
    </div>
  </div>
);

// Alertes View
const AlertesView = ({
  expandedAlerts,
  toggleAlert,
}: {
  expandedAlerts: string[];
  toggleAlert: (id: string) => void;
}) => (
  <div className="space-y-6">
    <h1 className="font-manrope font-bold text-2xl md:text-3xl text-foreground">
      ALERTES - Bufet Jurídic García & Asociados
    </h1>

    {/* Filters */}
    <Card className="p-5 flex flex-wrap gap-4 items-center">
      <span className="text-sm font-medium text-muted-foreground">Filtres:</span>
      <Select defaultValue="all">
        <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Totes</SelectItem>
          <SelectItem value="unread">No llegides</SelectItem>
          <SelectItem value="read">Llegides</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger className="w-40"><SelectValue placeholder="Severitat" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Totes</SelectItem>
          <SelectItem value="critical">Crítica</SelectItem>
          <SelectItem value="medium">Mitjana</SelectItem>
          <SelectItem value="low">Baixa</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="7days">
        <SelectTrigger className="w-44"><SelectValue placeholder="Data" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="24h">Últimes 24h</SelectItem>
          <SelectItem value="7days">Últims 7 dies</SelectItem>
          <SelectItem value="30days">Últims 30 dies</SelectItem>
        </SelectContent>
      </Select>
    </Card>

    <p className="text-sm text-muted-foreground">12 alertes trobades</p>

    {/* Alert 1 - Expanded */}
    <AlertCardFull
      id="alert-1"
      severity="critical"
      title="RD 23/2025 - Modificació IRPF retencions"
      source="BOE núm. 8 | Secció I"
      date="10 Gen 2025, 09:15"
      expanded={expandedAlerts.includes("alert-1")}
      onToggle={() => toggleAlert("alert-1")}
    />

    {/* Alert 2 */}
    <AlertCardFull
      id="alert-2"
      severity="medium"
      title="Ordre JUS/1247/2024 - Actualització aranzels"
      source="BOE núm. 6 | Secció III"
      date="8 Gen 2025, 14:20"
      expanded={expandedAlerts.includes("alert-2")}
      onToggle={() => toggleAlert("alert-2")}
    />

    {/* Alert 3 */}
    <AlertCardFull
      id="alert-3"
      severity="info"
      title="Resolució AEPD 2025-003 - Criteris protecció dades"
      source="BOE núm. 5 | Secció III"
      date="7 Gen 2025, 10:00"
      expanded={expandedAlerts.includes("alert-3")}
      onToggle={() => toggleAlert("alert-3")}
    />

    <Button variant="outline" className="w-full">
      Carregar més alertes
    </Button>
  </div>
);

// Documents View
const DocumentsView = () => (
  <div className="space-y-6">
    <div>
      <h1 className="font-manrope font-bold text-2xl md:text-3xl text-foreground">
        DOCUMENTS - Font Original
      </h1>
      <p className="text-muted-foreground mt-2">
        Tots els documents normatius indexats aquesta setmana
      </p>
    </div>

    {/* Filters */}
    <Card className="p-5 flex flex-wrap gap-4 items-center">
      <span className="text-sm font-medium text-muted-foreground">Filtres:</span>
      <Select defaultValue="all">
        <SelectTrigger className="w-36"><SelectValue placeholder="Font" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Totes</SelectItem>
          <SelectItem value="boe">BOE</SelectItem>
          <SelectItem value="dogc">DOGC</SelectItem>
          <SelectItem value="eu">EU</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger className="w-40"><SelectValue placeholder="Categoria" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Totes</SelectItem>
          <SelectItem value="fiscal">Fiscal</SelectItem>
          <SelectItem value="laboral">Laboral</SelectItem>
          <SelectItem value="mercantil">Mercantil</SelectItem>
        </SelectContent>
      </Select>
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Cerca per títol, número..." className="pl-9" />
      </div>
    </Card>

    <p className="text-sm text-muted-foreground">48 documents trobats</p>

    {/* Document Cards */}
    <DocumentCard
      title="RD 23/2025 - Modificació IRPF retencions"
      meta="BOE núm. 8 | 10 Gen 2025 | Secció I | Pàg. 1247"
      source="https://boe.es/diario_boe/txt.php?id=BOE-A-2025-123"
      extractedDate="10 Gen 2025, 09:15"
      metadata={[
        { label: "Rang", value: "Real Decret" },
        { label: "Departament", value: "Ministerio de Hacienda" },
        { label: "Entrada en vigor", value: "1 Febrer 2025" },
        { label: "Afecta a", value: "Llei 35/2006 (IRPF)" },
      ]}
    />
    <DocumentCard
      title="Ordre JUS/1247/2024 - Actualització aranzels"
      meta="BOE núm. 6 | 8 Gen 2025 | Secció III | Pàg. 892"
      source="https://boe.es/diario_boe/txt.php?id=BOE-A-2025-089"
      extractedDate="8 Gen 2025, 14:20"
      metadata={[
        { label: "Rang", value: "Ordre Ministerial" },
        { label: "Departament", value: "Ministerio de Justicia" },
        { label: "Entrada en vigor", value: "1 Març 2025" },
      ]}
    />
  </div>
);

// Reports View
const ReportsView = () => (
  <div className="space-y-8">
    <div>
      <h1 className="font-manrope font-bold text-2xl md:text-3xl text-foreground">
        REPORTS SETMANALS - Bufet Jurídic García & Asociados
      </h1>
      <p className="text-muted-foreground mt-2">
        Els informes executius que el vostre equip rep cada dilluns
      </p>
    </div>

    {/* Current Report */}
    <Card className="p-10 border-2 border-primary/20 shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <BarChart3 className="h-8 w-8 text-primary" />
        <div>
          <h2 className="font-manrope font-bold text-2xl text-foreground">INFORME SETMANAL</h2>
          <p className="font-semibold text-muted-foreground">Setmana 8-14 Gener 2025</p>
          <p className="text-xs text-muted-foreground">Generat: 15 Gen 2025, 08:00</p>
        </div>
      </div>

      <div className="border-t border-border my-6" />

      <div className="space-y-6">
        <div>
          <h3 className="font-manrope font-bold text-base text-foreground mb-3">RESUM EXECUTIU:</h3>
          <p className="text-muted-foreground leading-relaxed">
            Aquesta setmana hem detectat 12 canvis normatius rellevants pel vostre bufet:
            <br />• 3 alertes crítiques (requereixen acció immediata)
            <br />• 5 alertes mitjanes (seguiment recomanat)
            <br />• 4 alertes informatives (per coneixement)
            <br /><br />
            El volum d'alertes és un 15% superior a la setmana anterior, principalment degut a publicacions de finals d'any que arriben ara al BOE.
          </p>
        </div>

        <div>
          <h3 className="font-manrope font-bold text-base text-foreground mb-3">DESTACATS:</h3>
          <div className="space-y-4">
            <HighlightItem
              number="1"
              title="RD 23/2025 (IRPF): Afecta 23 clients"
              action="Comunicar abans 25 Gener"
            />
            <HighlightItem
              number="2"
              title="Ordre JUS/1247/2024 (Aranzels): Cost +3,2%"
              action="Actualitzar pressupostos clients"
            />
            <HighlightItem
              number="3"
              title="DOGC: 2 Lleis Catalunya en tràmit"
              action="Poden afectar clients locals"
            />
          </div>
        </div>

        <div>
          <h3 className="font-manrope font-bold text-base text-emerald-700 mb-3">
            OPORTUNITATS DE NEGOCI DETECTADES:
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span>15 clients necessitaran servei ajust nòmines</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span>8 clients haurien de revisar contractes laborals</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <Button size="lg">Descarregar PDF</Button>
        <Button variant="outline" size="lg">Enviar per email</Button>
      </div>
    </Card>

    {/* Historical */}
    <div>
      <h2 className="font-manrope font-bold text-lg text-foreground mb-5">
        HISTÒRIC D'INFORMES
      </h2>
      <div className="space-y-3">
        <HistoricalReportRow title="Setmana 1-7 Gener 2025" />
        <HistoricalReportRow title="Setmana 25-31 Desembre 2024" />
        <HistoricalReportRow title="Setmana 18-24 Desembre 2024" />
      </div>
      <Button variant="link" className="mt-4 text-primary">
        Veure tots →
      </Button>
    </div>
  </div>
);

// Emails View
const EmailsView = () => (
  <div className="space-y-6">
    <div>
      <h1 className="font-manrope font-bold text-2xl md:text-3xl text-foreground">
        EMAILS AUTOMÀTICS - Preview
      </h1>
      <p className="text-muted-foreground mt-2">
        Els emails que els vostres usuaris reben automàticament
      </p>
    </div>

    <Card className="p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="h-6 w-6 text-primary" />
        <div>
          <h2 className="font-manrope font-semibold text-lg text-foreground">
            EMAIL: Alerta Crítica - RD 23/2025
          </h2>
          <p className="text-sm text-muted-foreground">Enviat a: Tots els usuaris (12)</p>
          <p className="text-sm text-muted-foreground">Data: 10 Gen 2025, 09:30</p>
        </div>
      </div>

      {/* Email Preview */}
      <div className="bg-muted/50 border border-border rounded-lg p-6 mt-6 font-sans">
        <div className="text-sm text-muted-foreground mb-4 space-y-1">
          <p>De: alertes@premsa.io</p>
          <p>Assumpte: 🔴 [CRÍTIC] Nou RD modifica IRPF - Acció requerida abans 1 Febrer</p>
        </div>
        <div className="border-t-2 border-border my-4" />
        <div className="text-sm text-foreground leading-relaxed space-y-4">
          <p>Hola Marta,</p>
          <p>
            Avui s'ha publicat el RD 23/2025 que modifica els trams de retenció d'IRPF per
            rendiments superiors a 300.000€ anuals.
          </p>
          <div>
            <p className="font-bold">IMPACTE PEL BUFET:</p>
            <p>- 23 dels vostres clients corporatius estan afectats</p>
            <p>- Cal actuar abans d'1 de febrer (entrada en vigor)</p>
          </div>
          <div>
            <p className="font-bold">RECOMANACIÓ:</p>
            <p>Contactar departament RRHH d'aquests clients per coordinar ajust nòmines gener.</p>
          </div>
          <p>
            <a href="#" className="text-primary font-semibold underline">
              [Veure detall complet →]
            </a>
          </p>
          <div className="border-t border-border pt-4 mt-4">
            <p className="text-muted-foreground text-xs">
              Salutacions,
              <br />
              PREMSA.IO
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-5 flex items-start gap-3">
        <Info className="h-4 w-4 text-blue-700 mt-0.5" />
        <p className="text-sm text-blue-900">
          [Aquest és un preview - En producció, els usuaris reben això al seu email corporatiu]
        </p>
      </div>
    </Card>

    <Card className="p-6">
      <div className="flex items-center gap-3">
        <Mail className="h-5 w-5 text-muted-foreground" />
        <div className="flex-1">
          <p className="font-medium text-foreground">EMAIL: Informe Setmanal</p>
          <p className="text-sm text-muted-foreground">Enviat a: Partners (3) · 15 Gen 2025, 08:00</p>
        </div>
        <Button variant="ghost" size="sm">Expandir</Button>
      </div>
    </Card>
  </div>
);

// Config View
const ConfigView = () => (
  <div className="space-y-8">
    <h1 className="font-manrope font-bold text-2xl md:text-3xl text-foreground">
      CONFIGURACIÓ - Bufet Jurídic García & Asociados
    </h1>

    {/* Compliance Areas */}
    <Card className="p-8">
      <h2 className="font-manrope font-semibold text-lg text-foreground mb-5">
        Àrees de compliance monitoritzades:
      </h2>
      <div className="space-y-3">
        <ConfigRow label="Fiscal" priority="Alta" priorityColor="bg-red-100 text-red-900" />
        <ConfigRow label="Laboral" priority="Alta" priorityColor="bg-red-100 text-red-900" />
        <ConfigRow label="Mercantil" priority="Mitjana" priorityColor="bg-amber-100 text-amber-900" />
        <ConfigRow label="Protecció de dades" priority="Mitjana" priorityColor="bg-amber-100 text-amber-900" />
        <ConfigRow label="Compliance penal" priority="Baixa" priorityColor="bg-blue-100 text-blue-900" />
      </div>
    </Card>

    {/* Sources */}
    <Card className="p-8">
      <h2 className="font-manrope font-semibold text-lg text-foreground mb-5">
        Fonts actives:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {["BOE (Estatal)", "DOGC (Catalunya)", "BOCM (Madrid)", "Directives EU (tracking)"].map((source) => (
          <div key={source} className="flex items-center gap-3">
            <Checkbox checked disabled />
            <span className="text-muted-foreground">{source}</span>
          </div>
        ))}
      </div>
    </Card>

    {/* Users */}
    <Card className="p-8">
      <h2 className="font-manrope font-semibold text-lg text-foreground mb-5">
        Usuaris amb accés (12):
      </h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Users className="h-5 w-5 text-primary" />
          <span>3 Partners (accés complet)</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Users className="h-5 w-5 text-primary" />
          <span>6 Advocats seniors (alertes + reports)</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Users className="h-5 w-5 text-primary" />
          <span>3 Advocats juniors (només consulta)</span>
        </div>
      </div>
    </Card>

    {/* Notifications */}
    <Card className="p-8">
      <h2 className="font-manrope font-semibold text-lg text-foreground mb-5">
        Notificacions:
      </h2>
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Mail className="h-5 w-5" />
          <span>Email: Alertes crítiques <span className="text-xs text-muted-foreground">(immediat)</span></span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Mail className="h-5 w-5" />
          <span>Email: Informe setmanal <span className="text-xs text-muted-foreground">(dilluns 08:00)</span></span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <MessageSquare className="h-5 w-5" />
          <span>Slack: Alertes mitjanes i crítiques</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Smartphone className="h-5 w-5" />
          <span>SMS: Només alertes crítiques <span className="text-xs text-muted-foreground">(opcional)</span></span>
        </div>
      </div>
    </Card>

    {/* Demo Notice */}
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 flex items-start gap-3">
      <Info className="h-5 w-5 text-primary mt-0.5" />
      <p className="text-sm text-primary leading-relaxed">
        [En una demo real, això és totalment configurable pel client. Pots afegir/eliminar àrees,
        activar/desactivar fonts, gestionar usuaris i personalitzar notificacions segons les teves necessitats.]
      </p>
    </div>
  </div>
);

// Helper Components
const StatCard = ({ number, label, color }: { number: string; label: string; color: string }) => (
  <Card className="p-6 text-center">
    <p className={`font-manrope font-bold text-5xl ${color}`}>{number}</p>
    <p className="text-sm font-medium text-muted-foreground mt-2">{label}</p>
  </Card>
);

const TimelineItem = ({ time, text }: { time: string; text: string }) => (
  <div className="relative">
    <div className="absolute -left-9 top-0 bg-background px-1">
      <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-primary" />
      </div>
    </div>
    <p className="text-sm">
      <span className="font-semibold text-foreground">{time}</span>
      <span className="text-muted-foreground"> - {text}</span>
    </p>
  </div>
);

const AlertCard = ({
  severity,
  title,
  source,
  date,
  impact,
  summary,
  expanded,
}: {
  severity: "critical" | "medium" | "info";
  title: string;
  source: string;
  date: string;
  impact: string;
  summary: string;
  expanded?: boolean;
}) => {
  const borderColor = severity === "critical" ? "border-l-destructive" : severity === "medium" ? "border-l-amber-500" : "border-l-blue-500";
  const badgeClass = severity === "critical" ? "bg-red-100 text-red-900" : severity === "medium" ? "bg-amber-100 text-amber-900" : "bg-blue-100 text-blue-900";
  const badgeText = severity === "critical" ? "🔴 CRÍTICA" : severity === "medium" ? "🟡 MITJÀ" : "🟢 INFORMATIVA";

  return (
    <Card className={`p-6 border-l-4 ${borderColor} shadow-md`}>
      <div className="flex justify-between items-start mb-3">
        <Badge className={badgeClass}>{badgeText}</Badge>
        <span className="text-xs text-muted-foreground">Publicat: {date}</span>
      </div>
      <h3 className="font-manrope font-bold text-xl text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{source}</p>
      {expanded && (
        <>
          <div className="inline-block bg-amber-50 text-amber-900 px-3 py-2 rounded-md text-sm font-semibold mb-4">
            Impacte: {impact}
          </div>
          <div className="mb-4">
            <p className="font-bold text-sm text-foreground mb-2">Resum IA:</p>
            <p className="text-muted-foreground leading-relaxed">{summary}</p>
          </div>
          <div className="flex gap-3">
            <Button size="sm">Veure detall</Button>
            <Button variant="outline" size="sm">Marcar com llegida</Button>
          </div>
        </>
      )}
    </Card>
  );
};

const AlertCardFull = ({
  id,
  severity,
  title,
  source,
  date,
  expanded,
  onToggle,
}: {
  id: string;
  severity: "critical" | "medium" | "info";
  title: string;
  source: string;
  date: string;
  expanded: boolean;
  onToggle: () => void;
}) => {
  const borderColor = severity === "critical" ? "border-l-destructive" : severity === "medium" ? "border-l-amber-500" : "border-l-blue-500";
  const badgeClass = severity === "critical" ? "bg-red-100 text-red-900" : severity === "medium" ? "bg-amber-100 text-amber-900" : "bg-blue-100 text-blue-900";
  const badgeText = severity === "critical" ? "🔴 CRÍTICA" : severity === "medium" ? "🟡 MITJÀ" : "🟢 INFORMATIVA";

  return (
    <Card className={`p-6 border-l-4 ${borderColor} shadow-md`}>
      <div className="flex justify-between items-start mb-3">
        <Badge className={badgeClass}>{badgeText}</Badge>
        <span className="text-xs text-muted-foreground">Publicat: {date}</span>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-manrope font-bold text-xl text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{source}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onToggle}>
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {expanded ? "Contraure" : "Expandir"}
        </Button>
      </div>

      {expanded && (
        <div className="mt-6 space-y-6">
          <div className="inline-block bg-amber-50 text-amber-900 px-3 py-2 rounded-md text-sm font-semibold">
            Impacte: Alt - Afecta assessoria fiscal clients
          </div>

          <div>
            <p className="font-bold text-sm text-foreground mb-2">Resum IA:</p>
            <p className="text-muted-foreground leading-relaxed">
              Nous trams de retenció IRPF per rendiments &gt;300K€. Obligatori aplicar des d'1 de febrer.
              Els vostres clients corporatius amb alts directius hauran d'ajustar nòmines.
            </p>
          </div>

          <div className="border-t border-border pt-4">
            <p className="font-bold text-sm text-foreground mb-2">INTERPRETACIÓ CONTEXTUAL (Legal Bedrock™):</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Aquest RD modifica l'article 80 de la Llei 35/2006 (IRPF). Històric de modificacions:
              <br />• 2015: Últim ajust trams (Llei 26/2014)
              <br />• 2012: Gravamen complementari (RDL 20/2011)
              <br /><br />
              Normativa relacionada: Reglament IRPF (RD 439/2007) - Caldrà actualitzar
            </p>
          </div>

          <div className="border-t border-border pt-4">
            <p className="font-bold text-sm text-foreground mb-2">IMPACTE PEL VOSTRE BUFET:</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ✓ 23 clients corporatius amb nòmines &gt;300K€
              <br />✓ Assessoria fiscal: Revisar retencions febrer
              <br />✓ Dept. laboral: Coordinar amb RRHH dels clients
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="sm">Descarregar PDF complet</Button>
            <Button variant="outline" size="sm">Exportar a CRM</Button>
            <Button variant="outline" size="sm">Crear tasca Asana</Button>
            <Button variant="outline" size="sm">Compartir amb equip</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

const DocumentCard = ({
  title,
  meta,
  source,
  extractedDate,
  metadata,
}: {
  title: string;
  meta: string;
  source: string;
  extractedDate: string;
  metadata: { label: string; value: string }[];
}) => (
  <Card className="p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-3">
      <FileText className="h-6 w-6 text-primary" />
      <h3 className="font-manrope font-semibold text-lg text-foreground">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground mb-4">{meta}</p>
    <div className="border-t border-border my-4" />
    <div className="mb-4">
      <p className="text-sm">
        <span className="font-medium text-muted-foreground">Font: </span>
        <a href={source} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
          {source}
        </a>
      </p>
      <p className="text-xs text-muted-foreground mt-1">Extret: {extractedDate}</p>
    </div>
    <div>
      <p className="font-bold text-sm text-foreground mb-3">METADATA:</p>
      <div className="space-y-2">
        {metadata.map((item) => (
          <p key={item.label} className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
            {item.label}: {item.value}
          </p>
        ))}
      </div>
    </div>
    <div className="flex gap-3 mt-5">
      <Button variant="outline" size="sm">
        <ExternalLink className="h-4 w-4 mr-2" />
        Veure PDF original
      </Button>
      <Button variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Descarregar
      </Button>
    </div>
  </Card>
);

const HighlightItem = ({ number, title, action }: { number: string; title: string; action: string }) => (
  <div className="flex items-start gap-3">
    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
      {number}
    </div>
    <div>
      <p className="font-manrope font-semibold text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">→ Acció: {action}</p>
    </div>
  </div>
);

const HistoricalReportRow = ({ title }: { title: string }) => (
  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
    <div className="flex items-center gap-3">
      <FileText className="h-4 w-4 text-muted-foreground" />
      <span className="font-medium text-foreground">{title}</span>
    </div>
    <Download className="h-4 w-4 text-primary hover:text-primary/80 cursor-pointer" />
  </div>
);

const ConfigRow = ({ label, priority, priorityColor }: { label: string; priority: string; priorityColor: string }) => (
  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
    <div className="flex items-center gap-3">
      <CheckCircle className="h-5 w-5 text-emerald-600" />
      <span className="font-medium text-foreground">{label}</span>
    </div>
    <Badge className={priorityColor}>prioritat: {priority}</Badge>
  </div>
);

export default DemoLegalPage;
