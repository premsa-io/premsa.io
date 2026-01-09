import LegalLayout from "@/components/layout/LegalLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tocItems = [
  { id: "definicions", label: "Definicions" },
  { id: "abast", label: "Abast d'aquest SLA" },
  { id: "uptime", label: "Compromís d'Uptime" },
  { id: "exclusions", label: "Exclusions del Compromís" },
  { id: "calcul", label: "Càlcul d'Uptime" },
  { id: "suport", label: "Temps de Resposta de Suport" },
  { id: "manteniment", label: "Manteniment Programat" },
  { id: "credits", label: "Crèdits de Servei" },
  { id: "reclamacio", label: "Procediment de Reclamació" },
  { id: "limitacions", label: "Limitacions" },
  { id: "modificacions", label: "Modificacions" },
];

const SlaPage = () => {
  return (
    <LegalLayout
      title="Service Level Agreement (SLA)"
      lastUpdated="1 de Gener de 2025"
      summary="📊 Resum: Aquest SLA defineix els nostres compromisos de disponibilitat (uptime), temps de resposta i suport. Garantim 99,5% d'uptime mensual. Si no complim, rebràs crèdits de servei."
      tocItems={tocItems}
    >
      <p className="text-lg text-muted-foreground mb-8">
        <strong>Acord de Nivell de Servei</strong>
      </p>

      <p className="mb-6">
        Aquest Service Level Agreement ("SLA") estableix els compromisos de disponibilitat i suport que PREMSA.IO SL ("PREMSA.IO", "nosaltres") proporciona als seus clients ("Client", "tu") en relació amb els Serveis descrits als Terms & Conditions.
      </p>

      <p className="mb-8">
        <strong>Entrada en vigor:</strong> Aquest SLA s'aplica a partir de la data d'entrada en vigor del contracte entre el Client i PREMSA.IO.
      </p>

      {/* Secció 1 */}
      <section id="definicions" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4">1. Definicions</h2>

        <h3 className="text-xl font-medium mt-6 mb-3">1.1. Uptime (Temps de Funcionament)</h3>
        <p className="mb-4">
          Percentatge de temps durant el qual els Serveis estan disponibles i operatius dins d'un període de facturació mensual.
        </p>
        <div className="bg-muted/50 p-4 rounded-lg mb-4 font-mono text-sm">
          <strong>Fórmula:</strong><br />
          Uptime (%) = ((Total minuts mes - Downtime minuts) / Total minuts mes) × 100
        </div>

        <h3 className="text-xl font-medium mt-6 mb-3">1.2. Downtime (Temps d'Inactivitat)</h3>
        <p className="mb-4">
          Període de temps durant el qual els Serveis NO estan disponibles per al Client degut a un error o fallada imputable a PREMSA.IO.
        </p>
        <p className="mb-2"><strong>Què es considera Downtime:</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>La plataforma PREMSA.IO no respon a sol·licituds HTTP</li>
          <li>Errors crítics que impedeixen l'ús normal dels Serveis (ex: impossibilitat d'accedir, de rebre alertes, de consultar documents)</li>
          <li>API retorna errors 5xx de manera persistent (&gt;5 minuts)</li>
        </ul>
        <p className="mb-2"><strong>Què NO es considera Downtime:</strong> Veure clàusula 4 (Exclusions).</p>

        <h3 className="text-xl font-medium mt-6 mb-3">1.3. Incident</h3>
        <p className="mb-4">
          Qualsevol event que causa o pot causar Downtime o degradació del servei.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">1.4. Manteniment Programat</h3>
        <p className="mb-4">
          Període de temps en què PREMSA.IO realitza tasques de manteniment planificades que poden afectar la disponibilitat dels Serveis. Veure clàusula 7.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">1.5. Temps de Resposta de Suport</h3>
        <p className="mb-4">
          Temps transcorregut entre la recepció d'una sol·licitud de suport i la primera resposta de PREMSA.IO.
        </p>
      </section>

      {/* Secció 2 */}
      <section id="abast" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4">2. Abast d'aquest SLA</h2>

        <h3 className="text-xl font-medium mt-6 mb-3">2.1. Serveis Coberts</h3>
        <p className="mb-4">Aquest SLA s'aplica als següents components dels Serveis de PREMSA.IO:</p>

        <p className="mb-2"><strong>a) Plataforma Web:</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Accés a la plataforma via navegador (premsa.io/app)</li>
          <li>Autenticació i gestió de comptes</li>
          <li>Dashboard i funcionalitats principals</li>
        </ul>

        <p className="mb-2"><strong>b) API REST:</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Endpoints documentats a la API Reference</li>
          <li>Disponibilitat segons límits de rate</li>
        </ul>

        <p className="mb-2"><strong>c) Alertes i Notificacions:</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Generació d'alertes basades en documents normatius</li>
          <li>Enviament d'emails i notificacions</li>
        </ul>

        <p className="mb-2"><strong>d) Processament de Documents:</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Detecció automàtica de documents del BOE i CCAA</li>
          <li>Anàlisi IA i contextualització</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">2.2. Serveis NO Coberts</h3>
        <p className="mb-4">Aquest SLA NO s'aplica a:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Serveis de tercers (ex: AWS, Stripe, Google Analytics)</li>
          <li>Funcionalitats experimentals o en beta (clarament marcades com a tal)</li>
          <li>Problemes causats per factors fora del control de PREMSA.IO (veure clàusula 4)</li>
        </ul>
      </section>

      {/* Secció 3 */}
      <section id="uptime" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4">3. Compromís d'Uptime</h2>

        <h3 className="text-xl font-medium mt-6 mb-3">3.1. Objectiu d'Uptime Mensual</h3>
        <p className="mb-4">
          PREMSA.IO es compromet a mantenir un <strong>Uptime mínim del 99,5% mensual</strong> per als Serveis coberts per aquest SLA.
        </p>
        <div className="bg-primary/10 p-4 rounded-lg mb-4">
          <p className="mb-2"><strong>Què significa 99,5%:</strong></p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Downtime permès: Màxim ~3,6 hores per mes (216 minuts)</li>
            <li>Equivalent a: ~50 minuts per setmana o ~7 minuts per dia</li>
          </ul>
        </div>

        <h3 className="text-xl font-medium mt-6 mb-3">3.2. Càlcul per Període de Facturació</h3>
        <p className="mb-4">
          L'Uptime es calcula per cada període de facturació mensual (1r dia del mes a últim dia del mes, 00:00 a 23:59 UTC).
        </p>
        <div className="bg-muted/50 p-4 rounded-lg mb-4">
          <p className="mb-2"><strong>Exemple:</strong></p>
          <p className="font-mono text-sm">
            Mes: Gener (31 dies = 44.640 minuts)<br />
            Downtime registrat: 180 minuts (3 hores)<br />
            Uptime = ((44.640 - 180) / 44.640) × 100 = 99,60%<br />
            <strong>Resultat: COMPLEIX l'SLA (&gt;99,5%)</strong>
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6 mb-3">3.3. Monitorització</h3>
        <p className="mb-4">PREMSA.IO utilitza eines de monitorització automatitzades 24/7 per mesurar l'Uptime:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Checks cada 1 minut des de múltiples ubicacions geogràfiques</li>
          <li>Alertes automàtiques per Downtime &gt;2 minuts</li>
          <li>Dashboard públic d'estat: status.premsa.io (opcional)</li>
        </ul>
      </section>

      {/* Secció 4 */}
      <section id="exclusions" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4">4. Exclusions del Compromís</h2>
        <p className="mb-4">El compromís d'Uptime NO s'aplica a Downtime causat per:</p>

        <h3 className="text-xl font-medium mt-6 mb-3">4.1. Manteniment Programat</h3>
        <p className="mb-4">
          Períodes de manteniment notificats amb almenys 7 dies d'antelació. Veure clàusula 7.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">4.2. Causes Atribuïbles al Client</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Errors en la configuració realitzada pel Client</li>
          <li>Ús indegut o abús dels Serveis (ex: atacs DDoS originats pel Client)</li>
          <li>Incompliment dels Terms & Conditions</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">4.3. Factors Fora del Control de PREMSA.IO</h3>
        
        <p className="mb-2"><strong>a) Força Major:</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Desastres naturals (terratrèmols, inundacions, incendis)</li>
          <li>Actes de guerra o terrorisme</li>
          <li>Pandèmies o emergències sanitàries</li>
          <li>Fallades massives d'infraestructura d'Internet (ex: tall de cables submarins)</li>
        </ul>

        <p className="mb-2"><strong>b) Problemes de Tercers:</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Fallades d'AWS (hosting) que afectin múltiples regions</li>
          <li>Atacs DDoS massius dirigits a infraestructures d'Internet globals</li>
          <li>Problemes amb DNS globals</li>
        </ul>

        <p className="mb-2"><strong>c) Accions d'Autoritats:</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Ordes judicials o governamentals que requereixin la suspensió dels Serveis</li>
          <li>Atacs cibernètics coordinats per actors estatals</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">4.4. Problemes del Client</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Connexió a Internet del Client deficient o inoperativa</li>
          <li>Configuració incorrecta del navegador o firewall del Client</li>
          <li>Utilització de versions obsoletes de navegador no suportades</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">4.5. Funcionalitats en Beta</h3>
        <p className="mb-4">
          Funcionalitats clarament marcades com "Beta", "Experimental" o "Preview" NO estan cobertes per aquest SLA.
        </p>
      </section>

      {/* Secció 5 */}
      <section id="calcul" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4">5. Càlcul d'Uptime</h2>

        <h3 className="text-xl font-medium mt-6 mb-3">5.1. Mesura del Downtime</h3>
        <p className="mb-4">El Downtime es mesura des del moment en què:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>PREMSA.IO detecta el problema via monitorització automatitzada, o</li>
          <li>El Client notifica el problema a PREMSA.IO (el que succeeixi primer)</li>
        </ul>
        <p className="mb-4">Fins al moment en què:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Els Serveis es restableixen completament i funcionen normalment</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">5.2. Incidents de Curta Durada</h3>
        <p className="mb-4">
          Incidents amb Downtime inferior a 2 minuts NO es comptabilitzen per al càlcul d'Uptime (considerats "blips" normals).
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">5.3. Downtime Parcial</h3>
        <p className="mb-4">
          Si només algunes funcionalitats estan afectades però els Serveis principals estan operatius:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Es comptabilitza el 50% del temps com Downtime</li>
        </ul>
        <div className="bg-muted/50 p-4 rounded-lg mb-4">
          <p className="mb-2"><strong>Exemple:</strong></p>
          <p className="text-sm">
            API funciona, però dashboard té problemes d'interfície (no crítics)<br />
            Downtime comptabilitzat: 50% del temps de l'incident
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6 mb-3">5.4. Degradació del Servei</h3>
        <p className="mb-4">
          Si els Serveis funcionen però amb rendiment significativament reduït (ex: temps de resposta &gt;10 segons):
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Es comptabilitza el 25% del temps com Downtime</li>
        </ul>
        <div className="bg-muted/50 p-4 rounded-lg mb-4">
          <p className="mb-2"><strong>Exemple:</strong></p>
          <p className="text-sm">
            Plataforma accessible però molt lenta (latència 15 segons)<br />
            Downtime comptabilitzat: 25% del temps de l'incident
          </p>
        </div>
      </section>

      {/* Secció 6 */}
      <section id="suport" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4">6. Temps de Resposta de Suport</h2>

        <h3 className="text-xl font-medium mt-6 mb-3">6.1. Canals de Suport</h3>
        <p className="mb-4">PREMSA.IO proporciona suport tècnic via:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Email:</strong> support@premsa.io</li>
          <li><strong>Chat en viu:</strong> Des de la plataforma (Dilluns-Divendres, 9:00-18:00 CET)</li>
          <li><strong>Telèfon:</strong> +34 [Número] (només per clients Pla Compromís, emergències crítiques)</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">6.2. Horari de Suport</h3>
        <p className="mb-2"><strong>Horari estàndar:</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Dilluns a Divendres: 9:00 - 18:00 (CET)</li>
          <li>Caps de setmana i festius espanyols: No disponible (excepte emergències crítiques)</li>
        </ul>
        <p className="mb-2"><strong>Suport 24/7 per Incidents Crítics:</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Disponible per incidències que afectin completament els Serveis</li>
          <li>Temps de resposta garantit: Veure taula 6.3</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">6.3. Temps de Resposta Garantits</h3>
        <div className="overflow-x-auto mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Severitat</TableHead>
                <TableHead>Descripció</TableHead>
                <TableHead>Pla Flexible</TableHead>
                <TableHead>Pla Compromís</TableHead>
                <TableHead>Pilot</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Crítica</TableCell>
                <TableCell>Servei completament inoperatiu</TableCell>
                <TableCell>2 hores</TableCell>
                <TableCell>1 hora</TableCell>
                <TableCell>2 hores</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Alta</TableCell>
                <TableCell>Funcionalitat important afectada</TableCell>
                <TableCell>4 hores</TableCell>
                <TableCell>2 hores</TableCell>
                <TableCell>4 hores</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mitjana</TableCell>
                <TableCell>Problemes menors, workaround disponible</TableCell>
                <TableCell>8 hores (1 dia laboral)</TableCell>
                <TableCell>4 hores</TableCell>
                <TableCell>8 hores</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Baixa</TableCell>
                <TableCell>Consultes generals, preguntes</TableCell>
                <TableCell>24 hores</TableCell>
                <TableCell>12 hores</TableCell>
                <TableCell>24 hores</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          <strong>Notes:</strong> Temps de resposta: Temps fins a la primera resposta de PREMSA.IO, NO fins a la resolució. 
          Hores laborables: Dins de l'horari 9:00-18:00 CET (Dilluns-Divendres). 
          Incidents crítics: Resposta 24/7 independentment de l'horari.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">6.4. Temps de Resolució (Objectius, No Garantits)</h3>
        <div className="overflow-x-auto mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Severitat</TableHead>
                <TableHead>Objectiu de Resolució (No vinculant)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Crítica</TableCell>
                <TableCell>4 hores (best effort)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Alta</TableCell>
                <TableCell>24 hores</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mitjana</TableCell>
                <TableCell>3 dies laborables</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Baixa</TableCell>
                <TableCell>7 dies laborables</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          <strong>Nota Important:</strong> Els temps de resolució són objectius indicatius, NO garantits per aquest SLA. La complexitat de cada incident pot variar.
        </p>
      </section>

      {/* Secció 7 */}
      <section id="manteniment" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4">7. Manteniment Programat</h2>

        <h3 className="text-xl font-medium mt-6 mb-3">7.1. Definició</h3>
        <p className="mb-4">Manteniment Programat inclou:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Actualitzacions de seguretat crítiques</li>
          <li>Desplegament de noves funcionalitats</li>
          <li>Millores d'infraestructura</li>
          <li>Manteniment preventiu de bases de dades</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">7.2. Notificació</h3>
        <p className="mb-4">PREMSA.IO notificarà el manteniment programat amb almenys <strong>7 dies d'antelació</strong> via:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Email a l'adreça de contacte del Client</li>
          <li>Banner a la plataforma</li>
          <li>Pàgina d'estat (status.premsa.io, si disponible)</li>
        </ul>
        <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg mb-4">
          <p className="font-medium">Excepció - Manteniment d'Emergència:</p>
          <p className="text-sm">Per vulnerabilitats de seguretat crítiques (zero-day), el manteniment es pot realitzar amb 24 hores de preavís o menys si és absolutament necessari.</p>
        </div>

        <h3 className="text-xl font-medium mt-6 mb-3">7.3. Horari Preferent</h3>
        <p className="mb-4">El manteniment programat es realitzarà preferentment:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Dissabtes o Diumenges, 02:00 - 06:00 CET (horari de menys ús)</li>
          <li>Excepcionalment, dies laborables fora d'horari laboral</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">7.4. Durada Màxima</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Manteniment estàndar: Màxim 4 hores</li>
          <li>Si es requereix més temps, es notificarà amb antelació i es programarà en caps de setmana</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">7.5. Exclusió de l'SLA</h3>
        <p className="mb-4">
          El temps de Downtime durant manteniment programat (notificat correctament) NO es comptabilitza per al càlcul d'Uptime.
        </p>
        <div className="bg-muted/50 p-4 rounded-lg mb-4">
          <p className="mb-2"><strong>Exemple:</strong></p>
          <p className="font-mono text-sm">
            Mes: Febrer (28 dies = 40.320 minuts)<br />
            Downtime no programat: 150 minuts<br />
            Manteniment programat: 120 minuts (notificat 10 dies abans)<br />
            Uptime = ((40.320 - 150) / 40.320) × 100 = 99,63%<br />
            <strong>Resultat: COMPLEIX (manteniment programat no conta)</strong>
          </p>
        </div>
      </section>

      {/* Secció 8 */}
      <section id="credits" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4">8. Crèdits de Servei</h2>

        <h3 className="text-xl font-medium mt-6 mb-3">8.1. Dret a Crèdits</h3>
        <p className="mb-4">
          Si PREMSA.IO NO compleix amb el compromís d'Uptime del 99,5% en un mes de facturació, el Client té dret a rebre crèdits de servei segons la següent taula:
        </p>
        <div className="overflow-x-auto mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Uptime Mensual Aconseguit</TableHead>
                <TableHead>Crèdit de Servei</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>99,0% - 99,49%</TableCell>
                <TableCell>10% de la quota mensual</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>98,0% - 98,99%</TableCell>
                <TableCell>25% de la quota mensual</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>97,0% - 97,99%</TableCell>
                <TableCell>50% de la quota mensual</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>&lt;97,0%</TableCell>
                <TableCell>100% de la quota mensual</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="bg-muted/50 p-4 rounded-lg mb-4">
          <p className="mb-2"><strong>Exemple:</strong></p>
          <p className="text-sm">
            Quota mensual: €5.500<br />
            Uptime aconseguit: 98,5%<br />
            Crèdit: 25% de €5.500 = €1.375<br />
            Aplicació: Descompte a la factura del mes següent
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6 mb-3">8.2. Límit Màxim de Crèdits</h3>
        <p className="mb-4">
          El crèdit màxim per mes de facturació és del 100% de la quota mensual d'aquest mes.
        </p>
        <p className="mb-4">
          Els crèdits NO són acumulables entre mesos: si no es reclamen en el termini establert (veure 9.2), es perden.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">8.3. Forma d'Aplicació</h3>
        <p className="mb-4">Els crèdits s'aplicaran com:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Descompte a la factura del mes següent, o</li>
          <li>Extensió del període de servei (dies addicionals gratuïts), a elecció del Client</li>
        </ul>
        <p className="mb-4">
          Els crèdits NO es paguen en efectiu ni es reemborsaran.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">8.4. Crèdits per Plans</h3>
        <p className="mb-4">
          Tots els plans (Flexible, Compromís, Pilot) tenen dret als mateixos crèdits de servei.
        </p>
      </section>

      {/* Secció 9 */}
      <section id="reclamacio" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4">9. Procediment de Reclamació</h2>

        <h3 className="text-xl font-medium mt-6 mb-3">9.1. Notificació de Reclamació</h3>
        <p className="mb-4">Per reclamar crèdits de servei, el Client ha de:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Enviar un email a <strong>sla@premsa.io</strong></li>
          <li>Incloure:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Nom del compte</li>
              <li>Mes de facturació afectat</li>
              <li>Descripció de l'incident (si aplica)</li>
              <li>Sol·licitud explícita de crèdits</li>
            </ul>
          </li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">9.2. Termini de Reclamació</h3>
        <p className="mb-4">
          El Client ha de presentar la reclamació dins dels <strong>30 dies posteriors</strong> a la finalització del mes de facturació afectat.
        </p>
        <div className="bg-muted/50 p-4 rounded-lg mb-4">
          <p className="mb-2"><strong>Exemple:</strong></p>
          <p className="text-sm">
            Mes afectat: Gener 2025 (1-31 Gener)<br />
            Deadline reclamació: 2 Març 2025
          </p>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Reclamacions fora de termini NO seran acceptades.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">9.3. Verificació per PREMSA.IO</h3>
        <p className="mb-4">PREMSA.IO verificarà la reclamació:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Revisarà els logs de monitorització</li>
          <li>Calcularà l'Uptime real del mes</li>
          <li>Determinarà si apliquen exclusions (clàusula 4)</li>
          <li>Respondrà dins de 15 dies laborables</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">9.4. Resolució</h3>
        <p className="mb-2"><strong>Si la reclamació és vàlida:</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>PREMSA.IO emetrà el crèdit corresponent</li>
          <li>S'aplicarà a la següent factura (o s'estendrà el servei)</li>
          <li>El Client rebrà confirmació per email</li>
        </ul>
        <p className="mb-2"><strong>Si la reclamació és rebutjada:</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>PREMSA.IO proporcionarà una explicació detallada</li>
          <li>El Client pot sol·licitar revisió (escalació a supervisor)</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">9.5. Escalació</h3>
        <p className="mb-4">Si el Client no està satisfet amb la resolució:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Pot escalar a <strong>escalation@premsa.io</strong></li>
          <li>Un supervisor revisarà el cas dins de 10 dies laborables</li>
          <li>La decisió del supervisor és final</li>
        </ul>
      </section>

      {/* Secció 10 */}
      <section id="limitacions" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4">10. Limitacions</h2>

        <h3 className="text-xl font-medium mt-6 mb-3">10.1. Recurs Exclusiu</h3>
        <p className="mb-4">
          Els crèdits de servei descrits en aquest SLA constitueixen l'únic recurs del Client per incompliment de l'Uptime garantit.
        </p>
        <p className="mb-4">
          El Client NO pot reclamar danys addicionals, reemborsaments o compensacions més enllà dels crèdits establerts.
        </p>
        <p className="mb-4 text-sm text-muted-foreground">
          <strong>Excepció:</strong> Aquesta limitació NO s'aplica en cas de negligència greu o dol per part de PREMSA.IO.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">10.2. No Acumulació</h3>
        <p className="mb-4">Els crèdits de servei:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>NO són acumulables entre mesos</li>
          <li>NO es paguen en efectiu</li>
          <li>NO són transferibles a altres clients</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">10.3. Incidents Múltiples</h3>
        <p className="mb-4">Si diversos incidents afecten el mateix mes de facturació:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Es comptabilitza el Downtime total acumulat</li>
          <li>S'aplica un únic crèdit segons la taula de la clàusula 8.1</li>
        </ul>
        <div className="bg-muted/50 p-4 rounded-lg mb-4">
          <p className="mb-2"><strong>Exemple:</strong></p>
          <p className="text-sm">
            Incident A: 100 minuts Downtime<br />
            Incident B: 80 minuts Downtime<br />
            Total Downtime: 180 minuts<br />
            Crèdit: Segons Uptime resultant (un sol crèdit, no dos)
          </p>
        </div>
      </section>

      {/* Secció 11 */}
      <section id="modificacions" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4">11. Modificacions</h2>

        <h3 className="text-xl font-medium mt-6 mb-3">11.1. Dret a Modificar</h3>
        <p className="mb-4">PREMSA.IO es reserva el dret de modificar aquest SLA en qualsevol moment per:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Millorar els compromisos de servei</li>
          <li>Adaptar-se a canvis en la infraestructura</li>
          <li>Complir amb obligacions legals</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">11.2. Notificació de Modificacions</h3>
        <p className="mb-4">
          Les modificacions materials (que redueixin els compromisos) seran notificades amb <strong>60 dies d'antelació</strong> via email.
        </p>
        <p className="mb-4">
          Les millores (increment de garanties) s'aplicaran immediatament sense notificació prèvia.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">11.3. Acceptació</h3>
        <p className="mb-4">
          L'ús continuat dels Serveis després de l'entrada en vigor de les modificacions constitueix l'acceptació del SLA modificat.
        </p>
        <p className="mb-4">
          El Client pot rebutjar les modificacions desfavorables cancel·lant el servei abans de la data d'entrada en vigor, sense penalització.
        </p>
      </section>

      {/* Secció 12 */}
      <section className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4">12. Disposicions Generals</h2>

        <h3 className="text-xl font-medium mt-6 mb-3">12.1. Relació amb Altres Documents</h3>
        <p className="mb-4">Aquest SLA:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Complementa els Terms & Conditions</li>
          <li>En cas de conflicte, prevalen els Terms & Conditions en aspectes no relacionats amb nivells de servei</li>
          <li>Per aspectes de nivells de servei, aquest SLA preval</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">12.2. Divisibilitat</h3>
        <p className="mb-4">
          Si qualsevol disposició d'aquest SLA és declarada invàlida, la resta continuarà en ple vigor.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">12.3. Llei Aplicable</h3>
        <p className="mb-4">
          Aquest SLA es regeix per les lleis d'Espanya.
        </p>
      </section>

      {/* Secció 13 */}
      <section className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4">13. Contacte</h2>
        <p className="mb-4">Per preguntes sobre aquest SLA o per reclamar crèdits de servei:</p>
        <ul className="list-none space-y-2 mb-6">
          <li><strong>Email General SLA:</strong> sla@premsa.io</li>
          <li><strong>Suport Tècnic:</strong> support@premsa.io</li>
          <li><strong>Escalació:</strong> escalation@premsa.io</li>
          <li><strong>Adreça:</strong> PREMSA.IO SL, [Adreça], Barcelona, España</li>
          <li><strong>Horari de Suport:</strong> Dilluns-Divendres, 9:00-18:00 CET</li>
          <li><strong>Emergències crítiques:</strong> 24/7 via email (response time segons clàusula 6.3)</li>
        </ul>
      </section>

      {/* Annex */}
      <section className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4">Annex: Historial d'Uptime (Opcional)</h2>
        <p className="mb-4">
          PREMSA.IO pot publicar un historial d'Uptime mensual a status.premsa.io o proporcionar-lo al Client sota sol·licitud.
        </p>
        <div className="bg-muted/50 p-4 rounded-lg mb-4">
          <p className="mb-2"><strong>Exemple de format:</strong></p>
          <pre className="font-mono text-sm whitespace-pre overflow-x-auto">
{`Mes        | Uptime | Incidents | Downtime Total
-----------+--------+-----------+----------------
Gen 2025   | 99,92% | 2         | 35 minuts
Feb 2025   | 99,85% | 1         | 65 minuts
Mar 2025   | 99,98% | 0         | 9 minuts`}
          </pre>
        </div>
      </section>

      {/* Dates finals */}
      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          <strong>Data d'entrada en vigor:</strong> 1 de Gener de 2025
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Última actualització:</strong> 1 de Gener de 2025
        </p>
      </div>
    </LegalLayout>
  );
};

export default SlaPage;
