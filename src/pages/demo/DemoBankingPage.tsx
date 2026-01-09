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

const DemoBankingPage = () => {
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
            Banco Nacional SA
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
        Benvingut, Carlos Martínez
        <span className="text-sm font-normal text-muted-foreground ml-2">
          (Chief Compliance Officer)
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
        <StatCard number="18" label="Alertes noves" color="text-primary" />
        <StatCard number="5" label="Crítiques" color="text-destructive" />
        <StatCard number="2" label="En seguiment" color="text-amber-500" />
      </div>
    </div>

    {/* Critical Alerts */}
    <div>
      <h2 className="font-manrope font-bold text-lg text-foreground mb-5">
        Alertes Crítiques (Requereixen atenció)
      </h2>
      <AlertCard
        severity="critical"
        title="Circular 3/2025 Banc d'Espanya - Noves ràtios de capital"
        source="BOE núm. 7 | Secció I"
        date="9 Gen 2025, 10:30"
        impact="Alt - Afecta càlcul de ràtios de solvència"
        summary="Nova circular del Banc d'Espanya que modifica els requisits de capital regulatori per entitats de crèdit. Increment del 0,5% en el Tier 1 obligatori. Entrada en vigor: 1 Març 2025. Caldrà recalcular totes les ràtios de solvència i informar al supervisor abans de 15 Febrer."
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
          <TimelineItem time="15:45" text="Nova circular Banc d'Espanya processada" />
          <TimelineItem time="12:30" text="Alerta CNMV marcada com llegida per Ana López" />
          <TimelineItem time="09:00" text="Email setmanal enviat a 20 usuaris del banc" />
          <TimelineItem time="Ahir 17:15" text="3 resolucions CNMC noves indexades" />
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
      ALERTES - Banco Nacional SA
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

    <p className="text-sm text-muted-foreground">18 alertes trobades</p>

    {/* Alert 1 - Expanded */}
    <AlertCardFull
      id="alert-1"
      severity="critical"
      title="Circular 3/2025 Banc d'Espanya - Noves ràtios de capital"
      source="BOE núm. 7 | Secció I"
      date="9 Gen 2025, 10:30"
      expanded={expandedAlerts.includes("alert-1")}
      onToggle={() => toggleAlert("alert-1")}
      impact="Alt - Afecta càlcul de ràtios de solvència"
      summary="Nova circular del Banc d'Espanya que modifica els requisits de capital regulatori per entitats de crèdit. Increment del 0,5% en el Tier 1 obligatori. Entrada en vigor: 1 Març 2025."
      context="Aquesta circular modifica la Llei 10/2014 (ordenació, supervisió i solvència d'entitats de crèdit). Històric: 2023: Últim ajust ràtios (Circular 2/2023). 2020: Implementació Basel III (Llei 11/2020). Normativa relacionada: CRR II (Reglament UE 876/2019), Directiva CRD V - Transposició pendent."
      businessImpact="✓ Capital adicional requerit: est. €25M ✓ Dept. Risk: Recalcular tots els escenaris stress testing ✓ Reporting al Banc d'Espanya actualitzat"
    />

    {/* Alert 2 */}
    <AlertCardFull
      id="alert-2"
      severity="medium"
      title="Ordre ECO/1523/2024 - Actualització comissions bancàries"
      source="BOE núm. 8 | Secció III"
      date="10 Gen 2025, 14:20"
      expanded={expandedAlerts.includes("alert-2")}
      onToggle={() => toggleAlert("alert-2")}
      impact="Mitjà - Afecta tarifes clients retail"
      summary="Actualització del llistat de comissions màximes permeses per operacions bancàries. Reducció del 2% en comissions de manteniment comptes. Afecta productes retail. Implementació: 1 Abril 2025."
    />

    {/* Alert 3 */}
    <AlertCardFull
      id="alert-3"
      severity="info"
      title="Resolució CNMV 2025-012 - Criteris publicitat productes inversió"
      source="BOE núm. 6 | Secció III"
      date="8 Gen 2025, 10:00"
      expanded={expandedAlerts.includes("alert-3")}
      onToggle={() => toggleAlert("alert-3")}
      impact="Informatiu - Materials màrqueting"
      summary="Nova resolució CNMV sobre transparència en publicitat de productes d'inversió. Requereix disclaimers més prominents sobre riscos. Afecta materials màrqueting departament inversió."
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
          <SelectItem value="bde">Banc Espanya</SelectItem>
          <SelectItem value="cnmv">CNMV</SelectItem>
          <SelectItem value="eu">EU</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger className="w-40"><SelectValue placeholder="Categoria" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Totes</SelectItem>
          <SelectItem value="bancari">Bancari</SelectItem>
          <SelectItem value="cnmv">CNMV</SelectItem>
          <SelectItem value="blanqueig">Blanqueig</SelectItem>
          <SelectItem value="fiscal">Fiscal</SelectItem>
        </SelectContent>
      </Select>
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Cerca per títol, número..." className="pl-9" />
      </div>
    </Card>

    <p className="text-sm text-muted-foreground">52 documents trobats</p>

    {/* Document Cards */}
    <DocumentCard
      title="Circular 3/2025 Banc d'Espanya - Ràtios capital"
      meta="BOE núm. 7 | 9 Gen 2025 | Secció I | Pàg. 2145"
      source="https://boe.es/diario_boe/txt.php?id=BOE-A-2025-156"
      extractedDate="9 Gen 2025, 10:30"
      metadata={[
        { label: "Rang", value: "Circular" },
        { label: "Emissor", value: "Banc d'Espanya" },
        { label: "Entrada en vigor", value: "1 Març 2025" },
        { label: "Afecta a", value: "Llei 10/2014 (Solvència)" },
      ]}
    />
    <DocumentCard
      title="Ordre ECO/1523/2024 - Comissions bancàries"
      meta="BOE núm. 8 | 10 Gen 2025 | Secció III | Pàg. 1892"
      source="https://boe.es/diario_boe/txt.php?id=BOE-A-2025-178"
      extractedDate="10 Gen 2025, 14:20"
      metadata={[
        { label: "Rang", value: "Ordre Ministerial" },
        { label: "Departament", value: "Ministerio de Economía" },
        { label: "Entrada en vigor", value: "1 Abril 2025" },
      ]}
    />
  </div>
);

// Reports View
const ReportsView = () => (
  <div className="space-y-8">
    <div>
      <h1 className="font-manrope font-bold text-2xl md:text-3xl text-foreground">
        REPORTS SETMANALS - Banco Nacional SA
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
            Aquesta setmana hem detectat 18 canvis normatius rellevants pel banc:
            <br />• 5 alertes crítiques (requereixen acció immediata)
            <br />• 8 alertes mitjanes (seguiment recomanat)
            <br />• 5 alertes informatives (per coneixement)
            <br /><br />
            Focus principal: nova circular Banc d'Espanya sobre ràtios de capital i actualització normativa CNMV.
          </p>
        </div>

        <div>
          <h3 className="font-manrope font-bold text-base text-foreground mb-3">DESTACATS:</h3>
          <div className="space-y-4">
            <HighlightItem
              number="1"
              title="Circular 3/2025 (Capital): Requereix €25M adicionals"
              action="Comitè Riscos urgent + informe Consell"
            />
            <HighlightItem
              number="2"
              title="Ordre ECO/1523 (Comissions): Reducció tarifes retail -2%"
              action="Actualitzar sistema abans 1 Abril"
            />
            <HighlightItem
              number="3"
              title="Directiva UE: PSD3 en tràmit (pagaments digitals)"
              action="Transposició estimada Q3 2025"
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
              <span>Revisar pricing productes inversió (nova normativa CNMV)</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span>Adaptar app mòbil a nous requisits PSD3 abans de competència</span>
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
            EMAIL: Alerta Crítica - Circular 3/2025
          </h2>
          <p className="text-sm text-muted-foreground">Enviat a: Tots els usuaris (20)</p>
          <p className="text-sm text-muted-foreground">Data: 9 Gen 2025, 11:00</p>
        </div>
      </div>

      {/* Email Preview */}
      <div className="bg-muted/50 border border-border rounded-lg p-6 mt-6 font-sans">
        <div className="text-sm text-muted-foreground mb-4 space-y-1">
          <p>De: alertes@premsa.io</p>
          <p>Assumpte: 🔴 [CRÍTIC] Nova Circular Banc d'Espanya - Ràtios capital</p>
        </div>
        <div className="border-t-2 border-border my-4" />
        <div className="text-sm text-foreground leading-relaxed space-y-4">
          <p>Hola Carlos,</p>
          <p>
            Avui s'ha publicat la Circular 3/2025 del Banc d'Espanya que modifica els requisits
            de capital regulatori per entitats de crèdit.
          </p>
          <div>
            <p className="font-bold">IMPACTE PEL BANC:</p>
            <p>- Increment del 0,5% en el Tier 1 obligatori</p>
            <p>- Capital adicional requerit: est. €25M</p>
            <p>- Entrada en vigor: 1 Març 2025</p>
          </div>
          <div>
            <p className="font-bold">RECOMANACIÓ:</p>
            <p>Convocar Comitè de Riscos urgent per recalcular escenaris i preparar informe Consell.</p>
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
          <p className="text-sm text-muted-foreground">Enviat a: Compliance Officers (5) · 15 Gen 2025, 08:00</p>
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
      CONFIGURACIÓ - Banco Nacional SA
    </h1>

    {/* Compliance Areas */}
    <Card className="p-8">
      <h2 className="font-manrope font-semibold text-lg text-foreground mb-5">
        Àrees de compliance monitoritzades:
      </h2>
      <div className="space-y-3">
        <ConfigRow label="Bancari i financera" priority="Alta" priorityColor="bg-red-100 text-red-900" />
        <ConfigRow label="CNMV i mercats" priority="Alta" priorityColor="bg-red-100 text-red-900" />
        <ConfigRow label="Blanqueig de capitals" priority="Alta" priorityColor="bg-red-100 text-red-900" />
        <ConfigRow label="Protecció de dades" priority="Mitjana" priorityColor="bg-amber-100 text-amber-900" />
        <ConfigRow label="Fiscal" priority="Mitjana" priorityColor="bg-amber-100 text-amber-900" />
      </div>
    </Card>

    {/* Sources */}
    <Card className="p-8">
      <h2 className="font-manrope font-semibold text-lg text-foreground mb-5">
        Fonts actives:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {["BOE (Estatal)", "BOCM (Madrid)", "Directives UE (Banking)", "Circulars Banc d'Espanya"].map((source) => (
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
        Usuaris amb accés (20):
      </h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Users className="h-5 w-5 text-primary" />
          <span>5 Compliance Officers (accés complet)</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Users className="h-5 w-5 text-primary" />
          <span>12 Risk Analysts (alertes + reports)</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Users className="h-5 w-5 text-primary" />
          <span>3 Legal Counsel (accés complet)</span>
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
              <p className="font-bold text-sm text-foreground mb-2">IMPACTE PEL BANC:</p>
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

export default DemoBankingPage;
