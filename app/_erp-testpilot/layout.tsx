import type { Metadata } from "next";

// Private, nicht verlinkte Seite: aus Suchmaschinen ausschließen.
// Erzeugt <meta name="robots" content="noindex, nofollow"> und entsprechende googlebot-Tags.
export const metadata: Metadata = {
  title: "Exklusiver Testpiloten-Zugang",
  description: "Privater Zugang zum Werkstatt-ERP-Testpiloten-Programm.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: { canonical: undefined },
};

export default function ErpTestpilotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
