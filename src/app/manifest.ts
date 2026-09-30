import type { MetadataRoute } from "next";
import { SEO } from "@/data/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Neural Factory",
    short_name: "Neural Factory",
    description: SEO.description,
    start_url: "/",
    display: "standalone",
    lang: "es-MX",
    background_color: "#1a1a1a",
    theme_color: "#1a1a1a",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
