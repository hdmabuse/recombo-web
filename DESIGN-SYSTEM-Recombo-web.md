# Design System — RE:COMBO Web

Design system do arquivo digital do coletivo Re:combo (2001-2008). Adaptado do
[TRAMA-TAR Design System](./DESIGN-SYSTEM-trama-tar.md), mantendo a mesma
arquitetura de tokens e princípios, com identidade visual própria.

---

## 1. Fundamentos

### 1.1 Propósito

O design system do RE:COMBO Web foi desenvolvido para suportar a preservação e
exibição do acervo do coletivo Re:combo. A interface deve ser limpa, tipográfica
e discreta — o foco deve permanecer nas obras, na memória e na experimentação
artística, não na ferramenta.

### 1.2 Princípios

- **Minimalismo arquivístico**: cada elemento visual existe para servir o conteúdo
- **Tipografia como identidade**: a tipografia é o principal elemento de estilo
- **Amber como brasa**: a cor de destaque remete à brasa que mantém a memória viva
- **Zinc como base**: escala de cinzas neutros (zinc) para máxima legibilidade
- **Consistência sem rigidez**: mesmo vocabulário visual em site público e admin

---

## 2. Cores

### 2.1 Paleta Principal (Site Público)

| Variável         | Hex       | Uso                            |
| ---------------- | --------- | ------------------------------ |
| `--bg`           | `#fafafa` | Fundo principal (zinc-50)      |
| `--surface`      | `#ffffff` | Cards, containers, sidebar     |
| `--surface-2`    | `#f4f4f5` | Seções alternadas, hover sutil |
| `--border`       | `#e4e4e7` | Bordas de separação (zinc-200) |
| `--border-hover` | `#18181b` | Borda em hover (zinc-900)      |

### 2.2 Paleta Admin

| Variável          | Hex       | Uso                         |
| ----------------- | --------- | --------------------------- |
| `--bg-admin`      | `#f4f4f5` | Fundo admin                 |
| `--sidebar`       | `#18181b` | Sidebar escuro (zinc-900)   |
| `--sidebar-text`  | `#d4d4d8` | Texto na sidebar            |
| `--sidebar-hover` | `#27272a` | Hover na sidebar (zinc-800) |

### 2.3 Cores de Destaque

| Variável     | Hex                    | Uso                                           |
| ------------ | ---------------------- | --------------------------------------------- |
| `--amber`    | `#F0A020`              | Cor primária — logo, badges, ações principais |
| `--amber-d`  | `#B57818`              | Versão escura para hover, sombras             |
| `--amber-bg` | `rgba(240,160,32,.08)` | Fundo sutil com transparência                 |

### 2.4 Cores de Texto

| Variável          | Hex       | Uso                             |
| ----------------- | --------- | ------------------------------- |
| `--text`          | `#18181b` | Texto principal (zinc-900)      |
| `--text-2`        | `#71717a` | Texto secundário (zinc-500)     |
| `--text-3`        | `#a1a1aa` | Labels, placeholders (zinc-400) |
| `--text-disabled` | `#d4d4d8` | Texto desabilitado              |

### 2.5 Cores Semânticas

| Variável  | Hex       | Significado                      |
| --------- | --------- | -------------------------------- |
| `--red`   | `#ef4444` | Erro, deletar, contestado        |
| `--green` | `#22c55e` | Sucesso, concluído, estabilizado |
| `--blue`  | `#3b82f6` | Informação, link, referência     |

---

## 3. Tipografia

### 3.1 Famílias

| Variável | Família                          | Pesos                   | Uso                       |
| -------- | -------------------------------- | ----------------------- | ------------------------- |
| `--sans` | `'Inter', system-ui, sans-serif` | 300, 400, 500, 600, 700 | Corpo, títulos, interface |
| `--mono` | `'JetBrains Mono', monospace`    | 400, 700                | Labels, dados, código     |

### 3.2 Tamanhos

| Elemento           | Tamanho | Line-height | Peso |
| ------------------ | ------- | ----------- | ---- |
| Hero title (h1)    | 36-48px | 1.1         | 700  |
| Section title (h2) | 24px    | 1.2         | 700  |
| Card title (h3)    | 16px    | 1.4         | 600  |
| Body               | 15px    | 1.6         | 400  |
| Body small         | 14px    | 1.5         | 400  |
| Input / button     | 14px    | —           | 500  |
| Label              | 14px    | —           | 500  |
| Badge / chip       | 12px    | —           | 500  |
| Tiny (stats, meta) | 12px    | —           | 400  |

### 3.3 Hierarquia de Textos

- **Títulos de seção**: peso 700, `--text`, `letter-spacing: -0.02em`
- **Labels de formulário**: peso 500, `--text-2`
- **Meta info (ano, tipo)**: tamanho 12px, `--text-3`
- **Badges**: `--amber`, `--text-disabled`, `--red` conforme contexto

---

## 4. Espaçamento

### 4.1 Sistema de Espaçamento

| Token | Valor | Uso                                 |
| ----- | ----- | ----------------------------------- |
| 1     | 4px   | Chips, badges, spacing interno      |
| 2     | 8px   | Gaps entre elementos relacionados   |
| 3     | 12px  | Padding de inputs, gaps de cards    |
| 4     | 16px  | Padding de seções, gaps entre cards |
| 5     | 20px  | Spacing entre seções                |
| 6     | 24px  | Padding de containers principais    |
| 8     | 32px  | Hero padding, seções grandes        |
| 12    | 48px  | Seções de landing page              |
| 16    | 64px  | Seções maiores                      |

### 4.2 Layout do Site Público

```
┌──────────────────────────────────────────────────┐
│ Header: sticky top-0, z-50, bg-white             │
│   ├─ Logo + Nav + Search                         │
│   └─ Tags bar                                    │
├──────────────────────────────────────────────────┤
│ Main: flex-1, min-h-screen                       │
│   └─ Content por página                          │
├──────────────────────────────────────────────────┤
│ Footer: bg-zinc-900 text-zinc-400               │
│   ├─ Grid 1fr 1fr 1fr 1fr                        │
│   └─ Bottom bar: copyright + links               │
└──────────────────────────────────────────────────┘
```

### 4.3 Layout do Admin

```
┌──────────────────────────────────────────────────┐
│ Sidebar (w-64, fixed)          │ Main (ml-64)    │
│ ┌─────────────────────┐        │ ┌──────────────┐│
│ │ Logo + "Admin"      │        │ │  Content     ││
│ │ Nav items           │        │ │  p-8         ││
│ │   - Dashboard       │        │ │              ││
│ │   - Obras           │        │ │              ││
│ │   - Artistas        │        │ │              ││
│ │   - Eventos         │        │ │              ││
│ │   - Tags            │        │ │              ││
│ │   - Importar        │        │ └──────────────┘│
│ │   - Configurações   │        │                 │
│ │ ─────────────────── │        │                 │
│ │ ← Voltar ao site    │        │                 │
│ └─────────────────────┘        └─────────────────┘
└──────────────────────────────────────────────────┘
```

### 4.4 Border Radius

| Elemento          | Raio          |
| ----------------- | ------------- |
| Buttons, inputs   | 6px           |
| Cards, containers | 8px           |
| Badges, chips     | 9999px (full) |
| Modal             | 12px          |
| Avatar, dot       | 50%           |
| Sidebar nav items | 6px           |

---

## 5. Componentes

Os componentes são implementados com Tailwind CSS. Abaixo as variantes
principais.

### 5.1 Botões

```tsx
// Primário — ação principal
<button className="px-4 py-2 bg-zinc-900 text-white font-medium rounded-md
       hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed
       transition-colors">
  Ação
</button>

// Outline — ação secundária
<button className="px-4 py-2 border border-zinc-300 text-zinc-700 font-medium
       rounded-md hover:bg-zinc-50 transition-colors">
  Ação
</button>

// Amber — destaque (raro, reservado para ações especiais)
<button className="px-4 py-2 bg-[#F0A020] text-black font-medium rounded-md
       hover:bg-[#D0901E] transition-colors">
  Destaque
</button>

// Danger — deletar, remover
<button className="px-4 py-2 border border-red-300 text-red-600 font-medium
       rounded-md hover:bg-red-50 transition-colors">
  Excluir
</button>
```

### 5.2 Inputs e Textareas

```tsx
// Input padrão
<input className="w-full px-3 py-2 border border-zinc-300 rounded-md
       focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent
       text-sm" />

// Input com ícone
<div className="relative">
  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
  <input className="w-full pl-9 pr-4 py-2 border border-zinc-300 rounded-md
         focus:outline-none focus:ring-2 focus:ring-zinc-900" />
</div>

// Textarea
<textarea className="w-full px-3 py-2 border border-zinc-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-vertical
          min-h-[80px]" />

// Select
<select className="w-full px-3 py-2 border border-zinc-300 rounded-md
        focus:outline-none focus:ring-2 focus:ring-zinc-900" />
```

### 5.3 Cards

```tsx
// Card de acervo
<div className="bg-white rounded-lg overflow-hidden border border-zinc-200
            hover:border-zinc-900 hover:shadow-lg transition-all">
  <div className="aspect-[4/3] bg-zinc-100" />
  <div className="p-4">
    <p className="text-xs text-zinc-500">{year}</p>
    <h3 className="font-semibold text-zinc-900">{title}</h3>
  </div>
</div>

// Card de dashboard (admin)
<div className="bg-white rounded-lg p-6 border border-zinc-200
            hover:shadow-md transition-shadow">
  {children}
</div>
```

### 5.4 Badges e Chips

```tsx
// Tag chip
<Link className="inline-flex items-center px-2.5 py-1 text-xs font-medium
       rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors">
  tag-name
</Link>

// Badge de tipo de obra
<span className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-900/80
      text-white text-xs rounded">
  <Icon className="w-3 h-3" />
  audio
</span>

// Badge de licença
<span className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded">
  LUCR
</span>
```

### 5.5 Navegação (Admin Sidebar)

```tsx
// Item da sidebar — ativo
<Link className="flex items-center gap-3 px-3 py-2 rounded-md text-sm
       bg-zinc-800 text-white">
  <Icon className="w-4 h-4" />
  Dashboard
</Link>

// Item da sidebar — inativo
<Link className="flex items-center gap-3 px-3 py-2 rounded-md text-sm
       text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
  <Icon className="w-4 h-4" />
  Obras
</Link>
```

### 5.6 Alertas

```tsx
// Sucesso
<div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200
            rounded-md text-green-700 text-sm">
  ✓ {message}
</div>

// Erro
<div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200
            rounded-md text-red-700 text-sm">
  <AlertCircle className="w-4 h-4" />
  {message}
</div>

// Info
<div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200
            rounded-md text-blue-700 text-sm">
  <Info className="w-4 h-4" />
  {message}
</div>
```

### 5.7 Tabelas (Admin)

```tsx
<table className="w-full">
  <thead>
    <tr className="border-b border-zinc-200">
      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
        Nome
      </th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-zinc-100 hover:bg-zinc-50">
      <td className="px-4 py-3 text-sm text-zinc-900">Valor</td>
    </tr>
  </tbody>
</table>
```

### 5.8 Paginação

```tsx
<div className="flex items-center justify-center gap-2">
  <button className="rounded-md border border-zinc-200 px-3 py-1 text-sm hover:bg-zinc-50">
    Anterior
  </button>
  <button className="rounded-md bg-zinc-900 px-3 py-1 text-sm text-white">1</button>
  <button className="rounded-md border border-zinc-200 px-3 py-1 text-sm hover:bg-zinc-50">
    2
  </button>
  <button className="rounded-md border border-zinc-200 px-3 py-1 text-sm hover:bg-zinc-50">
    Próximo
  </button>
</div>
```

---

## 6. Utilitários

### 6.1 Scrollbar

```css
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #d4d4d8;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a1a1aa;
}
```

### 6.2 Animações

```css
/* Fade in */
.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger children */
.stagger-children > * {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}
.stagger-children > *:nth-child(1) {
  animation-delay: 0ms;
}
.stagger-children > *:nth-child(2) {
  animation-delay: 50ms;
}
/* ... até 12 */

/* Glitch (reservado para hero) */
.glitch::before {
  color: #ef4444;
}
.glitch::after {
  color: #3b82f6;
}
```

### 6.3 Acessibilidade

- Foco visível substituído de `outline` para `ring-2 ring-zinc-900` (Tailwind)
- Contrast ratio mínimo de 4.5:1 para texto normal
- Labels associadas a inputs via `htmlFor`/`id`

### 6.4 Transições

| Contexto    | Transição                         |
| ----------- | --------------------------------- |
| Padrão      | `transition-colors`               |
| Cards/hover | `transition-all duration-150`     |
| Modais      | `transition-opacity duration-200` |

---

## 7. Breakpoints

O design system usa os breakpoints padrão do Tailwind CSS:

| Breakpoint | Largura |
| ---------- | ------- |
| `sm`       | 640px   |
| `md`       | 768px   |
| `lg`       | 1024px  |
| `xl`       | 1280px  |
| `2xl`      | 1536px  |

Máximo de conteúdo: `max-w-7xl` (1280px) para site público.

---

## 8. CSS Variables (Tailwind)

```css
:root {
  /* Cores (via Tailwind zinc) */
  --bg: #fafafa; /* zinc-50 */
  --surface: #ffffff; /* white */
  --surface-2: #f4f4f5; /* zinc-100 */
  --border: #e4e4e7; /* zinc-200 */
  --text: #18181b; /* zinc-900 */
  --text-2: #71717a; /* zinc-500 */
  --text-3: #a1a1aa; /* zinc-400 */

  /* Destaque */
  --amber: #f0a020;
  --amber-d: #b57818;
  --amber-bg: rgba(240, 160, 32, 0.08);

  /* Semântica */
  --red: #ef4444;
  --green: #22c55e;
  --blue: #3b82f6;

  /* Admin */
  --sidebar: #18181b; /* zinc-900 */

  /* Tipografia */
  --sans: "Inter", system-ui, sans-serif;
  --mono: "JetBrains Mono", monospace;

  /* Radius */
  --radius: 0.5rem;
}
```

---

## 9. Princípios de Implementação

1. **Tailwind-first**: usar classes utilitárias antes de CSS customizado
2. **Componentes atômicos**: cada componente deve ser auto-contido
3. **Zinc como base de cinza**: preferir `zinc-*` sobre `gray-*`, `slate-*`, etc.
4. **Amber como acento único**: não diluir com múltiplas cores de destaque
5. **Dark mode via classe**: `.dark` no html ativa variantes dark do Tailwind
6. **Fallback**: `system-ui, sans-serif` como fallback para Inter
7. **Performance**: preferir CSS a JS para interações simples
8. **Consistência admin/site**: mesmo vocabulário visual, adaptado ao contexto

---

## 10. Referência Visual do TRAMA-TAR

Este design system é uma adaptação do
[TRAMA-TAR Design System](./DESIGN-SYSTEM-trama-tar.md). As principais
diferenças:

| Aspecto   | TRAMA-TAR                        | RE:COMBO Web                        |
| --------- | -------------------------------- | ----------------------------------- |
| Propósito | Pesquisa, mapeamento             | Arquivo cultural, acervo            |
| Fundo     | Escuro (`#060606`)               | Claro (`#fafafa`)                   |
| Acento    | Amber (`#F0A020`)                | Amber (`#F0A020`)                   |
| Fonte     | DM Sans + Space Mono             | Inter + JetBrains Mono              |
| Abordagem | CSS custom properties            | Tailwind CSS primeiro               |
| Grid      | 3 colunas (sidebar/canvas/panel) | 1 coluna (site) / 2 colunas (admin) |

O acento amber/herrugem foi mantido como ponte entre os dois sistemas,
simbolizando tanto a brasa do TRAMA-TAR quanto o calor da memória viva
do RE:COMBO.

---

_Design System — RE:COMBO Web v1.0_
_Adaptado de TRAMA-TAR Design System v1.0_
