# Integração da curadoria com o ArchiveBox

Adiciona ao site a mesa de curadoria das capturas web (seleção, nota, publicação)
e a página pública correspondente. O ArchiveBox continua sendo a prova documental;
o site guarda apenas a decisão editorial.

## O que foi adicionado

| Arquivo | Função |
|---|---|
| `prisma/schema.prisma` | modelo `Capture` + enum `CaptureStatus`, relação com `Artwork` |
| `src/lib/archivebox.ts` | cliente da API do ArchiveBox (servidor, com token) |
| `src/app/api/admin/captures/route.ts` | GET (junta capturas + decisões) e POST (upsert) |
| `src/app/admin/captures/page.tsx` | mesa de curadoria (estado, título, nota, acesso) |
| `src/app/api/public/arquivo/route.ts` | recorte público em JSON (published + public) |
| `src/app/arquivo/capturas/page.tsx` | página pública com o recorte curado |
| `src/components/admin/AdminLayout.tsx` | item "Capturas" no menu do admin |

## Passo a passo para rodar

```bash
cp .env.example .env.local
# preencha DATABASE_URL, ARCHIVEBOX_URL, ARCHIVEBOX_TOKEN (sem NEXT_PUBLIC_)

npx prisma migrate dev --name add_captures   # cria a tabela Capture
npm run dev
```

- Curadoria: <http://localhost:3000/admin/captures>
- Público: <http://localhost:3000/arquivo/capturas>

## Como a publicação funciona

1. Toda captura nasce com `status = inbox` e `accessLevel = restricted`.
2. O curador muda para `selected` (entra no acervo) e revisa título/nota.
3. Só `status = published` **e** `accessLevel = public` aparece em `/arquivo/capturas`.
4. O `snapshotId` liga cada registro ao snapshot original no ArchiveBox.

Nada do HTML arquivado é servido pelo site: a página pública mostra texto curado,
metadados e link para a fonte. O replay (WARC, screenshot) continua no ArchiveBox,
que deve permanecer privado.

## Bugs pré-existentes corrigidos (bloqueavam instalar e buildar)

| Sintoma | Causa | Correção |
|---|---|---|
| `npm install` falhava com `ETARGET` | `superjson@^3.0.0` não existe (máx. 2.2.6) | `^2.2.6` |
| `prisma generate` falhava | enums `exposição` e `lançamento` com acento (inválido no Prisma) | `exposicao`, `lancamento` |
| `tsc` erro de `Set` iterável | `target` ausente no tsconfig | `"target": "es2017"` + `Array.from` |
| `tsc` erro no `ArtworkForm` | `updateField` tipava `keyof ArtworkFormData` contra `string` | assinatura em `string` + cast |

## Verificação feita

- `npx tsc --noEmit` → **0 erros**
- `npm run build` → ver `BUILD` abaixo
- `prisma validate` implícito no `generate` → ok

## Próximos passos sugeridos

1. Autenticação do admin (hoje as rotas `/api/admin/*` estão abertas).
2. Ligar `Capture.artworkId` na tela de obra, para a captura virar prova de uma obra.
3. Reaproveitar `/arquivo` (hoje com `MOCK_ARTWORKS`) para ler do banco.
4. Exportar `notas.json` para o vault Obsidian (`obsidian_export.py --notes`).

## Autenticação da área de curadoria

Adicionada proteção para `/admin/*` e `/api/admin/*`:

| Arquivo | Função |
|---|---|
| `src/lib/auth.ts` | sessão HMAC-SHA256 (Web Crypto), comparação em tempo constante |
| `src/middleware.ts` | 401 no JSON da API, redirect para `/login` nas páginas |
| `src/app/api/auth/login/route.ts` | valida e grava cookie httpOnly (12h) |
| `src/app/api/auth/logout/route.ts` | apaga o cookie |
| `src/app/login/page.tsx` | formulário de entrada |

Variáveis novas: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `AUTH_SECRET` (veja `.env.example`).

Comportamento verificado:

- `/admin/captures` sem sessão → **307** para `/login?next=...`
- `/api/admin/captures` sem sessão → **401**
- senha errada → **401** com mensagem
- login correto → **200** + cookie `recombo_session`
- com sessão → **200** e as 37 capturas
- logout → API volta a **401**

## Acervo público lendo do banco

- `src/app/api/public/artworks/route.ts` — só `status=published` + `accessLevel=public`.
- `/arquivo` deixou de usar `MOCK_ARTWORKS`: busca da API, com skeleton de carregamento,
  mensagem de erro e estado vazio. Sem banco, a página não quebra — avisa.

> Pendência conhecida: `/obra/[slug]` ainda usa dados mock. Precisa da mesma troca para
> abrir a obra a partir do card do acervo.

## Verificação final

- `npx tsc --noEmit` → **0 erros**
- `npm run build` → ok
- fluxo de autenticação testado ponta a ponta
- `/arquivo` responde 200 com o banco fora (estado de erro tratado)
