import { prisma } from "./prisma";

let bookingTableReady: Promise<void> | null = null;

export function ensureBookingTable() {
  bookingTableReady ??= prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Booking" (
      "id" SERIAL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "email" TEXT,
      "place" TEXT,
      "phone" TEXT NOT NULL,
      "date" TIMESTAMP(3) NOT NULL,
      "time" TEXT NOT NULL,
      "message" TEXT,
      "status" TEXT NOT NULL DEFAULT 'pending',
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).then(() => undefined);

  return bookingTableReady;
}
