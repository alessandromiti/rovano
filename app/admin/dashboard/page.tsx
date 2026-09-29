import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import prisma from "@/lib/db/prisma";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/admin/login");
  }

  const [
    totalReservations,
    pendingReservations,
    confirmedReservations,
    totalDishes,
    recentReservations,
  ] = await Promise.all([
    prisma.reservation.count(),

    prisma.reservation.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.reservation.count({
      where: {
        status: "CONFIRMED",
      },
    }),

    prisma.dish.count(),

    prisma.reservation.findMany({
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        customer: true,
      },
    }),
  ]);

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#1b1b17]">
      <header className="border-b border-black/10 bg-[#20251f] text-[#f3f0e8]">
        <div className="container-rovano flex min-h-20 items-center justify-between px-5 md:px-10">
          <div>
            <Link
              href="/admin/dashboard"
              className="font-display text-2xl uppercase tracking-[0.15em]"
            >
              Rovano
            </Link>

            <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-white/40">
              Area amministrativa
            </p>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden text-xs text-white/50 md:block">
              {session.user.email}
            </span>

            <Link
              href="/"
              className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
            >
              Sito
            </Link>
          </div>
        </div>
      </header>

      <section className="px-5 py-12 md:px-10 md:py-16">
        <div className="container-rovano">
          <div className="mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a58a62]">
              Dashboard
            </p>

            <h1 className="font-display mt-4 text-5xl md:text-6xl">
              Bentornato.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#77766f]">
              Qui puoi controllare rapidamente l&apos;attività del ristorante
              e gestire le principali funzioni di Rovano.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Prenotazioni"
              value={totalReservations}
            />

            <StatCard
              label="In attesa"
              value={pendingReservations}
            />

            <StatCard
              label="Confermate"
              value={confirmedReservations}
            />

            <StatCard
              label="Piatti"
              value={totalDishes}
            />
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_0.35fr]">
            <section>
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a58a62]">
                    Attività
                  </p>

                  <h2 className="font-display mt-3 text-3xl md:text-4xl">
                    Prenotazioni recenti
                  </h2>
                </div>

                <Link
                  href="/admin/prenotazioni"
                  className="hidden border-b border-[#1b1b17] pb-1 text-[10px] font-bold uppercase tracking-[0.16em] md:block"
                >
                  Vedi tutte
                </Link>
              </div>

              <div className="border-t border-black/10">
                {recentReservations.length === 0 ? (
                  <div className="py-10 text-sm text-[#77766f]">
                    Nessuna prenotazione presente.
                  </div>
                ) : (
                  recentReservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex flex-col gap-4 border-b border-black/10 py-6 md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <p className="font-display text-xl">
                          {reservation.customer.name}
                        </p>

                        <p className="mt-1 text-xs text-[#77766f]">
                          {formatDate(reservation.date)} ·{" "}
                          {reservation.time} ·{" "}
                          {reservation.people}{" "}
                          {reservation.people === 1
                            ? "persona"
                            : "persone"}
                        </p>
                      </div>

                      <StatusBadge status={reservation.status} />
                    </div>
                  ))
                )}
              </div>
            </section>

            <aside>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a58a62]">
                Gestione
              </p>

              <h2 className="font-display mt-3 text-3xl">
                Azioni rapide
              </h2>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/admin/prenotazioni"
                  className="flex min-h-14 items-center justify-between border border-[#20251f] bg-[#20251f] px-5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3f0e8] transition-colors hover:bg-transparent hover:text-[#20251f]"
                >
                  Prenotazioni
                  <span>→</span>
                </Link>

                <Link
                  href="/admin/menu"
                  className="flex min-h-14 items-center justify-between border border-black/15 px-5 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors hover:border-[#20251f]"
                >
                  Gestisci menu
                  <span>→</span>
                </Link>

                <Link
                  href="/"
                  className="flex min-h-14 items-center justify-between border border-black/15 px-5 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors hover:border-[#20251f]"
                >
                  Vai al sito
                  <span>→</span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="border border-black/10 bg-white/30 p-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#77766f]">
        {label}
      </p>

      <p className="font-display mt-4 text-5xl">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
}) {
  const labels = {
    PENDING: "In attesa",
    CONFIRMED: "Confermata",
    CANCELLED: "Annullata",
    COMPLETED: "Completata",
  };

  return (
    <span className="inline-flex w-fit border border-[#a58a62]/40 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#806c4e]">
      {labels[status]}
    </span>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}