# SPEC.md - Recombo Web

## 1. Visão Geral

**Nome**: Recombo - Acervo Digital de Arte
**Tipo**: Web Application (Next.js 14)
**Descrição**: Plataforma de gerenciamento e exposição de acervo de arte contemporânea, contendo obras de múltiplos formatos (áudio, vídeo, imagem, texto, instalação, performance, website, software), eventos, artistas e entrevistas.
**Público-alvo**: Artistas, curadores, pesquisadores e público geral interessado em arte contemporânea brasileira.

---

## 2. Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Estilização**: Tailwind CSS
- **Autenticação**: NextAuth.js (JWT/Session)
- **Upload**: Uploadthing ou S3 presigned URLs
- **Hospedagem**: Vercel

---

## 3. Estrutura de Diretórios

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/          # Grupo de rotas públicas
│   │   ├── page.tsx       # Home
│   │   ├── sobre/         # Página sobre
│   │   ├── arquivo/      # Catálogo geral
│   │   ├── timeline/      # Linha do tempo
│   │   └── obra/[slug]/   # Detalhe de obra
│   ├── (admin)/           # Grupo de rotas admin
│   │   ├── layout.tsx    # Admin layout com sidebar
│   │   ├── dashboard/    # Dashboard admin
│   │   ├── artworks/     # CRUD obras
│   │   ├── artists/      # CRUD artistas
│   │   ├── events/       # CRUD eventos
│   │   ├── interviews/   # CRUD entrevistas
│   │   └── tags/         # Gerenciamento tags
│   └── api/              # API routes
│       ├── auth/         # Autenticação
│       ├── artworks/     # CRUD obras
│       ├── artists/      # CRUD artistas
│       ├── events/       # CRUD eventos
│       ├── interviews/   # CRUD entrevistas
│       └── uploads/      # Upload de arquivos
├── components/
│   ├── ui/               # Componentes base (Button, Input, etc.)
│   ├── layout/           # Header, Footer, Sidebar
│   ├── artwork/          # Cards, galeria, player
│   ├── artist/           # Cards, perfil
│   └── admin/            # Componentes admin (forms, tables)
├── lib/                   # Utilitários
│   ├── db.ts            # Prisma client
│   ├── auth.ts          # NextAuth config
│   ├── utils.ts         # Funções helpers
│   └── constants.ts     # Constantes globais
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript types
└── styles/               # Arquivos CSS globais
```

---

## 4. Modelos de Dados (Prisma)

### 4.1 Entidades Principais

| Entidade | Descrição |
|----------|------------|
| `Artist` | Artista/criador com biografia, pseudônimo, contato, roles |
| `Artwork` | Obra de arte com metadados técnicos específicos por tipo |
| `ArtworkArtist` | Relacionamento N:N entre obra e artista com papel (criador, colaborador) |
| `ArtworkFile` | Arquivos associados a uma obra (thumbnail, original, derivados) |
| `ArtworkRelation` | Relacionamento entre obras (inspiração, remix, colaboração) |
| `Event` | Evento (exposição, festival, performance, workshop) |
| `EventArtwork` | Relacionamento evento-obra |
| `EventParticipant` | Relacionamento evento-artista |
| `Interview` | Entrevista (áudio/vídeo com transcrição) |
| `InterviewSubject` | Relacionamento entrevista-artista |
| `Tag` | Tags categorizadas (tema, técnica, local, período, projeto) |
| `User` | Usuário do sistema (admin, editor, viewer) |

### 4.2 Enumerações

```prisma
ArtworkType: audio, video, image, text, installation, performance, website, software
ArtworkStatus: draft, published, archived
AccessLevel: public, private, restricted
EventType: festival, exposição, performance, workshop, lançamento, meetup
FileType: thumbnail, original, derivative, documentation, source
RelationType: inspired_by, remix_of, collab_with, reference_to, continuation_of, responds_to, part_of, derivative_of
TagCategory: theme, technique, location, period, project
TranscriptStatus: pending, in_progress, done
UserRole: admin, editor, viewer
```

---

## 5. Funcionalidades

### 5.1 Área Pública

| Funcionalidade | Descrição |
|----------------|-----------|
| **Home** | Destaques, obras recentes, eventos próximos |
| **Arquivo** | Catálogo filtrável (tipo, ano, tags, artista) |
| **Timeline** | Visualização cronológica de obras e eventos |
| **Obra/[slug]** | Página detalhada com player/visualizador conforme tipo |
| **Artista/[slug]** | Perfil do artista com obras vinculadas |
| **Evento/[slug]** | Página de evento com programação |
| **Sobre** | Informações sobre o projeto |

### 5.2 Área Administrativa

| Funcionalidade | Descrição |
|----------------|-----------|
| **Dashboard** | Estatísticas, atividades recentes |
| **CRUD Artistas** | Criar, editar, listar, deletar artistas |
| **CRUD Obras** | Criar, editar, listar, deletar obras com upload de arquivos |
| **CRUD Eventos** | Criar, editar, listar eventos |
| **CRUD Entrevistas** | Gerenciar entrevistas e transcrições |
| **Gerenciar Tags** | Criar e associar tags |
| **Upload** | Upload de arquivos para obras |

### 5.3 Autenticação

- Login/logout de usuários
- Roles: `admin` (acesso total), `editor` (CRUD conteúdo), `viewer` (apenas leitura)
- Session JWT com NextAuth.js

---

## 6. API REST

### 6.1 Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/artworks` | Listar obras (paginado, filtrado) |
| POST | `/api/artworks` | Criar obra |
| GET | `/api/artworks/[id]` | Detalhar obra |
| PUT | `/api/artworks/[id]` | Atualizar obra |
| DELETE | `/api/artworks/[id]` | Deletar obra |
| GET | `/api/artists` | Listar artistas |
| POST | `/api/artists` | Criar artista |
| GET | `/api/artists/[id]` | Detalhar artista |
| PUT | `/api/artists/[id]` | Atualizar artista |
| DELETE | `/api/artists/[id]` | Deletar artista |
| GET | `/api/events` | Listar eventos |
| POST | `/api/events` | Criar evento |
| GET | `/api/events/[id]` | Detalhar evento |
| PUT | `/api/events/[id]` | Atualizar evento |
| DELETE | `/api/events/[id]` | Deletar evento |
| POST | `/api/upload` | Upload de arquivo |

---

## 7. UI/UX

### 7.1 Design System

- **Tipografia**: Sans-serif (a definir: Inter, Geist, ou outra)
- **Cores**: Palette baseada em identidade visual Recombo
- **Spacing**: Sistema 4px (0, 4, 8, 12, 16, 24, 32, 48, 64, 96)
- **Border Radius**: 4px (pequeno), 8px (médio), 16px (grande)

### 7.2 Componentes Base

- Button (variants: primary, secondary, ghost, danger)
- Input, Textarea, Select
- Card
- Modal
- Table
- Pagination
- Badge
- Tag
- Skeleton loader

### 7.3 Componentes Específicos

- **ArtworkCard**: Card de obra com thumbnail, título, ano, tipo
- **ArtworkGallery**: Grid/gallery de obras
- **ArtworkPlayer**: Player específico por tipo (áudio, vídeo)
- **ArtworkViewer**: Visualizador de imagem/texto
- **ArtistCard**: Card de artista com foto e nome
- **EventCard**: Card de evento com data e local
- **FilterBar**: Filtros para arquivo (tipo, ano, tags)
- **TimelineView**: Visualização cronológica

---

## 8. Requisitos Não-Funcionais

- **Performance**: Pages < 3s, API < 500ms
- **SEO**: Meta tags, sitemap, OpenGraph
- **Acessibilidade**: WCAG 2.1 AA
- **Responsividade**: Mobile-first, breakpoints: 640px, 768px, 1024px, 1280px
- **Segurança**: Sanitization, rate limiting, CSRF protection

---

## 9. Milestones

1. **Setup**: Next.js, Prisma, Tailwind, estrutura base
2. **Auth**: NextAuth com roles
3. **API CRUD**: Artistas, Obras, Eventos
4. **Admin**: Dashboard e forms de criação/edição
5. **Área pública**: Páginas principais
6. **Upload**: Integração com storage
7. **Timeline**: Visualização cronológica
8. **Busca/Filtros**: Sistema de filtros no arquivo

---

## 10. Variáveis de Ambiente

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
UPLOADTHING_SECRET=...
UPLOADTHING_APP_ID=...
```

---

*Documento gerado automaticamente em: 2026-05-08*