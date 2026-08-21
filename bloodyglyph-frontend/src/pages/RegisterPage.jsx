import Footer from "../components/Footer";
import FormRegister from "../components/FormRegister";
import Navbar from "../components/Navbar";

function RegisterPage() {
  return (
    <>
      <main className="relative min-h-screen">
        <Navbar />
        <FormRegister />
        <Footer />
      </main>
    </>
  );
}

export default RegisterPage;
