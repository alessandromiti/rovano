import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL non è configurata nel file .env");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

const menu = [
  {
    name: "Antipasti",
    slug: "antipasti",
    sortOrder: 1,
    dishes: [
      {
        name: "Carciofo alla brace",
        slug: "carciofo-alla-brace",
        description:
          "Carciofo, fonduta di pecorino, erbe amare e olio al prezzemolo.",
        price: 14,
        sortOrder: 1,
      },
      {
        name: "Battuta di manzo",
        slug: "battuta-di-manzo",
        description:
          "Manzo piemontese, tuorlo affumicato, nocciola e tartufo nero.",
        price: 18,
        sortOrder: 2,
      },
      {
        name: "Uovo, asparagi e parmigiano",
        slug: "uovo-asparagi-e-parmigiano",
        description:
          "Uovo morbido, asparagi verdi, Parmigiano Reggiano e pane croccante.",
        price: 15,
        sortOrder: 3,
      },
    ],
  },

  {
    name: "Primi",
    slug: "primi",
    sortOrder: 2,
    dishes: [
      {
        name: "Tagliolini al tartufo",
        slug: "tagliolini-al-tartufo",
        description:
          "Tagliolini freschi, burro di malga e tartufo nero.",
        price: 22,
        sortOrder: 1,
      },
      {
        name: "Risotto al parmigiano",
        slug: "risotto-al-parmigiano",
        description:
          "Riso Carnaroli, Parmigiano Reggiano 36 mesi e pepe tostato.",
        price: 19,
        sortOrder: 2,
      },
      {
        name: "Ravioli di ricotta",
        slug: "ravioli-di-ricotta",
        description:
          "Ravioli freschi, ricotta, burro alle erbe e fondo di pomodoro arrosto.",
        price: 18,
        sortOrder: 3,
      },
    ],
  },

  {
    name: "Secondi",
    slug: "secondi",
    sortOrder: 3,
    dishes: [
      {
        name: "Ricciola",
        slug: "ricciola",
        description:
          "Ricciola, finocchio, agrumi e olio al basilico.",
        price: 24,
        sortOrder: 1,
      },
      {
        name: "Guancia di manzo",
        slug: "guancia-di-manzo",
        description:
          "Cotta lentamente, patata affumicata e fondo al vino rosso.",
        price: 26,
        sortOrder: 2,
      },
      {
        name: "Pollo ruspante",
        slug: "pollo-ruspante",
        description:
          "Pollo arrosto, cipolla dolce, patata e fondo alle erbe.",
        price: 22,
        sortOrder: 3,
      },
    ],
  },

  {
    name: "Contorni",
    slug: "contorni",
    sortOrder: 4,
    dishes: [
      {
        name: "Verdure di stagione",
        slug: "verdure-di-stagione",
        description:
          "Selezione di verdure stagionali, erbe fresche e olio extravergine.",
        price: 8,
        sortOrder: 1,
      },
      {
        name: "Patata affumicata",
        slug: "patata-affumicata",
        description:
          "Patata al forno, rosmarino e burro affumicato.",
        price: 7,
        sortOrder: 2,
      },
    ],
  },

  {
    name: "Dessert",
    slug: "dessert",
    sortOrder: 5,
    dishes: [
      {
        name: "Tiramisù Rovano",
        slug: "tiramisu-rovano",
        description:
          "La nostra interpretazione del classico italiano.",
        price: 8,
        sortOrder: 1,
      },
      {
        name: "Cioccolato e nocciola",
        slug: "cioccolato-e-nocciola",
        description:
          "Cioccolato fondente, nocciola piemontese e sale marino.",
        price: 9,
        sortOrder: 2,
      },
      {
        name: "Pesca, vaniglia e mandorla",
        slug: "pesca-vaniglia-e-mandorla",
        description:
          "Pesca di stagione, crema alla vaniglia e croccante di mandorla.",
        price: 9,
        sortOrder: 3,
      },
    ],
  },

  {
    name: "Bevande",
    slug: "bevande",
    sortOrder: 6,
    dishes: [
      {
        name: "Selezione di vini",
        slug: "selezione-di-vini",
        description:
          "Una selezione italiana pensata per accompagnare la cucina Rovano.",
        price: 6,
        sortOrder: 1,
      },
      {
        name: "Acqua naturale o frizzante",
        slug: "acqua-naturale-o-frizzante",
        description:
          "Acqua minerale italiana.",
        price: 3,
        sortOrder: 2,
      },
      {
        name: "Caffè espresso",
        slug: "caffe-espresso",
        description:
          "Miscela italiana selezionata.",
        price: 2,
        sortOrder: 3,
      },
    ],
  },
];

async function main() {
  console.log("Inserimento menu Rovano...");

  for (const categoryData of menu) {
    const category = await prisma.category.upsert({
      where: {
        slug: categoryData.slug,
      },
      update: {
        name: categoryData.name,
        sortOrder: categoryData.sortOrder,
      },
      create: {
        name: categoryData.name,
        slug: categoryData.slug,
        sortOrder: categoryData.sortOrder,
      },
    });

    for (const dishData of categoryData.dishes) {
      await prisma.dish.upsert({
        where: {
          slug: dishData.slug,
        },
        update: {
          name: dishData.name,
          description: dishData.description,
          price: dishData.price,
          sortOrder: dishData.sortOrder,
          categoryId: category.id,
        },
        create: {
          name: dishData.name,
          slug: dishData.slug,
          description: dishData.description,
          price: dishData.price,
          sortOrder: dishData.sortOrder,
          categoryId: category.id,
        },
      });
    }
  }

  console.log("Menu Rovano inserito correttamente.");
}

main()
  .catch((error) => {
    console.error("Errore durante il seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });