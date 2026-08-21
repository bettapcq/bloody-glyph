import CTASection from "../components/CTASection.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero";
import HowItWorksSection from "../components/HowItWorksSection.jsx";
import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <>
      <main className="relative min-h-screen">
        <Navbar />
        <Hero />
        <HowItWorksSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}

export default HomePage;
