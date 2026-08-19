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
    "Softwareentwicklung",
    "Software für Handwerksbetriebe",
    "ERP-Systeme für Werkstätten",
    "Software für kleine Unternehmen",
    "Software für mittelständische Unternehmen",
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

// Zweites Schema für die FAQ-Sektion – muss exakt zum sichtbaren Seiteninhalt passen.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was kostet eine Website bei Zentara?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das hängt vom Umfang ab. Eine moderne Basis-Website startet bei 799 €. Für komplexere Projekte mit Buchungssystemen oder individueller Software mache ich dir nach unserem Erstgespräch ein faires, transparentes Festpreis-Angebot. Keine versteckten Kosten!",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert die Umsetzung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eine klassische Unternehmenswebsite dauert in der Regel etwa 2 bis 4 Wochen von der ersten Idee bis zum Go-Live. Bei individueller Software oder komplexeren Web-Apps planen wir den Zeitrahmen gemeinsam im Konzept-Gespräch.",
      },
    },
    {
      "@type": "Question",
      name: "Muss ich Texte und Bilder selbst liefern?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wenn du schon Material hast, super. Wenn nicht, ist das auch kein Problem. Ich unterstütze dich gerne bei der Strukturierung und Erstellung der Texte. Für professionelle Fotos kann ich dir Tipps geben oder Kontakte vermitteln.",
      },
    },
    {
      "@type": "Question",
      name: "Was passiert, wenn die Seite online ist?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Du wirst nach dem Go-Live nicht allein gelassen. Mit dem Rundum-Sorglos-Paket kümmere ich mich dauerhaft um Updates, Backups, Sicherheit und kleine Textänderungen. Du kannst dich zu 100 % auf dein Tagesgeschäft konzentrieren.",
      },
    },
    {
      "@type": "Question",
      name: "Bindet ihr auch unsere Handwerkersoftware an (z. B. DATEV, GAEB, DATANORM)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Ich entwickle individuelle Schnittstellen zwischen deiner Website und deiner Handwerkersoftware – etwa DATANORM- und GAEB-Anbindung für den Großhandel, DATEV- und ZUGFeRD-Rechnungsexport oder IDS Connect für Online-Bestellungen. So entfällt doppelte Dateneingabe.",
      },
    },
    {
      "@type": "Question",
      name: "Baut ihr auch ein Bewerberportal, über das sich Fachkräfte direkt bei uns bewerben können?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, ein Express-Bewerberportal gehört zu meinen Smarte-Software-Lösungen. Bewerber können sich in unter zwei Minuten direkt über deine Website melden – ohne PDF-Upload oder Umwege über Jobportale. Das hilft aktiv bei der Mitarbeitergewinnung.",
      },
    },
    {
      "@type": "Question",
      name: "Was unterscheidet eine Website von euch von einer Baukasten-Seite wie Wix oder Jimdo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Baukästen nutzen Vorlagen, die tausende andere Firmen ebenfalls verwenden, und sind bei individuellen Funktionen schnell begrenzt. Ich programmiere jede Website individuell mit Next.js – schneller, technisch flexibler und ohne fremdes Branding.",
      },
    },
    {
      "@type": "Question",
      name: "Wir haben schon eine Agentur bzw. einen Bekannten, der unsere Website macht – warum zu euch wechseln?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Viele Agenturen konzentrieren sich rein aufs Design. Mein Schwerpunkt liegt zusätzlich auf der technischen Tiefe: Anbindung an DATANORM, GAEB oder DATEV, Bewerberportale und Performance. Ein unverbindliches Gespräch zeigt oft Lücken der aktuellen Lösung.",
      },
    },
    {
      "@type": "Question",
      name: "Wir sind aktuell auf Monate ausgebucht – brauchen wir überhaupt eine neue Website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gerade dann kann sich eine Überarbeitung lohnen – nicht um mehr Anfragen zu bekommen, sondern um gezielt margenstarke Aufträge anzuziehen, unrentable Kleinanfragen zu filtern und über ein Bewerberportal Fachkräfte zu gewinnen.",
      },
    },
    {
      "@type": "Question",
      name: "Ist meine Website bei euch DSGVO-konform und rechtlich abgesichert?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, alle Websites werden 100% DSGVO-konform umgesetzt, inklusive datenschutzkonformem Hosting in Europa, korrekter Datenschutzerklärung und wo nötig Cookie-Einwilligung. Ein rechtssicheres Impressum gehört ebenfalls zum Leistungsumfang.",
      },
    },
    {
      "@type": "Question",
      name: "Kann ich die Inhalte später selbst pflegen, oder brauche ich dafür Programmierkenntnisse?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kleine Textanpassungen kannst du je nach Setup meist selbst vornehmen oder gibst sie mir kurz durch – ganz ohne Programmierkenntnisse. Für laufende Wartung übernehme ich im Rundum-Sorglos-Paket die komplette Pflege.",
      },
    },
    {
      "@type": "Question",
      name: "Arbeitet ihr auch mit Betrieben außerhalb des Emslands/Niedersachsens zusammen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, ich arbeite deutschlandweit remote mit Handwerksbetrieben und KMU zusammen – Erstgespräche und Abstimmungen laufen per Video-Call oder Telefon. Vor-Ort-Termine im Emsland sind möglich, aber keine Voraussetzung.",
      },
    },
    {
      "@type": "Question",
      name: "Bietet ihr auch reine Softwarelösungen ohne Website an, z. B. interne Tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Neben Websites entwickle ich auch eigenständige interne Tools – etwa digitale Urlaubsanträge, Buchungssysteme, Kosten-Kalkulatoren oder Schnittstellen zu deiner Handwerkersoftware, individuell zugeschnitten auf deinen Arbeitsalltag.",
      },
    },
    {
      "@type": "Question",
      name: "Wie läuft die Zusammenarbeit ab – von der ersten Anfrage bis zum Livegang?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nach deiner unverbindlichen Anfrage folgt ein kostenloses Erstgespräch, danach Konzeption, Design und Entwicklung mit Next.js, gefolgt von gemeinsamem Review und Launch. Eine klassische Website dauert dabei 2 bis 4 Wochen.",
      },
    },
  ],
};

// Theme vor dem ersten Paint setzen (verhindert Flackern beim Dark-/Light-Wechsel).
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark';}document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
