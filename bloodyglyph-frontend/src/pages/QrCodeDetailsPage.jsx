import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiArrowLeft, FiEdit2, FiTrash2, FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";

function QrCodeDetailsPage() {
  const qrCode = {
    qrId: 12,
    title: "Portfolio personale",
    contentType: "URL",
    content: "https://example.com",
    qrImageUrl: "/qr-placeholder.png",
    categoryName: "Portfolio",
    createdAt: "2026-09-01T18:30:00",
  };

  //   funzione per scaricare il qr code come immagine
  const handleDownloadQr = async () => {
    const response = await fetch(qrCode.qrImageUrl);
    const blob = await response.blob(); //Un Blob (Binary Large Object) rappresenta dati binari, come immagini, PDF, video ecc.

    const url = URL.createObjectURL(blob); // Url temporanea che punta a quel blob

    const link = document.createElement("a"); // crea un <a> fittizio,
    link.href = url; //aggiunge al link l'href con l'url creato, concettualmente una cosa tipo : <a href="blob:http://url-temporanea/..."></a>
    link.download = `${qrCode.title}.png`; // imposta il nome del file da scaricare (prendendo il titolo del qr code e aggiungendo l'estensione .png)

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

          <div className="mt-8 grid gap-8 lg:grid-cols-[320px_1fr]">
            <div className="flex h-full flex-col rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)]/70 p-6 backdrop-blur-md">
              <img
                src={qrCode.qrImageUrl}
                alt={qrCode.title}
                className="w-full"
              />

              <button
                onClick={handleDownloadQr}
                className="mt-auto rounded-sm border border-[var(--color-border)] px-4 py-2 text-sm hover:border-[var(--color-primary)] hover:text-[var(--color-text)] transition"
              >
                Scarica QR
              </button>
            </div>

            <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)]/70 p-6 backdrop-blur-md md:p-8">
              <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-primary)]">
                Dettaglio sigillo
              </p>

              <h1 className="mt-3 font-[var(--font-title)] text-4xl font-bold">
                {qrCode.title}
              </h1>

              <div className="mt-8 space-y-6">
                <DetailRow label="Tipo" value={qrCode.contentType} />
                {qrCode.contentType === "URL" && (
                  <DetailRow
                    label="Destinazione"
                    value={qrCode.content}
                    href={qrCode.content}
                  />
                )}

                {qrCode.contentType === "IMAGE" && (
                  <div className="border-b border-[var(--color-border)] pb-4">
                    <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                      Immagine collegata
                    </p>

                    <img
                      src={qrCode.content}
                      alt={qrCode.title}
                      className="mt-3 max-h-72 rounded-sm object-contain"
                    />
                  </div>
                )}

                {qrCode.contentType === "PDF" && (
                  <div className="border-b border-[var(--color-border)] pb-4">
                    <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                      Documento collegato
                    </p>

                    <a
                      href={qrCode.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                    >
                      <FiFileText />
                      Apri PDF
                    </a>
                  </div>
                )}

                <DetailRow label="Categoria" value={qrCode.categoryName} />

                <DetailRow
                  label="Creato il"
                  value={new Date(qrCode.createdAt).toLocaleDateString("it-IT")}
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
