import LegalLayout from "@/components/layout/LegalLayout";

const tocItems = [
  { id: "introduccio", label: "Introducció" },
  { id: "responsable", label: "Responsable del Tractament" },
  { id: "tipus-dades", label: "Tipus de Dades que Recopilem" },
  { id: "base-legal", label: "Base Legal per al Tractament" },
  { id: "com-utilitzem", label: "Com Utilitzem les Dades" },
  { id: "comparticio", label: "Compartició de Dades amb Tercers" },
  { id: "transferencies", label: "Transferències Internacionals" },
  { id: "retencio", label: "Retenció de Dades" },
  { id: "seguretat", label: "Seguretat de les Dades" },
  { id: "drets-gdpr", label: "Els Teus Drets (GDPR)" },
  { id: "cookies", label: "Cookies i Tecnologies Similars" },
  { id: "menors", label: "Privacitat de Menors" },
  { id: "modificacions", label: "Modificacions a aquesta Política" },
  { id: "contacte", label: "Contacte i Exercici de Drets" },
];

const PrivacyPage = () => {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="1 de Gener de 2025"
      summary="🔒 Resum en llenguatge clar: Recopilem només les dades necessàries per operar el servei. Les teves dades estan encriptades, allotjades a la UE, i mai les venem a tercers. Tens dret complet d'accés, rectificació i eliminació."
      tocItems={tocItems}
    >
      {/* 1. INTRODUCCIÓ */}
      <section id="introduccio">
        <h2>1. Introducció</h2>
        <p>
          PREMSA.IO SL ("nosaltres", "ens", "PREMSA.IO") es compromet a protegir la privacitat i seguretat de les teves dades personals. Aquesta Privacy Policy explica com recopilem, utilitzem, compartim i protegim la informació personal quan utilitzes la nostra plataforma i serveis.
        </p>
        <p>Aquesta política s'aplica a:</p>
        <ul>
          <li>Visitants del nostre lloc web (premsa.io)</li>
          <li>Clients contractats</li>
          <li>Usuaris de la plataforma PREMSA.IO</li>
        </ul>
        <p>
          Complim amb el Reglament General de Protecció de Dades (GDPR - Reglament UE 2016/679) i la Llei Orgànica 3/2018 de Protecció de Dades Personals (LOPDGDD).
        </p>
      </section>

      {/* 2. RESPONSABLE DEL TRACTAMENT */}
      <section id="responsable">
        <h2>2. Responsable del Tractament</h2>
        <h3>Identitat del Responsable:</h3>
        <ul>
          <li><strong>Nom:</strong> PREMSA.IO SL</li>
          <li><strong>NIF:</strong> [Número d'identificació fiscal]</li>
          <li><strong>Adreça:</strong> [Adreça completa registrada], Barcelona, España</li>
          <li><strong>Email:</strong> privacy@premsa.io</li>
          <li><strong>Telèfon:</strong> +34 [Número]</li>
        </ul>
        <h3>Delegat de Protecció de Dades (DPO):</h3>
        <ul>
          <li><strong>Email:</strong> dpo@premsa.io</li>
          <li><strong>Adreça postal:</strong> [Mateixa que dalt]</li>
        </ul>
      </section>

      {/* 3. TIPUS DE DADES QUE RECOPILEM */}
      <section id="tipus-dades">
        <h2>3. Tipus de Dades que Recopilem</h2>
        
        <h3>3.1. Dades que Proporciones Directament</h3>
        <p>Quan et registres o utilitzes els nostres serveis, pots proporcionar:</p>
        
        <h4>a) Informació de Compte:</h4>
        <ul>
          <li>Nom complet</li>
          <li>Adreça de correu electrònic</li>
          <li>Número de telèfon</li>
          <li>Empresa / Organització</li>
          <li>Càrrec laboral</li>
          <li>Contrasenya (emmagatzemada encriptada amb bcrypt)</li>
        </ul>

        <h4>b) Informació de Facturació:</h4>
        <ul>
          <li>Nom de l'empresa</li>
          <li>Adreça fiscal</li>
          <li>NIF / CIF</li>
          <li>Informació de pagament (processada per Stripe - no emmagatzemem dades de targeta)</li>
        </ul>

        <h4>c) Informació de Comunicació:</h4>
        <ul>
          <li>Missatges que ens envies via email, chat o formularis de contacte</li>
          <li>Preferències de comunicació</li>
        </ul>

        <h3>3.2. Dades Recopilades Automàticament</h3>
        <p>Quan utilitzes la plataforma, recopilem automàticament:</p>

        <h4>a) Dades d'Ús:</h4>
        <ul>
          <li>Pàgines visitades i funcionalitats utilitzades</li>
          <li>Temps dedicat a cada secció</li>
          <li>Accions realitzades (alertes marcades, documents consultats, etc.)</li>
          <li>Històric d'activitat</li>
        </ul>

        <h4>b) Dades Tècniques:</h4>
        <ul>
          <li>Adreça IP</li>
          <li>Tipus i versió del navegador</li>
          <li>Sistema operatiu</li>
          <li>Resolució de pantalla</li>
          <li>Idioma del navegador</li>
          <li>Identificadors de dispositiu</li>
        </ul>

        <h4>c) Cookies:</h4>
        <p>Veure la nostra <a href="/legal/cookies">Cookie Policy</a> per detalls complets.</p>

        <h3>3.3. Dades de Tercers</h3>
        <p>Podem rebre dades sobre tu de:</p>
        <ul>
          <li>Proveïdors d'autenticació (si utilitzes SSO amb Google, Microsoft, etc.)</li>
          <li>Fonts públiques (per enriquir dades de l'empresa)</li>
        </ul>
      </section>

      {/* 4. BASE LEGAL PER AL TRACTAMENT */}
      <section id="base-legal">
        <h2>4. Base Legal per al Tractament</h2>
        <p>Tractem les teves dades personals basant-nos en les següents bases legals segons el GDPR:</p>

        <h3>4.1. Execució del Contracte (Art. 6.1.b GDPR)</h3>
        <p>Necessitem processar les teves dades per:</p>
        <ul>
          <li>Proporcionar-te accés a la plataforma</li>
          <li>Processar pagaments</li>
          <li>Proporcionar suport tècnic</li>
          <li>Complir amb les nostres obligacions contractuals</li>
        </ul>

        <h3>4.2. Interès Legítim (Art. 6.1.f GDPR)</h3>
        <p>Tenim un interès legítim per:</p>
        <ul>
          <li>Millorar i optimitzar els nostres serveis</li>
          <li>Prevenir frau i abús</li>
          <li>Analitzar l'ús de la plataforma</li>
          <li>Enviar comunicacions sobre actualitzacions del servei</li>
        </ul>

        <h3>4.3. Consentiment (Art. 6.1.a GDPR)</h3>
        <p>Demanarem el teu consentiment explícit per:</p>
        <ul>
          <li>Enviar newsletters i comunicacions de màrqueting</li>
          <li>Utilitzar cookies no essencials (analítiques, màrqueting)</li>
          <li>Compartir dades amb tercers per a fins específics</li>
        </ul>
        <p>Pots retirar el consentiment en qualsevol moment sense afectar la legalitat del tractament previ.</p>

        <h3>4.4. Obligació Legal (Art. 6.1.c GDPR)</h3>
        <p>Hem de processar certes dades per complir amb obligacions legals:</p>
        <ul>
          <li>Retenir dades de facturació per requisits fiscals</li>
          <li>Respondre a requeriments judicials o d'autoritats competents</li>
        </ul>
      </section>

      {/* 5. COM UTILITZEM LES DADES */}
      <section id="com-utilitzem">
        <h2>5. Com Utilitzem les Dades</h2>
        <p>Utilitzem les teves dades personals per als següents propòsits:</p>

        <h3>5.1. Proporcionar i Mantenir els Serveis</h3>
        <ul>
          <li>Crear i gestionar el teu compte</li>
          <li>Processar les teves transaccions</li>
          <li>Proporcionar funcionalitats de la plataforma</li>
          <li>Enviar notificacions del servei (alertes, informes, etc.)</li>
        </ul>

        <h3>5.2. Comunicar-nos amb Tu</h3>
        <ul>
          <li>Respondre a les teves consultes</li>
          <li>Enviar actualitzacions importants sobre el servei</li>
          <li>Proporcionar suport tècnic</li>
          <li>Enviar informació sobre nous productes o funcionalitats (només amb consentiment)</li>
        </ul>

        <h3>5.3. Millorar els Serveis</h3>
        <ul>
          <li>Analitzar com utilitzes la plataforma</li>
          <li>Identificar tendències i patrons d'ús</li>
          <li>Desenvolupar noves funcionalitats</li>
          <li>Optimitzar el rendiment</li>
        </ul>

        <h3>5.4. Seguretat i Prevenció de Frau</h3>
        <ul>
          <li>Detectar i prevenir activitat fraudulenta</li>
          <li>Protegir contra abusos i ús no autoritzat</li>
          <li>Complir amb obligacions legals</li>
        </ul>

        <h3>5.5. Màrqueting (només amb consentiment)</h3>
        <ul>
          <li>Enviar newsletters</li>
          <li>Informar sobre nous serveis o productes</li>
          <li>Enviar invitacions a esdeveniments</li>
        </ul>
        <p>Pots donar-te de baixa de les comunicacions de màrqueting en qualsevol moment clicant "unsubscribe" als emails.</p>
      </section>

      {/* 6. COMPARTICIÓ DE DADES AMB TERCERS */}
      <section id="comparticio">
        <h2>6. Compartició de Dades amb Tercers</h2>

        <h3>6.1. Mai Venem les Teves Dades</h3>
        <p><strong>PREMSA.IO mai ven, lloga o comercialitza les teves dades personals a tercers.</strong></p>

        <h3>6.2. Proveïdors de Serveis (Encarregats del Tractament)</h3>
        <p>Compartim dades amb tercers que ens ajuden a proporcionar els serveis:</p>

        <h4>a) Infraestructura i Hosting:</h4>
        <ul>
          <li><strong>Amazon Web Services (AWS):</strong> Hosting de la plataforma (Frankfurt, Alemanya - UE)</li>
          <li>Dades compartides: Totes les dades necessàries per operar el servei</li>
          <li>Protecció: Acord de DPA conforme al GDPR</li>
        </ul>

        <h4>b) Processament de Pagaments:</h4>
        <ul>
          <li><strong>Stripe:</strong> Processament de pagaments amb targeta</li>
          <li>Dades compartides: Informació de facturació (no emmagatzemem dades de targeta)</li>
          <li>Protecció: Stripe és conforme PCI-DSS i GDPR</li>
        </ul>

        <h4>c) Email i Comunicacions:</h4>
        <ul>
          <li><strong>Resend / SendGrid:</strong> Enviament d'emails transaccionals</li>
          <li>Dades compartides: Adreça email, nom, contingut dels emails</li>
          <li>Protecció: DPA conforme GDPR</li>
        </ul>

        <h4>d) Analítiques:</h4>
        <ul>
          <li><strong>Google Analytics 4:</strong> Anàlisi d'ús del web (opcional, amb consentiment)</li>
          <li><strong>Hotjar:</strong> Heatmaps i recordings (opcional, amb consentiment)</li>
          <li>Dades compartides: Dades d'ús anonimitzades</li>
          <li>Protecció: IP anonimitzada, DPA conforme GDPR</li>
        </ul>

        <h4>e) Support i CRM:</h4>
        <ul>
          <li><strong>Intercom / Crisp:</strong> Chat de suport en viu</li>
          <li>Dades compartides: Nom, email, missatges</li>
          <li>Protecció: DPA conforme GDPR</li>
        </ul>

        <h3>6.3. Requeriments Legals</h3>
        <p>Podem divulgar les teves dades si estem obligats per llei:</p>
        <ul>
          <li>Complir amb un procés legal (citació, ordre judicial)</li>
          <li>Respondre a sol·licituds d'autoritats governamentals</li>
          <li>Protegir els drets, propietat o seguretat de PREMSA.IO, clients o el públic</li>
        </ul>

        <h3>6.4. Transaccions Corporatives</h3>
        <p>En cas de fusió, adquisició o venda d'actius, les dades personals poden ser transferides. T'avisarem abans que les teves dades siguin transferides i quedin subjectes a una política de privacitat diferent.</p>
      </section>

      {/* 7. TRANSFERÈNCIES INTERNACIONALS */}
      <section id="transferencies">
        <h2>7. Transferències Internacionals</h2>

        <h3>7.1. Principi General</h3>
        <p>Les teves dades estan allotjades a la Unió Europea (AWS Frankfurt, Alemanya) i no surten de la UE excepte quan sigui necessari utilitzar proveïdors tercers.</p>

        <h3>7.2. Transferències fora de la UE</h3>
        <p>Alguns dels nostres proveïdors de serveis poden estar fora de la UE:</p>

        <h4>Exemple: OpenAI (IA Processing)</h4>
        <ul>
          <li><strong>Ubicació:</strong> Estats Units</li>
          <li><strong>Mecanisme de protecció:</strong> Standard Contractual Clauses (SCC) aprovades per la Comissió Europea</li>
          <li><strong>Dades transferides:</strong> Només documents normatius públics (no dades personals de clients)</li>
        </ul>

        <h4>Google Analytics (si aplica):</h4>
        <ul>
          <li><strong>Ubicació:</strong> Estats Units</li>
          <li><strong>Mecanisme:</strong> SCC + Data Privacy Framework</li>
          <li><strong>Dades:</strong> Anonimitzades (IP truncada)</li>
        </ul>

        <p>Sempre que es transfereixen dades fora de la UE, garantim que existeixen salvaguardes adequades conforme als articles 44-49 del GDPR.</p>
      </section>

      {/* 8. RETENCIÓ DE DADES */}
      <section id="retencio">
        <h2>8. Retenció de Dades</h2>

        <h3>8.1. Principi General</h3>
        <p>Només conservem les teves dades personals durant el temps necessari per complir amb els propòsits per als quals van ser recopilades.</p>

        <h3>8.2. Períodes de Retenció Específics</h3>

        <h4>a) Dades de Compte Actiu:</h4>
        <ul>
          <li><strong>Durada:</strong> Mentre el contracte estigui actiu</li>
          <li><strong>Eliminació:</strong> 90 dies després de la cancel·lació del servei</li>
        </ul>

        <h4>b) Dades de Facturació:</h4>
        <ul>
          <li><strong>Durada:</strong> 10 anys (obligació legal fiscal a Espanya)</li>
          <li><strong>Base legal:</strong> Art. 30 del Código de Comercio</li>
        </ul>

        <h4>c) Dades de Comunicació (emails, chat):</h4>
        <ul>
          <li><strong>Durada:</strong> 3 anys des de l'última interacció</li>
          <li><strong>Motiu:</strong> Proves contractuals, suport tècnic</li>
        </ul>

        <h4>d) Logs d'Activitat i Seguretat:</h4>
        <ul>
          <li><strong>Durada:</strong> 12 mesos</li>
          <li><strong>Motiu:</strong> Seguretat, prevenció de frau</li>
        </ul>

        <h4>e) Dades de Màrqueting (si has donat consentiment):</h4>
        <ul>
          <li><strong>Durada:</strong> Fins que retires el consentiment o 3 anys d'inactivitat</li>
        </ul>

        <h3>8.3. Eliminació Segura</h3>
        <p>Quan les dades ja no són necessàries:</p>
        <ul>
          <li>S'eliminen de forma segura i irreversible</li>
          <li>Els backups es purgen segons el calendari establert</li>
          <li>Reps confirmació de l'eliminació si ho sol·licites</li>
        </ul>
      </section>

      {/* 9. SEGURETAT DE LES DADES */}
      <section id="seguretat">
        <h2>9. Seguretat de les Dades</h2>

        <h3>9.1. Mesures Tècniques</h3>
        <p>Implementem mesures de seguretat avançades:</p>

        <h4>a) Encriptació:</h4>
        <ul>
          <li><strong>At-rest:</strong> AES-256 per dades emmagatzemades</li>
          <li><strong>In-transit:</strong> TLS 1.3 per totes les comunicacions</li>
        </ul>

        <h4>b) Controls d'Accés:</h4>
        <ul>
          <li>Autenticació de dos factors (2FA) obligatòria per usuaris</li>
          <li>Gestió granular de permisos (RBAC)</li>
          <li>Principi de mínim privilegi</li>
        </ul>

        <h4>c) Monitorització:</h4>
        <ul>
          <li>Detecció d'intrusions 24/7</li>
          <li>Audit logs immutables de totes les accions sensibles</li>
          <li>Alertes automàtiques per activitat sospitosa</li>
        </ul>

        <h4>d) Backups:</h4>
        <ul>
          <li>Backups automàtics diaris</li>
          <li>Retenció de 30 dies</li>
          <li>Backups encriptats i emmagatzemats en ubicació separada</li>
        </ul>

        <h3>9.2. Mesures Organitzatives</h3>

        <h4>a) Personal:</h4>
        <ul>
          <li>Formació obligatòria en protecció de dades per tot el personal</li>
          <li>Acords de confidencialitat</li>
          <li>Accés limitat només a qui ho necessita</li>
        </ul>

        <h4>b) Auditories:</h4>
        <ul>
          <li>Pentesting anual per tercers certificats</li>
          <li>Revisió trimestral de polítiques de seguretat</li>
          <li>Certificació ISO 27001 (en procés)</li>
        </ul>

        <h3>9.3. Notificació de Violacions de Seguretat</h3>
        <p>En cas de violació de seguretat:</p>
        <ul>
          <li>Notificarem l'Agència Espanyola de Protecció de Dades (AEPD) dins de 72 hores</li>
          <li>T'informarem directament si hi ha un risc alt per als teus drets</li>
          <li>Documentarem la violació i les mesures correctores</li>
        </ul>
      </section>

      {/* 10. ELS TEUS DRETS (GDPR) */}
      <section id="drets-gdpr">
        <h2>10. Els Teus Drets (GDPR)</h2>
        <p>Sota el GDPR, tens els següents drets:</p>

        <h3>10.1. Dret d'Accés (Art. 15 GDPR)</h3>
        <p>Tens dret a obtenir:</p>
        <ul>
          <li>Confirmació de si tractem les teves dades</li>
          <li>Còpia de les teves dades personals</li>
          <li>Informació sobre el tractament</li>
        </ul>
        <p><strong>Com exercir-lo:</strong> Email a dpo@premsa.io amb l'assumpte "Sol·licitud d'Accés"</p>
        <p><strong>Termini de resposta:</strong> Màxim 30 dies</p>

        <h3>10.2. Dret de Rectificació (Art. 16 GDPR)</h3>
        <p>Pots sol·licitar la correcció de dades inexactes o incomplertes.</p>
        <p><strong>Com exercir-lo:</strong></p>
        <ul>
          <li>Directament des de la plataforma (Configuració &gt; Perfil)</li>
          <li>O via email a dpo@premsa.io</li>
        </ul>
        <p><strong>Termini:</strong> Immediat (autocorrecció) o 30 dies (via email)</p>

        <h3>10.3. Dret de Supressió / "Dret a l'Oblit" (Art. 17 GDPR)</h3>
        <p>Pots sol·licitar l'eliminació de les teves dades quan:</p>
        <ul>
          <li>Ja no són necessàries per als fins originals</li>
          <li>Retires el consentiment (si és la base legal)</li>
          <li>T'oposés al tractament i no hi ha motius legítims prevalents</li>
          <li>Les dades s'hagin tractat il·lícitament</li>
        </ul>
        <p><strong>Excepció:</strong> No podem eliminar dades si hi ha obligació legal de conservar-les (ex: factures)</p>
        <p><strong>Com exercir-lo:</strong> Email a dpo@premsa.io amb l'assumpte "Sol·licitud de Supressió"</p>
        <p><strong>Termini:</strong> Màxim 30 dies</p>

        <h3>10.4. Dret de Limitació del Tractament (Art. 18 GDPR)</h3>
        <p>Pots sol·licitar que suspenguem temporalment el tractament de les teves dades si:</p>
        <ul>
          <li>Contestes l'exactitud de les dades</li>
          <li>El tractament és il·lícit però no vols que s'eliminin</li>
          <li>Necessites les dades per reclamacions legals</li>
        </ul>
        <p><strong>Com exercir-lo:</strong> Email a dpo@premsa.io</p>

        <h3>10.5. Dret a la Portabilitat (Art. 20 GDPR)</h3>
        <p>Tens dret a rebre les teves dades en un format estructurat, d'ús comú i lectura mecànica (JSON, CSV).</p>
        <p><strong>Aplica a:</strong> Dades proporcionades per tu i processades amb consentiment o per execució del contracte.</p>
        <p><strong>Com exercir-lo:</strong> Email a dpo@premsa.io o directament des de la plataforma (Configuració &gt; Exportar Dades)</p>
        <p><strong>Termini:</strong> Màxim 30 dies</p>

        <h3>10.6. Dret d'Oposició (Art. 21 GDPR)</h3>
        <p>Pots oposar-te al tractament de les teves dades quan:</p>
        <ul>
          <li>Es basa en interès legítim (excepte que tinguem motius imperiosos)</li>
          <li>És per fins de màrqueting directe (oposició absoluta)</li>
        </ul>
        <p><strong>Com exercir-lo:</strong></p>
        <ul>
          <li><strong>Màrqueting:</strong> Click "unsubscribe" als emails</li>
          <li><strong>Altres:</strong> Email a dpo@premsa.io</li>
        </ul>

        <h3>10.7. Dret a No Ser Objecte de Decisions Automatitzades (Art. 22 GDPR)</h3>
        <p>Tens dret a no ser objecte de decisions basades únicament en tractament automatitzat (incloent perfilat) que produeixin efectes jurídics o et afectin significativament.</p>
        <p><strong>Aplicació a PREMSA.IO:</strong> No utilitzem decisions automatitzades que produeixin efectes jurídics sobre tu. Les anàlisis d'IA són eines d'assistència, sempre subjectes a revisió humana.</p>

        <h3>10.8. Dret a Presentar una Reclamació</h3>
        <p>Si creus que hem infringit la legislació de protecció de dades, pots presentar una reclamació davant:</p>
        <p><strong>Agència Espanyola de Protecció de Dades (AEPD)</strong></p>
        <ul>
          <li><strong>Web:</strong> www.aepd.es</li>
          <li><strong>Telèfon:</strong> 901 100 099 / 912 663 517</li>
          <li><strong>Adreça:</strong> C/ Jorge Juan, 6, 28001 Madrid</li>
        </ul>
      </section>

      {/* 11. COOKIES I TECNOLOGIES SIMILARS */}
      <section id="cookies">
        <h2>11. Cookies i Tecnologies Similars</h2>
        <p>Per informació detallada sobre l'ús de cookies, consulta la nostra <a href="/legal/cookies">Cookie Policy</a>.</p>
        <p><strong>Resum:</strong></p>
        <ul>
          <li><strong>Cookies Essencials:</strong> Necessàries per al funcionament (no requereixen consentiment)</li>
          <li><strong>Cookies Analítiques:</strong> Google Analytics (requereix consentiment)</li>
          <li><strong>Cookies de Màrqueting:</strong> Tracking publicitari (requereix consentiment)</li>
        </ul>
        <p>Pots gestionar les teves preferències de cookies a qualsevol moment des de la plataforma.</p>
      </section>

      {/* 12. PRIVACITAT DE MENORS */}
      <section id="menors">
        <h2>12. Privacitat de Menors</h2>
        <p>PREMSA.IO és un servei B2B no destinat a menors de 18 anys.</p>
        <p>No recopilem conscientment dades personals de menors. Si ens assabentem que hem recopilat dades d'un menor sense consentiment parental adequat, eliminarem aquesta informació immediatament.</p>
        <p>Si creus que tenim dades d'un menor, contacta'ns a privacy@premsa.io.</p>
      </section>

      {/* 13. MODIFICACIONS A AQUESTA POLÍTICA */}
      <section id="modificacions">
        <h2>13. Modificacions a aquesta Política</h2>

        <h3>13.1. Dret a Modificar</h3>
        <p>Podem actualitzar aquesta Privacy Policy per reflectir canvis en les nostres pràctiques o per motius legals.</p>

        <h3>13.2. Notificació de Canvis Materials</h3>
        <p>Si fem canvis materials que afectin els teus drets:</p>
        <ul>
          <li>T'enviarem un email amb 30 dies d'antelació</li>
          <li>Publicarem un avís destacat a la plataforma</li>
          <li>Actualitzarem la data "Última actualització" al principi d'aquesta política</li>
        </ul>

        <h3>13.3. Acceptació</h3>
        <p>L'ús continuat dels serveis després de l'entrada en vigor dels canvis constitueix l'acceptació de la política modificada.</p>
        <p>Pots revisar aquesta política en qualsevol moment a premsa.io/legal/privacy.</p>
      </section>

      {/* 14. CONTACTE I EXERCICI DE DRETS */}
      <section id="contacte">
        <h2>14. Contacte i Exercici de Drets</h2>
        <p>Per exercir qualsevol dels teus drets o si tens preguntes sobre aquesta Privacy Policy:</p>
        <ul>
          <li><strong>Email Principal:</strong> privacy@premsa.io</li>
          <li><strong>Delegat de Protecció de Dades (DPO):</strong> dpo@premsa.io</li>
          <li><strong>Adreça Postal:</strong> PREMSA.IO SL, [Adreça], Barcelona, España</li>
          <li><strong>Telèfon:</strong> +34 [Número]</li>
        </ul>
        <p><strong>Temps de resposta:</strong> Màxim 30 dies des de la recepció de la sol·licitud.</p>
        <p>Per exercir els teus drets, proporciona:</p>
        <ul>
          <li>Nom complet i adreça de correu electrònic associada al compte</li>
          <li>Descripció clara del dret que vols exercir</li>
          <li>Còpia del DNI o document identificatiu (per verificar identitat)</li>
        </ul>
        <p className="mt-8 text-sm text-muted-foreground">
          <strong>Data d'entrada en vigor:</strong> 1 de Gener de 2025<br />
          <strong>Última actualització:</strong> 1 de Gener de 2025
        </p>
      </section>
    </LegalLayout>
  );
};

export default PrivacyPage;
