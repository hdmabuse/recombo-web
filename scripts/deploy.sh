#!/usr/bin/env bash
# Deploy do recombo-web em /opt/recombo-web (executado via sudo pelo GitHub Actions).
# Uso:  bash scripts/deploy.sh <commit-sha>
set -euo pipefail

SHA="${1:?uso: deploy.sh <commit-sha>}"
APP_DIR="${APP_DIR:-/opt/recombo-web}"
BRANCH="${DEPLOY_BRANCH:-feature/open-design-layout}"
LOG_FILE="${LOG_FILE:-/var/log/recombo-deploy.log}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:3005/}"

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
git clean -fd -e node_modules -e .env -e .next -e public/uploads

log "Dependências (npm ci)"
npm ci --no-audit --no-fund

log "Prisma: client + migrações"
npx prisma generate

# Baseline: banco criado antes das migrações (P3005) recebe 0001_init como aplicada.
set +e
STATUS_OUT=$(npx prisma migrate status 2>&1)
STATUS_RC=$?
set -e
if [ "$STATUS_RC" -ne 0 ] && echo "$STATUS_OUT" | grep -q "P3005"; then
  echo "banco sem histórico de migrações: aplicando baseline 0001_init"
  npx prisma migrate resolve --applied 0001_init || true
fi

# Primeiro deploy com migrações em banco existente: baseline e nova tentativa.
if ! MIGRATE_OUT=$(npx prisma migrate deploy 2>&1); then
  echo "$MIGRATE_OUT"
  if echo "$MIGRATE_OUT" | grep -q "P3005"; then
    echo "banco sem histórico: marcando 0001_init como aplicada (baseline)"
    npx prisma migrate resolve --applied 0001_init
    npx prisma migrate deploy
  else
    echo "AVISO: migrate deploy falhou; usando db push como plano B"
    npx prisma db push --skip-generate
  fi
fi

log "Build"
npm run build

log "Reiniciando (pm2)"
if pm2 describe recombo-web >/dev/null 2>&1; then
  pm2 reload recombo-web --update-env
else
  pm2 start npm --name recombo-web -- start
  pm2 save
fi

log "Provisionamento do host (cron de backup)"
if [ -x scripts/provision-host.sh ]; then
  bash scripts/provision-host.sh || echo "AVISO: provisionamento falhou (segue o deploy)"
fi

log "Healthcheck"
sleep 3
if curl -fsS -o /dev/null --max-time 10 "$HEALTH_URL"; then
  log "OK: deploy de $SHA concluído"
else
  echo "ERRO: aplicação não respondeu em $HEALTH_URL"
  pm2 logs recombo-web --lines 30 --nostream || true
  exit 1
fi
