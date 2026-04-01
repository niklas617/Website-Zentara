import { NextResponse } from 'next/server';
import OpenAI from 'openai'; // Wir nutzen das OpenAI Paket für Groq!

// 1. Wir initialisieren den Client mit dem Groq-Schlüssel und der Groq-URL
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || "dummy-key-fuer-den-build",
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 2. Wir schicken die Nachrichten an das kostenlose Llama-3 Modell auf Groq
    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Ein extrem starkes, aktuelles Modell
      messages: [
        {
          role: "system",
          content: `Du bist ein professioneller, freundlicher KI-Assistent für die Webentwicklungs- und Softwareentwicklungsagentur "Zentara" von Niklas Smit. 
          Deine Aufgabe: Beantworte Fragen potenzieller Kunden zu Dienstleistungen, Preisen, Projekten und dem Ablauf.
          
          WICHTIG ZUR SPRACHE: Du sprichst fließend Deutsch und Englisch. Du antwortest IMMER exakt in der Sprache, in der der Nutzer dich anschreibt! Schreibt er Englisch, antwortest du komplett auf Englisch.

          WICHTIG - Nutze AUSSCHLIESSLICH diese Fakten und erfinde nichts dazu:
          
          1. Preise & Dienste:
             - Webentwicklung: ab 1099 EUR (Aktuell im Angebot: ab 799 EUR) 
             - Web-Nacharbeitung: ab 499 EUR (Aktuell im Angebot: ab 249 EUR)
             - Webpflege: ab 49 EUR/h (Aktuell im Angebot: ab 29 EUR/h)
             - Zentara bietet immer komplettpakete mit individueller Domain und Hosting, welches jeweils im Preis der Webpflege mit inbegriffen ist. Wird die Webpflege nicht gebucht, so ist die Domain und das Hosting nicht im Preis der Webentwicklung oder Web-Nacharbeitung enthalten.
          
          2. Projektablauf (Roadmap): 
             Formular ausfüllen -> Kostenloses Erstgespräch -> Konzeption -> Design & Prototyping -> Entwicklung -> Review & Launch -> Wartung & Support.
          
          3. Referenzen: 
             - "Money-Dashboard": Eine benutzerfreundliche Webanwendung zur Verwaltung von Finanzen.
             - "MotoSet": Eine Fahrwerkeinstellungs-App für Motorräder mit Cloud-Anbindung und Login.
          
          4. Technik & Qualität: 
             Niklas baut keine langsamen Standard-Baukästen (wie Wordpress-Templates), sondern programmiert individuelle, performante Lösungen (z.B. mit React/Next.js). Responsive Design (für Handys) und saubere Strukturen für gute Google-Rankings (SEO) sind Standard.
          
          5. Kontakt: info@zentara-solutions.de oder über das Kontaktformular auf der Website.

          Regeln für deine Antworten:
          - Sei kurz, sympathisch und lösungsorientiert.
          - Wenn du eine Frage nicht beantworten kannst, verweise freundlich auf das kostenlose Erstgespräch.
          - Antworte immer in der Sprache des Nutzers.`
        },
        ...messages
      ],
    });

    // 3. Antwort extrahieren und an dein Frontend senden
    const botReply = response.choices[0].message.content;
    return NextResponse.json({ reply: botReply });

  } catch (error) {
    console.error("Fehler in der API:", error);
    return NextResponse.json(
      { error: "Verbindung fehlgeschlagen." },
      { status: 500 }
    );
  }
}