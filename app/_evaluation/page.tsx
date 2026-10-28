"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import React, { Suspense } from "react";

// Diese Komponente wertet den URL-Parameter aus
function ScoreResult() {
    const searchParams = useSearchParams();
    // Score (Anzahl "Problem"-Antworten) und die maximal mögliche Fehlerzahl aus der URL lesen.
    // maxScore kommt dynamisch aus dem Quiz (Anzahl gewerteter Fragen) – Fallback 9 für ältere Links.
    const scoreParam = searchParams.get("score");
    const maxParam = searchParams.get("max");
    const maxScore = maxParam ? Math.max(1, parseInt(maxParam, 10) || 9) : 9;
    const fehlerCountRaw = scoreParam ? parseInt(scoreParam, 10) : 0;
    const fehlerCount = Math.min(Math.max(fehlerCountRaw || 0, 0), maxScore); // sicher auf [0, maxScore]

    // Bänder proportional zum Maximum – so bleiben sie korrekt, egal wie viele Fragen gewertet werden.
    const ratio = fehlerCount / maxScore;

    // Dynamische Inhalte basierend auf dem Anteil kritischer Antworten
    let statusColor = "";
    let headline = "";
    let description = "";
    let actionText = "";

    if (ratio <= 0.2) {
        statusColor = "var(--mint)"; // Grün
        headline = "Exzellent: Digital stark aufgestellt";
        description = "Glückwunsch! Dein Betrieb arbeitet digital hochgradig effizient – von der Kundenanfrage über die Angebotserstellung bis zur Fachkräftegewinnung läuft fast alles rund. Ein solides Fundament, auf dem sich hervorragend aufbauen lässt.";
        actionText = "Lass uns in einem kurzen Call prüfen, wie wir die letzten Prozentpunkte für noch mehr Wachstum herausholen.";
    } else if (ratio <= 0.5) {
        statusColor = "#F59E0B"; // Orange (Warnung)
        headline = "Warnsignal: Versteckte Umsatz- & Zeitfresser";
        description = "In deinen digitalen Abläufen stecken mehrere Lücken – etwa bei Kundenanfragen, verpassten Anrufen, der Angebotserstellung oder der Fachkräftegewinnung. Dein Team verliert dadurch regelmäßig Zeit und dein Betrieb bares Geld an den Wettbewerb.";
        actionText = "Wir sollten diese Lecks schnellstens schließen. Buche jetzt ein kostenloses 15-Minuten-Audit, um die genauen Schwachstellen zu beheben.";
    } else {
        statusColor = "#EF4444"; // Rot (Kritisch)
        headline = "Kritischer Zustand: Akuter Handlungsbedarf!";
        description = "Dein Betrieb verschenkt aktuell an vielen Stellen Potenzial: manuelle Prozesse, verlorene Anfragen und fehlende digitale Sichtbarkeit kosten dich täglich Aufträge, Fachkräfte und wertvolle Arbeitszeit.";
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
                <p style={{ color: "var(--text-muted)", marginTop: "10px" }}>kritische Baustellen in deinem Betrieb</p>
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