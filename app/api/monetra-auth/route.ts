import { NextResponse } from "next/server";
import { MONETRA_COOKIE, tokenForPassword } from "../../../lib/monetra-auth";

// Prüft das eingegebene Passwort gegen MONETRA_PASSWORD (serverseitig) und
// setzt bei Erfolg ein httpOnly-Cookie mit dem Token.
export async function POST(req: Request) {
  const pw = process.env.MONETRA_PASSWORD;
  if (!pw) {
    return NextResponse.json(
      { message: "Zugang ist noch nicht konfiguriert (MONETRA_PASSWORD fehlt)." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Ungültige Anfrage." }, { status: 400 });
  }

  const input =
    body && typeof body === "object" && typeof (body as { password?: unknown }).password === "string"
      ? (body as { password: string }).password
      : "";

  if (input !== pw) {
    return NextResponse.json({ message: "Falsches Passwort." }, { status: 401 });
  }

  const token = await tokenForPassword(pw);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(MONETRA_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/monetra",
    maxAge: 60 * 60 * 24 * 14, // 14 Tage
  });
  return res;
}

// Abmelden: Cookie löschen.
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(MONETRA_COOKIE, "", { httpOnly: true, path: "/monetra", maxAge: 0 });
  return res;
}
