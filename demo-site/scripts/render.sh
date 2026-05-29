#!/usr/bin/env bash
#
# render.sh — fill every *.tmpl under demo-site/ from .env (and, if present,
# the SAML certificate bodies written by gen-certs.sh into .certs-env.sh).
#
# Output files drop the .tmpl suffix and are gitignored. Idempotent: safe to
# re-run after editing .env. Uses an EXPLICIT envsubst allowlist so literal
# `$` / `${...}` sequences in Apache and Shibboleth config (e.g. ${APACHE_LOG_DIR})
# are left untouched.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"

if [ ! -f "$ROOT/.env" ]; then
    echo "ERROR: $ROOT/.env not found. Copy .env.example to .env and edit it." >&2
    exit 1
fi

set -a
# shellcheck disable=SC1090
source "$ROOT/.env"
# Certificate bodies (base64, PEM headers stripped) — only present once
# gen-certs.sh has run. Templates that need them are the XML descriptors.
[ -f "$HERE/.certs-env.sh" ] && source "$HERE/.certs-env.sh"
set +a

# Everything templates may reference. envsubst only touches these names.
ALLOW='$SA_DOMAIN $IDP_HOST $SP1_HOST $SP2_HOST $MDQ_HOST $SERVICE_HOST'
ALLOW="$ALLOW "'$IDP_ENTITYID $IDP_SCOPE $SP1_ENTITYID $SP2_ENTITYID'
ALLOW="$ALLOW "'$DEMO_USER $DEMO_DISPLAYNAME $DEMO_MAIL'
ALLOW="$ALLOW "'$IDP_SIGNING_CERT $IDP_ENCRYPTION_CERT'
ALLOW="$ALLOW "'$SP1_SIGNING_CERT $SP1_ENCRYPTION_CERT'
ALLOW="$ALLOW "'$SP2_SIGNING_CERT $SP2_ENCRYPTION_CERT'

rendered=0
while IFS= read -r -d '' tmpl; do
    out="${tmpl%.tmpl}"
    envsubst "$ALLOW" < "$tmpl" > "$out"
    echo "  rendered $(realpath --relative-to="$ROOT" "$out")"
    rendered=$((rendered + 1))
done < <(find "$ROOT" -name '*.tmpl' -type f -print0)

echo "render.sh: $rendered file(s) rendered."
