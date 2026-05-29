#!/usr/bin/env bash
#
# up.sh — the only place that branches on TLS_MODE (plan.md §8).
#   local       -> mint local TLS certs, print the /etc/hosts line, no acme.
#   letsencrypt -> sanity-check public DNS + :80, start with the acme profile.
# Always renders templates first, then `docker compose up -d`.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
cd "$ROOT"

[ -f .env ] || { echo "ERROR: .env not found. cp .env.example .env && edit it." >&2; exit 1; }
set -a; source .env; set +a

TLS_MODE="${TLS_MODE:-local}"

# Templates must be rendered before SP/IdP config is mounted. Refuse to come up
# if the SAML certs were never generated (the XML descriptors would be empty).
if [ ! -f scripts/.certs-env.sh ]; then
    echo "ERROR: run scripts/gen-certs.sh once before bringing the stack up." >&2
    exit 1
fi
echo "==> Rendering templates"
bash scripts/render.sh

HOSTS=("$IDP_HOST" "$SP1_HOST" "$SP2_HOST" "$MDQ_HOST" "$SERVICE_HOST")

case "$TLS_MODE" in
    local)
        echo "==> TLS_MODE=local: minting local TLS certs"
        bash scripts/gen-tls-local.sh
        echo
        echo "Add this line to /etc/hosts on every test machine:"
        echo "    ${VM_IP}  ${HOSTS[*]}"
        echo
        echo "==> docker compose up -d (no acme-companion)"
        unset COMPOSE_PROFILES
        docker compose up -d
        ;;
    letsencrypt)
        echo "==> TLS_MODE=letsencrypt: checking public DNS resolves"
        for h in "${HOSTS[@]}"; do
            if ! getent hosts "$h" >/dev/null 2>&1; then
                echo "WARNING: $h does not resolve from this host — LE HTTP-01 will fail." >&2
            fi
        done
        [ -n "${LETSENCRYPT_EMAIL:-}" ] || { echo "ERROR: set LETSENCRYPT_EMAIL in .env." >&2; exit 1; }
        echo "==> docker compose up -d with acme-companion (letsencrypt profile)"
        COMPOSE_PROFILES=letsencrypt docker compose up -d
        echo "Watch acme-companion populate ./certs:  docker compose logs -f acme-companion"
        ;;
    *)
        echo "ERROR: unknown TLS_MODE='$TLS_MODE' (use 'local' or 'letsencrypt')." >&2
        exit 1
        ;;
esac

echo
echo "Up. Watch boot:  docker compose logs -f idp mdq"
echo "MDQ should log 'loaded N objects'; the IdP first boot takes a minute."
