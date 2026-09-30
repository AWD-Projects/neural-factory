import { CTA, HERO, NAV } from "@/data/content";
import { ArrowDown, ArrowRight } from "./icons";
import { NetworkSphere } from "./network-sphere";

export function Hero() {
  const words = HERO.titleText.split(" ");

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Motivo de marca: detrás del contenido, baja opacidad, sin cruzar textos clave */}
      <NetworkSphere className="pointer-events-none absolute -right-[38%] top-[14%] z-0 h-[min(125vw,900px)] w-[min(125vw,900px)] opacity-40 sm:-right-[14%] sm:top-[4%] sm:opacity-55 lg:-right-[6%] xl:right-[1%]" />

      <div className="container-page relative z-10 flex min-h-[100svh] flex-col pt-[calc(var(--header-h)+3.5rem)] md:pt-[calc(var(--header-h)+6rem)]">
        <p className="eyebrow fade-in" style={{ ["--d" as string]: "40ms" }}>
          {HERO.eyebrow}
        </p>

        <h1
          id="hero-title"
          className="display mt-8 max-w-[11.5em] text-[clamp(2.3rem,6.4vw,5.9rem)] leading-[0.96]"
          style={{ ["--wdth" as string]: 112 }}
        >
          {words.map((word, i) => (
            <span key={i}>
              <span className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
                <span className="rise" style={{ ["--i" as string]: i }}>
                  {word}
                </span>
              </span>{" "}
            </span>
          ))}
        </h1>

        <p
          className="fade-in mt-8 max-w-[54ch] text-lg leading-relaxed text-paper/80 md:mt-10 md:text-xl"
          style={{ ["--d" as string]: "700ms" }}
        >
          {HERO.lead}
        </p>

        <div
          className="fade-in mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
          style={{ ["--d" as string]: "850ms" }}
        >
          <a href={CTA.href} className="btn">
            {CTA.label}
            <ArrowRight />
          </a>
          <a href={HERO.secondary.href} className="btn-line">
            {HERO.secondary.label}
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>

        {/* Índice de la página: también sirve de enlazado interno */}
        <nav
          aria-label="Contenido de la página"
          className="fade-in mt-auto pt-20 md:pt-28"
          style={{ ["--d" as string]: "1000ms" }}
        >
          <ol className="grid grid-cols-2 border-t border-paper/25 md:grid-cols-5">
            {NAV.map((item, i) => (
              <li key={item.id} className="border-b border-paper/15 md:border-b-0 md:border-r md:last:border-r-0">
                <a
                  href={`#${item.id}`}
                  className="group flex items-baseline justify-between gap-3 px-1 py-5 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:bg-signal hover:text-ink md:px-5"
                >
                  <span>
                    <span className="mr-3 text-signal group-hover:text-ink">0{i + 1}</span>
                    {item.label}
                  </span>
                  <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
