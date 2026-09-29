"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

const images = [
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=85",
    title: "Atmosfera",
    category: "Ristorante",
    size: "large",
  },
  {
    src: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85",
    title: "Materia",
    category: "Ingredienti",
    size: "small",
  },
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=85",
    title: "Dettagli",
    category: "Cucina",
    size: "small",
  },
  {
    src: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1600&q=85",
    title: "La sala",
    category: "Ristorante",
    size: "medium",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=85",
    title: "Il piatto",
    category: "Cucina",
    size: "medium",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=85",
    title: "Il tavolo",
    category: "Atmosfera",
    size: "large",
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const showPrevious = () => {
    if (selectedImage === null) return;

    setSelectedImage(
      selectedImage === 0 ? images.length - 1 : selectedImage - 1
    );
  };

  const showNext = () => {
    if (selectedImage === null) return;

    setSelectedImage(
      selectedImage === images.length - 1 ? 0 : selectedImage + 1
    );
  };

  return (
    <main className="bg-[#f3f0e8] text-[#1b1b17]">
      <Navbar />

      {/* HERO */}

      <section className="relative flex min-h-[65vh] items-center overflow-hidden bg-[#20251f] text-[#f3f0e8]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-[#20251f]/65" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#20251f]/20 via-transparent to-[#20251f]/80" />

        <div className="container-rovano relative z-10 px-5 pt-24">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c1a879] md:text-xs">
            Gallery
          </p>

          <h1 className="font-display mt-6 max-w-5xl text-6xl leading-none md:text-8xl">
            Dentro Rovano.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-[#d8d4ca] md:text-lg">
            La sala, la cucina, gli ingredienti e i dettagli che raccontano
            la nostra identità.
          </p>
        </div>
      </section>

      {/* INTRO */}

      <section className="px-5 py-20 md:py-28">
        <div className="container-rovano">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a58a62]">
                Uno sguardo
              </p>

              <h2 className="font-display mt-5 max-w-3xl text-4xl leading-tight md:text-6xl">
                Ogni dettaglio fa parte dell&apos;esperienza.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#77766f]">
              Dalla cucina alla sala, abbiamo pensato Rovano come un luogo
              in cui ogni elemento contribuisce a creare un&apos;atmosfera.
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY */}

      <section className="px-5 pb-28 md:pb-40">
        <div className="container-rovano">
          <div className="grid gap-5 md:grid-cols-12">
            {images.map((image, index) => {
              const layout =
                image.size === "large"
                  ? "md:col-span-7 md:min-h-[650px]"
                  : image.size === "medium"
                    ? "md:col-span-6 md:min-h-[520px]"
                    : "md:col-span-5 md:min-h-[420px]";

              return (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`group relative min-h-[420px] overflow-hidden bg-[#ded9ce] text-left ${layout}`}
                  aria-label={`Apri immagine: ${image.title}`}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#20251f]/70 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                  <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c1a879]">
                        {image.category}
                      </p>

                      <h3 className="font-display mt-2 text-3xl text-[#f3f0e8]">
                        {image.title}
                      </h3>
                    </div>

                    <span className="flex h-11 w-11 items-center justify-center border border-white/30 text-lg text-white transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#20251f]">
                      +
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}

      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#10130f]/95 px-5 py-8 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center border border-white/20 text-2xl text-white transition-colors hover:border-white hover:bg-white hover:text-[#20251f]"
            aria-label="Chiudi immagine"
          >
            ×
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 text-2xl text-white transition-colors hover:border-white hover:bg-white hover:text-[#20251f] md:left-8"
            aria-label="Immagine precedente"
          >
            ←
          </button>

          <div
            className="relative max-h-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].title}
              className="max-h-[80vh] max-w-full object-contain"
            />

            <div className="mt-5 flex items-end justify-between gap-6 text-white">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c1a879]">
                  {images[selectedImage].category}
                </p>

                <h2 className="font-display mt-2 text-3xl">
                  {images[selectedImage].title}
                </h2>
              </div>

              <span className="text-xs text-white/40">
                {selectedImage + 1} / {images.length}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 text-2xl text-white transition-colors hover:border-white hover:bg-white hover:text-[#20251f] md:right-8"
            aria-label="Immagine successiva"
          >
            →
          </button>
        </div>
      )}

      {/* CTA */}

      <section className="bg-[#a58a62] px-5 py-28 text-center text-[#20251f] md:py-36">
        <div className="container-rovano">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]">
            Rovano
          </p>

          <h2 className="font-display mx-auto mt-5 max-w-4xl text-5xl leading-tight md:text-7xl">
            Vieni a vivere l&apos;esperienza.
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#20251f]/75">
            Un luogo pensato per mangiare bene, stare insieme e prendersi
            il tempo necessario.
          </p>

          <Link
            href="/#prenota"
            className="mt-9 inline-flex min-h-[54px] items-center justify-center border border-[#20251f] px-8 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:bg-[#20251f] hover:text-[#f3f0e8]"
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
          </div>
        </div>
      </footer>
    </main>
  );
}