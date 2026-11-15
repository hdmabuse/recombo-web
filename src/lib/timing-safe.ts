import { timingSafeEqual } from "node:crypto";

/** Comparação em tempo constante para tokens; evita vazar prefixo por timing. */
export function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}
