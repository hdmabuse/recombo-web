#!/usr/bin/env node
/**
 * Ingestão automatizada de Obras e Artistas a partir de reportagens (texto livre).
 *
 * Para cada arquivo de texto, usa o Claude para extrair JSON estruturado
 * (artistas + obras), cria os artistas primeiro (deduplicando por slug),
 * e então cria as obras já vinculadas aos artistas.
 *
 * Uso:
 *   npm install @anthropic-ai/sdk          # uma vez
 *   export ANTHROPIC_API_KEY=sk-ant-...
 *   node scripts/ingest-articles.mjs ./reportagens            # roda de verdade
 *   DRY_RUN=1 node scripts/ingest-articles.mjs ./reportagens  # só mostra o que faria
 *
 * Variáveis de ambiente:
 *   ANTHROPIC_API_KEY  (obrigatória)
 *   RECOMBO_API_BASE   (default: https://recombo.com.br)
 *   ARTICLES_DIR       (ou passe como 1º argumento; default: ./reportagens)
 *   DRY_RUN=1          não grava nada, apenas imprime
 *   STATUS             status das obras criadas: draft (default) | published
 */

import Anthropic from "@anthropic-ai/sdk";
import { readdir, readFile } from "node:fs/promises";
import { join, extname } from "node:path";

const API_BASE = process.env.RECOMBO_API_BASE || "https://recombo.com.br";
const ARTICLES_DIR = process.argv[2] || process.env.ARTICLES_DIR || "./reportagens";
const DRY_RUN = !!process.env.DRY_RUN;
const STATUS = process.env.STATUS || "draft";
const MODEL = "claude-opus-4-8";

const ARTWORK_TYPES = [
  "audio",
  "video",
  "image",
  "text",
  "installation",
  "performance",
  "website",
  "software",
];

const anthropic = new Anthropic(); // lê ANTHROPIC_API_KEY do ambiente

// ---- mesmo slugify do app (src/lib/utils.ts) ----
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---- schema de extração (structured outputs) ----
const EXTRACTION_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    artists: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          name: { type: "string", description: "Nome do artista ou coletivo" },
          bioShort: { type: "string", description: "Bio curta (1 frase). Vazio se não houver." },
          bio: { type: "string", description: "Bio mais longa extraída da matéria. Vazio se não houver." },
          roles: { type: "array", items: { type: "string" }, description: "Ex: músico, artista visual, programador" },
          birthPlace: { type: "string", description: "Cidade/estado de origem. Vazio se não mencionado." },
          website: { type: "string", description: "URL se mencionada. Vazio caso contrário." },
        },
        required: ["name", "bioShort", "bio", "roles", "birthPlace", "website"],
      },
    },
    artworks: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          type: { type: "string", enum: ARTWORK_TYPES },
          year: { anyOf: [{ type: "integer" }, { type: "null" }], description: "Ano da obra, ou null se desconhecido" },
          description: { type: "string" },
          medium: { type: "string", description: "Meio/formato (ex: faixa, vídeo, instalação). Vazio se não houver." },
          genres: { type: "array", items: { type: "string" } },
          tags: { type: "array", items: { type: "string" }, description: "Palavras-chave: lugares, temas, projetos" },
          artistNames: { type: "array", items: { type: "string" }, description: "Nomes (devem casar com a lista 'artists')" },
          role: { type: "string", description: "Papel do artista na obra (ex: criador). Vazio se indefinido." },
        },
        required: ["title", "type", "year", "description", "medium", "genres", "tags", "artistNames", "role"],
      },
    },
  },
  required: ["artists", "artworks"],
};

const SYSTEM = `Você extrai metadados de acervo cultural a partir de reportagens (revistas, sites, jornais) em português.
Regras:
- Extraia SOMENTE o que estiver no texto. Não invente fatos, datas ou nomes.
- Campos sem informação no texto: use "" (string vazia), [] (lista vazia) ou null (ano).
- "type" deve ser um dos: ${ARTWORK_TYPES.join(", ")}. Escolha o mais adequado; use "text" para reportagens/entrevistas sobre a obra quando o tipo da obra não for claro.
- Um artigo pode descrever 0, 1 ou várias obras e vários artistas.
- artworks[].artistNames deve usar exatamente os mesmos nomes que aparecem em artists[].name.`;

async function extractFromArticle(text, filename) {
  const res = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 8000,
    system: SYSTEM,
    output_config: { format: { type: "json_schema", schema: EXTRACTION_SCHEMA } },
    messages: [
      { role: "user", content: `Reportagem (arquivo: ${filename}):\n\n${text}` },
    ],
  });
  const block = res.content.find((b) => b.type === "text");
  if (!block) throw new Error("Sem saída de texto do modelo");
  return JSON.parse(block.text);
}

// ---- API helpers ----
async function api(path, init) {
  const r = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!r.ok) {
    const body = await r.text().catch(() => "");
    throw new Error(`${init?.method || "GET"} ${path} -> ${r.status} ${body}`);
  }
  return r.json();
}

async function loadExistingArtists() {
  const list = await api("/api/admin/artists");
  const map = new Map();
  for (const a of list) map.set(a.slug, a.id);
  return map;
}

async function ensureArtist(artist, slugToId) {
  const slug = slugify(artist.name);
  if (slugToId.has(slug)) return slugToId.get(slug);
  if (DRY_RUN) {
    console.log(`   [dry] criaria artista: ${artist.name} (${slug})`);
    slugToId.set(slug, `dry-${slug}`);
    return slugToId.get(slug);
  }
  const created = await api("/api/admin/artists", {
    method: "POST",
    body: JSON.stringify({
      name: artist.name,
      bio: artist.bio || undefined,
      bioShort: artist.bioShort || undefined,
      roles: artist.roles || [],
      birthPlace: artist.birthPlace || undefined,
      website: artist.website || undefined,
    }),
  });
  slugToId.set(slug, created.id);
  console.log(`   + artista: ${artist.name} (${created.id})`);
  return created.id;
}

async function createArtwork(aw, slugToId) {
  const slug = `${slugify(aw.title)}-${Date.now().toString(36)}`;
  const artists = (aw.artistNames || [])
    .map((n) => slugToId.get(slugify(n)))
    .filter(Boolean)
    .map((artistId) => ({ artistId, role: aw.role || "criador" }));

  const payload = {
    slug,
    title: aw.title,
    type: aw.type,
    year: aw.year ?? undefined,
    description: aw.description || undefined,
    medium: aw.medium || undefined,
    genres: aw.genres || [],
    tags: aw.tags || [],
    license: "LUCR",
    status: STATUS,
    artists,
  };

  if (DRY_RUN) {
    console.log(`   [dry] criaria obra: ${aw.title} [${aw.type}] ↳ ${artists.length} artista(s)`);
    return;
  }
  const created = await api("/api/admin/artworks", { method: "POST", body: JSON.stringify(payload) });
  console.log(`   + obra: ${aw.title} (${created.id}) ↳ ${artists.length} artista(s)`);
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("Faltou ANTHROPIC_API_KEY no ambiente.");
    process.exit(1);
  }
  console.log(`Base: ${API_BASE} | Dir: ${ARTICLES_DIR} | Status: ${STATUS}${DRY_RUN ? " | DRY-RUN" : ""}`);

  const entries = await readdir(ARTICLES_DIR);
  const files = entries.filter((f) => [".txt", ".md"].includes(extname(f).toLowerCase()));
  if (!files.length) {
    console.error(`Nenhum .txt/.md em ${ARTICLES_DIR}`);
    process.exit(1);
  }

  const slugToId = await loadExistingArtists();
  console.log(`Artistas já cadastrados: ${slugToId.size}`);

  let okArtists = 0, okArtworks = 0, failed = 0;
  for (const file of files) {
    const text = await readFile(join(ARTICLES_DIR, file), "utf8");
    if (!text.trim()) continue;
    console.log(`\n=== ${file} ===`);
    try {
      const { artists, artworks } = await extractFromArticle(text, file);
      console.log(`   extraídos: ${artists.length} artista(s), ${artworks.length} obra(s)`);
      for (const a of artists) {
        await ensureArtist(a, slugToId);
        okArtists++;
      }
      for (const aw of artworks) {
        await createArtwork(aw, slugToId);
        okArtworks++;
      }
    } catch (err) {
      failed++;
      console.error(`   ! erro em ${file}: ${err.message}`);
    }
  }

  console.log(`\nResumo: ${okArtists} artistas, ${okArtworks} obras, ${failed} arquivo(s) com erro.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
