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
  { id: "que-son", label: "Què són les Cookies?" },
  { id: "per-que", label: "Per què Utilitzem Cookies?" },
  { id: "tipus", label: "Tipus de Cookies que Utilitzem" },
  { id: "tercers", label: "Cookies de Tercers" },
  { id: "gestionar", label: "Com Gestionar les Cookies" },
  { id: "legislacio", label: "Cookies i Legislació" },
  { id: "actualitzacions", label: "Actualitzacions d'aquesta Política" },
  { id: "contacte", label: "Contacte" },
];

const CookiesPage = () => {
  return (
    <LegalLayout
      title="Cookie Policy"
      lastUpdated="1 de Gener de 2025"
      summary="🍪 Resum en llenguatge clar: Usem cookies per fer funcionar la web (essencials) i per entendre com la utilitzes (analítiques). Pots acceptar-les totes o només les essencials. Canvia les preferències quan vulguis."
      tocItems={tocItems}
    >
      {/* 1. QUÈ SÓN LES COOKIES? */}
      <section id="que-son">
        <h2>1. Què són les Cookies?</h2>
        <p>
          Les cookies són petits fitxers de text que es guarden al teu dispositiu (ordinador, tauleta, telèfon mòbil) quan visites un lloc web. Permeten que el lloc web recordi les teves accions i preferències durant un període de temps, així no has de tornar a introduir-les cada vegada que tornes al lloc o navegues d'una pàgina a una altra.
        </p>

        <h3>Informació que poden contenir:</h3>
        <ul>
          <li>Identificadors únics (per reconèixer el teu navegador)</li>
          <li>Preferències d'usuari (idioma, configuració)</li>
          <li>Dades de sessió (si has iniciat sessió)</li>
          <li>Informació d'anàlisi (pàgines visitades, temps a cada pàgina)</li>
        </ul>

        <h3>Informació que NO contenen:</h3>
        <ul>
          <li>Noms, adreces de correu electrònic o altra informació personal identificable (tret que tu la proporcionis)</li>
          <li>Virus o malware</li>
        </ul>
      </section>

      {/* 2. PER QUÈ UTILITZEM COOKIES? */}
      <section id="per-que">
        <h2>2. Per què Utilitzem Cookies?</h2>
        <p>A PREMSA.IO utilitzem cookies per diversos propòsits:</p>

        <h3>2.1. Funcionalitat Essencial</h3>
        <ul>
          <li>Mantenir-te autenticat mentre navegues per la plataforma</li>
          <li>Recordar les teves preferències (idioma, tema visual)</li>
          <li>Garantir la seguretat de la teva sessió</li>
          <li>Prevenir activitat fraudulenta</li>
        </ul>

        <h3>2.2. Rendiment i Anàlisi</h3>
        <ul>
          <li>Entendre com utilitzes la nostra web i plataforma</li>
          <li>Identificar problemes tècnics</li>
          <li>Mesurar l'efectivitat de les nostres pàgines</li>
          <li>Millorar l'experiència d'usuari</li>
        </ul>

        <h3>2.3. Màrqueting (només amb consentiment)</h3>
        <ul>
          <li>Recordar que ja has visitat el nostre lloc</li>
          <li>Mostrar-te contingut rellevant basat en els teus interessos</li>
          <li>Mesurar l'efectivitat de les campanyes publicitàries</li>
        </ul>
      </section>

      {/* 3. TIPUS DE COOKIES QUE UTILITZEM */}
      <section id="tipus">
        <h2>3. Tipus de Cookies que Utilitzem</h2>
        <p>Les cookies es poden classificar de diverses maneres:</p>

        <h3>3.1. Per Finalitat</h3>

        <h4>A) COOKIES ESSENCIALS / ESTRICTAMENT NECESSÀRIES</h4>
        <p>Aquestes cookies són imprescindibles per al funcionament de la web. No requereixen el teu consentiment segons la legislació vigent.</p>
        
        <div className="overflow-x-auto my-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cookie</TableHead>
                <TableHead>Propòsit</TableHead>
                <TableHead>Durada</TableHead>
                <TableHead>Tipus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono text-sm">premsa_session</TableCell>
                <TableCell>Mantenir la sessió d'usuari autenticada</TableCell>
                <TableCell>Sessió (elimina en tancar navegador)</TableCell>
                <TableCell>Primera part</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">premsa_csrf</TableCell>
                <TableCell>Protecció contra atacs CSRF (seguretat)</TableCell>
                <TableCell>Sessió</TableCell>
                <TableCell>Primera part</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">premsa_auth_token</TableCell>
                <TableCell>Token d'autenticació encriptat</TableCell>
                <TableCell>7 dies</TableCell>
                <TableCell>Primera part</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">cookie_consent</TableCell>
                <TableCell>Recorda les teves preferències de cookies</TableCell>
                <TableCell>1 any</TableCell>
                <TableCell>Primera part</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p><strong>Nota:</strong> Aquestes cookies no es poden desactivar si vols utilitzar la plataforma.</p>

        <h4>B) COOKIES DE RENDIMENT I ANALÍTIQUES</h4>
        <p>Recopilen informació sobre com utilitzes la web per ajudar-nos a millorar-la. Totes les dades es recopilen de forma agregada i anònima.</p>
        <p><strong>Requereixen consentiment.</strong></p>

        <div className="overflow-x-auto my-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cookie</TableHead>
                <TableHead>Proveïdor</TableHead>
                <TableHead>Propòsit</TableHead>
                <TableHead>Durada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono text-sm">_ga</TableCell>
                <TableCell>Google Analytics</TableCell>
                <TableCell>Identificador únic d'usuari per anàlisi</TableCell>
                <TableCell>2 anys</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">_ga_*</TableCell>
                <TableCell>Google Analytics</TableCell>
                <TableCell>Mantenir l'estat de la sessió</TableCell>
                <TableCell>2 anys</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">_gid</TableCell>
                <TableCell>Google Analytics</TableCell>
                <TableCell>Distingir usuaris</TableCell>
                <TableCell>24 hores</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">_gat</TableCell>
                <TableCell>Google Analytics</TableCell>
                <TableCell>Limitar la freqüència de sol·licituds</TableCell>
                <TableCell>1 minut</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <h5>Què mesuren:</h5>
        <ul>
          <li>Pàgines visitades</li>
          <li>Temps a cada pàgina</li>
          <li>Ruta de navegació</li>
          <li>Dispositiu i navegador utilitzat</li>
          <li>Font de trànsit (Google, directe, etc.)</li>
          <li>Bounce rate i conversions</li>
        </ul>

        <h5>Configuració de privacitat:</h5>
        <ul>
          <li>IP anonimitzada (últims dígits eliminats)</li>
          <li>No compartim dades personals amb Google</li>
          <li>Dades agregades, no individuals</li>
        </ul>
        <p><strong>Proveïdor:</strong> Google LLC (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Política de privacitat</a>)</p>

        <h4>C) COOKIES DE FUNCIONALITAT</h4>
        <p>Permeten recordar les teves preferències per oferir-te una experiència més personalitzada.</p>
        <p><strong>Requereixen consentiment.</strong></p>

        <div className="overflow-x-auto my-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cookie</TableHead>
                <TableHead>Propòsit</TableHead>
                <TableHead>Durada</TableHead>
                <TableHead>Tipus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono text-sm">premsa_theme</TableCell>
                <TableCell>Recordar tema visual (clar/fosc)</TableCell>
                <TableCell>1 any</TableCell>
                <TableCell>Primera part</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">premsa_language</TableCell>
                <TableCell>Recordar idioma preferit</TableCell>
                <TableCell>1 any</TableCell>
                <TableCell>Primera part</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">premsa_sidebar_state</TableCell>
                <TableCell>Recordar si sidebar està col·lapsat</TableCell>
                <TableCell>Sessió</TableCell>
                <TableCell>Primera part</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <h4>D) COOKIES DE MÀRQUETING I PUBLICITAT</h4>
        <p>Utilitzades per mostrar anuncis rellevants i mesurar l'eficàcia de campanyes publicitàries.</p>
        <p><strong>Requereixen consentiment.</strong></p>
        <p><strong>Actualment NO utilitzem cookies de màrqueting</strong>, però si ho fem en el futur t'avisarem i demanarem consentiment explícit.</p>
        <p>Exemples de cookies que podríem utilitzar:</p>
        <ul>
          <li>Google Ads remarketing</li>
          <li>Facebook Pixel</li>
          <li>LinkedIn Insight Tag</li>
        </ul>

        <h3>3.2. Per Durada</h3>

        <h4>A) Cookies de Sessió</h4>
        <ul>
          <li>S'eliminen automàticament quan tanques el navegador</li>
          <li>Utilitzades per funcionalitat essencial (autenticació, seguretat)</li>
        </ul>

        <h4>B) Cookies Persistents</h4>
        <ul>
          <li>Romanen al teu dispositiu durant un temps definit (dies, mesos, anys)</li>
          <li>Utilitzades per recordar preferències i anàlisi a llarg termini</li>
        </ul>

        <h3>3.3. Per Origen</h3>

        <h4>A) Cookies de Primera Part (First-party)</h4>
        <ul>
          <li>Establertes directament per PREMSA.IO</li>
          <li>Exemples: premsa_session, premsa_auth_token</li>
        </ul>

        <h4>B) Cookies de Tercers (Third-party)</h4>
        <ul>
          <li>Establertes per serveis externs que utilitzem</li>
          <li>Exemples: Google Analytics (_ga, _gid)</li>
        </ul>
      </section>

      {/* 4. COOKIES DE TERCERS */}
      <section id="tercers">
        <h2>4. Cookies de Tercers</h2>

        <h3>4.1. Google Analytics 4</h3>
        <p><strong>Propòsit:</strong> Anàlisi d'ús de la web i plataforma</p>
        <p><strong>Dades recopilades:</strong></p>
        <ul>
          <li>Pàgines visitades</li>
          <li>Temps a cada pàgina</li>
          <li>Events (clics en botons, descàrregues, etc.)</li>
          <li>Informació del dispositiu (navegador, SO, resolució)</li>
          <li>Font de trànsit</li>
        </ul>
        <p><strong>Protecció de privacitat:</strong></p>
        <ul>
          <li>IP anonimitzada (últims octets eliminats)</li>
          <li>No es recopila informació personalment identificable</li>
          <li>Data Processing Agreement (DPA) amb Google conforme GDPR</li>
          <li>Transferència UE-US protegida per Standard Contractual Clauses</li>
        </ul>
        <p><strong>Política de privacitat de Google:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></p>
        <p><strong>Com desactivar Google Analytics:</strong></p>
        <ul>
          <li>Utilitzar l'extensió del navegador: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a></li>
          <li>O desactivar-ho des del nostre Cookie Consent Banner</li>
        </ul>

        <h3>4.2. Hotjar (Si activat)</h3>
        <p><strong>Propòsit:</strong> Heatmaps, recordings de sessió (anonimitzats), feedback</p>
        <p><strong>Dades recopilades:</strong></p>
        <ul>
          <li>Moviments del ratolí i clics</li>
          <li>Scroll depth</li>
          <li>Formularis emplenats (NO captura dades sensibles com contrasenyes)</li>
        </ul>
        <p><strong>Protecció de privacitat:</strong></p>
        <ul>
          <li>Sessions anonimitzades (no lligades a identitats reals)</li>
          <li>IP anonimitzada</li>
          <li>No captura dades de camps de contrasenya o targeta de crèdit</li>
          <li>DPA conforme GDPR</li>
        </ul>
        <p><strong>Política de privacitat de Hotjar:</strong> <a href="https://www.hotjar.com/legal/policies/privacy" target="_blank" rel="noopener noreferrer">https://www.hotjar.com/legal/policies/privacy</a></p>

        <h3>4.3. Stripe (Processament de Pagaments)</h3>
        <p><strong>Propòsit:</strong> Processar pagaments amb targeta de forma segura</p>
        <p><strong>Cookies:</strong></p>
        <ul>
          <li><code>__stripe_mid</code>: Identificador per prevenció de frau</li>
          <li><code>__stripe_sid</code>: Gestió de sessió de pagament</li>
        </ul>
        <p><strong>Protecció:</strong></p>
        <ul>
          <li>Dades de targeta NO passen pels nostres servidors (Stripe les processa directament)</li>
          <li>Conforme PCI-DSS nivell 1</li>
          <li>DPA conforme GDPR</li>
        </ul>
        <p><strong>Política de privacitat de Stripe:</strong> <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">https://stripe.com/privacy</a></p>
      </section>

      {/* 5. COM GESTIONAR LES COOKIES */}
      <section id="gestionar">
        <h2>5. Com Gestionar les Cookies</h2>
        <p>Tens control total sobre les cookies que acceptes.</p>

        <h3>5.1. Banner de Consentiment de Cookies</h3>
        <p>Quan visites PREMSA.IO per primera vegada, veus un banner amb aquestes opcions:</p>
        
        <div className="bg-muted rounded-lg p-4 my-4 font-mono text-sm">
          <pre className="whitespace-pre-wrap">
{`┌────────────────────────────────────────────────────┐
│  🍪 Usem cookies per millorar la teva experiència  │
│                                                     │
│  [Acceptar Tot]  [Només Essencials]  [Configurar]  │
│  Més info: Cookie Policy                           │
└────────────────────────────────────────────────────┘`}
          </pre>
        </div>

        <h4>"Acceptar Tot":</h4>
        <ul>
          <li>Acceptes cookies essencials, analítiques i funcionals</li>
          <li>Ens ajudes a millorar el servei amb dades d'ús</li>
        </ul>

        <h4>"Només Essencials":</h4>
        <ul>
          <li>Només cookies necessàries per al funcionament</li>
          <li>No recopilem dades analítiques</li>
        </ul>

        <h4>"Configurar":</h4>
        <ul>
          <li>Tries exactament quines categories acceptes</li>
          <li>Control granular per tipus de cookie</li>
        </ul>

        <h4>Canviar Preferències Més Tard:</h4>
        <ul>
          <li>Des de Configuració &gt; Privacitat &gt; Gestionar Cookies</li>
          <li>O fes clic al link "Cookie Settings" al footer</li>
        </ul>

        <h3>5.2. Configuració del Navegador</h3>
        <p>Pots gestionar o eliminar cookies directament des del teu navegador:</p>

        <h4>Google Chrome:</h4>
        <ul>
          <li>Configuració &gt; Privacitat i seguretat &gt; Cookies i altres dades de llocs</li>
          <li>Tria "Bloqueja les cookies de tercers" o gestiona-les individualment</li>
        </ul>

        <h4>Firefox:</h4>
        <ul>
          <li>Configuració &gt; Privacitat i seguretat &gt; Cookies i dades del lloc</li>
          <li>Tria nivell de protecció o gestiona excepcions</li>
        </ul>

        <h4>Safari:</h4>
        <ul>
          <li>Preferències &gt; Privacitat</li>
          <li>Gestiona "Cookies i dades de llocs web"</li>
        </ul>

        <h4>Edge:</h4>
        <ul>
          <li>Configuració &gt; Cookies i permisos del lloc &gt; Cookies i dades emmagatzemades</li>
          <li>Gestiona o bloqueja cookies</li>
        </ul>

        <p><strong>Atenció:</strong> Bloquejar totes les cookies pot afectar la funcionalitat de PREMSA.IO (no podràs iniciar sessió o algunes funcionalitats no funcionaran correctament).</p>

        <h3>5.3. Eines de Desactivació de Tercers</h3>

        <h4>Google Analytics Opt-out:</h4>
        <ul>
          <li>Extensió del navegador: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a></li>
          <li>Instal·la-la per desactivar Google Analytics a tots els llocs web</li>
        </ul>

        <h4>Network Advertising Initiative (NAI):</h4>
        <ul>
          <li>Eina per desactivar publicitat personalitzada: <a href="http://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">http://optout.networkadvertising.org/</a></li>
        </ul>

        <h4>Your Online Choices:</h4>
        <ul>
          <li>Gestió de cookies publicitàries a Europa: <a href="http://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">http://www.youronlinechoices.eu/</a></li>
        </ul>
      </section>

      {/* 6. COOKIES I LEGISLACIÓ */}
      <section id="legislacio">
        <h2>6. Cookies i Legislació</h2>

        <h3>6.1. GDPR (Reglament General de Protecció de Dades)</h3>
        <p>Sota el GDPR, les cookies que no són estrictament necessàries requereixen consentiment explícit i informat abans d'establir-se.</p>
        <p>PREMSA.IO compleix amb el GDPR:</p>
        <ul>
          <li>✅ Banner de consentiment abans d'establir cookies no essencials</li>
          <li>✅ Opció clara de rebutjar cookies no essencials</li>
          <li>✅ Informació transparent sobre cada tipus de cookie</li>
          <li>✅ Fàcil retirada del consentiment</li>
        </ul>

        <h3>6.2. LSSI (Llei de Serveis de la Societat de la Informació)</h3>
        <p>La Llei 34/2002 (LSSI) d'Espanya també regula l'ús de cookies i requereix:</p>
        <ul>
          <li>Informar clarament sobre l'ús de cookies</li>
          <li>Obtenir consentiment per cookies no essencials</li>
          <li>Permetre rebutjar cookies</li>
        </ul>
        <p>PREMSA.IO compleix amb la LSSI proporcionant aquesta Cookie Policy i el banner de consentiment.</p>

        <h3>6.3. Directiva ePrivacy</h3>
        <p>La Directiva 2002/58/CE (modificada per la Directiva 2009/136/CE) estableix les regles sobre cookies a la UE. PREMSA.IO compleix amb tots els requisits.</p>
      </section>

      {/* 7. ACTUALITZACIONS D'AQUESTA POLÍTICA */}
      <section id="actualitzacions">
        <h2>7. Actualitzacions d'aquesta Política</h2>
        <p>Aquesta Cookie Policy pot actualitzar-se per reflectir canvis en:</p>
        <ul>
          <li>Les cookies que utilitzem</li>
          <li>La legislació vigent</li>
          <li>Les nostres pràctiques de dades</li>
        </ul>

        <h3>Notificació de Canvis:</h3>
        <ul>
          <li>Si fem canvis materials, t'avisarem via banner a la web</li>
          <li>La data "Última actualització" al principi d'aquesta política es modificarà</li>
          <li>En alguns casos, pot ser necessari demanar-te el consentiment novament</li>
        </ul>

        <h3>Revisió Regular:</h3>
        <p>Et recomanem revisar aquesta política periòdicament per estar informat.</p>
      </section>

      {/* 8. CONTACTE */}
      <section id="contacte">
        <h2>8. Contacte</h2>
        <p>Si tens preguntes sobre l'ús de cookies a PREMSA.IO:</p>
        <ul>
          <li><strong>Email:</strong> privacy@premsa.io</li>
          <li><strong>Delegat de Protecció de Dades:</strong> dpo@premsa.io</li>
          <li><strong>Adreça:</strong> PREMSA.IO SL, [Adreça], Barcelona, España</li>
        </ul>
        <p>També pots contactar amb l'Agència Espanyola de Protecció de Dades (AEPD) si creus que no complim amb la legislació:</p>
        <ul>
          <li><strong>Web:</strong> www.aepd.es</li>
          <li><strong>Telèfon:</strong> 901 100 099</li>
        </ul>

        <p className="mt-8 text-sm text-muted-foreground">
          <strong>Data d'entrada en vigor:</strong> 1 de Gener de 2025<br />
          <strong>Última actualització:</strong> 1 de Gener de 2025
        </p>
      </section>

      {/* ANNEX: LLISTA COMPLETA DE COOKIES */}
      <section id="annex" className="mt-12 pt-8 border-t border-border">
        <h2>Annex: Llista Completa de Cookies</h2>
        <p><strong>Taula Resum de Totes les Cookies:</strong></p>

        <div className="overflow-x-auto my-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Proveïdor</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Propòsit</TableHead>
                <TableHead>Durada</TableHead>
                <TableHead>Consentiment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono text-sm">premsa_session</TableCell>
                <TableCell>PREMSA.IO</TableCell>
                <TableCell>Essencial</TableCell>
                <TableCell>Sessió d'usuari</TableCell>
                <TableCell>Sessió</TableCell>
                <TableCell>No requerit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">premsa_csrf</TableCell>
                <TableCell>PREMSA.IO</TableCell>
                <TableCell>Essencial</TableCell>
                <TableCell>Seguretat CSRF</TableCell>
                <TableCell>Sessió</TableCell>
                <TableCell>No requerit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">premsa_auth_token</TableCell>
                <TableCell>PREMSA.IO</TableCell>
                <TableCell>Essencial</TableCell>
                <TableCell>Token autenticació</TableCell>
                <TableCell>7 dies</TableCell>
                <TableCell>No requerit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">cookie_consent</TableCell>
                <TableCell>PREMSA.IO</TableCell>
                <TableCell>Essencial</TableCell>
                <TableCell>Preferències cookies</TableCell>
                <TableCell>1 any</TableCell>
                <TableCell>No requerit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">premsa_theme</TableCell>
                <TableCell>PREMSA.IO</TableCell>
                <TableCell>Funcional</TableCell>
                <TableCell>Tema visual</TableCell>
                <TableCell>1 any</TableCell>
                <TableCell>Requerit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">premsa_language</TableCell>
                <TableCell>PREMSA.IO</TableCell>
                <TableCell>Funcional</TableCell>
                <TableCell>Idioma</TableCell>
                <TableCell>1 any</TableCell>
                <TableCell>Requerit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">premsa_sidebar_state</TableCell>
                <TableCell>PREMSA.IO</TableCell>
                <TableCell>Funcional</TableCell>
                <TableCell>Estat sidebar</TableCell>
                <TableCell>Sessió</TableCell>
                <TableCell>Requerit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">_ga</TableCell>
                <TableCell>Google</TableCell>
                <TableCell>Analítica</TableCell>
                <TableCell>Identificador usuari</TableCell>
                <TableCell>2 anys</TableCell>
                <TableCell>Requerit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">_ga_*</TableCell>
                <TableCell>Google</TableCell>
                <TableCell>Analítica</TableCell>
                <TableCell>Estat sessió GA</TableCell>
                <TableCell>2 anys</TableCell>
                <TableCell>Requerit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">_gid</TableCell>
                <TableCell>Google</TableCell>
                <TableCell>Analítica</TableCell>
                <TableCell>Distingir usuaris</TableCell>
                <TableCell>24h</TableCell>
                <TableCell>Requerit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">_gat</TableCell>
                <TableCell>Google</TableCell>
                <TableCell>Analítica</TableCell>
                <TableCell>Limitar requests</TableCell>
                <TableCell>1 min</TableCell>
                <TableCell>Requerit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">__stripe_mid</TableCell>
                <TableCell>Stripe</TableCell>
                <TableCell>Essencial (pagament)</TableCell>
                <TableCell>Prevenció frau</TableCell>
                <TableCell>1 any</TableCell>
                <TableCell>No requerit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">__stripe_sid</TableCell>
                <TableCell>Stripe</TableCell>
                <TableCell>Essencial (pagament)</TableCell>
                <TableCell>Sessió pagament</TableCell>
                <TableCell>30 min</TableCell>
                <TableCell>No requerit</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>
    </LegalLayout>
  );
};

export default CookiesPage;
