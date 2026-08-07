import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <>
      <main className="relative min-h-screen bg-[var(--color-bg)]">
        <Navbar />
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center">
          <h1 className="text-5xl font-bold">Bloody Glyph</h1>
        </section>
      </main>
    </>
  );
}

export default HomePage;
