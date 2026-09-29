"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Il ristorante", href: "/ristorante" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contatti", href: "/contatti" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-black/10 bg-[#f3f0e8]/95 text-[#1b1b17] shadow-sm backdrop-blur-xl"
            : "bg-transparent text-[#f3f0e8]"
        }`}
      >
        <div className="container-rovano flex h-24 items-center justify-between">
          {/* LOGO */}
          <a
            href="/"
            onClick={() => setMenuOpen(false)}
            className="group relative z-10"
          >
            <span className="font-display text-2xl uppercase tracking-[0.2em]">
              Rovano
            </span>

            <span
              className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                scrolled ? "bg-[#a58a62]" : "bg-[#f3f0e8]"
              }`}
            />
          </a>

          {/* DESKTOP MENU */}
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`group relative py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
                  scrolled
                    ? "text-[#1b1b17]/70 hover:text-[#a58a62]"
                    : "text-[#f3f0e8]/80 hover:text-[#f3f0e8]"
                }`}
              >
                {link.label}

                <span
                  className={`absolute bottom-0 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                    scrolled ? "bg-[#a58a62]" : "bg-[#f3f0e8]"
                  }`}
                />
              </a>
            ))}

            {/* PRENOTA */}
            <a
              href="/prenota"
              className={`ml-3 inline-flex min-h-[46px] items-center justify-center border px-6 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                scrolled
                  ? "border-[#1b1b17] bg-[#1b1b17] text-[#f3f0e8] hover:bg-transparent hover:text-[#1b1b17]"
                  : "border-[#f3f0e8] bg-[#f3f0e8] text-[#20251f] hover:bg-transparent hover:text-[#f3f0e8]"
              }`}
            >
              Prenota
            </a>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className={`relative z-50 flex h-11 w-11 items-center justify-center border lg:hidden ${
              scrolled ? "border-black/20" : "border-white/30"
            }`}
          >
            <span className="relative flex h-4 w-5 flex-col justify-between">
              <span
                className={`h-px w-full transition-all duration-300 ${
                  scrolled ? "bg-[#1b1b17]" : "bg-[#f3f0e8]"
                } ${menuOpen ? "translate-y-[7.5px] rotate-45" : ""}`}
              />

              <span
                className={`h-px w-full transition-all duration-300 ${
                  scrolled ? "bg-[#1b1b17]" : "bg-[#f3f0e8]"
                } ${menuOpen ? "opacity-0" : ""}`}
              />

              <span
                className={`h-px w-full transition-all duration-300 ${
                  scrolled ? "bg-[#1b1b17]" : "bg-[#f3f0e8]"
                } ${menuOpen ? "-translate-y-[7.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 bg-[#20251f] transition-all duration-500 lg:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="container-rovano flex h-full flex-col justify-center px-5">
          <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-[#a58a62]">
            Navigazione
          </p>

          <nav className="flex flex-col">
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-white/10 py-5 transition-all duration-500 ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 70}ms`,
                }}
              >
                <span className="font-display text-4xl text-[#f3f0e8] transition-colors hover:text-[#a58a62]">
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          {/* MOBILE PRENOTA */}
          <a
            href="/prenota"
            onClick={() => setMenuOpen(false)}
            className={`mt-10 inline-flex min-h-[54px] items-center justify-center border border-[#f3f0e8] bg-[#f3f0e8] px-7 text-[10px] font-bold uppercase tracking-[0.18em] text-[#20251f] transition-all duration-500 hover:bg-transparent hover:text-[#f3f0e8] ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
            style={{
              transitionDelay: `${links.length * 70}ms`,
            }}
          >
            Prenota un tavolo
          </a>

          <div className="mt-16 flex items-end justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a58a62]">
                Rovano
              </p>

              <p className="mt-2 text-sm text-white/50">
                Cucina italiana contemporanea
              </p>
            </div>

            <div className="text-right">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a58a62]">
                Senigallia
              </p>

              <p className="mt-2 text-sm text-white/50">
                Italia
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}