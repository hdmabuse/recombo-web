<<<<<<< HEAD
# RE:COMBO - O Arquivo como Semente

Sistema web para gerenciamento e apresentação do acervo digital do coletivo Re:combo (2001-2008).

## 🚀 Quick Start

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar ambiente
```bash
cp .env.example .env.local
```

Edite o `.env.local` com sua string de conexão PostgreSQL/Supabase.

### 3. Preparar banco de dados
```bash
npx prisma generate
npx prisma db push
```

### 4. Iniciar projeto
```bash
npm run dev
```

### 5. Acessar
- **Site:** http://localhost:3000
- **Admin:** http://localhost:3000/admin/artworks

---

## 📁 Estrutura do Projeto

```
recombo-web/
├── prisma/
│   └── schema.prisma       # Schema do banco de dados
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   │   └── admin/      # Endpoints admin
│   │   ├── admin/         # Páginas administrativas
│   │   │   ├── artworks/   # CRUD de obras
│   │   │   └── (layout)    # Layout admin
│   │   ├── arquivo/        # Página do acervo público
│   │   ├── obra/[slug]/   # Detalhe de obra
│   │   ├── sobre/          # Página sobre
│   │   ├── timeline/       # Linha do tempo
│   │   └── page.tsx        # Homepage
│   ├── components/
│   │   ├── admin/          # Componentes admin
│   │   │   ├── forms/     # Formulários
│   │   │   └── AdminLayout.tsx
│   │   └── layout/         # Header, Footer
│   └── lib/               # Utilitários (prisma, utils)
├── .env.example           # Exemplo de variáveis
├── SETUP.md               # Guia de configuração
├── SPEC.md                # Especificação técnica
├── mockup-navegavel.html # Mockup interativo
└── tailwind.config.ts    # Configuração Tailwind
```

---

## 🎯 Funcionalidades

### Frontend Público
- [x] Homepage com estatísticas e destacados
- [x] Acervo filtrável (tipo, ano, tags)
- [x] Detalhe de obra com player multimídia
- [x] Linha do tempo
- [x] Mapa (placeholder)
- [x] Rede de relações (placeholder)
- [x] Página Sobre com história
- [x] Página Comunidade (placeholder)

### Admin (Gestão do Acervo)
- [x] Listagem de obras com filtros
- [x] Busca e paginação
- [x] Ações em lote (selecionar múltiplos)
- [x] Nova obra (formulário completo)
- [x] Edição de obra (abas)
- [ ] Upload de arquivos (requer storage)
- [ ] Importação em lote (CSV, BibTeX)
- [ ] Exportação (CSV, JSON, BibTeX)

---

## 🛠️ Tecnologias

| Categoria | Tecnologia |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| UI | React + Tailwind CSS |
| Estado | React Hooks |
| ORM | Prisma |
| Database | PostgreSQL (Supabase) |
| Validação | Zod |
| Ícones | Lucide React |
| Tipos | TypeScript |

---

## 📋 Schema do Banco

### Entidades Principais

| Entidade | Descrição |
|----------|-----------|
| **Artwork** | Obras do acervo (áudio, vídeo, imagem, etc.) |
| **Artist** | Artistas/membros |
| **Event** | Eventos (festivais, exposições) |
| **Interview** | Entrevistas |
| **ArtworkFile** | Arquivos digitais |
| **Tag** | Tags/folksonomia |
| **ArtworkRelation** | Relações entre obras |

### Tipos de Obra
- `audio` - Músicas, faixas, soundscapes
- `video` - Vídeos, performances gravadas
- `image` - Fotografias, ilustrações
- `text` - Textos, artigos
- `installation` - Instalações
- `performance` - Performances
- `website` - Sites
- `software` - Programas

---

## 🔧 Configuração

### Variáveis de Ambiente

```env
# Banco de dados (obrigatório)
DATABASE_URL="postgresql://..."

# Supabase (opcional)
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Comandos Prisma

```bash
# Gerar cliente
npx prisma generate

# Sincronizar schema
npx prisma db push

# Criar migration
npx prisma migrate dev --name nome-da-migration

# Abrir studio
npx prisma studio
```

---

## 📄 Documentação Adicional

- [SPEC.md](./SPEC.md) - Especificação técnica completa
- [SETUP.md](./SETUP.md) - Guia detalhado de configuração
- [spec-cadastro-acervo.md](./spec-cadastro-acervo.md) - Spec do sistema de cadastro

---

## 📝 Licença

Todo o conteúdo disponível sob Licença LUCR (Licença de Uso Completo Re:combo) e Creative Commons.

---

## 👥 Equipe

- **Proponente:** Beatriz Arcoverde de Oliveira
- **Coordenador:** José Carlos Porto Arcoverde Junior (H.D. Mabuse)
- **Projeto:** re:combo: o arquivo como semente
- **Edital:** FUNCULTURA Geral 2024/2025
=======
# recombo-web
 
>>>>>>> 4f64fef667ffd1493843274827b723c2f31035bb
