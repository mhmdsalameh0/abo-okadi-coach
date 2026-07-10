"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BookingForm from "./BookingForm";
import SiteHeader from "./SiteHeader";

type InnerPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function InnerPageHero({
  eyebrow,
  title,
  description,
}: InnerPageHeroProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <section className="min-h-[100svh] bg-[#050505] px-3 py-3 sm:px-5 sm:py-5 lg:px-6">
        <div className="relative mx-auto flex min-h-[calc(100svh-1.5rem)] max-w-[1440px] overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.58)] sm:min-h-[calc(100svh-2.5rem)]">
          <Image
            src="/coach-abo-hero-final.png"
            alt="Coach Abo Okadi standing in a dark gym"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.92)_38%,rgba(0,0,0,0.48)_68%,rgba(0,0,0,0.22)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0.24)_52%,rgba(0,0,0,0.78)_100%)]" />

          <div className="relative z-10 flex w-full flex-col px-3 py-3 sm:px-5 sm:py-5 lg:px-8">
            <SiteHeader dark />

            <div className="grid flex-1 gap-8 py-12 sm:py-16 lg:grid-cols-[minmax(0,0.82fr)_minmax(22rem,0.9fr)] lg:items-center lg:py-20">
              <div className="max-w-[46rem]">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-black/55 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#c6ff2d] shadow-[0_12px_36px_rgba(0,0,0,0.25)] backdrop-blur sm:px-4 sm:text-xs">
                  <span className="h-2 w-2 rounded-full bg-[#c6ff2d] shadow-[0_0_18px_rgba(198,255,45,0.9)]" />
                  {eyebrow}
                </div>

                <h1 className="mt-5 font-display text-[clamp(2.7rem,12vw,4.5rem)] font-black uppercase leading-[0.9] text-white sm:mt-7 sm:text-[5rem] lg:text-[5.4rem]">
                  {title}
                </h1>

                <p className="mt-6 max-w-[34rem] text-base leading-7 text-white/76 sm:text-xl sm:leading-9">
                  {description}
                </p>

                <div className="mt-8 grid gap-3 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setIsBookingOpen(true)}
                    className="inline-flex min-h-13 items-center justify-center rounded-lg bg-[#c6ff2d] px-6 text-sm font-black text-black shadow-[0_0_35px_rgba(198,255,45,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-white"
                  >
                    Book a Session
                  </button>
                  <Link
                    href="/"
                    className="inline-flex min-h-13 items-center justify-center rounded-lg border border-white/18 bg-white/[0.04] px-6 text-sm font-bold text-white shadow-[0_16px_45px_rgba(0,0,0,0.22)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-[#c6ff2d]/70 hover:text-[#c6ff2d]"
                  >
                    Back Home
                  </Link>
                </div>
              </div>

              <div className="hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {isBookingOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/78 px-4 py-6 backdrop-blur-md"
          onClick={() => setIsBookingOpen(false)}
        >
          <div className="relative w-full max-w-xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsBookingOpen(false)}
              aria-label="Close booking form"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-lg border border-white/12 bg-white/[0.06] text-xl font-black text-white transition hover:border-[#c6ff2d]/70 hover:text-[#c6ff2d]"
            >
              x
            </button>
            <BookingForm />
          </div>
        </div>
      )}
    </main>
  );
}
