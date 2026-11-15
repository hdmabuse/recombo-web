# Proposta de refatoração — recombo.com.br

**Data:** 15/11/2026
**Objetivo:** tornar o desenvolvimento **seguro**, **confiável** e **livre para mudar a apresentação**
(o que o leitor vê em `recombo.com.br`) sem tocar no modelo de dados.

Esta proposta foi construída em **três loops**: inventário com evidências → desenho da
arquitetura-alvo → revisão adversarial (o que cortar, o que adiar, o que pode dar errado).

---

# Loop 1 — Diagnóstico com evidências

| Métrica                 | Valor                                                                 |
| ----------------------- | --------------------------------------------------------------------- |
| Arquivos em `src/`      | 96                                                                    |
| Linhas de código        | ~9.300                                                                |
| Rotas de API            | 17                                                                    |
| Testes                  | **0** (vitest, testing-library, playwright e storybook já instalados) |
| Migrações versionadas   | **0** (deploy usa `prisma db push`)                                   |
| Monitoramento / alertas | **0**                                                                 |
| `npm audit --omit=dev`  | **3 critical, 5 high, 1 moderate**                                    |

## 1.1 Segurança

| #   | Achado                                                  | Evidência                                                                                                      | Impacto                                           |
| --- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| S1  | 6 rotas admin **sem validação** de entrada              | `admin/{events,fields,import,stats,tags,upload}/route.ts`                                                      | mass assignment / dados inválidos                 |
| S2  | 2 rotas admin **sem guard** próprio                     | `admin/captures`, `admin/stats`                                                                                | dependem só do middleware — falha em profundidade |
| S3  | Upload valida MIME **declarado pelo cliente**           | `services/upload.service.ts`                                                                                   | arquivo disfarçado, decompression bomb            |
| S4  | Vulnerabilidades conhecidas                             | 3 critical (`next`, `next-auth`, `@auth/core`) e 5 high (`zod`, `sharp`, `nanoid`, `postcss`, `source-map-js`) | exploração pública                                |
| S5  | Rate limit **em memória**, só no login                  | `lib/rate-limit.ts`                                                                                            | reinicia com o processo; não cobre escritas       |
| S6  | Sem trilha de auditoria                                 | —                                                                                                              | não se sabe quem publicou/alterou o quê           |
| S7  | `recombo.art.br` sob controle de terceiro (spam adulto) | DNS → `50.116.112.117`                                                                                         | fraude de marca / phishing                        |

**Mapa das rotas de escrita** (todas exigem sessão via middleware; nem todas têm guard próprio):

| Rota                                                                        | Guard adicional             |
| --------------------------------------------------------------------------- | --------------------------- |
| `admin/artists`, `artworks`, `events`, `fields`, `tags`, `import`, `upload` | `requireRole`               |
| `admin/captures`                                                            | **nenhum** (só middleware)  |
| `internal/captures/{sync,screenshot}`                                       | Bearer `CAPTURE_SYNC_TOKEN` |

**Teste de invasão feito nesta análise** — `/api/media` contra path traversal:

```
../../package.json                    → 404
..%2f..%2fpackage.json                → 415 (bloqueado pela allowlist)
%2e%2e/../package.json                → 404
captures/..%2f..%2f..%2fpackage.json  → 415
```

Nenhum vazamento: a validação de extensão e o bloqueio de `..` funcionam.

**O que já está bom:** `middleware` protege `/admin` e `/api/admin`; `requireRole` com RBAC;
cabeçalhos de segurança no `next.config.js`; `stripSystemFields`; allowlist de MIME no upload;
`/api/media` resiste a path traversal; rotas internas com Bearer token; rate limit no login.
A base é sólida — o que falta é **cobertura e consistência**, não reescrita.

## 1.2 Confiabilidade

| #   | Achado                           | Evidência                               | Impacto                                         |
| --- | -------------------------------- | --------------------------------------- | ----------------------------------------------- |
| R1  | **Sem testes**                   | 0 arquivos `*.test.ts(x)`               | regressão silenciosa a cada deploy              |
| R2  | **Sem migrações**                | `prisma db push` no `scripts/deploy.sh` | alteração destrutiva sem revisão                |
| R3  | Uploads em **disco local**       | `public/uploads`                        | some se o servidor for recriado; fora do backup |
| R4  | **Sem backup** de banco/uploads  | —                                       | perda total em incidente                        |
| R5  | **Sem healthcheck** público      | nenhum `/api/health`                    | falha passa despercebida                        |
| R6  | **Sem observabilidade**          | 3 `console.error` em 17 rotas           | erro em produção é invisível                    |
| R7  | Páginas públicas `force-dynamic` | `obra/[slug]`, `arquivo/capturas`       | todo request bate no banco                      |
| R8  | **Sem error boundaries**         | nenhum `error.tsx` / `not-found.tsx`    | erro de render derruba a página inteira         |
| R9  | Sync de capturas **manual**      | `scripts/sync-captures.mjs`             | acervo desatualizado sem aviso                  |

## 1.3 Liberdade de apresentação

| #   | Achado                             | Evidência                                            | Impacto                                         |
| --- | ---------------------------------- | ---------------------------------------------------- | ----------------------------------------------- |
| L1  | Páginas misturam dados e JSX       | `app/obra/[slug]/page.tsx` consulta Prisma e desenha | trocar layout exige mexer em lógica             |
| L2  | `/arquivo` é **client-side**       | `app/arquivo/page.tsx` (`"use client"` + hook)       | sem SSR/SEO, TTFB pior, layout amarrado ao hook |
| L3  | Header/Footer fixos no layout raiz | `app/layout.tsx`                                     | difícil ter skins por seção                     |
| L4  | Tokens existem, catálogo é parcial | `tailwind.config.ts` + 5 stories                     | sem contrato visual do design system            |
| L5  | Imagens sem `next/image`           | 0 usos de `next/image`, 5 `<img>`                    | LCP pior, sem srcset                            |
| L6  | Sem `sitemap`, `robots`, JSON-LD   | —                                                    | SEO fraco para um arquivo público               |
| L7  | Sem ambiente de prévia de layout   | —                                                    | testar visual só em produção                    |

---

# Loop 2 — Arquitetura-alvo

## 2.1 Princípio central

> **Conteúdo é dado; apresentação é composição.** O leitor vê um _template_ alimentado por
> um _view-model_; trocar o template não pode exigir tocar em regra de negócio nem em banco.

## 2.2 Camadas

```
app/            rotas finas: só orquestram (RSC)
  └── content/  adapters: Prisma/DTO → view-model de apresentação
        └── services/   casos de uso (publicar, curar, sincronizar)
              └── repositories/  acesso a dados (Prisma isolado aqui)
                    └── contracts/  zod: entrada e saída compartilhadas
ui/
  ├── primitives/  Button, Card, Input…        (sem regra de negócio)
  ├── blocks/      ArtworkCard, CaptureCard, MetaList
  ├── templates/   ArchiveTemplate, ArtworkTemplate, CapturesTemplate
  └── skins/       tokens + variações visuais (CSS vars)
```

**Contratos de saída (view-models)** — exemplo:

```ts
// content/artwork.ts
export type ArtworkView = {
  title: string;
  year: number | null;
  description: string; // texto puro, quebras preservadas
  hero: { src: string; width: number; height: number } | null;
  artists: { name: string; role: string | null }[];
  files: { label: string; href: string }[];
  license: { code: string; label: string };
};
```

A página fica:

```tsx
export default async function Page({ params }) {
  const view = await getArtworkView(params.slug); // content/
  if (!view) notFound();
  return <ArtworkTemplate view={view} />; // ui/templates
}
```

Trocar o layout = novo arquivo em `ui/templates` + skin. **Nenhum** arquivo em `app/` ou
`services/` muda.

## 2.3 Eixos e ações

### A. Segurança (defesa em profundidade)

| Ação                         | Detalhe                                                                                                                                                   | Aceite                                       |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| A1. Autorização central      | `withAuth(roles)` aplicado em **toda** rota `/api/admin/*`; teste que varre o diretório e falha se faltar guard                                           | 0 rotas sem guard (teste automatizado)       |
| A2. Zod em todas as mutações | schemas em `contracts/`; validar body **e** query; erros 422 padronizados                                                                                 | 100% das rotas de escrita                    |
| A3. Upload endurecido        | validação por _magic bytes_ (`sharp().metadata()`), limite de pixels, remoção de EXIF, nome UUID, storage abstraído (`StorageAdapter`: S3/Supabase/local) | arquivo disfarçado rejeitado em teste        |
| A4. Rate limit compartilhado | Redis/Upstash para login e escritas                                                                                                                       | limite sobrevive a restart e multi-instância |
| A5. CSP com nonce            | `script-src 'nonce-…'` em report-only → enforce                                                                                                           | 0 violações em 7 dias                        |
| A6. Auditoria                | tabela `AuditLog(actor, action, entity, before, after, ip, at)`                                                                                           | toda publicação/alteração registrada         |
| A7. Dependências             | Dependabot + `npm audit` no CI; plano de upgrade (auth, zod, sharp, nanoid; `next` major planejado)                                                       | 0 critical/high                              |
| A8. Segredos                 | rotação dos tokens expostos; cofre (Doppler/1Password); `.env` só no servidor                                                                             | nenhum segredo em doc/chat/repo              |
| A9. Domínio                  | recuperar/reivindicar `recombo.art.br` ou registrar variantes; monitorar phishing                                                                         | domínio sob controle                         |

### B. Confiabilidade

| Ação                      | Detalhe                                                                                                               | Aceite                                    |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| B1. Migrações versionadas | baseline + `prisma migrate deploy` no deploy                                                                          | schema só muda por migration revisada     |
| B2. Testes em pirâmide    | unit (services/contracts) → integração (repos com Postgres efêmero) → e2e (Playwright: login, publicar, sync, upload) | cobertura ≥ 60% em `services`/`contracts` |
| B3. CI de verdade         | PR: lint + tsc + test + build; main: deploy                                                                           | PR vermelho não entra                     |
| B4. Observabilidade       | `/api/health` (db + storage), Sentry, logs pino com request-id, uptime externo                                        | alerta em < 5 min                         |
| B5. Backups               | `pg_dump` diário + uploads para storage versionado; **teste de restore trimestral**                                   | restore documentado e executado           |
| B6. Error boundaries      | `error.tsx`, `not-found.tsx`, `global-error.tsx`                                                                      | falha isolada, não site fora              |
| B7. Cache/ISR             | páginas públicas com `revalidate` + revalidação on-demand ao publicar                                                 | p95 TTFB < 500 ms                         |
| B8. Sync agendado         | timer no ZimaOS + retry + registro de execuções                                                                       | acervo atualiza sozinho                   |

### C. Liberdade de apresentação

| Ação                     | Detalhe                                                        | Aceite                                |
| ------------------------ | -------------------------------------------------------------- | ------------------------------------- |
| C1. View-models          | `content/` monta DTO; páginas não importam Prisma              | 0 imports de Prisma em `app/(public)` |
| C2. Templates + skins    | `ui/templates` por página; `ui/skins` por variação             | troca de skin sem tocar em `app/`     |
| C3. Design system        | primitives + blocks + Storybook publicado; tokens documentados | catálogo navegável                    |
| C4. Público server-first | `/arquivo` vira RSC + ISR; filtros por rota (`?type=`)         | indexável e cacheável                 |
| C5. Imagens              | `next/image` com loader e srcset (miniaturas já geradas)       | LCP < 2,5 s                           |
| C6. Prévia de layout     | rota `/preview?skin=` (protegida) ou staging por branch        | validar visual antes do merge         |
| C7. SEO                  | `sitemap.ts`, `robots.ts`, JSON-LD de obra, RSS de capturas    | rich results válidos                  |
| C8. Acessibilidade       | foco visível, contraste, `aria` nos componentes                | axe sem erros críticos                |

---

# Loop 3 — Revisão adversarial e refinamento

O que a crítica mudou em relação ao rascunho:

| Decisão                                                        | Por quê                                                                   |
| -------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **Adiado**: migrar `next` para 16                              | é _major_; exige reteste completo. Vai na fase final, com branch dedicada |
| **Adiado**: GraphQL/tRPC                                       | REST + zod resolve; adicionar camada agora é custo sem retorno            |
| **Adiado**: i18n                                               | não há demanda; multiplica superfície                                     |
| **Cortado**: microserviços                                     | uma instância, um banco — YAGNI                                           |
| **Reforçado**: migrações antes de testes                       | sem schema versionado, teste de integração é instável                     |
| **Reforçado**: storage abstraído antes de "consertar" Supabase | hoje o fallback local é o caminho real; a abstração evita novo retrabalho |
| **Mantido**: NextAuth                                          | já endurecido com RBAC e rate limit; trocar seria regressão               |
| **Novo**: teste que varre rotas                                | sem isso, "toda rota protegida" é promessa, não garantia                  |
| **Novo**: `/preview?skin=`                                     | liberdade de layout sem staging completo                                  |

## Sequenciamento (por dependência, não por desejo)

```
F0 higiene → F1 segurança → F2 confiabilidade → F3 apresentação → F4 upgrades
```

---

# Roadmap

## F0 — Higiene (2–3 dias) · risco baixo

- Rotacionar tokens expostos; cofre de segredos
- `recombo.art.br`: decisão (recuperar ou registrar variante)
- `/api/health` + uptime externo
- Backups de banco e uploads + documentar restore
- `error.tsx`, `not-found.tsx`, `global-error.tsx`
- Dependabot ligado

## F1 — Segurança (1–2 semanas) · risco médio

- `withAuth` em 100% das rotas + teste de varredura
- zod em todas as mutações (contracts)
- Upload: magic bytes, limite de pixels, EXIF, `StorageAdapter`
- Rate limit compartilhado (login + escritas)
- CSP nonce em report-only
- `AuditLog` nas ações de curadoria

## F2 — Confiabilidade (2–3 semanas) · risco médio

- Baseline de migrações + `migrate deploy`
- Testes unit + integração + 3 e2e (login, publicar, sync)
- CI com checks no PR
- Sentry + logs estruturados + request-id
- Backups automáticos + restore testado

## F3 — Apresentação (2–4 semanas) · risco baixo/médio

- `content/` (view-models) e `ui/templates`
- `/arquivo` server-side com ISR e filtros por rota
- `next/image` + srcset
- Storybook publicado + skins
- `sitemap`, `robots`, JSON-LD, RSS
- `/preview?skin=`

## F4 — Contínuo

- Upgrade `next` 16 (branch dedicada, e2e como rede)
- Acessibilidade e performance
- Revisão trimestral de dependências

---

# Critérios de aceite globais

1. **0** rotas `/api/admin/*` sem guard (teste automatizado no CI)
2. **100%** das mutações com schema zod
3. `npm audit` sem **critical/high**
4. Cobertura ≥ 60% em `services`/`contracts`
5. `/api/health` monitorado; alerta em < 5 min
6. Restore de backup executado e documentado
7. **Prova de liberdade de layout:** um PR que só altera `ui/templates` + `ui/skins` muda a
   home e a página de obra, sem tocar em `app/`, `services/` ou `prisma/` — validado por
   teste visual
8. p95 de TTFB < 500 ms nas páginas públicas

---

# Riscos da própria refatoração

| Risco                              | Mitigação                                                   |
| ---------------------------------- | ----------------------------------------------------------- |
| Upgrade `next` quebra algo         | branch isolada, e2e antes/depois, rollback por SHA          |
| Migração de uploads perde arquivos | copiar e conferir contagem/hash antes de remover o fallback |
| CSP enforce quebra script          | report-only por 7 dias, coleta de violações                 |
| Refatorar páginas muda visual      | screenshots de referência (Playwright) antes de cada PR     |
| Refatorar "tudo" de uma vez        | fases pequenas e reversíveis; deploy contínuo               |

---

# Anti-escopo (o que **não** fazer agora)

- Microserviços, GraphQL, tRPC, i18n
- Trocar Next.js ou NextAuth
- Reescrever o admin
- Banco novo ou ORM novo
- "Design system completo" antes de haver 3 telas estáveis

---

# Anexo — auditoria independente (loop 3)

> Executada em paralelo, sem conhecimento deste documento, com o mesmo repositório.
> Objetivo: confrontar a proposta com uma leitura cega.

| #   | Achado                                                   | Local                         | Esforço |
| --- | -------------------------------------------------------- | ----------------------------- | ------- |
| S1  | 3 falhas críticas + 5 altas em dependências              | `package.json:40-47`          | M       |
| S2  | `/api/obras/[slug]` devolvia draft/restricted            | `api/obras/[slug]/route.ts:6` | P       |
| S3  | `public/uploads` fora do `.gitignore`                    | `.gitignore`                  | P       |
| S4  | rotas admin sem guard interno                            | `captures:18`, `stats:6`      | P       |
| S5  | `error.message` de Prisma/sharp vazando                  | 6 rotas                       | P       |
| S6  | upload de 500 MB em memória                              | `upload.service.ts:21`        | M       |
| S7  | `snapshotId` interpolado no caminho                      | `screenshot/route.ts:83-86`   | P       |
| S8  | token interno com `===`; `/api/internal` fora do matcher | `sync:40`, `screenshot:31`    | P       |
| S9  | CSP sem `default-src`/`script-src`                       | `next.config.js:10`           | M       |
| S10 | upload confia no MIME do cliente                         | `upload.service.ts:26-40`     | M       |
| R1  | `db push` em produção                                    | `deploy.sh:36`                | G       |
| R2  | zero testes; CI sem teste                                | `package.json:12`             | G       |
| R3  | sem backup de banco/uploads                              | —                             | M       |
| R4  | sem `error.tsx`/`not-found.tsx`                          | `src/app/`                    | M       |
| R5  | sem monitoramento externo                                | `deploy.sh:51`                | P       |
| R6  | `Capture.artworkId` sem `unique` (obras duplicadas)      | `schema.prisma:413`           | M       |

Convergência: a auditoria cega confirmou os itens centrais desta proposta (dependências, migrações,
testes, backups, observabilidade) e acrescentou três que eu não havia visto — **vazamento em
`/api/obras`**, **`.gitignore` de uploads** e **`snapshotId` no caminho de arquivo**.

---

# Correções aplicadas durante esta análise (P0)

| Item | Correção                                                                                                 | Verificação                 |
| ---- | -------------------------------------------------------------------------------------------------------- | --------------------------- |
| S2   | `/api/obras/[slug]` agora exige `status=published` e `accessLevel=public`                                | build + rota testada        |
| S3   | `public/uploads/` adicionado ao `.gitignore`                                                             | `git check-ignore`          |
| S5   | erros internos genéricos ao cliente + `console.error` no servidor (captures, public/arquivo, screenshot) | build                       |
| S7   | `snapshotId` validado por `/^[a-zA-Z0-9-]{16,64}$/` antes de compor o nome do arquivo                    | teste com id inválido → 422 |
| S8   | comparação de token em tempo constante (`lib/timing-safe.ts`)                                            | build                       |

Os demais (S1, S4, S6, S9, S10, R1–R6) ficam no roadmap abaixo.
