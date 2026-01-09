import LegalLayout from "@/components/layout/LegalLayout";

const tocItems = [
  { id: "introduccio", label: "1. Introducció" },
  { id: "definicions", label: "2. Definicions" },
  { id: "serveis", label: "3. Serveis Oferts" },
  { id: "acceptacio", label: "4. Acceptació dels Termes" },
  { id: "registre", label: "5. Registre i Compte" },
  { id: "preu", label: "6. Preu i Pagament" },
  { id: "cancelacio", label: "7. Cancel·lació i Reemborsament" },
  { id: "propietat", label: "8. Propietat Intel·lectual" },
  { id: "us-acceptable", label: "9. Ús Acceptable" },
  { id: "limitacio", label: "10. Limitació de Responsabilitat" },
  { id: "garanties", label: "11. Garanties" },
  { id: "proteccio-dades", label: "12. Protecció de Dades" },
  { id: "modificacions", label: "13. Modificacions dels Termes" },
  { id: "llei", label: "14. Llei Aplicable" },
  { id: "disposicions", label: "15. Disposicions Generals" },
  { id: "contacte", label: "16. Contacte" },
];

const TermsPage = () => {
  return (
    <LegalLayout
      title="Terms & Conditions"
      lastUpdated="1 de Gener de 2025"
      summary="📝 Resum en llenguatge clar: Aquests són els termes que regulen l'ús de PREMSA.IO. El més important: pagues mensualment, pots cancel·lar amb 30 dies (pla Flexible) o tenir exit clause al mes 3 (pla Compromís), i les teves dades són teves."
      tocItems={tocItems}
    >
      {/* 1. INTRODUCCIÓ */}
      <section id="introduccio">
        <h2 className="font-heading font-bold text-2xl md:text-[28px] text-foreground mt-0 mb-6">
          1. Introducció
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Benvinguts a PREMSA.IO ("nosaltres", "ens", "PREMSA.IO"). Aquests Termes i Condicions 
          ("Termes") regulen l'accés i ús de la plataforma PREMSA.IO, els nostres serveis, i 
          qualsevol contingut, funcionalitat i serveis associats (col·lectivament, els "Serveis").
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          En accedir o utilitzar els nostres Serveis, accepteu estar vinculat per aquests Termes. 
          Si no accepteu aquests Termes, no podeu accedir ni utilitzar els Serveis.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          <strong>Data d'entrada en vigor:</strong> 1 de Gener de 2025.
        </p>
      </section>

      {/* 2. DEFINICIONS */}
      <section id="definicions" className="mt-12">
        <h2 className="font-heading font-bold text-2xl md:text-[28px] text-foreground mb-6">
          2. Definicions
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Per als propòsits d'aquests Termes:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
          <li><strong>"Client"</strong> significa qualsevol entitat legal o persona física que contracta els Serveis de PREMSA.IO.</li>
          <li><strong>"Usuari"</strong> significa qualsevol persona física autoritzada pel Client per accedir i utilitzar els Serveis.</li>
          <li><strong>"Contingut del Client"</strong> significa totes les dades, informació, configuracions i altres materials que el Client introdueix, carrega o transmet als Serveis.</li>
          <li><strong>"Documentació"</strong> significa la documentació tècnica, guies d'usuari i materials d'ajuda proporcionats per PREMSA.IO.</li>
          <li><strong>"Plataforma"</strong> significa el programari, aplicacions web, APIs, i infraestructura tècnica que constitueixen PREMSA.IO.</li>
        </ul>
      </section>

      {/* 3. SERVEIS OFERTS */}
      <section id="serveis" className="mt-12">
        <h2 className="font-heading font-bold text-2xl md:text-[28px] text-foreground mb-6">
          3. Serveis Oferts
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          PREMSA.IO ofereix una plataforma d'intel·ligència regulatòria que proporciona:
        </p>
        
        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          a) Monitoring de Fonts Normatives:
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Boletín Oficial del Estado (BOE)</li>
          <li>Diaris oficials de les 17 Comunitats Autònomes</li>
          <li>Directives i Regulacions de la Unió Europea (opcionals)</li>
        </ul>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          b) Anàlisi Intel·ligent:
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Processament automàtic de documents normatius mitjançant Intel·ligència Artificial</li>
          <li>Identificació de canvis rellevants per al Client</li>
          <li>Contextualització amb normativa existent (Legal Bedrock™)</li>
        </ul>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          c) Alertes Personalitzades:
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Notificacions en temps real (&lt;24h des de publicació oficial)</li>
          <li>Classificació per severitat i àrea de compliance</li>
          <li>Recomanacions d'acció</li>
        </ul>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          d) Reports i Informes:
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Informes setmanals executius</li>
          <li>Anàlisi d'impacte per normativa</li>
          <li>Tracking històric</li>
        </ul>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          e) Integracions:
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>API REST per integració amb sistemes del Client</li>
          <li>Webhooks per notificacions en temps real</li>
          <li>Exportació de dades (JSON, CSV, PDF)</li>
        </ul>

        <p className="text-muted-foreground leading-relaxed">
          PREMSA.IO es reserva el dret de modificar, suspendre o descontinuar qualsevol aspecte 
          dels Serveis en qualsevol moment, amb preavís de 30 dies al Client si la modificació 
          afecta materialment la funcionalitat.
        </p>
      </section>

      {/* 4. ACCEPTACIÓ DELS TERMES */}
      <section id="acceptacio" className="mt-12">
        <h2 className="font-heading font-bold text-2xl md:text-[28px] text-foreground mb-6">
          4. Acceptació dels Termes
        </h2>
        
        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          4.1. Capacitat Legal
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          En acceptar aquests Termes, el Client declara i garanteix que:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Té capacitat legal per celebrar contractes vinculants</li>
          <li>Si actua en representació d'una entitat legal, té l'autoritat necessària per vincular aquesta entitat</li>
          <li>No està subjecte a sancions ni restriccions legals que impedeixin l'ús dels Serveis</li>
        </ul>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          4.2. Modificacions
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          PREMSA.IO pot modificar aquests Termes en qualsevol moment. Les modificacions entraran 
          en vigor immediatament després de la seva publicació a la Plataforma. L'ús continuat 
          dels Serveis després de la publicació de les modificacions constitueix l'acceptació 
          d'aquests Termes modificats.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          El Client serà notificat de qualsevol modificació material amb almenys 30 dies d'antelació via email.
        </p>
      </section>

      {/* 5. REGISTRE I COMPTE D'USUARI */}
      <section id="registre" className="mt-12">
        <h2 className="font-heading font-bold text-2xl md:text-[28px] text-foreground mb-6">
          5. Registre i Compte d'Usuari
        </h2>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          5.1. Procés de Registre
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Per accedir als Serveis, el Client ha de:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Completar el procés de registre proporcionant informació precisa i completa</li>
          <li>Acceptar aquests Termes i la Privacy Policy</li>
          <li>Completar el procés de verificació (si aplicable)</li>
        </ul>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          5.2. Informació del Compte
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          El Client és responsable de:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Mantenir la confidencialitat de les credencials d'accés</li>
          <li>Totes les activitats que es produeixin sota el seu compte</li>
          <li>Notificar immediatament a PREMSA.IO de qualsevol ús no autoritzat</li>
        </ul>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          5.3. Gestió d'Usuaris
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          El Client pot afegir, eliminar i gestionar usuaris dins del seu compte. Cada usuari ha de:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Tenir una adreça de correu electrònic única</li>
          <li>Acceptar aquests Termes</li>
          <li>Complir amb les polítiques d'ús acceptable</li>
        </ul>
      </section>

      {/* 6. PREU I PAGAMENT */}
      <section id="preu" className="mt-12">
        <h2 className="font-heading font-bold text-2xl md:text-[28px] text-foreground mb-6">
          6. Preu i Pagament
        </h2>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          6.1. Plans Disponibles
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          PREMSA.IO ofereix els següents plans:
        </p>
        
        <div className="bg-muted rounded-lg p-4 mb-4">
          <p className="font-semibold text-foreground">a) Pla Flexible:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground mt-2">
            <li>Preu: €6.500 per mes</li>
            <li>Facturació: Mensual</li>
            <li>Compromís: Cap (cancel·lació amb 30 dies de preavís)</li>
          </ul>
        </div>

        <div className="bg-muted rounded-lg p-4 mb-4">
          <p className="font-semibold text-foreground">b) Pla Compromís:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground mt-2">
            <li>Preu: €5.500 per mes (€66.000 per any)</li>
            <li>Facturació: Mensual</li>
            <li>Compromís: 12 mesos amb exit clause al mes 3</li>
            <li>Beneficis addicionals: Dedicated Account Manager, Priority Support</li>
          </ul>
        </div>

        <div className="bg-muted rounded-lg p-4 mb-4">
          <p className="font-semibold text-foreground">c) Pilot Program (disponibilitat limitada):</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground mt-2">
            <li>Preu: €2.750 per mes</li>
            <li>Durada: 6 mesos</li>
            <li>Exit clause: Mes 3</li>
            <li>Conversió automàtica a pla estàndar després de 6 mesos</li>
          </ul>
        </div>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          6.2. Facturació
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Totes les factures s'emetran el primer dia de cada mes</li>
          <li>El pagament és degut dins dels 15 dies posteriors a la data de la factura</li>
          <li>Mètodes de pagament acceptats: Transferència bancària, Targeta de crèdit (via Stripe)</li>
        </ul>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          6.3. Impostos
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Els preus indicats no inclouen l'IVA ni altres impostos aplicables. El Client és 
          responsable de tots els impostos, aranzels o càrregues governamentals relacionades 
          amb l'ús dels Serveis.
        </p>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          6.4. Pagaments Endarrerits
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Si un pagament no es rep dins del termini establert:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Primer recordatori: 5 dies després del venciment</li>
          <li>Segon recordatori: 10 dies després del venciment</li>
          <li>Suspensió del servei: 15 dies després del venciment</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mb-4">
          PREMSA.IO es reserva el dret de cobrar interessos de demora al tipus legal vigent més 2 punts percentuals.
        </p>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          6.5. Increments de Preu
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          PREMSA.IO pot incrementar els preus amb un preavís de 60 dies. El Client té dret a 
          cancel·lar abans de l'entrada en vigor de l'increment sense penalització.
        </p>
      </section>

      {/* 7. CANCEL·LACIÓ I REEMBORSAMENT */}
      <section id="cancelacio" className="mt-12">
        <h2 className="font-heading font-bold text-2xl md:text-[28px] text-foreground mb-6">
          7. Cancel·lació i Reemborsament
        </h2>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          7.1. Cancel·lació pel Client
        </h3>
        
        <div className="bg-muted rounded-lg p-4 mb-4">
          <p className="font-semibold text-foreground">Pla Flexible:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground mt-2">
            <li>Cancel·lació en qualsevol moment amb 30 dies de preavís</li>
            <li>No s'aplicaran penalitzacions</li>
            <li>L'accés continuarà fins al final del període facturat</li>
          </ul>
        </div>

        <div className="bg-muted rounded-lg p-4 mb-4">
          <p className="font-semibold text-foreground">Pla Compromís:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground mt-2">
            <li>Exit clause al mes 3: Si el Client cancel·la durant el mes 3, pot sortir sense penalització.</li>
            <li>Després del mes 3: El Client està compromès fins al mes 12. La cancel·lació anticipada requereix el pagament dels mesos restants amb un descompte del 25%.</li>
          </ul>
        </div>

        <div className="bg-muted rounded-lg p-4 mb-4">
          <p className="font-semibold text-foreground">Pilot Program:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground mt-2">
            <li>Exit clause al mes 3 (mateix que Pla Compromís)</li>
            <li>Després del mes 3, conversió automàtica al mes 6 o cancel·lació sense penalització</li>
          </ul>
        </div>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          7.2. Cancel·lació per PREMSA.IO
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          PREMSA.IO pot cancel·lar el servei immediatament si:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>El Client incompleix materialment aquests Termes</li>
          <li>El Client no efectua el pagament després de 15 dies del venciment</li>
          <li>El Client utilitza els Serveis per activitats il·legals o prohibides</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mb-4">
          En cas de cancel·lació per incompliment del Client, no s'aplicaran reemborsaments.
        </p>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          7.3. Política de Reemborsament
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li><strong>Garantia de 14 dies:</strong> Si el Client no està satisfet durant els primers 14 dies, pot sol·licitar un reemborsament complet.</li>
          <li><strong>Després de 14 dies:</strong> No s'ofereixen reemborsaments per pagaments ja efectuats, excepte en casos de cancel·lació per PREMSA.IO sense causa justificada.</li>
        </ul>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          7.4. Procediment de Cancel·lació
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Per cancel·lar el servei:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Enviar sol·licitud per escrit a cancel@premsa.io</li>
          <li>Incloure: Nom del compte, motiu de cancel·lació (opcional), data desitjada de cancel·lació</li>
          <li>PREMSA.IO confirmarà la cancel·lació dins de 48h</li>
        </ul>
      </section>

      {/* 8. PROPIETAT INTEL·LECTUAL */}
      <section id="propietat" className="mt-12">
        <h2 className="font-heading font-bold text-2xl md:text-[28px] text-foreground mb-6">
          8. Propietat Intel·lectual
        </h2>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          8.1. Propietat de PREMSA.IO
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Tots els drets de propietat intel·lectual sobre la Plataforma, incloent però no limitat a:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Codi font i programari</li>
          <li>Algoritmes i models d'IA</li>
          <li>Disseny visual i interfície d'usuari</li>
          <li>Documentació i materials de màrqueting</li>
          <li>Marques comercials i logotips</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mb-4">
          pertanyen exclusivament a PREMSA.IO o als seus llicenciadors.
        </p>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          8.2. Llicència d'Ús
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          PREMSA.IO atorga al Client una llicència no exclusiva, no transferible, revocable per 
          accedir i utilitzar els Serveis durant la vigència del contracte, subjecte al compliment 
          d'aquests Termes.
        </p>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          8.3. Propietat del Contingut del Client
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          El Client conserva tots els drets sobre el Contingut del Client. En utilitzar els Serveis, 
          el Client atorga a PREMSA.IO una llicència mundial, lliure de royalties, per processar, 
          emmagatzemar i transmetre el Contingut del Client únicament en la mesura necessària per 
          proporcionar els Serveis.
        </p>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          8.4. Feedback
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Qualsevol feedback, suggeriment o idea proporcionada pel Client a PREMSA.IO serà 
          considerada no confidencial i PREMSA.IO podrà utilitzar-la lliurement sense cap 
          obligació cap al Client.
        </p>
      </section>

      {/* 9. ÚS ACCEPTABLE */}
      <section id="us-acceptable" className="mt-12">
        <h2 className="font-heading font-bold text-2xl md:text-[28px] text-foreground mb-6">
          9. Ús Acceptable
        </h2>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          9.1. Restriccions d'Ús
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          El Client accepta NO:
        </p>
        
        <p className="font-semibold text-foreground mb-2">a) Activitats Prohibides:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Utilitzar els Serveis per a activitats il·legals o fraudulentes</li>
          <li>Violar drets de propietat intel·lectual de tercers</li>
          <li>Transmetre malware, virus o codi maliciós</li>
          <li>Intentar accedir a parts no autoritzades de la Plataforma</li>
          <li>Fer enginyeria inversa del programari</li>
        </ul>

        <p className="font-semibold text-foreground mb-2">b) Abús de Recursos:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Fer ús excessiu dels recursos del sistema que afecti altres clients</li>
          <li>Fer web scraping o extracció massiva de dades no autoritzada</li>
          <li>Utilitzar bots o scripts automatitzats sense autorització prèvia</li>
        </ul>

        <p className="font-semibold text-foreground mb-2">c) Revenda:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Revendre, sublicenciar o distribuir l'accés als Serveis sense autorització escrita</li>
        </ul>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          9.2. Conseqüències de l'Incompliment
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          En cas de violació d'aquestes restriccions, PREMSA.IO pot:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Suspendre l'accés als Serveis immediatament</li>
          <li>Cancel·lar el compte sense reemborsament</li>
          <li>Emprendre accions legals si és necessari</li>
        </ul>
      </section>

      {/* 10. LIMITACIÓ DE RESPONSABILITAT */}
      <section id="limitacio" className="mt-12">
        <h2 className="font-heading font-bold text-2xl md:text-[28px] text-foreground mb-6">
          10. Limitació de Responsabilitat
        </h2>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          10.1. Exclusions
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          En la mesura permesa per la llei, PREMSA.IO no serà responsable de:
        </p>
        
        <p className="font-semibold text-foreground mb-2">a) Lucre Cessant:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Pèrdues de beneficis o ingressos</li>
          <li>Pèrdues d'oportunitats de negoci</li>
          <li>Pèrdues de reputació</li>
        </ul>

        <p className="font-semibold text-foreground mb-2">b) Danys Indirectes:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Danys indirectes, incidentals, especials, punitius o conseqüencials</li>
          <li>Pèrdues derivades de decisions basades en la informació proporcionada pels Serveis</li>
        </ul>

        <p className="font-semibold text-foreground mb-2">c) Causes de Força Major:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Esdeveniments fora del control raonable de PREMSA.IO (desastres naturals, atacs cibernètics a gran escala, pandemies, etc.)</li>
        </ul>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          10.2. Límit de Responsabilitat
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          La responsabilitat total agregada de PREMSA.IO cap al Client, independentment de la 
          causa d'acció, no superarà l'import total pagat pel Client durant els 12 mesos anteriors 
          a la reclamació.
        </p>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          10.3. Excepcions
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Les limitacions anteriors NO s'apliquen a:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Responsabilitat per mort o lesions personals causades per negligència de PREMSA.IO</li>
          <li>Frau o falsedat fraudulenta</li>
          <li>Incompliment de les obligacions de protecció de dades sota el GDPR</li>
          <li>Qualsevol altra responsabilitat que no pugui ser exclosa o limitada per llei</li>
        </ul>
      </section>

      {/* 11. GARANTIES */}
      <section id="garanties" className="mt-12">
        <h2 className="font-heading font-bold text-2xl md:text-[28px] text-foreground mb-6">
          11. Garanties
        </h2>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          11.1. Garanties de PREMSA.IO
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          PREMSA.IO garanteix que:
        </p>
        
        <p className="font-semibold text-foreground mb-2">a) Disponibilitat:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Els Serveis estaran disponibles el 99,5% del temps (exclòs manteniment programat)</li>
          <li>Manteniment programat serà notificat amb 7 dies d'antelació</li>
        </ul>

        <p className="font-semibold text-foreground mb-2">b) Qualitat del Servei:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Els Serveis funcionaran substancialment d'acord amb la Documentació</li>
          <li>El processament de documents normatius es realitzarà amb estàndards professionals del sector</li>
        </ul>

        <p className="font-semibold text-foreground mb-2">c) Seguretat:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>S'implementaran mesures de seguretat tècniques i organitzatives adequades per protegir les dades del Client</li>
        </ul>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          11.2. Descàrrec de Garanties
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Excepte com s'estableix expressament en aquests Termes:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Els Serveis es proporcionen "tal qual" i "segons disponibilitat"</li>
          <li>PREMSA.IO NO garanteix que els Serveis seran ininterromputs o lliures d'errors</li>
          <li>PREMSA.IO NO garanteix l'exactitud absoluta de les anàlisis generades per IA (tot i que s'esforça per una alta precisió)</li>
          <li>El Client és responsable de verificar la informació crítica consultant les fonts oficials</li>
        </ul>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          11.3. Recurs Exclusiu
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Si PREMSA.IO incompleix les garanties anteriors, el recurs exclusiu del Client serà:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Que PREMSA.IO torni a executar els Serveis defectuosos, o</li>
          <li>Si PREMSA.IO no pot corregir l'incompliment, reemborsament prorratejat del mes en curs</li>
        </ul>
      </section>

      {/* 12. PROTECCIÓ DE DADES */}
      <section id="proteccio-dades" className="mt-12">
        <h2 className="font-heading font-bold text-2xl md:text-[28px] text-foreground mb-6">
          12. Protecció de Dades
        </h2>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          12.1. Aplicació del GDPR
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          PREMSA.IO compleix amb el Reglament General de Protecció de Dades (GDPR) i la Llei 
          Orgànica 3/2018 de Protecció de Dades Personals i garantia dels drets digitals (LOPDGDD).
        </p>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          12.2. Rols
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li><strong>Client</strong> = Responsable del Tractament de les dades personals que introdueix als Serveis</li>
          <li><strong>PREMSA.IO</strong> = Encarregat del Tractament que processa dades en nom del Client</li>
        </ul>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          12.3. Data Processing Agreement (DPA)
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Les obligacions específiques de protecció de dades es detallen al Data Processing Agreement 
          (DPA) disponible a /legal/dpa, que forma part integral d'aquests Termes.
        </p>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          12.4. Seguretat de les Dades
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          PREMSA.IO implementa:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Encriptació at-rest (AES-256) i in-transit (TLS 1.3)</li>
          <li>Controls d'accés amb autenticació de dos factors</li>
          <li>Backups automàtics diaris amb retenció de 30 dies</li>
          <li>Hosting dins la Unió Europea (AWS Frankfurt)</li>
          <li>Audit logs de totes les accions sensibles</li>
        </ul>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          12.5. Notificació de Violacions de Seguretat
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          En cas de violació de seguretat que afecti dades personals:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>PREMSA.IO notificarà al Client dins de 24 hores</li>
          <li>Proporcionarà informació sobre la naturalesa de la violació i les mesures correctores</li>
        </ul>
      </section>

      {/* 13. MODIFICACIONS DELS TERMES */}
      <section id="modificacions" className="mt-12">
        <h2 className="font-heading font-bold text-2xl md:text-[28px] text-foreground mb-6">
          13. Modificacions dels Termes
        </h2>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          13.1. Dret a Modificar
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          PREMSA.IO es reserva el dret de modificar aquests Termes en qualsevol moment per:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Complir amb canvis legals o regulatoris</li>
          <li>Millorar els Serveis</li>
          <li>Adaptar-se a canvis en el model de negoci</li>
        </ul>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          13.2. Notificació
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Les modificacions materials seran notificades amb 30 dies d'antelació via email</li>
          <li>Les modificacions menors (correccions tipogràfiques, aclariments) seran publicades directament</li>
        </ul>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          13.3. Acceptació
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          L'ús continuat dels Serveis després de l'entrada en vigor de les modificacions 
          constitueix l'acceptació dels Termes modificats.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          El Client pot rebutjar les modificacions cancel·lant el servei abans de la data 
          d'entrada en vigor sense penalització.
        </p>
      </section>

      {/* 14. LLEI APLICABLE I JURISDICCIÓ */}
      <section id="llei" className="mt-12">
        <h2 className="font-heading font-bold text-2xl md:text-[28px] text-foreground mb-6">
          14. Llei Aplicable i Jurisdicció
        </h2>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          14.1. Llei Aplicable
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Aquests Termes es regeixen i interpreten d'acord amb les lleis d'Espanya.
        </p>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          14.2. Jurisdicció
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Per a qualsevol disputa derivada d'aquests Termes, les parts se sotmeten a la jurisdicció 
          exclusiva dels tribunals de Barcelona, Espanya, renunciant expressament a qualsevol altre 
          fur que pogués correspondre'ls.
        </p>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          14.3. Resolució de Disputes
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Abans d'iniciar qualsevol acció legal, les parts acorden intentar resoldre la disputa 
          de bona fe mitjançant negociació durant un període de 30 dies.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Opcionalment, les parts poden acordar sotmetre la disputa a arbitratge vinculant sota 
          les Regles d'Arbitratge de la Cort d'Arbitratge de Barcelona.
        </p>
      </section>

      {/* 15. DISPOSICIONS GENERALS */}
      <section id="disposicions" className="mt-12">
        <h2 className="font-heading font-bold text-2xl md:text-[28px] text-foreground mb-6">
          15. Disposicions Generals
        </h2>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          15.1. Acord Complet
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Aquests Termes, juntament amb la Privacy Policy i el DPA, constitueixen l'acord complet 
          entre les parts i substitueixen tots els acords anteriors, orals o escrits.
        </p>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          15.2. Divisibilitat
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Si qualsevol disposició d'aquests Termes és declarada invàlida o inexigible, la resta 
          de disposicions continuaran en ple vigor i efecte.
        </p>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          15.3. Renúncia
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          La falta d'exercici o l'aplicació tardana de qualsevol dret sota aquests Termes no 
          constituirà una renúncia a aquest dret.
        </p>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          15.4. Cessió
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          El Client no pot cedir aquests Termes sense el consentiment previ per escrit de PREMSA.IO. 
          PREMSA.IO pot cedir aquests Termes sense consentiment en cas de fusió, adquisició o venda d'actius.
        </p>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          15.5. Independència de les Parts
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          La relació entre PREMSA.IO i el Client és la d'independència contractual. Aquests 
          Termes no creen cap relació de societat, joint venture, agència o ocupació.
        </p>

        <h3 className="font-heading font-semibold text-xl text-foreground mt-6 mb-4">
          15.6. Supervivència
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Les disposicions d'aquests Termes que per la seva naturalesa hagin de sobreviure a la 
          terminació (incloent, sense limitació, propietat intel·lectual, limitació de responsabilitat, 
          llei aplicable) continuaran en vigor després de la terminació del contracte.
        </p>
      </section>

      {/* 16. CONTACTE */}
      <section id="contacte" className="mt-12">
        <h2 className="font-heading font-bold text-2xl md:text-[28px] text-foreground mb-6">
          16. Contacte
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Per a qualsevol pregunta sobre aquests Termes:
        </p>
        <ul className="list-none space-y-2 text-muted-foreground">
          <li><strong>Email:</strong> legal@premsa.io</li>
          <li><strong>Adreça postal:</strong> PREMSA.IO SL, Barcelona, España</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-6">
          <strong>Data d'entrada en vigor:</strong> 1 de Gener de 2025
          <br />
          <strong>Última actualització:</strong> 1 de Gener de 2025
        </p>
      </section>
    </LegalLayout>
  );
};

export default TermsPage;
