import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Transformation | Coach Abo Okadi",
  description: "Real transformation result with Coach Abo Okadi.",
};

const transformationImage = "/WhatsApp Image 2026-07-03 at 3.53.36 AM.jpeg";

export default function TransformationPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030303] text-white">
      <section className="relative min-h-screen overflow-hidden px-3 py-3 sm:px-5 sm:py-5 lg:px-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(198,255,45,0.12),transparent_24%),linear-gradient(180deg,#050505_0%,#030303_48%,#000_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-1.5rem)] max-w-[1120px] flex-col sm:min-h-[calc(100svh-2.5rem)]">
          <SiteHeader />

          <div className="flex flex-1 flex-col items-center py-8 text-center sm:py-10 lg:py-12">
            <h1 className="font-display text-[clamp(2.8rem,7vw,5.4rem)] font-black uppercase leading-[0.9] text-white">
              Real <span className="text-[#c6ff2d]">Transformation</span>
            </h1>

            <div className="mt-8 w-full max-w-[44rem] overflow-hidden rounded-2xl border border-white/12 bg-black shadow-[0_34px_110px_rgba(0,0,0,0.58)] sm:mt-10">
              <div className="relative aspect-[1093/1439] w-full">
                <Image
                  src={transformationImage}
                  alt="60 days client transformation before and after"
                  fill
                  priority
                  sizes="(max-width: 768px) 94vw, 44rem"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}