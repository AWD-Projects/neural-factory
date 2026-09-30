import Image from "next/image";
import { TEAM } from "@/data/content";
import { ArrowUpRight } from "./icons";
import { Section } from "./section";

export function Team() {
  return (
    <Section id="equipo" index="02" label="Equipo" title={TEAM.title} titleWidth="max-w-[16ch]">
      <p className="reveal -mt-6 mb-14 max-w-[52ch] text-lg leading-relaxed text-paper/80 md:mb-20 md:text-xl">
        {TEAM.intro}
      </p>

      <ul className="grid gap-x-6 gap-y-16 md:grid-cols-3">
        {TEAM.people.map((p, i) => (
          <li key={p.name} className="reveal md:[&:nth-child(2)]:mt-16" style={{ ["--d" as string]: `${i * 90}ms` }}>
            <article>
              <figure className="crop relative aspect-[4/5] w-full max-w-[320px] overflow-hidden bg-ink-deep">
                <Image
                  src={p.photo}
                  alt={`Retrato de ${p.name}`}
                  fill
                  sizes="(min-width: 768px) 320px, 70vw"
                  className="object-cover"
                />
              </figure>

              <h3 className="display mt-8 text-2xl md:text-[1.75rem]" style={{ ["--wdth" as string]: 114 }}>
                {p.name}
              </h3>
              <p className="eyebrow mt-2 !text-signal">{p.role}</p>
              <p className="mt-5 max-w-[46ch] leading-relaxed text-paper/80">{p.bio}</p>

              <a
                href={p.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line mt-6"
              >
                Saluda a {p.first} en LinkedIn
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
