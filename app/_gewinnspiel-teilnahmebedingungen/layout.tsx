import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teilnahmebedingungen Gewinnspiel „Kostenlose Website“",
  description:
    "Teilnahmebedingungen zum Gewinnspiel von Zentara Solutions: Gewinne eine individuell erstellte Website (Paket „Digitale Visitenkarte“, Wert 799 €). Teilnahmeschluss 31.10.2026.",
  alternates: { canonical: "/gewinnspiel-teilnahmebedingungen" },
};

export default function GewinnspielTeilnahmebedingungenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
