import { GiRuneStone } from "react-icons/gi";

function HowItWorksSection() {
  return (
    <>
      <section
        id="how-it-works"
        className="border-t border-[var(--color-border-light)] overflow-hidden px-5 pb-16 pt-15 text-[var(--color-text)] md:px-8"
      >
        <h1 className="mx-auto mb-10 max-w-7xl text-center text-3xl font-bold uppercase leading-[1.08] sm:text-4xl lg:text-5xl">
          UN QR. CONTENUTI DIVERSI
        </h1>
        {/* SEZIONE 2 */}
        <div className="mx-auto flex flex-col lg:flex-row max-w-7xl items-center justify-between text-center">
          <div className="mx-auto my-4 flex w-full max-w-xs flex-col items-center lg:mx-0">
            <img
              src="/logo-create.png"
              alt="Crea QR Code"
              className="w-[50%] pb-3"
            />
            <h2 className="text-xl font-bold">CREA</h2>
            <p className="text-sm text-[var(--color-text-secondary)] pt-3">
              Crea il tuo QR Code personalizzato
              <br />
              in pochi secondi.
            </p>
          </div>
          <div className="how-it-works-divider relative mx-auto flex w-full items-center justify-center">
            <div className="mx-auto  my-4 flex w-full max-w-xs flex-col items-center lg:mx-0">
              <img
                src="/logo-organize.png"
                alt="Organizza QR Code"
                className="w-[50%] pb-3"
              />
              <h2 className="text-xl font-bold">ORGANIZZA</h2>
              <p className="text-sm text-[var(--color-text-secondary)] pt-3">
                Organizza i tuoi QR Code in categorie
                <br />e tieni tutto sotto controllo.
              </p>
            </div>
          </div>

          <div className="mx-auto  my-4 flex w-full max-w-xs flex-col items-center lg:mx-0">
            <img
              src="/logo-update.png"
              alt="Aggiorna QR Code"
              className="w-[50%] pb-3"
            />
            <h2 className="text-xl font-bold">AGGIORNA</h2>
            <p className="text-sm text-[var(--color-text-secondary)] pt-3">
              Aggiorna il contenuto quando vuoi.
              <br />
              Il QR rimane sempre lo stesso.
            </p>
          </div>
        </div>
        {/* SEZIONE 2 */}
        <div className="mt-24 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
            Un sigillo, molte possibilità
          </p>

          <h2 className="mt-3 font-[var(--font-title)] text-3xl font-bold uppercase lg:text-4xl">
            Dove può portare il tuo sigillo?
          </h2>
          <div></div>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3">
            {[
              "Menu",
              "Evento",
              "Portfolio",
              "Documento",
              "Immagine",
              "Sito web",
            ].map((item) => (
              <div
                key={item}
                className="flex flex-col items-center gap-3 text-[var(--color-text-secondary)]"
              >
                <GiRuneStone className="text-3xl text-[var(--color-primary)]" />

                <span className="font-[var(--font-title)] text-sm uppercase tracking-[0.18em] text-[var(--color-text)]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HowItWorksSection;
