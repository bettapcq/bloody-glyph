import { Link, useNavigate } from "react-router-dom";
import { FiFileText, FiCheckCircle, FiArrowDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useState } from "react";
import AlertModal from "./AlertModal";

const Hero = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const { qrCodes } = useSelector((state) => state.qrCodes);
  const navigate = useNavigate();

  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);

  const handleCreateQrCode = () => {
    if (!isLogged) {
      navigate("/register");
      return;
    }

    if (qrCodes.length >= 3) {
      setIsLimitModalOpen(true);
      return;
    }

    navigate("/qrcodes/new");
  };

  // AMINAZIONI
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
      <div className="relative mx-auto grid max-w-[1500px] items-center gap-8 lg:grid-cols-[1fr_1.5fr]">
        {" "}
        {/* TESTO */}
        <motion.div
          className="z-10 text-center lg:text-left"
          initial={fadeLeft.hidden}
          animate={fadeLeft.show}
        >
          <h1 className="font-[var(--font-title)] text-4xl font-bold uppercase leading-[1.08] sm:text-6xl lg:text-4xl xl:text-7xl">
            Ogni sigillo
            <br />
            custodisce una
            <br />
            <span className="text-[var(--color-primary-hover)]">
              destinazione.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[var(--color-text-secondary)] lg:mx-0 lg:text-lg">
            Crea e gestisci QR code dinamici per link, immagini e PDF. Cambia il
            contenuto quando vuoi: il QR rimane sempre lo stesso.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <button
              onClick={handleCreateQrCode}
              className="bg-[var(--color-primary)] px-7 py-3 text-center font-semibold uppercase tracking-wide transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              Crea il tuo QR →
            </button>

            <a
              href="#how-it-works"
              className="px-3 py-3.5 text-center text-sm uppercase tracking-wide text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
            >
              Scopri come funziona ↓
            </a>
          </div>
        </motion.div>
        {/* QR */}
        <div className="relative flex flex-row items-center justify-center gap-3 self-end lg:w-full lg:justify-between lg:gap-16">
          <motion.div
            className="order-2 relative z-0 flex w-[48%] items-center justify-center lg:w-full  lg:order-1"
            initial={thunderEffect.hidden}
            animate={thunderEffect.show}
          >
            <img
              src="/hero-image.png"
              alt="Esempio QR Code BloodyGlyph"
              className="relative w-[200%] max-w-none translate-y-20 -translate-x-5 object-contain lg:w-[150%]"
            />
          </motion.div>

          {/* FLUSSO DESTINAZIONE */}
          <motion.div
            className="order-1 relative z-10 flex w-[58%] max-w-[240px] flex-col items-center lg:w-full lg:max-w-xs lg:order-2"
            initial={fadeRight.hidden}
            animate={fadeRight.show}
          >
            <div className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3 py-2 lg:p-4 backdrop-blur-sm">
              <div className="flex items-center justify-start gap-2 lg:gap-3">
                <FiFileText className="text-base text-[var(--color-text)] lg:text-xl" />

                <div>
                  <p className="text-xs lg:text-sm">Menu.pdf</p>
                  <p className="text-[10px] text-[var(--color-text-secondary)] lg:text-xs">
                    PDF
                  </p>
                </div>
              </div>
            </div>

            <FlowArrow delay={0} />

            <div className="border border-[var(--color-primary)]/40 px-3 py-1 text-[10px] uppercase tracking-widest text-[var(--color-primary-hover)] lg:px-5 lg:py-2 lg:text-xs">
              Modifica
            </div>

            <FlowArrow delay={1} />

            <div className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3 py-2 lg:p-4 backdrop-blur-sm">
              <div className="flex items-center justify-start gap-2 lg:gap-3">
                <FiFileText className="text-base text-[var(--color-text)] lg:text-xl" />

                <div>
                  <p className="text-xs lg:text-sm">NuovoMenu.pdf</p>
                  <p className="text-[10px] text-[var(--color-text-secondary)] lg:text-xs">
                    PDF
                  </p>
                </div>
              </div>
            </div>

            <FlowArrow delay={2} />

            <div className="w-full rounded-md border border-[var(--color-primary)]/40 bg-black/30 px-3 py-2 lg:p-4">
              <div className="flex items-center justify-start gap-2 text-[var(--color-primary-hover)] lg:gap-3">
                <FiCheckCircle className="text-base lg:text-xl" />

                <p className="font-[var(--font-title)] text-[10px] uppercase leading-4 lg:text-sm lg:leading-5">
                  Il QR rimane identico.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <AlertModal
        isOpen={isLimitModalOpen}
        onClose={() => setIsLimitModalOpen(false)}
        title="Limite raggiunto"
        message="Hai raggiunto il limite massimo di 3 QR code contemporanei. Elimina prima un QR code per poterne creare uno nuovo."
      />
    </section>
  );
};

export default Hero;
