import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiArrowLeft, FiEdit2, FiTrash2, FiFileText } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getQrCodeById } from "../redux/actions/qrActions";

function QrCodeDetailsPage() {
  const qrId = useParams().qrId;
  const dispatch = useDispatch();
  const selectedQrCode = useSelector((state) => state.qrCodes.selectedQrCode);
  const { loading, error } = useSelector((state) => state.qrCodes);

  useEffect(() => {
    dispatch(getQrCodeById(qrId));
  }, [dispatch, qrId]);

  //   funzione per scaricare il qr code come immagine
  const handleDownloadQr = async () => {
    const response = await fetch(selectedQrCode.qrImageUrl);
    const blob = await response.blob(); //Un Blob (Binary Large Object) rappresenta dati binari, come immagini, PDF, video ecc.

    const url = URL.createObjectURL(blob); // Url temporanea che punta a quel blob

    const link = document.createElement("a"); // crea un <a> fittizio,
    link.href = url; //aggiunge al link l'href con l'url creato, concettualmente una cosa tipo : <a href="blob:http://url-temporanea/..."></a>
    link.download = `${selectedQrCode.title}.png`; // imposta il nome del file da scaricare (prendendo il titolo del qr code e aggiungendo l'estensione .png)

    document.body.appendChild(link); //aggiunge il link al body del documento, non si vedrà perché non contiene testo e viene eliminato immediatamente.
    link.click(); //simula un click sul link, innescando il download del file
    link.remove(); // rimuove il link dal DOM, non serve più

    URL.revokeObjectURL(url); // rimuove l'oggetto URL temporaneo creato che punta al blob, per liberare memoria
  };

  return (
    <main className="relative min-h-screen">
      <Navbar />

      <section className="px-5 pb-20 pt-24 text-[var(--color-text)] md:px-8 lg:pt-36">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-text)]"
          >
            <FiArrowLeft />
            Torna alla dashboard
          </Link>

          <div className="mt-8">
            {" "}
            {loading && (
              <p className="mt-6 text-sm text-[var(--color-text-secondary)]">
                Caricamento QR code...
              </p>
            )}
            {error && (
              <p className="mt-6 text-sm text-[var(--color-primary)]">
                {error}
              </p>
            )}
            {selectedQrCode && (
              <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)]/70 p-6 backdrop-blur-md md:p-8">
                <div className="grid gap-8 lg:grid-cols-[280px_1px_1fr] lg:items-start">
                  <div className="flex flex-col items-center">
                    <img
                      src={selectedQrCode.qrImageUrl}
                      alt={selectedQrCode.title}
                      className="w-full max-w-64"
                    />

                    <button
                      onClick={handleDownloadQr}
                      className="mt-4 w-full max-w-64 rounded-sm border border-[var(--color-border)] px-4 py-2 text-sm transition hover:border-[var(--color-primary)] hover:text-[var(--color-text)]"
                    >
                      Scarica QR
                    </button>
                  </div>
                  {/* DIVIDER */}
                  {/* DIVIDER */}
                  <div className="flex items-center gap-3 lg:h-full lg:flex-col">
                    <span className="h-px flex-1 bg-[var(--color-border)] lg:h-auto lg:w-px" />

                    <span className="h-1.5 w-1.5 shrink-0 rotate-45 border border-[var(--color-text-secondary)]/30" />

                    <span className="h-px flex-1 bg-[var(--color-border)] lg:h-auto lg:w-px" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-primary)]">
                      Dettaglio sigillo
                    </p>

                    <h1 className="mt-3 font-[var(--font-title)] text-4xl font-bold">
                      {selectedQrCode.title}
                    </h1>

                    <div className="mt-8 space-y-6">
                      <DetailRow
                        label="Tipo"
                        value={selectedQrCode.contentType}
                      />
                      {selectedQrCode.contentType === "URL" && (
                        <DetailRow
                          label="Destinazione"
                          value={selectedQrCode.content}
                          href={selectedQrCode.content}
                        />
                      )}

                      {selectedQrCode.contentType === "IMAGE" && (
                        <div className="border-b border-[var(--color-border)] pb-4">
                          <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                            Immagine collegata
                          </p>

                          <img
                            src={selectedQrCode.content}
                            alt={selectedQrCode.title}
                            className="mt-3 max-h-72 rounded-sm object-contain"
                          />
                        </div>
                      )}

                      {selectedQrCode.contentType === "PDF" && (
                        <div className="border-b border-[var(--color-border)] pb-4">
                          <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                            Documento collegato
                          </p>

                          <a
                            href={selectedQrCode.content}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                          >
                            <FiFileText />
                            Apri PDF
                          </a>
                        </div>
                      )}

                      <DetailRow
                        label="Categoria"
                        value={selectedQrCode.categoryName}
                      />

                      <DetailRow
                        label="Creato il"
                        value={new Date(
                          selectedQrCode.createdAt,
                        ).toLocaleDateString("it-IT")}
                      />
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                      <button className="inline-flex items-center gap-2 rounded-sm bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold uppercase tracking-wider transition hover:bg-[var(--color-primary-hover)]">
                        <FiEdit2 />
                        Modifica
                      </button>

                      <button className="inline-flex items-center gap-2 rounded-sm border border-[var(--color-border)] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-text)]">
                        <FiTrash2 />
                        Elimina
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function DetailRow({ label, value, href }) {
  return (
    <div className="border-b border-[var(--color-border)] pb-4">
      <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
        {label}
      </p>

      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block break-all text-sm text-[var(--color-primary)] transition hover:text-[var(--color-primary-hover)] hover:underline"
        >
          {value}
        </a>
      ) : (
        <p className="mt-2 break-all text-sm">{value}</p>
      )}
    </div>
  );
}

export default QrCodeDetailsPage;
