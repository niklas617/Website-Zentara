import type { Metadata } from "next";
import "./globals.css";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

// Falls deine finale Domain abweicht, hier (und in sitemap.ts / robots.ts) anpassen.
const SITE_URL = "https://zentara-solutions.de";

const META_TITLE = "MotoSet – Fahrwerks-Setups immer dabei | Zentara Solutions";
const META_DESCRIPTION =
  "MotoSet – die App für dein Motorrad-Fahrwerk: Setups pro Bike speichern, versionieren und offline am Trackday abrufen. Eine Eigenentwicklung von Zentara Solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: META_TITLE,
    template: "%s | Zentara Solutions",
  },
  description: META_DESCRIPTION,
  applicationName: "MotoSet",
  authors: [{ name: "Niklas Smit" }],
  creator: "Niklas Smit",
  keywords: [
    "MotoSet",
    "Motorrad Fahrwerk App",
    "Fahrwerks-Setup",
    "Suspension Setup",
    "Trackday App",
    "Fahrwerk Einstellungen speichern",
    "Zentara Solutions",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: "/assets/images/favicon.png",
    apple: "/assets/images/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: "MotoSet · Zentara Solutions",
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: [
      {
        url: "/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "MotoSet – Fahrwerks-Setups für dein Motorrad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: ["/assets/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Strukturierte Daten (Schema.org) – MotoSet als Software-Anwendung.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MotoSet",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Android, Web",
  description:
    "MotoSet speichert Motorrad-Fahrwerks-Setups pro Bike – versioniert, blitzschnell abrufbar und offline am Trackday.",
  url: SITE_URL,
  author: { "@type": "Person", name: "Niklas Smit" },
  publisher: { "@type": "Organization", name: "Zentara Solutions" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
};

// Theme vor dem ersten Paint setzen (verhindert Flackern beim Dark-/Light-Wechsel).
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark';}document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
