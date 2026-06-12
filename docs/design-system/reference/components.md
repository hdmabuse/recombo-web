# TRAMA-TAR · Componentes

Documentação de referência para o OpenCode. Consultar antes de criar ou editar qualquer componente de UI.

---

## Button

**Variantes:** `primary` | `secondary` | `ghost` | `danger`  
**Tamanhos:** `sm` | `md` (padrão) | `lg`  
**Estados:** default, hover, active, disabled, loading

```tsx
// Uso
<Button variant="primary" size="md" onClick={handleClick}>
  Salvar nó
</Button>

<Button variant="ghost" size="sm" disabled>
  Cancelar
</Button>
```

**Regras:**

- Texto sempre em `--font-display`, `--font-weight-semibold`
- Primary: fundo `--color-primary`, texto branco, hover escurece 10%
- Secondary: borda `--color-secondary`, texto `--color-secondary`, fundo transparente
- Ghost: sem borda, texto `--color-text-secondary`, hover `--color-bg-surface`
- Danger: fundo `--color-wine-700`
- `border-radius: var(--radius-md)`
- Padding: `sm` → `space-2 space-4` | `md` → `space-3 space-6` | `lg` → `space-4 space-8`
- Focus ring: `--shadow-focus`
- Estado loading: spinner inline, texto mantido, opacity 0.7

---

## Input / Textarea

**Variantes:** `default` | `error` | `success`

```tsx
<Input label="Nome do nó" placeholder="Ex.: Laboratório" error="Campo obrigatório" />
```

**Regras:**

- Borda `1px solid var(--color-border)`, foco muda para `--color-border-focus`
- `border-radius: var(--radius-base)`
- Fonte `--font-body`, `--font-size-base`
- Label acima, `--font-size-sm`, `--font-weight-medium`, `--color-text-secondary`
- Mensagem de erro: `--font-size-xs`, `--color-error`, abaixo do campo
- Padding interno: `var(--space-3) var(--space-4)`

---

## Card

**Variantes:** `default` | `bordered` | `highlighted`

```tsx
<Card variant="default">
  <CardHeader>Título do nó</CardHeader>
  <CardBody>Conteúdo</CardBody>
  <CardFooter>Ações</CardFooter>
</Card>
```

**Regras:**

- Fundo `--color-bg-raised`, borda `1px solid var(--color-border)`
- `border-radius: var(--radius-lg)`
- Sombra `--shadow-md` no hover
- `highlighted`: borda esquerda `4px solid var(--color-primary)`
- Padding interno: `var(--space-6)`
- Transição `--transition-base` no hover

---

## Badge

**Variantes:** `default` | `primary` | `secondary` | `success` | `warning` | `error`

```tsx
<Badge variant="primary">Ator</Badge>
<Badge variant="secondary">Rede</Badge>
```

**Regras:**

- `border-radius: var(--radius-full)`
- Padding: `var(--space-1) var(--space-3)`
- Fonte `--font-size-xs`, `--font-weight-semibold`
- `letter-spacing: var(--letter-spacing-wide)`

---

## Modal / Dialog

```tsx
<Modal isOpen={open} onClose={() => setOpen(false)} title="Editar nó">
  <ModalBody>...</ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setOpen(false)}>
      Cancelar
    </Button>
    <Button variant="primary" onClick={handleSave}>
      Salvar
    </Button>
  </ModalFooter>
</Modal>
```

**Regras:**

- Overlay: `rgba(26, 26, 26, 0.6)`, `z-index: var(--z-modal)`
- Painel: `--color-bg-raised`, `--shadow-xl`, `--radius-xl`
- Largura máxima: `560px`, centralizado com `margin: auto`
- Animação de entrada: fade + translateY(8px), `--transition-base`
- Fechar com Escape, clicar fora do painel

---

## Tooltip

```tsx
<Tooltip content="Adicionar ator à rede">
  <Button variant="ghost" size="sm">
    +
  </Button>
</Tooltip>
```

**Regras:**

- Fundo `--color-neutral-900`, texto branco, `--font-size-xs`
- `border-radius: var(--radius-base)`, padding `var(--space-2) var(--space-3)`
- `z-index: var(--z-tooltip)`
- Delay de entrada: 300ms

---

## Node (componente específico TRAMA-TAR)

Representa um nó da rede ANT no canvas.

```tsx
<TarNode
  id="node-01"
  label="Fab Lab Recife"
  type="actor" // actor | network | mediation | translation
  selected={false}
  onSelect={handleSelect}
/>
```

**Regras de visual por tipo:**

- `actor` → borda `--color-primary`, label `--font-weight-semibold`
- `network` → borda `--color-secondary`, background `--color-secondary-surface`
- `mediation` → borda tracejada `--color-neutral-300`
- `translation` → borda dupla, `--color-amber-500`

**Estados:**

- `selected`: sombra `--shadow-focus`, borda 2px sólida
- `hover`: `--shadow-md`, escala 1.02, `--transition-bounce`

---

## Typography Scale

```tsx
// Uso direto com classes utilitárias ou componentes Text
<h1 className="t-display">Título principal</h1>
<h2 className="t-heading">Seção</h2>
<p  className="t-body">Parágrafo corrido</p>
<code className="t-mono">código inline</code>
```

| Classe      | Fonte           | Tamanho            | Peso |
| ----------- | --------------- | ------------------ | ---- |
| `t-display` | Bricolage Grot. | `--font-size-3xl`  | 700  |
| `t-heading` | Bricolage Grot. | `--font-size-xl`   | 600  |
| `t-subhead` | Bricolage Grot. | `--font-size-lg`   | 500  |
| `t-body`    | Bricolage Grot. | `--font-size-base` | 400  |
| `t-small`   | Bricolage Grot. | `--font-size-sm`   | 400  |
| `t-mono`    | Fira Code       | `--font-size-sm`   | 400  |

---

## Layout helpers

```tsx
// Container responsivo
<div className="trama-container"> ... </div>

// Grid 12 colunas
<div className="trama-grid">
  <div className="col-span-8"> ... </div>
  <div className="col-span-4"> ... </div>
</div>
```

Container: `max-width var(--container-xl)`, padding horizontal `var(--space-8)`, margin auto.
