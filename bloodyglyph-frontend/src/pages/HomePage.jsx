import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <>
      <main className="relative min-h-screen">
        <Navbar />
        <Hero />
      </main>
    </>
  );
}

export default HomePage;
