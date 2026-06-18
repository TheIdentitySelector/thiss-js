# SeamlessAccess Docker Compose demo

A self-contained federation demo: two Shibboleth IdPs (a generic "Demo IdP" and
"Universidad de Cazalla"), a thiss-mdq metadata service, a thiss-js discovery
site, and two Shibboleth-protected SPs, all behind `nginx-proxy` (TLS) on one
`demonet` bridge network. Both SPs trust both IdPs and both IdPs appear in the
same discovery service, so you can sign in to either SP through either IdP. See
[`plan.md`](plan.md) for the full design and [`pre-plan.md`](pre-plan.md) for the
original sketch.

## Layout

```
docker-compose.yml      eight services (plan §1)
.env.example            copy to .env and edit
scripts/
  gen-certs.sh          one-time SAML keypairs + htpasswd + embeds X509 into the XML
  gen-tls-local.sh      TLS_MODE=local: mints browser TLS certs into certs/
  render.sh             fills every *.tmpl from .env (+ cert bodies)
  up.sh                 bring-up wrapper; the only thing that branches on TLS_MODE
metadata/               XML EntityDescriptors (.tmpl) + discojson + trustinfo
  logos/                invented per-entity SVG logos; render.sh inlines each as
                        a data: URL into metadata.json + the SAML descriptors
idp/                    Dockerfile (extends the Shibboleth IdP image) + mounted
                        config; config/views/login.vm brands the login page logo
idp2/                   second IdP's per-instance config (idp.properties +
                        attribute-resolver + credentials + views/login.vm); shares
                        idp/'s image and its static metadata-providers/filter/authn
sp1/  sp2/              Apache + mod_shib; all config is mounted, image is generic
certs/                  nginx-proxy TLS material (gitignored)
```

Files ending in `.tmpl` are templates; `render.sh` produces the real file next to
them (without the suffix). The rendered files, the `.env`, the generated keys and
`certs/` are all gitignored.

**Logos.** Every entity (both real IdPs, the four mock IdPs, and both SPs) gets an
invented SVG under `metadata/logos/`. `render.sh` base64-encodes each into an
inline `data:` URL and substitutes it as the entity's `entity_icon_url` in
`metadata.json` (shown in the discovery search) and as `<mdui:Logo>` in the SAML
descriptors — so no logo needs separate hosting. The two real IdPs also brand
their Shibboleth login page: `idp/config/views/login.vm` and
`idp2/config/views/login.vm` are copies of the stock view with the header logo
replaced by that IdP's SVG inlined directly (the stock `idp.logo` message can't be
a `data:` URL because the view prefixes it with the `/idp` context path). To
restyle a logo, edit the SVG and re-run `render.sh`.

## Prerequisites

- Docker + Docker Compose v2, `openssl`, `gettext` (`envsubst`).
- Run everything from this directory (`thiss-js/demo-site`). The two source
  repos are built locally (no registry):
  - **thiss-js** is the parent of this directory — build context `..`.
  - **thiss-mdq** is a sibling of `thiss-js` — build context `../../thiss-mdq`.

  So the expected on-disk layout is:

  ```
  <somewhere>/
    thiss-js/          # this repo (built from its root Dockerfile + dist-pre/)
      demo-site/       # <- run docker compose / scripts from here
    thiss-mdq/         # sibling repo
  ```
- For `TLS_MODE=local`, [`mkcert`](https://github.com/FiloSottile/mkcert) is
  recommended (it installs a trusted local CA); otherwise a self-managed openssl
  CA is used and you must import `certs/local-ca.crt` into each test browser.

## Bring-up (plan §9)

```bash
cp .env.example .env
$EDITOR .env                 # TLS_MODE, domains, VM_IP or LETSENCRYPT_EMAIL, demo user

./scripts/gen-certs.sh       # once: SAML keypairs + htpasswd, embeds certs, renders templates
docker compose build         # builds thiss (from ../) and mdq (from ../thiss-mdq) and the SP image
./scripts/up.sh              # renders again, handles TLS mode, docker compose up -d
```

`up.sh` does the mode-specific work:

- **`TLS_MODE=local`** (default): runs `gen-tls-local.sh`, prints the `/etc/hosts`
  line to add on every test machine (`<VM_IP> idp.org login.uni-cazalla.net
  sp1.org sp2.org md.sa.org service.sa.org`), then `docker compose up -d` without
  acme-companion.
- **`TLS_MODE=letsencrypt`**: checks the names resolve publicly, then
  `COMPOSE_PROFILES=letsencrypt docker compose up -d`. Requires public DNS for
  names you **own** and inbound `:80` for the HTTP-01 challenge.

Switching modes is a one-line `.env` edit plus re-running `up.sh`.

## End-to-end test (plan §9)

1. `https://md.sa.org/entities/?q=demo` → JSON listing both real IdPs + mock IdPs.
2. `https://service.sa.org/ds/` → search UI loads; typing shows IdPs.
3. `https://sp1.org/` → public page + SeamlessAccess button renders.
4. Click the button → `service.sa.org/ds` with the SP params → pick **either**
   "Demo IdP" (`idp.org`) **or** "Universidad de Cazalla" (`login.uni-cazalla.net`).
5. Authenticate at the chosen IdP as `${DEMO_USER}` / `${DEMO_PASS}` (the login is
   the same at both; the released identity — displayName / mail / scoped eppn —
   differs so you can tell which institution you used).
6. SAML POST back to `sp1.org/Shibboleth.sso/SAML2/POST` → `/secure/` content shows.
7. Repeat on `sp2.org` → no re-prompt (SSO across both SPs). Both SPs accept both
   IdPs, so the same applies whichever IdP you picked.

## Failure triage (plan §9 / §10)

- **Button 404 / blank** → `service.sa.org` cert or CORS. Check view-source of
  `https://service.sa.org/ds/` for the baked `MDQ_URL`, and hit
  `https://md.sa.org/entities/?q=` directly.
- **Empty DS search** → only `type:"idp"` entities are indexed; verify
  `metadata.json` and the `MDQ_URL` value.
- **All `/Shibboleth.sso/*` handlers 404 (and no `native.log`)** → mod_shib is
  declining the handlers because the request it reconstructs (`http://host:80`)
  doesn't match the absolute `handlerURL` (`https://host:443`). The vhost needs
  `ServerName https://<host>` + `UseCanonicalName On` (already in
  `apache-vhost.conf.tmpl`) so Apache builds external-https self URLs. Note a
  `docker compose restart` of an SP leaves a stale `shibd.sock` and crash-loops
  with `listener failed to initialize` — use `up -d --force-recreate <sp>`.
- **IdP login page shows `Login Failure: Invalid salt value: …`** → the htpasswd
  hash is bcrypt (`$2a$`/`$2y$`), which `HTPasswdValidator` can't verify. Use
  SHA-512 crypt (`$6$`); `gen-certs.sh` already does. Note this surfaces only on
  the login page, not in the IdP logs at default level.
- **IdP SSO returns `Invalid relying party configuration` /
  `RelyingPartyResolverService is unavailable`** → the mounted `idp.properties`
  is incomplete; it must be the full image default with only entityID/scope
  changed (see the IdP caveat above).
- **Login loop / "no SSO endpoint"** → entityID or endpoint mismatch, or
  forwarded-proto emitting `http://...`. Compare the SP metadata ACS locations
  against `https://sp1.org/Shibboleth.sso/Metadata` and regenerate if needed
  (plan §10.5).
- **502 on `service.sa.org` / `thiss` crash-looping** with `host not found in
  upstream "md.sa.org"` → `MDQ_HOSTPORT` must be the internal service address
  (`mdq:3000`), not the public `${MDQ_HOST}`; nginx resolves that upstream at
  startup and the public name doesn't resolve inside the container.
- **Logged in but `/secure/` empty** → `attribute-filter.xml` not releasing to
  that SP entityID.

## IdP caveat (plan §10.3) — read before debugging the IdP

The Shibboleth IdP is the most image-version-sensitive part:

- `IDP_IMAGE` in `.env` pins the image. Default is **`i2incommon/shib-idp:latest5`**
  — the Internet2/InCommon image (Shibboleth IdP **v5**), the maintained
  successor of the abandoned `unicon/shibboleth-idp` (which never went past v3).
  Pin a dated tag (e.g. `5.1.6_20251106_rocky9_multiarch`) for reproducibility.
  The static-user login uses a `shibboleth.HTPasswdValidator` bean, available in
  IdP ≥ 4.1 and so present in v5. The htpasswd entry must be **SHA-512 crypt
  (`$6$`)**, written by `gen-certs.sh` via `openssl passwd -6` — the validator
  delegates to Apache Commons Codec `Crypt` (`$1$`/`$5$`/`$6$`), which does
  **not** support bcrypt; a `$2a$`/`$2y$` entry fails login with
  `Invalid salt value: …`.
- The bind-mounted `idp.properties` is a **complete** copy of the image default
  (only `idp.entityID`/`idp.scope` overridden + the Password flow). Mounting a
  partial file drops required properties (`idp.signing.cert`, `idp.sealer.*`,
  `idp.additionalProperties`, …) and the IdP fails with
  `RelyingPartyResolverService is unavailable` / `Invalid relying party
  configuration`. Re-diff after an image bump:
  `docker run --rm --entrypoint cat <image> /opt/shibboleth-idp/conf/idp.properties`.
- The compose file fronts the IdP with `VIRTUAL_PORT=443` + `VIRTUAL_PROTO=https`,
  because this image serves its own Tomcat HTTPS on **:443**. nginx-proxy
  re-encrypts to it without verifying its self-signed cert, so the browser still
  sees nginx-proxy's trusted cert. (`docker compose ps idp` shows `443/tcp`; if a
  future tag moves the connector, set `VIRTUAL_PORT` to whatever
  `ss -ltnp` reports inside the container.)
- Because the IdP serves on the default https port 443, its self-generated URLs
  are clean `https://${IDP_HOST}/...` with no port to leak. `/idp/status` returns
  **403 through the proxy** by design (it's restricted to localhost) — that's not
  a fault; the container's own health check hits it on `127.0.0.1` and gets 200.
- The mounted config (`idp.properties`, `attribute-resolver/-filter`,
  `metadata-providers.xml`, `password-authn-config.xml`) uses the standard v4/v5
  schemas and overrides the image's baked defaults at the usual
  `/opt/shibboleth-idp/...` paths.
- The IdP signing/encryption keypair generated by `gen-certs.sh` is mounted over
  the image's own credentials so it matches the cert embedded in
  `idp-metadata.xml`. Keep them in sync — re-run `gen-certs.sh --force` to rotate
  both at once.
