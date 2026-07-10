"use client";

import { useState } from "react";

function normalizeLebanesePhone(phone) {
  const trimmed = String(phone || "").trim();

  if (!trimmed) {
    return null;
  }

  let cleaned = trimmed.replace(/[\s-]/g, "");

  if (cleaned.startsWith("00961")) {
    cleaned = `+961${cleaned.slice(5)}`;
  }

  if (cleaned.startsWith("+961")) {
    return cleaned;
  }

  if (cleaned.startsWith("0")) {
    return `+961${cleaned.slice(1)}`;
  }

  const acceptedLocalPrefixes = ["81", "70", "71", "76", "78", "79", "03"];

  if (acceptedLocalPrefixes.some((prefix) => cleaned.startsWith(prefix))) {
    return `+961${cleaned.startsWith("03") ? cleaned.slice(1) : cleaned}`;
  }

  return null;
}

function createWhatsappLink(phone, message) {
  const normalizedPhone = normalizeLebanesePhone(phone);

  if (!normalizedPhone) {
    return null;
  }

  return `https://wa.me/${normalizedPhone.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

function createAcceptedMessage(booking) {
  const goal = booking.message || "No goal written";

  return `Hello ${booking.name},

Your coaching session booking has been accepted.

Location: ${booking.place}
Date: ${booking.date}
Time: ${booking.time}
Goal: ${goal}

Please reply here on WhatsApp so we can confirm the final details.`;
}

function createRejectedMessage(booking) {
  return `Hello ${booking.name}, thank you for your booking request. Unfortunately, this session time is not available. Please send another preferred date or time and I will help you choose a better slot.`;
}

export default function BookingActions({ booking }) {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [whatsappAction, setWhatsappAction] = useState(null);

  async function updateBooking(action) {
    setLoading(action);
    setError("");

    const response = await fetch(`/api/bookings/${booking.id}/${action}`, {
      method: "PATCH",
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Could not update booking.");
      setLoading("");
      return false;
    }

    setLoading("");
    return true;
  }

  async function acceptBooking() {
    const updated = await updateBooking("accept");

    if (!updated) {
      return;
    }

    const whatsappLink = createWhatsappLink(booking.phone, createAcceptedMessage(booking));

    if (whatsappLink) {
      setWhatsappAction({
        href: whatsappLink,
        label: "Message Accepted Client",
        status: "accepted",
      });
      return;
    }

    setError("Booking accepted. WhatsApp link could not be created for this phone number.");
  }

  async function rejectBooking() {
    const updated = await updateBooking("reject");

    if (!updated) {
      return;
    }

    const whatsappLink = createWhatsappLink(booking.phone, createRejectedMessage(booking));

    if (whatsappLink) {
      setWhatsappAction({
        href: whatsappLink,
        label: "Message Rejected Client",
        status: "rejected",
      });
      return;
    }

    setError("Booking rejected. WhatsApp link could not be created for this phone number.");
  }

  if (whatsappAction) {
    return (
      <div className="grid gap-2">
        <p className={`text-xs font-black uppercase ${whatsappAction.status === "accepted" ? "text-[#c6ff2d]" : "text-red-200"}`}>
          {whatsappAction.status}
        </p>
        <a
          href={whatsappAction.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#c6ff2d] px-4 text-center text-xs font-black text-black transition hover:bg-white"
        >
          {whatsappAction.label}
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={acceptBooking}
          disabled={loading !== ""}
          className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#c6ff2d] px-4 text-xs font-black text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading === "accept" ? "Saving..." : "Accept"}
        </button>
        <button
          type="button"
          onClick={rejectBooking}
          disabled={loading !== ""}
          className="inline-flex min-h-10 items-center justify-center rounded-lg border border-red-300/40 bg-red-500/10 px-4 text-xs font-black text-red-200 transition hover:bg-red-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading === "reject" ? "Saving..." : "Reject"}
        </button>
      </div>
      {error && <p className="text-xs font-bold text-red-300">{error}</p>}
    </div>
  );
}
