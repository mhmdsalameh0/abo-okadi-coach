import { NextResponse } from "next/server";
import { ensureBookingTable } from "../../lib/booking-db";
import { EmailConfigurationError, getEmailEnvironmentStatus, sendBookingNotification } from "../../lib/mail";
import { prisma } from "../../lib/prisma";

const BOOKING_API_ROUTE = "POST /api/bookings";

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidDate(value: string) {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

function logBookingRequestContext() {
  console.info("Booking request received", {
    route: BOOKING_API_ROUTE,
    emailEnv: getEmailEnvironmentStatus(),
  });
}

function getSafeErrorDetails(error: unknown) {
  if (error instanceof EmailConfigurationError) {
    return {
      name: error.name,
      missingVariables: error.missingVariables,
    };
  }

  if (error instanceof Error) {
    const details: Record<string, unknown> = {
      name: error.name,
      message: error.message,
    };

    const maybeCode = (error as { code?: unknown }).code;
    const maybeCommand = (error as { command?: unknown }).command;
    const maybeResponseCode = (error as { responseCode?: unknown }).responseCode;

    if (maybeCode) details.code = maybeCode;
    if (maybeCommand) details.command = maybeCommand;
    if (maybeResponseCode) details.responseCode = maybeResponseCode;

    return details;
  }

  return { message: "Unknown email error" };
}

export async function POST(request: Request) {
  logBookingRequestContext();

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
      const safeDetails = getSafeErrorDetails(emailError);
      console.error("Booking notification email failed", {
        route: BOOKING_API_ROUTE,
        bookingId: booking.id,
        emailEnv: getEmailEnvironmentStatus(),
        ...safeDetails,
      });

      if (emailError instanceof EmailConfigurationError) {
        return NextResponse.json(
          { error: "Booking was saved, but email is not configured on the server. Please contact the coach directly." },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: "Booking was saved, but the email notification could not be sent. Please try again later or contact the coach directly." },
        { status: 502 }
      );
    }

    console.info("Booking notification email sent", {
      route: BOOKING_API_ROUTE,
      bookingId: booking.id,
    });

    return NextResponse.json(
      { message: "Your booking request was sent successfully.", bookingId: booking.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking create failed", {
      route: BOOKING_API_ROUTE,
      ...getSafeErrorDetails(error),
    });

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
