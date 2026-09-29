"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ReservationStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

type Reservation = {
  id: string;
  date: string;
  time: string;
  people: number;
  status: ReservationStatus;
  notes: string | null;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
};

type StatusFilter = "ALL" | ReservationStatus;

type EditForm = {
  date: string;
  time: string;
  people: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const emptyEditForm: EditForm = {
  date: "",
  time: "",
  people: "2",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateForInput(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const year = parsedDate.getFullYear();
  const month = String(
    parsedDate.getMonth() + 1
  ).padStart(2, "0");
  const day = String(
    parsedDate.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function statusLabel(status: ReservationStatus) {
  switch (status) {
    case "PENDING":
      return "In attesa";
    case "CONFIRMED":
      return "Confermata";
    case "CANCELLED":
      return "Annullata";
    case "COMPLETED":
      return "Completata";
    default:
      return status;
  }
}

function statusClasses(status: ReservationStatus) {
  switch (status) {
    case "PENDING":
      return "bg-amber-100 text-amber-800";
    case "CONFIRMED":
      return "bg-emerald-100 text-emerald-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    case "COMPLETED":
      return "bg-slate-200 text-slate-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function AdminReservationsPage() {
  const [reservations, setReservations] =
    useState<Reservation[]>([]);

  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("ALL");

  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);

  const [editForm, setEditForm] =
    useState<EditForm>(emptyEditForm);

  const [savingEdit, setSavingEdit] =
    useState(false);

  const [editError, setEditError] =
    useState("");

  async function loadReservations() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/reservations",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Errore durante il caricamento delle prenotazioni."
        );
      }

      setReservations(data.reservations);
    } catch (error) {
      console.error(
        "Errore caricamento prenotazioni:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Errore durante il caricamento delle prenotazioni."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReservations();
  }, []);

  async function updateStatus(
    id: string,
    status: ReservationStatus
  ) {
    try {
      setUpdatingId(id);
      setError("");

      const response = await fetch(
        `/api/admin/reservations/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Errore durante l'aggiornamento."
        );
      }

      setReservations((current) =>
        current.map((reservation) =>
          reservation.id === id
            ? {
                ...reservation,
                status,
              }
            : reservation
        )
      );
    } catch (error) {
      console.error(
        "Errore aggiornamento prenotazione:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Errore durante l'aggiornamento della prenotazione."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  function openEditModal(
    reservation: Reservation
  ) {
    setEditingReservation(reservation);

    setEditForm({
      date: formatDateForInput(
        reservation.date
      ),
      time: reservation.time,
      people: String(reservation.people),
      name: reservation.customer.name,
      email: reservation.customer.email,
      phone: reservation.customer.phone,
      notes: reservation.notes ?? "",
    });

    setEditError("");
    setError("");
  }

  function closeEditModal() {
    if (savingEdit) {
      return;
    }

    setEditingReservation(null);
    setEditForm(emptyEditForm);
    setEditError("");
  }

  function updateEditField(
    field: keyof EditForm,
    value: string
  ) {
    setEditForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveReservation(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!editingReservation) {
      return;
    }

    try {
      setSavingEdit(true);
      setEditError("");
      setError("");

      const response = await fetch(
        `/api/admin/reservations/${editingReservation.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: editForm.date,
            time: editForm.time,
            people: Number(editForm.people),
            name: editForm.name.trim(),
            email: editForm.email
              .trim()
              .toLowerCase(),
            phone: editForm.phone.trim(),
            notes:
              editForm.notes.trim() || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Errore durante la modifica della prenotazione."
        );
      }

      const updatedReservation =
        data.reservation as Reservation;

      setReservations((current) =>
        current.map((reservation) =>
          reservation.id ===
          editingReservation.id
            ? updatedReservation
            : reservation
        )
      );

      setEditingReservation(null);
      setEditForm(emptyEditForm);
      setEditError("");
    } catch (error) {
      console.error(
        "Errore modifica prenotazione:",
        error
      );

      setEditError(
        error instanceof Error
          ? error.message
          : "Errore durante la modifica della prenotazione."
      );
    } finally {
      setSavingEdit(false);
    }
  }

  const pendingCount = reservations.filter(
    (reservation) =>
      reservation.status === "PENDING"
  ).length;

  const confirmedCount = reservations.filter(
    (reservation) =>
      reservation.status === "CONFIRMED"
  ).length;

  const cancelledCount = reservations.filter(
    (reservation) =>
      reservation.status === "CANCELLED"
  ).length;

  const completedCount = reservations.filter(
    (reservation) =>
      reservation.status === "COMPLETED"
  ).length;

  const filteredReservations =
    statusFilter === "ALL"
      ? reservations
      : reservations.filter(
          (reservation) =>
            reservation.status === statusFilter
        );

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#1b1b17]">
      <header className="border-b border-black/10 bg-[#20251f] text-[#f3f0e8]">
        <div className="container-rovano flex min-h-20 items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#a58a62]">
              Rovano
            </p>

            <h1 className="font-display text-2xl">
              Gestione prenotazioni
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="rounded-full border border-white/20 px-4 py-2 text-sm transition hover:bg-white/10"
            >
              Dashboard
            </Link>

            <Link
              href="/"
              className="rounded-full bg-[#f3f0e8] px-4 py-2 text-sm text-[#20251f] transition hover:bg-white"
            >
              Sito
            </Link>
          </div>
        </div>
      </header>

      <section className="container-rovano py-10 md:py-14">
        <div className="mb-8">
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#a58a62]">
            Admin
          </p>

          <h2 className="font-display text-4xl md:text-5xl">
            Prenotazioni
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-black/60">
            Tutte le prenotazioni ricevute dal sito Rovano.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800">
            {error}
          </div>
        )}

        <div className="mb-6 grid gap-4 md:grid-cols-5">
          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-black/45">
              Totale
            </p>

            <p className="mt-2 font-display text-3xl">
              {loading
                ? "—"
                : reservations.length}
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-black/45">
              In attesa
            </p>

            <p className="mt-2 font-display text-3xl">
              {loading ? "—" : pendingCount}
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-black/45">
              Confermate
            </p>

            <p className="mt-2 font-display text-3xl">
              {loading ? "—" : confirmedCount}
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-black/45">
              Annullate
            </p>

            <p className="mt-2 font-display text-3xl">
              {loading ? "—" : cancelledCount}
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-black/45">
              Completate
            </p>

            <p className="mt-2 font-display text-3xl">
              {loading ? "—" : completedCount}
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-black/10 bg-white p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium">
                Filtra prenotazioni
              </p>

              <p className="mt-1 text-xs text-black/50">
                Mostra solo le prenotazioni dello stato selezionato.
              </p>
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as StatusFilter
                )
              }
              className="rounded-xl border border-black/10 bg-[#f8f6f0] px-4 py-3 text-sm outline-none transition focus:border-[#a58a62]"
            >
              <option value="ALL">
                Tutte le prenotazioni
              </option>

              <option value="PENDING">
                In attesa
              </option>

              <option value="CONFIRMED">
                Confermate
              </option>

              <option value="CANCELLED">
                Annullate
              </option>

              <option value="COMPLETED">
                Completate
              </option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white">
          {loading ? (
            <div className="p-10 text-center">
              <p className="text-sm text-black/55">
                Caricamento prenotazioni...
              </p>
            </div>
          ) : filteredReservations.length ===
            0 ? (
            <div className="p-10 text-center">
              <p className="font-display text-2xl">
                Nessuna prenotazione
              </p>

              <p className="mt-2 text-sm text-black/55">
                {statusFilter === "ALL"
                  ? "Le nuove prenotazioni ricevute dal sito appariranno qui."
                  : `Non ci sono prenotazioni con stato "${statusLabel(
                      statusFilter
                    )}".`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px] border-collapse">
                <thead>
                  <tr className="border-b border-black/10 bg-[#f8f6f0] text-left">
                    <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-black/45">
                      Cliente
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-black/45">
                      Data
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-black/45">
                      Ora
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-black/45">
                      Persone
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-black/45">
                      Contatti
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-black/45">
                      Stato
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-black/45">
                      Azioni
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredReservations.map(
                    (reservation) => (
                      <tr
                        key={reservation.id}
                        className="border-b border-black/5 last:border-b-0"
                      >
                        <td className="px-6 py-5">
                          <p className="font-medium">
                            {
                              reservation.customer
                                .name
                            }
                          </p>

                          {reservation.notes && (
                            <p className="mt-1 max-w-xs text-xs text-black/45">
                              {reservation.notes}
                            </p>
                          )}
                        </td>

                        <td className="px-6 py-5 text-sm">
                          {formatDate(
                            reservation.date
                          )}
                        </td>

                        <td className="px-6 py-5 text-sm font-medium">
                          {reservation.time}
                        </td>

                        <td className="px-6 py-5 text-sm">
                          {reservation.people}
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-sm">
                            {
                              reservation.customer
                                .email
                            }
                          </p>

                          <p className="mt-1 text-xs text-black/50">
                            {
                              reservation.customer
                                .phone
                            }
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusClasses(
                              reservation.status
                            )}`}
                          >
                            {statusLabel(
                              reservation.status
                            )}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              disabled={
                                updatingId ===
                                reservation.id
                              }
                              onClick={() =>
                                openEditModal(
                                  reservation
                                )
                              }
                              className="rounded-full border border-black/15 px-4 py-2 text-xs font-medium transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Modifica
                            </button>

                            {reservation.status ===
                              "PENDING" && (
                              <>
                                <button
                                  type="button"
                                  disabled={
                                    updatingId ===
                                    reservation.id
                                  }
                                  onClick={() =>
                                    updateStatus(
                                      reservation.id,
                                      "CONFIRMED"
                                    )
                                  }
                                  className="rounded-full bg-[#20251f] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#30372e] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {updatingId ===
                                  reservation.id
                                    ? "Aggiornamento..."
                                    : "Conferma"}
                                </button>

                                <button
                                  type="button"
                                  disabled={
                                    updatingId ===
                                    reservation.id
                                  }
                                  onClick={() =>
                                    updateStatus(
                                      reservation.id,
                                      "CANCELLED"
                                    )
                                  }
                                  className="rounded-full border border-red-200 px-4 py-2 text-xs font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  Annulla
                                </button>
                              </>
                            )}

                            {reservation.status ===
                              "CONFIRMED" && (
                              <>
                                <button
                                  type="button"
                                  disabled={
                                    updatingId ===
                                    reservation.id
                                  }
                                  onClick={() =>
                                    updateStatus(
                                      reservation.id,
                                      "COMPLETED"
                                    )
                                  }
                                  className="rounded-full bg-[#20251f] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#30372e] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {updatingId ===
                                  reservation.id
                                    ? "Aggiornamento..."
                                    : "Completa"}
                                </button>

                                <button
                                  type="button"
                                  disabled={
                                    updatingId ===
                                    reservation.id
                                  }
                                  onClick={() =>
                                    updateStatus(
                                      reservation.id,
                                      "CANCELLED"
                                    )
                                  }
                                  className="rounded-full border border-red-200 px-4 py-2 text-xs font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  Annulla
                                </button>
                              </>
                            )}

                            {reservation.status ===
                              "CANCELLED" && (
                              <button
                                type="button"
                                disabled={
                                  updatingId ===
                                  reservation.id
                                }
                                onClick={() =>
                                  updateStatus(
                                    reservation.id,
                                    "PENDING"
                                  )
                                }
                                className="rounded-full border border-black/15 px-4 py-2 text-xs font-medium transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                Riattiva
                              </button>
                            )}

                            {reservation.status ===
                              "COMPLETED" && (
                              <span className="text-xs text-black/40">
                                Nessuna azione
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {editingReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[#f3f0e8] p-6 shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#a58a62]">
                  Modifica prenotazione
                </p>

                <h3 className="mt-2 font-display text-3xl">
                  {editingReservation.customer.name}
                </h3>

                <p className="mt-2 text-sm text-[#77766f]">
                  Aggiorna i dati della prenotazione.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={savingEdit}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 text-lg transition hover:bg-black/5 disabled:opacity-50"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={saveReservation}
              className="mt-8 space-y-5"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Data
                  </label>

                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(event) =>
                      updateEditField(
                        "date",
                        event.target.value
                      )
                    }
                    required
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#a58a62]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Ora
                  </label>

                  <input
                    type="time"
                    value={editForm.time}
                    onChange={(event) =>
                      updateEditField(
                        "time",
                        event.target.value
                      )
                    }
                    required
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#a58a62]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Numero di persone
                </label>

                <input
                  type="number"
                  min="1"
                  max="8"
                  value={editForm.people}
                  onChange={(event) =>
                    updateEditField(
                      "people",
                      event.target.value
                    )
                  }
                  required
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#a58a62]"
                />

                <p className="mt-2 text-xs text-[#77766f]">
                  Massimo 8 persone per prenotazione.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Nome cliente
                </label>

                <input
                  type="text"
                  value={editForm.name}
                  onChange={(event) =>
                    updateEditField(
                      "name",
                      event.target.value
                    )
                  }
                  required
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#a58a62]"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Email
                  </label>

                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(event) =>
                      updateEditField(
                        "email",
                        event.target.value
                      )
                    }
                    required
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#a58a62]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Telefono
                  </label>

                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(event) =>
                      updateEditField(
                        "phone",
                        event.target.value
                      )
                    }
                    required
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#a58a62]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Note
                </label>

                <textarea
                  value={editForm.notes}
                  onChange={(event) =>
                    updateEditField(
                      "notes",
                      event.target.value
                    )
                  }
                  rows={4}
                  placeholder="Eventuali note del cliente..."
                  className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#a58a62]"
                />
              </div>

              {editError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {editError}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={savingEdit}
                  className="rounded-full border border-black/10 px-6 py-3 text-sm transition hover:bg-black/5 disabled:opacity-50"
                >
                  Annulla
                </button>

                <button
                  type="submit"
                  disabled={savingEdit}
                  className="rounded-full bg-[#20251f] px-6 py-3 text-sm font-medium text-[#f3f0e8] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingEdit
                    ? "Salvataggio..."
                    : "Salva modifiche"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}