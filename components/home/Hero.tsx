export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#20251f] text-[#f3f0e8]"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#20251f]/65" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 pt-24 text-center">
        <div className="max-w-4xl animate-fade-up">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.35em] text-[#a58a62]">
            Italian Contemporary Restaurant
          </p>

          <h1 className="font-display text-7xl uppercase tracking-[0.08em] md:text-[9rem]">
            Rovano
          </h1>

          <div className="mx-auto mt-8 h-px w-16 bg-[#a58a62]" />

          <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-[#e1ddd3] md:text-lg">
            La cucina italiana, secondo noi.
            <br />
            Ingredienti selezionati, cucina contemporanea e un luogo pensato
            per stare bene.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#menu" className="btn-primary">
              Scopri il menu
            </a>

            <a
              href="#prenota"
              className="inline-flex min-h-[52px] items-center justify-center border border-[#f3f0e8]/50 px-7 text-xs font-bold uppercase tracking-[0.14em] text-[#f3f0e8] transition hover:border-[#f3f0e8] hover:bg-[#f3f0e8] hover:text-[#20251f]"
            >
              Prenota un tavolo
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#f3f0e8]/60">
          Scroll
        </span>

        <div className="h-10 w-px bg-[#f3f0e8]/40" />
      </div>
    </section>
  );
}