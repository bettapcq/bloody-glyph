import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiUser, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogged } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.users);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    setUserMenuOpen(false);
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav className="navbar fixed top-0 left-0 z-50 w-full bg-[var(--color-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-30 md:px-8">
        <NavLink to="/" className="flex items-center">
          <img
            src="/logo-transparent.png"
            alt="BloodyGlyph"
            className="h-20 w-auto md:h-30 px-3"
          />
        </NavLink>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-2xl text-[var(--color-text)] md:hidden"
          aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)] items-center border-b-2 border-[var(--color-primary)] pb-1"
                : "text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)] items-center pb-1"
            }
          >
            Home
          </NavLink>

          {isLogged ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "items-center border-b-2 border-[var(--color-primary)] pb-1 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
                    : "items-center pb-1 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
                }
              >
                Dashboard
              </NavLink>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 font-[var(--font-title)] text-sm font-bold uppercase tracking-wider text-[var(--color-primary)] transition hover:text-[var(--color-primary-hover)]"
                >
                  <FiUser className="text-base" />
                  {currentUser?.username}
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-4 min-w-40 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-xl">
                    <NavLink
                      to="/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-text)]"
                    >
                      Impostazioni
                    </NavLink>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-[var(--color-primary)] transition hover:text-[var(--color-primary-hover)]"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "items-center border-b-2 border-[var(--color-primary)] pb-1 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
                    : "items-center pb-1 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="rounded-md bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                Registrati
              </NavLink>
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 md:hidden">
          <div className="flex flex-col gap-4">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-[var(--color-text-secondary)]"
            >
              Home
            </NavLink>

            {isLogged ? (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "items-center border-b-2 border-[var(--color-primary)] pb-1 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
                      : "items-center pb-1 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
                  }
                >
                  Dashboard
                </NavLink>
                {/* DIVIDER */}
                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-[var(--color-border)]" />

                  <span className="h-1.5 w-1.5 rotate-45 border border-[var(--color-text-secondary)]/30" />

                  <span className="h-px flex-1 bg-[var(--color-border)]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <FiUser className="text-lg text-[var(--color-primary)]" />

                    <span className="font-[var(--font-title)] text-sm font-bold uppercase tracking-wider text-[var(--color-primary)]">
                      {currentUser?.username}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-col gap-3 pl-7">
                    <NavLink
                      to="/settings"
                      onClick={() => setIsOpen(false)}
                      className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-text)]"
                    >
                      Impostazioni
                    </NavLink>

                    <button
                      type="button"
                      className="w-fit text-sm text-[var(--color-primary)] transition hover:text-[var(--color-primary-hover)]"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "items-center border-b-2 border-[var(--color-primary)] pb-1 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
                      : "items-center pb-1 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
                  }
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="rounded-md w-[50%] self-center bg-[var(--color-primary)] px-5 py-2.5 text-sm text-center font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-primary-hover)]"
                >
                  Registrati
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
