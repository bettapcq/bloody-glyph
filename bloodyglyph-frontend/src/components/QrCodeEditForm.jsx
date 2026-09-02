import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiFileText,
  FiImage,
  FiLink,
  FiUpload,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { getMyCategories } from "../redux/actions/categoryActions";
import { getQrCodeById } from "../redux/actions/qrActions";

function QrCodeEditForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { qrId } = useParams();

  const { categories } = useSelector((state) => state.categories);
  const { selectedQrCode, loading, error } = useSelector(
    (state) => state.qrCodes,
  );

  const [isEditingContent, setIsEditingContent] = useState(false);

  const [contentType, setContentType] = useState("URL");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    dispatch(getMyCategories());
    dispatch(getQrCodeById(qrId));
  }, [dispatch, qrId]);

  useEffect(() => {
    if (selectedQrCode) {
      setTitle(selectedQrCode.title);
      setContentType(selectedQrCode.contentType);
      setContent(selectedQrCode.content || "");
      setCategoryId(selectedQrCode.categoryId || "");
    }
  }, [selectedQrCode]);

  const handleContentTypeChange = (type) => {
    setContentType(type);
    setContent("");
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // PATCH
  };

  if (!selectedQrCode) {
    return (
      <section className="px-5 pb-20 pt-24 text-[var(--color-text)] md:px-8 lg:pt-36">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Caricamento QR code...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5 pb-20 pt-24 text-[var(--color-text)] md:px-8 lg:pt-36">
      <div className="mx-auto max-w-4xl">
        <Link
          to={`/qrcodes/${qrId}`}
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-text)]"
        >
          <FiArrowLeft />
          Torna al dettaglio
        </Link>

        <div className="mt-8">
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-primary)]">
            Modifica sigillo
          </p>

          <h1 className="mt-3 font-[var(--font-title)] text-4xl font-bold md:text-5xl">
            Modifica QR code
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)]/70 p-6 backdrop-blur-md md:p-8"
        >
          <div className="mt-8">
            <label
              htmlFor="title"
              className="text-sm text-[var(--color-text-secondary)]"
            >
              Titolo
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Es. Portfolio personale"
              className="mt-2 w-full rounded-sm border border-[var(--color-border)] bg-black/20 px-4 py-3 text-sm outline-none transition placeholder:text-[var(--color-text-secondary)]/50 focus:border-[var(--color-primary)]"
              required
            />
          </div>
          <div className="mt-6">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Contenuto attuale
            </p>

            {!isEditingContent ? (
              <div className="mt-2 flex items-center justify-between gap-4 rounded-sm border border-[var(--color-border)] bg-black/20 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                    {selectedQrCode.contentType}
                  </p>

                  <p className="mt-1 break-all text-sm">
                    {selectedQrCode?.contentType === "URL"
                      ? selectedQrCode?.content
                      : selectedQrCode?.originalFileName || "File collegato"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditingContent(true)}
                  className="text-xs uppercase tracking-wider text-[var(--color-primary)] transition hover:text-[var(--color-primary-hover)]"
                >
                  Modifica contenuto
                </button>
              </div>
            ) : (
              <>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <TypeButton
                    label="URL"
                    icon={<FiLink />}
                    selected={contentType === "URL"}
                    onClick={() => handleContentTypeChange("URL")}
                  />

                  <TypeButton
                    label="Immagine"
                    icon={<FiImage />}
                    selected={contentType === "IMAGE"}
                    onClick={() => handleContentTypeChange("IMAGE")}
                  />

                  <TypeButton
                    label="PDF"
                    icon={<FiFileText />}
                    selected={contentType === "PDF"}
                    onClick={() => handleContentTypeChange("PDF")}
                  />
                </div>

                {contentType === "URL" && (
                  <div className="mt-6">
                    <label
                      htmlFor="content"
                      className="text-sm text-[var(--color-text-secondary)]"
                    >
                      Nuova destinazione
                    </label>

                    <input
                      id="content"
                      type="url"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="https://example.com"
                      className="mt-2 w-full rounded-sm border border-[var(--color-border)] bg-black/20 px-4 py-3 text-sm outline-none transition placeholder:text-[var(--color-text-secondary)]/50 focus:border-[var(--color-primary)]"
                      required
                    />
                  </div>
                )}

                {(contentType === "IMAGE" || contentType === "PDF") && (
                  <div className="mt-6">
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {contentType === "IMAGE"
                        ? "Nuova immagine"
                        : "Nuovo documento PDF"}
                    </p>

                    <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed border-[var(--color-border)] bg-black/20 px-5 py-10 text-[var(--color-text-secondary)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-text)]">
                      <FiUpload size={28} />

                      <span className="mt-3 text-sm font-medium">
                        {file ? file.name : "Seleziona un file"}
                      </span>

                      <span className="mt-1 text-xs text-[var(--color-text-secondary)]">
                        {contentType === "IMAGE"
                          ? "JPG, PNG, WEBP"
                          : "Formato PDF"}
                      </span>

                      <input
                        type="file"
                        accept={
                          contentType === "IMAGE"
                            ? "image/*"
                            : "application/pdf"
                        }
                        onChange={(e) => setFile(e.target.files[0])}
                        className="hidden"
                        required
                      />
                    </label>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsEditingContent(false);
                    setContent(selectedQrCode?.content || "");
                    setContentType(selectedQrCode?.contentType || "URL");
                    setFile(null);
                  }}
                  className="mt-4 text-xs uppercase tracking-wider text-[var(--color-text-secondary)] transition hover:text-[var(--color-text)]"
                >
                  Annulla modifica contenuto
                </button>
              </>
            )}
          </div>

          <div className="mt-6">
            <label
              htmlFor="category"
              className="text-sm text-[var(--color-text-secondary)]"
            >
              Categoria
            </label>

            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-2 w-full rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)]"
            >
              <option value="">Nessuna categoria</option>

              {categories?.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {error && (
            <p className="mt-6 text-sm text-[var(--color-primary)]">{error}</p>
          )}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/dashboard"
              className="rounded-sm border border-[var(--color-border)] px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] transition hover:text-[var(--color-text)]"
            >
              Annulla
            </Link>

            <button
              type="submit"
              disabled={loading} // disabilita il bottone mentre loading è true
              className="rounded-sm bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold uppercase tracking-wider transition hover:bg-[var(--color-primary-hover)]"
            >
              {loading ? "Aggiornamento.." : "Modifica QR code"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

// componente che permette di creare un boutton diverso in base al tipo di contenuto del QR code, con icona e label (che passiamo con le props). Il pulsante cambia stile se è selezionato.
function TypeButton({ label, icon, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-3 rounded-sm border px-5 py-5 text-sm font-medium transition ${
        selected
          ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-text)]"
          : "border-[var(--color-border)] bg-black/20 text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-text)]"
      }`}
    >
      <span className="text-xl">{icon}</span>
      {label}
    </button>
  );
}

export default QrCodeEditForm;
