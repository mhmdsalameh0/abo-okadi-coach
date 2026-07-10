import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "This endpoint was replaced by /api/bookings." },
    { status: 410 }
  );
}