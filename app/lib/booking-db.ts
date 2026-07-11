import { prisma } from "./prisma";

let bookingTableReady: Promise<void> | null = null;

export function ensureBookingTable() {
  bookingTableReady ??= prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Booking" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "name" TEXT NOT NULL,
      "email" TEXT,
      "place" TEXT,
      "phone" TEXT NOT NULL,
      "date" DATETIME NOT NULL,
      "time" TEXT NOT NULL,
      "message" TEXT,
      "status" TEXT NOT NULL DEFAULT 'pending',
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).then(() => undefined);

  return bookingTableReady;
}
