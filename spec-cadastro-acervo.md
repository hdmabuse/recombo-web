# SPEC - SISTEMA DE CADASTRO DE ACERVO AUDIOVISUAL
## RE:COMBO - Módulo de Gestão do Acervo

**Versão:** 1.0
**Data:** Maio 2026
**Baseado em:** Tellico KDE Collection Management

---

# 1. ANÁLISE DO TELLICO COMO REFERÊNCIA

## 1.1 Visão Geral do Tellico

O Tellico é um software de gerenciamento de coleções de código aberto, desenvolvido em C++/Qt pelo KDE. Foi criado para gerenciar diferentes tipos de coleções: livros, vídeos, músicas, jogos, e muito mais.

### Características Principais

| Característica | Descrição | Aplicação no RE:COMBO |
|----------------|-----------|----------------------|
| **Tipos de campo flexíveis** | 11 tipos de campo (texto, número, data, imagem, URL, etc.) | Essencial para多样化 conteúdo |
| **Coleções personalizáveis** | Templates de coleção + campos customizáveis | Adaptar para cada tipo de mídia |
| **Importação múltipla** | BibTeX, CSV, PDF, áudio, vídeo | Importar de diversas fontes |
| **Metadados rich** | Campos detalhados para cada tipo | Descrição completa das obras |
| **Interface Qt** |Desktop (KDE) | Migrar para Web |

## 1.2 Tipos de Campo do Tellico

O Tellico suporta 11 tipos de campo distintos:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    TIPOS DE CAMPO - TELLICO                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. TEXT          → Texto curto (nome, título)                     │
│  2. PARAGRAPH     → Texto longo (descrição, notas)                  │
│  3. NUMBER        → Números (ano, duração, quantidade)              │
│  4. DATE          → Datas (data de criação, publicação)            │
│  5. URL           → Links (referências, downloads)                 │
│  6. IMAGE         → Imagens (capas, thumbnails)                    │
│  7. CHOICE        → Seleção única (gênero, tipo)                    │
│  8. MULTIPLE      → Múltipla escolha (tags, categorias)             │
│  9. TABLE         → Tabela (equipe, especificações técnicas)       │
│  10. BOOLEAN      → Sim/Não (publicado, disponível)                │
│  11. RATING       → Avaliação (nota de 1-5 estrelas)               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 1.3 Coleções Padrão do Tellico

O Tellico vem com 12 templates de coleção:

| Coleção | Campos Relevantes | Adaptação RE:COMBO |
|---------|-------------------|-------------------|
| **Books** | Autor, ISBN, editora, ano | Publicações, textos |
| **Videos** | Diretor, duração, gênero, idioma | Performances em vídeo |
| **Music** | Artista, álbum, faixas, gênero | Faixas de áudio |
| **Video Games** | Plataforma, desenvolvedor | (não aplicável) |
| **Comics** | Artista, publicação | (não aplicável) |
| **Custom** | Campos livres | OBRAS PRINCIPAIS |
| **Custom** | Campos livres | EVENTOS |
| **Custom** | Campos livres | ENTREVISTAS |

---

# 2. ARQUITETURA DO SISTEMA

## 2.1 Stack Tecnológico

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ARQUITETURA DO SISTEMA                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  FRONTEND                    BACKEND                 BANCO          │
│  ─────────                   ──────                 ──────          │
│                                                                     │
│  ┌─────────────┐           ┌─────────────┐        ┌─────────────┐  │
│  │  Next.js 14 │           │  Next.js   │        │ PostgreSQL  │  │
│  │   (App)    │◄──────────►│   API      │◄──────►│  + PostGIS  │  │
│  └─────────────┘           └─────────────┘        └─────────────┘  │
│         │                         │                       │          │
│         ▼                         ▼                       ▼          │
│  ┌─────────────┐           ┌─────────────┐        ┌─────────────┐  │
│  │  React     │           │   Prisma    │        │  Supabase   │  │
│  │  Hooks    │           │   ORM       │        │  (Cloud)    │  │
│  └─────────────┘           └─────────────┘        └─────────────┘  │
│                                                                     │
│         │                         │                       │          │
│         ▼                         ▼                       ▼          │
│  ┌─────────────┐           ┌─────────────┐        ┌─────────────┐  │
│  │  TanStack  │           │   tRPC      │        │   Storage   │  │
│  │   Query    │           │   (REST)    │        │  (Files)    │  │
│  └─────────────┘           └─────────────┘        └─────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 2.2 Stack Detalhado

| Componente | Tecnologia | Versão |
|------------|------------|--------|
| Framework | Next.js | 14.x |
| UI | React + Tailwind | 18.x |
| State | TanStack Query | 5.x |
| API | tRPC | 11.x |
| ORM | Prisma | 5.x |
| Database | PostgreSQL | 15.x |
| Auth | Supabase Auth | - |
| Storage | Supabase Storage | - |
| Search | Meilisearch | 1.x |

---

# 3. ENTIDADES E SCHEMA

## 3.1 Entidade: OBRA (Artwork)

Entidade principal que representa qualquer item do acervo.

```typescript
// Entidade: OBRA
{
  // Identificação
  id: string;              // UUID único
  slug: string;            // URL amigável (auto-gerado)
  title: string;           // Título da obra (obrigatório)
  
  // Descrição
  description: text;       // Descrição completa
  shortDescription: text; // Resumo (para cards)
  
  // Classificação (Choice)
  type: enum;              // audio | video | image | text | installation | performance | website | software
  medium: string;         // Técnica/material (ex: "video digital", "print digital")
  genre: string[];         // Gêneros (ex: ["net.art", "glitch", "experimental"])
  
  // Data (Date)
  year: number;            // Ano de criação
  yearStart: number;       // Início (para obras periódicas)
  yearEnd: number;        // Término
  
  // Arquivo principal (Image/Audio/Video)
  thumbnail: string;      // URL da thumbnail
  fileUrl: string;        // URL do arquivo principal
  fileType: string;      // MIME type
  fileSize: number;      // Tamanho em bytes
  duration: number;      // Duração em segundos (para áudio/vídeo)
  resolution: string;     // Resolução (ex: "1920x1080")
  codec: string;          // Codec (ex: "h264", "mp3")
  
  // Metadados técnicos
  dimensions: string;     // Dimensões (ex: "30x40cm")
  colors: string;         // Sistema de cores
  bitDepth: number;       // Profundidade de bits
  
  // Localização (Table - específica para cada obra)
  locationCreated: string; // Local de criação
  locationCurrent: string; // Localização atual
  
  // Licenciamento (Choice)
  license: string;        // LUCR | CC-BY | CC-BY-SA | CC-BY-NC | Público
  accessLevel: enum;      // public | private | restricted
  
  // Controle
  status: enum;           // draft | published | archived
  createdAt: timestamp;
  updatedAt: timestamp;
  createdBy: string;      // ID do usuário
  
  // Campos livres (JSON)
  customFields: json;    // Campos customizados
}
```

## 3.2 Entidade: ARTISTA (Person)

Representa qualquer pessoa envolvida no projeto.

```typescript
// Entidade: ARTISTA
{
  id: string;
  slug: string;
  
  // Identificação
  name: string;           // Nome real
  pseudonym: string;       // Nome artístico
  
  // Biografia (Paragraph)
  bio: text;              // Biografia completa
  bioShort: text;         // Resumo
  
  // Foto (Image)
  photo: string;           // URL da foto
  
  // Contato
  email: string;
  website: string;
  social: json;           // { twitter, instagram, facebook, etc }
  
  // Classificação
  roles: string[];        // ["músico", "designer", "artista", "produtor"]
  period: string;         // Período de atividade no projeto
  
  // Nascimento
  birthDate: date;
  birthPlace: string;
  
  // Conexões (Multiple)
  artworks: string[];     // IDs das obras
  events: string[];       // IDs dos eventos
  
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

## 3.3 Entidade: EVENTO

Representa qualquer evento (festival, exposição, performance, etc).

```typescript
// Entidade: EVENTO
{
  id: string;
  slug: string;
  name: string;           // Nome do evento
  
  // Descrição
  description: text;
  program: text;          // Programação completa
  
  // Datas (Date)
  dateStart: date;
  dateEnd: date;
  
  // Localização (Location com PostGIS)
  venue: string;          // Nome do espaço
  address: string;
  city: string;
  state: string;
  country: string;
  coordinates: point;     // { lat, lng }
  
  // Classificação (Choice)
  type: enum;             // festival | exposição | performance | workshop | lançamento | meetup
  
  // Mídia (URL)
  photos: string[];       // URLs das fotos
  videos: string[];       // URLs dos vídeos
  press: string[];        // Matérias de imprensa
  
  // Conexões
  artworks: string[];     // Obras apresentadas
  participants: string[]; // Artistas participantes
  
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

## 3.4 Entidade: ENTREVISTA

Armazena entrevistas com membros do coletivo.

```typescript
// Entidade: ENTREVISTA
{
  id: string;
  slug: string;
  title: string;
  
  // Entrevistado(s) (Multiple)
  interviewees: string[]; // IDs dos artistas
  
  // Dados da entrevista
  interviewer: string;
  date: date;
  location: string;
  
  // Mídia (Audio/Video)
  audioUrl: string;
  videoUrl: string;
  
  // Transcrição (Paragraph)
  transcript: text;
  transcriptStatus: enum; // pending | in-progress | done
  
  // Palavras-chave (Multiple)
  keywords: string[];
  
  // Resumo
  summary: text;
  
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

## 3.5 Entidade: ARQUIVO (File)

Gerencia os arquivos digitais relacionados às obras.

```typescript
// Entidade: ARQUIVO
{
  id: string;
  
  // Referência
  artworkId: string;
  type: enum;             // thumbnail | original | derivative | documentation | source
  
  // Arquivo
  url: string;           // URL no storage
  filename: string;      // Nome original
  mimeType: string;
  size: number;          // Bytes
  
  // Metadados de mídia
  width: number;
  height: number;
  duration: number;      // Segundos (se áudio/vídeo)
  bitrate: number;
  codec: string;
  
  // Controle
  checksum: string;      // SHA-256 para verificação
  
  uploadedAt: timestamp;
  uploadedBy: string;
}
```

## 3.6 Entidade: TAG

Sistema de tags/folksonomia.

```typescript
// Entidade: TAG
{
  id: string;
  name: string;
  slug: string;
  
  // Categoria (Choice)
  category: enum;         // theme | technique | location | period | project
  
  // Aparência
  color: string;         // Hex color
  
  // Relacionamento
  artworks: number;      // Contagem (denormalizado)
  
  createdAt: timestamp;
}
```

## 3.7 Entidade: RELAÇÃO

Liga obras entre si.

```typescript
// Entidade: RELAÇÃO
{
  id: string;
  
  // De -> Para
  artworkId: string;     // Obra de origem
  relatedId: string;     // Obra relacionada
  
  // Tipo (Choice)
  type: enum;            
  // inspired_by    → Inspirada em
  // remix_of       → Remix de
  // collab_with    → Colaboração com
  // reference_to   → Referência a
  // continuation_of → Continuação de
  // responds_to    → Responde a
  // part_of        → Parte de
  // derivative_of  → Derivada de
  
  // Descrição
  description: text;
  
  createdAt: timestamp;
}
```

---

# 4. CAMPOS DETALHADOS POR TIPO DE OBRA

## 4.1obra tipo: AUDIO (Música/Som)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CAMPOS PARA OBRAS DE ÁUDIO                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  OBRIGATÓRIOS:                                                     │
│  ├─ Title (text)                                                   │
│  └─ File (audio file)                                              │
│                                                                     │
│  CLASSIFICAÇÃO:                                                    │
│  ├─ Medium (choice): [faixa, álbum, DJ set, soundscape, sample]   │
│  ├─ Genre (multiple): [eletrônica, experimental, ambient, etc]    │
│  └─ Year (number)                                                  │
│                                                                     │
│  ÁUDIO:                                                            │
│  ├─ Duration (number): segundos                                    │
│  ├─ Bitrate (number): kbps                                        │
│  ├─ Sample Rate (number): Hz                                      │
│  ├─ Channels (choice): [mono, stereo, surround]                  │
│  ├─ Codec (choice): [mp3, ogg, wav, flac, aac]                    │
│  └─ Master File (file)                                            │
│                                                                     │
│  PRODUÇÃO:                                                         │
│  ├─ Artist (multiple)                                             │
│  ├─ Producer (text)                                                │
│  ├─ Engineer (text)                                                │
│  ├─ Studio (text)                                                  │
│  ├─ Label (text)                                                   │
│  └─ Release Date (date)                                           │
│                                                                     │
│  LICENCIAMENTO:                                                    │
│  ├─ License (choice): [LUCR, CC-BY, CC-BY-SA, etc]                │
│  └─ ISRC (text)                                                    │
│                                                                     │
│  LETRA/TEXTO:                                                      │
│  ├─ Lyrics (paragraph)                                            │
│  └─ Language (choice)                                              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 4.2 Obra tipo: VIDEO

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CAMPOS PARA OBRAS DE VÍDEO                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  OBRIGATÓRIOS:                                                     │
│  ├─ Title (text)                                                   │
│  └─ File (video file)                                              │
│                                                                     │
│  CLASSIFICAÇÃO:                                                    │
│  ├─ Medium (choice): [performance, clipe, documentario, etc]     │
│  ├─ Genre (multiple)                                              │
│  └─ Year (number)                                                  │
│                                                                     │
│  VÍDEO:                                                            │
│  ├─ Duration (number): minutos                                    │
│  ├─ Resolution (choice): [480p, 720p, 1080p, 4K, etc]            │
│  ├─ Frame Rate (number): fps                                      │
│  ├─ Codec (choice): [h264, h265, vp9, prores]                     │
│  ├─ Bitrate (number): Mbps                                        │
│  ├─ Aspect Ratio (choice): [16:9, 4:3, 1:1]                      │
│  └─ Color Space (choice): [sRGB, Rec.709, P3]                     │
│                                                                     │
│  ÁUDIO:                                                            │
│  ├─ Audio Codec (choice)                                           │
│  ├─ Audio Channels (choice)                                        │
│  └─ Audio Bitrate (number)                                         │
│                                                                     │
│  PRODUÇÃO:                                                         │
│  ├─ Director (text)                                                │
│  ├─ Producer (text)                                                │
│  ├─ Writer (text)                                                  │
│  ├─ Cinematographer (text)                                         │
│  ├─ Editor (text)                                                  │
│  ├─ Cast (table): [papel, ator]                                   │
│  ├─ Crew (table): [função, nome]                                  │
│  ├─ Production Company (text)                                      │
│  ├─ Location (text)                                                │
│  └─ Shoot Date (date)                                              │
│                                                                     │
│  EXIBIÇÃO:                                                         │
│  ├─ Premiere Date (date)                                          │
│  ├─ Festival (text)                                                │
│  └─ Distribution (text)                                            │
│                                                                     │
│  LEGENDAS:                                                         │
│  ├─ Subtitles (file)                                               │
│  ├─ Audio Description (file)                                       │
│  └─ Closed Captions (file)                                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 4.3 Obra tipo: IMAGE (Imagem)

```
┌─────────────────────────────────────────────────────────────────────┐
│                   CAMPOS PARA OBRAS DE IMAGEM                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  OBRIGATÓRIOS:                                                     │
│  ├─ Title (text)                                                   │
│  └─ File (image file)                                              │
│                                                                     │
│  CLASSIFICAÇÃO:                                                    │
│  ├─ Medium (choice): [fotografia, ilustração, print, etc]         │
│  ├─ Genre (multiple)                                              │
│  └─ Year (number)                                                  │
│                                                                     │
│  IMAGEM:                                                           │
│  ├─ Width (number): pixels                                         │
│  ├─ Height (number): pixels                                        │
│  ├─ Resolution (number): DPI                                       │
│  ├─ Color Mode (choice): [RGB, CMYK, Grayscale]                   │
│  ├─ Bit Depth (number): bits                                       │
│  ├─ Format (choice): [JPEG, PNG, TIFF, PDF, SVG]                  │
│  └─ File Size (number): MB                                         │
│                                                                     │
│  ORIGINAL:                                                         │
│  ├─ Creation Date (date)                                          │
│  ├─ Camera (text)                                                  │
│  ├─ Lens (text)                                                    │
│  ├─ Aperture (text)                                                │
│  ├─ Shutter Speed (text)                                           │
│  ├─ ISO (number)                                                   │
│  └─ Copyright (text)                                                │
│                                                                     │
│  IMPRESSÃO (se aplicável):                                         │
│  ├─ Print Width (number): cm                                       │
│  ├─ Print Height (number): cm                                      │
│  ├─ Edition (text): [1/10, 2/10, etc]                             │
│  └─ Printer (text)                                                 │
│                                                                     │
│  EXIBIÇÃO:                                                         │
│  ├─ Exhibitions (multiple): eventos onde foi exposta              │
│  └─ Publications (multiple): onde foi publicada                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 4.4 Obra tipo: TEXT (Texto)

```
┌─────────────────────────────────────────────────────────────────────┐
│                   CAMPOS PARA OBRAS DE TEXTO                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  OBRIGATÓRIOS:                                                     │
│  ├─ Title (text)                                                   │
│  └─ Content (paragraph/file)                                       │
│                                                                     │
│  CLASSIFICAÇÃO:                                                    │
│  ├─ Medium (choice): [artigo, ensaio, poema, manifesto, etc]      │
│  ├─ Genre (multiple)                                              │
│  └─ Year (number)                                                  │
│                                                                     │
│  PUBLICAÇÃO:                                                       │
│  ├─ Author (multiple)                                             │
│  ├─ Publication (text): onde foi publicado                         │
│  ├─ Publication Date (date)                                        │
│  ├─ Volume (text)                                                  │
│  ├─ Issue (text)                                                   │
│  ├─ Pages (text)                                                  │
│  ├─ ISSN/ISBN (text)                                               │
│  └─ DOI (url)                                                       │
│                                                                     │
│  CONTEÚDO:                                                         │
│  ├─ Abstract (paragraph)                                           │
│  ├─ Language (choice)                                              │
│  ├─ Word Count (number)                                            │
│  └─ File (file): PDF original                                      │
│                                                                     │
│  ACADÊMICO (se aplicável):                                         │
│  ├─ Institution (text)                                              │
│  ├─ Degree (choice)                                                │
│  ├─ Advisor (text)                                                 │
│  └─ Defense Date (date)                                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 4.5 Obra tipo: INSTALLATION (Instalação)

```
┌─────────────────────────────────────────────────────────────────────┐
│               CAMPOS PARA OBRAS DE INSTALAÇÃO                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  OBRIGATÓRIOS:                                                     │
│  └─ Title (text)                                                   │
│                                                                     │
│  CLASSIFICAÇÃO:                                                    │
│  ├─ Medium (choice): [interativa, imersiva, imutável]            │
│  ├─ Genre (multiple)                                              │
│  └─ Year (number)                                                  │
│                                                                     │
│  ESPECIFICAÇÕES:                                                    │
│  ├─ Dimensions (text): (LxAxP)                                     │
│  ├─ Weight (text): kg                                              │
│  ├─ Duration (text): duração da experiência                        │
│  ├─ Components (table): [item, quantidade, especificação]         │
│  ├─ Software Required (text)                                       │
│  ├─ Hardware Required (text)                                       │
│  └─ Power Required (text)                                          │
│                                                                     │
│  INTERATIVIDADE:                                                   │
│  ├─ Interaction Type (choice): [toque, movimento, som, etc]       │
│  ├─ Sensors (multiple): [câmera, microfone, kinect, etc]          │
│  ├─ Outputs (multiple): [projetor, alto-falante, tela]            │
│  └─ Users Capacity (number)                                        │
│                                                                     │
│  MONTAGEM:                                                         │
│  ├─ Setup Time (number): horas                                    │
│  ├─ Technical Requirements (text)                                  │
│  └─ Insurance Value (number)                                       │
│                                                                     │
│  EXIBIÇÃO:                                                         │
│  ├─ Exhibitions (multiple): eventos                               │
│  └─ Requirements (text): requisitos do espaço                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 4.6 Obra tipo: PERFORMANCE

```
┌─────────────────────────────────────────────────────────────────────┐
│               CAMPOS PARA OBRAS DE PERFORMANCE                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  OBRIGATÓRIOS:                                                     │
│  └─ Title (text)                                                   │
│                                                                     │
│  CLASSIFICAÇÃO:                                                    │
│  ├─ Medium (choice): [ao vivo, telepresença, site-specific]       │
│  ├─ Genre (multiple)                                              │
│  └─ Year (number)                                                  │
│                                                                     │
│  DETALHES:                                                         │
│  ├─ Duration (number): minutos                                     │
│  ├─ Duration Notes (text): variações de duração                    │
│  ├─ Iteration (text): se foi repetida/múltiplas sessões           │
│  └─ Notes (paragraph)                                              │
│                                                                     │
│  EQUIPE:                                                           │
│  ├─ Performers (multiple): artistas                                │
│  ├─ Director (text)                                                │
│  ├─ Choreographer (text)                                           │
│  ├─ Composer (text)                                                │
│  ├─ Tech Director (text)                                          │
│  └─ Stage Manager (text)                                           │
│                                                                     │
│  EXECUÇÃO:                                                         │
│  ├─ Event (text): onde ocorreu                                     │
│  ├─ Date (date)                                                    │
│  ├─ Venue (text)                                                   │
│  ├─ City (text)                                                    │
│  └─ Audience Capacity (number)                                     │
│                                                                     │
│  REGISTRO:                                                         │
│  ├─ Video Recording (file)                                         │
│  ├─ Audio Recording (file)                                         │
│  ├─ Photos (multiple)                                             │
│  └─ Documentation (file): programa, texto, etc                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 5. FLUXOS DO SISTEMA

## 5.1 Fluxo: Cadastro de Nova Obra

```
┌─────────────────────────────────────────────────────────────────────┐
│                  FLUXO: CADASTRO DE NOVA OBRA                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────┐     ┌─────────────┐     ┌─────────────┐               │
│  │ INÍCIO  │────►│ SELECIONAR  │────►│  PREENCHER  │               │
│  └─────────┘     │    TIPO     │     │   CAMPOS    │               │
│                  └─────────────┘     └──────┬──────┘               │
│                                              │                      │
│                                              ▼                      │
│                  ┌─────────────┐     ┌─────────────┐               │
│                  │   UPLOAD    │◄────│   VALIDAR   │               │
│                  │   ARQUIVO   │     │   CAMPOS    │               │
│                  └──────┬──────┘     └──────┬──────┘               │
│                         │                    │                      │
│                         ▼                    │                      │
│                  ┌─────────────┐             │                      │
│                  │  GERAR     │◄─────────────┘                      │
│                  │  THUMBNAIL │                                    │
│                  └──────┬──────┘                                    │
│                         │                                           │
│                         ▼                                           │
│                  ┌─────────────┐                                    │
│                  │  SALVAR     │                                    │
│                  │   RASCUNHO  │                                    │
│                  └──────┬──────┘                                    │
│                         │                                           │
│                         ▼                                           │
│                  ┌─────────────┐     ┌─────────────┐               │
│                  │  REVISAR    │────►│  PUBLICAR   │────► FIM       │
│                  │   OBRA      │     │   OBRA      │               │
│                  └─────────────┘     └─────────────┘               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.1.1 Passo a Passo

1. **Selecionar Tipo**: Usuário escolhe tipo de obra (áudio, vídeo, imagem, etc)
2. **Campos Base**: Preenche título, descrição, ano
3. **Upload**: Arrasta arquivo ou seleciona do computador
4. **Geração Automática**:
   - Thumbnail é gerada automaticamente
   - Metadata é extraída (duração, resolução, etc)
5. **Classificação**: Adiciona tags, seleciona gênero
6. **Vincular**: Associa artistas, eventos
7. **Licenciamento**: Define licença
8. **Revisão**:.Revisa todos os dados
9. **Publicação**: Torna pública ou mantém como rascunho

## 5.2 Fluxo: Importação em Lote

```
┌─────────────────────────────────────────────────────────────────────┐
│                  FLUXO: IMPORTAÇÃO EM LOTE                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────┐                                                       │
│  │  ESCOLHA │                                                       │
│  │ FORMATO  │                                                       │
│  └────┬────┘                                                       │
│       │                                                            │
│  ┌────▼────────┬──────────┬─────────────┐                        │
│  │             │          │             │                        │
│  ▼             ▼          ▼             ▼                         │
│ ┌──────┐  ┌───────┐  ┌──────────┐  ┌──────────┐                   │
│ │CSV   │  │BibTeX │  │  Folder  │  │  ZIP     │                   │
│ │      │  │       │  │ (files) │  │(multi)   │                   │
│ └──────┘  └───────┘  └──────────┘  └──────────┘                   │
│       │         │          │            │                         │
│       └─────────┴──────────┴────────────┘                         │
│                     │                                               │
│                     ▼                                               │
│              ┌──────────────┐                                       │
│              │ MAPEAMENTO   │                                       │
│              │   CAMPOS     │                                       │
│              └──────┬───────┘                                       │
│                     │                                               │
│                     ▼                                               │
│              ┌──────────────┐                                       │
│              │   IMPORTAR   │                                       │
│              │    (batch)   │                                       │
│              └──────┬───────┘                                       │
│                     │                                               │
│                     ▼                                               │
│              ┌──────────────┐                                       │
│              │   RELATÓRIO  │                                       │
│              │  (sucesso/   │                                       │
│              │   erros)     │                                       │
│              └──────────────┘                                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Formatos Suportados

| Formato | Descrição | Uso Principal |
|---------|-----------|---------------|
| CSV | Planilha com colunas | Importação em massa |
| BibTeX | Formato bibliográfico | Importar referências |
| Folder | Pasta com arquivos | Ler metadados dos arquivos |
| ZIP | Arquivo compactado | Múltiplos arquivos |
| JSON | Formato JSON | Integração via API |
| XML | Formato XML | Migração de outros sistemas |

## 5.3 Fluxo: Busca e Filtragem

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FLUXO: BUSCA E FILTRAGEM                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────────────────────────────────────┐                   │
│  │              INTERFACE DE BUSCA             │                   │
│  │  ┌──────────────────────────────────────┐  │                   │
│  │  │  🔍 Busca por texto (title/desc)     │  │                   │
│  │  └──────────────────────────────────────┘  │                   │
│  └────────────────────┬───────────────────────┘                   │
│                       │                                            │
│  ════════════════════╪═══════════════════════════════════════    │
│                       ▼                                            │
│  ┌────────────────────────────────────────────┐                   │
│  │              FILTROS (FACETED)              │                   │
│  ├────────────────────────────────────────────┤                   │
│  │  Tipo:  [ ] [ ] [ ] [ ]                    │                   │
│  │  Ano:   [2024]─────[2001]                  │                   │
│  │  Tag:   [ ] [ ] [ ] [+12]                  │                   │
│  │  Artista: [busca...]                       │                   │
│  │  Evento: [busca...]                        │                   │
│  │  Licença: [ ] [ ] [ ]                      │                   │
│  └────────────────────┬───────────────────────┘                   │
│                       │                                            │
│                       ▼                                            │
│  ┌────────────────────────────────────────────┐                   │
│  │              RESULTADOS                    │                   │
│  ├────────────────────────────────────────────┤                   │
│  │  Encontradas: 127 obras                   │                   │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐         │                   │
│  │  │     │ │     │ │     │ │     │  ...    │                   │
│  │  │ ⚡  │ │ ♪  │ │ 🖼️  │ │ 📄  │         │                   │
│  │  └─────┘ └─────┘ └─────┘ └─────┘         │                   │
│  │  Ordenar por: [Relevância] [Data] [A-Z] │                   │
│  └────────────────────────────────────────────┘                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 6. INTERFACE DE CADASTRO

## 6.1 Tela: Novo Cadastro

```
┌─────────────────────────────────────────────────────────────────────┐
│  NOVO CADASTRO                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  1. TIPO DE OBRA                                            │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  │   │
│  │  │  🎵    │ │  🎬    │ │  🖼️    │ │  📄    │ │  🔧    │  │   │
│  │  │ Áudio  │ │ Vídeo  │ │ Imagem │ │ Texto  │ │Instala.│  │   │
│  │  │        │ │        │ │        │ │        │ │        │  │   │
│  │  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘  │   │
│  │                   ┌────────┐ ┌────────┐                   │   │
│  │                   │  🎭    │ │  🌐    │                   │   │
│  │                   │Perform.│ │Website │                   │   │
│  │                   │        │ │        │                   │   │
│  │                   └────────┘ └────────┘                   │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  2. INFORMAÇÕES BÁSICAS                                     │   │
│  │  ┌─────────────────────────┐  ┌─────────────────────────┐   │   │
│  │  │ Título *               │  │ Ano *                   │   │   │
│  │  │                         │  │                         │   │   │
│  │  │                         │  │ [2024 ▼]                │   │   │
│  │  └─────────────────────────┘  └─────────────────────────┘   │   │
│  │                                                         │   │
│  │  ┌─────────────────────────────────────────────────────┐   │   │
│  │  │ Descrição                                          │   │   │
│  │  │                                                     │   │   │
│  │  │                                                     │   │   │
│  │  └─────────────────────────────────────────────────────┘   │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  3. ARQUIVO                                                 │   │
│  │  ┌─────────────────────────────────────────────────────┐   │   │
│  │  │                                                    │   │   │
│  │  │         ┌──────────────────────────┐              │   │   │
│  │  │         │    ARQUIVE OU ARRASTE    │              │   │   │
│  │  │         │                          │              │   │   │
│  │  │         │    📁 Selecionar arquivo │              │   │   │
│  │  │         │                          │              │   │   │
│  │  │         └──────────────────────────┘              │   │   │
│  │  │                                                    │   │   │
│  │  │  Formatos: MP3, WAV, FLAC, MP4, MOV, JPG, PNG... │   │   │
│  │  └─────────────────────────────────────────────────────┘   │   │
│  │                                                         │   │
│  │  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐   │   │
│  │  │  Duration:    │  │  Resolution: │  │  Codec:      │   │   │
│  │  │  03:45         │  │  1920x1080   │  │  h264        │   │   │
│  │  │  (automático)  │  │  (automático)│  │  (automático)│   │   │
│  │  └───────────────┘ └───────────────┘ └───────────────┘   │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  4. CLASSIFICAÇÃO                                           │   │
│  │  ┌─────────────────────────┐  ┌─────────────────────────┐   │   │
│  │  │ Medium                  │  │ Gênero                  │   │   │
│  │  │ [Selecione ▼]           │  │ [+ Adicionar]           │   │   │
│  │  └─────────────────────────┘  └─────────────────────────┘   │   │
│  │                                                         │   │
│  │  Tags:  [remix] [glitch] [+ adicionar]                   │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  5. VÍNCULOS                                                │   │
│  │  Artistas: [+ Adicionar]                                   │   │
│  │  ┌─────────────────────────────────────────────────────┐   │   │
│  │  │ 👤 H.D. Mabuse    [criador ▼]        [x]          │   │   │
│  │  │ 👤 Haidée Lima   [colaborador ▼]     [x]          │   │   │
│  │  └─────────────────────────────────────────────────────┘   │   │
│  │                                                         │   │
│  │  Eventos: [+ Adicionar]                                  │   │
│  │  ┌─────────────────────────────────────────────────────┐   │   │
│  │  │ 🎪 Abril Pro Rock 2002            [x]              │   │   │
│  │  └─────────────────────────────────────────────────────┘   │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  6. LICENCIAMENTO                                           │   │
│  │  ┌─────────────────────────┐  ┌─────────────────────────┐   │   │
│  │  │ Licença *               │  │ Acesso                  │   │   │
│  │  │ [LUCR ▼]                │  │ [Público ▼]             │   │   │
│  │  └─────────────────────────┘  └─────────────────────────┘   │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                          [Salvar Rascunho]  [Publicar]     │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 6.2 Tela: Listagem/Gerenciamento

```
┌─────────────────────────────────────────────────────────────────────┐
│  GERENCIAR ACERVO                              [+ Nova Obra]       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 🔍 Buscar...                              [▼Tipo] [▼Status]  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Selecionadas: 3     [Ações: ▼]                              │   │
│  │ ┌─────────────────────────────────────────────────────────┐  │   │
│  │ │ ☑ │ thumbnail │ Título        │ Tipo  │ Ano │ Status │  │   │
│  │ │───┼───────────┼───────────────┼───────┼─────┼────────│  │   │
│  │ │ ☑ │ 🖼️       │ Call for Noise│ Perf. │ 2002│ ✅    │  │   │
│  │ │ ☑ │ 🎵       │ Rádio Re:combo│ Audio │ 2004│ ✅    │  │   │
│  │ │ ☑ │ 🖼️       │ Constelações │ Img.  │ 2004│ ✅    │  │   │
│  │ │ ☐ │ 🖼️       │ Mundo Pequeno│ Inst. │ 2006│ 📝   │  │   │
│  │ │ ☐ │ 🎬       │ Transloc Mix │ Audio │ 2003│ ✅    │  │   │
│  │ └─────────────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  Showing 1-5 of 127    [<] 1 2 3... 25 [>]                        │
│                                                                     │
│  AÇÕES EM LOTE:                                                     │
│  ├─ Alterar Tags                                                   │
│  ├─ Alterar Licença                                                │
│  ├─ Alterar Status                                                 │
│  ├─ Exportar (CSV, BibTeX)                                        │
│  └─ Excluir                                                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 6.3 Tela: Detalhe/Edição

```
┌─────────────────────────────────────────────────────────────────────┐
│  EDITAR: Call for Noise                          [Ver] [Duplicar]  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │ [Geral] [Arquivo] [Classificação] [Vínculos] [Licença]    │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                     │
│  ┌────────────────────────────┬──────────────────────────────┐   │
│  │  TÍTULO                   │  SLUG                          │   │
│  │  Call for Noise          │  call-for-noise                │   │
│  └────────────────────────────┴──────────────────────────────┘   │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  DESCRIÇÃO                                                │   │
│  │  Performance de 6 horas durante o Abril Pro Rock em...   │   │
│  │                                                            │   │
│  │  [Rich text editor]                                       │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌────────────────────────────┬──────────────────────────────┐   │
│  │  ARQUIVO ATUAL             │  METADADOS                     │   │
│  │  ┌──────────────────┐     │  Duration: 360 min           │   │
│  │  │                  │     │  Resolution: -                │   │
│  │  │   [ thumbnail ]  │     │  Codec: -                     │   │
│  │  │                  │     │  Size: 2.4 GB                  │   │
│  │  │   [Alterar]      │     │  Created: 2002-04             │   │
│  │  └──────────────────┘     │                                │   │
│  │                            │  [Baixar Original]            │   │
│  └────────────────────────────┴──────────────────────────────┘   │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  ARQUIVOS ADICIONAIS                                      │   │
│  │  ┌──────────────────────────────────────────────────────┐  │   │
│  │  │ 📄 Registro_em_video.mp4  (1.2 GB)       [Baixar]   │  │   │
│  │  │ 📄 Trilha_sonora.mp3     (45 MB)         [Baixar]   │  │   │
│  │  │ 📄 Fotografias.zip       (230 MB)        [Baixar]   │  │   │
│  │  │                          [+ Adicionar arquivo]       │  │   │
│  │  └──────────────────────────────────────────────────────┘  │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                         [Cancelar]  [Salvar]              │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 7. VALIDAÇÕES E REGRAS

## 7.1 Regras de Validação

| Campo | Regra | Mensagem |
|-------|-------|----------|
| title | Obrigatório, min 2 chars | "Título é obrigatório" |
| year | Entre 1900 e ano atual | "Ano inválido" |
| file | Obrigatório para novos cadastros | "Arquivo é obrigatório" |
| slug | Único no banco, URL-safe | "Este slug já existe" |
| license | Obrigatório se status = published | "Defina a licença para publicar" |
| artist | Pelo menos 1 se status = published | "Adicione pelo menos um artista" |

## 7.2 Extrações Automáticas

| Tipo | Extração |
|------|----------|
| Audio | Duration, bitrate, sample rate, channels, codec |
| Video | Duration, resolution, frame rate, codec, aspect ratio |
| Image | Width, height, color mode, bit depth, format |
| All | Checksum SHA-256 |

## 7.3 Campos Obrigatórios por Status

| Status | Obrigatório |
|--------|-------------|
| **draft** | title, type |
| **published** | title, type, license, at least 1 artist, file (se aplicável) |

---

# 8. API E ENDPOINTS

## 8.1 Endpoints Principais

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/artworks` | Listar obras (paginado) |
| GET | `/api/artworks/[id]` | Detalhar obra |
| POST | `/api/artworks` | Criar obra |
| PUT | `/api/artworks/[id]` | Atualizar obra |
| DELETE | `/api/artworks/[id]` | Deletar obra |
| POST | `/api/artworks/import` | Importar lote |
| GET | `/api/artworks/export/[format]` | Exportar |
| GET | `/api/artists` | Listar artistas |
| POST | `/api/artists` | Criar artista |
| GET | `/api/events` | Listar eventos |
| GET | `/api/search` | Busca geral |

## 8.2 Schema de Resposta

```json
// GET /api/artworks
{
  "data": [
    {
      "id": "abc123",
      "title": "Call for Noise",
      "slug": "call-for-noise",
      "type": "performance",
      "year": 2002,
      "thumbnail": "https://...",
      "artists": [
        { "name": "H.D. Mabuse", "role": "criador" }
      ],
      "tags": ["performance", "net.art"],
      "license": "LUCR",
      "status": "published"
    }
  ],
  "pagination": {
    "page": 1,
    "perPage": 20,
    "total": 127,
    "pages": 7
  }
}
```

---

# 9. PERMISSÕES E PAPÉIS

| Papel | Permissões |
|-------|------------|
| **Admin** | CRUD completo, gerenciar usuários, configurações |
| **Editor** | CRUD de obras, importação, exportação |
| **Viewer** | Apenas visualização, downloads |
| **Guest** | Visualização pública (se publicado) |

---

# 10. RELATÓRIOS E EXPORTAÇÃO

## 10.1 Relatórios Disponíveis

| Relatório | Descrição |
|-----------|-----------|
| Acervo por tipo | Quantidade por tipo de mídia |
| Acervo por ano | Distribuição temporal |
| Artistas mais活跃 | Obras por artista |
| Tags mais usadas | Top tags |
| Licenças | Distribuição de licenciamento |
| Arquivos grandes | Por tamanho |

## 10.2 Formatos de Exportação

| Formato | Uso |
|---------|-----|
| CSV | Planilhas, backup |
| BibTeX | Referências acadêmicas |
| JSON | Integração, backup |
| XML | Migração |
| MARC | Bibliotecas |

---

*Especificação baseada no Tellico KDE e adaptada para aplicação web do projeto RE:COMBO*