import { GiRuneStone } from "react-icons/gi";
import { motion } from "framer-motion";

function HowItWorksSection() {
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

  const fadeIn = ({ delay = 0 }) => ({
    hidden: {
      opacity: 0,
      filter: "blur(6px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        delay,
        ease: "easeOut",
      },
    },
  });

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

  const GlowIcon = ({ delay = 0 }) => {
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
          repeatDelay: 0.5,
          ease: "easeInOut",
        }}
      >
        <GiRuneStone className="text-3xl text-[var(--color-primary)]" />
      </motion.div>
    );
  };

  return (
    <>
      <section
        id="how-it-works"
        className="border-t border-[var(--color-border-light)] overflow-hidden px-5 pb-16 pt-15 text-[var(--color-text)] md:px-8"
      >
        <motion.h1
          className="mx-auto mb-10 max-w-7xl text-center text-3xl font-bold uppercase leading-[1.08] sm:text-4xl lg:text-5xl"
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          UN QR. CONTENUTI DIVERSI
        </motion.h1>
        {/* SEZIONE 2 */}
        <div className="mx-auto flex flex-col lg:flex-row max-w-7xl items-center justify-between text-center">
          <div className="mx-auto my-4 flex w-full max-w-xs flex-col items-center lg:mx-0">
            <motion.img
              src="/logo-create.png"
              alt="Crea QR Code"
              className="w-[50%] pb-3"
              variants={thunderEffect}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            />
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-xl font-bold">CREA</h2>
              <p className="text-sm text-[var(--color-text-secondary)] pt-3">
                Crea il tuo QR Code personalizzato
                <br />
                in pochi secondi.
              </p>
            </motion.div>
          </div>
          <div className="how-it-works-divider relative mx-auto flex w-full items-center justify-center">
            <div className="mx-auto  my-4 flex w-full max-w-xs flex-col items-center lg:mx-0">
              <motion.img
                src="/logo-organize.png"
                alt="Organizza QR Code"
                className="w-[50%] pb-3"
                variants={thunderEffect}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              />
              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                <h2 className="text-xl font-bold">ORGANIZZA</h2>
                <p className="text-sm text-[var(--color-text-secondary)] pt-3">
                  Organizza i tuoi QR Code in categorie
                  <br />e tieni tutto sotto controllo.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="mx-auto  my-4 flex w-full max-w-xs flex-col items-center lg:mx-0">
            <motion.img
              src="/logo-update.png"
              alt="Aggiorna QR Code"
              className="w-[50%] pb-3"
              variants={thunderEffect}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            />
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-xl font-bold">AGGIORNA</h2>
              <p className="text-sm text-[var(--color-text-secondary)] pt-3">
                Aggiorna il contenuto quando vuoi.
                <br />
                Il QR rimane sempre lo stesso.
              </p>
            </motion.div>
          </div>
        </div>
        {/* SEZIONE 2 */}
        <div className="mt-24 text-center">
          <motion.p
            className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]"
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            Un sigillo, molte possibilità
          </motion.p>

          <motion.h2
            className="mt-3 font-[var(--font-title)] text-3xl font-bold uppercase lg:text-4xl"
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            Dove può portare il tuo sigillo?
          </motion.h2>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3">
            {[
              "Link social",
              "Evento",
              "Portfolio",
              "Documento",
              "Immagine",
              "Sito web",
            ].map((item, index) => (
              <motion.div
                key={item}
                className="flex flex-col items-center gap-3 text-[var(--color-text-secondary)]"
                variants={fadeIn({ delay: index * 0.1 })}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                <GlowIcon delay={index * 0.5} />
                <span className="font-[var(--font-title)] text-sm uppercase tracking-[0.18em] text-[var(--color-text)]">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HowItWorksSection;
