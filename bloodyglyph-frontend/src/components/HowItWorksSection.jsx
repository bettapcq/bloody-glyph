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
        <div className="mx-auto flex flex-col lg:flex-row max-w-7xl items-center justify-between text-center">
          <div className="mx-auto flex w-full max-w-xs flex-col items-center lg:mx-0">
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
            <div className="mx-auto flex w-full max-w-xs flex-col items-center lg:mx-0">
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

          <div className="mx-auto flex w-full max-w-xs flex-col items-center lg:mx-0">
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
      </section>
    </>
  );
}

export default HowItWorksSection;
