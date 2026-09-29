import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/auth";
import prisma from "@/lib/db/prisma";

const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Il nome della categoria è obbligatorio."),
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

// PATCH - modifica categoria
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
          message: "ID categoria mancante.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const result = categorySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Controlla il nome della categoria.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const existingCategory = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!existingCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Categoria non trovata.",
        },
        { status: 404 }
      );
    }

    const name = result.data.name.trim();
    const slug = createSlug(name);

    const duplicateCategory = await prisma.category.findFirst({
      where: {
        OR: [
          {
            name: {
              equals: name,
              mode: "insensitive",
            },
          },
          {
            slug,
          },
        ],
        NOT: {
          id,
        },
      },
    });

    if (duplicateCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Esiste già una categoria con questo nome.",
        },
        { status: 409 }
      );
    }

    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
        slug,
      },
      include: {
        _count: {
          select: {
            dishes: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Categoria aggiornata correttamente.",
      category,
    });
  } catch (error) {
    console.error("Errore modifica categoria:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Errore durante la modifica della categoria.",
      },
      { status: 500 }
    );
  }
}

// DELETE - elimina categoria
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
          message: "ID categoria mancante.",
        },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            dishes: true,
          },
        },
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

    if (category._count.dishes > 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Non puoi eliminare una categoria che contiene ancora dei piatti.",
        },
        { status: 409 }
      );
    }

    await prisma.category.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Categoria eliminata correttamente.",
    });
  } catch (error) {
    console.error("Errore eliminazione categoria:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Errore durante l'eliminazione della categoria.",
      },
      { status: 500 }
    );
  }
}