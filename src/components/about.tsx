import { ABOUT } from "@/data/content";
import { AboutLedger } from "./about-ledger";
import { Section } from "./section";

export function About() {
  return (
    <Section id="nosotros" title={ABOUT.title}>
      <p className="reveal max-w-[60ch] text-xl leading-snug text-paper md:text-[1.7rem] md:leading-[1.35]">
        {ABOUT.statement}
      </p>
      <AboutLedger items={ABOUT.items} />
    </Section>
  );
}
