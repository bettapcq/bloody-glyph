import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <section className="flex flex-1 items-center justify-center px-5 pb-20 pt-24 text-[var(--color-text)] md:px-8 lg:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-2xl text-center"
        >
          <img
            src="/logo-puro.png"
            alt="BloodyGlyph"
            className="mx-auto h-28 w-28 object-contain"
          />

          <p className="mt-6 text-sm uppercase tracking-[0.35em] text-[var(--color-primary)]">
            Errore 404
          </p>

          <h1 className="mt-4 font-[var(--font-title)] text-4xl font-bold uppercase md:text-6xl">
            Pagina non trovata
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[var(--color-text-secondary)] md:text-base">
            La destinazione che stai cercando non esiste, è stata rimossa oppure
            il collegamento non è corretto.
          </p>

          <div className="mx-auto mt-7 flex max-w-xs items-center gap-3">
            <span className="h-px flex-1 bg-[var(--color-border)]" />
            <span className="h-2 w-2 rotate-45 border border-[var(--color-primary)]" />
            <span className="h-px flex-1 bg-[var(--color-border)]" />
          </div>

          <Link
            to={"/"}
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold uppercase tracking-wider transition hover:bg-[var(--color-primary-hover)]"
          >
            <FiArrowLeft />
            Torna alla home
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

export default NotFoundPage;
