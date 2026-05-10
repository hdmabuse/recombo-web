# Integração Open Design

Este documento orienta como integrar alterações de layout geradas pelo Open Design ao projeto.

## Fluxo de Trabalho

### 1. Preparação (já feita)
- Branch `feature/open-design-layout` criada para receber as alterações
- Branch `feature/opencode-admin` contém as funcionalidades já implementadas

### 2. Gerar Layout no Open Design
No Open Design:
1. Descreva o layout desejado
2. Escolha a direção visual (Editorial, Brutalist, etc.)
3. Gere os arquivos
4. Exporte em formato React/Next.js

### 3. Integrar ao Projeto
Após exportar do Open Design:

```bash
# Copiar componentes gerados
cp -r /path/exported/components/* src/components/

# Copiar estilos se houver
cp -r /path/exported/styles/* src/app/

# Verificar conflitos
git status

# Testar build
npm run build
```

### 4. Resolver Conflitos
Se houver conflitos com código existente:
1. Manter a lógica de negócio (dashboards, APIs, formulários)
2. Integrar apenas styles e componentes de UI
3. Testar todas as rotas após integração

## Estrutura de Diretórios para Alterações

```
src/
├── app/                    # Páginas (Next.js App Router)
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Home
│   ├── (public)/           # Rotas públicas
│   └── (admin)/            # Rotas admin
├── components/
│   ├── ui/                 # Componentes base (Button, Card, Input)
│   ├── layout/             # Header, Footer, Sidebar
│   ├── artwork/            # Componentes de obra
│   ├── artist/             # Componentes de artista
│   └── admin/              # Componentes admin
└── styles/
    └── globals.css         # Estilos globais
```

##Direções Visuais Recomendadas

Para o projeto Recombo (arquivo de arte contemporânea):
- **Editorial Monocle** - Para páginas de conteúdo
- **Neo-Brutalist** - Para seções de destaque
- **Swiss Digital** - Para interface admin

## Testes Após Integração

```bash
# Verificar build
npm run build

# Testar rotas
npm run dev -p 3002

# Verificar rotas principais:
# - /
# - /arquivo
# - /timeline
# - /admin
# - /admin/artists
# - /admin/events
```

## Próximos Passos

1. Gerar layout no Open Design
2. Exportar arquivos
3. Integrar aqui no projeto
4. Testar e verificarbuild
5. Mergear com a branch de funcionalidades (feature/opencode-admin)

---

Em caso de dúvidas, revisar:
- SPEC2.md para requisitos do projeto
- prisma/schema.prisma para estrutura de dados