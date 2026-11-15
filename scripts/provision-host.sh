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

SYNC_CRON=/etc/cron.d/recombo-sync
if [ ! -f "$SYNC_CRON" ]; then
  cat > "$SYNC_CRON" <<'CRON'
# Sincroniza capturas do ArchiveBox (via WireGuard) a cada 15 minutos
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
*/15 * * * * root /opt/recombo-web/scripts/sync-cron.sh >> /var/log/recombo-sync.log 2>&1
CRON
  chmod 644 "$SYNC_CRON"
  echo "cron de sincronização instalado"
fi

mkdir -p "$BACKUP_DIR"

# primeira execução do sync (valida o túnel e popula o acervo)
if [ ! -f /var/log/recombo-sync.log ]; then
  echo "rodando sincronização inicial"
  /opt/recombo-web/scripts/sync-cron.sh || echo "AVISO: sync inicial falhou (veja /var/log/recombo-sync.log)"
fi

if [ "$(cat "$MARKER" 2>/dev/null || echo '')" = "$TODAY restore=ok" ]; then
  echo "backup já validado hoje ($TODAY)"
  exit 0
fi

echo "validando backup de $(date -Is)"
/opt/recombo-web/scripts/backup.sh
set +e
/opt/recombo-web/scripts/restore-test.sh
RESTORE_RC=$?
set -e
if [ "$RESTORE_RC" -eq 0 ]; then
  echo "$TODAY restore=ok" > "$MARKER"
  echo "validação completa: backup + restore exercitados"
elif [ "$RESTORE_RC" -eq 2 ]; then
  echo "$TODAY restore=pending" > "$MARKER"
  echo "AVISO: backup válido, restore pendente de permissão (CREATEDB)"
else
  echo "ERRO: validação do backup falhou"
  exit 1
fi
