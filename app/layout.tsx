import type { Metadata } from "next";
import "./globals.css";
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

export const metadata: Metadata = {
  title: "Niklas Smit | Webentwicklung",
  description: "Individuelle Softwarelösungen, Webentwicklung und Automatisierung.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
