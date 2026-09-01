import { FiAlertTriangle, FiX } from "react-icons/fi";

function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  buttonText = "Ho capito",
  icon = <FiAlertTriangle size={22} />,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[var(--color-text-secondary)] transition hover:text-[var(--color-text)]"
        >
          <FiX size={20} />
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
          {icon}
        </div>

        <h2 className="mt-5 font-[var(--font-title)] text-2xl font-bold">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
          {message}
        </p>

        <div className="mt-7 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition hover:bg-[var(--color-primary-hover)]"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;
