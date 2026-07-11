import { NextResponse } from "next/server";
import { ensureBookingTable } from "../../lib/booking-db";
import { sendBookingNotification } from "../../lib/mail";
import { prisma } from "../../lib/prisma";

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidDate(value: string) {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = cleanText(body.name);
    const place = cleanText(body.place);
    const phone = cleanText(body.phone);
    const date = cleanText(body.date);
    const time = cleanText(body.time);
    const message = cleanText(body.message);

    if (!name || !place || !phone || !date || !time) {
      return NextResponse.json(
        { error: "Name, location, phone, date, and time are required." },
        { status: 400 }
      );
    }

    if (!isValidDate(date)) {
      return NextResponse.json(
        { error: "Preferred date is invalid." },
        { status: 400 }
      );
    }

    await ensureBookingTable();

    const booking = await prisma.booking.create({
      data: {
        name,
        place,
        phone,
        date: new Date(date),
        time,
        message,
        status: "pending",
      },
    });

    try {
      await sendBookingNotification({
        name,
        place,
        phone,
        date,
        time,
        message,
      });
    } catch (emailError) {
      console.error("Booking notification email failed. Booking was saved; check COACH_EMAIL, GMAIL_USER, and GMAIL_APP_PASSWORD in .env. Gmail requires an App Password, not the normal Gmail password.", emailError);
    }

    return NextResponse.json(
      { message: "Your booking request was sent successfully.", bookingId: booking.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking create failed", error);

    return NextResponse.json(
      { error: "Something went wrong while sending the booking request." },
      { status: 500 }
    );
  }
}

export async function GET() {
  await ensureBookingTable();

  const bookings = await prisma.booking.findMany({
    where: {
      status: "pending",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ bookings });
}
