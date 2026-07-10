import { NextResponse } from "next/server";

export async function PATCH() {
  return NextResponse.json(
    { error: "Use /api/bookings/[id]/accept or /api/bookings/[id]/reject." },
    { status: 410 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Deleting bookings through this endpoint is disabled." },
    { status: 410 }
  );
}