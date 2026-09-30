import Image from "next/image";
import { INDUSTRIES } from "@/data/content";
import { Section } from "./section";

export function Industries() {
  return (
    <Section id="industrias" title={INDUSTRIES.title} titleWidth="max-w-[19ch]">
      <p className="reveal -mt-6 mb-14 max-w-[50ch] text-lg leading-relaxed text-paper/80 md:mb-20 md:text-xl">
        {INDUSTRIES.text}
      </p>

      <ul className="grid grid-cols-2 gap-px border border-paper/20 bg-paper/20 lg:grid-cols-5">
        {INDUSTRIES.items.map((it, i) => (
          <li key={it.name} className="reveal bg-ink" style={{ ["--d" as string]: `${(i % 5) * 60}ms` }}>
            <figure className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-deep">
                <Image
                  src={it.image}
                  alt={it.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <figcaption className="flex flex-col gap-1 px-3 py-4 xl:flex-row xl:items-baseline xl:gap-3 font-mono text-[11px] uppercase leading-tight tracking-[0.1em] transition-colors duration-200 group-hover:bg-signal group-hover:text-ink md:px-4 md:text-xs">
                <span className="text-signal group-hover:text-ink">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 [overflow-wrap:anywhere]">{it.name}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
