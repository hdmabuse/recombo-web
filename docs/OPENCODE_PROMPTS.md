# Re:combo · Prompts para o OpenCode

Executar nesta ordem no OpenCode com DeepSeek V4 Flash.
Cada prompt é uma sessão completa — revisar antes de executar o próximo.

---

## Sessão 1 — Inicialização e estrutura

```
Leia .opencode/rules/project.md, design-system/RULES.md e design-system/tokens.css.

Preciso inicializar um projeto Next.js 15 neste repositório já existente.
Faça exatamente isso:

1. Crie package.json com as dependências:
   - next@15, react@19, react-dom@19
   - typescript, @types/node, @types/react, @types/react-dom
   - tailwindcss@4, @tailwindcss/postcss, postcss

2. Crie tsconfig.json com strict: true e path alias @/* para src/*

3. Crie next.config.ts básico

4. Crie src/styles/globals.css que:
   - Importe design-system/tokens.css
   - Importe design-system/tokens-recombo-extension.css
   - Configure font-family base com --font-display

5. Mova os arquivos existentes:
   - index.html → public/archive/index_original.html
   - index_files/ → public/archive/index_files/
   - Mantenha README.md na raiz

NÃO instale dependências ainda, só crie os arquivos de configuração.
```

---

## Sessão 2 — Layout base e página home

```
Leia .opencode/rules/project.md, design-system/RULES.md, design-system/tokens.css
e design-system/tokens-recombo-extension.css.

Crie src/app/layout.tsx:
- Importar Bricolage Grotesque (weights: 400, 500, 600, 700) via next/font/google
- Importar Fira Code (weights: 400, 500) via next/font/google
- Aplicar variáveis de fonte ao :root
- Importar src/styles/globals.css
- Metadata: title "Re:combo arquivo", description do README.md
- Fundo: var(--color-recombo-bg), texto: var(--color-text-inverse)

Crie src/app/page.tsx:
- Seção hero: logo recombo.gif (public/images/recombo.gif), nome "Re:combo",
  anos "2002–2008", tagline "Generosidade Intelectual como alternativa à Propriedade Intelectual"
- Parágrafo de apresentação (texto do README.md, seção "Sobre")
- Três cards de navegação: Performances (3 itens), Vídeos (4 itens), Músicas (13 itens)
- Seção Translocal Mixer com seus 8 tracks
- Todos os valores de design via variáveis de tokens.css
```

---

## Sessão 3 — Componente ArchiveItem

```
Leia .opencode/rules/project.md, design-system/RULES.md e design-system/components.md.
Leia também src/data/archive.ts para entender o tipo ArchiveItem.

Crie src/components/recombo/ArchiveItem/index.tsx:
- Props: { item: ArchiveItem }
- Exibe: título, ano (se houver), localização (se houver), badge por tipo
- Link externo para archive.org (target="_blank", rel="noopener noreferrer")
- Badge de tipo: 'performance' → cor primary, 'video' → cor secondary,
  'music' → cor recombo-accent, 'mixer' → cor neutral
- Hover: borda muda para --color-recombo-accent
- Seguir padrão Card variant="bordered" de design-system/components.md

Crie src/components/recombo/ArchiveItem/ArchiveItem.module.css
usando apenas variáveis de tokens.css.
```

---

## Sessão 4 — Páginas de acervo

```
Leia .opencode/rules/project.md e design-system/RULES.md.

Com base em src/data/archive.ts e src/components/recombo/ArchiveItem/index.tsx,
crie as três páginas de acervo:

1. src/app/performances/page.tsx
   - Título da página: "Performances"
   - Filtrar archive por type === 'performance'
   - Layout: lista vertical com ArchiveItem
   - Link de volta para home

2. src/app/videos/page.tsx
   - Título da página: "Vídeos"
   - Filtrar archive por type === 'video'

3. src/app/musicas/page.tsx
   - Título da página: "Músicas"
   - Duas seções: "Músicas" e "Translocal Mixer"
   - Filtrar por type === 'music' e type === 'mixer' respectivamente

Todas as páginas: header com nome da seção em --color-recombo-accent,
tipografia --font-display, fundo --color-recombo-bg.
```

---

## Sessão 5 — Revisão final e README

```
Leia .opencode/rules/project.md.

Faça uma revisão de todos os arquivos criados e:

1. Verifique se algum valor de cor, fonte ou espaçamento está hardcoded
   (deve usar apenas variáveis CSS de tokens.css)

2. Verifique se todos os textos estão em UTF-8 correto (sem caracteres quebrados)

3. Atualize README.md para incluir:
   - Como rodar localmente (npm install, npm run dev)
   - Estrutura do projeto
   - Créditos originais do Re:combo preservados

4. Crie .gitignore padrão Next.js se não existir
```

---

## Dicas de execução

- Rodar cada sessão e revisar o resultado antes de avançar
- Se o agente criar valores hardcoded, corrigir na mesma sessão:
  ```
  Encontrei valores hardcoded em [arquivo]. Corrija usando as variáveis de tokens.css.
  ```
- Para instalar dependências após a sessão 1:
  ```bash
  npm install
  npm run dev
  ```
