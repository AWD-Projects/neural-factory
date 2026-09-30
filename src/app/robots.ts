import type { MetadataRoute } from "next";
import { IS_PRODUCTION, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Los previews (rama dev) no se indexan: no deben competir con producción.
  if (!IS_PRODUCTION) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
