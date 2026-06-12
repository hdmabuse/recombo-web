# Design System — RE:COMBO Web

Design system do arquivo digital do coletivo [Re:combo](https://recombo.art.br) (2001-2008).

> **Status:** v1.0 · ativo  
> **Framework:** Tailwind CSS via `cn()` utilitária  
> **Camada:** Apresentação (separada de negócio e dados)  
> **Licença:** MIT

---

## Índice

1. [Princípios](#1-princípios)
2. [Tokens de Cor](#2-tokens-de-cor)
3. [Tipografia](#3-tipografia)
4. [Espaçamento](#4-espaçamento)
5. [Border Radius](#5-border-radius)
6. [Sombras](#6-sombras)
7. [Componentes](#7-componentes)
8. [Animações](#8-animações)
9. [Acessibilidade](#9-acessibilidade)
10. [Layout](#10-layout)
11. [Boas Práticas](#11-boas-práticas)
12. [Arquitetura de Arquivos](#12-arquitetura-de-arquivos)

---

## 1. Princípios

### 1.1 Propósito

Interface limpa, tipográfica e discreta — o foco deve permanecer nas obras, na memória e na experimentação artística, não na ferramenta.

### 1.2 Princípios de Design

| #   | Princípio                      | Descrição                                                  |
| --- | ------------------------------ | ---------------------------------------------------------- |
| 1   | **Minimalismo arquivístico**   | Cada elemento visual existe para servir o conteúdo         |
| 2   | **Tipografia como identidade** | A tipografia é o principal elemento de estilo              |
| 3   | **Amber como brasa**           | A cor de destaque remete à brasa que mantém a memória viva |
| 4   | **Zinc como base**             | Escala de cinzas neutros (zinc) para máxima legibilidade   |
| 5   | **Consistência sem rigidez**   | Mesmo vocabulário visual em site público e admin           |
| 6   | **Tailwind-first**             | Usar classes utilitárias antes de CSS customizado          |
| 7   | **Performance**                | Preferir CSS a JS para interações simples                  |
| 8   | **Dark mode**                  | Via classe `.dark` no elemento `<html>`                    |

### 1.3 Stack de Apresentação

| Camada       | Tecnologia                                   | Responsabilidade                              |
| ------------ | -------------------------------------------- | --------------------------------------------- |
| Tokens       | `tailwind.config.ts` + CSS custom properties | Cores, tipografia, espaçamento                |
| Utilitário   | `cn()` (`clsx` + `tailwind-merge`)           | Merge de classes condicionais                 |
| Componentes  | React + TypeScript + Tailwind                | Elementos de UI puros (sem estado de negócio) |
| Formatação   | Prettier + `prettier-plugin-tailwindcss`     | Ordenação automática de classes               |
| Documentação | Storybook                                    | Visualização e teste isolado de componentes   |

---

## 2. Tokens de Cor

Todas as cores são definidas como CSS custom properties no `globals.css` e mapeadas no `tailwind.config.ts`. **Nunca usar valores hex hardcoded** — sempre referenciar os tokens do Tailwind ou as variáveis CSS.

### 2.1 Cores Base (modo claro)

```css
:root {
  --background: 0 0% 100%; /* branco */
  --foreground: 240 10% 3.9%; /* zinc-950 */
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%; /* zinc-900 */
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%; /* zinc-100 */
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 35 86% 57%; /* amber-500 #F0A020 */
  --accent-foreground: 0 0% 0%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%; /* zinc-200 */
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
}
```

### 2.2 Cores Base (modo escuro)

```css
.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 35 86% 57%; /* amber-500 no dark mode */
  --primary-foreground: 0 0% 0%;
  --border: 240 3.7% 15.9%;
  --ring: 35 86% 57%;
}
```

### 2.3 Paleta Zinc (cinzas)

Usar exclusivamente a escala `zinc` do Tailwind — **não usar** `gray`, `slate`, `neutral` ou `stone`.

| Token      | Hex       | Uso                                     |
| ---------- | --------- | --------------------------------------- |
| `zinc-50`  | `#fafafa` | Fundo principal do site público         |
| `zinc-100` | `#f4f4f5` | Fundo admin, hover sutil, badges        |
| `zinc-200` | `#e4e4e7` | Bordas de separação                     |
| `zinc-300` | `#d4d4d8` | Bordas de input, placeholder            |
| `zinc-400` | `#a1a1aa` | Texto terciário, ícones inativos        |
| `zinc-500` | `#71717a` | Texto secundário                        |
| `zinc-600` | `#52525b` | Texto médio                             |
| `zinc-700` | `#3f3f46` | Texto de corpo                          |
| `zinc-800` | `#27272a` | Sidebar hover, badges escuros           |
| `zinc-900` | `#18181b` | Texto principal, botão primary, sidebar |
| `zinc-950` | `#09090b` | Fundo dark mode                         |

### 2.4 Paleta Amber (destaque)

| Token       | Hex       | Uso                                                   |
| ----------- | --------- | ----------------------------------------------------- |
| `amber-50`  | `#fffbeb` | Fundo de badge/callout amber                          |
| `amber-100` | `#fef3c7` | Background de badge amber                             |
| `amber-200` | `#fde68a` | —                                                     |
| `amber-300` | `#fcd34d` | —                                                     |
| `amber-400` | `#fbbf24` | —                                                     |
| `amber-500` | `#F0A020` | **Cor primária de destaque** — logo, ações principais |
| `amber-600` | `#d97706` | Hover de elementos amber                              |
| `amber-700` | `#b57818` | Versão escura para shadow                             |
| `amber-800` | `#92400e` | Texto de badge amber                                  |
| `amber-900` | `#78350f` | —                                                     |

### 2.5 Cores Semânticas

| Variável              | Cor       | Uso                       |
| --------------------- | --------- | ------------------------- |
| `--red` / `red-*`     | `#ef4444` | Erro, deletar, contestado |
| `--green` / `green-*` | `#22c55e` | Sucesso, concluído        |
| `--blue` / `blue-*`   | `#3b82f6` | Informação, link          |

### 2.6 Cores Admin (sidebar)

```css
--sidebar: #18181b; /* zinc-900 */
--sidebar-foreground: #d4d4d8; /* zinc-300 */
--sidebar-hover: #27272a; /* zinc-800 */
--sidebar-active: #ffffff;
```

---

## 3. Tipografia

### 3.1 Famílias

| Variável       | Família                          | Pesos    | Uso                       |
| -------------- | -------------------------------- | -------- | ------------------------- |
| `--font-inter` | `'Inter', system-ui, sans-serif` | 300–700  | Corpo, títulos, interface |
| `--font-mono`  | `'JetBrains Mono', monospace`    | 400, 700 | Labels, dados, código     |

Classes utilitárias no Tailwind:

```tsx
// Sans-serif (padrão)
className = "font-sans";

// Monospace
className = "font-mono";
```

### 3.2 Escala Tipográfica

| Elemento      | Classe                             | Tamanho | Line-height | Peso |
| ------------- | ---------------------------------- | ------- | ----------- | ---- |
| Hero (h1)     | `text-3xl sm:text-4xl lg:text-5xl` | 36–48px | 1.1         | 700  |
| Seção (h2)    | `text-2xl`                         | 24px    | 1.2         | 700  |
| Card (h3)     | `text-base font-semibold`          | 16px    | 1.4         | 600  |
| Corpo         | `text-sm`                          | 15px    | 1.6         | 400  |
| Pequeno       | `text-xs`                          | 14px    | 1.5         | 400  |
| Botão / Input | `text-sm font-medium`              | 14px    | —           | 500  |
| Label         | `text-xs font-medium`              | 14px    | —           | 500  |
| Badge         | `text-xs font-medium`              | 12px    | —           | 500  |
| Tiny (meta)   | `text-xs`                          | 12px    | —           | 400  |

### 3.3 Regras Tipográficas

- Títulos de seção: peso 700, `tracking-tight` (letter-spacing: -0.02em)
- Labels de formulário: peso 500, cor `text-zinc-600`
- Meta-info (ano, tipo): `text-xs text-zinc-400`
- Código inline: `<code className="font-mono text-sm">`

---

## 4. Espaçamento

Usar o sistema de espaçamento nativo do Tailwind. **Nunca usar valores arbitrários.**

| Classe          | Pixels | Uso                               |
| --------------- | ------ | --------------------------------- |
| `gap-1` / `p-1` | 4px    | Chips, badges, spacing interno    |
| `gap-2` / `p-2` | 8px    | Gaps entre elementos relacionados |
| `gap-3` / `p-3` | 12px   | Padding de inputs, gaps de cards  |
| `gap-4` / `p-4` | 16px   | Padding de seções                 |
| `gap-6` / `p-6` | 24px   | Padding de containers principais  |
| `gap-8` / `p-8` | 32px   | Hero padding, seções grandes      |
| `gap-12`        | 48px   | Seções de landing                 |
| `gap-16`        | 64px   | Seções maiores                    |

---

## 5. Border Radius

| Elemento          | Classe         | Valor  |
| ----------------- | -------------- | ------ |
| Botões, inputs    | `rounded-md`   | 6px    |
| Cards, containers | `rounded-lg`   | 8px    |
| Badges, chips     | `rounded-full` | 9999px |
| Modal             | `rounded-xl`   | 12px   |
| Sidebar nav items | `rounded-md`   | 6px    |

---

## 6. Sombras

| Elemento        | Classe                              |
| --------------- | ----------------------------------- |
| Cards (default) | `shadow-sm` (via `border-zinc-200`) |
| Cards (hover)   | `hover:shadow-lg`                   |
| Modais          | `shadow-xl`                         |
| Header sticky   | `shadow-sm`                         |

---

## 7. Componentes

### 7.1 Button

```tsx
<Button variant="primary" size="md" disabled>
  Ação
</Button>
```

**Props:**

- `variant`: `"primary"` | `"outline"` | `"amber"` | `"danger"` | `"ghost"` (default: `"primary"`)
- `size`: `"sm"` | `"md"` | `"icon"` (default: `"md"`)
- `disabled`: `boolean`

**Variantes visuais:**

- `primary`: `bg-zinc-900 text-white hover:bg-zinc-800`
- `outline`: `border border-zinc-300 text-zinc-700 hover:bg-zinc-50`
- `amber`: `bg-amber-500 text-black hover:bg-[#D0901E]`
- `danger`: `border border-red-300 text-red-600 hover:bg-red-50`
- `ghost`: `text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100`

**Tamanhos:**

- `sm`: `px-3 py-1.5 text-xs`
- `md`: `px-4 py-2 text-sm`
- `icon`: `p-2`

### 7.2 Input

```tsx
<Input placeholder="Texto..." icon={<Search />} />
```

**Props (extends `InputHTMLAttributes`):**

- `icon`: `ReactNode` (ícone à esquerda, opcional)

### 7.3 Select

```tsx
<Select
  options={[
    { value: "all", label: "Todos" },
    { value: "published", label: "Publicado" },
  ]}
  placeholder="Selecione..."
/>
```

### 7.4 Card

```tsx
<Card hover>
  <CardHeader>Título</CardHeader>
  <CardContent>Conteúdo</CardContent>
</Card>
```

**Props do Card:**

- `hover`: `boolean` (ativa hover com border e shadow)

### 7.5 Badge

```tsx
<Badge variant="amber" size="sm">
  Publicado
</Badge>
```

**Props:**

- `variant`: `"default"` | `"amber"` | `"green"` | `"red"` | `"yellow"`
- `size`: `"sm"` | `"md"`

### 7.6 Table

```tsx
<Table>
  <Thead>
    <Tr>
      <Th>Nome</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>Valor</Td>
    </Tr>
  </Tbody>
</Table>
```

### 7.7 Pagination

```tsx
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={setPage}
  total={100}
  showingFrom={1}
  showingTo={10}
/>
```

### 7.8 EmptyState

```tsx
<EmptyState
  icon={<Search />}
  message="Nenhum resultado encontrado"
  action={<Button>Limpar filtros</Button>}
/>
```

### 7.9 Loading

```tsx
<LoadingSkeleton count={6} />   {/* Grid de skeletons */}
<LoadingSpinner />              {/* Spinner centralizado */}
```

---

## 8. Animações

Todas definidas via Tailwind + CSS `@keyframes` no `globals.css`.

| Animação  | Uso                                   | Classe                                            |
| --------- | ------------------------------------- | ------------------------------------------------- |
| Fade in   | Entrada de elementos                  | `fade-in`                                         |
| Stagger   | Lista com fade sequencial             | `stagger-children` (container)                    |
| Shimmer   | Loading skeleton                      | `animate-shimmer`                                 |
| Glitch    | Hero ou títulos especiais (reservado) | `glitch`                                          |
| Spin      | Loading spinner                       | `animate-spin`                                    |
| Accordion | Expansão de painéis                   | `animate-accordion-down` / `animate-accordion-up` |

Regras de transição:

- Padrão: `transition-colors` para hover/active
- Cards/hover: `transition-all duration-150`
- Modais: `transition-opacity duration-200`

---

## 9. Acessibilidade

- Contraste mínimo: 4.5:1 para texto normal, 3:1 para texto grande
- Foco visível: `focus:ring-2 focus:ring-zinc-900` (Tailwind), nunca remover outline sem substituir
- Labels: todo input deve ter `<label>` associado via `htmlFor`/`id`
- Botões sem texto visível: obrigatório `aria-label`
- Não usar cor como único indicador de estado — complementar com ícone ou texto
- Modais: gerenciar foco com `focus-trap`, fechar com Escape

---

## 10. Layout

### 10.1 Site Público

```
┌──────────────────────────────────────────────────┐
│ Header: sticky top-0 z-50 bg-white               │
│   ├─ Logo + Nav + Search                         │
│   └─ Tags bar (scroll horizontal)                │
├──────────────────────────────────────────────────┤
│ Main: flex-1 min-h-screen                        │
│   └─ max-w-7xl mx-auto px-4 sm:px-6 lg:px-8     │
├──────────────────────────────────────────────────┤
│ Footer: bg-zinc-900 text-zinc-400               │
│   └─ Grid 1fr 1fr 1fr 1fr + bottom bar          │
└──────────────────────────────────────────────────┘
```

### 10.2 Admin

```
┌──────────────────────────────────────────────────┐
│ Sidebar (w-64 fixed)        │ Main (ml-64)       │
│ ┌─────────────────────┐     │ ┌────────────────┐ │
│ │ Logo + "Admin"      │     │ │ Content p-8    │ │
│ │ Nav items           │     │ │                │ │
│ │ ─────────────────── │     │ │                │ │
│ │ ← Voltar ao site    │     │ └────────────────┘ │
│ └─────────────────────┘     └────────────────────┘
└──────────────────────────────────────────────────┘
```

### 10.3 Breakpoints

Usar breakpoints padrão do Tailwind:

| Breakpoint | Mínimo |
| ---------- | ------ |
| `sm`       | 640px  |
| `md`       | 768px  |
| `lg`       | 1024px |
| `xl`       | 1280px |
| `2xl`      | 1536px |

Largura máxima de conteúdo: `max-w-7xl` (1280px) para site público.

---

## 11. Boas Práticas

### 11.1 Uso de Cores

```tsx
// ✅ Correto — usar tokens do Tailwind
className = "bg-zinc-900 text-white";

// ❌ Errado — hex hardcoded
className = "bg-[#18181b] text-[#ffffff]";
```

Exceção: a cor `amber-500 #F0A020` pode ser referenciada como `bg-amber-500` ou `text-amber-500`.

### 11.2 Uso de Espaçamento

```tsx
// ✅ Correto
className = "p-4 gap-2";

// ❌ Errado
className = "p-[13px] gap-[7px]";
```

### 11.3 Uso de `cn()`

```tsx
// ✅ Correto — usar cn() para merge condicional
className={cn("base-class", variant && "variant-class", className)}

// ❌ Errado — template string manual
className={`base-class ${variant ? "variant-class" : ""} ${className}`}
```

### 11.4 Separação de Camadas

```tsx
// ✅ Correto — componente de apresentação puro
function ArtworkCard({ title, year }: { title: string; year: number }) {
  return (
    <Card hover>
      <CardContent>
        <p className="text-xs text-zinc-400">{year}</p>
        <h3 className="font-semibold text-zinc-900">{title}</h3>
      </CardContent>
    </Card>
  );
}

// ❌ Errado — lógica de negócio no componente de apresentação
function ArtworkCard({ id }: { id: string }) {
  const [artwork, setArtwork] = useState(null);
  useEffect(() => { fetch(`/api/obras/${id}`).then(...) }, [id]);
  // ...
}
```

---

## 12. Arquitetura de Arquivos

```
src/
  components/
    ui/               ← Átomos: Button, Input, Card, Badge, Table, etc.
    layout/           ← Moléculas: Header, Footer, Sidebar
    composite/        ← Organismos: ArtworksView, ArchiveView, DynamicForm
  lib/
    utils.ts          ← cn(), slugify(), formatadores
    api/              ← Cliente HTTP tipado
    hooks/            ← Custom hooks (useArtworks, useArchive)
  services/           ← Data access (artwork.service, artist.service, etc.)
  app/                ← Páginas (combinam dados + apresentação)
    api/              ← API routes (REST endpoints)
```

### Regras de Nomenclatura

| Entidade              | Padrão                  | Exemplo                            |
| --------------------- | ----------------------- | ---------------------------------- |
| Componente            | PascalCase              | `Button`, `ArtworksView`           |
| Hook                  | camelCase prefixo `use` | `useArtworks`, `useArchive`        |
| Service               | camelCase               | `artworkService`, `archiveService` |
| Arquivo de componente | PascalCase              | `Button.tsx`, `ArtworksView.tsx`   |
| Utilitário            | camelCase               | `cn`, `slugify`, `truncate`        |
| Props booleanas       | prefixo `is`/`has`      | `isLoading`, `hasError`            |

---

_Design System — RE:COMBO Web v1.0 · Mantido em `docs/design-system/DesignSystem.md`_
