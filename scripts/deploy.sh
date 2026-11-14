#!/usr/bin/env bash
# Deploy do recombo-web em /opt/recombo-web (executado via sudo pelo GitHub Actions).
# Uso:  bash scripts/deploy.sh <commit-sha>
set -euo pipefail

SHA="${1:?uso: deploy.sh <commit-sha>}"
APP_DIR="${APP_DIR:-/opt/recombo-web}"
BRANCH="${DEPLOY_BRANCH:-feature/open-design-layout}"
LOG_FILE="${LOG_FILE:-/var/log/recombo-deploy.log}"

log() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }

exec > >(tee -a "$LOG_FILE") 2>&1
printf '\n===== %s | deploy %s | %s =====\n' "$(date -Is)" "$SHA" "$BRANCH"

cd "$APP_DIR"
[ -f .env ] || { echo "ERRO: .env ausente em $APP_DIR"; exit 1; }

set -a
. ./.env
set +a

[ -n "${DATABASE_URL:-}" ] || { echo "ERRO: DATABASE_URL vazia em .env"; exit 1; }

log "Código: $BRANCH @ $SHA"
git fetch --prune origin "$BRANCH"
git reset --hard "$SHA"
git clean -fd -e node_modules -e .env -e .next

log "Dependências (npm ci)"
npm ci --no-audit --no-fund

log "Prisma: client + schema"
npx prisma generate
npx prisma db push --skip-generate

log "Build"
npm run build

log "Reiniciando (pm2)"
if pm2 describe recombo-web >/dev/null 2>&1; then
  pm2 reload recombo-web --update-env
else
  pm2 start npm --name recombo-web -- start
  pm2 save
fi

log "Healthcheck"
sleep 3
if curl -fsS -o /dev/null --max-time 10 http://127.0.0.1:3000/; then
  log "OK: deploy de $SHA concluído"
else
  echo "ERRO: aplicação não respondeu em :3000"
  pm2 logs recombo-web --lines 30 --nostream || true
  exit 1
fi
