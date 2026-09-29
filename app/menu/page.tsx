import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import prisma from "@/lib/db/prisma";

function MenuCategory({
  number,
  title,
  items,
}: {
  number: string;
  title: string;
  items: {
    id: string;
    name: string;
    description: string;
    price: string;
  }[];
}) {
  return (
    <section className="border-t border-[#1b1b17]/15 py-16 md:py-20">
      <div className="grid gap-10 md:grid-cols-[0.25fr_0.75fr]">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#a58a62]">
            {number}
          </span>

          <h2 className="font-display mt-3 text-4xl md:text-5xl">
            {title}
          </h2>
        </div>

        <div>
          {items.map((item, index) => (
            <article
              key={item.id}
              className={`py-7 ${
                index !== items.length - 1
                  ? "border-b border-[#1b1b17]/10"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between gap-8">
                <div className="max-w-2xl">
                  <h3 className="font-display text-2xl md:text-3xl">
                    {item.name}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#77766f]">
                    {item.description}
                  </p>
                </div>

                <span className="shrink-0 text-sm text-[#a58a62]">
                  €{item.price}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function MenuPage() {
  const categories = await prisma.category.findMany({
    where: {
      dishes: {
        some: {
          available: true,
        },
      },
    },
    include: {
      dishes: {
        where: {
          available: true,
        },
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  return (
    <main className="bg-[#f3f0e8] text-[#1b1b17]">
      <Navbar />

      {/* HERO */}

      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#20251f] text-[#f3f0e8]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-[#20251f]/65" />

        <div className="container-rovano relative z-10 px-5 pt-24">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c1a879] md:text-xs">
            Rovano
          </p>

          <h1 className="font-display mt-6 max-w-4xl text-6xl leading-none md:text-8xl">
            Il Menu
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-[#d8d4ca] md:text-lg">
            Una cucina italiana contemporanea costruita intorno alla materia
            prima, alla stagionalità e all&apos;equilibrio.
          </p>
        </div>
      </section>

      {/* INTRODUZIONE MENU */}

      <section className="px-5 py-20 md:py-32">
        <div className="container-rovano">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a58a62]">
                La nostra proposta
              </p>

              <h2 className="font-display mt-4 text-4xl md:text-6xl">
                Stagione dopo stagione.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#77766f]">
              Il menu segue la disponibilità degli ingredienti e può cambiare
              nel corso dell&apos;anno.
            </p>
          </div>

          {/* CATEGORIE DAL DATABASE */}

          {categories.map((category, index) => (
            <MenuCategory
              key={category.id}
              number={String(index + 1).padStart(2, "0")}
              title={category.name}
              items={category.dishes.map((dish) => ({
                id: dish.id,
                name: dish.name,
                description: dish.description,
                price: dish.price.toString(),
              }))}
            />
          ))}
        </div>
      </section>

      {/* CTA PRENOTAZIONE */}

      <section className="bg-[#a58a62] px-5 py-24 text-center text-[#20251f] md:py-32">
        <div className="container-rovano">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]">
            Rovano
          </p>

          <h2 className="font-display mx-auto mt-5 max-w-3xl text-5xl leading-tight md:text-7xl">
            Il tuo tavolo
            <br />
            ti aspetta.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7">
            Scopri Rovano e vivi la nostra idea di cucina italiana
            contemporanea.
          </p>

          <Link
            href="/prenota"
            className="mt-9 inline-flex min-h-[52px] items-center justify-center border border-[#20251f] px-7 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:bg-[#20251f] hover:text-[#f3f0e8]"
          >
            Prenota un tavolo
          </Link>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="bg-[#20251f] px-5 py-12 text-[#f3f0e8]">
        <div className="container-rovano flex flex-col gap-5 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <span className="font-display text-2xl uppercase tracking-[0.15em]">
              Rovano
            </span>

            <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-white/30">
              Cucina italiana contemporanea
            </p>
          </div>

          <Link
            href="/"
            className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-white"
          >
            Torna alla Home
          </Link>
        </div>
      </footer>
    </main>
  );
}