import Navbar from "@/components/layout/Navbar";
import MenuSection from "@/components/home/MenuSection";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#20251f] text-[#f3f0e8]"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        {/* Dark overlays */}
        <div className="absolute inset-0 bg-[#20251f]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#20251f]/30 via-transparent to-[#20251f]/80" />

        {/* Hero content */}
        <div className="container-rovano relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-20 text-center">
          <p className="animate-fade-up text-[10px] font-bold uppercase tracking-[0.45em] text-[#c1a879] md:text-xs">
            Italian Contemporary Restaurant
          </p>

          <h1 className="font-display animate-fade-up mt-6 text-7xl uppercase leading-none tracking-[0.08em] md:text-[10rem]">
            Rovano
          </h1>

          <div className="animate-fade-up mt-8 flex items-center gap-4">
            <span className="h-px w-10 bg-[#a58a62]" />
            <span className="h-1 w-1 rounded-full bg-[#a58a62]" />
            <span className="h-px w-10 bg-[#a58a62]" />
          </div>

          <p className="animate-fade-up mx-auto mt-8 max-w-xl text-sm leading-8 text-[#e2ded5] md:text-lg">
            La cucina italiana, secondo noi.
            <br />
            Ingredienti selezionati, cucina contemporanea e un luogo pensato
            per stare bene.
          </p>

          <div className="animate-fade-up mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="#menu"
              className="btn-primary min-w-[190px]"
            >
              Scopri il menu
            </a>

            <a
              href="#prenota"
              className="inline-flex min-h-[52px] min-w-[190px] items-center justify-center border border-[#f3f0e8]/50 px-7 text-xs font-bold uppercase tracking-[0.14em] text-[#f3f0e8] transition-all duration-300 hover:border-[#f3f0e8] hover:bg-[#f3f0e8] hover:text-[#20251f]"
            >
              Prenota un tavolo
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#ristorante"
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/50">
            Scroll
          </span>

          <span className="relative h-12 w-px overflow-hidden bg-white/20">
            <span className="absolute left-0 top-0 h-5 w-px animate-pulse bg-[#c1a879]" />
          </span>
        </a>
      </section>

      {/* =====================================================
          IL RISTORANTE
      ====================================================== */}

      <section
        id="ristorante"
        className="bg-[#f3f0e8] px-5 py-28 text-[#1b1b17] md:py-40"
      >
        <div className="container-rovano">

          {/* Intro */}
          <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-20">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a58a62] md:text-xs">
                Il ristorante
              </p>

              <h2 className="font-display mt-5 max-w-4xl text-5xl leading-[1.05] md:text-7xl lg:text-8xl">
                Una cucina che racconta qualcosa.
              </h2>
            </div>

            <div>
              <p className="text-base leading-8 text-[#77766f] md:text-lg">
                Rovano nasce dall&apos;incontro tra tradizione italiana e
                ricerca contemporanea. Selezioniamo ingredienti di stagione e
                li trasformiamo in piatti essenziali, pensati per valorizzare
                il gusto e la materia prima.
              </p>

              <a
                href="#menu"
                className="mt-8 inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1b1b17] transition-colors hover:text-[#a58a62]"
              >
                Scopri la nostra cucina

                <span className="h-px w-8 bg-[#a58a62]" />
              </a>
            </div>
          </div>

          {/* Philosophy image */}
          <div className="mt-20 grid gap-5 md:grid-cols-[1.4fr_0.6fr]">
            <div
              className="group relative min-h-[420px] overflow-hidden bg-[#ded9ce] bg-cover bg-center md:min-h-[560px]"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=85')",
              }}
            >
              <div className="absolute inset-0 bg-[#20251f]/10 transition-colors duration-500 group-hover:bg-[#20251f]/0" />

              <div className="absolute bottom-6 left-6">
                <span className="bg-[#f3f0e8]/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#1b1b17] backdrop-blur">
                  La sala
                </span>
              </div>
            </div>

            <div
              className="group relative min-h-[300px] overflow-hidden bg-[#ded9ce] bg-cover bg-center md:min-h-[560px]"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=85')",
              }}
            >
              <div className="absolute inset-0 bg-[#20251f]/15 transition-colors duration-500 group-hover:bg-transparent" />

              <div className="absolute bottom-6 left-6">
                <span className="bg-[#f3f0e8]/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#1b1b17] backdrop-blur">
                  La cucina
                </span>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mt-24 grid border-t border-[#1b1b17]/10 md:grid-cols-4">
            <div className="border-b border-[#1b1b17]/10 py-8 md:border-b-0 md:border-r md:pr-8">
              <span className="text-xs font-bold tracking-[0.2em] text-[#a58a62]">
                01
              </span>

              <h3 className="font-display mt-5 text-3xl">
                Tradizione
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#77766f]">
                La cucina italiana come punto di partenza, senza smettere di
                evolvere.
              </p>
            </div>

            <div className="border-b border-[#1b1b17]/10 py-8 md:border-b-0 md:border-r md:px-8">
              <span className="text-xs font-bold tracking-[0.2em] text-[#a58a62]">
                02
              </span>

              <h3 className="font-display mt-5 text-3xl">
                Materia
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#77766f]">
                Ingredienti selezionati con attenzione, seguendo stagioni e
                territorio.
              </p>
            </div>

            <div className="border-b border-[#1b1b17]/10 py-8 md:border-b-0 md:border-r md:px-8">
              <span className="text-xs font-bold tracking-[0.2em] text-[#a58a62]">
                03
              </span>

              <h3 className="font-display mt-5 text-3xl">
                Tecnica
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#77766f]">
                Tecnica e precisione sempre al servizio del gusto.
              </p>
            </div>

            <div className="py-8 md:pl-8">
              <span className="text-xs font-bold tracking-[0.2em] text-[#a58a62]">
                04
              </span>

              <h3 className="font-display mt-5 text-3xl">
                Equilibrio
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#77766f]">
                Ogni elemento del piatto ha un motivo e trova il proprio
                equilibrio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MENU
      ====================================================== */}

      <MenuSection />

      {/* =====================================================
          GALLERY
      ====================================================== */}

      <section
        id="gallery"
        className="bg-[#f3f0e8] px-5 py-28 text-[#1b1b17] md:py-40"
      >
        <div className="container-rovano">

          {/* Header */}
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a58a62] md:text-xs">
                Gallery
              </p>

              <h2 className="font-display mt-5 text-5xl md:text-7xl">
                Dentro Rovano.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#77766f]">
              La sala, la cucina, gli ingredienti e i piatti che raccontano la
              nostra identità.
            </p>
          </div>

          {/* Gallery */}
          <div className="mt-16 grid gap-5 md:grid-cols-12">

            {/* Large image */}
            <div
              className="group relative min-h-[500px] overflow-hidden bg-[#ded9ce] bg-cover bg-center md:col-span-7 md:min-h-[700px]"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=85')",
              }}
            >
              <div className="absolute inset-0 bg-black/10 transition-all duration-700 group-hover:bg-black/0" />

              <div className="absolute bottom-6 left-6">
                <span className="bg-[#f3f0e8]/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] backdrop-blur">
                  Atmosfera
                </span>
              </div>
            </div>

            {/* Right column */}
            <div className="grid gap-5 md:col-span-5">

              <div
                className="group relative min-h-[330px] overflow-hidden bg-[#ded9ce] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85')",
                }}
              >
                <div className="absolute inset-0 bg-black/10 transition-all duration-700 group-hover:bg-black/0" />

                <div className="absolute bottom-6 left-6">
                  <span className="bg-[#f3f0e8]/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] backdrop-blur">
                    Ingredienti
                  </span>
                </div>
              </div>

              <div
                className="group relative min-h-[330px] overflow-hidden bg-[#ded9ce] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=85')",
                }}
              >
                <div className="absolute inset-0 bg-black/10 transition-all duration-700 group-hover:bg-black/0" />

                <div className="absolute bottom-6 left-6">
                  <span className="bg-[#f3f0e8]/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] backdrop-blur">
                    Dettagli
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Gallery link */}
          <div className="mt-10 text-center">
            <a
              href="#gallery"
              className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1b1b17] transition-colors hover:text-[#a58a62]"
            >
              Esplora la gallery
              <span className="h-px w-10 bg-[#a58a62]" />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTATTI
      ====================================================== */}

      <section
        id="contatti"
        className="bg-[#2a3028] px-5 py-28 text-[#f3f0e8] md:py-40"
      >
        <div className="container-rovano">

          <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-24">

            {/* Left */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a58a62] md:text-xs">
                Contatti
              </p>

              <h2 className="font-display mt-5 max-w-xl text-5xl leading-tight md:text-7xl">
                Vieni a trovarci.
              </h2>

              <p className="mt-8 max-w-md text-base leading-8 text-[#aaa99f]">
                Un luogo dove fermarsi, mangiare bene e condividere il tempo.
              </p>

              <a
                href="#prenota"
                className="mt-10 inline-flex min-h-[52px] items-center justify-center border border-[#f3f0e8]/30 px-7 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:border-[#f3f0e8] hover:bg-[#f3f0e8] hover:text-[#20251f]"
              >
                Prenota un tavolo
              </a>
            </div>

            {/* Right */}
            <div className="grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2">

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a58a62]">
                  Indirizzo
                </p>

                <p className="mt-4 text-sm leading-7 text-[#d8d4ca]">
                  Via Roma 27
                  <br />
                  60019 Senigallia AN
                  <br />
                  Italia
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a58a62]">
                  Orari
                </p>

                <p className="mt-4 text-sm leading-7 text-[#d8d4ca]">
                  Martedì — Giovedì
                  <br />
                  19:00 — 23:00
                  <br />
                  <br />
                  Venerdì — Sabato
                  <br />
                  19:00 — 23:30
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a58a62]">
                  Telefono
                </p>

                <a
                  href="tel:+390710000000"
                  className="mt-4 block text-sm text-[#d8d4ca] transition-colors hover:text-[#c1a879]"
                >
                  +39 071 000 0000
                </a>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a58a62]">
                  Email
                </p>

                <a
                  href="mailto:info@rovano.it"
                  className="mt-4 block text-sm text-[#d8d4ca] transition-colors hover:text-[#c1a879]"
                >
                  info@rovano.it
                </a>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a58a62]">
                  Social
                </p>

                <div className="mt-4 flex gap-5 text-sm text-[#d8d4ca]">
                  <a
                    href="#"
                    className="transition-colors hover:text-[#c1a879]"
                  >
                    Instagram
                  </a>

                  <a
                    href="#"
                    className="transition-colors hover:text-[#c1a879]"
                  >
                    Facebook
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRENOTAZIONE
      ====================================================== */}

      <section
        id="prenota"
        className="relative overflow-hidden bg-[#a58a62] px-5 py-28 text-center text-[#20251f] md:py-40"
      >
        {/* Decorative circle */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#20251f]/10" />

        <div className="container-rovano relative z-10">

          <p className="text-[10px] font-bold uppercase tracking-[0.35em]">
            Rovano
          </p>

          <div className="mx-auto mt-6 h-px w-12 bg-[#20251f]/40" />

          <h2 className="font-display mx-auto mt-7 max-w-4xl text-5xl leading-[1.05] md:text-7xl lg:text-8xl">
            Il tuo tavolo ti aspetta.
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-[#20251f]/75">
            Prenota la tua esperienza da Rovano e lasciati accompagnare dalla
            nostra cucina.
          </p>

          <button
            type="button"
            className="mt-10 inline-flex min-h-[54px] items-center justify-center border border-[#20251f] px-8 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:bg-[#20251f] hover:text-[#f3f0e8]"
          >
            Prenota un tavolo
          </button>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="bg-[#20251f] px-5 py-14 text-[#f3f0e8]">
        <div className="container-rovano">

          <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-3">

            {/* Brand */}
            <div>
              <span className="font-display text-3xl uppercase tracking-[0.15em]">
                Rovano
              </span>

              <p className="mt-4 max-w-xs text-sm leading-7 text-white/40">
                Cucina italiana contemporanea.
                <br />
                Senigallia, Italia.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#a58a62]">
                Navigazione
              </p>

              <div className="mt-5 flex flex-col gap-3 text-sm text-white/50">
                <a
                  href="#home"
                  className="transition-colors hover:text-white"
                >
                  Home
                </a>

                <a
                  href="#ristorante"
                  className="transition-colors hover:text-white"
                >
                  Il ristorante
                </a>

                <a
                  href="#menu"
                  className="transition-colors hover:text-white"
                >
                  Menu
                </a>

                <a
                  href="#gallery"
                  className="transition-colors hover:text-white"
                >
                  Gallery
                </a>

                <a
                  href="#contatti"
                  className="transition-colors hover:text-white"
                >
                  Contatti
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#a58a62]">
                Contatti
              </p>

              <div className="mt-5 flex flex-col gap-3 text-sm text-white/50">
                <a
                  href="tel:+390710000000"
                  className="transition-colors hover:text-white"
                >
                  +39 071 000 0000
                </a>

                <a
                  href="mailto:info@rovano.it"
                  className="transition-colors hover:text-white"
                >
                  info@rovano.it
                </a>

                <span>
                  Via Roma 27
                  <br />
                  60019 Senigallia AN
                </span>
              </div>
            </div>

          </div>

          {/* Bottom */}
          <div className="flex flex-col gap-4 pt-8 text-[9px] uppercase tracking-[0.15em] text-white/25 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} Rovano. Tutti i diritti riservati.
            </p>

            <div className="flex gap-6">
              <a
                href="#"
                className="transition-colors hover:text-white/60"
              >
                Privacy
              </a>

              <a
                href="#"
                className="transition-colors hover:text-white/60"
              >
                Cookie
              </a>
            </div>
          </div>

        </div>
      </footer>
    </main>
  );
}