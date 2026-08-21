import Footer from "../components/Footer";
import FormLogin from "../components/FormLogin";
import Navbar from "../components/Navbar";

function LoginPage() {
  return (
    <>
      <main className="relative min-h-screen">
        <Navbar />
        <FormLogin />
        <Footer />
      </main>
    </>
  );
}

export default LoginPage;
