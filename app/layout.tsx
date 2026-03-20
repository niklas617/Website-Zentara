import type { Metadata } from "next";
import "./globals.css";
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

export const metadata: Metadata = {
  title: "Zentara | Webentwicklung",
  description: "Individuelle Softwarelösungen, Webentwicklung und Automatisierung.",
  icons: {
    icon: "assets/images/favicon.png", // Pfad zu deinem Bild im public-Ordner
    apple: "assets/images/favicon.png", // Optional: Für iPhones
  }
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

