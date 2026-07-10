import Image from "next/image";
import BookingForm from "../components/BookingForm";
import SiteHeader from "../components/SiteHeader";

export default function BookingPage() {
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
            className="object-cover object-center opacity-55"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.9)_40%,rgba(0,0,0,0.5)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.36)_52%,rgba(0,0,0,0.84)_100%)]" />

          <div className="relative z-10 flex w-full flex-col px-3 py-3 sm:px-5 sm:py-5 lg:px-8">
            <SiteHeader dark />

            <div className="grid flex-1 gap-8 py-10 sm:py-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(22rem,0.72fr)] lg:items-center lg:gap-12 lg:py-16">
              <div className="max-w-[43rem]">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-black/55 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#c6ff2d] shadow-[0_12px_36px_rgba(0,0,0,0.25)] backdrop-blur sm:px-4 sm:text-xs">
                  <span className="h-2 w-2 rounded-full bg-[#c6ff2d] shadow-[0_0_18px_rgba(198,255,45,0.9)]" />
                  Start Training
                </div>

                <h1 className="mt-5 font-display text-[clamp(2.7rem,11vw,4.8rem)] font-black uppercase leading-[0.9] text-white sm:mt-7 lg:text-[5rem]">
                  Book your training session.
                </h1>

                <p className="mt-6 max-w-[34rem] text-base leading-7 text-white/76 sm:text-xl sm:leading-9">
                  Choose your preferred date and time, share your goal, and Coach Abo Okadi will contact you to confirm the session.
                </p>
              </div>

              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
