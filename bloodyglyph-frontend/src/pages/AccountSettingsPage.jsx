import { useState } from "react";
import { FiMail, FiLock, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";
import AlertModal from "../components/AlertModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AccountSettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <Navbar />

      <section className="px-5 pb-20 pt-24 text-[var(--color-text)] md:px-8 lg:pt-36">
        <div className="mx-auto max-w-4xl">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-primary)]">
              Impostazioni account
            </p>

            <h1 className="mt-3 font-[var(--font-title)] text-4xl font-bold md:text-5xl">
              Gestisci il tuo account
            </h1>

            <p className="mt-4 max-w-2xl text-sm text-[var(--color-text-secondary)] md:text-base">
              Aggiorna email e password oppure elimina definitivamente il tuo
              account.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {/* EMAIL */}
            <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)]/70 p-6 backdrop-blur-md md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <FiMail size={20} />
                </div>

                <div>
                  <h2 className="font-[var(--font-title)] text-2xl font-bold">
                    Email
                  </h2>

                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    Modifica l'indirizzo email associato al tuo account.
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    Email attuale:{" "}
                    <span className="font-semibold">user@example.com</span>
                  </p>
                </div>
              </div>

              <form className="mt-6">
                <label
                  htmlFor="email"
                  className="text-sm text-[var(--color-text-secondary)]"
                >
                  Nuova email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="nuova@email.it"
                  className="mt-2 w-full rounded-sm border border-[var(--color-border)] bg-black/20 px-4 py-3 text-sm outline-none transition placeholder:text-[var(--color-text-secondary)]/50 focus:border-[var(--color-primary)]"
                />

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-sm bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition hover:bg-[var(--color-primary-hover)]"
                  >
                    Salva email
                  </button>
                </div>
              </form>
            </div>

            {/* PASSWORD */}
            <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)]/70 p-6 backdrop-blur-md md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <FiLock size={20} />
                </div>

                <div>
                  <h2 className="font-[var(--font-title)] text-2xl font-bold">
                    Password
                  </h2>

                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    Inserisci la password attuale e scegli una nuova password.
                  </p>
                </div>
              </div>

              <form className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="text-sm text-[var(--color-text-secondary)]"
                  >
                    Password attuale
                  </label>

                  <div className="relative mt-2">
                    <input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      className="w-full rounded-sm border border-[var(--color-border)] bg-black/20 px-4 py-3 pr-12 text-sm outline-none transition focus:border-[var(--color-primary)]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] transition hover:text-[var(--color-text)]"
                    >
                      {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="text-sm text-[var(--color-text-secondary)]"
                  >
                    Nuova password
                  </label>

                  <div className="relative mt-2">
                    <input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      className="w-full rounded-sm border border-[var(--color-border)] bg-black/20 px-4 py-3 pr-12 text-sm outline-none transition focus:border-[var(--color-primary)]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] transition hover:text-[var(--color-text)]"
                    >
                      {showNewPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rounded-sm bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition hover:bg-[var(--color-primary-hover)]"
                  >
                    Cambia password
                  </button>
                </div>
              </form>
            </div>

            {/* DELETE */}
            <div className="rounded-sm border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/5 p-6 backdrop-blur-md md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-[var(--color-primary)]/50 bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <FiTrash2 size={20} />
                </div>

                <div className="flex-1">
                  <h2 className="font-[var(--font-title)] text-2xl font-bold">
                    Elimina account
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
                    L'eliminazione è permanente. Verranno rimossi anche tutti i
                    QR code e i contenuti associati.
                  </p>

                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    className="mt-6 inline-flex items-center gap-2 rounded-sm border border-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)] transition hover:bg-[var(--color-primary)]/10"
                  >
                    <FiTrash2 />
                    Elimina account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AlertModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {}}
          title="Eliminare definitivamente l'account?"
          message="Questa operazione è irreversibile. Tutti i QR code e i dati associati verranno eliminati."
          confirmText="Elimina account"
        />
      </section>
      <Footer />
    </>
  );
}

export default AccountSettingsPage;
