"use client";

import React, { useState } from "react";

// --- Datenmodell für das Handwerks-Digital-Audit ---
type Option = {
    label: string;
    value: string;
    isProblem?: boolean; // zählt in den Score ("kritische Fehlerstelle")
};

type Question = {
    id: number;
    section: string;
    type: "segment" | "problem"; // segment = reiner Filter, problem = gewertet
    title: string;
    text: string;
    options: Option[];
};

// Reihenfolge: erst leichte Segmentierungsfragen, dann die "Schmerz"-Fragen.
const QUESTIONS: Question[] = [
    // --- SEGMENTIERUNG (nicht gewertet) ---
    {
        id: 1,
        section: "Ihr Betrieb",
        type: "segment",
        title: "Wie viele Mitarbeiter hat Ihr Betrieb?",
        text: "So können wir das Audit auf Betriebe Ihrer Größe abstimmen.",
        options: [
            { label: "Bis 5 Mitarbeiter", value: "unter-5" },
            { label: "5 – 15 Mitarbeiter", value: "5-15" },
            { label: "Mehr als 15", value: "ueber-15" },
        ],
    },
    {
        id: 2,
        section: "Ihr Betrieb",
        type: "segment",
        title: "Welche Handwerker-Software nutzen Sie im Büro?",
        text: "Damit sehen wir, wie stark Ihre Systeme bereits vernetzt sind.",
        options: [
            { label: "STREIT", value: "streit" },
            { label: "plancraft", value: "plancraft" },
            { label: "ToolTime", value: "tooltime" },
            { label: "Das Programm", value: "das-programm" },
            { label: "Sonstige", value: "sonstige" },
            { label: "Keine / Zettel & Excel", value: "keine" },
        ],
    },

    // --- FACHKRÄFTE & TEAM (gewertet) ---
    {
        id: 3,
        section: "Fachkräfte & Team",
        type: "problem",
        title: "Wie gehen Bewerbungen von Fachkräften aktuell bei Ihnen ein?",
        text: "Ob Sie Personal gewinnen, entscheidet sich oft schon am Bewerbungsprozess.",
        options: [
            { label: "Über einen digitalen Funnel / eine Karriereseite", value: "digital", isProblem: false },
            { label: "Per E-Mail oder Papier – eher unstrukturiert", value: "mail-papier", isProblem: true },
            { label: "Kaum Bewerbungen – wir finden schwer neue Leute", value: "keine-bewerbungen", isProblem: true },
        ],
    },

    // --- ANFRAGEN & VERTRIEB (gewertet) ---
    {
        id: 4,
        section: "Anfragen & Vertrieb",
        type: "problem",
        title: "Wie landen Kundenanfragen in Ihrem System?",
        text: "Jede händisch abgetippte Anfrage kostet Zeit und ist eine Fehlerquelle.",
        options: [
            { label: "Automatisch & strukturiert – ohne Abtippen", value: "automatisch", isProblem: false },
            { label: "Händisch aus Telefon, E-Mail & Zettel", value: "manuell", isProblem: true },
        ],
    },
    {
        id: 5,
        section: "Anfragen & Vertrieb",
        type: "problem",
        title: "Was passiert, wenn Sie auf der Baustelle einen Anruf verpassen?",
        text: "Verpasste Anrufe sind verlorene Aufträge – oft ohne dass Sie es merken.",
        options: [
            { label: "Automatischer Rückruf / WhatsApp-Erfassung", value: "abgefangen", isProblem: false },
            { label: "Der Anruf geht verloren – Kunde ruft die Konkurrenz an", value: "verloren", isProblem: true },
        ],
    },
    {
        id: 6,
        section: "Anfragen & Vertrieb",
        type: "problem",
        title: "Können Ihre Kunden online einen Termin oder Rückruf buchen?",
        text: "Online-Buchung nimmt Ihrem Büro Telefonarbeit ab und wirkt rund um die Uhr.",
        options: [
            { label: "Ja, über einen Online-Kalender / Buchungslink", value: "online", isProblem: false },
            { label: "Nein, Termine laufen nur telefonisch", value: "telefonisch", isProblem: true },
        ],
    },
    {
        id: 7,
        section: "Anfragen & Vertrieb",
        type: "problem",
        title: "Wie schnell erstellen Sie ein Angebot nach dem Vor-Ort-Termin?",
        text: "Wer zuerst ein sauberes Angebot liefert, bekommt meist den Auftrag.",
        options: [
            { label: "Digital, oft noch am selben Tag", value: "schnell", isProblem: false },
            { label: "Dauert Tage – viel Handarbeit in Word & Co.", value: "langsam", isProblem: true },
        ],
    },

    // --- SICHTBARKEIT & VERTRAUEN (gewertet) ---
    {
        id: 8,
        section: "Sichtbarkeit & Vertrauen",
        type: "problem",
        title: "Werden Sie bei Google auf Seite 1 gefunden?",
        text: "Wenn ein Kunde in Ihrer Region nach genau Ihrem Gewerk sucht.",
        options: [
            { label: "Ja, wir stehen ganz oben", value: "top", isProblem: false },
            { label: "Nein / das überlassen wir der Konkurrenz", value: "unsichtbar", isProblem: true },
        ],
    },
    {
        id: 9,
        section: "Sichtbarkeit & Vertrauen",
        type: "problem",
        title: "Wie sammeln Sie neue Google-Bewertungen?",
        text: "Bewertungen sind heute das wichtigste Vertrauenssignal für neue Kunden.",
        options: [
            { label: "Automatisiert nach jedem Auftrag", value: "automatisiert", isProblem: false },
            { label: "Gar nicht / dem Zufall überlassen", value: "zufall", isProblem: true },
        ],
    },

    // --- WEBSITE & TECHNIK (gewertet) ---
    {
        id: 10,
        section: "Website & Technik",
        type: "problem",
        title: "Lädt Ihre Website auf dem Smartphone schnell und sauber?",
        text: "Über 70 % Ihrer Besucher kommen heute vom Handy.",
        options: [
            { label: "Ja, schnell & mobil optimiert", value: "mobil-ok", isProblem: false },
            { label: "Nein / weiß ich nicht", value: "mobil-problem", isProblem: true },
        ],
    },
    {
        id: 11,
        section: "Website & Technik",
        type: "problem",
        title: "Können Sie Texte oder Preise selbst in Minuten ändern?",
        text: "Sonst sind Sie bei jeder Kleinigkeit von Ihrem Webdesigner abhängig.",
        options: [
            { label: "Ja, das erledige ich selbst", value: "selbst", isProblem: false },
            { label: "Nein, nur über den Webdesigner", value: "abhaengig", isProblem: true },
        ],
    },
];

const TOTAL_QUESTIONS = QUESTIONS.length;
// Nur "problem"-Fragen fließen in den Score (max. Fehleranzahl) ein.
const MAX_SCORE = QUESTIONS.filter((q) => q.type === "problem").length;

// --- E-Mail-Validierung & Tippfehler-Erkennung ---------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isValidEmailFormat(email: string): boolean {
    return EMAIL_RE.test(email.trim());
}

// Häufige Freemail-/Provider-Domains (DE-Fokus) für die Vorschlags-Logik.
const COMMON_EMAIL_DOMAINS = [
    "gmail.com", "googlemail.com", "web.de", "gmx.de", "gmx.net", "gmx.at", "gmx.ch",
    "t-online.de", "outlook.com", "outlook.de", "hotmail.com", "hotmail.de",
    "yahoo.com", "yahoo.de", "icloud.com", "me.com", "aol.com", "freenet.de",
    "mail.de", "posteo.de", "live.de", "live.com",
];

function levenshtein(a: string, b: string): number {
    const m = a.length;
    const n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    let curr = new Array(n + 1).fill(0);
    for (let i = 1; i <= m; i++) {
        curr[0] = i;
        for (let j = 1; j <= n; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
        }
        [prev, curr] = [curr, prev];
    }
    return prev[n];
}

/** Schlägt bei vertippter Domain die wahrscheinlich gemeinte Adresse vor (oder null). */
function suggestEmail(email: string): string | null {
    const trimmed = email.trim();
    const at = trimmed.lastIndexOf("@");
    if (at < 1) return null;
    const local = trimmed.slice(0, at);
    const domain = trimmed.slice(at + 1).toLowerCase();
    if (!domain.includes(".")) return null;
    if (COMMON_EMAIL_DOMAINS.includes(domain)) return null; // bereits korrekt

    let best: string | null = null;
    let bestDist = Infinity;
    for (const d of COMMON_EMAIL_DOMAINS) {
        const dist = levenshtein(domain, d);
        if (dist < bestDist) {
            bestDist = dist;
            best = d;
        }
    }
    // Nur bei kleiner Distanz vorschlagen (klarer Tippfehler), aber nicht identisch.
    if (best && bestDist > 0 && bestDist <= 2) {
        return `${local}@${best}`;
    }
    return null;
}
// -------------------------------------------------------------------------

export default function AuditQuiz() {
    const [hasStartedTracking, setHasStartedTracking] = useState(false);
    // States für die Logik
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    // --- NEU: States für das Formular ---
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");
    // --- E-Mail-Feld kontrolliert + Tippfehler-Vorschlag/Fehler ---
    const [email, setEmail] = useState("");
    const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);

    // --- Hier speichern wir die genauen Antworten (value + ob es ein "Problem" ist) ---
    const [answers, setAnswers] = useState<Record<number, { value: string; isProblem: boolean }>>({});

    const currentQuestion = QUESTIONS.find((q) => q.id === currentStep);

    // Funktion wird aufgerufen, wenn eine Antwort-Option geklickt wird
    const handleAnswer = (option: Option) => {
        if (!hasStartedTracking) {
            if (typeof window !== "undefined" && (window as any).umami) {
                (window as any).umami.track("Quiz_Start");
            }
            setHasStartedTracking(true);
        }
        // 1. Antwort speichern
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [currentStep]: { value: option.value, isProblem: !!option.isProblem },
        }));

        // 2. Weiter zur nächsten Frage oder zum Ladebildschirm
        if (currentStep < TOTAL_QUESTIONS) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setCurrentStep(99);
            }, 2500);
        }
    };

    return (
        <div className="quiz-wrapper center-wrapper">
            <div className="card quiz-card" id="audit-quiz">

                {/* Fortschrittsbalken nur anzeigen, wenn wir nicht im Lade- oder End-Screen sind */}
                {currentStep < 99 && !isLoading && (
                    <div className="quiz-header">
                        <div className="progress-track">
                            <div
                                className="progress-fill"
                                style={{ width: `${(currentStep / TOTAL_QUESTIONS) * 100}%` }}
                            ></div>
                        </div>
                        <p className="step-indicator">Frage {currentStep} von {TOTAL_QUESTIONS}</p>
                    </div>
                )}

                {/* AKTUELLE FRAGE (datengetrieben) */}
                {currentQuestion && !isLoading && (
                    <div className="quiz-step active" key={currentQuestion.id}>
                        <span className="quiz-eyebrow">{currentQuestion.section}</span>
                        <h3 className="quiz-question">{currentQuestion.title}</h3>
                        <p>{currentQuestion.text}</p>

                        <div className={currentQuestion.type === "segment" ? "quiz-segments" : "quiz-options"}>
                            {currentQuestion.options.map((opt, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => handleAnswer(opt)}
                                    className={currentQuestion.type === "segment" ? "quiz-segment-btn" : "quiz-option-btn"}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* LADEBILDSCHIRM */}
                {isLoading && (
                    <div className="quiz-step active" style={{ textAlign: "center", padding: "40px 0" }}>
                        <div className="loader-spinner"></div>
                        <h3 className="quiz-question" style={{ marginTop: "20px" }}>Ermittle Ihren Digitalisierungsgrad...</h3>
                        <p>Ihre Antworten werden ausgewertet. Bitte warten.</p>
                    </div>
                )}

                {/* LEAD CAPTURE / E-MAIL FORMULAR */}
                {currentStep === 99 && (
                    <div className="quiz-step active">
                        <h3 className="quiz-question highlight" style={{ textAlign: "center", fontSize: "1.6rem" }}>Audit erfolgreich abgeschlossen!</h3>
                        <p style={{ textAlign: "center", marginBottom: "30px" }}>
                            Wohin sollen wir Ihre detaillierte Auswertung und Ihren Digitalisierungs-Score senden?
                        </p>

                        <form
                            className="offer-container"
                            style={{ padding: 0 }}
                            onSubmit={async (e) => {
                                e.preventDefault(); // Verhindert das Neuladen der Seite

                                // --- E-Mail vor dem Absenden prüfen (fängt offensichtliche Tippfehler ab) ---
                                const emailTrimmed = email.trim();
                                if (!isValidEmailFormat(emailTrimmed)) {
                                    setEmailError("Bitte gib eine gültige E-Mail-Adresse ein.");
                                    return;
                                }

                                setIsSubmitting(true); // Button auf "Wird gespeichert..." setzen
                                setSubmitMessage(""); // Alte Fehlermeldungen löschen

                                // Formulardaten sauber auslesen
                                const formData = new FormData(e.currentTarget);
                                const name = formData.get('name');
                                const firma = formData.get('firma');

                                try {
                                    // Score berechnen: Wir zählen die kritischen Fehlerstellen ("isProblem")
                                    const fehlerScore = Object.values(answers).filter((a) => a.isProblem).length;

                                    // Segmentierung für die Lead-Qualifizierung (wird vom Backend ignoriert,
                                    // solange die DB-Tabelle nur den Score speichert – aber schon vorbereitet).
                                    const mitarbeiter = answers[1]?.value ?? null;
                                    const software = answers[2]?.value ?? null;

                                    const response = await fetch('/api/save-lead', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ name, email: emailTrimmed, firma, score: fehlerScore, max: MAX_SCORE, mitarbeiter, software })
                                    });
                                    const data = await response.json();

                                    if (response.ok) {
                                        setSubmitMessage("✅ Erfolgreich eingetragen! Die Auswertung ist auf dem Weg.");
                                        // Optional: Hier könntest du das Formular nach Erfolg ausblenden

                                        // --- Tracking für den Quiz-Abschluss ---
                                        if (typeof window !== 'undefined' && (window as any).umami) {
                                            (window as any).umami.track('Quiz_Submit_Lead');
                                        }
                                    } else {
                                        // Zeigt den Fehler aus der Datenbank (z.B. "E-Mail existiert schon")
                                        setSubmitMessage("❌ " + (data.message || "Es ist ein Fehler aufgetreten."));
                                    }
                                } catch (error) {
                                    console.error("Fetch-Fehler:", error);
                                    setSubmitMessage("❌ Netzwerkfehler. Bitte überprüfe deine Verbindung.");
                                } finally {
                                    setIsSubmitting(false); // Button wieder freigeben
                                }
                            }}
                        >
                            <input type="text" name="name" placeholder="Ihr Vorname" style={{ marginBottom: "12px" }} required disabled={isSubmitting} />
                            <input type="text" name="firma" placeholder="Firmenname oder Website-URL" style={{ marginBottom: "12px" }} required disabled={isSubmitting} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Ihre E-Mail-Adresse"
                                required
                                disabled={isSubmitting}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (emailError) setEmailError(null);
                                    setEmailSuggestion(suggestEmail(e.target.value));
                                }}
                                onBlur={() => setEmailSuggestion(suggestEmail(email))}
                            />

                            {emailSuggestion && (
                                <p className="email-suggest">
                                    Meinten Sie{" "}
                                    <button
                                        type="button"
                                        className="email-suggest-btn"
                                        onClick={() => {
                                            setEmail(emailSuggestion);
                                            setEmailSuggestion(null);
                                            setEmailError(null);
                                        }}
                                    >
                                        {emailSuggestion}
                                    </button>
                                    ?
                                </p>
                            )}

                            {emailError && <p className="email-error">{emailError}</p>}

                            <button
                                type="submit"
                                className="cta-roadmap"
                                style={{ width: "100%", marginTop: "20px", opacity: isSubmitting ? 0.7 : 1 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Wird gespeichert..." : "Auswertung jetzt freischalten"}
                            </button>

                            {/* Hier wird die Erfolgs- oder Fehlermeldung angezeigt */}
                            {submitMessage && (
                                <p style={{
                                    textAlign: "center",
                                    marginTop: "15px",
                                    fontWeight: "bold",
                                    color: submitMessage.includes("✅") ? "var(--mint)" : "#ef4444"
                                }}>
                                    {submitMessage}
                                </p>
                            )}

                            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center", marginTop: "12px" }}>
                                100% sicher. Kein Spam. Abmeldung jederzeit möglich.
                            </p>
                        </form>
                    </div>
                )}

            </div>
        </div>
    );
}
