// Server-seitiger Passwortschutz für die versteckte Monetra-Seite.
// Das Klartext-Passwort liegt ausschließlich serverseitig in der Umgebungs-
// variable MONETRA_PASSWORD (z. B. in Vercel). Im Browser landet nur ein
// nicht-umkehrbarer SHA-256-Token als httpOnly-Cookie – nie das Passwort selbst.

export const MONETRA_COOKIE = "monetra_session";
const SALT = "zentara-monetra-v1";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Erzeugt den Cookie-Token aus dem Passwort (nicht umkehrbar). */
export async function tokenForPassword(pw: string): Promise<string> {
  return sha256Hex(`${SALT}:${pw}`);
}
