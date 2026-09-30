/** URL canónica. El dominio real es neural-factory.com (con guion). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://neural-factory.com"
).replace(/\/$/, "");

/**
 * Solo la rama de producción se indexa. En Netlify, `CONTEXT` vale
 * "production" únicamente en el deploy de la rama principal; los previews de
 * `dev` salen con `noindex` para no competir con el sitio real.
 */
export const IS_PRODUCTION =
  (process.env.CONTEXT ?? "production") === "production" &&
  process.env.NEXT_PUBLIC_NOINDEX !== "true";
