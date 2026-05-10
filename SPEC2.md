# SPEC2.md - Recombo Web (Revisão Comparada)

*Documento gerado a partir da comparação entre SPEC.md e Modelo_SDD.md*  
*Data: 2026-05-08*

---

## Legenda de Status

| Símbolo | Significado |
| :-: | :-: |
| 🔵 | Definição consolidada - decisão принята |
| 🟡 | Forte, mas depende de validação |
| 🔴 | Aberto - não resolver por inferência |

---

## 1. Visão Geral do Produto

**Nome oficial**: Recombo - Acervo Digital de Arte Contemporânea  
**Definição**: Plataforma de gerenciamento e exposição de acervo de arte contemporânea brasileira, contendo obras de múltiplos formatos, eventos, artistas e entrevistas.  
**O que resolve**: Falta de infraestrutura digital contínua para organizar,expor e gerenciar o acervo de arte do projeto Recombo.  
**O que não é**: Não é rede social, não é marketplace, não é LMS, não é observatório avançado.

---

## 2. Sistema de Cores para Decisões

### 🔵 Decisões Consolidadas

- Stack: Next.js 14, TypeScript, Prisma, PostgreSQL, Tailwind CSS
- Autenticação: NextAuth.js com roles (admin, editor, viewer)
- Estrutura de diretórios: app/(public), app/(admin), components/, lib/
- Tipos de obra: audio, video, image, text, installation, performance, website, software

### 🟡 Pendências a Validar

- Provedor de upload (Uploadthing vs S3 presigned URLs)
- Hospedagem final (Vercel vs alternativa)
- Detalhamento da timeline visual

### 🔴 Itens Abertos

- Paleta final de cores e identidade visual
- Layout específico das exportaçoes
- Regras de licenciamento detalhadas por obra

---

## 3. Estrutura de Diretórios (Revisada)

```
src/
├── app/
│   ├── (public)/                    # Área pública
│   │   ├── page.tsx                 # Home
│   │   ├── sobre/page.tsx
│   │   ├── arquivo/page.tsx         # Catálogo filtrável
│   │   ├── timeline/page.tsx        # Linha do tempo
│   │   ├── obra/[slug]/page.tsx     # Detalhe da obra
│   │   └── artista/[slug]/page.tsx  # Perfil do artista
│   ├── (admin)/                     # Área administrativa
│   │   ├── layout.tsx               # Admin layout + sidebar
│   │   ├── dashboard/page.tsx
│   │   ├── artworks/
│   │   ├── artists/
│   │   ├── events/
│   │   ├── interviews/
│   │   └── tags/
│   └── api/                         # API routes
├── components/
│   ├── ui/                          # Base (Button, Input, Card, Modal)
│   ├── layout/                      # Header, Footer, Sidebar
│   ├── artwork/                    # Cards, Gallery, Player, Viewer
│   ├── artist/                     # Cards, Profile
│   ├── event/                      # Cards, Detail
│   └── admin/                      # Forms, Tables
├── lib/
│   ├── db.ts                        # Prisma client
│   ├── auth.ts                      # NextAuth config
│   ├── utils.ts                     # Helpers
│   └── constants.ts
├── hooks/
└── types/
```

---

## 4. Feature Specs do MVP

### FS-01 — Administrador cria e gerencia artistas 🔵

- **Objetivo**: Criar, editar, listar e deletar registros de artistas
- **Usuário principal**: Admin, Editor
- **Happy path**: Listar artistas → Novo artista → Preencher campos → Salvar → Destaque na lista
- **Edge cases**: Pseudônimo duplicado, bio muito longa, foto opcional
- **Critério de aceite**: Artista salvo, listável, filtrável, vinculável a obras

### FS-02 — Administrador cria e gerencia obras 🟡

- **Objetivo**: Criar, editar, listar e deletar obras com upload de arquivos
- **Usuário principal**: Admin, Editor
- **Happy path**: Listar obras → Nova obra → Preencher metadados por tipo → Upload arquivo → Salvar →thumbnail gerada
- **Edge cases**: Tipo de arquivo incompatível, arquivo muito grande, metadados específicos por tipo ausentes
- **Critério de aceite**: Obra salva, com thumbnail, listável, filtrável, vinculável a artista

### FS-03 — Administrador cria e gerencia eventos 🔵

- **Objetivo**: Gerenciar eventos (exposições, festivais, performances)
- **Usuário principal**: Admin, Editor
- **Happy path**: Listar eventos → Novo evento → Preencher dados → Salvar → Listagem atualizada
- **Edge cases**: Data de término anterior ao início, local não definido
- **Critério de aceite**: Evento salvo, listável, vinculável a obras e participantes

### FS-04 — Visitante navega pelo arquivo público 🟡

- **Objetivo**: Permitir que o público navegue e filtre o acervo
- **Usuário principal**: Visitante (público)
- **Happy path**: Arquivo → Aplicar filtros (tipo, ano, tags) → Visualizar resultados → Clicar obra → Detalhe
- **Edge cases**: Nenhum resultado, filtro muito específico
- **Critério de aceite**: Navegação fluida, filtros funcionais, carregamento rápido

### FS-05 — Visitante acessa timeline cronológica 🔵

- **Objetivo**: Exibir obras e eventos em ordem cronológica
- **Usuário principal**: Visitante
- **Happy path**: Timeline → Scroll vertical → Ver obras por ano → Clicar para detalhe
- **Edge cases**: Ano sem obras, muitos itens em um ano
- **Critério de aceite**: Visualização cronológica funcional, navegação por ano

---

## 5. Matriz de Permissions por Perfil

| Ação | Admin | Editor | Viewer | Visitante |
| :-: | :-: | :-: | :-: | :-: |
| Criar artista | ✅ | ✅ | ❌ | ❌ |
| Editar artista | ✅ | ✅ | ❌ | ❌ |
| Deletar artista | ✅ | ❌ | ❌ | ❌ |
| Criar obra | ✅ | ✅ | ❌ | ❌ |
| Editar obra | ✅ | ✅ | ❌ | ❌ |
| Deletar obra | ✅ | ❌ | ❌ | ❌ |
| Criar evento | ✅ | ✅ | ❌ | ❌ |
| Ver arquivo público | ✅ | ✅ | ✅ | ✅ |
| Exportar dados | ✅ | ❌ | ❌ | ❌ |

---

## 6. Estados de Interface 🔵

*Derivação do Modelo_SDD para o Recombo*

| Tela | Vazio | Carregando | Erro | Sucesso | Pendência |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Lista de obras | "Nenhuma obra ainda." / Ação: Criar primeira obra | Skeleton dos tiles | "Falha ao carregar obras." / Ação: Tentar novamente | Nova obra destacada no topo, toast | Rascunho visível com etiqueta |
| Formulário | Campos com placeholders | Botão "Salvando..." disabled | Mensagem no campo, conteúdo preservado | Redirect para lista | Botão "Salvar rascunho" |
| Arquivo (filtro) | "Nenhum resultado." / Ação: Limpar filtros | Spinner no centro | "Erro ao buscar." | Resultados exibidos | — |
| Upload | Arquivo não selecionado | Barra de progresso | "Falha no upload." |Thumbnail exibida | — |
| Timeline | "Nenhuma obra neste período." | Skeleton da timeline | "Erro ao carregar." | Timeline populada | — |

### Princípios dos estados

1. **Vazio**: mensagem curta + ação recomendada
2. **Carregando**: skeleton quando possível, nunca apenas spinner
3. **Erro**: identificação do problema + retry + preservar conteúdo
4. **Sucesso**: destaque visual + toast persistente + redirecionamento claro
5. **Pendência**: etiqueta visual discreta + ação para resolver

---

## 7. Hierarquia do Dashboard Admin

Derivação da estrutura do Modelo_SDD:

### Nível 1 — Header identitário

- Nome do projeto (Recombo)
- Breadcrumb: Admin / [seção atual]
- Ação: Exportar (quando aplicável)
- Identificação do usuário com papel

### Nível 2 — Stats (números-chave)

- Total de obras
- Total de artistas
- Total de eventos
- Obras pendentes de revisão
- Por exemplo: "47 obras | 12 artistas | 3 eventos | 5 pendências"

### Nível 3 — Blocos funcionais

- Lista de obras recentes
- Lista de eventos próximos
- Atividades pendentes

### Nível 4 — Rodapé

- Versão do sistema
- Links úteis (docs, suporte)

---

## 8. Separação Visão Executiva vs Operacional 🔵

| Entidade | Visão Executiva (Dashboard) | Visão Operacional (Admin) |
| :-: | :-- | :-- |
| Obra | Contagem por tipo, obras em destaque, recentes | Lista filtrável, CRUD, upload, vínculos |
| Artista | Total de artistas, artistas em destaque | Cadastro completo, vínculos com obras |
| Evento | Próximos eventos, eventos em andamento | CRUD completo, programacao |
| Timeline | Visualização cronológica resumida | Gerenciamento de datas |

### Regra de trânsito

- Visitante (público) acessa visão executiva apenas
- Editor acessa visão operacional para trabalho
- Admin tem acesso total

---

## 9. Fluxos Tela a Tela

### Fluxo 1 — Gestão de Obras

```
Lista de obras → Botão Nova obra → Selecionar tipo → Formulário específico →
Upload arquivo → Preview → Salvar → Retorno à lista com nova obra em destaque
```

- **Pontos de retorno**: Cancelar oferece salvar rascunho; erro de upload preserva texto
- **Critério de sucesso**: Obra aparece na listagem com thumbnail

### Fluxo 2 — Navegação Pública

```
Home → Arquivo → Aplicar filtros → Resultado → Clicar obra → Detalhe →
Ver artista → Ver outras obras do artista
```

- **Pontos de retorno**: Voltar preserva filtros
- **Critério de sucesso**: Visitante encontra e visualiza obras

### Fluxo 3 — Timeline

```
Timeline → Scroll cronológico → Selecionar ano → Ver obras do período →
Clicar obra → Detalhe
```

- **Critério de sucesso**: Navegação fluida por período

---

## 10. Regras de Integração Externa 🟡

Derivação das regras do Modelo_SDD:

| Integração | Finalidade | Obrigatória | Risco de Custo | Fallback |
| :-- | :-- | :-- | :-- | :-- |
| Uploadthing/S3 | Armazenamento de arquivos | Sim | Variável por volume | Upload local temporário |
| Vercel | Hospedagem | Sim | Fixed | — |
| NextAuth | Autenticação | Sim | Free tier | — |
| Prisma/PostgreSQL | Banco de dados | Sim | Fixed | — |

### Regra de entrada de dependências

> Nenhuma integração externa entra no MVP apenas por sofisticação técnica. Para cada API ou serviço, registrar: finalidade, obrigatoriedade, custo, fallback e responsável pela aprovação.

---

## 11. Critérios de Sucesso do MVP 🔵

1. Administrador consegue criar artista rapidamente
2. Administrador consegue criar obra com upload de arquivo
3. Visitante navega pelo arquivo com filtros funcionais
4. Timeline exibe obras e eventos em ordem cronológica
5. Atualização de obra não destrói histórico
6. Produto pode ser usado em demonstração sem explicação excessiva

---

## 12. Diretrizes de Design/UX 🔵

- WEB-first
- Responsivo para mobile
- Foco principal em desktop para gestão
- Excelente legibilidade
- Poucos campos obrigatórios por tela
- Estados vazios úteis
- Feedback explícito de erro e sucesso
- Navegação curta (máximo 3 cliques para ação principal)

---

## 13. Matriz de Exportação (para fase seguinte) 🟡

| Saída | Formato Primário | Uso |
| :-- | :-- | :-- |
| Catálogo de obras | PDF / XLSX | Apresentação institucional |
| Dados do acervo | CSV | Interoperabilidade |
| Relatório de gestão | PDF | Gestão interna |

---

## 14. Pontos Still Abertos 🔴

- Paleta final de cores e identidade visual
- Layout detalhado das exportaçoes PDF
- Regras de licenciamento por obra (detalhamento)
- Comportamento de busca no arquivo
- Timeline visual (animação, interação)
- Tratamento de obras com acesso restrito

---

## 15. Glossário

| Termo | Definição |
| :-- | :-- |
| Visão executiva | Camada de leitura rápida para gestores/visitantes |
| Visão operacional | Camada de edição e gerenciamento para admin/editor |
| Pendência | Item salvo como rascunho ou aguardando revisão |
| Rascunho | Registro incompleto ainda não publicado |

---

*Fim do documento*