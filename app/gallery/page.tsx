import Link from "next/link";
import SiteHeader from "../components/SiteHeader";

const stats = [
  { icon: "?", value: "+5", label: "Years Experience", text: "Helping clients achieve lasting results." },
  { icon: "?", value: "+100", label: "Clients Transformed", text: "Real people. Real progress. Real stories." },
  { icon: "?", value: "1-on-1", label: "Coaching", text: "Personalized attention. Maximum accountability." },
  { icon: "?", value: "Custom", label: "Plans", text: "Tailored strategies built for you." },
];

const services = [
  {
    icon: "?",
    title: "Personal Training",
    text: "Focused 1-on-1 sessions designed to build strength, improve performance, and transform your body.",
  },
  {
    icon: "?",
    title: "Nutrition Guidance",
    text: "Expert nutrition strategies that fit your lifestyle and fuel your goals for real, sustainable results.",
  },
  {
    icon: "?",
    title: "Workout Plans",
    text: "Custom workout programs built around your goals, experience level, and schedule.",
  },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <section className="min-h-[100svh] bg-[#050505] px-3 py-3 sm:px-5 sm:py-5 lg:px-6">
        <div className="relative mx-auto min-h-[calc(100svh-1.5rem)] max-w-[1440px] overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.58)] sm:min-h-[calc(100svh-2.5rem)]">
          <div className="absolute inset-0 bg-[url('/coach-abo-hero-final.png')] bg-cover bg-[70%_center] opacity-22" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.91)_44%,rgba(0,0,0,0.62)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_22%,rgba(198,255,45,0.18),transparent_24%),linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.78)_100%)]" />

          <div className="relative z-10 flex min-h-[inherit] flex-col px-3 py-3 sm:px-5 sm:py-5 lg:px-8">
            <SiteHeader dark />

            <div className="flex flex-1 items-center py-8 sm:py-10 lg:py-12">
              <div className="w-full">
                <div className="inline-flex items-center gap-2 rounded-lg border border-[#c6ff2d]/25 bg-black/55 px-3 py-2 text-[0.66rem] font-black uppercase tracking-[0.16em] text-[#c6ff2d] shadow-[0_12px_35px_rgba(0,0,0,0.28)] backdrop-blur">
                  <span className="text-sm">?</span>
                  Why clients choose me
                </div>

                <h1 className="mt-5 max-w-[56rem] font-display text-[clamp(2.15rem,5.7vw,4.35rem)] font-black uppercase leading-[0.96] tracking-normal text-white">
                  Experience. Results. <span className="text-[#c6ff2d]">Transformation.</span>
                </h1>

                <p className="mt-4 max-w-[42rem] text-sm leading-6 text-white/74 sm:text-base sm:leading-7">
                  Every program is built around you, your goals, your lifestyle, your potential. Real support. Real strategies. <span className="font-black text-[#c6ff2d]">Real results.</span>
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {stats.map((item) => (
                    <article key={item.label} className="min-h-[10.2rem] rounded-xl border border-white/12 bg-white/[0.045] p-4 text-center shadow-[0_22px_70px_rgba(0,0,0,0.38)] backdrop-blur-md transition hover:border-[#c6ff2d]/45 hover:bg-white/[0.065]">
                      <div className="mx-auto grid h-10 w-10 place-items-center text-3xl font-black text-[#c6ff2d]">{item.icon}</div>
                      <p className="mt-3 font-display text-3xl font-black uppercase leading-none text-[#c6ff2d] sm:text-4xl">{item.value}</p>
                      <h2 className="mt-3 text-sm font-black text-white">{item.label}</h2>
                      <p className="mx-auto mt-2 max-w-[12rem] text-xs leading-5 text-white/56">{item.text}</p>
                    </article>
                  ))}
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-3">
                  {services.map((service) => (
                    <article key={service.title} className="flex gap-4 rounded-xl border border-white/12 bg-white/[0.04] p-4 shadow-[0_20px_65px_rgba(0,0,0,0.34)] backdrop-blur-md transition hover:border-[#c6ff2d]/45 hover:bg-white/[0.06]">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#c6ff2d]/25 bg-[#c6ff2d]/8 text-2xl font-black text-[#c6ff2d]">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-black text-white">{service.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-white/58">{service.text}</p>
                        <Link href="/services" className="mt-4 inline-flex items-center gap-2 text-xs font-black text-[#c6ff2d] transition hover:text-white">
                          Learn More <span>-&gt;</span>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-5 flex justify-center">
                  <Link href="/services" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#c6ff2d] px-7 text-sm font-black text-black shadow-[0_0_35px_rgba(198,255,45,0.34)] transition hover:-translate-y-0.5 hover:bg-white">
                    Explore All Services <span className="ml-3">-&gt;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

