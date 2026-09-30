import { SEO, SERVICES, SITE, TEAM } from "@/data/content";
import { SITE_URL } from "./site";

/**
 * Datos estructurados (un solo @graph con @id estables).
 * Solo datos reales: sin reseñas, calificaciones, precios ni horarios.
 * Tipos verificados en schema.org: Organization, Person, OfferCatalog, Offer,
 * Service, WebSite, WebPage e ImageObject.
 */
export function buildJsonLd() {
  const orgId = `${SITE_URL}/#organization`;
  const siteId = `${SITE_URL}/#website`;
  const pageId = `${SITE_URL}/#webpage`;
  const ogImage = `${SITE_URL}/opengraph-image.jpg`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE.name,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          url: `${SITE_URL}/images/logo-nf.png`,
          width: 131,
          height: 128,
          caption: SITE.name,
        },
        image: ogImage,
        email: SITE.email,
        description: SEO.description,
        sameAs: [SITE.linkedin],
        knowsAbout: SEO.knowsAbout,
        employee: TEAM.people.map((p) => ({
          "@type": "Person",
          name: p.name,
          jobTitle: p.role,
          email: p.email,
          worksFor: { "@id": orgId },
          ...(p.linkedinConfirmed ? { sameAs: [p.linkedin] } : {}),
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: SERVICES.title,
          itemListElement: SERVICES.items.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.text,
              provider: { "@id": orgId },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: SITE_URL,
        name: SITE.name,
        inLanguage: "es-MX",
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": pageId,
        url: SITE_URL,
        name: SEO.title,
        description: SEO.description,
        inLanguage: "es-MX",
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
        primaryImageOfPage: { "@type": "ImageObject", url: ogImage, width: 1200, height: 630 },
      },
    ],
  };
}
