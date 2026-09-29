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

// GET - lista categorie
export async function GET() {
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

    const categories = await prisma.category.findMany({
      orderBy: {
        sortOrder: "asc",
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
      categories,
    });
  } catch (error) {
    console.error("Errore caricamento categorie:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Errore durante il caricamento delle categorie.",
      },
      { status: 500 }
    );
  }
}

// POST - crea categoria
export async function POST(request: Request) {
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

    const name = result.data.name.trim();
    const slug = createSlug(name);

    const existingCategory = await prisma.category.findFirst({
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
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Esiste già una categoria con questo nome.",
        },
        { status: 409 }
      );
    }

    const lastCategory = await prisma.category.findFirst({
      orderBy: {
        sortOrder: "desc",
      },
    });

    const nextSortOrder = (lastCategory?.sortOrder ?? 0) + 1;

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        sortOrder: nextSortOrder,
      },
      include: {
        _count: {
          select: {
            dishes: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Categoria creata correttamente.",
        category,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Errore creazione categoria:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Errore durante la creazione della categoria.",
      },
      { status: 500 }
    );
  }
}