import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

const values = [
  {
    number: "01",
    title: "Tradizione",
    text: "La cucina italiana è il nostro punto di partenza. Tecniche, sapori e gesti che appartengono alla nostra cultura.",
  },
  {
    number: "02",
    title: "Materia",
    text: "Scegliamo ingredienti stagionali e li trattiamo con rispetto, lasciando che siano loro a guidare il piatto.",
  },
  {
    number: "03",
    title: "Tecnica",
    text: "Precisione, ricerca e controllo. La tecnica non deve nascondere il prodotto, ma valorizzarlo.",
  },
  {
    number: "04",
    title: "Equilibrio",
    text: "Ogni elemento ha un motivo. Costruiamo piatti essenziali, leggibili e pensati per essere ricordati.",
  },
];

export default function RistorantePage() {
  return (
    <main className="bg-[#f3f0e8] text-[#1b1b17]">
      <Navbar />

      {/* HERO */}

      <section className="relative flex min-h-[78vh] items-center overflow-hidden bg-[#20251f] text-[#f3f0e8]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-[#20251f]/65" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#20251f]/20 via-transparent to-[#20251f]/85" />

        <div className="container-rovano relative z-10 px-5 pt-24 md:px-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c1a879] md:text-xs">
            Il ristorante
          </p>

          <h1 className="font-display mt-6 max-w-5xl text-6xl leading-[0.92] md:text-8xl lg:text-9xl">
            Una cucina
            <br />
            che racconta.
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-8 text-[#d8d4ca] md:text-lg">
            Rovano nasce dall&apos;incontro tra la tradizione italiana e una
            visione contemporanea della cucina.
          </p>
        </div>
      </section>

      {/* INTRODUZIONE */}

      <section className="px-5 py-28 md:px-10 md:py-40">
        <div className="container-rovano">
          <div className="grid gap-14 md:grid-cols-[0.7fr_1.3fr] md:gap-24">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a58a62]">
                La nostra storia
              </p>

              <div className="mt-6 h-px w-16 bg-[#a58a62]" />
            </div>

            <div>
              <h2 className="font-display max-w-4xl text-4xl leading-tight md:text-6xl">
                Il rispetto per la materia prima è il cuore di tutto.
              </h2>

              <div className="mt-10 max-w-3xl space-y-6 text-base leading-8 text-[#77766f] md:text-lg">
                <p>
                  Rovano nasce con un&apos;idea semplice: creare un luogo in cui
                  la cucina italiana possa evolvere senza perdere la propria
                  identità.
                </p>

                <p>
                  Partiamo da ingredienti selezionati, seguendo il ritmo delle
                  stagioni e la disponibilità del territorio. Li lavoriamo con
                  tecniche contemporanee, cercando sempre di mantenere
                  riconoscibile il loro carattere.
                </p>

                <p>
                  Il risultato è una cucina essenziale, precisa e personale.
                  Piatti costruiti per raccontare qualcosa, ma soprattutto per
                  essere condivisi intorno a un tavolo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GRANDE IMMAGINE */}

      <section className="px-5 pb-28 md:px-10 md:pb-40">
        <div className="container-rovano">
          <div
            className="group relative min-h-[500px] overflow-hidden bg-[#ded9ce] bg-cover bg-center md:min-h-[750px]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2000&q=85')",
            }}
          >
            <div className="absolute inset-0 bg-[#20251f]/15 transition-all duration-700 group-hover:bg-transparent" />

            <div className="absolute bottom-7 left-7">
              <span className="bg-[#f3f0e8]/90 px-5 py-3 text-[9px] font-bold uppercase tracking-[0.22em] text-[#1b1b17] backdrop-blur">
                La sala Rovano
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FILOSOFIA */}

      <section className="bg-[#20251f] px-5 py-28 text-[#f3f0e8] md:px-10 md:py-40">
        <div className="container-rovano">
          <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a58a62]">
                La filosofia
              </p>

              <h2 className="font-display mt-6 text-5xl leading-tight md:text-7xl">
                Pochi ingredienti.
                <br />
                Scelti bene.
              </h2>
            </div>

            <div className="grid border-t border-white/10 md:grid-cols-2">
              {values.map((value) => (
                <article
                  key={value.number}
                  className="border-b border-white/10 py-9 md:px-7 md:py-10"
                >
                  <span className="text-xs font-bold tracking-[0.2em] text-[#a58a62]">
                    {value.number}
                  </span>

                  <h3 className="font-display mt-5 text-3xl md:text-4xl">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#96958d]">
                    {value.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LA CUCINA */}

      <section className="px-5 py-28 md:px-10 md:py-40">
        <div className="container-rovano">
          <div className="grid gap-6 md:grid-cols-12">
            <div
              className="group relative min-h-[500px] overflow-hidden bg-[#ded9ce] bg-cover bg-center md:col-span-7 md:min-h-[700px]"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=85')",
              }}
            >
              <div className="absolute inset-0 bg-[#20251f]/15 transition-all duration-700 group-hover:bg-transparent" />

              <div className="absolute bottom-7 left-7">
                <span className="bg-[#f3f0e8]/90 px-5 py-3 text-[9px] font-bold uppercase tracking-[0.22em] backdrop-blur">
                  La cucina
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between bg-[#e6e1d7] p-8 md:col-span-5 md:p-12">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a58a62]">
                  In cucina
                </p>

                <h2 className="font-display mt-5 text-4xl leading-tight md:text-5xl">
                  Dove tutto prende forma.
                </h2>
              </div>

              <div className="mt-12">
                <p className="text-sm leading-7 text-[#77766f]">
                  Ogni piatto nasce da un percorso fatto di ricerca,
                  preparazione e attenzione ai dettagli.
                </p>

                <p className="mt-5 text-sm leading-7 text-[#77766f]">
                  Dalla selezione degli ingredienti all&apos;impiattamento,
                  lavoriamo per mantenere un equilibrio tra tecnica e
                  semplicità.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INGREDIENTI */}

      <section className="bg-[#e6e1d7] px-5 py-28 md:px-10 md:py-36">
        <div className="container-rovano">
          <div className="grid gap-14 md:grid-cols-2 md:items-center md:gap-24">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a58a62]">
                Gli ingredienti
              </p>

              <h2 className="font-display mt-5 text-5xl leading-tight md:text-7xl">
                Seguiamo
                <br />
                le stagioni.
              </h2>

              <p className="mt-8 max-w-lg text-base leading-8 text-[#77766f]">
                Il nostro menu cambia seguendo ciò che la stagione offre.
                Questo significa piatti che evolvono, ingredienti che entrano
                ed escono dalla cucina e una proposta sempre in movimento.
              </p>

              <Link
                href="/menu"
                className="mt-9 inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1b1b17] transition-colors hover:text-[#a58a62]"
              >
                Scopri il menu

                <span className="h-px w-10 bg-[#a58a62]" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="min-h-[280px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85')",
                }}
              />

              <div
                className="mt-12 min-h-[280px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=900&q=85')",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="bg-[#a58a62] px-5 py-28 text-center text-[#20251f] md:px-10 md:py-36">
        <div className="container-rovano">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]">
            Rovano
          </p>

          <h2 className="font-display mx-auto mt-5 max-w-4xl text-5xl leading-tight md:text-7xl">
            Vieni a conoscere
            <br />
            la nostra cucina.
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#20251f]/75">
            Un tavolo, una cucina, il tempo per stare bene.
          </p>

          <Link
            href="/prenota"
            className="mt-9 inline-flex min-h-[54px] items-center justify-center border border-[#20251f] bg-[#20251f] px-8 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f3f0e8] transition-all duration-300 hover:bg-transparent hover:text-[#20251f]"
          >
            Prenota un tavolo
          </Link>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="bg-[#20251f] px-5 py-12 text-[#f3f0e8]">
        <div className="container-rovano flex flex-col gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <span className="font-display text-2xl uppercase tracking-[0.15em]">
              Rovano
            </span>

            <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-white/30">
              Cucina italiana contemporanea
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 md:justify-end">
            <Link
              href="/"
              className="transition-colors hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/menu"
              className="transition-colors hover:text-white"
            >
              Menu
            </Link>

            <Link
              href="/prenota"
              className="transition-colors hover:text-white"
            >
              Prenota
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}