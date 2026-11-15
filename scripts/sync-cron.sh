#!/usr/bin/env bash
# Sincroniza capturas do ArchiveBox -> banco do site, rodando NO DROPLET.
# O ArchiveBox é alcançado pelo túnel WireGuard (10.8.0.6); a API pública não
# serve para isso. Agendado por /etc/cron.d/recombo-sync a cada 15 minutos.
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/recombo-web}"
cd "$APP_DIR"

set -a
. ./.env
set +a

export ARCHIVEBOX_URL="${ARCHIVEBOX_TUNNEL_URL:-http://10.8.0.6:8030}"
export SITE_URL="${SITE_URL:-http://127.0.0.1:3005}"

[ -n "${ARCHIVEBOX_TOKEN:-}" ] || { echo "ERRO: ARCHIVEBOX_TOKEN ausente"; exit 1; }
[ -n "${CAPTURE_SYNC_TOKEN:-}" ] || { echo "ERRO: CAPTURE_SYNC_TOKEN ausente"; exit 1; }

echo "[$(date -Is)] sync iniciado ($ARCHIVEBOX_URL)"
node scripts/sync-captures.mjs
