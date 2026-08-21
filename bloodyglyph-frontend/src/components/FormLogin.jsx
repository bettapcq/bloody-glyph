import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="flex items-center justify-center overflow-hidden px-5 pb-20 pt-35 text-[var(--color-text)] md:px-8 lg:pt-50">
      <div className="relative w-full lg:max-w-xl rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-7 pb-8 pt-12 shadow-2xl backdrop-blur-md sm:px-12">
        <div className="absolute left-1/2 top-0 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 rotate-45 items-center justify-center border border-[var(--color-primary)] bg-[var(--color-surface)] shadow-[0_0_30px_rgba(122,12,18,0.25)]">
          <img
            src="/logo-puro.png"
            alt="Glyph logo"
            className="w-full h-full object-contain rotate-[-45deg]"
          />
        </div>

        <div className="mb-8 mt-4 text-center">
          <h2 className="font-[var(--font-title)] text-2xl font-bold uppercase">
            Accedi al tuo account
          </h2>

          <div className="mx-auto mt-4 h-px w-16 bg-[var(--color-primary)]" />
        </div>

        {/* FORM */}
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm text-[var(--color-text-secondary)]"
            >
              Email
            </label>

            <div className="group relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" />

              <input
                id="email"
                type="email"
                placeholder="la_tua_email@mail.com"
                className="w-full rounded-sm border border-[var(--color-border)] bg-black/20 py-3.5 pl-12 pr-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-secondary)]/40 focus:border-[var(--color-primary)] focus:shadow-[0_0_20px_rgba(122,12,18,0.12)]"
              />
            </div>
          </div>

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
                placeholder="La tua password"
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

            <div className="mt-3 text-center lg:text-right">
              <Link
                to="/forgot-password"
                className="text-xs text-[var(--color-primary)] transition hover:text-[var(--color-primary-hover)]"
              >
                Password dimenticata?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full overflow-hidden rounded-sm bg-[var(--color-primary)] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] transition hover:bg-[var(--color-primary-hover)]"
          >
            Accedi
          </button>
        </form>

        {/* DIVIDER */}
        <div className="mt-8 flex items-center gap-3">
          <span className="h-px flex-1 bg-[var(--color-border)]" />

          <span className="h-1.5 w-1.5 rotate-45 border border-[var(--color-text-secondary)]/30" />

          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
          Non hai un account?{" "}
          <Link
            to="/register"
            className="text-[var(--color-primary)] transition hover:text-[var(--color-primary-hover)]"
          >
            Registrati
          </Link>
        </p>
      </div>
    </section>
  );
};

export default FormLogin;
