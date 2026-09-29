import { z } from "zod";
import prisma from "@/lib/db/prisma";

const reservationSchema = z.object({
  date: z.string().min(1, "La data è obbligatoria."),
  time: z.string().min(1, "L'orario è obbligatorio."),
  people: z.coerce
    .number()
    .int()
    .min(1, "Il numero di persone non è valido.")
    .max(8, "Il numero massimo è di 8 persone."),
  name: z.string().min(2, "Il nome è obbligatorio."),
  email: z.string().email("L'email non è valida."),
  phone: z.string().min(6, "Il telefono non è valido."),
  notes: z.string().optional(),
});

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: [
        {
          date: "desc",
        },
        {
          time: "desc",
        },
      ],
      include: {
        customer: true,
      },
    });

    return Response.json({
      success: true,
      reservations,
    });
  } catch (error) {
    console.error("Errore caricamento prenotazioni:", error);

    return Response.json(
      {
        success: false,
        message: "Errore durante il caricamento delle prenotazioni.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = reservationSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: "Controlla i dati inseriti.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      date,
      time,
      people,
      name,
      email,
      phone,
      notes,
    } = result.data;

    const reservationDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(reservationDate.getTime())) {
      return Response.json(
        {
          success: false,
          message: "La data selezionata non è valida.",
        },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
      },
    });

    const reservation = await prisma.reservation.create({
      data: {
        date: reservationDate,
        time,
        people,
        notes: notes || null,
        customerId: customer.id,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Prenotazione ricevuta correttamente.",
        reservationId: reservation.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Errore creazione prenotazione:", error);

    return Response.json(
      {
        success: false,
        message:
          "Si è verificato un errore durante la prenotazione.",
      },
      { status: 500 }
    );
  }
}