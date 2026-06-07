import { NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';

export async function POST(request: Request) {
  try {
    // 1. Die Daten aus dem Frontend-Request auslesen
    const body = await request.json();
    const { name, email, score } = body;

    // 2. Sicherheits-Check: Prüfen, ob Pflichtfelder ausgefüllt sind
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name und E-Mail sind erforderlich.' },
        { status: 400 }
      );
    }

    // 3. Verbindung zur neuen Neon-Datenbank herstellen
    // Das Paket @neondatabase/serverless managt die Verbindung optimal für Vercel
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    // 4. SQL-Befehl vorbereiten (Parameterized Query schützt dich vor SQL-Injection)
    const query = `
      INSERT INTO website_leads (name, email, score) 
      VALUES ($1, $2, $3) 
      RETURNING id, created_at
    `;
    const values = [name, email, score];
    
    // 5. Query ausführen
    const result = await pool.query(query, values);
    
    // 6. Verbindung sauber schließen
    await pool.end();

    // 7. Erfolgsmeldung ans Frontend zurückgeben
    return NextResponse.json({ 
      success: true, 
      message: 'Lead erfolgreich gespeichert.',
      leadId: result.rows[0].id
    }, { status: 200 });

  } catch (error: any) {
    console.error('Datenbank-Fehler beim Speichern des Leads:', error);
    
    // Postgres-Fehlercode 23505 bedeutet: Unique Violation (E-Mail gibt es schon)
    if (error.code === '23505') {
      return NextResponse.json({ 
        success: false, 
        message: 'Diese E-Mail-Adresse wurde bereits für einen Audit eingetragen.' 
      }, { status: 409 });
    }

    // Generischer Fehler für alle anderen Probleme
    return NextResponse.json({ 
      success: false, 
      message: 'Ein interner Serverfehler ist aufgetreten.' 
    }, { status: 500 });
  }
}