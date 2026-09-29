import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/auth";
import prisma from "@/lib/db/prisma";

const updateReservationSchema = z.object({
  status: z
    .enum([
      "PENDING",
      "CONFIRMED",
      "CANCELLED",
      "COMPLETED",
    ])
    .optional(),

  date: z
    .string()
    .min(1, "La data è obbligatoria.")
    .optional(),

  time: z
    .string()
    .min(1, "L'orario è obbligatorio.")
    .optional(),

  people: z.coerce
    .number()
    .int()
    .min(1, "Il numero minimo di persone è 1.")
    .max(8, "Il numero massimo di persone è 8.")
    .optional(),

  name: z
    .string()
    .min(2, "Il nome è obbligatorio.")
    .optional(),

  email: z
    .string()
    .email("L'email non è valida.")
    .optional(),

  phone: z
    .string()
    .min(6, "Il telefono non è valido.")
    .optional(),

  notes: z
    .string()
    .nullable()
    .optional(),
});

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
          message: "ID prenotazione mancante.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const result =
      updateReservationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Controlla i dati della prenotazione.",
          errors:
            result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const reservation =
      await prisma.reservation.findUnique({
        where: {
          id,
        },
        include: {
          customer: true,
        },
      });

    if (!reservation) {
      return NextResponse.json(
        {
          success: false,
          message: "Prenotazione non trovata.",
        },
        { status: 404 }
      );
    }

    const {
      status,
      date,
      time,
      people,
      name,
      email,
      phone,
      notes,
    } = result.data;

    let reservationDate:
      | Date
      | undefined;

    if (date !== undefined) {
      reservationDate = new Date(
        `${date}T00:00:00`
      );

      if (
        Number.isNaN(
          reservationDate.getTime()
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "La data selezionata non è valida.",
          },
          { status: 400 }
        );
      }
    }

    const updatedReservation =
      await prisma.reservation.update({
        where: {
          id,
        },
        data: {
          ...(status !== undefined && {
            status,
          }),

          ...(reservationDate !== undefined && {
            date: reservationDate,
          }),

          ...(time !== undefined && {
            time,
          }),

          ...(people !== undefined && {
            people,
          }),

          ...(notes !== undefined && {
            notes:
              notes && notes.trim() !== ""
                ? notes.trim()
                : null,
          }),

          ...(name !== undefined ||
          email !== undefined ||
          phone !== undefined
            ? {
                customer: {
                  update: {
                    ...(name !== undefined && {
                      name: name.trim(),
                    }),

                    ...(email !== undefined && {
                      email: email
                        .trim()
                        .toLowerCase(),
                    }),

                    ...(phone !== undefined && {
                      phone: phone.trim(),
                    }),
                  },
                },
              }
            : {}),
        },
        include: {
          customer: true,
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "Prenotazione aggiornata correttamente.",
      reservation: updatedReservation,
    });
  } catch (error) {
    console.error(
      "Errore aggiornamento prenotazione:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Errore durante l'aggiornamento della prenotazione.",
      },
      { status: 500 }
    );
  }
}