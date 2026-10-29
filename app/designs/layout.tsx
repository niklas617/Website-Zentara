import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MotoSet – Design-Varianten",
  robots: { index: false, follow: false },
};

export default function DesignsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
