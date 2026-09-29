"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Navbar from "@/components/layout/Navbar";

const openingHours = [
  {
    day: "Lunedì",
    hours: "Chiuso",
  },
  {
    day: "Martedì — Giovedì",
    hours: "19:00 — 23:00",
  },
  {
    day: "Venerdì",
    hours: "19:00 — 23:30",
  },
  {
    day: "Sabato",
    hours: "12:00 — 14:30 / 19:00 — 23:30",
  },
  {
    day: "Domenica",
    hours: "12:00 — 14:30 / 19:00 — 22:30",
  },
];

export default function ContattiPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main className="bg-[#f3f0e8] text-[#1b1b17]">
      <Navbar />

      {/* HERO */}

      <section className="relative flex min-h-[72vh] items-center overflow-hidden bg-[#20251f] text-[#f3f0e8]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-[#20251f]/70" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#20251f]/20 via-transparent to-[#20251f]/85" />

        <div className="container-rovano relative z-10 px-5 pt-24 md:px-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c1a879] md:text-xs">
            Contatti
          </p>

          <h1 className="font-display mt-6 max-w-5xl text-6xl leading-[0.92] md:text-8xl lg:text-9xl">
            Vieni a
            <br />
            trovarci.
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-8 text-[#d8d4ca] md:text-lg">
            Un luogo dove fermarsi, mangiare bene e condividere il tempo.
          </p>
        </div>
      </section>

      {/* INFORMAZIONI */}

      <section className="px-5 py-28 md:px-10 md:py-40">
        <div className="container-rovano">
          <div className="grid gap-16 md:grid-cols-[0.75fr_1.25fr] md:gap-24">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a58a62]">
                Rovano
              </p>

              <h2 className="font-display mt-5 text-5xl leading-tight md:text-7xl">
                Siamo qui.
              </h2>

              <p className="mt-7 max-w-md text-sm leading-7 text-[#77766f]">
                Per informazioni, richieste o semplicemente per salutarci,
                puoi utilizzare uno dei nostri contatti.
              </p>

              <a
                href="https://maps.google.com/?q=Via+Roma+27,+Senigallia"
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-[#a58a62]"
              >
                Apri in Google Maps

                <span className="h-px w-10 bg-[#a58a62]" />
              </a>
            </div>

            <div className="grid gap-10 border-t border-[#1b1b17]/10 pt-10 sm:grid-cols-2">
              {/* INDIRIZZO */}

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a58a62]">
                  Indirizzo
                </p>

                <p className="mt-4 text-sm leading-7 text-[#77766f]">
                  Via Roma 27
                  <br />
                  60019 Senigallia AN
                  <br />
                  Italia
                </p>
              </div>

              {/* TELEFONO */}

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a58a62]">
                  Telefono
                </p>

                <a
                  href="tel:+390710000000"
                  className="mt-4 block text-sm text-[#77766f] transition-colors hover:text-[#a58a62]"
                >
                  +39 071 000 0000
                </a>
              </div>

              {/* EMAIL */}

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a58a62]">
                  Email
                </p>

                <a
                  href="mailto:info@rovano.it"
                  className="mt-4 block text-sm text-[#77766f] transition-colors hover:text-[#a58a62]"
                >
                  info@rovano.it
                </a>
              </div>

              {/* SOCIAL */}

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a58a62]">
                  Social
                </p>

                <div className="mt-4 flex gap-5 text-sm text-[#77766f]">
                  <a
                    href="#"
                    className="transition-colors hover:text-[#a58a62]"
                  >
                    Instagram
                  </a>

                  <a
                    href="#"
                    className="transition-colors hover:text-[#a58a62]"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORARI + MAPPA */}

      <section className="bg-[#20251f] px-5 py-28 text-[#f3f0e8] md:px-10 md:py-40">
        <div className="container-rovano">
          <div className="grid gap-14 md:grid-cols-2 md:gap-24">
            {/* ORARI */}

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a58a62]">
                Orari
              </p>

              <h2 className="font-display mt-5 text-5xl leading-tight md:text-7xl">
                Quando
                <br />
                trovarci.
              </h2>

              <div className="mt-12 max-w-xl border-t border-white/10">
                {openingHours.map((item) => (
                  <div
                    key={item.day}
                    className="grid gap-3 border-b border-white/10 py-6 sm:grid-cols-[1fr_auto] sm:items-center"
                  >
                    <span className="text-sm text-white/55">
                      {item.day}
                    </span>

                    <span className="text-sm sm:text-right">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* MAPPA */}

            <div className="relative min-h-[500px] overflow-hidden bg-[#2a3028]">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50 grayscale"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=85')",
                }}
              />

              <div className="absolute inset-0 bg-[#20251f]/55" />

              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#c1a879] bg-[#a58a62] text-[#20251f] shadow-2xl">
                    <span className="text-xl">+</span>
                  </div>

                  <div className="mt-5 bg-[#20251f]/90 px-7 py-5 backdrop-blur">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a58a62]">
                      Rovano
                    </p>

                    <p className="mt-2 text-sm text-[#f3f0e8]">
                      Via Roma 27
                    </p>

                    <p className="mt-1 text-xs text-white/50">
                      60019 Senigallia AN
                    </p>

                    <a
                      href="https://maps.google.com/?q=Via+Roma+27,+Senigallia"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block border-b border-[#a58a62] pb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#a58a62]"
                    >
                      Indicazioni
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM CONTATTI */}

      <section className="px-5 py-28 md:px-10 md:py-40">
        <div className="container-rovano">
          <div className="grid gap-16 md:grid-cols-[0.7fr_1.3fr] md:gap-24">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a58a62]">
                Scrivici
              </p>

              <h2 className="font-display mt-5 text-5xl leading-tight md:text-7xl">
                Hai bisogno
                <br />
                di informazioni?
              </h2>

              <p className="mt-7 max-w-md text-sm leading-7 text-[#77766f]">
                Compila il modulo e saremo felici di rispondere alla tua
                richiesta.
              </p>

              <div className="mt-10 border-t border-[#1b1b17]/10 pt-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a58a62]">
                  Contatto diretto
                </p>

                <a
                  href="mailto:info@rovano.it"
                  className="mt-3 block text-sm transition-colors hover:text-[#a58a62]"
                >
                  info@rovano.it
                </a>

                <a
                  href="tel:+390710000000"
                  className="mt-2 block text-sm text-[#77766f] transition-colors hover:text-[#a58a62]"
                >
                  +39 071 000 0000
                </a>
              </div>
            </div>

            <div>
              {sent ? (
                <div className="border border-[#1b1b17]/10 bg-[#e6e1d7] p-10 md:p-14">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a58a62]">
                    Messaggio inviato
                  </span>

                  <h3 className="font-display mt-5 text-4xl leading-tight md:text-5xl">
                    Grazie per averci scritto.
                  </h3>

                  <p className="mt-5 max-w-lg text-sm leading-7 text-[#77766f]">
                    Abbiamo ricevuto la tua richiesta. Ti risponderemo il
                    prima possibile.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-8 inline-flex min-h-[50px] items-center justify-center border border-[#1b1b17] px-7 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:bg-[#1b1b17] hover:text-[#f3f0e8]"
                  >
                    Invia un altro messaggio
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-[9px] font-bold uppercase tracking-[0.2em]"
                      >
                        Nome
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Il tuo nome"
                        className="mt-3 w-full border-b border-[#1b1b17]/20 bg-transparent py-4 text-sm outline-none transition-colors placeholder:text-[#77766f]/60 focus:border-[#a58a62]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="text-[9px] font-bold uppercase tracking-[0.2em]"
                      >
                        Email
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="La tua email"
                        className="mt-3 w-full border-b border-[#1b1b17]/20 bg-transparent py-4 text-sm outline-none transition-colors placeholder:text-[#77766f]/60 focus:border-[#a58a62]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="text-[9px] font-bold uppercase tracking-[0.2em]"
                    >
                      Telefono
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Il tuo numero"
                      className="mt-3 w-full border-b border-[#1b1b17]/20 bg-transparent py-4 text-sm outline-none transition-colors placeholder:text-[#77766f]/60 focus:border-[#a58a62]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="text-[9px] font-bold uppercase tracking-[0.2em]"
                    >
                      Messaggio
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Come possiamo aiutarti?"
                      className="mt-3 w-full resize-none border-b border-[#1b1b17]/20 bg-transparent py-4 text-sm outline-none transition-colors placeholder:text-[#77766f]/60 focus:border-[#a58a62]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex min-h-[54px] items-center justify-center border border-[#1b1b17] bg-[#1b1b17] px-8 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f3f0e8] transition-all duration-300 hover:-translate-y-0.5 hover:bg-transparent hover:text-[#1b1b17]"
                  >
                    Invia messaggio
                  </button>

                  <p className="text-[10px] leading-5 text-[#77766f]">
                    Demo frontend. Il modulo verrà collegato al sistema
                    reale nelle prossime fasi.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA PRENOTAZIONE */}

      <section className="bg-[#a58a62] px-5 py-28 text-center text-[#20251f] md:px-10 md:py-36">
        <div className="container-rovano">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]">
            Prenotazioni
          </p>

          <h2 className="font-display mx-auto mt-5 max-w-4xl text-5xl leading-tight md:text-7xl">
            Il tuo tavolo
            <br />
            ti aspetta.
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#20251f]/75">
            Prenota il tuo tavolo e lasciati accompagnare dalla nostra
            cucina.
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

      <footer className="bg-[#20251f] px-5 py-14 text-[#f3f0e8] md:px-10">
        <div className="container-rovano">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-display text-3xl uppercase tracking-[0.15em]">
                Rovano
              </span>

              <p className="mt-3 text-sm text-white/40">
                Cucina italiana contemporanea
              </p>
            </div>

            <div className="flex flex-wrap gap-x-7 gap-y-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
              <Link
                href="/"
                className="transition-colors hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/ristorante"
                className="transition-colors hover:text-white"
              >
                Il ristorante
              </Link>

              <Link
                href="/menu"
                className="transition-colors hover:text-white"
              >
                Menu
              </Link>

              <Link
                href="/gallery"
                className="transition-colors hover:text-white"
              >
                Gallery
              </Link>

              <Link
                href="/contatti"
                className="transition-colors hover:text-white"
              >
                Contatti
              </Link>

              <Link
                href="/prenota"
                className="transition-colors hover:text-white"
              >
                Prenota
              </Link>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[9px] uppercase tracking-[0.15em] text-white/25 sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {new Date().getFullYear()} Rovano
            </span>

            <span>
              Tutti i diritti riservati
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}