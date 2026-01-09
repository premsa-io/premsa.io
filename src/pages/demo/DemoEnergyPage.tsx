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

const DemoEnergyPage = () => {
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
            Ibérica Energía Renovable SL
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
        Benvinguda, Laura Sánchez
        <span className="text-sm font-normal text-muted-foreground ml-2">
          (Directora Legal i Compliance)
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
        <StatCard number="10" label="Alertes noves" color="text-primary" />
        <StatCard number="2" label="Crítiques" color="text-destructive" />
        <StatCard number="3" label="En seguiment" color="text-amber-500" />
      </div>
    </div>

    {/* Critical Alerts */}
    <div>
      <h2 className="font-manrope font-bold text-lg text-foreground mb-5">
        Alertes Crítiques (Requereixen atenció)
      </h2>
      <AlertCard
        severity="critical"
        title="RD 24/2025 - Modificació sistema subvencions renovables"
        source="BOE núm. 9 | Secció I"
        date="11 Gen 2025, 09:45"
        impact="Alt - Afecta finançament projectes nous"
        summary="Nou Reial Decret que modifica el sistema de subastes i subvencions per projectes renovables. Reducció del 15% en primes per energia eòlica. Increment del 10% per solar fotovoltaica. Afecta projectes en desenvolupament. Entrada vigor: 1 Març 2025."
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
          <TimelineItem time="16:20" text="Nova alerta MITECO processada" />
          <TimelineItem time="11:15" text="Alerta ambiental marcada com llegida per Marc Vidal" />
          <TimelineItem time="09:00" text="Email setmanal enviat a 15 usuaris" />
          <TimelineItem time="Ahir 14:30" text="2 documents DOCV nous indexats" />
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
      ALERTES - Ibérica Energía Renovable SL
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

    <p className="text-sm text-muted-foreground">10 alertes trobades</p>

    {/* Alert 1 - Expanded */}
    <AlertCardFull
      id="alert-1"
      severity="critical"
      title="RD 24/2025 - Modificació sistema subvencions renovables"
      source="BOE núm. 9 | Secció I"
      date="11 Gen 2025, 09:45"
      expanded={expandedAlerts.includes("alert-1")}
      onToggle={() => toggleAlert("alert-1")}
      impact="Alt - Afecta finançament projectes nous"
      summary="Nou Reial Decret que modifica el sistema de subastes i subvencions per projectes renovables. Reducció del 15% en primes per energia eòlica. Increment del 10% per solar fotovoltaica. Afecta projectes en desenvolupament. Entrada vigor: 1 Març 2025."
      context="Aquest RD modifica el Reial Decret 960/2020 (règim econòmic energies renovables). Històric: 2023: Última subasta renovables (RD 1183/2023). 2021: Implementació Fons Next Generation (RD 477/2021). Normativa relacionada: Llei 24/2013 (Sector Elèctric), Directiva UE 2018/2001 (Renovables) - Revisat 2023."
      businessImpact="✓ 3 parcs eòlics en desenvolupament afectats (reducció ingressos -15%)
✓ 2 projectes solars beneficiats (increment ingressos +10%)
✓ Dept. Financer: Recalcular viabilitat econòmica"
    />

    {/* Alert 2 */}
    <AlertCardFull
      id="alert-2"
      severity="medium"
      title="Ordre TED/1345/2024 - Noves normes connexió xarxa"
      source="BOE núm. 8 | Secció III"
      date="10 Gen 2025, 14:20"
      expanded={expandedAlerts.includes("alert-2")}
      onToggle={() => toggleAlert("alert-2")}
      impact="Mitjà - Afecta tràmits connexió"
      summary="Actualització procediment administratiu per connexió instal·lacions renovables a xarxa elèctrica. Simplificació tràmits però nous requisits tècnics. Implementació progressiva 2025."
    />

    {/* Alert 3 */}
    <AlertCardFull
      id="alert-3"
      severity="info"
      title="Resolució MITECO 2025-008 - Criteris avaluació impacte ambiental"
      source="BOE núm. 7 | Secció III"
      date="9 Gen 2025, 10:00"
      expanded={expandedAlerts.includes("alert-3")}
      onToggle={() => toggleAlert("alert-3")}
      impact="Informatiu - Fases inicials projectes"
      summary="Noves directrius per elaboració estudis d'impacte ambiental en projectes energètics. Reforça requisits sobre biodiversitat i paisatge. Recomanacions per fases inicials projectes."
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
          <SelectItem value="docv">DOCV</SelectItem>
          <SelectItem value="doe">DOE</SelectItem>
          <SelectItem value="eu">EU</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger className="w-40"><SelectValue placeholder="Categoria" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Totes</SelectItem>
          <SelectItem value="energia">Energia</SelectItem>
          <SelectItem value="ambiental">Ambiental</SelectItem>
          <SelectItem value="territori">Territori</SelectItem>
          <SelectItem value="fiscal">Fiscal</SelectItem>
        </SelectContent>
      </Select>
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Cerca per títol, número..." className="pl-9" />
      </div>
    </Card>

    <p className="text-sm text-muted-foreground">38 documents trobats</p>

    {/* Document Cards */}
    <DocumentCard
      title="RD 24/2025 - Sistema subvencions renovables"
      meta="BOE núm. 9 | 11 Gen 2025 | Secció I | Pàg. 3421"
      source="https://boe.es/diario_boe/txt.php?id=BOE-A-2025-198"
      extractedDate="11 Gen 2025, 09:45"
      metadata={[
        { label: "Rang", value: "Real Decret" },
        { label: "Departament", value: "MITECO" },
        { label: "Entrada en vigor", value: "1 Març 2025" },
        { label: "Afecta a", value: "RD 960/2020 (Règim econòmic renovables)" },
      ]}
    />
    <DocumentCard
      title="Ordre TED/1345/2024 - Connexió xarxa"
      meta="BOE núm. 8 | 10 Gen 2025 | Secció III | Pàg. 2156"
      source="https://boe.es/diario_boe/txt.php?id=BOE-A-2025-167"
      extractedDate="10 Gen 2025, 14:20"
      metadata={[
        { label: "Rang", value: "Ordre Ministerial" },
        { label: "Departament", value: "MITECO" },
        { label: "Entrada en vigor", value: "Progressiva 2025" },
      ]}
    />
  </div>
);

// Reports View
const ReportsView = () => (
  <div className="space-y-8">
    <div>
      <h1 className="font-manrope font-bold text-2xl md:text-3xl text-foreground">
        REPORTS SETMANALS - Ibérica Energía Renovable SL
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
            Aquesta setmana hem detectat 10 canvis normatius rellevants per l'empresa:
            <br />• 2 alertes crítiques (requereixen acció immediata)
            <br />• 5 alertes mitjanes (seguiment recomanat)
            <br />• 3 alertes informatives (per coneixement)
            <br /><br />
            Focus principal: canvi significatiu en el sistema de subvencions renovables que afecta directament la viabilitat dels projectes en curs.
          </p>
        </div>

        <div>
          <h3 className="font-manrope font-bold text-base text-foreground mb-3">DESTACATS:</h3>
          <div className="space-y-4">
            <HighlightItem
              number="1"
              title="RD 24/2025 (Subvencions): Eòlica -15%, Solar +10%"
              action="Reavaluació econòmica 5 projectes en curs"
            />
            <HighlightItem
              number="2"
              title="Ordre TED (Connexió xarxa): Nous requisits tècnics"
              action="Actualitzar specs projectes Q1"
            />
            <HighlightItem
              number="3"
              title="DOCV: Llei Territori en tramitació (afecta 2 parcs)"
              action="Audiència pública Febrer"
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
              <span>Accelerar 2 projectes solars per aprofitar +10% prima</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span>Revisar pipeline: prioritzar solar sobre eòlic curt termini</span>
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
            EMAIL: Alerta Crítica - RD 24/2025
          </h2>
          <p className="text-sm text-muted-foreground">Enviat a: Tots els usuaris (15)</p>
          <p className="text-sm text-muted-foreground">Data: 11 Gen 2025, 10:15</p>
        </div>
      </div>

      {/* Email Preview */}
      <div className="bg-muted/50 border border-border rounded-lg p-6 mt-6 font-sans">
        <div className="text-sm text-muted-foreground mb-4 space-y-1">
          <p>De: alertes@premsa.io</p>
          <p>Assumpte: 🔴 [CRÍTIC] Nou RD modifica subvencions renovables - Impacte significatiu</p>
        </div>
        <div className="border-t-2 border-border my-4" />
        <div className="text-sm text-foreground leading-relaxed space-y-4">
          <p>Hola Laura,</p>
          <p>
            Avui s'ha publicat el RD 24/2025 que modifica el sistema de subastes i subvencions
            per projectes renovables amb canvis significatius.
          </p>
          <div>
            <p className="font-bold">IMPACTE PER IBÉRICA ENERGÍA:</p>
            <p>- Reducció 15% primes eòlica (afecta 3 projectes en curs)</p>
            <p>- Increment 10% primes solar (beneficia 2 projectes)</p>
            <p>- Entrada en vigor: 1 Març 2025</p>
          </div>
          <div>
            <p className="font-bold">RECOMANACIÓ:</p>
            <p>Reunió urgent amb Dept. Financer per recalcular viabilitat econòmica dels projectes afectats.</p>
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
          <p className="text-sm text-muted-foreground">Enviat a: Project Managers (8) · 15 Gen 2025, 08:00</p>
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
      CONFIGURACIÓ - Ibérica Energía Renovable SL
    </h1>

    {/* Compliance Areas */}
    <Card className="p-8">
      <h2 className="font-manrope font-semibold text-lg text-foreground mb-5">
        Àrees de compliance monitoritzades:
      </h2>
      <div className="space-y-3">
        <ConfigRow label="Energia i renovables" priority="Alta" priorityColor="bg-red-100 text-red-900" />
        <ConfigRow label="Ambiental i sostenibilitat" priority="Alta" priorityColor="bg-red-100 text-red-900" />
        <ConfigRow label="Ordenació territori" priority="Mitjana" priorityColor="bg-amber-100 text-amber-900" />
        <ConfigRow label="Fiscal" priority="Mitjana" priorityColor="bg-amber-100 text-amber-900" />
        <ConfigRow label="Laboral" priority="Baixa" priorityColor="bg-blue-100 text-blue-900" />
      </div>
    </Card>

    {/* Sources */}
    <Card className="p-8">
      <h2 className="font-manrope font-semibold text-lg text-foreground mb-5">
        Fonts actives:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {["BOE (Estatal)", "DOCV (Comunitat Valenciana)", "DOE (Extremadura)", "Directives UE (Energia i clima)"].map((source) => (
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
        Usuaris amb accés (15):
      </h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Users className="h-5 w-5 text-primary" />
          <span>3 Compliance Officers (accés complet)</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Users className="h-5 w-5 text-primary" />
          <span>8 Project Managers (alertes projectes)</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Users className="h-5 w-5 text-primary" />
          <span>4 Environmental Engineers (alertes ambientals)</span>
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
  impact,
  summary,
  context,
  businessImpact,
}: {
  id: string;
  severity: "critical" | "medium" | "info";
  title: string;
  source: string;
  date: string;
  expanded: boolean;
  onToggle: () => void;
  impact?: string;
  summary?: string;
  context?: string;
  businessImpact?: string;
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
          {impact && (
            <div className="inline-block bg-amber-50 text-amber-900 px-3 py-2 rounded-md text-sm font-semibold">
              Impacte: {impact}
            </div>
          )}

          {summary && (
            <div>
              <p className="font-bold text-sm text-foreground mb-2">Resum IA:</p>
              <p className="text-muted-foreground leading-relaxed">{summary}</p>
            </div>
          )}

          {context && (
            <div className="border-t border-border pt-4">
              <p className="font-bold text-sm text-foreground mb-2">INTERPRETACIÓ CONTEXTUAL (Legal Bedrock™):</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{context}</p>
            </div>
          )}

          {businessImpact && (
            <div className="border-t border-border pt-4">
              <p className="font-bold text-sm text-foreground mb-2">IMPACTE PER L'EMPRESA:</p>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{businessImpact}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Button size="sm">Descarregar PDF complet</Button>
            <Button variant="outline" size="sm">Exportar a CRM</Button>
            <Button variant="outline" size="sm">Crear tasca</Button>
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

export default DemoEnergyPage;
