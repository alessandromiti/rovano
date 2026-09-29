"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
  sortOrder: number;
};

type Dish = {
  id: string;
  name: string;
  description: string;
  price: number | string;
  image: string | null;
  allergens: string | null;
  available: boolean;
  sortOrder: number;
  categoryId: string;
};

type CategoryWithDishes = Category & {
  dishes: Dish[];
  _count?: {
    dishes: number;
  };
};

type FormData = {
  name: string;
  description: string;
  price: string;
  categoryId: string;
  image: string;
  allergens: string;
  available: boolean;
};

type CategoryFormData = {
  name: string;
};

const emptyForm: FormData = {
  name: "",
  description: "",
  price: "",
  categoryId: "",
  image: "",
  allergens: "",
  available: true,
};

const emptyCategoryForm: CategoryFormData = {
  name: "",
};

export default function AdminMenuPage() {
  const [categories, setCategories] = useState<
    CategoryWithDishes[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editingDishId, setEditingDishId] =
    useState<string | null>(null);

  const [categoryModalOpen, setCategoryModalOpen] =
    useState(false);

  const [editingCategoryId, setEditingCategoryId] =
    useState<string | null>(null);

  const [categorySaving, setCategorySaving] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [categoryError, setCategoryError] =
    useState("");

  const [categorySuccess, setCategorySuccess] =
    useState("");

  const [form, setForm] =
    useState<FormData>(emptyForm);

  const [categoryForm, setCategoryForm] =
    useState<CategoryFormData>(
      emptyCategoryForm
    );

  async function loadMenu() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/admin/menu",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const text = await response.text();

      let data: {
        success?: boolean;
        message?: string;
        categories?: CategoryWithDishes[];
      };

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "Il server ha restituito una risposta non valida."
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Errore durante il caricamento del menu."
        );
      }

      setCategories(data.categories ?? []);
    } catch (error) {
      console.error(
        "Errore caricamento menu:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Errore durante il caricamento del menu."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMenu();
  }, []);

  function openCreateModal() {
    setEditingDishId(null);

    setForm({
      ...emptyForm,
      categoryId:
        categories[0]?.id ?? "",
    });

    setError("");
    setSuccess("");
    setModalOpen(true);
  }

  function openEditModal(dish: Dish) {
    setEditingDishId(dish.id);

    setForm({
      name: dish.name,
      description: dish.description,
      price: String(dish.price),
      categoryId: dish.categoryId,
      image: dish.image ?? "",
      allergens: dish.allergens ?? "",
      available: dish.available,
    });

    setError("");
    setSuccess("");
    setModalOpen(true);
  }

  function closeModal() {
    if (saving) return;

    setModalOpen(false);
    setEditingDishId(null);
    setError("");
    setSuccess("");
    setForm(emptyForm);
  }

  function updateField(
    field: keyof FormData,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveDish(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const isEditing =
        editingDishId !== null;

      const url = isEditing
        ? `/api/admin/menu/${editingDishId}`
        : "/api/admin/menu";

      const method = isEditing
        ? "PATCH"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          description:
            form.description.trim(),
          price: Number(form.price),
          categoryId: form.categoryId,
          image:
            form.image.trim() || undefined,
          allergens:
            form.allergens.trim() ||
            undefined,
          available: form.available,
        }),
      });

      const text = await response.text();

      let data: {
        success?: boolean;
        message?: string;
      };

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "Il server ha restituito una risposta non valida."
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Errore durante il salvataggio del piatto."
        );
      }

      setSuccess(
        isEditing
          ? "Piatto modificato correttamente."
          : "Piatto aggiunto correttamente."
      );

      await loadMenu();

      setTimeout(() => {
        setModalOpen(false);
        setEditingDishId(null);
        setSuccess("");
        setForm(emptyForm);
      }, 700);
    } catch (error) {
      console.error(
        "Errore salvataggio piatto:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Errore durante il salvataggio del piatto."
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteDish(dish: Dish) {
    const confirmed = window.confirm(
      `Vuoi davvero eliminare "${dish.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/menu/${dish.id}`,
        {
          method: "DELETE",
        }
      );

      const text = await response.text();

      let data: {
        success?: boolean;
        message?: string;
      };

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "Il server ha restituito una risposta non valida."
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Errore durante l'eliminazione del piatto."
        );
      }

      setSuccess(
        "Piatto eliminato correttamente."
      );

      await loadMenu();

      setTimeout(() => {
        setSuccess("");
      }, 1500);
    } catch (error) {
      console.error(
        "Errore eliminazione piatto:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Errore durante l'eliminazione del piatto."
      );
    }
  }

  function openCreateCategoryModal() {
    setEditingCategoryId(null);
    setCategoryForm(emptyCategoryForm);
    setCategoryError("");
    setCategorySuccess("");
    setCategoryModalOpen(true);
  }

  function openEditCategoryModal(
    category: Category
  ) {
    setEditingCategoryId(category.id);

    setCategoryForm({
      name: category.name,
    });

    setCategoryError("");
    setCategorySuccess("");
    setCategoryModalOpen(true);
  }

  function closeCategoryModal() {
    if (categorySaving) return;

    setCategoryModalOpen(false);
    setEditingCategoryId(null);
    setCategoryForm(emptyCategoryForm);
    setCategoryError("");
    setCategorySuccess("");
  }

  async function saveCategory(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setCategorySaving(true);
      setCategoryError("");
      setCategorySuccess("");

      const isEditing =
        editingCategoryId !== null;

      const url = isEditing
        ? `/api/admin/categories/${editingCategoryId}`
        : "/api/admin/categories";

      const method = isEditing
        ? "PATCH"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryForm.name.trim(),
        }),
      });

      const text = await response.text();

      let data: {
        success?: boolean;
        message?: string;
      };

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "Il server ha restituito una risposta non valida."
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Errore durante il salvataggio della categoria."
        );
      }

      setCategorySuccess(
        isEditing
          ? "Categoria modificata correttamente."
          : "Categoria creata correttamente."
      );

      await loadMenu();

      setTimeout(() => {
        setCategoryModalOpen(false);
        setEditingCategoryId(null);
        setCategorySuccess("");
        setCategoryForm(emptyCategoryForm);
      }, 700);
    } catch (error) {
      console.error(
        "Errore salvataggio categoria:",
        error
      );

      setCategoryError(
        error instanceof Error
          ? error.message
          : "Errore durante il salvataggio della categoria."
      );
    } finally {
      setCategorySaving(false);
    }
  }

  async function deleteCategory(
    category: CategoryWithDishes
  ) {
    const dishCount =
      category.dishes.length;

    if (dishCount > 0) {
      setCategoryError(
        `Non puoi eliminare "${category.name}" perché contiene ${dishCount} ${
          dishCount === 1
            ? "piatto"
            : "piatti"
        }.`
      );

      setTimeout(() => {
        setCategoryError("");
      }, 3000);

      return;
    }

    const confirmed = window.confirm(
      `Vuoi davvero eliminare la categoria "${category.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setCategoryError("");
      setCategorySuccess("");

      const response = await fetch(
        `/api/admin/categories/${category.id}`,
        {
          method: "DELETE",
        }
      );

      const text = await response.text();

      let data: {
        success?: boolean;
        message?: string;
      };

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "Il server ha restituito una risposta non valida."
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Errore durante l'eliminazione della categoria."
        );
      }

      setCategorySuccess(
        "Categoria eliminata correttamente."
      );

      await loadMenu();

      setTimeout(() => {
        setCategorySuccess("");
      }, 1500);
    } catch (error) {
      console.error(
        "Errore eliminazione categoria:",
        error
      );

      setCategoryError(
        error instanceof Error
          ? error.message
          : "Errore durante l'eliminazione della categoria."
      );
    }
  }

  const totalDishes = categories.reduce(
    (total, category) =>
      total + category.dishes.length,
    0
  );

  const availableDishes = categories.reduce(
    (total, category) =>
      total +
      category.dishes.filter(
        (dish) => dish.available
      ).length,
    0
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f3f0e8] text-[#1b1b17]">
        <div className="container-rovano flex min-h-screen items-center justify-center">
          <p className="text-[#77766f]">
            Caricamento menu...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#1b1b17]">
      {/* HEADER */}
      <header className="border-b border-black/10 bg-[#20251f] text-[#f3f0e8]">
        <div className="container-rovano flex min-h-20 items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#a58a62]">
              Rovano
            </p>

            <h1 className="mt-1 font-display text-2xl">
              Gestione menu
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="rounded-full border border-white/20 px-5 py-2 text-sm transition hover:bg-white/10"
            >
              Dashboard
            </Link>

            <Link
              href="/"
              className="rounded-full bg-[#f3f0e8] px-5 py-2 text-sm text-[#20251f] transition hover:opacity-90"
            >
              Sito
            </Link>
          </div>
        </div>
      </header>

      {/* CONTENUTO */}
      <section className="container-rovano py-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#a58a62]">
              Amministrazione
            </p>

            <h2 className="mt-2 font-display text-4xl md:text-5xl">
              Menu
            </h2>

            <p className="mt-4 max-w-2xl text-[#77766f]">
              Gestisci categorie e piatti
              pubblicati sul sito Rovano.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="rounded-full bg-[#20251f] px-6 py-3 text-sm font-medium text-[#f3f0e8] transition hover:opacity-90"
          >
            + Aggiungi piatto
          </button>
        </div>

        {/* MESSAGGI GENERALI */}
        {error && !modalOpen && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && !modalOpen && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {/* STATISTICHE */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-black/10 bg-white/60 p-6">
            <p className="text-sm text-[#77766f]">
              Piatti totali
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {totalDishes}
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/60 p-6">
            <p className="text-sm text-[#77766f]">
              Piatti disponibili
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {availableDishes}
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/60 p-6">
            <p className="text-sm text-[#77766f]">
              Categorie
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {categories.length}
            </p>
          </div>
        </div>

        {/* GESTIONE CATEGORIE */}
        <section className="mt-10 rounded-3xl border border-black/10 bg-white/70 p-6 md:p-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#a58a62]">
                Organizzazione
              </p>

              <h3 className="mt-2 font-display text-3xl">
                Categorie menu
              </h3>

              <p className="mt-2 max-w-2xl text-sm text-[#77766f]">
                Crea e modifica le categorie
                utilizzate per organizzare i piatti.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateCategoryModal}
              className="rounded-full bg-[#20251f] px-5 py-3 text-sm font-medium text-[#f3f0e8] transition hover:opacity-90"
            >
              + Nuova categoria
            </button>
          </div>

          {categoryError && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              {categoryError}
            </div>
          )}

          {categorySuccess && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
              {categorySuccess}
            </div>
          )}

          <div className="mt-6 divide-y divide-black/10 rounded-2xl border border-black/10 bg-white">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h4 className="font-display text-xl">
                    {category.name}
                  </h4>

                  <p className="mt-1 text-sm text-[#77766f]">
                    {category.dishes.length}{" "}
                    {category.dishes.length === 1
                      ? "piatto"
                      : "piatti"}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      openEditCategoryModal(
                        category
                      )
                    }
                    className="rounded-full border border-black/10 px-4 py-2 text-sm transition hover:bg-black/5"
                  >
                    Modifica
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteCategory(category)
                    }
                    className="rounded-full border border-red-200 px-4 py-2 text-sm text-red-700 transition hover:bg-red-50"
                  >
                    Elimina
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORIE E PIATTI */}
        <div className="mt-10 space-y-8">
          {categories.map((category) => (
            <section
              key={category.id}
              className="overflow-hidden rounded-2xl border border-black/10 bg-white/70"
            >
              <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
                <div>
                  <h3 className="font-display text-2xl">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-sm text-[#77766f]">
                    {category.dishes.length}{" "}
                    {category.dishes.length === 1
                      ? "piatto"
                      : "piatti"}
                  </p>
                </div>
              </div>

              {category.dishes.length === 0 ? (
                <div className="px-6 py-8 text-sm text-[#77766f]">
                  Nessun piatto presente in
                  questa categoria.
                </div>
              ) : (
                <div className="divide-y divide-black/10">
                  {category.dishes.map((dish) => (
                    <div
                      key={dish.id}
                      className="flex flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h4 className="font-display text-xl">
                            {dish.name}
                          </h4>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              dish.available
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {dish.available
                              ? "Disponibile"
                              : "Non disponibile"}
                          </span>
                        </div>

                        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#77766f]">
                          {dish.description}
                        </p>

                        {dish.allergens && (
                          <p className="mt-2 text-xs text-[#77766f]">
                            Allergeni:{" "}
                            {dish.allergens}
                          </p>
                        )}
                      </div>

                      <div className="flex shrink-0 items-center gap-4">
                        <p className="font-display text-xl">
                          €
                          {Number(dish.price)
                            .toFixed(2)
                            .replace(".", ",")}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(dish)
                          }
                          className="rounded-full border border-black/10 px-4 py-2 text-sm transition hover:bg-black/5"
                        >
                          Modifica
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteDish(dish)
                          }
                          className="rounded-full border border-red-200 px-4 py-2 text-sm text-red-700 transition hover:bg-red-50"
                        >
                          Elimina
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </section>

      {/* MODALE PIATTO */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[#f3f0e8] p-6 shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#a58a62]">
                  {editingDishId
                    ? "Modifica piatto"
                    : "Nuovo piatto"}
                </p>

                <h3 className="mt-2 font-display text-3xl">
                  {editingDishId
                    ? "Modifica il piatto"
                    : "Aggiungi al menu"}
                </h3>

                <p className="mt-2 text-sm text-[#77766f]">
                  {editingDishId
                    ? "Aggiorna i dati del piatto."
                    : "Inserisci i dati del nuovo piatto."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-lg transition hover:bg-black/5 disabled:opacity-50"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={saveDish}
              className="mt-8 space-y-5"
            >
              {/* NOME */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Nome del piatto
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    updateField(
                      "name",
                      event.target.value
                    )
                  }
                  placeholder="Es. Pasta al tartufo"
                  required
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#a58a62]"
                />
              </div>

              {/* DESCRIZIONE */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Descrizione
                </label>

                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateField(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Descrizione del piatto..."
                  required
                  rows={4}
                  className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#a58a62]"
                />
              </div>

              {/* PREZZO + CATEGORIA */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Prezzo
                  </label>

                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.price}
                    onChange={(event) =>
                      updateField(
                        "price",
                        event.target.value
                      )
                    }
                    placeholder="18.00"
                    required
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#a58a62]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Categoria
                  </label>

                  <select
                    value={form.categoryId}
                    onChange={(event) =>
                      updateField(
                        "categoryId",
                        event.target.value
                      )
                    }
                    required
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#a58a62]"
                  >
                    <option value="">
                      Seleziona categoria
                    </option>

                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ALLERGENI */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Allergeni
                </label>

                <input
                  type="text"
                  value={form.allergens}
                  onChange={(event) =>
                    updateField(
                      "allergens",
                      event.target.value
                    )
                  }
                  placeholder="Es. Glutine, latte, frutta a guscio"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#a58a62]"
                />
              </div>

              {/* IMMAGINE */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Immagine
                </label>

                <input
                  type="url"
                  value={form.image}
                  onChange={(event) =>
                    updateField(
                      "image",
                      event.target.value
                    )
                  }
                  placeholder="https://..."
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#a58a62]"
                />

                <p className="mt-2 text-xs text-[#77766f]">
                  Per ora inserisci un URL.
                  L'upload immagini verrà
                  aggiunto successivamente.
                </p>
              </div>

              {/* DISPONIBILITÀ */}
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-4">
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={(event) =>
                    updateField(
                      "available",
                      event.target.checked
                    )
                  }
                  className="h-4 w-4"
                />

                <span className="text-sm">
                  Piatto disponibile sul sito
                </span>
              </label>

              {/* MESSAGGI */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {success}
                </div>
              )}

              {/* AZIONI */}
              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-full border border-black/10 px-6 py-3 text-sm transition hover:bg-black/5 disabled:opacity-50"
                >
                  Annulla
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-[#20251f] px-6 py-3 text-sm font-medium text-[#f3f0e8] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Salvataggio..."
                    : editingDishId
                    ? "Salva modifiche"
                    : "Salva piatto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE CATEGORIA */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
          <div className="w-full max-w-lg rounded-3xl bg-[#f3f0e8] p-6 shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#a58a62]">
                  {editingCategoryId
                    ? "Modifica categoria"
                    : "Nuova categoria"}
                </p>

                <h3 className="mt-2 font-display text-3xl">
                  {editingCategoryId
                    ? "Modifica categoria"
                    : "Crea categoria"}
                </h3>

                <p className="mt-2 text-sm text-[#77766f]">
                  {editingCategoryId
                    ? "Aggiorna il nome della categoria."
                    : "Inserisci il nome della nuova categoria."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeCategoryModal}
                disabled={categorySaving}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-lg transition hover:bg-black/5 disabled:opacity-50"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={saveCategory}
              className="mt-8 space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Nome categoria
                </label>

                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(event) =>
                    setCategoryForm({
                      name: event.target.value,
                    })
                  }
                  placeholder="Es. Specialità"
                  required
                  autoFocus
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#a58a62]"
                />
              </div>

              {categoryError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {categoryError}
                </div>
              )}

              {categorySuccess && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {categorySuccess}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeCategoryModal}
                  disabled={categorySaving}
                  className="rounded-full border border-black/10 px-6 py-3 text-sm transition hover:bg-black/5 disabled:opacity-50"
                >
                  Annulla
                </button>

                <button
                  type="submit"
                  disabled={categorySaving}
                  className="rounded-full bg-[#20251f] px-6 py-3 text-sm font-medium text-[#f3f0e8] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {categorySaving
                    ? "Salvataggio..."
                    : editingCategoryId
                    ? "Salva modifiche"
                    : "Crea categoria"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}