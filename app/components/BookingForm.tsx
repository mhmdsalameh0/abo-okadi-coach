"use client";

import type { FormEvent } from "react";
import { useState } from "react";

const emptyForm = {
  name: "",
  place: "",
  phone: "",
  date: "",
  time: "",
  message: "",
};

export default function BookingForm() {
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  function updateField(field: keyof typeof emptyForm, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");

    const requiredFields = [formData.name, formData.place, formData.phone, formData.date, formData.time];

    if (requiredFields.some((value) => value.trim() === "")) {
      setStatus("error");
      setFeedback("Please fill in your name, location, phone, date, and time.");
      return;
    }

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));
      const errorMessage = typeof result.error === "string" ? result.error : "The booking email could not be sent. Please try again.";
      const successMessage = typeof result.message === "string" ? result.message : "Your booking request was sent successfully.";

      if (!response.ok) {
        setStatus("error");
        setFeedback(errorMessage);
        return;
      }

      setStatus("success");
      setFeedback(successMessage);
      setFormData(emptyForm);
    } catch {
      setStatus("error");
      setFeedback("Could not send the booking request. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-white/10 bg-black/76 p-4 shadow-[0_28px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-6">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#c6ff2d]">Booking Request</p>
        <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">Book a Session</h2>
        <p className="mt-2 text-sm leading-6 text-white/62">Send your details and I will contact you to confirm your session.</p>
      </div>

      <div className="mt-6 grid gap-3">
        <label className="grid gap-2 text-sm font-bold text-white/76">
          Full name
          <input
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Your full name"
            className="min-h-12 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-white/34 focus:border-[#c6ff2d]"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-white/76">Location<input
            value={formData.place}
            onChange={(event) => updateField("place", event.target.value)}
            placeholder="Example: Saida"
            className="min-h-12 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-white/34 focus:border-[#c6ff2d]"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-white/76">
          Phone number
          <input
            value={formData.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="Example: 81 123 456 or 03 123 456"
            className="min-h-12 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-white/34 focus:border-[#c6ff2d]"
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-white/76">
            Preferred date
            <input
              value={formData.date}
              onChange={(event) => updateField("date", event.target.value)}
              type="date"
              className="booking-picker min-h-12 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-[#c6ff2d]"
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-white/76">
            Preferred time
            <input
              value={formData.time}
              onChange={(event) => updateField("time", event.target.value)}
              type="time"
              className="booking-picker min-h-12 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-[#c6ff2d]"
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-bold text-white/76">
          Message / goal
          <textarea
            value={formData.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Tell me your goal"
            rows={5}
            className="resize-none rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/34 focus:border-[#c6ff2d]"
          />
        </label>
      </div>

      {feedback && (
        <p className={`mt-4 text-sm font-bold ${status === "success" ? "text-[#c6ff2d]" : "text-red-300"}`}>
          {feedback}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 min-h-13 w-full rounded-lg bg-[#c6ff2d] px-6 text-sm font-black text-black shadow-[0_0_35px_rgba(198,255,45,0.24)] transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Booking"}
      </button>
    </form>
  );
}



