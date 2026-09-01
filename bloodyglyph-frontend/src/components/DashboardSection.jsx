import { FiPlus, FiSearch } from "react-icons/fi";
import QrCard from "./QrCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMyQrCodes } from "../redux/actions/qrActions";
import { getMyCategories } from "../redux/actions/categoryActions";
import { useNavigate } from "react-router-dom";
import AlertModal from "./AlertModal";

function DashboardSection() {
  const { currentUser } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const { qrCodes, loading, error } = useSelector((state) => state.qrCodes);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getMyQrCodes());
    dispatch(getMyCategories());
  }, [dispatch]);

  const navigate = useNavigate();

  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);

  const handleCreateQrCode = () => {
    if (qrCodes.length >= 3) {
      setIsLimitModalOpen(true);
      return;
    }

    navigate("/qrcodes/new");
  };

  return (
    <section className="px-5 pb-20 pt-15 text-[var(--color-text)] md:px-8 lg:pt-36">
      <div className="mx-auto max-w-7xl">
        {/* HERO */}
        <div
          className="overflow-hidden rounded-sm bg-cover bg-[center_70%] md:bg-center"
          style={{
            backgroundImage: "url('/portal-bg.png')",
          }}
        >
          <div className="z-10 px-7 py-14 md:px-12 md:py-20">
            <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-primary)]">
              Dashboard
            </p>

            <h1 className="mt-3 font-[var(--font-title)] text-3xl font-bold md:text-5xl">
              Bentornatə,{" "}
              <span className="text-[var(--color-primary)]">
                {currentUser?.username}
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm text-[var(--color-text-secondary)] md:text-base">
              Gestisci i tuoi sigilli, aggiorna le destinazioni e crea nuovi QR
              code.
            </p>

            <button
              onClick={handleCreateQrCode}
              className="mt-7 inline-flex items-center gap-2 rounded-sm bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] transition hover:bg-[var(--color-primary-hover)]"
            >
              <FiPlus />
              Crea QR code
            </button>
          </div>
        </div>

        {/* STATS BASE */}
        <div className="mt-6 flex justify-end gap-4">
          <div className="w-50 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-5">
            <p className="text-sm text-[var(--color-text-secondary)]">
              QR code creati
            </p>

            <p className="mt-2 font-[var(--font-title)] text-3xl">
              {qrCodes ? qrCodes.length : 0} / 3
            </p>
          </div>
          <div className="w-50 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-5">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Categorie
            </p>
            <p className="mt-2 font-[var(--font-title)] text-3xl">
              {categories ? categories.length : 0}
            </p>
          </div>
        </div>
        {/* PIANO FREE/A PAGAMENTO DA VALUTARE IMPLEMENTAZIONE
          <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-5">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Piano attuale
            </p>

            <p className="mt-2 font-[var(--font-title)] text-3xl">Free</p>
          </div>
        */}

        {/* QR SECTION */}
        <div className="mt-10 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)]/70 p-6 backdrop-blur-md md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-[var(--font-title)] text-2xl font-bold">
                I miei QR code
              </h2>

              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Gestisci, modifica e condividi i tuoi sigilli.
              </p>
            </div>

            <button
              onClick={handleCreateQrCode}
              className="flex items-center justify-center gap-2 rounded-sm bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold uppercase tracking-wider transition hover:bg-[var(--color-primary-hover)]"
            >
              <FiPlus />
              Crea QR code
            </button>
          </div>

          {/* FILTRI DA IMPLEMENTARE IN BACKEND
          <div className="mt-7 flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />

              <input
                type="text"
                placeholder="Cerca..."
                className="w-full rounded-sm border border-[var(--color-border)] bg-black/20 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-[var(--color-text-secondary)]/50 focus:border-[var(--color-primary)]"
              />
            </div>

            <select className="rounded-sm border border-[var(--color-border)] bg-black/20 px-4 py-3 text-sm outline-none">
              <option>Tutte le categorie</option>
            </select>

            <select className="rounded-sm border border-[var(--color-border)] bg-black/20 px-4 py-3 text-sm outline-none">
              <option>Più recenti</option>
            </select>
          </div> */}
          {loading && (
            <p className="mt-6 text-sm text-[var(--color-text-secondary)]">
              Caricamento QR code...
            </p>
          )}

          {error && (
            <p className="mt-6 text-sm text-[var(--color-primary)]">{error}</p>
          )}
          {/* CARDS */}
          {!loading && !error && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {qrCodes?.map((qr) => (
                <QrCard key={qr.qrId} qr={qr} />
              ))}

              {/* CREATE CARD */}
              <button
                onClick={handleCreateQrCode}
                className="flex min-h-72 flex-col items-center justify-center rounded-sm border border-dashed border-[var(--color-border)] bg-black/10 text-[var(--color-text-secondary)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-text)]"
              >
                <FiPlus size={30} />

                <span className="mt-4 text-sm">
                  Crea nuovo
                  <br />
                  QR code
                </span>
              </button>
            </div>
          )}
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
}

export default DashboardSection;
