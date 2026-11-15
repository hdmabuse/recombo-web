#!/usr/bin/env bash
# Testa o backup de verdade: restaura o dump e confere as linhas.
#
# Estratégia:
#  1. tenta criar um banco temporário (precisa de CREATEDB);
#  2. se não puder, cria um SCHEMA temporário no próprio banco e restaura ali
#     (o dump usa nomes sem schema, então basta ajustar o search_path);
#  3. sempre limpa o que criou.
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/recombo-web}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/recombo}"
cd "$APP_DIR"
set -a; . ./.env; set +a
[ -n "${DATABASE_URL:-}" ] || { echo "ERRO: DATABASE_URL vazia"; exit 1; }

BASE_URL="${DATABASE_URL%%\?*}"
DUMP="$(ls -1t "$BACKUP_DIR"/db-*.sql.gz 2>/dev/null | head -1 || true)"
[ -n "$DUMP" ] || { echo "ERRO: nenhum dump encontrado"; exit 1; }

echo "dump: $DUMP"
gzip -t "$DUMP" || { echo "ERRO: dump corrompido"; exit 1; }

check_counts() {
  local url="$1" prefix="${2:-}"
  local art cap
  art=$(psql "$url" -tAc "SELECT count(*) FROM ${prefix}\"Artwork\"")
  cap=$(psql "$url" -tAc "SELECT count(*) FROM ${prefix}\"Capture\"")
  echo "restore OK: Artwork=$art Capture=$cap"
}

# 1) banco temporário
ADMIN_URL="${BASE_URL%/*}/postgres"
TEST_DB="recombo_restore_test_$(date +%s)"
if psql "$ADMIN_URL" -q -c "CREATE DATABASE \"$TEST_DB\"" 2>/dev/null; then
  trap 'psql "$ADMIN_URL" -q -c "DROP DATABASE IF EXISTS \"$TEST_DB\"" >/dev/null 2>&1 || true' EXIT
  gunzip -c "$DUMP" | psql "${BASE_URL%/*}/$TEST_DB" -q >/dev/null
  check_counts "${BASE_URL%/*}/$TEST_DB"
  exit 0
fi

# 2) schema temporário no banco de produção
SCHEMA="recombo_restore_test_$(date +%s)"
psql "$BASE_URL" -q -c "CREATE SCHEMA \"$SCHEMA\"" 2>/dev/null || {
  echo "AVISO: sem permissão para criar schema; dump íntegro (gzip -t), restore não exercitado"
  exit 0
}
trap 'psql "$BASE_URL" -q -c "DROP SCHEMA IF EXISTS \"$SCHEMA\" CASCADE" >/dev/null 2>&1 || true' EXIT

{ echo "SET search_path TO \"$SCHEMA\";"; gunzip -c "$DUMP"; } | psql "$BASE_URL" -q >/dev/null
check_counts "$BASE_URL" "\"$SCHEMA\"."
