import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  loginUser,
  clearAuthError,
} from "../redux/actions/authActions";
import { validationRules } from "../validationRules";
import { getMe } from "../redux/actions/userActions";
import { motion } from "framer-motion";

const FormRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(clearAuthError());

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    if (password !== repeatPassword) {
      setValidated(true);
      return;
    }

    const registered = await dispatch(registerUser(username, email, password));

    if (!registered) return;

    const logged = await dispatch(loginUser(email, password));

    if (logged) {
      await dispatch(getMe());

      navigate("/dashboard");
    }
  };

  return (
    <section className="flex items-center justify-center overflow-hidden px-5 pb-20 pt-35 text-[var(--color-text)] md:px-8 md:pt-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full md:max-w-xl rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-7 pb-8 pt-12 shadow-2xl backdrop-blur-md sm:px-12"
      >
        {" "}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: 45 }}
          animate={{ opacity: 1, scale: 1, rotate: 45 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="absolute left-1/2 top-0 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[var(--color-primary)] bg-[var(--color-surface)] shadow-[0_0_30px_rgba(122,12,18,0.25)]"
        >
          {" "}
          <img
            src="/logo-puro.png"
            alt="Glyph logo"
            className="w-full h-full object-contain rotate-[-45deg]"
          />
        </motion.div>
        <div className="mb-8 mt-4 text-center">
          <h2 className="font-[var(--font-title)] text-2xl font-bold uppercase">
            Crea il tuo account
          </h2>

          <div className="mx-auto mt-4 h-px w-16 bg-[var(--color-primary)]" />
        </div>
        {/* FORM */}
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <label
            htmlFor="username"
            className="mb-2 block text-sm text-[var(--color-text-secondary)]"
          >
            Username
          </label>
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" />{" "}
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Il tuo username"
              required={validationRules.username.required}
              minLength={validationRules.username.minLength}
              maxLength={validationRules.username.maxLength}
              className="w-full rounded-sm border border-[var(--color-border)] bg-black/20 py-3.5 pl-12 pr-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-secondary)]/40 focus:border-[var(--color-primary)]"
            />
          </div>{" "}
          {validated &&
            (username.length < validationRules.username.minLength ||
              username.length > validationRules.username.maxLength) && (
              <p className="mt-1 text-xs text-[var(--color-primary-hover)]">
                {validationRules.username.message}
              </p>
            )}
          <label
            htmlFor="email"
            className="mb-2 block text-sm text-[var(--color-text-secondary)]"
          >
            Email
          </label>{" "}
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="la_tua_email@mail.com"
              required={validationRules.email.required}
              pattern={validationRules.email.pattern}
              className="w-full rounded-sm border border-[var(--color-border)] bg-black/20 py-3.5 pl-12 pr-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-secondary)]/40 focus:border-[var(--color-primary)]"
            />
          </div>
          {validated &&
            !new RegExp(validationRules.email.pattern).test(email) && (
              <p className="mt-1 whitespace-pre-line text-xs text-[var(--color-primary-hover)]">
                {validationRules.email.message}
              </p>
            )}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm text-[var(--color-text-secondary)]"
            >
              Password
            </label>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="La tua password"
                required={validationRules.password.required}
                pattern={validationRules.password.pattern}
                className="w-full rounded-sm border border-[var(--color-border)] bg-black/20 py-3.5 pl-12 pr-12 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-secondary)]/40 focus:border-[var(--color-primary)] focus:shadow-[0_0_20px_rgba(122,12,18,0.12)]"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] transition hover:text-[var(--color-text)]"
                aria-label={
                  showPassword ? "Nascondi password" : "Mostra password"
                }
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="repeatPassword"
              className="mb-2 block text-sm text-[var(--color-text-secondary)]"
            >
              Ripeti password
            </label>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" />

              <input
                id="repeatPassword"
                type={showRepeatPassword ? "text" : "password"}
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                placeholder="Ripeti la password"
                required
                className="w-full rounded-sm border border-[var(--color-border)] bg-black/20 py-3.5 pl-12 pr-12 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-secondary)]/40 focus:border-[var(--color-primary)] focus:shadow-[0_0_20px_rgba(122,12,18,0.12)]"
              />

              <button
                type="button"
                onClick={() => setShowRepeatPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] transition hover:text-[var(--color-text)]"
                aria-label={
                  showRepeatPassword ? "Nascondi password" : "Mostra password"
                }
              >
                {showRepeatPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {validated &&
              !new RegExp(validationRules.password.pattern).test(password) && (
                <p className="mt-1 whitespace-pre-line text-xs text-[var(--color-primary-hover)]">
                  {validationRules.password.message}
                </p>
              )}
          </div>
          {password !== repeatPassword && repeatPassword !== "" && (
            <p className="text-center text-sm text-[var(--color-primary-hover)]">
              Le password non coincidono
            </p>
          )}
          {error && (
            <p className="text-center text-sm text-[var(--color-primary-hover)]">
              {error}
            </p>
          )}
          <p className="text-xs text-[var(--color-text-secondary)]">
            Registrandoti dichiari di aver letto la{" "}
            <Link
              to="/privacy-policy"
              target="_blank"
              className="text-[var(--color-primary)] hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full overflow-hidden rounded-sm bg-[var(--color-primary)] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] transition hover:bg-[var(--color-primary-hover)]"
          >
            {loading ? "Registrazione..." : "Registrati"}
          </button>
        </form>
        {/* DIVIDER */}
        <div className="mt-8 flex items-center gap-3">
          <span className="h-px flex-1 bg-[var(--color-border)]" />

          <span className="h-1.5 w-1.5 rotate-45 border border-[var(--color-text-secondary)]/30" />

          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>
        <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
          Hai già un account?{" "}
          <Link
            to="/login"
            className="text-[var(--color-primary)] transition hover:text-[var(--color-primary-hover)]"
          >
            Accedi
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default FormRegister;
