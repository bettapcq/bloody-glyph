import { FiMaximize2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const QrCard = ({ qr }) => {
  const formattedDate = new Date(qr.createdAt).toLocaleDateString("it-IT");

  return (
    <article className="group rounded-sm border border-[var(--color-border)] bg-black/20 p-4 transition hover:border-[var(--color-primary)]/60">
      <div className="overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)]">
        <Link to={`/qrcodes/details`}>
          <img
            src={qr.qrImageUrl}
            alt={`QR code ${qr.title}`}
            className="aspect-square w-full object-cover"
          />
        </Link>
      </div>

      <div className="mt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-medium">{qr.title}</h3>

          <Link
            to={`/qrcodes/details`}
            type="button"
            className="text-[var(--color-text-secondary)] transition hover:text-[var(--color-text)]"
          >
            <FiMaximize2 />
          </Link>
        </div>

        <span className="mt-3 inline-block rounded-sm bg-[var(--color-primary)]/15 px-2 py-1 text-[10px] uppercase tracking-wider text-[var(--color-primary-hover)]">
          {qr.contentType}
        </span>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-text-secondary)]">
            Creato il {formattedDate}
          </p>
          {qr.categoryName && (
            <span className="text-xs text-[var(--color-bg)] py-1 px-2 rounded-sm bg-[var(--color-border-light)]/70">
              {qr.categoryName}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default QrCard;
