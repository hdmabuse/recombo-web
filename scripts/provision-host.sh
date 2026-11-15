#!/usr/bin/env bash
# Provisionamento idempotente do host (executado pelo deploy, uma vez).
# - instala o cron do backup diário
# - roda o primeiro backup e valida o restore
set -euo pipefail

CRON_FILE=/etc/cron.d/recombo-backup
MARKER=/var/backups/recombo/.validado

if [ ! -f "$CRON_FILE" ]; then
  cat > "$CRON_FILE" <<'CRON'
# Backup diário do recombo-web (banco + uploads)
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
15 3 * * * root /opt/recombo-web/scripts/backup.sh >> /var/log/recombo-backup.log 2>&1
CRON
  chmod 644 "$CRON_FILE"
  echo "cron instalado em $CRON_FILE"
fi

if [ ! -f "$MARKER" ]; then
  mkdir -p /var/backups/recombo
  /opt/recombo-web/scripts/backup.sh
  /opt/recombo-web/scripts/restore-test.sh && touch "$MARKER"
fi
