import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projekt anfragen",
  description:
    "Erzähl mir von deinem Projekt – kostenlose Erstberatung, Antwort innerhalb von 24 Stunden.",
  alternates: { canonical: "/offer" },
};

export default function OfferLayout({ children }: { children: React.ReactNode }) {
  return children;
}
