import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/auth";
import prisma from "@/lib/db/prisma";

const dishSchema = z.object({
  name: z.string().min(2, "Il nome è obbligatorio."),
  description: z
    .string()
    .min(2, "La descrizione è obbligatoria."),
  price: z.coerce
    .number()
    .positive("Il prezzo deve essere maggiore di 0."),
  categoryId: z
    .string()
    .min(1, "La categoria è obbligatoria."),
  image: z.string().optional(),
  allergens: z.string().optional(),
  available: z.boolean().optional(),
});

function createSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Non autorizzato.",
        },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID piatto mancante.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const result = dishSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Controlla i dati del piatto.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const existingDish = await prisma.dish.findUnique({
      where: {
        id,
      },
    });

    if (!existingDish) {
      return NextResponse.json(
        {
          success: false,
          message: "Piatto non trovato.",
        },
        { status: 404 }
      );
    }

    const {
      name,
      description,
      price,
      categoryId,
      image,
      allergens,
      available,
    } = result.data;

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Categoria non trovata.",
        },
        { status: 404 }
      );
    }

    let slug = existingDish.slug;

    if (name.trim() !== existingDish.name.trim()) {
      const baseSlug = createSlug(name);

      const existingSlug = await prisma.dish.findFirst({
        where: {
          slug: baseSlug,
          NOT: {
            id,
          },
        },
      });

      slug = existingSlug
        ? `${baseSlug}-${Date.now()}`
        : baseSlug;
    }

    const dish = await prisma.dish.update({
      where: {
        id,
      },
      data: {
        name,
        slug,
        description,
        price,
        image:
          image && image.trim() !== ""
            ? image.trim()
            : null,
        allergens:
          allergens && allergens.trim() !== ""
            ? allergens.trim()
            : null,
        available: available ?? true,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Piatto aggiornato correttamente.",
      dish,
    });
  } catch (error) {
    console.error(
      "Errore aggiornamento piatto:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Errore durante l'aggiornamento del piatto.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Non autorizzato.",
        },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID piatto mancante.",
        },
        { status: 400 }
      );
    }

    const existingDish = await prisma.dish.findUnique({
      where: {
        id,
      },
    });

    if (!existingDish) {
      return NextResponse.json(
        {
          success: false,
          message: "Piatto non trovato.",
        },
        { status: 404 }
      );
    }

    await prisma.dish.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Piatto eliminato correttamente.",
    });
  } catch (error) {
    console.error(
      "Errore eliminazione piatto:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Errore durante l'eliminazione del piatto.",
      },
      { status: 500 }
    );
  }
}