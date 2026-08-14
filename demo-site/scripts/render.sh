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

# Entity logos: base64-encode the committed SVG sources (metadata/logos/) into
# inline data: URLs, so every entity carries its icon directly in metadata.json
# and its SAML descriptor — no separate logo hosting. Names mirror the entities
# in metadata/metadata.json.tmpl (the four example-* ones are the mock IdPs).
logo_url() { printf 'data:image/svg+xml;base64,%s' "$(base64 -w0 "$1")"; }
LOGODIR="$ROOT/metadata/logos"
export IDP_LOGO="$(logo_url "$LOGODIR/demo-idp.svg")"
export IDP2_LOGO="$(logo_url "$LOGODIR/cazalla.svg")"
export SP1_LOGO="$(logo_url "$LOGODIR/demo-sp1.svg")"
export SP2_LOGO="$(logo_url "$LOGODIR/demo-sp2.svg")"
export EXAMPLE_UNIVERSITY_LOGO="$(logo_url "$LOGODIR/example-university.svg")"
export EXAMPLE_COLLEGE_LOGO="$(logo_url "$LOGODIR/example-college.svg")"
export EXAMPLE_INSTITUTE_LOGO="$(logo_url "$LOGODIR/example-institute.svg")"
export EXAMPLE_HOSPITAL_LOGO="$(logo_url "$LOGODIR/example-hospital.svg")"

# Persistence context shared by the DS (thiss container env) and the SP2
# advanced-mode pages (custom button reads the choice the DS persisted).
# Must match DEFAULT_CONTEXT in docker-compose.yml's thiss service.
export DEFAULT_CONTEXT="${DEFAULT_CONTEXT:-local}"

# Everything templates may reference. envsubst only touches these names.
ALLOW='$SA_DOMAIN $IDP_HOST $IDP2_HOST $SP1_HOST $SP2_HOST $MDQ_HOST $SERVICE_HOST'
ALLOW="$ALLOW "'$DEFAULT_CONTEXT'
ALLOW="$ALLOW "'$IDP_ENTITYID $IDP_SCOPE $IDP2_ENTITYID $IDP2_SCOPE $SP1_ENTITYID $SP2_ENTITYID'
ALLOW="$ALLOW "'$DEMO_USER $DEMO_DISPLAYNAME $DEMO_MAIL'
ALLOW="$ALLOW "'$DEMO2_USER $DEMO2_DISPLAYNAME $DEMO2_MAIL'
ALLOW="$ALLOW "'$IDP_SIGNING_CERT $IDP_ENCRYPTION_CERT'
ALLOW="$ALLOW "'$IDP2_SIGNING_CERT $IDP2_ENCRYPTION_CERT'
ALLOW="$ALLOW "'$SP1_SIGNING_CERT $SP1_ENCRYPTION_CERT'
ALLOW="$ALLOW "'$SP2_SIGNING_CERT $SP2_ENCRYPTION_CERT'
ALLOW="$ALLOW "'$IDP_LOGO $IDP2_LOGO $SP1_LOGO $SP2_LOGO'
ALLOW="$ALLOW "'$EXAMPLE_UNIVERSITY_LOGO $EXAMPLE_COLLEGE_LOGO $EXAMPLE_INSTITUTE_LOGO $EXAMPLE_HOSPITAL_LOGO'

rendered=0
while IFS= read -r -d '' tmpl; do
    out="${tmpl%.tmpl}"
    envsubst "$ALLOW" < "$tmpl" > "$out"
    echo "  rendered $(realpath --relative-to="$ROOT" "$out")"
    rendered=$((rendered + 1))
done < <(find "$ROOT" -name '*.tmpl' -type f -print0)

echo "render.sh: $rendered file(s) rendered."
