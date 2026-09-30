import Image from "next/image";
import { SERVICES } from "@/data/content";
import { AreaLink } from "./area-link";
import { ArrowRight } from "./icons";
import { Section } from "./section";

export function Services() {
  return (
    <Section id="servicios" title={SERVICES.title} titleWidth="max-w-[20ch]">
      <p className="reveal -mt-6 mb-14 max-w-[54ch] text-lg leading-relaxed text-paper/80 md:mb-20 md:text-xl">
        {SERVICES.intro}
      </p>

      <ol className="border-b border-paper/25">
        {SERVICES.items.map((s, i) => (
          <li key={s.title} className="reveal">
            <article className="group grid items-center gap-x-6 gap-y-5 border-t border-paper/25 px-1 py-8 transition-colors duration-300 focus-within:bg-signal focus-within:text-ink hover:bg-signal hover:text-ink md:grid-cols-12 md:px-5 md:py-9">
              <p className="font-mono text-xs md:col-span-1">
                <span className="text-signal group-focus-within:text-ink group-hover:text-ink">0{i + 1}</span>
              </p>

              <h3
                className="display text-2xl leading-[1.04] md:col-span-4 md:text-[1.9rem]"
                style={{ ["--wdth" as string]: 114 }}
              >
                {s.title}
              </h3>

              <div className="md:col-span-4">
                <p className="leading-relaxed text-paper/80 group-focus-within:text-ink/90 group-hover:text-ink/90">
                  {s.text}
                </p>
                <AreaLink
                  area={s.title}
                  className="btn-line mt-5 group-focus-within:!border-ink group-focus-within:!text-ink group-hover:!border-ink group-hover:!text-ink"
                >
                  Consultar este servicio
                  <ArrowRight className="h-4 w-4" />
                </AreaLink>
              </div>

              <figure className="relative aspect-[16/10] w-full overflow-hidden bg-ink-deep md:col-span-3">
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 90vw"
                  className="object-cover"
                />
              </figure>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
