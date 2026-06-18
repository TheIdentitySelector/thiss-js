#!/usr/bin/env bash
#
# gen-tls-local.sh — TLS_MODE=local only. Mint browser TLS certs for the six
# vhosts into ./certs as <host>.crt / <host>.key (the filenames nginx-proxy
# matches on). Prefers mkcert (installs a trusted local CA); falls back to a
# self-managed openssl CA written to certs/local-ca.crt — import that into the
# test browser's trust store.
#
# Idempotent: existing per-host certs are kept unless --force is given.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
CERTS="$ROOT/certs"
FORCE=0
[ "${1:-}" = "--force" ] && FORCE=1

[ -f "$ROOT/.env" ] || { echo "ERROR: $ROOT/.env not found." >&2; exit 1; }
set -a; source "$ROOT/.env"; set +a

mkdir -p "$CERTS"
HOSTS=("$IDP_HOST" "$IDP2_HOST" "$SP1_HOST" "$SP2_HOST" "$MDQ_HOST" "$SERVICE_HOST")

if command -v mkcert >/dev/null 2>&1; then
    echo "Using mkcert (trusted local CA)."
    mkcert -install >/dev/null 2>&1 || true
    for h in "${HOSTS[@]}"; do
        if [ "$FORCE" -eq 0 ] && [ -f "$CERTS/$h.crt" ]; then
            echo "  keep $h.crt"; continue
        fi
        mkcert -cert-file "$CERTS/$h.crt" -key-file "$CERTS/$h.key" "$h" >/dev/null 2>&1
        echo "  wrote $h.crt"
    done
    echo "mkcert CA is trusted on this machine. On OTHER test machines run:"
    echo "    mkcert -install   (after copying \$(mkcert -CAROOT)/rootCA.pem)"
else
    echo "mkcert not found — using a self-managed openssl CA."
    CA_CRT="$CERTS/local-ca.crt"; CA_KEY="$CERTS/local-ca.key"
    if [ "$FORCE" -eq 1 ] || [ ! -f "$CA_CRT" ]; then
        openssl req -x509 -nodes -newkey rsa:4096 -days 3650 \
            -keyout "$CA_KEY" -out "$CA_CRT" \
            -subj "/CN=SeamlessAccess demo local CA" >/dev/null 2>&1
        echo "  wrote local-ca.crt  (import this into every test browser)"
    fi
    for h in "${HOSTS[@]}"; do
        if [ "$FORCE" -eq 0 ] && [ -f "$CERTS/$h.crt" ]; then
            echo "  keep $h.crt"; continue
        fi
        openssl req -nodes -newkey rsa:2048 -keyout "$CERTS/$h.key" \
            -out "$CERTS/$h.csr" -subj "/CN=$h" >/dev/null 2>&1
        openssl x509 -req -in "$CERTS/$h.csr" -CA "$CA_CRT" -CAkey "$CA_KEY" \
            -CAcreateserial -days 825 -out "$CERTS/$h.crt" \
            -extfile <(printf 'subjectAltName=DNS:%s' "$h") >/dev/null 2>&1
        rm -f "$CERTS/$h.csr"
        echo "  wrote $h.crt"
    done
    echo "Import $CA_CRT into the trust store of every test browser."
fi

echo "gen-tls-local.sh: done. Certs in $CERTS"
