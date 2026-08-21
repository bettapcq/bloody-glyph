import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const CTASection = () => {
  return (
    <section className="overflow-hidden px-5 py-24 text-[var(--color-text)] md:px-8 lg:py-32">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <img src="/logo-puro.png" alt="Glyph Logo" className="w-[20%] pb-3" />
        <h2 className="font-[var(--font-title)] text-3xl font-bold uppercase leading-tight sm:text-4xl lg:text-5xl">
          Pronto a creare
          <br />
          il tuo primo Glyph?
        </h2>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
          Crea il tuo account, genera i tuoi QR dinamici e aggiorna le loro
          destinazioni quando vuoi.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            to="/register"
            className="group flex items-center gap-2 rounded-sm bg-[var(--color-primary)] px-7 py-3 text-sm font-semibold uppercase tracking-wider transition hover:bg-[var(--color-primary-hover)]"
          >
            Crea il tuo account
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/login"
            className="px-7 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition hover:text-[var(--color-text)]"
          >
            Hai già un account? Accedi
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
