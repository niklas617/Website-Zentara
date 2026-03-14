import Link from "next/link";
import OfferForm from "./OfferForm";

export default function OfferPage() {
  return (
    <main>
      <div className="logo-item">
        <Link href="/" className="logo-offer">
          Zentara
        </Link>
      </div>

      <header>
        <h1>Softwareentwicklung & Webentwicklung</h1>
        <p>Individuelle Lösungen für dein Business</p>
      </header>

      <OfferForm />
    </main>
  );
}
