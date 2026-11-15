import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const API_ROOT = join(process.cwd(), "src", "app", "api");

/** Percorre o diretório de rotas e devolve todos os route.ts. */
function routeFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...routeFiles(full));
    } else if (entry === "route.ts") {
      out.push(full);
    }
  }
  return out;
}

/** Rotas que recebem arquivo (não têm body JSON para validar com zod). */
const FILE_UPLOAD_ROUTES = ["/admin/upload/", "/admin/import/"];

/** Rotas de ação sem corpo JSON (não há o que validar com zod). */
const ACTION_ONLY_ROUTES = ["/admin/captures/purge/"];

const files = routeFiles(API_ROOT);
const rel = (file: string) => file.slice(API_ROOT.length).replace(/\\/g, "/");
const source = (file: string) => readFileSync(file, "utf8");
const isMutation = (code: string) => /export async function (POST|PUT|PATCH|DELETE)/.test(code);

describe("proteção das rotas de API", () => {
  it("encontra as rotas esperadas", () => {
    expect(files.length).toBeGreaterThanOrEqual(15);
  });

  it("toda rota /api/admin/* tem guard próprio (não só middleware)", () => {
    const admin = files.filter((f) => rel(f).startsWith("/admin/"));
    const semGuard = admin.filter((f) => !source(f).includes("requireRole"));
    expect(semGuard.map(rel)).toEqual([]);
  });

  it("toda mutação admin valida entrada com zod", () => {
    const mutacoes = files.filter(
      (f) =>
        rel(f).startsWith("/admin/") &&
        isMutation(source(f)) &&
        !FILE_UPLOAD_ROUTES.some((p) => rel(f).includes(p)) &&
        !ACTION_ONLY_ROUTES.some((p) => rel(f).includes(p)),
    );
    const semZod = mutacoes.filter((f) => !source(f).includes("safeParse"));
    expect(semZod.map(rel)).toEqual([]);
  });

  it("rotas internas comparam token em tempo constante", () => {
    const internas = files.filter((f) => rel(f).startsWith("/internal/"));
    expect(internas.length).toBeGreaterThan(0);
    const fracas = internas.filter((f) => !source(f).includes("safeEqual"));
    expect(fracas.map(rel)).toEqual([]);
  });

  it("nenhuma rota pública permite escrita", () => {
    const publicas = files.filter(
      (f) => !rel(f).startsWith("/admin/") && !rel(f).startsWith("/internal/"),
    );
    const escrita = publicas.filter((f) => isMutation(source(f)));
    expect(escrita.map(rel)).toEqual([]);
  });

  it("rotas de upload/import declaram limite de tamanho", () => {
    for (const f of files.filter((file) => FILE_UPLOAD_ROUTES.some((p) => rel(file).includes(p)))) {
      expect(source(f).toLowerCase()).toMatch(/size|limite|max|uploadservice|importservice/);
    }
  });
});
