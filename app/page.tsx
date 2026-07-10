"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BookingForm from "./components/BookingForm";
import SiteHeader from "./components/SiteHeader";

const features = [
  {
    value: "01",
    title: "Personalized Plans",
    text: "Tailored to your goals and lifestyle.",
  },
  {
    value: "02",
    title: "Proven Results",
    text: "Real transformations. Real people.",
  },
  {
    value: "03",
    title: "Nutrition Guidance",
    text: "Fuel your body. Maximize results.",
  },
];

const mobileBenefits = [
  {
    title: "Personalized Plans",
    text: "Training built around your goal, body, and weekly rhythm.",
  },
  {
    title: "Nutrition Guidance",
    text: "Simple food systems that support strength and visible progress.",
  },
  {
    title: "Progress Tracking",
    text: "Clear checkpoints so every phase keeps moving forward.",
  },
];

const mobileNavItems = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Programs" },
  { href: "/transformation", label: "Transformation" },
  { href: "/gallery", label: "Results" },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  function openBookingModal() {
    setMobileMenuOpen(false);
    setIsBookingOpen(true);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <section className="relative overflow-hidden bg-[#030303] text-white md:hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#030303_0%,#050505_44%,#010101_100%)]" />
        <div className="absolute inset-x-0 top-[19.2rem] h-[31rem] bg-[radial-gradient(circle_at_50%_38%,rgba(211,255,0,0.28),transparent_30%),linear-gradient(180deg,transparent_0%,rgba(211,255,0,0.1)_38%,rgba(0,0,0,0.86)_100%)]" />
        <div className="absolute left-1/2 top-[24rem] h-72 w-[22rem] -translate-x-1/2 rounded-full bg-[#d7ff00]/25 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-[430px] pb-8">
          <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/8 bg-black/92 px-7 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            <Link href="/" className="flex min-w-0 items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#d7ff00]/45 bg-black/70 text-lg font-black text-[#d7ff00] shadow-[0_0_22px_rgba(215,255,0,0.2)]">
                AO
              </span>
              <span className="min-w-0 truncate text-xl font-black text-white">
                Coach <span className="text-[#d7ff00]">Abo Okadi</span>
              </span>
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/[0.03] transition hover:border-[#d7ff00]/60"
            >
              <span className="flex w-7 flex-col gap-2">
                <span className={`h-0.5 rounded-full bg-white transition ${mobileMenuOpen ? "translate-y-2.5 rotate-45" : ""}`} />
                <span className={`h-0.5 rounded-full bg-white transition ${mobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`h-0.5 rounded-full bg-white transition ${mobileMenuOpen ? "-translate-y-2.5 -rotate-45" : ""}`} />
              </span>
            </button>
          </header>

          <div className={`grid border-b border-white/8 bg-black/90 px-7 transition-all duration-300 ${mobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <nav className="min-h-0 overflow-hidden">
              <div className="grid gap-2 py-3">
                {mobileNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3 text-sm font-bold text-white/78 transition hover:border-[#d7ff00]/60 hover:text-[#d7ff00]"
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={openBookingModal}
                  className="mt-1 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#d7ff00] px-5 text-sm font-black uppercase text-black transition hover:bg-white"
                >
                  Book a Session
                </button>
              </div>
            </nav>
          </div>

          <div className="animate-mobile-rise px-4 pt-6 text-center">
            <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-[#d7ff00]">
              Personal Training. Real Results.
            </p>
          </div>

          <div className="animate-mobile-rise relative mt-5 min-h-[25rem] px-4" style={{ animationDelay: "90ms" }}>
            <div className="absolute inset-x-[-2rem] top-[4.4rem] text-center font-display text-[8.7rem] font-black uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(215,255,0,0.22)] [text-shadow:0_0_26px_rgba(215,255,0,0.24)]">
              Coach
            </div>
            <div className="absolute inset-x-0 top-0 h-[25.2rem] overflow-hidden">
              <Image
                src="/coach-abo-hero-final.png"
                alt="Coach Abo Okadi in a dark gym"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[61%_center]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.02)_48%,rgba(0,0,0,0.9)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
            </div>

            <div className="absolute left-7 top-[6.8rem] flex items-center gap-3 rounded-xl border border-[#d7ff00]/35 bg-black/72 px-3.5 py-3 text-left shadow-[0_0_30px_rgba(215,255,0,0.2)] backdrop-blur-md">
              <span className="grid h-7 w-7 place-items-center rounded-lg border border-[#d7ff00]/35 text-[#d7ff00]">1</span>
              <span className="text-xs font-black uppercase leading-4 text-white">1:1<br />Coaching</span>
            </div>
            <div className="absolute bottom-[1.3rem] left-7 flex items-center gap-3 rounded-xl border border-[#d7ff00]/35 bg-black/72 px-3.5 py-3 text-left shadow-[0_0_30px_rgba(215,255,0,0.2)] backdrop-blur-md">
              <span className="grid h-7 w-7 place-items-center rounded-lg border border-[#d7ff00]/35 text-[#d7ff00]">+</span>
              <span className="text-xs font-black uppercase leading-4 text-white">Custom<br />Plans</span>
            </div>
            <div className="absolute right-5 top-[14rem] flex items-center gap-3 rounded-xl border border-[#d7ff00]/35 bg-black/72 px-3.5 py-3 text-left shadow-[0_0_30px_rgba(215,255,0,0.2)] backdrop-blur-md">
              <span className="grid h-7 w-7 place-items-center rounded-lg border border-[#d7ff00]/35 text-[#d7ff00]">V</span>
              <span className="text-xs font-black uppercase leading-4 text-white">Real<br />Results</span>
            </div>
          </div>

          <div className="animate-mobile-rise px-4 text-center" style={{ animationDelay: "150ms" }}>
            <p className="mx-auto max-w-[21rem] text-[1rem] leading-7 text-white/86">
              Personalized training, custom workout plans,<br />and expert nutrition guidance designed<br />for <span className="font-black text-[#d7ff00]">real results</span>.
            </p>

            <div className="mt-7 grid gap-4 px-1">
              <Link href="https://wa.me/96178877130?text=Hi%20Coach%20Abo%2C%20I%20want%20to%20start%20training." target="_blank" rel="noopener noreferrer" className="inline-flex min-h-16 items-center justify-center rounded-2xl bg-[#d7ff00] px-6 text-xl font-black uppercase tracking-wide !text-black shadow-[0_0_50px_rgba(215,255,0,0.48)] transition active:scale-[0.98]">
                Start Training
              </Link>
              <button
                type="button"
                onClick={openBookingModal}
                className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#d7ff00] px-6 text-base font-black uppercase tracking-wide text-black shadow-[0_0_42px_rgba(215,255,0,0.38)] transition hover:bg-white active:scale-[0.98]"
              >
                Book a Session
              </button>
            </div>
          </div>

          <section id="why-train" className="animate-mobile-rise px-4 pt-10 text-center" style={{ animationDelay: "220ms" }}>
            <div className="flex items-center gap-4">
              <span className="h-px flex-1 bg-[#d7ff00]/30" />
              <h2 className="text-[1.08rem] font-black uppercase tracking-[0.18em] text-[#d7ff00]">Why Train With Me?</h2>
              <span className="h-px flex-1 bg-[#d7ff00]/30" />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {mobileBenefits.map((item) => (
                <article key={item.title} className="min-h-[10.2rem] rounded-2xl border border-[#d7ff00]/14 bg-white/[0.04] px-2.5 py-4 shadow-[0_18px_46px_rgba(0,0,0,0.38)] backdrop-blur-md">
                  <div className="mx-auto h-10 w-10 rounded-full border border-[#d7ff00]/35 bg-[#d7ff00]/8 shadow-[0_0_22px_rgba(215,255,0,0.16)]" />
                  <h3 className="mt-4 text-[0.76rem] font-black uppercase leading-4 text-white">{item.title}</h3>
                  <div className="mx-auto mt-4 h-1 w-9 rounded-full bg-[#d7ff00]" />
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>      <section className="hidden min-h-[100svh] bg-[#050505] px-3 py-3 sm:px-5 sm:py-5 md:block lg:px-6">
        <div className="relative mx-auto flex min-h-[calc(100svh-1.5rem)] max-w-[1440px] overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.58)] sm:min-h-[calc(100svh-2.5rem)]">
          <div className="absolute bottom-2 right-[1%] top-20 hidden w-[80%] md:block lg:right-[2%] lg:top-16 lg:w-[74%] xl:right-[3%] xl:top-12 xl:w-[70%]">
            <Image
              src="/coach-abo-hero-final.png"
              alt="Coach Abo Okadi standing in a dark gym"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 70vw"
              className="object-contain object-center"
            />
          </div>

          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(0,0,0,0.97)_0%,rgba(0,0,0,0.9)_34%,rgba(0,0,0,0.35)_61%,rgba(0,0,0,0.22)_100%)] md:block" />
          <div className="absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.25)_55%,rgba(0,0,0,0.72)_100%)] md:block" />

          <div className="relative z-10 flex w-full flex-col px-3 py-3 sm:px-5 sm:py-5 lg:px-8">
            <SiteHeader />

            <div className="grid flex-1 gap-5 pt-7 md:grid-cols-[minmax(0,0.88fr)_minmax(18rem,0.75fr)] md:items-center md:gap-6 md:pt-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(24rem,0.98fr)] lg:pt-10">
              <div className="relative z-10 max-w-[42rem]">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/14 bg-black/55 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#c6ff2d] shadow-[0_12px_36px_rgba(0,0,0,0.25)] backdrop-blur sm:gap-3 sm:px-4 sm:text-xs sm:tracking-[0.16em]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#c6ff2d] shadow-[0_0_18px_rgba(198,255,45,0.9)]" />
                  Personal training. Real results.
                </div>

                <h1 className="mt-5 max-w-[44rem] font-display text-[clamp(2.65rem,13vw,4.45rem)] font-black uppercase leading-[0.92] text-white sm:mt-6 sm:text-[4.9rem] md:text-[2.8rem] lg:text-[3.35rem] xl:text-[3.9rem]">
                  <span className="block md:whitespace-nowrap">Transform your body.</span>
                  <span className="block text-[#c6ff2d] md:whitespace-nowrap">Build your confidence.</span>
                </h1>

                <p className="mt-5 max-w-[31rem] text-base leading-7 text-white/76 sm:text-lg sm:leading-8 lg:text-xl">
                  Personalized training, custom workout plans, and expert nutrition guidance designed for you, built for <span className="font-bold text-[#c6ff2d]">real results</span>.
                </p>

                <div className="mt-7 grid gap-3 sm:flex sm:items-center sm:gap-4 lg:mt-9">
                  <Link
                    href="https://wa.me/96178877130?text=Hi%20Coach%20Abo%2C%20I%20want%20to%20start%20training."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden min-h-16 items-center justify-center rounded-2xl bg-[#d7ff00] px-8 text-base font-black uppercase tracking-wide text-black shadow-[0_0_50px_rgba(215,255,0,0.42)] transition duration-200 hover:-translate-y-0.5 hover:bg-white sm:inline-flex"
                  >
                    Start Training
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 border-t border-white/10 bg-black/35 p-3 shadow-[0_18px_50px_rgba(0,0,0,0.3)] backdrop-blur-md sm:grid-cols-3 lg:mt-6 lg:max-w-[38rem]">
              {features.map((item) => (
                <div key={item.title} className="rounded-lg border border-white/10 bg-white/[0.035] p-4 transition duration-200 hover:border-[#c6ff2d]/45 hover:bg-white/[0.06]">
                  <p className="text-sm font-black text-[#c6ff2d]">{item.value}</p>
                  <h2 className="mt-5 text-sm font-black leading-5 text-white">{item.title}</h2>
                  <p className="mt-1 text-xs leading-5 text-white/58">{item.text}</p>
                </div>
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
      )}    </main>
  );
}