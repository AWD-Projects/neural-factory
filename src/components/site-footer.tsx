import { FOOTER, SITE, TEAM } from "@/data/content";
import { ArrowUpRight, Linkedin } from "./icons";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden pt-16 md:pt-24">
      <div className="container-page">
        <a
          href={`mailto:${SITE.email}`}
          className="display block break-words text-[clamp(1.7rem,6.2vw,5.4rem)] leading-none transition-colors hover:text-signal"
          style={{ ["--wdth" as string]: 116 }}
        >
          info<span className="text-signal">@</span>neural-factory.com
        </a>

        <div className="mt-14 grid gap-10 border-t border-paper/25 pt-8 md:mt-20 md:grid-cols-12 md:gap-x-6">
          <p className="eyebrow md:col-span-3">{FOOTER.peopleLabel}</p>
          <ul className="grid gap-8 sm:grid-cols-3 md:col-span-9">
            {TEAM.people.map((p) => (
              <li key={p.email}>
                <p className="display text-xl" style={{ ["--wdth" as string]: 112 }}>
                  {p.name}
                </p>
                <a
                  href={`mailto:${p.email}`}
                  className="mt-2 inline-block break-all font-mono text-sm text-signal underline-offset-4 hover:underline"
                >
                  {p.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Marca a todo el ancho, decorativa */}
      <p
        aria-hidden
        className="display mt-16 select-none whitespace-nowrap px-3 text-center text-[clamp(2rem,7.6vw,8rem)] uppercase leading-[0.82] text-signal md:mt-24"
        style={{ ["--wdth" as string]: 125, fontWeight: 900 }}
      >
        Neural Factory
      </p>

      <div className="container-page">
        <div className="mt-10 flex flex-col gap-4 border-t border-paper/25 py-6 text-sm text-paper/75 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. {FOOTER.rights}.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-signal"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href={SITE.credit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-signal"
            >
              {FOOTER.creditPrefix} {SITE.credit.label}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
