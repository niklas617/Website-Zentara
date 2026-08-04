import type { Metadata } from "next";
import "./globals.css";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import Script from "next/script";

// Falls deine finale Domain abweicht, hier (und in sitemap.ts / robots.ts) anpassen.
const SITE_URL = "https://zentara-solutions.de";

const META_DESCRIPTION =
  "Zentara Solutions: individuelle Websites, Web-Apps & Software für KMU – mit Fokus auf Handwerksbetriebe. Persönlich betreut, DSGVO-konform.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zentara Solutions – Individuelle Websites & Software für KMU",
    template: "%s | Zentara Solutions",
  },
  description: META_DESCRIPTION,
  applicationName: "Zentara Solutions",
  authors: [{ name: "Niklas Smit" }],
  creator: "Niklas Smit",
  keywords: [
    "Webentwicklung",
    "Website erstellen lassen",
    "Web-App",
    "Individualsoftware",
    "Handwerk Website",
    "KMU Website",
    "Next.js Entwickler",
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
    siteName: "Zentara Solutions",
    title: "Zentara Solutions – Individuelle Websites & Software für KMU",
    description: META_DESCRIPTION,
    // TODO: Vorschaubild (1200×630) unter diesem Pfad ablegen, dann greift die Social-Preview automatisch.
    images: [
      {
        url: "/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zentara Solutions – Webentwicklung für kleine und mittlere Unternehmen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentara Solutions – Individuelle Websites & Software für KMU",
    description: META_DESCRIPTION,
    images: ["/assets/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Strukturierte Daten (Schema.org) – hilft Google, das Angebot einzuordnen.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Zentara Solutions",
  url: SITE_URL,
  email: "info@zentara-solutions.de",
  description:
    "Zentara Solutions ist ein Software- und Webentwicklungs-Unternehmen mit dem Ziel, kleinen und mittleren Betrieben – insbesondere im Handwerk – zu einem professionellen digitalen Auftritt zu verhelfen. Statt Baukasten-Websites entstehen individuelle, moderne Lösungen: von performanten Websites über maßgeschneiderte Web-Anwendungen bis hin zu branchenspezifischer Software wie ERP-Systemen für Werkstätten.",
  founder: { "@type": "Person", name: "Niklas Smit" },
  // Kein fester Standort – nur Dienstleistungsgebiet.
  areaServed: { "@type": "Country", name: "Deutschland" },
  serviceType: [
    "Webentwicklung",
    "Web-App-Entwicklung",
    "Individualsoftware",
    "ERP-Systeme",
  ],
  sameAs: ["https://www.instagram.com/zentara.official"],
};

// Theme vor dem ersten Paint setzen (verhindert Flackern beim Dark-/Light-Wechsel).
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark';}document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {children}
        <ScrollToTop />

        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="53bfbd4e-455a-49e3-bfb2-dd72a45eaefa"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
