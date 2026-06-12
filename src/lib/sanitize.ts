/**
 * Remove campos controlados pelo sistema antes de gravar via Prisma, evitando
 * mass-assignment (cliente não pode definir id, timestamps ou autoria).
 *
 * Mitigação imediata; a validação completa por campo (Zod com whitelist) deve
 * ser adicionada por entidade nas rotas conforme o payload de cada formulário.
 */
const SYSTEM_FIELDS = ["id", "createdAt", "updatedAt", "createdBy"] as const;

export function stripSystemFields<T extends Record<string, unknown>>(data: T): T {
  if (!data || typeof data !== "object") return data;
  const clone: Record<string, unknown> = { ...data };
  for (const field of SYSTEM_FIELDS) {
    delete clone[field];
  }
  return clone as T;
}
