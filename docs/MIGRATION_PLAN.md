# Re:combo → Next.js + TRAMA-TAR DS

## Plano de migração

---

## Diagnóstico do repositório atual

| Item           | Estado atual                            | Problema                              |
| -------------- | --------------------------------------- | ------------------------------------- |
| Estrutura      | `index.html` com `<frameset>`           | Deprecated desde HTML5                |
| Encoding       | `windows-1252`                          | Caracteres quebrados (ã, ç, etc.)     |
| Layout         | Tabelas aninhadas                       | Inacessível, não responsivo           |
| CSS            | Inline + classes sem semântica          | Nenhum sistema, valores hardcoded     |
| Conteúdo       | `newstorm.notitia.apresentacao.html`    | Mistura de PT-BR e EN sem estrutura   |
| Links externos | SourceForge, recombo.art.br (mortos)    | 404 em sua maioria                    |
| Mídia          | archive.org (performances, vídeos, MP3) | Funcional, só precisa de novo wrapper |
| Build system   | Nenhum                                  | Não há package.json, nenhum bundler   |

---

## Arquitetura de destino

```
recombo/
├── .opencode/
│   └── rules/
│       └── project.md          ← contexto completo p/ o agente
├── design-system/
│   ├── tokens.css
│   ├── tokens.ts
│   ├── components.md
│   └── RULES.md
├── public/
│   ├── images/
│   │   ├── bgcapa.jpeg         ← preservar original
│   │   ├── recombo.gif         ← preservar original
│   │   └── opuslogo.gif        ← preservar original
│   └── archive/                ← htmls originais como referência
│       ├── index_original.html
│       └── newstorm_original.html
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← importa tokens.css
│   │   ├── page.tsx            ← home: identidade + acervo
│   │   ├── performances/
│   │   │   └── page.tsx
│   │   ├── videos/
│   │   │   └── page.tsx
│   │   └── musicas/
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/                 ← componentes do DS
│   │   └── recombo/
│   │       ├── ArchiveItem/    ← card de item do acervo
│   │       ├── MediaPlayer/    ← embed archive.org
│   │       └── HeroSection/    ← identidade visual do coletivo
│   ├── data/
│   │   └── archive.ts          ← todo o acervo como dados estruturados
│   └── styles/
│       └── globals.css         ← importa design-system/tokens.css
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Paleta do Re:combo no contexto TRAMA-TAR DS

A estética original do Re:combo era `#ff6633` (laranja) e `#ff3366` (rosa-vermelho) — bem diferente
da paleta amber/wine. A estratégia é:

- **Estrutura e tipografia**: seguir 100% o TRAMA-TAR DS (Bricolage Grotesque, tokens de espaçamento)
- **Cor de destaque do Re:combo**: mapear `#ff6633` para `--color-recombo-accent` como extensão dos tokens
- **Fundo**: manter escuro (`--color-neutral-900`) com tipografia branca — ecoa o espírito original
- **Imagens originais**: usar como elementos visuais, não substituir

Adicionar ao `tokens.css`:

```css
/* Extensão Re:combo */
--color-recombo-accent: #ff6633;
--color-recombo-pink: #ff3366;
--color-recombo-bg: #1a1a1a; /* escuro, como o site original */
```

---

## Passos de execução no OpenCode

### Passo 1 — Inicializar o projeto Next.js

```bash
# No diretório clonado do repositório
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

Depois de inicializar, copiar os arquivos do design-system para dentro do repo.

### Passo 2 — Estruturar os dados do acervo

Converter os links do README.md em um arquivo `src/data/archive.ts` tipado.
**Prompt para o agente:**

```
Leia README.md e crie src/data/archive.ts com um array tipado contendo
todos os links de performances, vídeos e músicas. Cada item deve ter:
{ id, title, type: 'performance'|'video'|'music', url, year?, description? }
```

### Passo 3 — Layout base

**Prompt para o agente:**

```
Leia design-system/tokens.css, design-system/RULES.md e design-system/components.md.
Crie src/app/layout.tsx importando src/styles/globals.css.
Crie src/styles/globals.css importando design-system/tokens.css.
Adicione fonte Bricolage Grotesque via next/font/google.
```

### Passo 4 — Página principal

**Prompt para o agente:**

```
Leia design-system/RULES.md, design-system/components.md e src/data/archive.ts.
Leia também o texto do README.md para usar como conteúdo.
Crie src/app/page.tsx com:
- HeroSection com logo recombo.gif e texto de apresentação bilíngue
- Grade de seções: Performances, Vídeos, Músicas (links para subpáginas)
- Rodapé com créditos e links para archive.org
Usar apenas variáveis de design-system/tokens.css. Nenhum valor hardcoded.
```

### Passo 5 — Componente ArchiveItem

**Prompt para o agente:**

```
Crie src/components/recombo/ArchiveItem/index.tsx.
Props: { item: ArchiveItem } (importar tipo de src/data/archive.ts)
O componente é um card que exibe título, ano, tipo e link para archive.org.
Seguir design-system/components.md (padrão Card com variant="bordered").
```

### Passo 6 — Páginas de acervo

```
Crie src/app/performances/page.tsx, src/app/videos/page.tsx, src/app/musicas/page.tsx.
Cada página filtra src/data/archive.ts pelo tipo correspondente
e renderiza uma grade de ArchiveItem.
```

---

## O que preservar do original

- `public/images/recombo.gif` — logo histórico, usar no hero
- `public/images/bgcapa.jpeg` — textura de fundo, pode ser usada com opacity
- `public/archive/` — htmls originais como referência histórica (não servir como página)
- Todo o conteúdo textual de ambos os arquivos HTML (reescrever em UTF-8)
- Todos os links archive.org do README.md (são funcionais)

---

## O que descartar

- Estrutura de `<frameset>`
- Encoding `windows-1252`
- Layout de tabelas
- Estilos inline
- Links mortos (SourceForge, recombo.art.br, manguebit.org.br)
