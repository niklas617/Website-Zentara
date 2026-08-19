import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio – Eigenentwicklungen von Zentara Solutions",
  description:
    "Einblick in eigene Projekte: MotoSet (Fahrwerks-App) und Money-Dashboard (KI-gestützte Finanzverwaltung).",
  alternates: { canonical: "/project" },
};

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
