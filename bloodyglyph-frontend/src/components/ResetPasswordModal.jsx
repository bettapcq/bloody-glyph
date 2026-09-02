import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiMail, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { clearAuthError, resetPassword } from "../redux/actions/authActions";

const ResetPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const [successMessage, setSuccessMessage] = useState("");

  const { error, loading } = useSelector((state) => state.auth);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(clearAuthError());
    setSuccessMessage("");

    const success = await dispatch(resetPassword(email));

    if (success) {
      setSuccessMessage("Password temporanea inviata. Controlla le email.");
      setEmail("");
    }
  };

  const handleClose = () => {
    setEmail("");
    setSuccessMessage("");
    dispatch(clearAuthError());
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-7 py-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-5 top-5 text-[var(--color-text-secondary)] transition hover:text-[var(--color-text)]"
          aria-label="Chiudi"
        >
          <FiX size={20} />
        </button>

        <div className="text-center">
          <h2 className="font-[var(--font-title)] text-2xl font-bold uppercase">
            Recupera password
          </h2>

          <div className="mx-auto mt-4 h-px w-16 bg-[var(--color-primary)]" />

          <p className="mt-5 text-sm text-[var(--color-text-secondary)]">
            Inserisci l&apos;email associata al tuo account. Riceverai una
            password temporanea.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div>
            <label
              htmlFor="reset-email"
              className="mb-2 block text-sm text-[var(--color-text-secondary)]"
            >
              Email
            </label>

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" />

              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  dispatch(clearAuthError());
                }}
                placeholder="la_tua_email@mail.com"
                required
                className="w-full rounded-sm border border-[var(--color-border)] bg-black/20 py-3.5 pl-12 pr-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-secondary)]/40 focus:border-[var(--color-primary)]"
              />
            </div>
          </div>
          {error && (
            <p className="text-center text-sm text-[var(--color-primary-hover)]">
              {error}
            </p>
          )}

          {successMessage && (
            <p className="text-center text-sm text-[var(--color-text)]">
              {successMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-sm bg-[var(--color-primary)] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] transition hover:bg-[var(--color-primary-hover)]"
          >
            {loading ? "Invio..." : "Invia password temporanea"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPasswordModal;
