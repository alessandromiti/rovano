import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "../lib/db/prisma";

async function main() {
  const email = "admin@rovano.it";
  const password = "RovanoAdmin123!";

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: {
      email,
    },
    update: {
      passwordHash,
      name: "Amministratore Rovano",
    },
    create: {
      email,
      passwordHash,
      name: "Amministratore Rovano",
    },
  });

  console.log("Admin creato correttamente:");
  console.log("Email:", user.email);
  console.log("Password:", password);
}

main()
  .catch((error) => {
    console.error("Errore creazione admin:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });