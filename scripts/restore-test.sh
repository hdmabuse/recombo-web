#!/usr/bin/env bash
# Testa o backup de verdade: restaura o dump num banco temporário, conta linhas
# e apaga. Se não houver permissão para criar banco, valida a integridade do
# arquivo e sai com aviso (não falha o deploy).
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

# tenta restore real em banco temporário
ADMIN_URL="${BASE_URL%/*}/postgres"
TEST_DB="recombo_restore_test_$(date +%s)"

if psql "$ADMIN_URL" -q -c "CREATE DATABASE \"$TEST_DB\"" 2>/dev/null; then
  trap 'psql "$ADMIN_URL" -q -c "DROP DATABASE IF EXISTS \"$TEST_DB\"" >/dev/null 2>&1 || true' EXIT

  TEST_URL="${BASE_URL%/*}/$TEST_DB"
  gunzip -c "$DUMP" | psql "$TEST_URL" -q >/dev/null

  ART=$(psql "$TEST_URL" -tAc 'SELECT count(*) FROM "Artwork"')
  CAP=$(psql "$TEST_URL" -tAc 'SELECT count(*) FROM "Capture"')
  echo "restore OK: Artwork=$ART Capture=$CAP"
else
  echo "AVISO: sem permissão para criar banco de teste; dump íntegro (gzip -t), restore não exercitado"
fi
