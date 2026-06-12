# Design System — TRAMA-TAR

Plataforma de mapeamento de redes pela Teoria Ator-Rede.

---

## 1. Fundamentos

### 1.1 Propósito

O design system do TRAMA-TAR foi desenvolvido para suportar o trabalho de pesquisadores que realizam mapeamento de controvérsias e redes sociotécnicas. A interface deve ser discreta, funcional e não-intrusiva — o foco deve permanecer nos dados e na análise, não na ferramenta.

### 1.2 Princípios

- **Minimalismo funcional**: cada elemento visual deve ter uma razão de existir
- **Contraste sem distrações**: cores主要用于 destaque, nãodecoração
- **Tipografia como interface**: elementos de navegação e status usam fonte monoespaçada
- **Preto como padrão**: fundo escuro para longas sessões de trabalho
- **Consistência sem rigidez**: mesmo padrão de cores em todas as telas

---

## 2. Cores

### 2.1 Paleta Principal

| Variável    | Hex       | Uso                           |
| ----------- | --------- | ----------------------------- |
| `--bg`      | `#060606` | Fundo principal da aplicação  |
| `--panel`   | `#0F0F0F` | Painéis e áreas de conteúdo   |
| `--panel2`  | `#161616` | Elementos de entrada, campos  |
| `--hover`   | `#2A2A2A` | Estados de hover em elementos |
| `--border`  | `#383838` | Bordas de separação           |
| `--border2` | `#2A2A2A` | Bordas sutis                  |

### 2.2 Cores de Destaque

| Variável     | Hex                    | Uso                                    |
| ------------ | ---------------------- | -------------------------------------- |
| `--amber`    | `#F0A020`              | Cor primária — logo, botões, ativações |
| `--amber-d`  | `#B87818`              | Versão escura — sombras, realces       |
| `--amber-bg` | `rgba(200,132,26,.08)` | Fundo com transparência                |

### 2.3 Cores de Texto

| Variável     | Hex       | Uso                  |
| ------------ | --------- | -------------------- |
| `--white`    | `#FFFFFF` | Texto principal      |
| `--gray-hi`  | `#888`    | Texto secundário     |
| `--gray-mid` | `#555`    | Labels, placeholders |
| `--gray-lo`  | `#333`    | Texto desabilitado   |

### 2.4 Cores Semânticas

| Variável   | Hex       | Significado                |
| ---------- | --------- | -------------------------- |
| `--red`    | `#F05545` | Contestado, deletar, erro  |
| `--green`  | `#2ECC71` | Estabilizado, concluído    |
| `--blue-d` | `#2C3E50` | Azul discreto (referência) |

### 2.5 Landing Page (Pública)

| Variável      | Hex       | Contexto                 |
| ------------- | --------- | ------------------------ |
| `--bg`        | `#0a0a0a` | Landing page             |
| `--surface`   | `#141414` | Cards, seções            |
| `--surface-2` | `#1e1e1e` | Elementos aninhados      |
| `--accent`    | `#2563eb` | Links, ações secundárias |

---

## 3. Tipografia

### 3.1 Famílias

| Variável | Família                            | Peso               | Uso                                       |
| -------- | ---------------------------------- | ------------------ | ----------------------------------------- |
| `--mono` | `'Space Mono', monospace`          | 400, 700           | Labels, navegação, elementos de interface |
| `--sans` | `'DM Sans', system-ui, sans-serif` | 300, 400, 500, 600 | Corpo de texto, formulários               |

### 3.2 Tamanhos

| Elemento         | Tamanho | Line-height | Peso |
| ---------------- | ------- | ----------- | ---- |
| Logo             | 14px    | —           | 700  |
| Step (navegação) | 15px    | —           | —    |
| Panel title      | 15px    | —           | —    |
| Actante name     | 15px    | —           | —    |
| Body / input     | 14px    | 1.6         | 400  |
| Labels           | 15px    | —           | —    |
| Small / badge    | 8px     | —           | —    |
| MOP text         | 14px    | —           | mono |

### 3.3 Hierarquia de Textos

- **Títulos de painel**: maiúsculas, `letter-spacing: 1.5px`, `--amber`
- **Labels**: minúsculas, `--gray-hi`, `font-family: var(--mono)`
- **Badges**: `--gray-lo`, `--amber`, `--red` (conforme estado)
- **Placeholder**: `--gray-mid`

---

## 4. Espaçamento

### 4.1 Sistema de Grid

| Token  | Valor | Uso                              |
| ------ | ----- | -------------------------------- |
| `4px`  | —     | Spacing interno de chips, badges |
| `6px`  | —     | Gaps compactos                   |
| `8px`  | —     | Gaps padrões entre elementos     |
| `10px` | —     | Padding de seções internas       |
| `12px` | —     | Margens de cards                 |
| `14px` | —     | Padding de painéis               |
| `16px` | —     | Padding externo                  |
| `20px` | —     | Spacing entre seções             |

### 4.2 Layout Principal

```
┌─────────────────────────────────────────────────────┐
│ Topbar (44px)                                       │
├─────────────────────────────────────────────────────┤
│ MOP Bar (26px)                                      │
├──────────┬─────────────────────┬────────────────────┤
│ Left     │ Canvas              │ Right              │
│ 220px    │ 1fr                │ 280px              │
└──────────┴─────────────────────┴────────────────────┘
```

### 4.3 Border Radius

| Elemento              | Raio         |
| --------------------- | ------------ |
| Buttons, inputs       | 3px          |
| Cards (dashboard)     | 4px          |
| Chips, badges         | 8px          |
| Modal                 | 6px          |
| Dots (actante status) | 50% (circle) |

---

## 5. Componentes

### 5.1 Botões

```css
.btn {
  background: none;
  border: 1px solid var(--border);
  color: var(--white);
  padding: 6px 14px;
  border-radius: 3px;
  font-size: 14px;
  font-family: var(--sans);
  cursor: pointer;
  transition: all 0.15s;
}

.btn:hover {
  border-color: var(--amber);
  color: var(--amber);
}

.btn.primary {
  background: var(--amber);
  border-color: var(--amber);
  color: #000;
  font-weight: 600;
}

.btn.primary:hover {
  background: #d0901e;
}

.btn.danger {
  border-color: var(--red);
  color: var(--red);
}

.btn:disabled {
  opacity: 0.4;
  cursor: default;
}
```

### 5.2 Inputs e Textareas

```css
.fi {
  /* Input */
  width: 100%;
  background: var(--panel2);
  border: 1px solid var(--border);
  color: var(--white);
  padding: 7px 10px;
  border-radius: 3px;
  font-size: 14px;
  font-family: var(--sans);
}

.fi:focus {
  outline: none;
  border-color: var(--amber);
}

.ft {
  /* Textarea */
  width: 100%;
  background: #111;
  border: 1px solid var(--border);
  color: var(--white);
  padding: 8px 10px;
  border-radius: 3px;
  font-size: 14px;
  font-family: var(--sans);
  resize: vertical;
  min-height: 80px;
  line-height: 1.6;
}

.fs {
  /* Select */
  width: 100%;
  background: var(--panel2);
  border: 1px solid var(--border);
  color: var(--white);
  padding: 7px 10px;
  border-radius: 3px;
  font-size: 14px;
  font-family: var(--sans);
}
```

### 5.3 Chips Selecionáveis

```css
.chip-opt {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 2px 8px;
  font-size: 15px;
  font-family: var(--mono);
  cursor: pointer;
  transition: all 0.15s;
  color: var(--gray-hi);
}

.chip-opt:hover {
  border-color: var(--gray-hi);
  color: var(--white);
}

.chip-opt.active {
  border-color: var(--amber);
  color: var(--amber);
  background: var(--amber-bg);
}
```

### 5.4 Status Dots (Actantes)

```css
.a-dot.estabilizado {
  background: var(--green);
}
.a-dot.em_formacao {
  background: none;
  border: 1.5px dashed var(--amber);
}
.a-dot.contestado {
  background: none;
  border: 1.5px dashed var(--red);
}
.a-dot.disperso {
  background: var(--gray-lo);
}
.a-dot.plasma {
  background: none;
  border: 1px solid var(--gray-lo);
  opacity: 0.5;
}
```

### 5.5 Badges

```css
.a-badge.pc {
  border: 1px dashed var(--amber);
  color: var(--amber-d);
} /* pré-campo */
.a-badge.pl {
  border: 1px solid var(--gray-lo);
  color: var(--gray-lo);
} /* plasma */
.a-badge.cont {
  border: 1px solid var(--red);
  color: var(--red);
} /* contestado */
```

### 5.6 Modals

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.78);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.modal-overlay.open {
  opacity: 1;
  pointer-events: all;
}

.modal {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 6px;
  width: 500px;
  max-width: 95vw;
  max-height: 88vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  transform: translateY(8px);
  transition: transform 0.2s;
}
```

### 5.7 Toggle

```css
.toggle-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
}

.toggle-row:hover {
  background: var(--hover);
}

.tt {
  /* Track */
  width: 32px;
  height: 17px;
  background: var(--gray-lo);
  border-radius: 9px;
  position: relative;
  transition: background 0.2s;
}

.tt.on {
  background: rgba(200, 132, 26, 0.4);
}

.th {
  /* Thumb */
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--gray-hi);
  position: absolute;
  top: 3px;
  left: 3px;
  transition: all 0.2s;
}

.tt.on .th {
  left: 18px;
  background: var(--amber);
}
```

### 5.8 Cards (Dashboard)

```css
.dash-card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 14px;
  cursor: pointer;
  transition: all 0.15s;
}

.dash-card:hover {
  border-color: var(--amber-d);
  background: var(--hover);
}

.dash-card.active {
  border-color: var(--amber);
}
```

### 5.9 Alerts

```css
.alert {
  background: var(--panel2);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 9px 14px;
  font-size: 15px;
  animation: alertIn 0.15s ease;
  max-width: 300px;
}

.alert.success {
  border-color: var(--green);
}
.alert.error {
  border-color: var(--red);
}
.alert.warning {
  border-color: var(--amber);
}
```

---

## 6. Elementos Específicos

### 6.1 Navigation Steps

```css
.step {
  padding: 3px 9px;
  border-radius: 10px;
  font-family: var(--mono);
  font-size: 15px;
  cursor: pointer;
  border: 1px solid var(--border);
  color: var(--gray-mid);
  transition: all 0.15s;
}

.step.active {
  background: var(--amber-d);
  color: var(--white);
  border-color: var(--amber);
}

.step.done {
  border-color: var(--gray-hi);
  color: var(--white);
}

.step.done::after {
  content: " ✓";
  color: var(--green);
}
```

### 6.2 Mode Picker (Mediador vs Intermediário)

```css
.mode-card {
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.15s;
}

.mode-card:hover {
  border-color: var(--gray-hi);
}

.mode-card.active.mediador {
  border-color: var(--amber);
  background: var(--amber-bg);
}

.mode-card.active.intermediario {
  border-color: var(--gray-hi);
  background: rgba(136, 136, 136, 0.08);
}
```

### 6.3 Legenda do Canvas

```css
#legend {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(20, 20, 20, 0.92);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 8px 10px;
  backdrop-filter: blur(4px);
}
```

---

## 7. Utilitários

### 7.1 Scrollbar

```css
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 2px;
}
```

### 7.2 Screen Reader / Acessibilidade

Foco em elementos使用了 `outline: none` substituído por `border-color` para indicação visual de foco.

### 7.3 Transições

- **Padrão**: `transition: all .15s`
- **Modais**: `transition: opacity .2s, transform .2s`
- **Toggle**: `transition: background .2s, left .2s`

---

## 8. Breakpoints

O design system foi concebido primariamente para desktop. Não há sistema de breakpoints formalizado — a interface usa:

- `display: none/block` para show/hide
- CSS Grid com `minmax(300px, 1fr)` no dashboard para responsividade fluida

---

## 9. Uso de cores por Contexto

### 9.1 Estados de Actante

| Estado       | Dot                | Badge                 | Texto |
| ------------ | ------------------ | --------------------- | ----- |
| Estabilizado | Verde              | —                     | —     |
| Em formação  | Amarelo (dashed)   | —                     | —     |
| Contestado   | Vermelho (dashed)  | `!`                   | —     |
| Disperso     | Cinza              | —                     | —     |
| Plasma       | Cinza (opacity .5) | ↯                     | —     |
| Pré-campo    | —                  | `pré-campo` (amarelo) | —     |

### 9.2 Modos de Associação

| Modo          | Representação                             |
| ------------- | ----------------------------------------- |
| Mediador      | Linha sólida (`var(--amber)`)             |
| Intermediário | Linha tracejada (`var(--gray-hi)`)        |
| Contestado    | Linha vermelha (`var(--red)`)             |
| Hipotético    | Linha pontilhada (`rgba(240,237,232,.2)`) |

---

## 10. Referência Rápida

### CSS Variables

```css
:root {
  /* Cores */
  --bg: #060606;
  --panel: #0f0f0f;
  --panel2: #161616;
  --hover: #2a2a2a;
  --border: #383838;
  --border2: #2a2a2a;
  --amber: #f0a020;
  --amber-d: #b57818;
  --amber-bg: rgba(200, 132, 26, 0.08);
  --white: #ffffff;
  --gray-hi: #888;
  --gray-mid: #555;
  --gray-lo: #333;
  --red: #f05545;
  --green: #2ecc71;
  --blue-d: #2c3e50;

  /* Tipografia */
  --font-size: 14px;
  --mono: "Space Mono", monospace;
  --sans: "DM Sans", system-ui, sans-serif;
}
```

---

## 11. Princípios de Implementação

1. **Extensibilidade**: cores definidas em `:root` permitem sobrescrita por tema
2. **Fallback**: `system-ui, sans-serif` como fallback para DM Sans
3. **Acessibilidade**: evitar cores isoladas — sempre combinar com ícone ou texto
4. **Performance**: usar CSS native antes de JS para interações simples
5. **Manutenção**: cada componente auto-contido (botões, inputs, chips)

---

_Design System — TRAMA-TAR v1.0_
