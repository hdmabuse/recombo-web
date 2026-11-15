#!/usr/bin/env bash
# Backup diário do banco e dos uploads do recombo-web.
# Instalar em cron (root):  15 3 * * *  /opt/recombo-web/scripts/backup.sh >> /var/log/recombo-backup.log 2>&1
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/recombo-web}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/recombo}"
RETENTION_DAYS="${RETENTION_DAYS:-7}"
STAMP="$(date +%Y%m%d-%H%M)"

mkdir -p "$BACKUP_DIR"

cd "$APP_DIR"
[ -f .env ] || { echo "ERRO: .env ausente"; exit 1; }
set -a; . ./.env; set +a
[ -n "${DATABASE_URL:-}" ] || { echo "ERRO: DATABASE_URL vazia"; exit 1; }

echo "[$(date -Is)] backup iniciado"

# 1. banco (remove o ?schema= do Prisma, que o pg_dump não entende)
DUMP_URL="${DATABASE_URL%%\?*}"
pg_dump "$DUMP_URL" --no-owner --no-acl | gzip -9 > "$BACKUP_DIR/db-$STAMP.sql.gz"

# 2. uploads (podem não existir)
if [ -d "$APP_DIR/public/uploads" ]; then
  tar czf "$BACKUP_DIR/uploads-$STAMP.tar.gz" -C "$APP_DIR/public" uploads
fi

# 3. retenção
find "$BACKUP_DIR" -name 'db-*.sql.gz' -mtime "+$RETENTION_DAYS" -delete
find "$BACKUP_DIR" -name 'uploads-*.tar.gz' -mtime "+$RETENTION_DAYS" -delete

echo "[$(date -Is)] backup concluído: $(ls -1sh "$BACKUP_DIR"/db-$STAMP.sql.gz | awk '{print $1}')"
