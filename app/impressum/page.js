import NavBar from "../../components/NavBar"; // Pfad ggf. anpassen
import Link from "next/link";

export default function Impressum() {
    return (
        <>
            <NavBar />
            <section className="section">
                <div className="legal-container">
                    <h1>Impressum</h1>

                    <h2>Angaben gemäß § 5 TMG</h2>
                    <p>Niklas Smit<br />
                        Webdesign<br />
                        Am Waldfriedhof<br />
                        9<br />
                        49832 Thuine</p>

                    <h2>Kontakt</h2>
                    <p>Telefon: 017621742783<br />
                        E-Mail: zentara.network@gmail.com</p>
                    <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
                    <p>Berufsbezeichnung:<br />
                        Webdesigner</p>
                    <p>Verliehen in:<br />
                        Deutschland</p>
                    <h2>Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</h2>
                    <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

                    <h2>Zentrale Kontaktstelle nach dem Digital Services Act - DSA (Verordnung (EU) 2022/265)</h2>
                    <p>Unsere zentrale Kontaktstelle f&uuml;r Nutzer und Beh&ouml;rden nach Art. 11, 12 DSA erreichen Sie wie folgt:</p>
                    <p>E-Mail: zentara.network@gmail.com<br />
                        Telefon: 017621742783
                    </p>
                    <p>Die für den Kontakt zur Verf&uuml;gung stehenden Sprachen sind: Deutsch, Englisch.</p>
                    <p>Quelle: <a href="https://www.e-recht24.de/impressum-generator.html">https://www.e-recht24.de/impressum-generator.html</a></p>

                    <div style={{ marginTop: "40px" }}>
                        <Link href="/" className="project-link-btn">Zurück zur Startseite</Link>
                    </div>
                </div>
            </section>
        </>
    );
}