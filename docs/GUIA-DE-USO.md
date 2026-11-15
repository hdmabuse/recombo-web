# Guia de uso — recombo.com.br

Site público do arquivo do coletivo + admin de curadoria. Este guia cobre o uso
do dia a dia: navegar, cadastrar, curar capturas e publicar.

---

## 1. Estado atual do site (leia antes de tudo)

| O que                   | Situação em 14/11/2026                                                      |
| ----------------------- | --------------------------------------------------------------------------- |
| Páginas públicas        | `/`, `/arquivo`, `/obra/<slug>`, `/arquivo/capturas`, `/timeline`, `/sobre` |
| Menu com link quebrado  | `/rede`, `/mapa` e `/comunidade` aparecem no menu mas dão **404**           |
| Link quebrado na obra   | `/artista/<slug>` ainda **não existe** (404)                                |
| Acervo (obras)          | **vazio** — `/api/arquivo` retorna 0                                        |
| Capturas                | **39 sincronizadas**, 0 publicadas (curadoria pendente)                     |
| ArchiveBox fora de casa | `https://arquivo.mabuse.art.br` (Basic Auth + login do ArchiveBox)          |
| Admin                   | `/admin/login` (usuário vem do banco, não de variável de ambiente)          |

Ou seja: o site está no ar, mas o conteúdo ainda precisa ser cadastrado.

---

## 2. Visitante — o que dá para fazer hoje

**Home (`/`)** — apresentação do projeto, atalhos para o acervo e tags em destaque.

**Acervo (`/arquivo`)**

- busca por texto; filtros por tipo (`?type=audio|video|image|text|installation|performance|website|software`),
  por ano (`?year=2002`) e por tag (`?tag=net.art`)
- cada card abre `/obra/<slug>`
- sem obras cadastradas, a lista aparece vazia

**Obra (`/obra/<slug>`)** — título, descrição, artistas e papéis, arquivos,
eventos onde foi apresentada, tags, licença e obras relacionadas.

**Capturas (`/arquivo/capturas`)** — recorte curado de páginas preservadas pelo
ArchiveBox. Só aparecem itens com `status = published` **e** `accessLevel = public`.
Cada item mostra título, nota de curadoria, data e link para a fonte original.

**Linha do tempo (`/timeline`)** e **Sobre (`/sobre`)** — conteúdo institucional.

---

## 3. Entrar no admin

1. Abra `https://recombo.com.br/admin/login`
2. Informe e-mail e senha (usuários ficam na tabela `User`)

**Se ainda não existe usuário**, crie o primeiro no servidor:

```bash
ssh mabuse@143.198.177.192
cd /opt/recombo-web
node --env-file=.env scripts/create-admin.mjs seu@email.com 'senha-forte' 'Seu Nome' admin
```

O script é idempotente: rodar de novo com o mesmo e-mail **atualiza** a senha e o papel.

Papéis: `admin` (tudo), `editor`, `viewer`.

---

## 4. Cadastrar o acervo

Tudo em `/admin`:

| Seção                   | Para quê                                                               |
| ----------------------- | ---------------------------------------------------------------------- |
| **Obras**               | criar/editar obras: título, tipo, ano, descrição, mídia, tags, licença |
| **Artistas**            | pessoas e coletivos, com bio e links                                   |
| **Eventos**             | exposições, performances, festivais                                    |
| **Entrevistas**         | áudio/vídeo + transcrição                                              |
| **Tags**                | vocabulário controlado do acervo                                       |
| **Campos customizados** | metadados extras por tipo de obra                                      |
| **Capturas**            | curadoria do ArchiveBox (seção 5)                                      |

**Regra de publicação:** a obra só aparece no site público com
`status = published` **e** `accessLevel = public`. Rascunho (`draft`) não aparece.

---

## 5. Curadoria de capturas (ArchiveBox)

O ArchiveBox vive na rede local (`192.168.68.110:8030`, tag `col:recombo`) e o droplet
**não alcança** essa faixa de IP. Por isso o site não fala com ele: a mesa de curadoria
lê do banco, e um script empurra as capturas.

### 5.1 Sincronizar — automático a cada 15 minutos

O droplet alcança o ArchiveBox pelo túnel WireGuard (`10.8.0.6:8030`), então a
sincronização roda sozinha: `/etc/cron.d/recombo-sync` executa `scripts/sync-cron.sh`
a cada 15 minutos. Não é preciso rodar nada na mão.

**O que a sincronização traz:** apenas snapshots com a tag **`col:recombo`**.
Se você arquivou algo e não quer ver na mesa, mantenha sem a tag; se quer, adicione:

```bash
# no ZimaOS, dentro do container do ArchiveBox
docker exec archivebox archivebox add --tag=col:recombo "https://exemplo.com"
```

Para conferir o que entrou: `/admin/captures`. Para acompanhar a sincronização:

```bash
tail -20 /var/log/recombo-sync.log     # no droplet
```

### 5.2 Curar### 5.2 Curar

1. Abra `/admin/captures`
2. Cada linha é uma captura, com quatro estados:
   - **Caixa de entrada** — ainda não avaliada
   - **Selecionada** — entra no acervo curado (interna)
   - **Publicada** — aparece no `/arquivo/capturas`
   - **Descartada** — fora
3. Ajuste **título** (as capturas costumam vir com o título genérico do site)
4. Escreva a **nota de curadoria** — é ela que dá sentido ao item publicado
5. Defina o **acesso**: `Restrito`, `Privado` ou `Público`
6. Clique **Salvar decisões**

Para publicar: estado **Publicada** + acesso **Público**.
Para despublicar: volte o estado para **Selecionada** — o item sai do site.

---

## 6. Publicar no ar (deploy)

O deploy é automático: **todo push em `feature/open-design-layout` dispara o GitHub Actions**.

```bash
git push origin feature/open-design-layout
```

O workflow (`.github/workflows/deploy.yml`) faz:

1. **check**: `npm ci` → `prisma generate` → `tsc --noEmit` (não publica código que não compila)
2. **deploy**: SSH como `mabuse` → `sudo /usr/local/bin/recombo-deploy <sha>`
3. no servidor: `git reset --hard`, `npm ci`, `prisma db push`, `npm run build`,
   `pm2 reload recombo-web`, healthcheck em `http://127.0.0.1:3005/`

**Acompanhar:** aba Actions do repositório ou `gh run list`.

**Conferir no servidor:**

```bash
tail -20 /var/log/recombo-deploy.log
cd /opt/recombo-web && git log -1 --oneline
```

**Rollback:** rode o deploy do commit anterior

```bash
ssh mabuse@143.198.177.192 'sudo /usr/local/bin/recombo-deploy <sha-anterior>'
```

> A porta importa: o app vive na **:3005**. A :3000 é do TRAMA.

---

## 7. Importação em massa (opcional)

`scripts/ingest-articles.mjs` extrai obras/artistas de reportagens usando a API do Claude.

```bash
export ANTHROPIC_API_KEY=sk-ant-...
DRY_RUN=1 node scripts/ingest-articles.mjs ./reportagens   # simula
node scripts/ingest-articles.mjs ./reportagens             # grava
```

> **Atenção:** o script chama `/api/admin/*` **sem credenciais**. Depois do hardening
> do PR #1 essas rotas exigem sessão, então hoje ele recebe 401. Para usar, é preciso
> autenticar (cookie de sessão) ou criar um endpoint interno com token.

---

## 8. Problemas comuns

| Sintoma                                 | Causa                                      | O que fazer                                               |
| --------------------------------------- | ------------------------------------------ | --------------------------------------------------------- |
| `/rede`, `/mapa`, `/comunidade` dão 404 | estão no menu, mas não têm página          | remover do menu ou implementar                            |
| `/artista/...` dá 404                   | página de obra linka para rota inexistente | criar a página ou remover o link                          |
| Acervo vazio                            | nenhuma obra publicada                     | cadastrar em `/admin/artworks`                            |
| Login recusa                            | usuário não existe no banco                | rodar `create-admin.mjs`                                  |
| Deploy falha no Actions                 | código não compila / secret ausente        | ver o log do job                                          |
| Deploy falha no SSH                     | sudo/key                                   | `sudo -n -l /usr/local/bin/recombo-deploy` no servidor    |
| Site no ar com versão antiga            | deploy não rodou                           | Actions → Run workflow, ou conferir `git log` no servidor |
| Captura não aparece no site             | falta `published` + `public`               | ajustar na mesa de curadoria                              |

---

## 9. ArchiveBox fora de casa (`arquivo.mabuse.art.br`)

O ArchiveBox é servido pelo droplet, que alcança o ZimaOS por WireGuard (`10.8.0.6:8030`).

- **Primeira barreira:** Basic Auth do nginx — usuário `mabuse`, senha em `/root/arquivo-basic-auth.txt` no droplet
- **Segunda barreira:** login próprio do ArchiveBox
- `X-Robots-Tag: noindex` e `X-Frame-Options: DENY` já estão aplicados

Se o login der **403 CSRF**, verifique:

1. `CSRF_TRUSTED_ORIGINS` no `docker-compose.yml` do ZimaOS deve conter
   `https://arquivo.mabuse.art.br` (e pode manter a origem da LAN)
2. o vhost **não** deve enviar `Referrer-Policy: no-referrer` — o Django usa o
   `Referer` quando o navegador não manda `Origin`

Para desligar o acesso externo sem afetar o resto:

```bash
rm /etc/nginx/sites-enabled/zima-arquivo.conf && systemctl reload nginx
```

---

## 10. Checklist para publicar uma obra

- [ ] artista cadastrado (`/admin/artists`)
- [ ] obra criada com tipo, ano e descrição
- [ ] mídia/arquivos anexados
- [ ] tags aplicadas
- [ ] licença conferida (padrão: LUCR)
- [ ] `status = published` e `accessLevel = public`
- [ ] conferir em `/arquivo` e em `/obra/<slug>`
- [ ] se houver captura relacionada, linkar na nota de curadoria
