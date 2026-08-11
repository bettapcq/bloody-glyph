import { Link } from "react-router-dom";
import { FiFileText, FiCheckCircle, FiArrowDown } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative overflow-hidden px-5 pb-5 pt-35 text-[var(--color-text)] md:px-8 lg:pt-50">
      <div className="relative mx-auto grid max-w-[1500px] items-center gap-8 lg:grid-cols-[1fr_1.5fr_0.65fr]">
        {" "}
        {/* TESTO */}
        <div className="z-10 text-center lg:text-left">
          <h1 className="font-[var(--font-title)] text-4xl font-bold uppercase leading-[1.08] sm:text-5xl lg:text-6xl xl:text-7xl">
            Ogni sigillo
            <br />
            custodisce una
            <br />
            <span className="text-[var(--color-primary-hover)]">
              destinazione.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-[var(--color-text-secondary)] lg:mx-0 lg:text-lg">
            Crea e gestisci QR code dinamici per link, immagini e PDF. Cambia il
            contenuto quando vuoi: il QR rimane sempre lo stesso.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              to="/register"
              className="bg-[var(--color-primary)] px-7 py-3.5 text-center font-semibold uppercase tracking-wide transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              Crea il tuo QR →
            </Link>

            <a
              href="#how-it-works"
              className="px-3 py-3.5 text-center text-sm uppercase tracking-wide text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
            >
              Scopri come funziona ↓
            </a>
          </div>
        </div>
        {/* QR */}
        <div className="relative flex justify-center self-end">
          <div className="relative w-[90%] lg:w-full">
            <img
              src="/hero-image.png"
              alt="Esempio QR Code BloodyGlyph"
              className="relative z-10 w-full"
            />
          </div>
        </div>
        {/* FLUSSO DESTINAZIONE */}
        <div className="mx-auto flex w-full max-w-xs flex-col items-center lg:mx-0">
          <div className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <FiFileText className="text-xl text-[var(--color-text)]" />

              <div>
                <p className="text-sm">Menu.pdf</p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  PDF
                </p>
              </div>
            </div>
          </div>

          <FiArrowDown className="my-3 text-[var(--color-primary-hover)]" />

          <div className="border border-[var(--color-primary)]/40 px-5 py-2 text-xs uppercase tracking-widest text-[var(--color-primary-hover)]">
            Modifica
          </div>

          <FiArrowDown className="my-3 text-[var(--color-primary-hover)]" />

          <div className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <FiFileText className="text-xl text-[var(--color-text)]" />

              <div>
                <p className="text-sm ">NuovoMenu.pdf</p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  PDF
                </p>
              </div>
            </div>
          </div>

          <FiArrowDown className="my-3 text-[var(--color-primary-hover)]" />

          <div className="w-full rounded-md border border-[var(--color-primary)]/40 bg-black/30 p-4">
            <div className="flex items-center justify-center md:justify-start gap-3 text-[var(--color-primary-hover)]">
              <FiCheckCircle className="text-xl" />

              <p className="font-[var(--font-title)] text-sm uppercase leading-5">
                Il QR rimane
                <br />
                identico.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
