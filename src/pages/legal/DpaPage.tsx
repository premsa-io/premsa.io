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
  { id: "objecte", label: "Objecte i Durada" },
  { id: "naturalesa", label: "Naturalesa i Finalitat del Tractament" },
  { id: "tipus-dades", label: "Tipus de Dades i Categories" },
  { id: "obligacions-responsable", label: "Obligacions del Responsable" },
  { id: "obligacions-encarregat", label: "Obligacions de l'Encarregat" },
  { id: "mesures-seguretat", label: "Mesures de Seguretat" },
  { id: "sub-encarregats", label: "Sub-encarregats del Tractament" },
  { id: "drets-interessats", label: "Drets dels Interessats" },
  { id: "violacions", label: "Notificació de Violacions" },
  { id: "auditories", label: "Auditories i Inspeccions" },
  { id: "transferencies", label: "Transferències Internacionals" },
  { id: "supressio", label: "Supressió o Devolució de Dades" },
  { id: "responsabilitat", label: "Responsabilitat i Indemnització" },
  { id: "durada", label: "Durada i Terminació" },
  { id: "llei", label: "Llei Aplicable" },
];

const DpaPage = () => {
  return (
    <LegalLayout
      title="Data Processing Agreement (DPA)"
      lastUpdated="1 de Gener de 2025"
      summary="📜 Resum: Aquest document estableix com PREMSA.IO (Encarregat) processa les dades personals en nom del teu empresa (Responsable). Garanteix que complim amb el GDPR i protegim les teves dades amb mesures de seguretat avançades."
      tocItems={tocItems}
    >
      {/* Introducció */}
      <section className="mb-8">
        <p className="text-lg font-medium text-foreground mb-4">Acord d'Encarregat del Tractament conforme al GDPR</p>
        
        <h3>Entre:</h3>
        <p><strong>1. EL RESPONSABLE DEL TRACTAMENT</strong> (d'ara endavant, "el Client" o "Responsable")</p>
        <ul>
          <li>Nom: [Nom del Client]</li>
          <li>NIF/CIF: [Identificació fiscal]</li>
          <li>Adreça: [Adreça del Client]</li>
          <li>Email: [Email del Client]</li>
        </ul>

        <p className="mt-4"><strong>I</strong></p>

        <p><strong>2. L'ENCARREGAT DEL TRACTAMENT</strong> (d'ara endavant, "PREMSA.IO" o "Encarregat")</p>
        <ul>
          <li>Nom: PREMSA.IO SL</li>
          <li>NIF: [Número d'identificació fiscal]</li>
          <li>Adreça: [Adreça completa], Barcelona, España</li>
          <li>Email: dpo@premsa.io</li>
        </ul>

        <h3 className="mt-6">EXPOSEN:</h3>
        <p><strong>I.</strong> Que el Client contracta els serveis de PREMSA.IO descrits als Terms & Conditions.</p>
        <p><strong>II.</strong> Que en l'execució d'aquests serveis, PREMSA.IO pot accedir i processar dades personals en nom del Client.</p>
        <p><strong>III.</strong> Que ambdues parts estan subjectes al Reglament (UE) 2016/679 del Parlament Europeu i del Consell, de 27 d'abril de 2016, relatiu a la protecció de les persones físiques pel que fa al tractament de dades personals i a la lliure circulació d'aquestes dades (GDPR) i a la Llei Orgànica 3/2018, de 5 de desembre, de Protecció de Dades Personals i garantia dels drets digitals (LOPDGDD).</p>
        <p><strong>IV.</strong> Que és necessari formalitzar aquest Acord d'Encarregat del Tractament conforme a l'article 28 del GDPR.</p>
        <p className="mt-4"><strong>Per tot això, les parts ACORDEN:</strong></p>
      </section>

      {/* 1. DEFINICIONS */}
      <section id="definicions">
        <h2>1. Definicions</h2>
        <p>Als efectes d'aquest Acord, s'aplicaran les definicions establertes al GDPR, en particular:</p>
        
        <p><strong>1.1. Dades Personals:</strong> Tota informació sobre una persona física identificada o identificable (Art. 4.1 GDPR).</p>
        
        <p><strong>1.2. Tractament:</strong> Qualsevol operació efectuada sobre dades personals: recollida, registre, organització, estructuració, conservació, adaptació, modificació, extracció, consulta, utilització, comunicació, difusió, supressió o destrucció (Art. 4.2 GDPR).</p>
        
        <p><strong>1.3. Responsable del Tractament:</strong> Persona física o jurídica que determina els fins i mitjans del tractament de dades personals (Art. 4.7 GDPR). En aquest Acord: el Client.</p>
        
        <p><strong>1.4. Encarregat del Tractament:</strong> Persona física o jurídica que tracta dades personals per compte del Responsable (Art. 4.8 GDPR). En aquest Acord: PREMSA.IO.</p>
        
        <p><strong>1.5. Interessat:</strong> Persona física identificada o identificable a qui es refereixen les dades personals (Art. 4.1 GDPR).</p>
        
        <p><strong>1.6. Violació de Seguretat:</strong> Violació de la seguretat que ocasioni la destrucció, pèrdua o alteració accidental o il·lícita de dades personals, o la comunicació o accés no autoritzats (Art. 4.12 GDPR).</p>
        
        <p><strong>1.7. Sub-encarregat:</strong> Tercer contractat per l'Encarregat per executar activitats de tractament específiques en nom del Responsable.</p>
      </section>

      {/* 2. OBJECTE I DURADA */}
      <section id="objecte">
        <h2>2. Objecte i Durada</h2>
        
        <h3>2.1. Objecte</h3>
        <p>L'objecte d'aquest Acord és regular les condicions sota les quals PREMSA.IO processarà dades personals en nom del Client per proporcionar els Serveis descrits als Terms & Conditions.</p>
        <p>Aquest Acord complementa i forma part integral dels Terms & Conditions entre les parts.</p>

        <h3>2.2. Durada</h3>
        <p>Aquest Acord entrarà en vigor en la data d'acceptació dels Terms & Conditions pel Client i romandrà vigent mentre duri la relació contractual.</p>
        <p>Després de la terminació del contracte, les obligacions de confidencialitat i seguretat continuaran vigents durant el període necessari per completar la supressió o devolució de les dades (veure clàusula 13).</p>
      </section>

      {/* 3. NATURALESA I FINALITAT DEL TRACTAMENT */}
      <section id="naturalesa">
        <h2>3. Naturalesa i Finalitat del Tractament</h2>

        <h3>3.1. Naturalesa del Tractament</h3>
        <p>PREMSA.IO actuarà exclusivament com a Encarregat del Tractament respecte de les dades personals processades en el marc dels Serveis.</p>

        <h3>3.2. Finalitat del Tractament</h3>
        <p>PREMSA.IO tractarà les dades personals únicament per les següents finalitats:</p>

        <h4>a) Proporcionar els Serveis contractats:</h4>
        <ul>
          <li>Gestionar comptes d'usuari</li>
          <li>Processar alertes i notificacions</li>
          <li>Generar reports personalitzats</li>
          <li>Proporcionar accés a la plataforma</li>
        </ul>

        <h4>b) Complir amb obligacions contractuals:</h4>
        <ul>
          <li>Facturació i cobrament</li>
          <li>Suport tècnic i atenció al client</li>
          <li>Manteniment de la plataforma</li>
        </ul>

        <h4>c) Complir amb obligacions legals:</h4>
        <ul>
          <li>Conservació de dades de facturació (requisit fiscal)</li>
          <li>Respondre a requeriments d'autoritats competents</li>
        </ul>

        <h3>3.3. Prohibició de Tractament amb Altres Finalitats</h3>
        <p>PREMSA.IO no tractarà les dades personals per a finalitats diferents de les descrites anteriorment sense el consentiment previ i explícit per escrit del Client.</p>
        <p>En particular, PREMSA.IO <strong>NO</strong>:</p>
        <ul>
          <li>Vendrà, llogarà o comercialitzarà les dades personals a tercers</li>
          <li>Utilitzarà les dades per a fins de màrqueting propi sense consentiment</li>
          <li>Combinarà les dades amb altres bases de dades pròpies</li>
        </ul>
      </section>

      {/* 4. TIPUS DE DADES I CATEGORIES D'INTERESSATS */}
      <section id="tipus-dades">
        <h2>4. Tipus de Dades i Categories d'Interessats</h2>

        <h3>4.1. Tipus de Dades Personals Tractades</h3>
        <p>Les categories de dades personals que PREMSA.IO pot processar inclouen:</p>

        <h4>a) Dades d'Identificació:</h4>
        <ul>
          <li>Nom i cognoms</li>
          <li>Adreça de correu electrònic</li>
          <li>Número de telèfon</li>
          <li>Càrrec laboral</li>
        </ul>

        <h4>b) Dades d'Autenticació:</h4>
        <ul>
          <li>Contrasenya (encriptada amb bcrypt)</li>
          <li>Tokens de sessió</li>
          <li>Registres d'autenticació de dos factors (2FA)</li>
        </ul>

        <h4>c) Dades d'Ús de la Plataforma:</h4>
        <ul>
          <li>Accions realitzades (alertes consultades, documents descarregats)</li>
          <li>Preferències de configuració</li>
          <li>Històric d'activitat</li>
        </ul>

        <h4>d) Dades Tècniques:</h4>
        <ul>
          <li>Adreça IP</li>
          <li>Informació del navegador i dispositiu</li>
          <li>Registres d'accés (logs)</li>
        </ul>

        <h4>e) Dades de Comunicació:</h4>
        <ul>
          <li>Missatges enviats via suport tècnic</li>
          <li>Preferències de notificació</li>
        </ul>

        <p className="bg-muted p-4 rounded-lg mt-4">
          <strong>Nota Important:</strong> PREMSA.IO NO processa dades especials (Art. 9 GDPR: origen ètnic, opinions polítiques, dades de salut, etc.) ni dades relatives a condemnes i infraccions penals (Art. 10 GDPR) en el curs normal dels Serveis.
        </p>

        <h3>4.2. Categories d'Interessats</h3>
        <p>Les categories d'interessats les dades dels quals es tracten són:</p>
        <ul>
          <li><strong>Usuaris de la plataforma:</strong> Empleats, contractistes o col·laboradors del Client autoritzats per accedir als Serveis.</li>
          <li><strong>Persones de contacte:</strong> Representants legals, responsables de facturació, personal de suport del Client.</li>
        </ul>
      </section>

      {/* 5. OBLIGACIONS DEL RESPONSABLE (CLIENT) */}
      <section id="obligacions-responsable">
        <h2>5. Obligacions del Responsable (Client)</h2>
        <p>El Client, com a Responsable del Tractament, té les següents obligacions:</p>

        <h3>5.1. Garantir Legitimació</h3>
        <p>El Client garanteix que té la base legal adequada per al tractament de les dades personals i per comunicar-les a PREMSA.IO per a les finalitats descrites en aquest Acord.</p>

        <h3>5.2. Informar als Interessats</h3>
        <p>El Client és responsable d'informar als interessats sobre el tractament de les seves dades personals, incloent:</p>
        <ul>
          <li>La identitat del Responsable (Client)</li>
          <li>La identitat de l'Encarregat (PREMSA.IO)</li>
          <li>Les finalitats del tractament</li>
          <li>Els drets dels interessats</li>
        </ul>

        <h3>5.3. Obtenir Consentiments</h3>
        <p>Si la base legal per al tractament és el consentiment (Art. 6.1.a GDPR), el Client serà responsable d'obtenir-lo de manera vàlida.</p>

        <h3>5.4. Proporcionar Instruccions Clares</h3>
        <p>El Client proporcionarà instruccions clares i documentades a PREMSA.IO sobre el tractament de les dades. Aquestes instruccions s'estableixen en aquest Acord i als Terms & Conditions.</p>

        <h3>5.5. Garantir Exactitud de les Dades</h3>
        <p>El Client és responsable de garantir que les dades personals proporcionades a PREMSA.IO són exactes, actualitzades i rellevants per a les finalitats del tractament.</p>

        <h3>5.6. Notificar Incidents</h3>
        <p>El Client notificarà a PREMSA.IO immediatament si detecta qualsevol ús indegut o accés no autoritzat a les dades personals.</p>
      </section>

      {/* 6. OBLIGACIONS DE L'ENCARREGAT (PREMSA.IO) */}
      <section id="obligacions-encarregat">
        <h2>6. Obligacions de l'Encarregat (PREMSA.IO)</h2>
        <p>PREMSA.IO, com a Encarregat del Tractament, assumeix les següents obligacions:</p>

        <h3>6.1. Tractar Dades Només segons Instruccions</h3>
        <p>PREMSA.IO tractarà les dades personals únicament segons les instruccions documentades del Client, llevat que estigui obligat per una norma legal (en aquest cas, informarà al Client abans del tractament, llevat que la llei ho prohibeixi).</p>
        <p>Les instruccions inicials s'estableixen en aquest Acord. Qualsevol instrucció addicional ha de ser documentada per escrit.</p>

        <h3>6.2. Confidencialitat</h3>
        <p>PREMSA.IO garanteix que tot el personal autoritzat per processar les dades personals:</p>
        <ul>
          <li>Ha assumit un compromís de confidencialitat</li>
          <li>Ha rebut formació adequada en protecció de dades</li>
          <li>Només accedeix a les dades estrictament necessàries per les seves funcions</li>
        </ul>

        <h3>6.3. Implementar Mesures de Seguretat</h3>
        <p>PREMSA.IO implementarà les mesures tècniques i organitzatives apropiades per garantir un nivell de seguretat adequat al risc (veure clàusula 7).</p>

        <h3>6.4. Respectar Condicions per Contractar Sub-encarregats</h3>
        <p>PREMSA.IO no contractarà sub-encarregats sense l'autorització prèvia del Client (veure clàusula 8).</p>

        <h3>6.5. Assistir al Client amb Drets dels Interessats</h3>
        <p>PREMSA.IO assistirà al Client, dins dels seus límits tècnics, per respondre a les sol·licituds d'exercici de drets dels interessats (accés, rectificació, supressió, etc.). Veure clàusula 9.</p>

        <h3>6.6. Assistir amb Obligacions del Responsable</h3>
        <p>PREMSA.IO assistirà al Client per complir amb les seves obligacions relatives a:</p>
        <ul>
          <li>Avaluació d'impacte sobre protecció de dades (si aplicable)</li>
          <li>Consulta prèvia a l'autoritat de control (si aplicable)</li>
          <li>Garantir la seguretat del tractament</li>
        </ul>

        <h3>6.7. Supressió o Devolució de Dades</h3>
        <p>A elecció del Client, PREMSA.IO suprimirà o retornarà totes les dades personals després de finalitzar la prestació dels serveis (veure clàusula 13).</p>

        <h3>6.8. Demostrar Compliment</h3>
        <p>PREMSA.IO posarà a disposició del Client tota la informació necessària per demostrar el compliment d'aquest Acord i permetrà auditories (veure clàusula 11).</p>
      </section>

      {/* 7. MESURES DE SEGURETAT */}
      <section id="mesures-seguretat">
        <h2>7. Mesures de Seguretat</h2>

        <h3>7.1. Principis de Seguretat</h3>
        <p>PREMSA.IO implementa mesures tècniques i organitzatives apropiades per garantir un nivell de seguretat adequat al risc, tenint en compte:</p>
        <ul>
          <li>L'estat de la tècnica</li>
          <li>Els costos d'aplicació</li>
          <li>La naturalesa, abast, context i finalitats del tractament</li>
          <li>Els riscos de probabilitat i gravetat variables per als drets i llibertats de les persones físiques</li>
        </ul>

        <h3>7.2. Mesures Tècniques Implementades</h3>

        <h4>a) Encriptació:</h4>
        <ul>
          <li><strong>At-rest</strong> (dades emmagatzemades): AES-256</li>
          <li><strong>In-transit</strong> (dades en trànsit): TLS 1.3</li>
          <li><strong>Contrasenyes:</strong> Hashing amb bcrypt (salt 12 rounds)</li>
        </ul>

        <h4>b) Controls d'Accés:</h4>
        <ul>
          <li>Autenticació de dos factors (2FA) obligatòria per tots els usuaris</li>
          <li>Gestió granular de permisos (Role-Based Access Control - RBAC)</li>
          <li>Principi de mínim privilegi (accés només a dades necessàries)</li>
          <li>Revisió trimestral de permisos d'accés</li>
        </ul>

        <h4>c) Protecció de Xarxa:</h4>
        <ul>
          <li>Firewalls configurats per permetre només trànsit autoritzat</li>
          <li>Sistema de Detecció d'Intrusions (IDS) 24/7</li>
          <li>Protecció DDoS via AWS Shield</li>
        </ul>

        <h4>d) Gestió de Vulnerabilitats:</h4>
        <ul>
          <li>Actualitzacions de seguretat aplicades dins de 48h (crítiques) o 7 dies (no crítiques)</li>
          <li>Escaneig automàtic de vulnerabilitats setmanal</li>
          <li>Pentesting extern anual per empresa certificada</li>
        </ul>

        <h4>e) Monitorització i Logs:</h4>
        <ul>
          <li>Registre d'auditoria (audit logs) de totes les accions sensibles</li>
          <li>Logs immutables (append-only) emmagatzemats separadament</li>
          <li>Alertes automàtiques per activitat sospitosa</li>
          <li>Retenció de logs: 12 mesos</li>
        </ul>

        <h4>f) Backups:</h4>
        <ul>
          <li>Backups automàtics diaris</li>
          <li>Retenció: 30 dies</li>
          <li>Encriptats amb AES-256</li>
          <li>Emmagatzemats en ubicació geogràfica separada (DR - Disaster Recovery)</li>
          <li>Testing de recuperació trimestral</li>
        </ul>

        <h3>7.3. Mesures Organitzatives Implementades</h3>

        <h4>a) Polítiques i Procediments:</h4>
        <ul>
          <li>Política de Seguretat de la Informació documentada</li>
          <li>Procediment de Resposta a Incidents de Seguretat</li>
          <li>Política d'Accés i Gestió de Contrasenyes</li>
          <li>Política de Clear Desk i Clear Screen</li>
        </ul>

        <h4>b) Formació del Personal:</h4>
        <ul>
          <li>Formació obligatòria en protecció de dades per tot el personal (anual)</li>
          <li>Formació específica en seguretat per personal tècnic (trimestral)</li>
          <li>Simulacres de phishing per conscienciar sobre ciberseguretat</li>
        </ul>

        <h4>c) Segregació de Responsabilitats:</h4>
        <ul>
          <li>Separació entre desenvolupament i producció</li>
          <li>Revisió per parells (peer review) per canvis crítics</li>
          <li>Control de canvis documentat</li>
        </ul>

        <h4>d) Gestió de Tercers:</h4>
        <ul>
          <li>Due diligence de seguretat abans de contractar sub-encarregats</li>
          <li>Data Processing Agreements amb tots els sub-encarregats</li>
          <li>Revisió anual de compliment de sub-encarregats</li>
        </ul>

        <h3>7.4. Certificacions i Auditories</h3>
        <p>PREMSA.IO està treballant en obtenir les següents certificacions:</p>
        <ul>
          <li><strong>ISO 27001</strong> (Information Security Management): En procés</li>
          <li><strong>SOC 2 Type II:</strong> Planificat per 2026</li>
        </ul>
        <p>Auditories de seguretat externes: Anualment per empresa certificada independent.</p>
      </section>

      {/* 8. SUB-ENCARREGATS DEL TRACTAMENT */}
      <section id="sub-encarregats">
        <h2>8. Sub-encarregats del Tractament</h2>

        <h3>8.1. Autorització General</h3>
        <p>El Client autoritza a PREMSA.IO a contractar sub-encarregats per realitzar activitats de tractament específiques, subjecte a les condicions d'aquesta clàusula.</p>

        <h3>8.2. Llista de Sub-encarregats Actuals</h3>
        <p>PREMSA.IO actualment utilitza els següents sub-encarregats:</p>

        <div className="overflow-x-auto my-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sub-encarregat</TableHead>
                <TableHead>Servei</TableHead>
                <TableHead>Ubicació</TableHead>
                <TableHead>Dades Processades</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Amazon Web Services (AWS)</TableCell>
                <TableCell>Hosting i infraestructura</TableCell>
                <TableCell>Frankfurt, Alemanya (UE)</TableCell>
                <TableCell>Totes les dades de la plataforma</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Stripe, Inc.</TableCell>
                <TableCell>Processament de pagaments</TableCell>
                <TableCell>San Francisco, USA (amb SCC)</TableCell>
                <TableCell>Dades de facturació, informació de pagament</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Resend / SendGrid</TableCell>
                <TableCell>Enviament d'emails transaccionals</TableCell>
                <TableCell>USA (amb SCC)</TableCell>
                <TableCell>Adreça email, nom, contingut emails</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">OpenAI / Anthropic</TableCell>
                <TableCell>Processament IA</TableCell>
                <TableCell>USA (amb SCC)</TableCell>
                <TableCell>Documents normatius públics (no dades personals clients)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Google Analytics</TableCell>
                <TableCell>Analítiques web</TableCell>
                <TableCell>USA (amb DPF)</TableCell>
                <TableCell>Dades d'ús anonimitzades</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <p><strong>Nota:</strong> Aquesta llista està actualitzada a data d'entrada en vigor d'aquest Acord. Pots consultar la llista actualitzada a: <a href="/legal/subprocessors">premsa.io/legal/subprocessors</a></p>

        <h3>8.3. Notificació de Nous Sub-encarregats</h3>
        <p>PREMSA.IO informarà al Client amb 30 dies d'antelació abans de contractar qualsevol nou sub-encarregat o canviar sub-encarregats existents.</p>
        <p>La notificació s'enviarà via email a l'adreça de contacte del Client.</p>

        <h3>8.4. Dret d'Oposició</h3>
        <p>El Client té dret a oposar-se a la contractació d'un nou sub-encarregat per motius raonables relacionats amb la protecció de dades.</p>
        <p>L'oposició ha de notificar-se per escrit dins dels 14 dies posteriors a la notificació de PREMSA.IO.</p>
        <p>Si el Client s'oposa:</p>
        <ul>
          <li>Les parts intentaran trobar una solució alternativa</li>
          <li>Si no és possible, el Client pot cancel·lar el servei sense penalització, amb efecte a la data prevista de contractació del nou sub-encarregat</li>
        </ul>

        <h3>8.5. Obligacions amb Sub-encarregats</h3>
        <p>PREMSA.IO garanteix que:</p>
        <ul>
          <li>Tots els sub-encarregats signaran un Data Processing Agreement (DPA) amb les mateixes obligacions que aquest Acord</li>
          <li>PREMSA.IO serà responsable davant del Client per qualsevol incompliment dels sub-encarregats</li>
          <li>Els sub-encarregats implementaran mesures de seguretat adequades</li>
        </ul>
      </section>

      {/* 9. DRETS DELS INTERESSATS */}
      <section id="drets-interessats">
        <h2>9. Drets dels Interessats</h2>

        <h3>9.1. Responsabilitat del Client</h3>
        <p>El Client, com a Responsable del Tractament, és qui ha de respondre a les sol·licituds d'exercici de drets dels interessats.</p>

        <h3>9.2. Assistència de PREMSA.IO</h3>
        <p>PREMSA.IO assistirà al Client, tenint en compte la naturalesa del tractament i la informació disponible, per respondre a les sol·licituds d'exercici dels següents drets:</p>

        <h4>a) Dret d'Accés (Art. 15 GDPR):</h4>
        <p>PREMSA.IO proporcionarà al Client les dades personals de l'interessat emmagatzemades a la plataforma en format estructurat (JSON, CSV).</p>
        <p><strong>Termini de resposta:</strong> Màxim 5 dies laborables des de la sol·licitud del Client.</p>

        <h4>b) Dret de Rectificació (Art. 16 GDPR):</h4>
        <p>PREMSA.IO corregirà les dades personals inexactes segons les instruccions del Client.</p>
        <p><strong>Termini de resposta:</strong> Immediat (si el Client ho fa des de la plataforma) o màxim 3 dies laborables.</p>

        <h4>c) Dret de Supressió / "Dret a l'Oblit" (Art. 17 GDPR):</h4>
        <p>PREMSA.IO suprimirà les dades personals segons les instruccions del Client, excepte si existeix obligació legal de conservar-les (ex: dades de facturació).</p>
        <p><strong>Termini de resposta:</strong> Màxim 7 dies laborables des de la sol·licitud.</p>

        <h4>d) Dret de Limitació del Tractament (Art. 18 GDPR):</h4>
        <p>PREMSA.IO suspendrà el tractament de dades segons les instruccions del Client (sense suprimir-les).</p>
        <p><strong>Implementació:</strong> Les dades es marcaran com "restringides" i no es processaran excepte per emmagatzematge.</p>

        <h4>e) Dret a la Portabilitat (Art. 20 GDPR):</h4>
        <p>PREMSA.IO proporcionarà les dades en format estructurat, d'ús comú i lectura mecànica (JSON, CSV, Excel).</p>
        <p><strong>Termini de resposta:</strong> Màxim 10 dies laborables.</p>

        <h4>f) Dret d'Oposició (Art. 21 GDPR):</h4>
        <p>El Client instruirà a PREMSA.IO sobre com gestionar l'oposició (suspensió o supressió del tractament).</p>

        <h3>9.3. Redirecció de Sol·licituds</h3>
        <p>Si PREMSA.IO rep directament una sol·licitud d'un interessat:</p>
        <ul>
          <li>Redirigirà l'interessat al Client (Responsable)</li>
          <li>Informarà al Client immediatament via email</li>
          <li>No respondrà directament sense autorització explícita del Client</li>
        </ul>

        <h3>9.4. Compensació per Assistència</h3>
        <p>L'assistència bàsica descrita en aquesta clàusula està inclosa en els Serveis.</p>
        <p>Si el Client requereix assistència extraordinària (ex: &gt;10 sol·licituds/mes, auditories externes extensives), PREMSA.IO pot cobrar una tarifa raonable segons els costos incorreguts.</p>
      </section>

      {/* 10. NOTIFICACIÓ DE VIOLACIONS DE SEGURETAT */}
      <section id="violacions">
        <h2>10. Notificació de Violacions de Seguretat</h2>

        <h3>10.1. Obligació de Notificar</h3>
        <p>En cas de Violació de Seguretat de dades personals, PREMSA.IO notificarà al Client sense demora indeguda i, en qualsevol cas, <strong>dins de les 24 hores</strong> des del moment en què tingui coneixement de la violació.</p>

        <h3>10.2. Contingut de la Notificació</h3>
        <p>La notificació inclourà, com a mínim:</p>
        <ul>
          <li>Descripció de la naturalesa de la violació (tipus de dades afectades, nombre aproximat d'interessats)</li>
          <li>Nom i dades de contacte del Delegat de Protecció de Dades (DPO) o altre punt de contacte</li>
          <li>Descripció de les possibles conseqüències de la violació</li>
          <li>Descripció de les mesures adoptades o proposades per abordar la violació i mitigar els seus possibles efectes adversos</li>
        </ul>

        <h3>10.3. Documentació</h3>
        <p>PREMSA.IO documentarà totes les violacions de seguretat, incloent:</p>
        <ul>
          <li>Els fets relacionats amb la violació</li>
          <li>Els efectes de la violació</li>
          <li>Les mesures correctores adoptades</li>
        </ul>
        <p>Aquesta documentació estarà disponible per al Client i per a l'autoritat de control si ho sol·licita.</p>

        <h3>10.4. Responsabilitat de Notificar a l'Autoritat i als Interessats</h3>
        <p>El Client, com a Responsable del Tractament, és qui ha de:</p>
        <ul>
          <li>Notificar la violació a l'autoritat de control competent (AEPD) dins de 72 hores, si escau (Art. 33 GDPR)</li>
          <li>Comunicar la violació als interessats afectats si hi ha un alt risc per als seus drets (Art. 34 GDPR)</li>
        </ul>
        <p>PREMSA.IO proporcionarà tota la informació necessària per permetre al Client complir amb aquestes obligacions.</p>
      </section>

      {/* 11. AUDITORIES I INSPECCIONS */}
      <section id="auditories">
        <h2>11. Auditories i Inspeccions</h2>

        <h3>11.1. Dret d'Auditoria del Client</h3>
        <p>El Client té dret a realitzar auditories i inspeccions per verificar el compliment d'aquest Acord per part de PREMSA.IO.</p>

        <h3>11.2. Procediment d'Auditoria</h3>

        <h4>a) Freqüència:</h4>
        <p>Màxim 1 auditoria per any (llevat que hi hagi motius raonables per a auditories addicionals, ex: violació de seguretat)</p>

        <h4>b) Preavís:</h4>
        <p>El Client notificarà a PREMSA.IO amb almenys 30 dies d'antelació</p>

        <h4>c) Abast:</h4>
        <ul>
          <li>L'auditoria es limitarà a aspectes relacionats amb la protecció de dades i la seguretat</li>
          <li>No inclourà informació confidencial de tercers o propietat intel·lectual de PREMSA.IO</li>
        </ul>

        <h4>d) Realització:</h4>
        <ul>
          <li>L'auditoria pot ser realitzada pel Client o per un auditor extern independent</li>
          <li>L'auditor ha de signar un acord de confidencialitat (NDA)</li>
          <li>L'auditoria es realitzarà durant hores laborables i amb mínima interrupció de les operacions</li>
        </ul>

        <h4>e) Costos:</h4>
        <ul>
          <li>Els costos de l'auditoria seran assumits pel Client</li>
          <li>PREMSA.IO pot cobrar una compensació raonable si l'auditoria requereix dedicació significativa de recursos (ex: &gt;16 hores de personal)</li>
        </ul>

        <h3>11.3. Informació de Compliment</h3>
        <p>PREMSA.IO proporcionarà anualment al Client:</p>
        <ul>
          <li>Certificats de compliment (quan estiguin disponibles: ISO 27001, SOC 2)</li>
          <li>Resum de resultats de pentesting (sense detalls tècnics sensibles)</li>
          <li>Confirmació de formació del personal en protecció de dades</li>
        </ul>

        <h3>11.4. Auditories per Autoritats de Control</h3>
        <p>Si l'autoritat de control competent (AEPD) requereix una auditoria, PREMSA.IO cooperarà plenament i proporcionarà tota la informació necessària, sempre que:</p>
        <ul>
          <li>La sol·licitud sigui legítima i estigui degudament fonamentada</li>
          <li>Es respectin les mesures de confidencialitat i seguretat adequades</li>
        </ul>
      </section>

      {/* 12. TRANSFERÈNCIES INTERNACIONALS */}
      <section id="transferencies">
        <h2>12. Transferències Internacionals</h2>

        <h3>12.1. Principi General</h3>
        <p>Les dades personals estan allotjades a la Unió Europea (AWS Frankfurt, Alemanya) i PREMSA.IO no transfereix dades fora de la UE/EEE excepte quan sigui necessari per utilitzar sub-encarregats aprovats.</p>

        <h3>12.2. Transferències a Tercers Països</h3>
        <p>Quan sigui necessari transferir dades a tercers països (fora UE/EEE), PREMSA.IO garanteix que existeixen les salvaguardes adequades segons els Arts. 44-49 GDPR:</p>

        <h4>a) Mecanismes Utilitzats:</h4>
        <ul>
          <li><strong>Standard Contractual Clauses (SCC):</strong> Clàusules contractuals tipus aprovades per la Comissió Europea</li>
          <li><strong>Data Privacy Framework (DPF):</strong> Per transferències a USA (si el receptor està certificat)</li>
          <li><strong>Decisions d'Adequació:</strong> Si la Comissió Europea ha declarat el país adequat</li>
        </ul>

        <h4>b) Sub-encarregats amb Transferències Internacionals:</h4>

        <div className="overflow-x-auto my-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sub-encarregat</TableHead>
                <TableHead>País</TableHead>
                <TableHead>Mecanisme</TableHead>
                <TableHead>Dades Transferides</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Stripe</TableCell>
                <TableCell>USA</TableCell>
                <TableCell>SCC + Certificat DPF</TableCell>
                <TableCell>Dades de facturació</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">SendGrid/Resend</TableCell>
                <TableCell>USA</TableCell>
                <TableCell>SCC</TableCell>
                <TableCell>Adreces email, contingut emails</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">OpenAI</TableCell>
                <TableCell>USA</TableCell>
                <TableCell>SCC</TableCell>
                <TableCell>Documents normatius públics (no PII clients)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Google Analytics</TableCell>
                <TableCell>USA</TableCell>
                <TableCell>DPF + SCC</TableCell>
                <TableCell>Dades d'ús anonimitzades</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <h3>12.3. Avaluació d'Impacte (Schrems II)</h3>
        <p>PREMSA.IO ha realitzat una avaluació d'impacte de les transferències internacionals segons la sentència Schrems II (C-311/18) i garanteix que:</p>
        <ul>
          <li>Els SCC estan suplementats amb mesures tècniques addicionals (encriptació, pseudonimització)</li>
          <li>No hi ha risc real d'accés per part d'autoritats dels tercers països que interfereixi amb els drets dels interessats</li>
        </ul>

        <h3>12.4. Notificació de Noves Transferències</h3>
        <p>Si PREMSA.IO planifica noves transferències internacionals, notificarà al Client amb 30 dies d'antelació, indicant:</p>
        <ul>
          <li>País destinatari</li>
          <li>Mecanisme de protecció utilitzat</li>
          <li>Avaluació del risc</li>
        </ul>
        <p>El Client pot oposar-se segons la clàusula 8.4.</p>
      </section>

      {/* 13. SUPRESSIÓ O DEVOLUCIÓ DE DADES */}
      <section id="supressio">
        <h2>13. Supressió o Devolució de Dades</h2>

        <h3>13.1. Finalització del Contracte</h3>
        <p>A la finalització del contracte entre el Client i PREMSA.IO (per qualsevol causa), el Client pot triar entre:</p>

        <h4>Opció A: Supressió de Dades</h4>
        <ul>
          <li>PREMSA.IO suprimirà de forma segura i irreversible totes les dades personals del Client</li>
          <li>Inclou dades en servidors de producció, backups i sistemes de sub-encarregats</li>
          <li>Certificat de supressió proporcionat al Client</li>
        </ul>

        <h4>Opció B: Devolució de Dades</h4>
        <ul>
          <li>PREMSA.IO retornarà totes les dades personals al Client en format estructurat (JSON, CSV, SQL dump)</li>
          <li>Després de la devolució, PREMSA.IO procedirà a la supressió</li>
          <li>Certificat de devolució i supressió proporcionat</li>
        </ul>

        <h3>13.2. Termini</h3>
        <ul>
          <li><strong>Devolució:</strong> Màxim 30 dies des de la sol·licitud del Client</li>
          <li><strong>Supressió:</strong> Màxim 90 dies des de la finalització del contracte</li>
        </ul>

        <h3>13.3. Excepcions (Obligació Legal)</h3>
        <p>PREMSA.IO pot conservar dades si hi ha obligació legal:</p>
        <ul>
          <li><strong>Dades de facturació:</strong> 10 anys (requisit fiscal espanyol)</li>
          <li><strong>Logs de seguretat:</strong> Segons requisits legals aplicables</li>
        </ul>
        <p>Aquestes dades es conservaran de forma segura i restringida, sense accés per a finalitats operatives.</p>

        <h3>13.4. Cost</h3>
        <p>La devolució i supressió de dades està inclosa en els Serveis. No hi ha cost addicional, llevat que el Client sol·liciti formats específics o procediments extraordinaris.</p>
      </section>

      {/* 14. RESPONSABILITAT I INDEMNITZACIÓ */}
      <section id="responsabilitat">
        <h2>14. Responsabilitat i Indemnització</h2>

        <h3>14.1. Responsabilitat de PREMSA.IO</h3>
        <p>PREMSA.IO serà responsable davant del Client pels danys causats per un tractament que incompleixi aquest Acord o el GDPR.</p>

        <h3>14.2. Responsabilitat davant d'Interessats</h3>
        <p>Segons l'Art. 82 GDPR:</p>
        <ul>
          <li>Si un interessat pateix danys per una violació del GDPR, pot reclamar indemnització al Responsable (Client) o a l'Encarregat (PREMSA.IO)</li>
          <li>Si PREMSA.IO ha estat condemnat a pagar una indemnització, pot reclamar al Client la part corresponent a la seva responsabilitat</li>
        </ul>

        <h3>14.3. Límit de Responsabilitat</h3>
        <p>La responsabilitat total agregada de PREMSA.IO sota aquest Acord estarà limitada segons s'estableix als Terms & Conditions (clàusula 10).</p>
        <p><strong>Excepcions:</strong> Aquest límit NO s'aplica a:</p>
        <ul>
          <li>Danys causats per negligència greu o dol</li>
          <li>Violacions intencionals del GDPR</li>
          <li>Responsabilitat que no pugui ser legalment limitada</li>
        </ul>

        <h3>14.4. Assegurança</h3>
        <p>PREMSA.IO manté una assegurança de responsabilitat civil professional amb cobertura adequada per riscos relacionats amb protecció de dades.</p>
      </section>

      {/* 15. DURADA I TERMINACIÓ */}
      <section id="durada">
        <h2>15. Durada i Terminació</h2>

        <h3>15.1. Durada</h3>
        <p>Aquest Acord entra en vigor en la data d'acceptació dels Terms & Conditions i romandrà vigent mentre duri la relació contractual.</p>

        <h3>15.2. Terminació</h3>
        <p>Aquest Acord es terminarà automàticament quan finalitzi el contracte de Serveis entre les parts.</p>

        <h3>15.3. Efectes de la Terminació</h3>
        <p>Després de la terminació:</p>
        <ul>
          <li>PREMSA.IO deixarà de processar dades personals (excepte per supressió/devolució)</li>
          <li>Es procedirà segons la clàusula 13 (Supressió o Devolució)</li>
          <li>Les obligacions de confidencialitat continuaran vigents</li>
          <li>El dret d'auditoria del Client es mantindrà durant 12 mesos per verificar la supressió</li>
        </ul>

        <h3>15.4. Supervivència</h3>
        <p>Les següents clàusules sobreviuran a la terminació d'aquest Acord:</p>
        <ul>
          <li>Clàusula 6.2 (Confidencialitat)</li>
          <li>Clàusula 11 (Auditories - durant 12 mesos)</li>
          <li>Clàusula 13 (Supressió o Devolució)</li>
          <li>Clàusula 14 (Responsabilitat)</li>
          <li>Clàusula 16 (Llei Aplicable)</li>
        </ul>
      </section>

      {/* 16. LLEI APLICABLE I JURISDICCIÓ */}
      <section id="llei">
        <h2>16. Llei Aplicable i Jurisdicció</h2>

        <h3>16.1. Llei Aplicable</h3>
        <p>Aquest Acord es regeix i interpreta d'acord amb les lleis d'Espanya i el GDPR.</p>

        <h3>16.2. Jurisdicció</h3>
        <p>Per a qualsevol disputa derivada d'aquest Acord, les parts se sotmeten a la jurisdicció exclusiva dels tribunals de Barcelona, Espanya.</p>

        <h3>16.3. Resolució de Disputes</h3>
        <p>Abans d'iniciar qualsevol acció legal, les parts intentaran resoldre la disputa de bona fe durant un període de 30 dies.</p>
      </section>

      {/* 17. DISPOSICIONS GENERALS */}
      <section className="mt-12 pt-8 border-t border-border">
        <h2>17. Disposicions Generals</h2>

        <h3>17.1. Acord Complet</h3>
        <p>Aquest DPA, juntament amb els Terms & Conditions i la Privacy Policy, constitueix l'acord complet entre les parts respecte al tractament de dades personals.</p>

        <h3>17.2. Modificacions</h3>
        <p>Qualsevol modificació d'aquest Acord ha de ser per escrit i acordada per ambdues parts, excepte:</p>
        <ul>
          <li>Actualitzacions de la llista de sub-encarregats (notificació 30 dies)</li>
          <li>Canvis per complir amb noves obligacions legals</li>
        </ul>

        <h3>17.3. Divisibilitat</h3>
        <p>Si qualsevol disposició d'aquest Acord és declarada invàlida, la resta continuarà en ple vigor.</p>

        <h3>17.4. Idioma</h3>
        <p>Aquest Acord s'ha redactat en català. En cas de traducció a altres idiomes, la versió en català prevaldrà en cas de discrepància.</p>

        <h3>17.5. Ordre de Prevalença</h3>
        <p>En cas de conflicte entre documents:</p>
        <ol>
          <li>GDPR i legislació aplicable</li>
          <li>Aquest Data Processing Agreement (DPA)</li>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
        </ol>
      </section>

      {/* ACCEPTACIÓ */}
      <section className="mt-12 pt-8 border-t border-border">
        <h2>Acceptació</h2>
        <p>El Client accepta aquest Data Processing Agreement al acceptar els Terms & Conditions de PREMSA.IO.</p>
        <p>Per qualsevol pregunta sobre aquest DPA, contactar:</p>
        <ul>
          <li><strong>Email:</strong> dpo@premsa.io</li>
          <li><strong>Delegat de Protecció de Dades (DPO):</strong> PREMSA.IO SL</li>
        </ul>

        <p className="mt-8 text-sm text-muted-foreground">
          <strong>Data d'entrada en vigor:</strong> 1 de Gener de 2025<br />
          <strong>Última actualització:</strong> 1 de Gener de 2025
        </p>
      </section>
    </LegalLayout>
  );
};

export default DpaPage;
