import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "../components/SiteHeader";
import ProgramsGrid from "./ProgramsGrid";

export const metadata: Metadata = {
  title: "Programs | Coach Abo Okadi",
  description: "Choose a personal training, online coaching, nutrition, or body transformation program.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030303] text-white">
      <section className="relative min-h-screen overflow-hidden px-3 py-3 sm:px-5 sm:py-5 lg:px-7">
        <Image
          src="/coach-abo-hero-final.png"
          alt="Dark gym background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(198,255,45,0.18),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.92)_45%,#030303_100%)]" />
        <div className="absolute right-[10%] top-[9rem] hidden border-l-4 border-[#c6ff2d] py-6 pl-4 font-display text-3xl font-black uppercase leading-tight text-[#c6ff2d]/45 blur-[0.2px] lg:block">
          Discipline<br />Focus<br />Consistency<br />Results
        </div>

        <div className="relative z-10 mx-auto max-w-[1480px]">
          <SiteHeader />

          <div className="mx-auto mt-8 max-w-[78rem] text-center sm:mt-10 lg:mt-12">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/14 bg-black/60 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#c6ff2d] shadow-[0_16px_48px_rgba(0,0,0,0.42)] backdrop-blur">
              <span className="h-2 w-8 rounded-full bg-[#c6ff2d] shadow-[0_0_22px_rgba(198,255,45,0.65)]" />
              Training programs. Real results.
            </div>

            <h1 className="mx-auto mt-6 max-w-[72rem] font-display text-[3.2rem] font-black uppercase leading-[0.93] text-white sm:text-[5.4rem] lg:text-[6rem]">
              Choose your <span className="text-[#c6ff2d]">training program.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-[43rem] text-lg leading-8 text-white/74 sm:text-xl">
              Personalized training, expert coaching, and proven strategies built to help you achieve <span className="font-bold text-[#c6ff2d]">real</span>, lasting results.
            </p>
          </div>
          <ProgramsGrid />
        </div>
      </section>
    </main>
  );
}
