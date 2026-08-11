function Footer() {
  return (
    <footer className="w-full grid gap-2 lg:grid-cols-[1fr_2fr_1fr] lg:gap-8 bg-[var(--color-surface)]/60 backdrop-blur-sm">
      {" "}
      <div className="flex flex max-w-7xl  items-center justify-center md:justify-start gap-1 px-4 py-4 text-[var(--color-text-secondary)]">
        <img src="/logo-circle.png" alt="Logo" className="h-16 w-auto" />
      </div>
      <div className="mx-auto flex flex-col max-w-7xl  items-center justify-center gap-1 px-4 py-4 text-[var(--color-text-secondary)]">
        <p className="text-xs">
          &copy; {new Date().getFullYear()} BloodyGlyph. All rights reserved.
        </p>
        <p className="text-xs">
          Design and development by{" "}
          <a
            href="https://elisbettapiacquadiodev.it"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
          >
            Elisabetta Piacquadio
          </a>
        </p>
      </div>
      <div className="flex flex-col max-w-7xl  items-center md:items-end justify-center gap-1 px-4 py-4 text-[var(--color-text-secondary)]">
        <p className="text-xs">
          <a
            href="/cookie-policy"
            target="_blank"
            Cookie
            Policy
            rel="noopener noreferrer"
            className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
          >
            Cookie Policy
          </a>
        </p>
        <p className="text-xs">
          <a
            href="/privacy-policy"
            target="_blank"
            Privacy
            Policy
            rel="noopener noreferrer"
            className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
