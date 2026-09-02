import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import QrCodeCreateForm from "../components/QrCodeCreateForm";
import QrCodeEditForm from "../components/QrCodeEditForm";

function QrCodeFormPage({ mode }) {
  return (
    <main className="relative min-h-screen">
      <Navbar />

      {mode === "edit" ? <QrCodeEditForm /> : <QrCodeCreateForm />}

      <Footer />
    </main>
  );
}

export default QrCodeFormPage;
