"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

const times = [
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

export default function PrenotaPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      date: formData.get("date"),
      time: formData.get("time"),
      people: formData.get("people"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      notes: formData.get("notes"),
    };

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.message || "Si è verificato un errore. Riprova."
        );
        return;
      }

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error(error);

      setError(
        "Impossibile completare la prenotazione. Controlla la connessione e riprova."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#1b1b17]">
      <Navbar />

      {/* HERO */}

      <section className="bg-[#20251f] px-5 pb-24 pt-40 text-[#f3f0e8] md:px-10">
        <div className="container-rovano">
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#a58a62]">
            Rovano
          </p>

          <h1 className="font-display max-w-4xl text-5xl leading-[0.95] md:text-7xl lg:text-8xl">
            Prenota il tuo
            <br />
            tavolo.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-white/60 md:text-lg">
            Scegli la data, l&apos;orario e il numero di persone.
            Ti aspettiamo da Rovano per una serata dedicata alla cucina
            italiana contemporanea.
          </p>
        </div>
      </section>

      {/* PRENOTAZIONE */}

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="container-rovano">
          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
            {/* INTRO */}

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a58a62]">
                Prenotazione
              </p>

              <h2 className="font-display mt-5 text-4xl leading-tight md:text-5xl">
                Il tuo tavolo
                <br />
                ti aspetta.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-[#77766f]">
                Compila il modulo per richiedere la tua prenotazione.
                La richiesta verrà registrata direttamente nel sistema
                Rovano.
              </p>

              <div className="mt-10 border-t border-black/10 pt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#77766f]">
                  Orari
                </p>

                <p className="mt-3 text-sm leading-7">
                  Martedì — Giovedì
                  <br />
                  19:00 — 23:00
                </p>

                <p className="mt-3 text-sm leading-7">
                  Venerdì — Sabato
                  <br />
                  19:00 — 23:30
                </p>
              </div>
            </div>

            {/* FORM */}

            <div className="border border-black/10 bg-white/30 p-6 md:p-10">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* DATA + PERSONE */}

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="date"
                        className="mb-3 block text-[10px] font-bold uppercase tracking-[0.18em]"
                      >
                        Data
                      </label>

                      <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        className="h-14 w-full border border-black/15 bg-transparent px-4 text-sm outline-none transition-colors focus:border-[#a58a62]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="people"
                        className="mb-3 block text-[10px] font-bold uppercase tracking-[0.18em]"
                      >
                        Persone
                      </label>

                      <select
                        id="people"
                        name="people"
                        defaultValue="2"
                        required
                        className="h-14 w-full border border-black/15 bg-transparent px-4 text-sm outline-none transition-colors focus:border-[#a58a62]"
                      >
                        <option value="1">1 persona</option>
                        <option value="2">2 persone</option>
                        <option value="3">3 persone</option>
                        <option value="4">4 persone</option>
                        <option value="5">5 persone</option>
                        <option value="6">6 persone</option>
                        <option value="7">7 persone</option>
                        <option value="8">8 persone</option>
                      </select>
                    </div>
                  </div>

                  {/* ORARIO */}

                  <div>
                    <label
                      htmlFor="time"
                      className="mb-3 block text-[10px] font-bold uppercase tracking-[0.18em]"
                    >
                      Orario
                    </label>

                    <select
                      id="time"
                      name="time"
                      defaultValue=""
                      required
                      className="h-14 w-full border border-black/15 bg-transparent px-4 text-sm outline-none transition-colors focus:border-[#a58a62]"
                    >
                      <option value="" disabled>
                        Seleziona un orario
                      </option>

                      {times.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* NOME */}

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-3 block text-[10px] font-bold uppercase tracking-[0.18em]"
                    >
                      Nome e cognome
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Mario Rossi"
                      className="h-14 w-full border border-black/15 bg-transparent px-4 text-sm outline-none placeholder:text-black/30 focus:border-[#a58a62]"
                    />
                  </div>

                  {/* EMAIL + TELEFONO */}

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-3 block text-[10px] font-bold uppercase tracking-[0.18em]"
                      >
                        Email
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="mario@email.it"
                        className="h-14 w-full border border-black/15 bg-transparent px-4 text-sm outline-none placeholder:text-black/30 focus:border-[#a58a62]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-3 block text-[10px] font-bold uppercase tracking-[0.18em]"
                      >
                        Telefono
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+39 333 1234567"
                        className="h-14 w-full border border-black/15 bg-transparent px-4 text-sm outline-none placeholder:text-black/30"
                      />
                    </div>
                  </div>

                  {/* NOTE */}

                  <div>
                    <label
                      htmlFor="notes"
                      className="mb-3 block text-[10px] font-bold uppercase tracking-[0.18em]"
                    >
                      Note
                    </label>

                    <textarea
                      id="notes"
                      name="notes"
                      rows={5}
                      placeholder="Eventuali richieste o informazioni..."
                      className="w-full resize-none border border-black/15 bg-transparent p-4 text-sm outline-none placeholder:text-black/30"
                    />
                  </div>

                  {/* ERRORE */}

                  {error && (
                    <div className="border border-red-900/20 bg-red-900/5 px-4 py-4 text-sm leading-6 text-red-900">
                      {error}
                    </div>
                  )}

                  {/* BOTTONE */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex min-h-[56px] w-full items-center justify-center border border-[#20251f] bg-[#20251f] px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f3f0e8] transition-all duration-300 hover:bg-transparent hover:text-[#20251f] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? "Invio in corso..."
                      : "Conferma prenotazione"}
                  </button>

                  <p className="text-center text-[11px] leading-5 text-[#77766f]">
                    La richiesta verrà registrata nel sistema di
                    prenotazione Rovano.
                  </p>
                </form>
              ) : (
                /* CONFERMA */

                <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center border border-[#a58a62]">
                    <span className="font-display text-2xl text-[#a58a62]">
                      ✓
                    </span>
                  </div>

                  <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.25em] text-[#a58a62]">
                    Richiesta ricevuta
                  </p>

                  <h2 className="font-display mt-4 text-4xl md:text-5xl">
                    Grazie.
                  </h2>

                  <p className="mt-6 max-w-md text-sm leading-7 text-[#77766f]">
                    La tua richiesta di prenotazione è stata registrata
                    correttamente. Il ristorante potrà ora visualizzarla
                    e gestirla dal pannello amministrativo.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setError("");
                    }}
                    className="mt-10 border-b border-[#1b1b17] pb-1 text-[10px] font-bold uppercase tracking-[0.18em]"
                  >
                    Nuova prenotazione
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="bg-[#20251f] px-5 py-16 text-[#f3f0e8] md:px-10">
        <div className="container-rovano">
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div>
              <p className="font-display text-3xl uppercase tracking-[0.15em]">
                Rovano
              </p>

              <p className="mt-3 text-sm text-white/50">
                Cucina italiana contemporanea
              </p>
            </div>

            <div className="flex flex-col gap-3 text-sm text-white/60">
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
                href="/ristorante"
                className="transition-colors hover:text-white"
              >
                Il ristorante
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
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.15em] text-white/30">
            © {new Date().getFullYear()} Rovano. Tutti i diritti riservati.
          </div>
        </div>
      </footer>
    </main>
  );
}