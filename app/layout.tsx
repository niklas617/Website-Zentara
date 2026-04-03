import type { Metadata } from "next";
import "./globals.css";
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import Script from "next/script";

export const metadata: Metadata = {
  title: "Zentara-Solutions",
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

<Script 
          src="https://cloud.umami.is/script.js" 
          data-website-id="53bfbd4e-455a-49e3-bfb2-dd72a45eaefa" 
          strategy="afterInteractive" 
        />

      </body>
    </html>
  );
}

