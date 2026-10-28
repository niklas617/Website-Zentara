import type { Metadata } from "next";

// Personalisierte Score-Ergebnisse via URL-Parameter: nicht indexieren.
export const metadata: Metadata = {
  title: "Dein Audit-Ergebnis",
  description: "Dein persönliches Ergebnis aus dem Handwerks-Digital-Audit.",
  alternates: { canonical: undefined },
  robots: { index: false, follow: false },
};

export default function EvaluationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
