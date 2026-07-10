"use client";

import Image from "next/image";
import { useState } from "react";

const programs = [
  {
    label: "1:1",
    title: "Personal Training",
    text: "One-on-one training tailored to your goals, fitness level, and lifestyle. Focused attention. Real results.",
    image: "/WhatsApp Image 2026-07-09 at 3.50.06 AM (3).jpeg",
    position: "object-center",
  },
  {
    label: "APP",
    title: "Online Coaching",
    text: "Expert guidance, custom workouts, and ongoing support wherever you are. Stay on track, every day.",
    image: "/WhatsApp Image 2026-07-09 at 3.50.05 AM (1).jpeg",
    position: "object-[48%_center]",
  },
  {
    label: "NUT",
    title: "Nutrition Guidance",
    text: "Personalized nutrition plans that fuel your body, support your goals, and maximize your results.",
    image: "/WhatsApp Image 2026-07-09 at 3.50.06 AM (2).jpeg",
    position: "object-center",
  },
  {
    label: "UP",
    title: "Transformation Program",
    text: "A complete system designed to transform your body, build discipline, and unlock your best self.",
    image: "/coach-abo.jpg.png",
    position: "object-[58%_center]",
  },
];

type Program = (typeof programs)[number];

export default function ProgramsGrid() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  return (
    <>
      <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {programs.map((program) => (
          <button
            key={program.title}
            type="button"
            onClick={() => setSelectedProgram(program)}
            className="group relative min-h-[28rem] overflow-hidden rounded-lg border border-white/18 bg-black text-left shadow-[0_24px_70px_rgba(0,0,0,0.38)] transition duration-300 hover:-translate-y-1 hover:border-[#c6ff2d]/70 focus:outline-none focus-visible:border-[#c6ff2d] focus-visible:ring-2 focus-visible:ring-[#c6ff2d]/45"
          >
            <Image
              src={program.image}
              alt={program.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
              className={`object-cover ${program.position} opacity-76 transition duration-500 group-hover:scale-105 group-hover:opacity-90`}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.4)_43%,rgba(0,0,0,0.95)_100%)]" />
            <div className="absolute left-6 top-7 grid h-20 w-20 place-items-center rounded-full border border-[#c6ff2d]/50 bg-black/62 text-sm font-black text-[#c6ff2d] shadow-[0_0_32px_rgba(198,255,45,0.28)] backdrop-blur-md">
              {program.label}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-7">
              <h2 className="font-display text-3xl font-black uppercase leading-none text-white">
                {program.title}
              </h2>
              <div className="mt-4 h-1 w-10 rounded-full bg-[#c6ff2d]" />
              <p className="mt-5 min-h-[6rem] text-base leading-7 text-white/78">
                {program.text}
              </p>
            </div>
          </button>
        ))}
      </div>

      {selectedProgram && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/86 px-4 py-6 backdrop-blur-md"
          onClick={() => setSelectedProgram(null)}
        >
          <div
            className="relative h-[min(78vh,48rem)] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/12 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.72)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedProgram.image}
              alt={selectedProgram.title}
              fill
              sizes="100vw"
              className={`object-contain ${selectedProgram.position}`}
            />
            <button
              type="button"
              onClick={() => setSelectedProgram(null)}
              aria-label="Close image preview"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/70 text-xl font-black text-white backdrop-blur transition hover:border-[#c6ff2d]/70 hover:text-[#c6ff2d]"
            >
              x
            </button>
          </div>
        </div>
      )}
    </>
  );
}