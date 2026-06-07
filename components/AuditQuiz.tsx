"use client";

import React, { useState } from "react";

export default function AuditQuiz() {
    const [hasStartedTracking, setHasStartedTracking] = useState(false);
    // States für die Logik
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const totalQuestions = 7;
    // --- NEU: States für das Formular ---
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    // --- NEU: Hier speichern wir die genauen Antworten ---
    const [answers, setAnswers] = useState<Record<number, string>>({});

    // Funktion wird aufgerufen, wenn auf Ja/Nein geklickt wird
    const handleAnswer = (answer: string) => {
        if (!hasStartedTracking) {
            if (typeof window !== 'undefined' && (window as any).umami) {
                (window as any).umami.track('Quiz_Start');
            }
            setHasStartedTracking(true);
        }
        // 1. Antwort speichern (z.B. Frage 1 = "yes")
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [currentStep]: answer
        }));

        // 2. Weiter zur nächsten Frage oder zum Ladebildschirm
        if (currentStep < totalQuestions) {
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
                                style={{ width: `${(currentStep / totalQuestions) * 100}%` }}
                            ></div>
                        </div>
                        <p className="step-indicator">Frage {currentStep} von {totalQuestions}</p>
                    </div>
                )}

                {/* FRAGE 1 */}
                {currentStep === 1 && !isLoading && (
                    <div className="quiz-step active">
                        <h3 className="quiz-question">1. Die 2,5-Sekunden-Ladezeitregel</h3>
                        <p>Lädt Ihre Website auf einem Smartphone im normalen Mobilfunknetz in unter 2,5 Sekunden?</p>
                        <div className="quiz-options">
                            <button onClick={() => handleAnswer("yes")} className="quiz-option-btn">Ja, absolut</button>
                            <button onClick={() => handleAnswer("no")} className="quiz-option-btn">Nein / Weiß nicht</button>
                        </div>
                    </div>
                )}

                {/* FRAGE 2 */}
                {currentStep === 2 && !isLoading && (
                    <div className="quiz-step active">
                        <h3 className="quiz-question">2. Mobile-First als Standard</h3>
                        <p>Lassen sich alle Formulare auf dem Handy bedienen, ohne dass der Nutzer zoomen muss?</p>
                        <div className="quiz-options">
                            <button onClick={() => handleAnswer("yes")} className="quiz-option-btn">Ja, absolut</button>
                            <button onClick={() => handleAnswer("no")} className="quiz-option-btn">Nein / Weiß nicht</button>
                        </div>
                    </div>
                )}

                {/* FRAGE 3 */}
                {currentStep === 3 && !isLoading && (
                    <div className="quiz-step active">
                        <h3 className="quiz-question">3. Die unsichtbare Visitenkarte</h3>
                        <p>Werden Sie bei Google auf Seite 1 gefunden, wenn ein potenzieller Kunde exakt nach Ihrer Hauptdienstleistung sucht?</p>
                        <div className="quiz-options">
                            <button onClick={() => handleAnswer("yes")} className="quiz-option-btn">Ja, wir dominieren Seite 1</button>
                            <button onClick={() => handleAnswer("no")} className="quiz-option-btn">Nein / Überlassen wir der Konkurrenz</button>
                        </div>
                    </div>
                )}

                {/* FRAGE 4 */}
                {currentStep === 4 && !isLoading && (
                    <div className="quiz-step active">
                        <h3 className="quiz-question">4. Das Copy-Paste-Problem</h3>
                        <p>Landen Kundenanfragen automatisch, strukturiert und DSGVO-konform in Ihrem System, ohne dass Daten händisch abgetippt werden müssen?</p>
                        <div className="quiz-options">
                            <button onClick={() => handleAnswer("yes")} className="quiz-option-btn">Ja, alles vollautomatisiert</button>
                            <button onClick={() => handleAnswer("no")} className="quiz-option-btn">Nein / Leider viel Handarbeit</button>
                        </div>
                    </div>
                )}

                {/* FRAGE 5 */}
                {currentStep === 5 && !isLoading && (
                    <div className="quiz-step active">
                        <h3 className="quiz-question">5. Der Conversion-Blindflug</h3>
                        <p>Wissen Sie exakt, auf welcher Unterseite Ihre Website-Besucher abspringen und warum sie nicht bei Ihnen anfragen?</p>
                        <div className="quiz-options">
                            <button onClick={() => handleAnswer("yes")} className="quiz-option-btn">Ja, wir messen das präzise</button>
                            <button onClick={() => handleAnswer("no")} className="quiz-option-btn">Nein / Wir raten da eher</button>
                        </div>
                    </div>
                )}

                {/* FRAGE 6 */}
                {currentStep === 6 && !isLoading && (
                    <div className="quiz-step active">
                        <h3 className="quiz-question">6. Die Abhängigkeits-Falle</h3>
                        <p>Wenn Sie heute einen Text oder Preis ändern möchten: Können Sie das in 2 Minuten selbst erledigen, oder müssen Sie dafür Ihrem Webdesigner schreiben (und warten)?</p>
                        <div className="quiz-options">
                            <button onClick={() => handleAnswer("yes")} className="quiz-option-btn">Ja, mache ich in Sekunden selbst</button>
                            <button onClick={() => handleAnswer("no")} className="quiz-option-btn">Nein, müssen wir extra in Auftrag geben</button>
                        </div>
                    </div>
                )}
                {/* FRAGE 7 */}
                {currentStep === 7 && !isLoading && (
                    <div className="quiz-step active">
                        <h3 className="quiz-question">7. Das Vertrauens-Defizit</h3>
                        <p>Zeigt Ihre Website ohne zu scrollen echte Kundenstimmen oder Fallstudien, die sofort beweisen, dass Sie Ergebnisse liefern?</p>
                        <div className="quiz-options">
                            <button onClick={() => handleAnswer("yes")} className="quiz-option-btn">Ja, Social Proof ist stark sichtbar</button>
                            <button onClick={() => handleAnswer("no")} className="quiz-option-btn">Nein / Eher klassische Unternehmensvorstellung</button>
                        </div>
                    </div>
                )}

                {/* LADEBILDSCHIRM */}
                {isLoading && (
                    <div className="quiz-step active" style={{ textAlign: "center", padding: "40px 0" }}>
                        <div className="loader-spinner"></div>
                        <h3 className="quiz-question" style={{ marginTop: "20px" }}>Analysiere Website-Performance...</h3>
                        <p>Ihre Antworten werden ausgewertet. Bitte warten.</p>
                    </div>
                )}

                {/* LEAD CAPTURE / E-MAIL FORMULAR */}
                {currentStep === 99 && (
                    <div className="quiz-step active">
                        <h3 className="quiz-question highlight" style={{ textAlign: "center", fontSize: "1.6rem" }}>Audit erfolgreich abgeschlossen!</h3>
                        <p style={{ textAlign: "center", marginBottom: "30px" }}>
                            Wohin sollen wir Ihre detaillierte Auswertung und Ihren Performance-Score senden?
                        </p>

                        <form
                            className="offer-container"
                            style={{ padding: 0 }}
                            onSubmit={async (e) => {
                                e.preventDefault(); // Verhindert das Neuladen der Seite
                                setIsSubmitting(true); // Button auf "Wird gespeichert..." setzen
                                setSubmitMessage(""); // Alte Fehlermeldungen löschen

                                // Formulardaten sauber auslesen
                                const formData = new FormData(e.currentTarget);
                                const name = formData.get('name');
                                const email = formData.get('email');

                                try {
                                    // Score berechnen: Wir zählen die FEHLER (wie oft "no" geklickt wurde)
                                    const fehlerScore = Object.values(answers).filter(val => val === "no").length;

                                    const response = await fetch('/api/save-lead', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ name, email, score: fehlerScore }) // answers können wir weglassen, da unsere DB-Tabelle aktuell nur den Score speichert
                                    });
                                    const data = await response.json();

                                    if (response.ok) {
                                        setSubmitMessage("✅ Erfolgreich eingetragen! Die Auswertung ist auf dem Weg.");
                                        // Optional: Hier könntest du das Formular nach Erfolg ausblenden

                                        // --- NEU: Tracking für den Quiz-Abschluss ---
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
                            <input type="email" name="email" placeholder="Ihre beste E-Mail-Adresse" required disabled={isSubmitting} />

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