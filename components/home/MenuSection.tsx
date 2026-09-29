"use client";

import Link from "next/link";
import { useState } from "react";

const categories = [
  "Antipasti",
  "Primi",
  "Secondi",
  "Contorni",
  "Dessert",
  "Bevande",
];

const dishes = [
  {
    category: "Antipasti",
    name: "Carciofo alla brace",
    description:
      "Carciofo, fonduta di pecorino, erbe amare e olio al prezzemolo.",
    price: "14",
  },
  {
    category: "Antipasti",
    name: "Battuta di manzo",
    description:
      "Manzo piemontese, tuorlo affumicato, nocciola e tartufo nero.",
    price: "18",
  },
  {
    category: "Primi",
    name: "Tagliolini al tartufo",
    description:
      "Tagliolini freschi, burro di malga e tartufo nero.",
    price: "22",
  },
  {
    category: "Primi",
    name: "Risotto al parmigiano",
    description:
      "Riso Carnaroli, Parmigiano Reggiano 36 mesi e pepe tostato.",
    price: "19",
  },
  {
    category: "Secondi",
    name: "Ricciola",
    description:
      "Ricciola, finocchio, agrumi e olio al basilico.",
    price: "24",
  },
  {
    category: "Secondi",
    name: "Guancia di manzo",
    description:
      "Cotta lentamente, patata affumicata e fondo al vino rosso.",
    price: "26",
  },
  {
    category: "Contorni",
    name: "Verdure di stagione",
    description:
      "Selezione di verdure stagionali, erbe fresche e olio extravergine.",
    price: "8",
  },
  {
    category: "Contorni",
    name: "Patata affumicata",
    description:
      "Patata al forno, rosmarino e burro affumicato.",
    price: "7",
  },
  {
    category: "Dessert",
    name: "Tiramisù Rovano",
    description:
      "La nostra interpretazione del classico italiano.",
    price: "8",
  },
  {
    category: "Dessert",
    name: "Cioccolato e nocciola",
    description:
      "Cioccolato fondente, nocciola piemontese e sale marino.",
    price: "9",
  },
  {
    category: "Bevande",
    name: "Selezione di vini",
    description:
      "Una selezione italiana pensata per accompagnare la cucina Rovano.",
    price: "6",
  },
  {
    category: "Bevande",
    name: "Acqua naturale o frizzante",
    description:
      "Acqua minerale italiana.",
    price: "3",
  },
];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("Antipasti");

  const filteredDishes = dishes.filter(
    (dish) => dish.category === activeCategory
  );

  return (
    <section
      id="menu"
      className="bg-[#20251f] px-5 py-28 text-[#f3f0e8] md:py-36"
    >
      <div className="container-rovano">

        {/* HEADER */}

        <div className="max-w-2xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a58a62] md:text-xs">
            La nostra cucina
          </p>

          <h2 className="font-display mt-5 text-5xl md:text-7xl">
            Il Menu
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-[#aaa99f] md:text-base">
            Una cucina italiana contemporanea costruita intorno alla
            materia prima, alla stagionalità e all&apos;equilibrio.
          </p>
        </div>

        {/* CATEGORIES */}

        <div className="mt-16 overflow-x-auto border-b border-white/10">
          <div className="flex min-w-max gap-8">
            {categories.map((category) => {
              const active = category === activeCategory;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`relative pb-5 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 md:text-xs ${
                    active
                      ? "text-[#a58a62]"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {category}

                  <span
                    className={`absolute bottom-0 left-0 h-px bg-[#a58a62] transition-all duration-300 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* DISHES */}

        <div className="mt-4">
          {filteredDishes.map((dish, index) => (
            <article
              key={dish.name}
              className="group border-b border-white/10 py-8 md:py-10"
              style={{
                animation: "fadeUp 500ms ease-out both",
                animationDelay: `${index * 70}ms`,
              }}
            >
              <div className="flex items-start justify-between gap-8">

                <div className="max-w-2xl">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[9px] font-bold tracking-[0.2em] text-[#a58a62]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="font-display text-2xl transition-colors duration-300 group-hover:text-[#c1a879] md:text-3xl">
                      {dish.name}
                    </h3>
                  </div>

                  <p className="mt-3 pl-8 text-sm leading-7 text-[#8f8e86]">
                    {dish.description}
                  </p>
                </div>

                <span className="shrink-0 pt-1 text-sm text-[#c1a879]">
                  €{dish.price}
                </span>

              </div>
            </article>
          ))}
        </div>

        {/* FOOTER */}

        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">

          <p className="text-[10px] uppercase tracking-[0.15em] text-white/35">
            Il menu può variare in base alla stagionalità degli ingredienti.
          </p>

          <Link
            href="/menu"
            className="inline-flex min-h-[50px] items-center justify-center border border-white/25 px-6 text-[10px] font-bold uppercase tracking-[0.16em] transition-all duration-300 hover:border-[#f3f0e8] hover:bg-[#f3f0e8] hover:text-[#20251f]"
          >
            Visualizza il menu completo
          </Link>

        </div>

      </div>
    </section>
  );
}