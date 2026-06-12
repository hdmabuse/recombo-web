/**
 * Rate limiter em memória para tentativas de login (mitiga brute-force).
 *
 * Janela fixa por chave (IP+email). Suficiente para a instância única em
 * produção (pm2). Observações:
 *  - O estado é por processo: reinicia ao reiniciar a app e não é compartilhado
 *    entre múltiplas instâncias. Para escala horizontal, migrar para um store
 *    compartilhado (ex.: Redis/Upstash).
 */
const WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const MAX_FAILURES = 5;

type Entry = { count: number; firstAt: number };
const attempts = new Map<string, Entry>();

function getFresh(key: string): Entry | undefined {
  const entry = attempts.get(key);
  if (!entry) return undefined;
  if (Date.now() - entry.firstAt > WINDOW_MS) {
    attempts.delete(key);
    return undefined;
  }
  return entry;
}

/** true quando a chave excedeu o limite de falhas dentro da janela. */
export function isRateLimited(key: string): boolean {
  const entry = getFresh(key);
  return !!entry && entry.count >= MAX_FAILURES;
}

/** Registra uma tentativa falha. */
export function recordFailure(key: string): void {
  const entry = getFresh(key);
  if (!entry) {
    attempts.set(key, { count: 1, firstAt: Date.now() });
  } else {
    entry.count += 1;
  }
}

/** Limpa o contador após login bem-sucedido. */
export function resetAttempts(key: string): void {
  attempts.delete(key);
}
