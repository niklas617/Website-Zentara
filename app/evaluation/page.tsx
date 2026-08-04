"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import React, { Suspense } from "react";

// Diese Komponente wertet den URL-Parameter aus
function ScoreResult() {
    const searchParams = useSearchParams();
    // Wir lesen den Score (Anzahl der "Nein"-Antworten bzw. Fehler) aus der URL. Standard ist 0.
    const scoreParam = searchParams.get("score");
    const fehlerCount = scoreParam ? parseInt(scoreParam, 10) : 0;
    const maxScore = 9;

    // Dynamische Inhalte basierend auf der Fehleranzahl
    let statusColor = "";
    let headline = "";
    let description = "";
    let actionText = "";

    if (fehlerCount <= 1) {
        statusColor = "var(--mint)"; // Grün
        headline = "Exzellent: Starkes Fundament";
        description = "Glückwunsch! Deine Website arbeitet hochgradig effizient. Du hast ein solides digitales Fundament und machst fast alles richtig.";
        actionText = "Lass uns in einem kurzen Call prüfen, wie wir die letzten Prozentpunkte für noch mehr Wachstum herausholen.";
    } else if (fehlerCount <= 4) {
        statusColor = "#F59E0B"; // Orange (Warnung)
        headline = "Warnsignal: Versteckte Umsatzkiller";
        description = "Deine Website verliert aktuell regelmäßig qualifizierte Anfragen an den Wettbewerb. Dein Team verschwendet Zeit mit manuellen Prozessen, die wir leicht digitalisieren könnten.";
        actionText = "Wir sollten diese Lecks schnellstens schließen. Buche jetzt ein kostenloses 15-Minuten-Audit, um die genauen Fehlerquellen zu beheben.";
    } else {
        statusColor = "#EF4444"; // Rot (Kritisch)
        headline = "Kritischer Zustand: Akuter Handlungsbedarf!";
        description = "Dein digitaler Auftritt ist aktuell ein reines Kostenrisiko. Du verbrennst durch ineffiziente Prozesse und schlechte Conversion-Raten täglich bares Geld und administrative Lebenszeit.";
        actionText = "Das müssen wir sofort stoppen. Buche jetzt ein kostenfreies Strategiegespräch, um einen Notfall-Plan aufzustellen.";
    }

    return (
        <div className="card" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", padding: "50px 30px", borderTop: `4px solid ${statusColor}` }}>

            <p style={{ textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "10px" }}>
                Dein persönliches Audit-Ergebnis
            </p>

            <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "var(--text-primary)", marginBottom: "20px", fontWeight: 800 }}>
                {headline}
            </h1>

            {/* Visueller Score-Indikator */}
            <div style={{ margin: "40px 0" }}>
                <div style={{ fontSize: "4rem", fontWeight: 900, color: statusColor, lineHeight: 1 }}>
                    {fehlerCount} <span style={{ fontSize: "1.5rem", color: "var(--text-muted)", fontWeight: 500 }}>/ {maxScore}</span>
                </div>
                <p style={{ color: "var(--text-muted)", marginTop: "10px" }}>Kritische Fehlerstellen gefunden</p>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", padding: "25px", borderRadius: "12px", border: "1px solid var(--border-muted)", marginBottom: "40px" }}>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "var(--text-secondary)", margin: 0 }}>
                    {description}
                </p>
            </div>

            <div style={{ marginTop: "20px" }}>
                <p style={{ color: "var(--text-primary)", fontWeight: 700, marginBottom: "20px" }}>
                    {actionText}
                </p>
                <Link href="/offer" className="cta-roadmap" style={{ padding: "16px 40px", fontSize: "1.1rem" }}>
                    Jetzt Lösungstermin vereinbaren
                </Link>
            </div>

        </div>
    );
}

export default function AuswertungPage() {
    return (
        <section>
            <NavBar />
            <div className="section" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
                {/* Suspense ist in Next.js Pflicht, wenn man useSearchParams auf der Client-Seite nutzt */}
                <Suspense fallback={<div className="loader-spinner"></div>}>
                    <ScoreResult />
                </Suspense>
            </div>
        </section>
    );
}