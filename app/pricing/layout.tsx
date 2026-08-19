import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preise & Pakete für Handwerksbetriebe",
  description:
    "Website, Bewerberportal oder Schnittstellen zu DATANORM, GAEB & DATEV – transparente Preise für Handwerksbetriebe und KMU.",
  alternates: { canonical: "/pricing" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
