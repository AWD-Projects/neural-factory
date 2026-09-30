import { CONTACT, SITE } from "@/data/content";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="on-signal section-y relative bg-signal text-ink">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5">
          <div className="rule h-px bg-ink/50" aria-hidden />
          <h2
            id="contacto-title"
            className="display reveal mt-10 text-[clamp(2.1rem,4.4vw,4rem)] leading-[0.98]"
            style={{ ["--wdth" as string]: 116 }}
          >
            {CONTACT.title}
          </h2>
          <p className="reveal mt-6 max-w-[38ch] text-lg leading-relaxed text-ink/90">{CONTACT.text}</p>

          <div className="reveal mt-12">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em]">{CONTACT.directLabel}</p>
            <a
              href={`mailto:${SITE.email}`}
              className="display mt-2 inline-block break-all text-xl underline decoration-2 underline-offset-8 hover:decoration-4 sm:text-2xl"
              style={{ ["--wdth" as string]: 112 }}
            >
              {SITE.email}
            </a>
          </div>
        </div>

        <div className="reveal lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
