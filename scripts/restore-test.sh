#!/usr/bin/env bash
# Valida o backup. NUNCA escreve no banco de produção.
#
#  1. integridade do gzip;
#  2. sanidade do conteúdo (tabelas e COPY presentes);
#  3. restore real SOMENTE em banco temporário (exige CREATEDB).
#     Sem permissão, registra que o restore precisa de drill manual.
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/recombo-web}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/recombo}"
cd "$APP_DIR"
set -a; . ./.env; set +a
[ -n "${DATABASE_URL:-}" ] || { echo "ERRO: DATABASE_URL vazia"; exit 1; }

BASE_URL="${DATABASE_URL%%\?*}"
DUMP="$(ls -1t "$BACKUP_DIR"/db-*.sql.gz 2>/dev/null | head -1 || true)"
[ -n "$DUMP" ] || { echo "ERRO: nenhum dump encontrado"; exit 1; }

echo "dump: $DUMP ($(du -h "$DUMP" | cut -f1))"
gzip -t "$DUMP" || { echo "ERRO: dump corrompido"; exit 1; }

TABLES=$(gunzip -c "$DUMP" | grep -c '^CREATE TABLE')
COPIES=$(gunzip -c "$DUMP" | grep -c '^COPY ')
echo "sanidade: $TABLES CREATE TABLE, $COPIES COPY"
[ "$TABLES" -ge 10 ] || { echo "ERRO: dump sem as tabelas esperadas"; exit 1; }
[ "$COPIES" -ge 5 ] || { echo "ERRO: dump sem dados (COPY) suficiente"; exit 1; }

# restore real, apenas em banco isolado
ADMIN_URL="${BASE_URL%/*}/postgres"
TEST_DB="recombo_restore_test_$(date +%s)"

if psql "$ADMIN_URL" -q -c "CREATE DATABASE \"$TEST_DB\"" 2>/dev/null; then
  trap 'psql "$ADMIN_URL" -q -c "DROP DATABASE IF EXISTS \"$TEST_DB\"" >/dev/null 2>&1 || true' EXIT
  gunzip -c "$DUMP" | psql "${BASE_URL%/*}/$TEST_DB" -q --set ON_ERROR_STOP=1 >/dev/null
  ART=$(psql "${BASE_URL%/*}/$TEST_DB" -tAc 'SELECT count(*) FROM "Artwork"')
  CAP=$(psql "${BASE_URL%/*}/$TEST_DB" -tAc 'SELECT count(*) FROM "Capture"')
  echo "restore OK em banco temporário: Artwork=$ART Capture=$CAP"
  exit 0
fi

echo "AVISO: usuário do banco não tem CREATEDB — restore não exercitado."
echo "       Rode o drill manual como postgres (documentado em docs/REFATORACAO.md)."
exit 0
