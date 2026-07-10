"use client";

import Image from "next/image";
import { useState } from "react";
import BookingForm from "../components/BookingForm";
import SiteHeader from "../components/SiteHeader";

const features = [
  {
    icon: "?",
    title: "Personalized Plans",
    text: "Training programs designed for your body and goals.",
  },
  {
    icon: "?",
    title: "Real Follow-Up",
    text: "Progress tracking, support, and adjustments when needed.",
  },
  {
    icon: "?",
    title: "Nutrition Guidance",
    text: "Simple and practical nutrition advice to help you get better results.",
  },
  {
    icon: "?",
    title: "Proven Results",
    text: "A coaching system built on discipline, consistency, and results.",
  },
];

const aboutPhoto = "/WhatsApp Image 2026-07-09 at 3.50.06 AM (2).jpeg";

export default function AboutPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <section className="min-h-[100svh] bg-[#050505] px-3 py-3 sm:px-5 sm:py-5 lg:px-6">
        <div className="relative mx-auto min-h-[calc(100svh-1.5rem)] max-w-[1440px] overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.58)] sm:min-h-[calc(100svh-2.5rem)]">
          <div
            className="absolute inset-0 bg-cover bg-[62%_center] opacity-28"
            style={{ backgroundImage: `url("${aboutPhoto}")` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.9)_42%,rgba(0,0,0,0.44)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_30%,rgba(198,255,45,0.15),transparent_24%),linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.8)_100%)]" />

          <div className="relative z-10 flex min-h-[inherit] flex-col px-3 py-3 sm:px-5 sm:py-5 lg:px-8">
            <SiteHeader dark />

            <div className="grid flex-1 gap-8 py-8 sm:py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,0.82fr)] lg:items-center lg:py-12">
              <div className="max-w-[43rem]">
                <div className="inline-flex items-center gap-2 rounded-lg border border-[#c6ff2d]/25 bg-black/60 px-3 py-2 text-[0.66rem] font-black uppercase tracking-[0.16em] text-[#c6ff2d] shadow-[0_12px_35px_rgba(0,0,0,0.28)] backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[#c6ff2d] shadow-[0_0_16px_rgba(198,255,45,0.85)]" />
                  Personal Fitness Coach
                </div>

                <h1 className="mt-5 max-w-[38rem] font-display text-[clamp(2.6rem,6vw,4.65rem)] font-black uppercase leading-[0.92] text-white">
                  About <span className="block text-[#c6ff2d]">Coach Abo Okadi</span>
                </h1>

                <div className="mt-6 max-w-[36rem] border-l-2 border-[#c6ff2d]/75 pl-5 text-lg font-semibold leading-8 text-white sm:text-xl sm:leading-9">
                  Building stronger bodies with structured training, practical nutrition, and consistent one-to-one follow-up.
                </div>

                <div className="mt-6 max-w-[36rem] space-y-4 text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
                  <p>
                    Coach Abo Okadi helps clients lose fat, build lean muscle, and improve their confidence through programs designed around their body, goal, and lifestyle.
                  </p>
                  <p>
                    Each plan combines focused workouts, simple nutrition guidance, and clear progress tracking so every step has purpose and direction.
                  </p>
                  <p>
                    Whether you are starting from zero or pushing for the next level, the coaching is direct, disciplined, and built to deliver real results.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsBookingOpen(true)}
                  className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#c6ff2d] px-6 text-sm font-black text-black shadow-[0_0_35px_rgba(198,255,45,0.34)] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <span className="mr-3">?</span>
                  Book a Session
                </button>
              </div>

              <div className="relative min-h-[25rem] overflow-hidden rounded-2xl border border-white/10 bg-black/28 shadow-[0_24px_70px_rgba(0,0,0,0.48)] sm:min-h-[31rem] lg:min-h-[34rem] lg:border-0 lg:bg-transparent lg:shadow-none">
                <Image
                  src={aboutPhoto}
                  alt="Coach Abo Okadi"
                  fill
                  priority
                  sizes="42vw"
                  className="rounded-[1.5rem] object-cover object-center drop-shadow-[0_35px_80px_rgba(0,0,0,0.72)]"
                />
              </div>
            </div>

            <div className="grid gap-4 pb-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((item) => (
                <article key={item.title} className="min-h-[10.5rem] rounded-xl border border-white/12 bg-white/[0.04] p-5 text-center shadow-[0_20px_65px_rgba(0,0,0,0.34)] backdrop-blur-md transition hover:border-[#c6ff2d]/45 hover:bg-white/[0.06]">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-[#c6ff2d]/25 bg-[#c6ff2d]/8 text-2xl font-black text-[#c6ff2d]">
                    {item.icon}
                  </div>
                  <h2 className="mt-4 text-sm font-black text-white">{item.title}</h2>
                  <p className="mx-auto mt-2 max-w-[13rem] text-xs leading-5 text-white/58">{item.text}</p>
                </article>
              ))}
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


