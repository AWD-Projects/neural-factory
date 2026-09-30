import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Industries } from "@/components/industries";
import { Performance } from "@/components/performance";
import { RevealObserver } from "@/components/reveal-observer";
import { Services } from "@/components/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Team } from "@/components/team";
import { buildJsonLd } from "@/lib/seo";

export default function Home() {
  const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-signal focus:px-4 focus:py-3 focus:font-mono focus:text-sm focus:text-ink"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <About />
        <Team />
        <Performance />
        <Services />
        <Industries />
        <Contact />
      </main>
      <SiteFooter />
      <RevealObserver />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
    </>
  );
}
