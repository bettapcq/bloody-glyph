import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AlertModal from "./AlertModal";
import { getMyQrCodes } from "../redux/actions/qrActions";

const CTASection = () => {
  const { isLogged } = useSelector((state) => state.auth);
  const { qrCodes } = useSelector((state) => state.qrCodes);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);

  useEffect(() => {
    if (isLogged) {
      dispatch(getMyQrCodes());
    }
  }, [dispatch, isLogged]);

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

  return (
    <section className="overflow-hidden px-5 pt-5 pb-24 text-[var(--color-text)] md:px-8 lg:py-32">
      {isLogged ? (
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.img
            src="/logo-puro.png"
            alt="Glyph Logo"
            className="w-[20%] pb-3"
            variants={fadeIn({ delay: 0.1 })}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          />
          <motion.h2
            className="font-[var(--font-title)] text-3xl font-bold uppercase leading-tight sm:text-4xl lg:text-5xl"
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            Il tuo prossimo Glyph
            <br />
            ti aspetta!
          </motion.h2>

          <motion.p
            className="mt-6 max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base"
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            Crea un nuovo QR o aggiorna quelli che hai già.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
            variants={fadeIn({ delay: 0.2 })}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <button
              onClick={handleCreateQrCode}
              className="group flex items-center gap-2 rounded-sm bg-[var(--color-primary)] px-7 py-3 text-sm font-semibold uppercase tracking-wider transition hover:bg-[var(--color-primary-hover)]"
            >
              Crea un nuovo QR
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>

            <Link
              to="/dashboard"
              className="px-7 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition hover:text-[var(--color-text)]"
            >
              Vai alla Dashboard
            </Link>
          </motion.div>
        </div>
      ) : (
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.img
            src="/logo-puro.png"
            alt="Glyph Logo"
            className="w-[20%] pb-3"
            variants={fadeIn({ delay: 0.1 })}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          />
          <motion.h2
            className="font-[var(--font-title)] text-3xl font-bold uppercase leading-tight sm:text-4xl lg:text-5xl"
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            Pronto a creare
            <br />
            il tuo primo Glyph?
          </motion.h2>

          <motion.p
            className="mt-6 max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base"
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            Crea il tuo account, genera i tuoi QR dinamici e aggiorna le loro
            destinazioni quando vuoi.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
            variants={fadeIn({ delay: 0.2 })}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
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
          </motion.div>
        </div>
      )}
      <AlertModal
        isOpen={isLimitModalOpen}
        onClose={() => setIsLimitModalOpen(false)}
        title="Limite raggiunto"
        message="Hai raggiunto il limite massimo di 3 QR code contemporanei. Elimina prima un QR code per poterne creare uno nuovo."
      />
    </section>
  );
};

export default CTASection;
