import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { ensureBookingTable } from "../../../../lib/booking-db";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function parseBookingId(value: string) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function PATCH(_request: Request, context: RouteContext) {
  const { id: rawId } = await context.params;
  const id = parseBookingId(rawId);

  if (!id) {
    return NextResponse.json({ error: "Booking id is invalid." }, { status: 400 });
  }

  try {
    await ensureBookingTable();

    const result = await prisma.booking.updateMany({
      where: { id, status: "pending" },
      data: { status: "accepted" },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Booking was not found or is no longer pending." },
        { status: 409 }
      );
    }

    const booking = await prisma.booking.findUnique({ where: { id } });

    return NextResponse.json({ message: "Booking accepted.", booking });
  } catch (error) {
    console.error("Booking accept failed", error);
    return NextResponse.json({ error: "Could not accept booking." }, { status: 500 });
  }
}


