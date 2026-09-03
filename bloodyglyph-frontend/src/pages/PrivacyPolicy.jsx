const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen px-5 pb-20 pt-32 text-[var(--color-text)] md:px-8">
      <article className="mx-auto max-w-4xl">
        <img
          src="/logo-transparent.png"
          alt="BloodyGlyph"
          className="w-[70%]"
        />
        <h1 className="font-[var(--font-title)] text-4xl uppercase md:text-5xl">
          Privacy Policy
        </h1>

        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
          Ultimo aggiornamento: 3 settembre 2026
        </p>

        <div className="mt-10 space-y-10 leading-7 text-[var(--color-text-secondary)]">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
              1. Titolare del trattamento
            </h2>

            <p>
              Il titolare del trattamento dei dati personali raccolti tramite
              BloodyGlyph è Elisabetta Piacquadio.
            </p>

            <p className="mt-2">
              Per richieste relative alla privacy e al trattamento dei dati è
              possibile scrivere a:{" "}
              <a
                href="mailto:betta.pcq@gmail.com"
                className="text-[var(--color-primary)] hover:underline"
              >
                betta.pcq@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
              2. Cos'è BloodyGlyph
            </h2>

            <p>
              BloodyGlyph è un progetto personale e dimostrativo che consente
              agli utenti registrati di creare e gestire QR Code dinamici
              associati a URL, immagini e documenti PDF.
            </p>

            <p className="mt-2">
              Nella versione attuale il servizio è gratuito e non prevede
              pagamenti o abbonamenti.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
              3. Dati trattati
            </h2>

            <p>Durante l'utilizzo di BloodyGlyph possono essere trattati:</p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>username;</li>
              <li>indirizzo email;</li>
              <li>password, conservata in forma cifrata/hash;</li>
              <li>
                informazioni relative ai QR Code creati, come titolo, tipo di
                contenuto e destinazione;
              </li>
              <li>immagini e documenti PDF caricati volontariamente;</li>
              <li>
                informazioni tecniche necessarie al funzionamento e alla
                sicurezza del servizio.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
              4. Finalità del trattamento
            </h2>

            <p>I dati vengono trattati esclusivamente per:</p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>creare e gestire l'account dell'utente;</li>
              <li>autenticare l'utente;</li>
              <li>creare, modificare ed eliminare QR Code;</li>
              <li>gestire immagini e documenti associati ai QR Code;</li>
              <li>
                inviare comunicazioni strettamente legate al funzionamento
                dell'account, come il recupero della password;
              </li>
              <li>garantire funzionamento e sicurezza del servizio.</li>
            </ul>

            <p className="mt-3">
              BloodyGlyph non utilizza i dati degli utenti per pubblicità
              comportamentale o profilazione commerciale.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
              5. Base giuridica
            </h2>

            <p>
              Il trattamento dei dati necessari alla registrazione e
              all'utilizzo delle funzionalità di BloodyGlyph è effettuato per
              fornire il servizio richiesto dall'utente e per dare esecuzione
              alle relative richieste.
            </p>

            <p className="mt-2">
              Eventuali trattamenti necessari alla sicurezza, prevenzione di
              abusi e corretta gestione tecnica del servizio possono inoltre
              basarsi sul legittimo interesse del titolare, nel rispetto della
              normativa applicabile.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
              6. Servizi esterni
            </h2>

            <p>
              Per il funzionamento di BloodyGlyph vengono utilizzati fornitori
              tecnologici esterni che possono trattare dati nell'ambito
              dell'erogazione dei rispettivi servizi:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Vercel — hosting e distribuzione del frontend;</li>
              <li>Railway — hosting del backend;</li>
              <li>Neon — database PostgreSQL;</li>
              <li>
                Cloudinary — archiviazione e distribuzione di immagini,
                documenti e asset associati ai QR Code;
              </li>
              <li>
                Mailgun — invio delle email transazionali relative all'account.
              </li>
            </ul>

            <p className="mt-3">
              Tali fornitori operano secondo le proprie condizioni, informative
              privacy e accordi sul trattamento dei dati applicabili.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
              7. Trasferimenti internazionali
            </h2>

            <p>
              Alcuni fornitori utilizzati da BloodyGlyph possono trattare dati
              anche al di fuori dello Spazio Economico Europeo. Quando
              applicabile, tali trasferimenti sono gestiti attraverso i
              meccanismi previsti dalla normativa in materia di protezione dei
              dati e dalle condizioni dei rispettivi fornitori.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
              8. Conservazione dei dati
            </h2>

            <p>
              I dati dell'account e i contenuti associati vengono conservati per
              il tempo necessario a fornire BloodyGlyph e finché l'account
              rimane attivo, salvo periodi ulteriori necessari per obblighi di
              legge, sicurezza o gestione di eventuali controversie.
            </p>

            <p className="mt-2">
              La cancellazione di un QR Code comporta la rimozione dei relativi
              dati applicativi e, quando previsto dal funzionamento del
              servizio, degli asset associati dai sistemi utilizzati da
              BloodyGlyph.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
              9. Sicurezza e autenticazione
            </h2>

            <p>
              BloodyGlyph utilizza meccanismi di autenticazione basati su token
              JWT. Il token di autenticazione viene memorizzato nel localStorage
              del browser.
            </p>

            <p className="mt-2">
              Le password non vengono conservate in chiaro, ma mediante
              meccanismi di hashing.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
              10. Diritti dell'utente
            </h2>

            <p>
              Nei casi previsti dal Regolamento (UE) 2016/679 (GDPR), l'utente
              può esercitare i propri diritti, tra cui accesso, rettifica,
              cancellazione, limitazione e opposizione al trattamento, nonché
              portabilità dei dati quando applicabile.
            </p>

            <p className="mt-2">
              Le richieste possono essere inviate a{" "}
              <a
                href="mailto:betta.pcq@gmail.com"
                className="text-[var(--color-primary)] hover:underline"
              >
                betta.pcq@gmail.com
              </a>
              .
            </p>

            <p className="mt-2">
              L'interessato ha inoltre diritto di proporre reclamo all'autorità
              di controllo competente qualora ritenga che il trattamento dei
              propri dati personali violi la normativa applicabile.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
              11. Modifiche alla Privacy Policy
            </h2>

            <p>
              La presente informativa può essere aggiornata in seguito a
              modifiche delle funzionalità di BloodyGlyph, dei servizi
              utilizzati o della normativa applicabile. La data dell'ultimo
              aggiornamento è indicata all'inizio della pagina.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
};

export default PrivacyPolicy;
