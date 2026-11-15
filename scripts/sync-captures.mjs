#!/usr/bin/env node
/**
 * Sincroniza capturas do ArchiveBox (rede local) com o site (droplet).
 *
 * Por que existe: o ArchiveBox vive em 192.168.68.110, endereço privado que o
 * servidor público não alcança. Este script roda na SUA máquina (que enxerga o
 * ArchiveBox) e empurra os metadados para o site.
 *
 * Uso:
 *   ARCHIVEBOX_TOKEN=... CAPTURE_SYNC_TOKEN=... node scripts/sync-captures.mjs
 *
 * Variáveis:
 *   ARCHIVEBOX_URL    default http://192.168.68.110:8030
 *   ARCHIVEBOX_TOKEN  obrigatória (token da API do ArchiveBox)
 *   ARCHIVEBOX_TAG    default col:recombo
 *   SITE_URL          default https://recombo.com.br
 *   CAPTURE_SYNC_TOKEN  obrigatória (mesma do .env do servidor)
 *   DRY_RUN=1         só mostra o que faria
 */

const AB_URL = (process.env.ARCHIVEBOX_URL || "http://192.168.68.110:8030").replace(/\/$/, "");
const AB_TOKEN = process.env.ARCHIVEBOX_TOKEN || "";
const TAG = process.env.ARCHIVEBOX_TAG || "col:recombo";
const SITE = (process.env.SITE_URL || "https://recombo.com.br").replace(/\/$/, "");
const SYNC_TOKEN = process.env.CAPTURE_SYNC_TOKEN || "";
const DRY = !!process.env.DRY_RUN;

if (!AB_TOKEN) {
  console.error("erro: defina ARCHIVEBOX_TOKEN");
  process.exit(1);
}
if (!SYNC_TOKEN && !DRY) {
  console.error("erro: defina CAPTURE_SYNC_TOKEN (o mesmo do .env do servidor)");
  process.exit(1);
}

async function ab(path) {
  const res = await fetch(`${AB_URL}${path}`, {
    headers: { Authorization: `Bearer ${AB_TOKEN}`, Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`ArchiveBox ${res.status} em ${path}`);
  return res.json();
}

async function listAll() {
  const out = [];
  let offset = 0;
  for (;;) {
    const page = await ab(
      `/api/v1/core/snapshots?tag=${encodeURIComponent(TAG)}&limit=100&offset=${offset}`,
    );
    const batch = page.items ?? [];
    out.push(...batch);
    offset += batch.length;
    if (batch.length === 0 || offset >= (page.total_items ?? 0)) break;
  }
  return out;
}

const snapshots = await listAll();
console.log(`ArchiveBox: ${snapshots.length} capturas na tag ${TAG}`);

const items = snapshots.map((s) => ({
  snapshotId: s.id,
  url: s.url,
  title: s.title ?? null,
  capturedAt: s.bookmarked_at || s.created_at || null,
  tags: s.tags ?? [],
}));

if (DRY) {
  console.log(`[dry] enviaria ${items.length} itens para ${SITE}/api/internal/captures/sync`);
  console.log(JSON.stringify(items.slice(0, 2), null, 2));
  process.exit(0);
}

const res = await fetch(`${SITE}/api/internal/captures/sync`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${SYNC_TOKEN}` },
  body: JSON.stringify({ items }),
});

const body = await res.json().catch(() => ({}));
if (!res.ok) {
  console.error(`falhou (${res.status}):`, body.error || body);
  process.exit(1);
}
console.log(`ok: ${body.created} criadas, ${body.updated} atualizadas`);
