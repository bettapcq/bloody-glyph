import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar fixed top-0 left-0 z-50 w-full bg-[var(--color-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-30 md:px-8">
        <Link to="/" className="flex items-center">
          <img
            src="/logo-transparent.png"
            alt="BloodyGlyph"
            className="h-20 w-auto md:h-30 px-3"
          />
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-2xl text-[var(--color-text)] md:hidden"
          aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-md bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-primary-hover)]"
          >
            Registrati
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-[var(--color-text-secondary)]"
            >
              Home
            </Link>

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-[var(--color-text-secondary)]"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="rounded-md bg-[var(--color-primary)] px-4 py-3 text-center font-semibold text-[var(--color-text)]"
            >
              Registrati
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
