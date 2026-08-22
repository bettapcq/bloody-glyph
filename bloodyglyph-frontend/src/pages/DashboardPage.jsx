import DashboardSection from "../components/DashboardSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function DashboardPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <DashboardSection />
      <Footer />
    </main>
  );
}

export default DashboardPage;
