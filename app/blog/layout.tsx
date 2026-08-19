import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog – Digital-Wissen fürs Handwerk",
  description:
    "Praxisnahe Artikel zu E-Rechnung, Schnittstellen, Website-Kosten und Fachkräftegewinnung – verständlich erklärt für Handwerksbetriebe und KMU.",
  alternates: { canonical: "/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
