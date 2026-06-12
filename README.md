# Re:combo Web

Sistema de gerenciamento e apresentacao do acervo digital do coletivo Re:combo,
grupo pioneiro de producao artistica baseada em internet (2001-2008, Recife-PE).

**Versao:** 1.0.0  
**Alvo:** https://recombo.art.br  
**Financiamento:** FUNCULTURA Geral 2024/2025  
**Licenca:** LUCR + Creative Commons  
**Equipe:** Proponente: Beatriz Arcoverde de Oliveira; Coordenador: Jose Carlos Porto Arcoverde Junior (H.D. Mabuse)

---

## Descricao

O Re:combo Web e um sistema full-stack que funciona como arquivo digital publico
do coletivo Re:combo. A aplicacao oferece duas faces:

- **Frontend publico:** exibicao do acervo com navegacao por tipo, ano e tags;
  linha do tempo interativa; pagina de detalhe da obra com player multimidia;
  pagina institucional Sobre.
- **Painel administrativo:** sistema CRUD completo para gerenciamento de obras,
  artistas, eventos, entrevistas e tags; suporte a importacao em lote via CSV;
  upload de arquivos com geracao automatica de thumbnails; controle de acesso
  baseado em papeis (admin, editor, viewer).

O acervo abrange 8 tipos de obra (audio, video, imagem, texto, instalacao,
performance, website, software) com metadados especificos por tipo, totalizando
mais de 500 obras de 30+ artistas no periodo 2001-2008.

---

## Tecnologias

| Categoria                | Tecnologia                                   |
| ------------------------ | -------------------------------------------- |
| Framework                | Next.js 14.1 (App Router)                    |
| Linguagem                | TypeScript 5.3                               |
| UI                       | React 18 + Tailwind CSS 3 + Framer Motion 11 |
| ORM                      | Prisma 5.10                                  |
| Banco de Dados           | PostgreSQL (Supabase)                        |
| Autenticacao             | NextAuth.js v5 (Credentials + bcrypt)        |
| Validacao                | Zod 3.22                                     |
| Processamento de Imagens | Sharp 0.33                                   |
| Armazenamento            | Supabase Storage                             |
| Testes                   | Vitest + Playwright                          |
| Design System            | Storybook 10                                 |
| Utilitarios              | Lucide React, date-fns, clsx, tailwind-merge |

---

## Funcionalidades

### Frontend Publico

- Pagina inicial com estatisticas do acervo (500+ obras, 30+ artistas)
- Arquivo navegavel e filtrável (`/arquivo`) por tipo, ano, tag e texto
- Pagina de detalhe da obra (`/obra/[slug]`) com player multimidia por tipo
- Linha do tempo interativa (`/timeline`)
- Pagina institucional (`/sobre`)

### Painel Administrativo (`/admin/*`)

- Dashboard com metricas do acervo
- CRUD completo de obras, artistas, eventos, entrevistas
- Sistema de tags com folksonomia e categorias
- Campos customizados por tipo de obra
- Importacao em lote via CSV
- Upload de arquivos (limite de 500 MB) com thumbnails automaticos
- Controle de acesso baseado em papeis (admin, editor, viewer)

### Design System

- Paleta zinc neutral + amber accent
- Tipografia Inter (sans-serif) + JetBrains Mono (monospace)
- Modo escuro

---

## Arquitetura

A aplicacao segue o padrao Next.js App Router com estrutura de pastas organizada
por funcionalidade:

```
recombo-web/
  prisma/
    schema.prisma          # Modelo de dados (7 entidades principais)
  src/
    app/
      api/                 # API routes (Next.js Route Handlers)
      admin/               # Paginas do painel administrativo
      arquivo/             # Pagina publica do acervo
      obra/[slug]/         # Detalhe da obra
      timeline/            # Linha do tempo
      sobre/               # Pagina institucional
    components/
      admin/               # Componentes do painel
        forms/             # Formularios CRUD
      layout/              # Header, Footer, navegacao
    lib/                   # Utilitarios (Prisma client, helpers, auth)
```

### Modelo de Dados (Prisma)

| Entidade        | Descricao                                          |
| --------------- | -------------------------------------------------- |
| Artwork         | Obra do acervo (8 tipos com metadados especificos) |
| Artist          | Artista ou membro do coletivo                      |
| Event           | Evento (festival, exposicao)                       |
| Interview       | Entrevista                                         |
| ArtworkFile     | Arquivo digital com hash SHA-256                   |
| ArtworkRelation | Relacao entre obras                                |
| Tag             | Tag com folksonomia e categoria                    |
| User            | Usuario do sistema (admin, editor, viewer)         |
| FieldDefinition | Definicao de campos customizados por tipo          |

---

## Instalacao Local

### Pre-requisitos

- Node.js 18+
- PostgreSQL (local ou Supabase)
- npm

### Passos

```bash
# Clonar e acessar o diretorio
git clone <url-do-repositorio> recombo-web
cd recombo-web

# Instalar dependencias
npm install

# Configurar variaveis de ambiente
cp .env.example .env.local
# Edite .env.local com sua string de conexao PostgreSQL/Supabase

# Gerar cliente Prisma e sincronizar banco
npx prisma generate
npx prisma db push

# Iniciar servidor de desenvolvimento
npm run dev
```

Acessar em http://localhost:3005 (admin: http://localhost:3005/admin/artworks).

### Comandos uteis

| Comando                  | Descricao                                |
| ------------------------ | ---------------------------------------- |
| `npm run dev`            | Servidor de desenvolvimento (porta 3005) |
| `npm run build`          | Build de producao                        |
| `npm run start`          | Servidor de producao (porta 3005)        |
| `npm test`               | Executar testes (Vitest)                 |
| `npm run lint`           | Lint com ESLint                          |
| `npm run storybook`      | Storybook (porta 6006)                   |
| `npx prisma studio`      | Interface visual do banco                |
| `npx prisma migrate dev` | Criar nova migration                     |
| `npx prisma db push`     | Sincronizar schema com banco             |

---

## Instalacao em Droplet (Ubuntu 22.04+) com Docker

Acesse o servidor:

```bash
ssh root@143.198.177.192
```

### Opcao 1: Docker Compose (recomendado)

```bash
# Instalar Docker e Docker Compose
apt update && apt install -y docker.io docker-compose-v2

# Clonar o repositorio
git clone <url-do-repositorio> /opt/recombo-web
cd /opt/recombo-web

# Configurar ambiente
cp .env.example .env.local
nano .env.local  # editar DATABASE_URL e demais variaveis

# Build e execucao com Docker Compose
docker compose up -d --build
```

### Opcao 2: Sem container

```bash
# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Instalar dependencias
cd /opt/recombo-web
npm install

# Gerar cliente Prisma
npx prisma generate
npx prisma db push

# Build de producao
npm run build

# Iniciar com PM2
npm install -g pm2
pm2 start npm --name recombo-web -- start

# Configurar Nginx como proxy reverso
cat > /etc/nginx/sites-available/recombo-web << 'EOF'
server {
    listen 80;
    server_name recombo.art.br;

    location / {
        proxy_pass http://localhost:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /_next/ {
        proxy_pass http://localhost:3005;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

ln -s /etc/nginx/sites-available/recombo-web /etc/nginx/sites-enabled/
systemctl restart nginx
```

---

## Status do Projeto

Em desenvolvimento ativo.

---

## Estrutura de Oficina (3-4 horas)

### Modulo 1: Visao geral do acervo Re:combo (45 min)

- Historia do coletivo Re:combo (2001-2008)
- Apresentacao do sistema: frontend publico vs admin
- Navegacao pelo acervo, timeline e pagina Sobre

### Modulo 2: Cadastro de obras no painel admin (60 min)

- Login e controle de acesso por papel
- Criacao de obra: selecao de tipo e metadados especificos
- Upload de arquivos e geracao de thumbnails
- Sistema de tags e folksonomia

### Modulo 3: Gerenciamento do acervo (60 min)

- Edicao e exclusao de obras
- Importacao em lote via CSV
- Gerenciamento de artistas, eventos e entrevistas
- Relacoes entre obras

### Modulo 4: Customizacao e deploy (45 min)

- Configuracao de ambiente e variaveis
- Banco de dados PostgreSQL / Supabase
- Deploy com Docker Compose
- Proxy reverso com Nginx e SSL
