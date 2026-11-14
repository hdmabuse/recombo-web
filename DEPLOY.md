# Deploy no droplet (143.198.177.192)

Cada push na `main` dispara o workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
checagem de tipos → SSH → `scripts/deploy.sh` no servidor.

## O que o workflow faz

1. **check**: `npm ci`, `prisma generate`, `tsc --noEmit` (falha o deploy se o código não compilar).
2. **deploy**: conecta por SSH como `mabuse`, roda `scripts/deploy.sh <sha>`:
   - `git fetch` + `git reset --hard <sha>` no repositório do servidor
   - `npm ci`
   - `npx prisma generate` + `npx prisma migrate deploy`
   - `npm run build`
   - `pm2 reload recombo-web` (ou `systemctl restart recombo-web`)
   - healthcheck em `http://127.0.0.1:3000/`

## 1. Criar a chave de deploy (no droplet)

```bash
ssh mabuse@143.198.177.192
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/gh_deploy -N ""
cat ~/.ssh/gh_deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
cat ~/.ssh/gh_deploy          # copie TODO o conteúdo
```

## 2. Configurar os secrets no GitHub

Em **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Valor |
|---|---|
| `DEPLOY_SSH_KEY` | conteúdo de `~/.ssh/gh_deploy` (chave **privada**, incluindo as linhas BEGIN/END) |
| `DEPLOY_HOST` | `143.198.177.192` |
| `DEPLOY_USER` | `mabuse` |
| `DEPLOY_PATH` | `/home/mabuse/recombo-web` (caminho do clone no servidor) |

> Sem os quatro, o job falha com mensagem explícita antes de qualquer conexão.

## 3. Preparar o servidor (uma vez)

```bash
# código
cd /home/mabuse
git clone https://github.com/hdmabuse/recombo-web.git
cd recombo-web
cp .env.example .env.local     # preencha DATABASE_URL, ARCHIVEBOX_*, ADMIN_*, AUTH_SECRET

# node 20+, pm2
node -v                        # precisa ser >= 20
npm i -g pm2

# primeira subida
npm ci && npx prisma generate && npx prisma migrate deploy && npm run build
pm2 start npm --name recombo-web -- start
pm2 save && pm2 startup        # segue a instrução impressa
```

O `scripts/deploy.sh` recusa rodar sem `.env.local`, sem `DATABASE_URL` e com Node < 20.

## 4. nginx (já existe no servidor)

O proxy atual serve `recombo.com.br` → app na `:3000`. Nenhuma mudança é necessária
se a porta continuar 3000.

## 5. Migrações

`prisma migrate deploy` roda automaticamente a cada deploy. Se uma migração falhar,
o deploy para antes do `build` e a versão anterior continua no ar (o `pm2 reload`
não chega a acontecer).

## 6. Rollback

```bash
ssh mabuse@143.198.177.192
cd ~/recombo-web && bash scripts/deploy.sh <sha-anterior>
```

## Segurança

- A chave é **de deploy**, específica para o servidor; revogue-a removendo a linha
  correspondente de `~/.ssh/authorized_keys`.
- Prefira restringir no `authorized_keys`:
  `command="/home/mabuse/recombo-web/scripts/deploy.sh",no-port-forwarding,no-agent-forwarding,no-pty ssh-ed25519 AAAA...`
  (se fizer isso, o parâmetro do commit deixa de ser passado — ajuste o script).
- `DEPLOY_SSH_KEY` nunca aparece em log: o workflow escreve em `~/.ssh/deploy_key` no runner efêmero.
