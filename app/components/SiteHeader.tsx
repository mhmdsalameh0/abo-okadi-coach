"use client";

import Link from "next/link";
import { useState } from "react";
import BookingForm from "./BookingForm";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Programs" },
  { href: "/transformation", label: "Transformation" },
  { href: "/gallery", label: "Results" },
];

export default function SiteHeader({ dark = true }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  void dark;

  function openBookingModal() {
    setOpen(false);
    setIsBookingOpen(true);
  }

  function closeBookingModal() {
    setIsBookingOpen(false);
  }

  return (
    <>
      <header className="relative z-30 rounded-xl border border-white/10 bg-black/70 px-3 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:px-5 lg:px-6">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#c6ff2d]/70 text-base font-black text-[#c6ff2d] shadow-[0_0_22px_rgba(198,255,45,0.22)] sm:h-11 sm:w-11">
              AO
            </span>
            <span className="min-w-0 truncate text-sm font-black text-white sm:text-base">
              Coach <span className="text-[#c6ff2d]">Abo Okadi</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 text-sm font-bold text-white/72 lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-[#c6ff2d]">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openBookingModal}
              className="hidden h-11 items-center justify-center rounded-lg bg-[#c6ff2d] px-5 text-sm font-black text-black shadow-[0_0_28px_rgba(198,255,45,0.2)] transition hover:-translate-y-0.5 hover:bg-white sm:inline-flex"
            >
              Book a Session
            </button>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/12 bg-white/[0.04] transition hover:border-[#c6ff2d]/60 lg:hidden"
            >
              <span className="flex w-4 flex-col gap-1.5">
                <span className={`h-0.5 rounded-full bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`h-0.5 rounded-full bg-white transition ${open ? "opacity-0" : ""}`} />
                <span className={`h-0.5 rounded-full bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>

        <div className={`grid transition-all duration-300 lg:hidden ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <nav className="min-h-0 overflow-hidden">
            <div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3 text-sm font-bold text-white/78 transition hover:border-[#c6ff2d]/60 hover:text-[#c6ff2d]"
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={openBookingModal}
                className="mt-1 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#c6ff2d] px-5 text-sm font-black text-black transition hover:bg-white"
              >
                Book a Session
              </button>
            </div>
          </nav>
        </div>
      </header>

      {isBookingOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/78 px-4 py-6 backdrop-blur-md"
          onClick={closeBookingModal}
        >
          <div className="relative w-full max-w-xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={closeBookingModal}
              aria-label="Close booking form"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-lg border border-white/12 bg-white/[0.06] text-xl font-black text-white transition hover:border-[#c6ff2d]/70 hover:text-[#c6ff2d]"
            >
              x
            </button>
            <BookingForm />
          </div>
        </div>
      )}
    </>
  );
}
