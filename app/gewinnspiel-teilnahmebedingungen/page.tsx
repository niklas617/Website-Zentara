import NavBar from "../../components/NavBar";
import Link from "next/link";

export default function GewinnspielTeilnahmebedingungen() {
  return (
    <>
      <NavBar />
      <section className="section">
        <div className="legal-container legal-container--accent">
          <h1>Teilnahmebedingungen Gewinnspiel „Kostenlose Website“</h1>

          <h2>Veranstalter</h2>
          {/* Anschrift übernommen aus dem Impressum. */}
          <p>
            Niklas Smit
            <br />
            Zentara Solutions
            <br />
            Am Waldfriedhof 9
            <br />
            49832 Thuine
          </p>

          <h2>Teilnahmezeitraum</h2>
          <p>
            Die Teilnahme ist möglich bis einschließlich 31.10.2026, 23:59 Uhr.
            Teilnahmeschluss danach.
          </p>

          <h2>Teilnahmeart</h2>
          <p>
            Teilnahmeberechtigt ist, wer im Teilnahmezeitraum den kostenlosen
            Website-Audit-Check auf zentara-solutions.de vollständig ausfüllt und
            dabei eine gültige E-Mail-Adresse angibt. Pro Person/Unternehmen ist eine
            Teilnahme möglich. Die Teilnahme ist kostenlos, es ist kein Kauf
            erforderlich.
          </p>

          <h2>Gewinn</h2>
          <p>
            Zu gewinnen ist eine individuell erstellte Website im Wert von 799 €
            (Paket „Digitale Visitenkarte“ gemäß aktuellem Preismodell auf{" "}
            <Link href="/pricing" className="highlight-link">
              zentara-solutions.de/pricing
            </Link>
            ). Der Gewinn ist nicht auf andere Pakete anrechenbar und nicht bar
            auszahlbar.
          </p>

          <h2>Auslosung &amp; Benachrichtigung</h2>
          <p>
            Die Auslosung erfolgt nach dem Zufallsprinzip am 01.11.2026 unter allen
            gültigen Teilnehmern. Der Gewinner/die Gewinnerin wird per E-Mail
            benachrichtigt. Erfolgt innerhalb von 14 Tagen nach Benachrichtigung keine
            Rückmeldung, wird der Gewinn neu ausgelost.
          </p>

          <h2>Datenschutz</h2>
          <p>
            Die im Rahmen des Audit-Checks erhobenen Daten werden ausschließlich zur
            Durchführung des Gewinnspiels sowie – sofern gewünscht – zur Kontaktaufnahme
            bezüglich der Audit-Ergebnisse genutzt. Weitere Informationen in der{" "}
            <Link href="/datenschutz" className="highlight-link">
              Datenschutzerklärung
            </Link>
            .
          </p>

          <h2>Sonstiges</h2>
          <p>
            Der Rechtsweg ist ausgeschlossen. Der Veranstalter behält sich vor, das
            Gewinnspiel aus wichtigem Grund zu ändern oder abzubrechen. Mitarbeiter des
            Veranstalters sind von der Teilnahme ausgeschlossen.
          </p>

          <div style={{ marginTop: "40px" }}>
            <Link href="/" className="project-link-btn">
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
