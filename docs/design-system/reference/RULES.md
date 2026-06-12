# TRAMA-TAR · Regras do Design System

Referência obrigatória para o OpenCode antes de gerar ou editar qualquer código de UI.

---

## Regras absolutas

1. **Nunca usar valores hardcoded** para cor, fonte, espaçamento ou sombra.  
   Sempre referenciar variáveis de `design-system/tokens.css`.

2. **Nunca criar componentes que já estão documentados** em `design-system/components.md`.  
   Reusar e estender os existentes.

3. **Fonte exclusiva: Bricolage Grotesque** para todo texto de UI.  
   Fira Code apenas para `<code>`, `<pre>`, e terminais.

4. **Espaçamento em múltiplos de 8px** via `var(--space-N)`.  
   Nunca `margin: 10px` ou qualquer valor fora da escala.

5. **Paleta restrita:**
   - Amber `#B8860B` → elementos primários, ações, destaques
   - Wine `#722F37` → elementos secundários, estados de alerta, ações destrutivas
   - Neutros → textos, bordas, fundos
   - Branco puro `#FFFFFF` → fundo principal, cards
   - Fora da paleta: proibido sem aprovação explícita

---

## Regras de componentes

- `border-radius` padrão: `var(--radius-md)` para interativos, `var(--radius-lg)` para cards/containers
- Focus ring: sempre `var(--shadow-focus)` (anel amber 3px)
- Transições: `var(--transition-base)` para hover/active, `var(--transition-bounce)` para entradas de elementos
- Ícones: alinhar verticalmente com `display: flex; align-items: center; gap: var(--space-2)`

---

## Regras de tipografia

- `letter-spacing: var(--letter-spacing-tight)` em headings grandes (h1, h2)
- `letter-spacing: var(--letter-spacing-wide)` em badges e labels em caixa alta
- `line-height: var(--line-height-normal)` em parágrafos de corpo
- `line-height: var(--line-height-tight)` em headings

---

## Regras de acessibilidade

- Contraste mínimo: 4.5:1 para texto normal, 3:1 para texto grande
- Todo `<button>` sem texto visível precisa de `aria-label`
- Modais: gerenciar foco com `focus-trap`, fechar com Escape
- Inputs: sempre com `<label>` associado via `htmlFor` / `id`
- Não usar cor como único indicador de estado (complementar com ícone ou texto)

---

## Regras de nomenclatura (React / Next.js)

- Componentes: PascalCase (`TarNode`, `NodeCard`, `PrimaryButton`)
- Classes CSS utilitárias do sistema: prefixo `trama-` (`trama-container`, `trama-grid`)
- Arquivos de componente: `ComponentName/index.tsx` + `ComponentName.module.css`
- CSS Modules: camelCase interno, nunca string de classe hardcoded no JSX
- Props booleanas: prefixo `is` ou `has` (`isSelected`, `hasError`, `isLoading`)

---

## Regras de estrutura de arquivos

```
src/
  components/
    ui/               ← componentes genéricos do design system
      Button/
      Input/
      Card/
      ...
    trama/            ← componentes específicos da plataforma
      TarNode/
      NetworkCanvas/
      ...
  styles/
    globals.css       ← importa design-system/tokens.css aqui
    utilities.css     ← classes utilitárias trama-*
```

---

## O que NÃO fazer

- Não usar Tailwind com valores arbitrários para as propriedades cobertas pelos tokens (ex.: `text-[#B8860B]` → usar `text-primary`)
- Não duplicar lógica de tema em styled-components se já existe no CSS Custom Properties
- Não criar variantes de componente não documentadas sem adicionar em `components.md`
- Não usar `!important`
- Não usar `z-index` com valor numérico arbitrário — usar as variáveis `--z-*`

---

## Checklist antes de commitar código de UI

- [ ] Todos os valores de design vêm de tokens?
- [ ] O componente está documentado em `components.md`?
- [ ] Focus ring presente em todos os elementos interativos?
- [ ] Labels e aria-labels presentes?
- [ ] Nenhum valor hardcoded de cor, fonte ou espaçamento?
