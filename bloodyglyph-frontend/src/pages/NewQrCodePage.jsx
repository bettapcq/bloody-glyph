import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import QrCodeForm from "../components/QrCodeForm";

function NewQrCodePage() {
  return (
    <>
      <main className="relative min-h-screen">
        <Navbar />
        <QrCodeForm />
        <Footer />
      </main>
    </>
  );
}

export default NewQrCodePage;
