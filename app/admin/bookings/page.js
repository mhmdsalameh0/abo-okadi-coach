import Link from "next/link";
import BookingActions from "../../components/BookingActions";
import { prisma } from "../../lib/prisma";
import { ensureBookingTable } from "../../lib/booking-db";

export const dynamic = "force-dynamic";

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(value);
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(value);
}

function getStatusClass(status) {
  if (status === "accepted") {
    return "border-[#c6ff2d]/30 bg-[#c6ff2d]/10 text-[#c6ff2d]";
  }

  if (status === "rejected") {
    return "border-red-300/40 bg-red-500/10 text-red-200";
  }

  return "border-yellow-300/35 bg-yellow-400/10 text-yellow-200";
}

export default async function AdminBookingsPage() {
  await ensureBookingTable();

  const bookings = await prisma.booking.findMany({
    where: {
      status: "pending",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const bookingRows = bookings.map((booking) => ({
    id: booking.id,
    name: booking.name,
    place: booking.place || booking.email || "-",
    phone: booking.phone,
    date: formatDate(booking.date),
    time: booking.time,
    message: booking.message,
    status: booking.status,
    createdAt: formatDateTime(booking.createdAt),
  }));

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-6 text-white sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#c6ff2d]">Admin</p>
            <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">Bookings</h1>
            <p className="mt-2 text-sm text-white/62">Review pending booking requests. Accepted and rejected bookings are saved but hidden from this action list.</p>
          </div>

          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] px-5 text-sm font-bold text-white transition hover:border-[#c6ff2d]/70 hover:text-[#c6ff2d]"
          >
            Back Home
          </Link>
        </div>

        {bookingRows.length === 0 ? (
          <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.04] p-6 text-white/70">
            No pending bookings.
          </div>
        ) : (
          <>
            <div className="mt-8 hidden overflow-x-auto rounded-xl border border-white/10 bg-black/72 shadow-[0_24px_70px_rgba(0,0,0,0.42)] lg:block">
              <table className="w-full min-w-[1180px] border-collapse text-left text-sm">
                <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.12em] text-white/58">
                  <tr>
                    <th className="px-4 py-4">Name</th>
                    <th className="px-4 py-4">Location</th>
                    <th className="px-4 py-4">Phone</th>
                    <th className="px-4 py-4">Date</th>
                    <th className="px-4 py-4">Time</th>
                    <th className="px-4 py-4">Message</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4">Created</th>
                    <th className="px-4 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {bookingRows.map((booking) => (
                    <tr key={booking.id} className="align-top text-white/78">
                      <td className="px-4 py-4 font-bold text-white">{booking.name}</td>
                      <td className="px-4 py-4">{booking.place}</td>
                      <td className="px-4 py-4">{booking.phone}</td>
                      <td className="px-4 py-4">{booking.date}</td>
                      <td className="px-4 py-4">{booking.time}</td>
                      <td className="max-w-[18rem] px-4 py-4 leading-6">{booking.message || "-"}</td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${getStatusClass(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">{booking.createdAt}</td>
                      <td className="px-4 py-4">
                        <BookingActions booking={booking} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-4 lg:hidden">
              {bookingRows.map((booking) => (
                <article key={booking.id} className="rounded-xl border border-white/10 bg-black/72 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.36)]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-black text-white">{booking.name}</h2>
                      <p className="mt-1 text-sm text-white/62">{booking.place}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${getStatusClass(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-white/76 sm:grid-cols-2">
                    <p><span className="font-bold text-white">Phone:</span> {booking.phone}</p>
                    <p><span className="font-bold text-white">Date:</span> {booking.date}</p>
                    <p><span className="font-bold text-white">Time:</span> {booking.time}</p>
                    <p><span className="font-bold text-white">Created:</span> {booking.createdAt}</p>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/70">
                    <span className="font-bold text-white">Message:</span> {booking.message || "-"}
                  </p>

                  <div className="mt-4 border-t border-white/10 pt-4">
                    <BookingActions booking={booking} />
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}






