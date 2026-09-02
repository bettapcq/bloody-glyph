import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiFileText,
  FiImage,
  FiLink,
  FiUpload,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getMyCategories } from "../redux/actions/categoryActions";
import {
  createQrCodeFromUrl,
  createQrCodeFromFile,
} from "../redux/actions/qrActions";
import { useNavigate } from "react-router-dom";

function QrCodeCreateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.categories);
  const { loading, error } = useSelector((state) => state.qrCodes);

  const [contentType, setContentType] = useState("URL");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    dispatch(getMyCategories());
  }, [dispatch]);

  const handleContentTypeChange = (type) => {
    setContentType(type);
    setContent("");
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (contentType === "URL") {
        const payload = {
          title,
          content,
          contentType,
          categoryId: categoryId ? Number(categoryId) : null,
        };

        await dispatch(createQrCodeFromUrl(payload));
      } else {
        const payload = {
          title,
          contentType,
          categoryId: categoryId ? Number(categoryId) : null,
          file,
        };

        await dispatch(createQrCodeFromFile(payload));
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="px-5 pb-20 pt-24 text-[var(--color-text)] md:px-8 lg:pt-36">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-text)]"
        >
          <FiArrowLeft />
          Torna alla dashboard
        </Link>

        <div className="mt-8">
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-primary)]">
            Nuovo sigillo
          </p>

          <h1 className="mt-3 font-[var(--font-title)] text-4xl font-bold md:text-5xl">
            Crea QR code
          </h1>

          <p className="mt-4 max-w-2xl text-sm text-[var(--color-text-secondary)] md:text-base">
            Scegli il tipo di contenuto da collegare al tuo QR code. Potrai
            modificare la destinazione in seguito senza rigenerare il sigillo.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)]/70 p-6 backdrop-blur-md md:p-8"
        >
          <div>
            <p className="text-sm font-medium">Tipo di contenuto</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {/* selected viene calcolato confrontando contentType con il tipo del pulsante.
              Al click cambia contentType → React fa un nuovo render -> selected viene ricalcolato.*/}
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
          </div>

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

          {contentType === "URL" && (
            <div className="mt-6">
              <label
                htmlFor="content"
                className="text-sm text-[var(--color-text-secondary)]"
              >
                Destinazione
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
                {contentType === "IMAGE" ? "Immagine" : "Documento PDF"}
              </p>

              <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed border-[var(--color-border)] bg-black/20 px-5 py-10 text-[var(--color-text-secondary)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-text)]">
                <FiUpload size={28} />

                <span className="mt-3 text-sm font-medium">
                  {file ? file.name : "Seleziona un file"}
                </span>

                <span className="mt-1 text-xs text-[var(--color-text-secondary)]">
                  {contentType === "IMAGE" ? "JPG, PNG, WEBP" : "Formato PDF"}
                </span>

                <input
                  type="file"
                  accept={
                    contentType === "IMAGE" ? "image/*" : "application/pdf"
                  }
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  required
                />
              </label>
            </div>
          )}

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
              {loading ? "Creazione..." : "Crea QR code"}
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

export default QrCodeCreateForm;
