import { PERFORMANCE } from "@/data/content";
import { LoadTest } from "./load-test";
import { Section } from "./section";

export function Performance() {
  return (
    <Section id="rendimiento" title={PERFORMANCE.title} titleWidth="max-w-[19ch]">
      <LoadTest />
    </Section>
  );
}
