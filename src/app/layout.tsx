import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SEO, SITE } from "@/data/content";
import { IS_PRODUCTION, SITE_URL } from "@/lib/site";

const display = localFont({
  src: "./fonts/Archivo-Variable.woff2",
  variable: "--font-display",
  weight: "100 900",
  display: "swap",
});

const sans = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const mono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});

const TITLE = SEO.title;
const DESCRIPTION = SEO.description;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Neural Factory" },
  description: DESCRIPTION,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: {
    canonical: "/",
    languages: { "es-MX": "/" },
  },
  robots: IS_PRODUCTION
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    locale: "es_MX",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitterHandle,
    title: TITLE,
    description: DESCRIPTION,
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-MX"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marca que hay JS: sin él, todo el contenido queda visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
