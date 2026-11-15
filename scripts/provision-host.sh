#!/usr/bin/env bash
# Provisionamento idempotente do host, chamado pelo deploy.
# - instala o cron do backup diário (se ausente)
# - valida o backup uma vez por dia (marker = data)
set -euo pipefail

CRON_FILE=/etc/cron.d/recombo-backup
BACKUP_DIR=/var/backups/recombo
MARKER="$BACKUP_DIR/.validado-em"
TODAY="$(date +%F)"

if [ ! -f "$CRON_FILE" ]; then
  cat > "$CRON_FILE" <<'CRON'
# Backup diário do recombo-web (banco + uploads)
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
15 3 * * * root /opt/recombo-web/scripts/backup.sh >> /var/log/recombo-backup.log 2>&1
CRON
  chmod 644 "$CRON_FILE"
  echo "cron instalado em $CRON_FILE"
else
  echo "cron já instalado"
fi

mkdir -p "$BACKUP_DIR"

if [ "$(cat "$MARKER" 2>/dev/null || echo '')" = "$TODAY" ]; then
  echo "backup já validado hoje ($TODAY)"
  exit 0
fi

echo "validando backup de $(date -Is)"
/opt/recombo-web/scripts/backup.sh
if /opt/recombo-web/scripts/restore-test.sh; then
  echo "$TODAY" > "$MARKER"
  echo "validação concluída"
else
  echo "AVISO: validação do backup falhou (não marca como validado)"
  exit 1
fi
