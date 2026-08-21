import { Link } from "react-router-dom";
import { FiFileText, FiCheckCircle, FiArrowDown } from "react-icons/fi";
import { motion } from "framer-motion";

const Hero = () => {
  const fadeRight = {
    hidden: {
      opacity: 0,
      x: 100,
      filter: "blur(6px)",
    },
    show: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const fadeLeft = {
    hidden: {
      opacity: 0,
      x: -100,
      filter: "blur(6px)",
    },
    show: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const thunderEffect = {
    hidden: {
      opacity: 0,
      scale: 1.35,
      y: -40,
      filter: "blur(8px)",
    },

    show: {
      opacity: 1,
      scale: [1.35, 0.96, 1.03, 1],
      y: [-40, 4, -2, 0],
      x: [0, -10, 9, -7, 5, -3, 2, 0],
      rotate: [0, -1.2, 1, -0.8, 0.5, 0],
      filter: "blur(0px)",

      transition: {
        duration: 0.85,
        ease: "easeOut",

        x: {
          duration: 0.45,
          delay: 0.25,
        },

        rotate: {
          duration: 0.45,
          delay: 0.25,
        },
      },
    },
  };
  // animazione freccia flusso destinazione
  const FlowArrow = ({ delay = 0 }) => {
    return (
      <motion.div
        animate={{
          y: [0, 4, 0],
          opacity: [0.35, 1, 0.35],
          scale: [1, 1.2, 1],
          filter: [
            "drop-shadow(0 0 0px rgba(163, 21, 30, 0))",
            "drop-shadow(0 0 8px rgba(163, 21, 30, 0.9))",
            "drop-shadow(0 0 0px rgba(163, 21, 30, 0))",
          ],
        }}
        transition={{
          duration: 2.5,
          delay,
          repeat: Infinity,
          repeatDelay: 2.4,
          ease: "easeInOut",
        }}
      >
        <FiArrowDown className="my-3 text-[var(--color-primary-hover)]" />
      </motion.div>
    );
  };

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-35 text-[var(--color-text)] md:px-8 lg:pt-50">
      <div className="relative mx-auto grid max-w-[1500px] items-center gap-8 lg:grid-cols-[1fr_1.5fr_0.65fr]">
        {" "}
        {/* TESTO */}
        <motion.div
          className="z-10 text-center lg:text-left"
          initial={fadeLeft.hidden}
          animate={fadeLeft.show}
        >
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
        </motion.div>
        {/* QR */}
        <div className="relative flex justify-center self-end">
          <motion.div
            className="relative w-[90%] lg:w-full"
            initial={thunderEffect.hidden}
            animate={thunderEffect.show}
          >
            <img
              src="/hero-image.png"
              alt="Esempio QR Code BloodyGlyph"
              className="relative z-10 w-full"
            />
          </motion.div>
        </div>
        {/* FLUSSO DESTINAZIONE */}
        <motion.div
          className="mx-auto flex w-full max-w-xs flex-col items-center lg:mx-0"
          initial={fadeRight.hidden}
          animate={fadeRight.show}
        >
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

          <FlowArrow delay={0} />

          <div className="border border-[var(--color-primary)]/40 px-5 py-2 text-xs uppercase tracking-widest text-[var(--color-primary-hover)]">
            Modifica
          </div>

          <FlowArrow delay={1} />

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

          <FlowArrow delay={2} />

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
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
