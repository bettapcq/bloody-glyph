const CookiePolicy = () => {
  return (
    <main className="min-h-screen px-5 pb-20 pt-32 text-[var(--color-text)] md:px-8">
      <article className="mx-auto max-w-4xl">
        <img
          src="/logo-transparent.png"
          alt="BloodyGlyph"
          className="w-[70%]"
        />
        <h1 className="font-[var(--font-title)] text-4xl uppercase md:text-5xl">
          Cookie Policy
        </h1>

        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
          Ultimo aggiornamento: 3 settembre 2026
        </p>

        <div className="mt-10 space-y-10 leading-7 text-[var(--color-text-secondary)]">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
              Cookie e tecnologie di tracciamento
            </h2>

            <p>
              Nella configurazione attuale BloodyGlyph non utilizza cookie
              analitici, pubblicitari o di profilazione e non utilizza strumenti
              come Google Analytics o pixel pubblicitari per monitorare il
              comportamento degli utenti.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
              Autenticazione
            </h2>

            <p>
              Per mantenere la sessione autenticata, BloodyGlyph utilizza un
              token JWT memorizzato nel localStorage del browser. Il
              localStorage è una tecnologia di memorizzazione del browser
              distinta dai cookie.
            </p>

            <p className="mt-2">
              Il token è utilizzato esclusivamente per consentire
              l'autenticazione e l'accesso alle funzionalità riservate
              all'utente.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
              Cookie banner
            </h2>

            <p>
              Poiché BloodyGlyph non utilizza attualmente cookie o strumenti di
              tracciamento che richiedano il consenso preventivo dell'utente,
              non viene mostrato un banner per la raccolta del consenso ai
              cookie.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
              Modifiche
            </h2>

            <p>
              Qualora in futuro vengano introdotti servizi di analytics,
              marketing o altre tecnologie che richiedano il consenso, questa
              Cookie Policy e i relativi meccanismi di gestione del consenso
              verranno aggiornati.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
              Contatti
            </h2>

            <p>
              Per informazioni è possibile scrivere a{" "}
              <a
                href="mailto:betta.pcq@gmail.com"
                className="text-[var(--color-primary)] hover:underline"
              >
                betta.pcq@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
};

export default CookiePolicy;
