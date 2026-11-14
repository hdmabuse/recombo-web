/**
 * Sessão de administração — compatível com Edge (middleware) e Node (rotas).
 *
 * Estratégia: cookie assinado com HMAC-SHA256 (Web Crypto).
 * Credenciais vêm de ADMIN_EMAIL/ADMIN_PASSWORD; o segredo de AUTH_SECRET
 * (ou NEXTAUTH_SECRET, já previsto no .env.example).
 *
 * Isto é um guarda-corpo simples para um acervo de uma pessoa. Para múltiplos
 * curadores, migre para o modelo User + NextAuth/Supabase.
 */

export const SESSION_COOKIE = "recombo_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12h

const encoder = new TextEncoder();

function secret(): string {
  return process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "";
}

export function isAuthConfigured(): boolean {
  return Boolean(secret() && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD);
}

function b64urlEncode(text: string): string {
  const bytes = encoder.encode(text);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function hmacHex(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Comparação em tempo constante (evita vazar o tamanho do segredo). */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(email: string): Promise<string> {
  const payload = b64urlEncode(
    JSON.stringify({ sub: email, exp: Date.now() + SESSION_TTL_SECONDS * 1000 }),
  );
  return `${payload}.${await hmacHex(payload)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || !token.includes(".")) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = await hmacHex(payload);
  if (!safeEqual(signature, expected)) return false;

  try {
    const data = JSON.parse(b64urlDecode(payload)) as { exp?: number };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

/** Valida as credenciais informadas no login. */
export function checkCredentials(email: string, password: string): boolean {
  const expectedEmail = process.env.ADMIN_EMAIL || "";
  const expectedPassword = process.env.ADMIN_PASSWORD || "";
  if (!expectedEmail || !expectedPassword) return false;
  return (
    safeEqual(email.trim().toLowerCase(), expectedEmail.trim().toLowerCase()) &&
    safeEqual(password, expectedPassword)
  );
}

export const SESSION_MAX_AGE = SESSION_TTL_SECONDS;
