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

/*
|--------------------------------------------------------------------------
| GET
|--------------------------------------------------------------------------
| Carica tutte le categorie con tutti i relativi piatti.
*/
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Non autorizzato.",
        },
        {
          status: 401,
        }
      );
    }

    const categories = await prisma.category.findMany({
      orderBy: {
        sortOrder: "asc",
      },

      include: {
        dishes: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error(
      "Errore caricamento menu:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Errore durante il caricamento del menu.",
      },
      {
        status: 500,
      }
    );
  }
}

/*
|--------------------------------------------------------------------------
| POST
|--------------------------------------------------------------------------
| Crea un nuovo piatto.
*/
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Non autorizzato.",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const result = dishSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Controlla i dati del piatto.",
          errors:
            result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
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

    /*
    |--------------------------------------------------------------------------
    | Controllo categoria
    |--------------------------------------------------------------------------
    */

    const category =
      await prisma.category.findUnique({
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
        {
          status: 404,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Creazione slug
    |--------------------------------------------------------------------------
    */

    const baseSlug = createSlug(name);

    let slug = baseSlug;

    const existingDish =
      await prisma.dish.findUnique({
        where: {
          slug,
        },
      });

    if (existingDish) {
      slug = `${baseSlug}-${Date.now()}`;
    }

    /*
    |--------------------------------------------------------------------------
    | Ordine del piatto
    |--------------------------------------------------------------------------
    */

    const lastDish =
      await prisma.dish.findFirst({
        where: {
          categoryId,
        },

        orderBy: {
          sortOrder: "desc",
        },
      });

    const nextSortOrder =
      (lastDish?.sortOrder ?? 0) + 1;

    /*
    |--------------------------------------------------------------------------
    | Creazione piatto
    |--------------------------------------------------------------------------
    */

    const dish = await prisma.dish.create({
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
          allergens &&
          allergens.trim() !== ""
            ? allergens.trim()
            : null,

        available:
          available ?? true,

        sortOrder: nextSortOrder,

        categoryId,
      },

      include: {
        category: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Piatto creato correttamente.",
        dish,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Errore creazione piatto:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Errore durante la creazione del piatto.",
      },
      {
        status: 500,
      }
    );
  }
}