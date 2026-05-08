# Guia de Inicialização do Projeto RE:COMBO

## Pré-requisitos

- Node.js 18+
- PostgreSQL (local ou Supabase)
- npm ou yarn

---

## Passo 1: Clonar/Preparar o projeto

```bash
cd recombo-web
```

---

## Passo 2: Instalar dependências

```bash
npm install
```

---

## Passo 3: Configurar variáveis de ambiente

```bash
# Copiar o arquivo de exemplo
cp .env.example .env.local

# Editar com suas configurações
nano .env.local
```

### Opção A: PostgreSQL Local

```env
DATABASE_URL="postgresql://seu_user:sua_senha@localhost:5432/recombo"
```

### Opção B: Supabase (Recomendado)

1. Criar projeto em https://supabase.com
2. Copiar a string de conexão (Settings > Database)
3. Colar no .env.local:

```env
DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"
```

---

## Passo 4: Gerar cliente Prisma

```bash
npx prisma generate
```

---

## Passo 5: Criar/atualizar banco de dados

```bash
# Cria as tabelas (sem dados)
npx prisma db push

# OU: cria migration e aplica
npx prisma migrate dev --name init
```

---

## Passo 6: Executar o projeto

```bash
npm run dev
```

---

## Passo 7: Acessar o projeto

- **Frontend:** http://localhost:3000
- **Admin:** http://localhost:3000/admin/artworks
- **Nova Obra:** http://localhost:3000/admin/artworks/new

---

## Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Iniciar servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Iniciar servidor de produção |
| `npx prisma studio` | Abrir interface visual do banco |
| `npx prisma migrate dev` | Criar nova migration |
| `npx prisma db push` | Sincronizar schema com banco |

---

## Estrutura de Pastas

```
recombo-web/
├── prisma/
│   └── schema.prisma      # Schema do banco
├── src/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── admin/        # Páginas admin
│   │   └── (public)/     # Páginas públicas
│   ├── components/
│   │   └── admin/        # Componentes admin
│   └── lib/              # Utilitários
├── .env.example          # Exemplo de variáveis
├── package.json
└── README.md
```

---

## Solução de Problemas

### Erro de conexão com banco

```
Error: P1001: Can't reach database server
```

**Solução:** Verifique se o PostgreSQL está rodando e se a URL está correta.

### Erro de autenticação Supabase

```
Error: Invalid JWT token
```

**Solução:** Regenerar as chaves em Supabase > Settings > API

### Primeira vez usando Prisma

```bash
# Reset completo do banco
npx prisma migrate reset

# Visualizar dados
npx prisma studio
```

---

## Próximos Passos (após inicialização)

1. ✅ Acessar admin
2. ➡️ Criar primeira obra via interface
3. ➡️ Configurar upload de arquivos (necessita Supabase Storage)
4. ➡️ Adicionar usuários e permissões
5. ➡️ Configurar deploy (Vercel)