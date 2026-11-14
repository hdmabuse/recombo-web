#!/usr/bin/env bash
# Deploy do re com bo-web no droplet (executado via SSH pelo GitHub Actions).
#
# Uso:  bash scripts/deploy.sh <commit-sha>
# Requisitos no servidor:
#   - repositório clonado em DEPLOY_PATH, com remote origin apontando para o GitHub
#   - .env.local preenchido (DATABASE_URL, ARCHIVEBOX_*, ADMIN_*, AUTH_SECRET)
#   - node >= 20, npm, pm2 (ou systemd)
set -euo pipefail

SHA="${1:?uso: deploy.sh <commit-sha>}"
APP_DIR="${APP_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"

log() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }

# guarda tudo em deploy.log para auditoria via SSH
LOG_FILE="${APP_DIR}/deploy.log"
exec > >(tee -a "$LOG_FILE") 2>&1
printf '\n===== %s | deploy %s =====\n' "$(date -Is)" "$SHA" >> "$LOG_FILE"

cd "$APP_DIR"

log "Deploy $SHA em $APP_DIR"

# 0. sanidade
command -v node >/dev/null || { echo "node não encontrado"; exit 1; }
command -v npm  >/dev/null || { echo "npm não encontrado"; exit 1; }
[ -f .env.local ] || { echo "ERRO: .env.local ausente em $APP_DIR"; exit 1; }

# carrega as variáveis para o prisma e o build
set -a
# shellcheck disable=SC1091
. ./.env.local
set +a

[ -n "${DATABASE_URL:-}" ] || { echo "ERRO: DATABASE_URL vazia em .env.local"; exit 1; }

NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
if [ "$NODE_MAJOR" -lt 20 ]; then
  echo "ERRO: Node $NODE_MAJOR detectado; é preciso >= 20"
  exit 1
fi

# 1. código
log "Buscando commits"
git fetch --prune origin main
git reset --hard "$SHA"
git clean -fd -e node_modules -e .env.local -e .next

# 2. dependências
log "Instalando dependências (npm ci)"
npm ci --no-audit --no-fund

# 3. prisma
log "Gerando client e aplicando migrações"
npx prisma generate
npx prisma migrate deploy

# 4. build
log "Build de produção"
npm run build

# 5. restart
log "Reiniciando aplicação"
if command -v pm2 >/dev/null; then
  if pm2 describe recombo-web >/dev/null 2>&1; then
    pm2 reload recombo-web --update-env
  else
    pm2 start npm --name recombo-web -- start
    pm2 save
  fi
elif command -v systemctl >/dev/null && systemctl list-unit-files | grep -q '^recombo-web\.service'; then
  sudo systemctl restart recombo-web
else
  echo "ERRO: não encontrei pm2 nem unit systemd (recombo-web.service)"
  exit 1
fi

# 6. healthcheck local
log "Healthcheck"
sleep 3
if curl -fsS -o /dev/null --max-time 10 http://127.0.0.1:3000/; then
  echo "OK: aplicação respondendo em :3000"
else
  echo "AVISO: aplicação não respondeu em :3000 (confira nginx/porta)"
  exit 1
fi

log "Deploy de $SHA concluído"
