# Plan: SeamlessAccess Docker Compose demo environment

## Context

`pre-plan.md` sketches a Docker Compose demo for SeamlessAccess: five web properties behind `nginx-proxy` + `acme-companion` (Let's Encrypt), running in a VM with DNS configured:

- a **Shibboleth IdP** (`idp.org`),
- a **thiss-mdq** metadata service (`md.sa.org`) serving discojson,
- a **thiss-js** SAML discovery site (`service.sa.org`),
- **two Shibboleth-protected SPs** (`sp1.org`, `sp2.org`), each a single page showing less content when unauthenticated and a SeamlessAccess "Standard Integration" button to reach the IdP.

Domains are configurable. The IdP and the two SPs each have one XML `EntityDescriptor`; the discojson served by thiss-mdq holds those entities plus a few mock IdP entities to populate discovery search.

This plan was validated against the actual behavior of the sibling repos:

- **`thiss-js/Dockerfile` + `docker/start.sh` + `scripts/subst-vars.sh`** — Debian/nginx image, bakes in `dist-pre/<VERSION>/` (both `2.1.179` and the previous version already exist in-repo, so no webpack rebuild is needed). `start.sh` runs `subst-vars.sh` at container start to inject runtime config (`BASE_URL`, `MDQ_URL`, `SEARCH_URL`, `PERSISTENCE_URL`, `COMPONENT_URL`, `STORAGE_DOMAIN`, `MDQ_HOSTPORT`, `MIN_SEARCH_LENGTH`, `MAX_SUGGESTED`, `LOGLEVEL`, …) into the static JS/HTML, then generates `nginx.conf` (listens 80 unless `TLS_CERT`/`TLS_KEY` are set). It serves `/ /ds/ /ps/ /cta/ /result/ /thiss.js` and proxies any unmatched path to `@mdq = http://$MDQ_HOSTPORT`.
- **`thiss-mdq/{index.js,server.js,metadata.js,Dockerfile}`** — Express on `PORT` (default 3000), reads `METADATA` (`/etc/metadata.json`) and `TRUSTINFO` (`/etc/trustinfo.json`), CORS enabled on `/entities/`. **Search (`GET /entities/?q=`) only indexes `type:"idp"` entities**; lookup by `{sha1}<hex>` works for any entity. Plain HTTP unless `SSL_KEY`/`SSL_CERT` are set.
- **`thiss-js/docs/components.rst` + `src/component.js`** — the Standard Integration button, given `loginInitiatorURL`, navigates the top window there; the Shibboleth SP's `SAMLDS` SessionInitiator owns the discovery request/response round trip (the JS does not).

**Decisions taken:** all hostnames are `.env`-driven, and a single `TLS_MODE` switch (default `local`, alternative `letsencrypt`) selects between **private names in `/etc/hosts` with a local CA (no Let's Encrypt)** and **public DNS with Let's Encrypt via acme-companion** — see §8. The same built images run unchanged in either mode (TLS terminates at nginx-proxy). sp1 and sp2 use **separate, independent config trees** (no shared parameterized image).

---

## 1. Services and request flow

Seven services on one user-defined bridge network (`demonet`). Names come from `.env`.

| Service | Image | Domain (`VIRTUAL_HOST` / `LETSENCRYPT_HOST`) | Internal port | Role |
|---|---|---|---|---|
| `nginx-proxy` | `nginxproxy/nginx-proxy` | — (host `80`/`443`) | — | TLS termination, vhost routing |
| `acme-companion` | `nginxproxy/acme-companion` | — | — | Let's Encrypt issuance — **`letsencrypt` profile only** (see §8) |
| `idp` | `unicon/shibboleth-idp` (pinned) | `${IDP_HOST}` | 8080 | SAML IdP |
| `sp1` | own Dockerfile (Apache + mod_shib) | `${SP1_HOST}` | 80 | Protected site 1 |
| `sp2` | own Dockerfile (Apache + mod_shib) | `${SP2_HOST}` | 80 | Protected site 2 |
| `mdq` | build `../thiss-mdq` | `${MDQ_HOST}` | 3000 | discojson MDQ |
| `thiss` | build `../thiss-js` (repo `Dockerfile`) | `${SERVICE_HOST}` | 80 | Discovery SPA + button JS |

**Proxy wiring.** `nginx-proxy` mounts `/var/run/docker.sock:/tmp/docker.sock:ro`, bind-mounts `./certs:/etc/nginx/certs`, and shares named volumes `vhost`, `html`, `conf`; publishes host `80:80` and `443:443`. `acme-companion` is declared with `profiles: ["letsencrypt"]` (so it starts **only** in `TLS_MODE=letsencrypt`), shares the same `./certs` bind mount + `vhost`/`html` volumes + its own `acme` state volume + the socket, with `DEFAULT_EMAIL=${LETSENCRYPT_EMAIL}`. Each backend declares `VIRTUAL_HOST`, `VIRTUAL_PORT`, and single-sources `LETSENCRYPT_HOST` (= its `*_HOST` var) + `LETSENCRYPT_EMAIL`; these `LETSENCRYPT_*` labels are inert in local mode because nothing consumes them. nginx-proxy terminates TLS, so **no backend sets `TLS_CERT`/`SSL_CERT`** — they all listen plain HTTP. The single `./certs` dir holds the certs in both modes: acme-companion writes them in `letsencrypt` mode, `gen-tls-local.sh` writes them in `local` mode (§8).

**End-to-end browser flow:**

1. User visits `https://sp1.org/` → Apache serves the public part of the page (`/` not protected).
2. Page loads `https://service.sa.org/thiss.js` and renders the button via `thiss.DiscoveryComponent({loginInitiatorURL, entityID}).render('#login')`.
3. Click → top window navigates to `https://sp1.org/Shibboleth.sso/Login?target=https://sp1.org/secure/`.
4. The SP `SAMLDS` SessionInitiator redirects to `https://service.sa.org/ds/?entityID=<sp1>&return=<SP discovery response>`.
5. The DS page calls `https://md.sa.org/entities/?q=...` (CORS) and lists `idp.org` + mock IdPs.
6. User picks `idp.org` → DS returns the chosen `entityID` to the SP discovery response.
7. SP issues a SAML AuthnRequest → user authenticates at `idp.org` → SAML Response posts to `sp1.org/Shibboleth.sso/SAML2/POST` → session created → redirect to `target` → protected content rendered.

## 2. thiss-js (`thiss`) configuration

Because thiss-mdq enables CORS, the browser calls MDQ **directly cross-origin** (no server-side proxy of `/entities`).

**What actually gets injected.** `subst-vars.sh` runs `envsubst` with a fixed allowlist — only these names are substituted into the built `.js`/`.html`/`.css`: `$MDQ_URL,$PERSISTENCE_URL,$SEARCH_URL,$STORAGE_DOMAIN,$LOGLEVEL,$COMPONENT_URL,$WHITELIST,$DEFAULT_CONTEXT,$BASE_URL,$MIN_SEARCH_LENGTH,$SAA_COMPLIANT_BROWSERS`. Any env var outside that list is **not** injected into the SPA. `MDQ_HOSTPORT` is consumed separately by `start.sh` when it generates `nginx.conf` (the `@mdq` fallback `proxy_pass`), not by `envsubst`.

Compose `environment:` for the `thiss` service:

- `BASE_URL=https://${SERVICE_HOST}/`
- `MDQ_URL=https://${MDQ_HOST}/entities/`
- `SEARCH_URL=https://${MDQ_HOST}/entities/` (overrides the Dockerfile default `…/api/search`, which targets pyFF; thiss-mdq serves search at `GET /entities/?q=`)
- `COMPONENT_URL=https://${SERVICE_HOST}/cta/`
- `PERSISTENCE_URL=https://${SERVICE_HOST}/ps/`
- `STORAGE_DOMAIN=${SA_DOMAIN}` (origin the cross-domain persistence iframe keys to)
- `MDQ_HOSTPORT=${MDQ_HOST}` (nginx `@mdq` fallback only — rarely hit, since the browser reaches MDQ directly via `MDQ_URL`)
- `MIN_SEARCH_LENGTH=2`, `LOGLEVEL=info`

**`MAX_SUGGESTED` is not configurable here.** It is absent from the `envsubst` allowlist, and in the pinned `2.1.179` bundle `process.env.MAX_SUGGESTED` was compiled to a non-functional reference (`"MISSING_ENV_VAR".MAX_SUGGESTED` → `undefined`), so the suggested-IdP count falls back to the hard-coded default (5). Changing it would require a webpack rebuild with the var defined at build time — out of scope for this prebuilt-`dist-pre/` plan. Do not set it in compose expecting an effect.

Build: `build: { context: ../thiss-js, dockerfile: Dockerfile, args: { VERSION: ${THISS_VERSION}, PREV_VERSION: ${THISS_PREV_VERSION} } }`. `subst-vars.sh` injects the env values at container start.

## 3. Shibboleth IdP

Image `unicon/shibboleth-idp` (pin a tag). Internal port 8080 → `VIRTUAL_PORT=8080`; nginx-proxy fronts TLS.

Mounted config under `demo-site/idp/config/` → image config paths:

- `conf/idp.properties` — `idp.entityID=${IDP_ENTITYID}`, `idp.scope=idp.org`.
- `credentials/idp-signing.{crt,key}`, `idp-encryption.{crt,key}` — generated once (see §5); must match the certs in the IdP `EntityDescriptor`.
- `metadata/idp-metadata.xml` (own descriptor) + `metadata/sp1-metadata.xml` + `metadata/sp2-metadata.xml`.
- `conf/metadata-providers.xml` — `FilesystemMetadataProvider`(s) loading the two SP metadata files so the IdP trusts both SPs.
- `conf/attribute-resolver.xml` — minimal static `eduPersonPrincipalName`, `displayName`, `mail` for the demo user.
- `conf/attribute-filter.xml` — release those attributes to `${SP1_ENTITYID}` and `${SP2_ENTITYID}` (`Requester` policy rule).
- One demo user `${DEMO_USER}` / `${DEMO_PASS}` (image built-in demo account, or a minimal static credential).

**Risk flags:** forwarded-proto (IdP must emit `https://idp.org/...` while serving HTTP on 8080 behind the proxy); attribute release; cert/entityID consistency between XML, keys, and config.

## 4. Shibboleth SPs (separate per-SP configs)

`demo-site/sp1/` and `demo-site/sp2/` each have a full independent tree:

- `Dockerfile` — `FROM debian:bookworm`, install `apache2 libapache2-mod-shib`, copy in config + page.
- `shibboleth2.xml` — `entityID="${SPn_ENTITYID}"`; discovery via `<SSO discoveryProtocol="SAMLDS" discoveryURL="https://${SERVICE_HOST}/ds">SAML2</SSO>`; `<MetadataProvider type="XML" path="/etc/shibboleth/idp-metadata.xml"/>`; `<CredentialResolver>` for the SP keypair; `<Sessions handlerURL="/Shibboleth.sso" handlerSSL="true" cookieProps="https">`.
- `apache-vhost.conf` — `/` public (no `require shibboleth`); `<Location /secure>` with `AuthType shibboleth` / `ShibRequestSetting requireSession 1` / `Require shib-session`; `/Shibboleth.sso` handler enabled; forwarded-proto handling so shibd builds `https://spN.org/...` URLs.
- `credentials/sp-signing.{crt,key}`, `sp-encryption.{crt,key}`.
- `html/index.html` (public, embeds the button) + `html/secure/index.html` (protected, reached via the button `target`).

Public page button embed (values templated from `.env`):

```html
<script src="https://service.sa.org/thiss.js"></script>
<div id="login"></div>
<script>
  window.onload = function () {
    thiss.DiscoveryComponent({
      loginInitiatorURL: 'https://sp1.org/Shibboleth.sso/Login?target=https://sp1.org/secure/',
      entityID: 'https://sp1.org/shibboleth'
    }).render('#login');
  };
</script>
```

The SP — not the JS — owns the discovery round trip, so no `discoveryRequest`/`discoveryResponse` in the JS is needed.

**Risk flag:** reverse-proxied Shibboleth SPs most commonly break on forwarded-proto — ensure Apache/shibd honor `X-Forwarded-Proto` so AuthnRequest/ACS URLs are `https://...`, not `http://...:80/...`.

## 5. Metadata story

**XML (`demo-site/metadata/`, single source of truth):** three `EntityDescriptor` files — `idp-metadata.xml`, `sp1-metadata.xml`, `sp2-metadata.xml`. Trust wiring: IdP loads both SP metadata; each SP loads the IdP metadata.

**discojson `metadata.json` for MDQ:** discovery search lists only IdPs (`metadata.js` indexes only `type:"idp"`), so include:

- the real `idp.org` IdP (`type:"idp"`),
- 3–4 visible **mock IdPs** (`type:"idp"`, clearly labelled), to give search results,
- `sp1`/`sp2` as `type:"sp"` (recommended, not just for logos): the DS resolves the **requesting SP** entity by its `entityID` (`src/ds/index.js`, `discovery_client("sp")`) to show the SP title and to validate the `return` param against that SP's `discovery_responses`. Without an SP entry the DS can't display the SP name; without `discovery_responses` on it the return-URL warning is simply skipped.

Plus a minimal `trustinfo.json` (`[]`) to satisfy the loader.

**IdP entity shape** (no `discovery_responses` — that field is read off the *SP* entity, never the IdP):

```json
{
  "entityID": "https://idp.org/idp/shibboleth",
  "entity_id": "https://idp.org/idp/shibboleth",
  "type": "idp",
  "title": "Demo IdP",
  "title_langs": {"en": "Demo IdP"},
  "descr_langs": {"en": "SeamlessAccess demo identity provider"},
  "domain": "idp.org",
  "scope": "idp.org",
  "entity_icon_url": {"url": "https://idp.org/logo.png", "width": "120", "height": "120"},
  "keywords": "demo+idp",
  "hidden": "false"
}
```

**SP entity shape** (one per SP; this is where `discovery_responses` lives — each SP lists only its *own* DS return endpoint(s), so the DS validates `return` against the SP that issued the request):

```json
{
  "entityID": "https://sp1.org/shibboleth",
  "entity_id": "https://sp1.org/shibboleth",
  "type": "sp",
  "title": "Demo SP 1",
  "title_langs": {"en": "Demo SP 1"},
  "discovery_responses": ["https://sp1.org/Shibboleth.sso/DS"]
}
```

(`{sha1}` id is computed by MDQ at load. The DS matches `return` with `startsWith`, so the listed prefix must match the SP's actual discovery-response URL.)

**Consistency:** single-source entityIDs via `.env` and reuse the same strings in the XML, the SP `shibboleth2.xml`, the IdP `attribute-filter.xml`, the discojson, and the button JS. **Certificates:** SAML signing/encryption keypairs (separate from the TLS certs) are generated once by `demo-site/scripts/gen-certs.sh`, which also embeds the `<ds:X509Certificate>` bodies into the three XML descriptors.

## 6. Directory layout

```
demo-site/
  pre-plan.md                 (exists)
  plan.md                     (this file)
  docker-compose.yml
  .env.example                (committed)
  .env                        (operator-created, gitignored)
  scripts/
    gen-certs.sh              (one-time SAML keypair + X509 embed helper)
    gen-tls-local.sh          (TLS_MODE=local: mkcert / local-CA TLS certs for all hosts -> certs/)
    up.sh                     (bring-up wrapper; reads TLS_MODE, sets COMPOSE_PROFILES / runs gen-tls-local.sh)
  certs/                      (nginx-proxy TLS material, bind-mounted; gitignored — LE writes it, or gen-tls-local.sh does)
  idp/
    Dockerfile                (optional, extends unicon/shibboleth-idp)
    config/
      conf/{idp.properties,metadata-providers.xml,attribute-resolver.xml,attribute-filter.xml,authn/...}
      credentials/{idp-signing,idp-encryption}.{crt,key}
      metadata/{idp,sp1,sp2}-metadata.xml
  sp1/
    Dockerfile
    shibboleth2.xml
    apache-vhost.conf
    attribute-map.xml         (optional)
    credentials/{sp-signing,sp-encryption}.{crt,key}
    html/index.html
    html/secure/index.html
  sp2/
    (same independent structure as sp1)
  metadata/
    {idp,sp1,sp2}-metadata.xml
    metadata.json             (discojson for MDQ)
    trustinfo.json            ([])
```

Mount `metadata/metadata.json`→`/etc/metadata.json` and `metadata/trustinfo.json`→`/etc/trustinfo.json` into MDQ; mount the XML read-only into IdP and SPs.

`.env.example` keys:

- **TLS/DNS mode:** `TLS_MODE=local` (or `letsencrypt`); `VM_IP=` (local mode only — the address put in client `/etc/hosts`); `LETSENCRYPT_EMAIL=` (letsencrypt mode only — left blank in local mode).
- **Domains (configurable):** `SA_DOMAIN=sa.org`, `IDP_HOST=idp.org`, `SP1_HOST=sp1.org`, `SP2_HOST=sp2.org`, `MDQ_HOST=md.sa.org`, `SERVICE_HOST=service.sa.org`. (Examples only — replace with names you own when `TLS_MODE=letsencrypt`.)
- **SAML / build / user:** `IDP_ENTITYID`, `SP1_ENTITYID`, `SP2_ENTITYID`, `THISS_VERSION=2.1.179`, `THISS_PREV_VERSION`, `DEMO_USER`, `DEMO_PASS`.

## 7. Build vs pull

- **Pull:** `nginx-proxy`, `acme-companion`, `unicon/shibboleth-idp`, the Debian/Apache SP base.
- **Build locally:** `thiss` from `../thiss-js` (existing `dist-pre/`), `mdq` from `../thiss-mdq` (its `Dockerfile`, `FROM node:20`).
- The VM needs the sibling repos present (or pre-built images pushed to a registry, switching compose to `image:`). Building on the VM from the sibling repos needs no registry.

## 8. DNS + TLS — one switch (`TLS_MODE`), chosen at bring-up

All hostnames are `.env`-driven (`IDP_HOST`, `SP1_HOST`, `SP2_HOST`, `MDQ_HOST`, `SERVICE_HOST` — §6), and the same built images run unchanged in either mode (TLS terminates at nginx-proxy, so no backend ever sets `TLS_CERT`/`SSL_CERT`). A single `.env` variable, `TLS_MODE`, selects how the names resolve and where certs come from. The compose file is identical for both modes; the choice is enforced by the `scripts/up.sh` bring-up wrapper (or `make up`), which is the only place that branches:

- it sets `COMPOSE_PROFILES=letsencrypt` **only** when `TLS_MODE=letsencrypt` (so `acme-companion` starts only then), and
- it runs `scripts/gen-tls-local.sh` **only** when `TLS_MODE=local`.

**`TLS_MODE=local` (default) — private names, no Let's Encrypt.**

- Names resolve via the client `/etc/hosts`: add `${VM_IP} ${IDP_HOST} ${SP1_HOST} ${SP2_HOST} ${MDQ_HOST} ${SERVICE_HOST}` on every test machine (the §9 helper prints the exact line from `.env`).
- `scripts/gen-tls-local.sh` mints certs once (mkcert, or an openssl local CA) for all five hosts into `./certs/` as `<host>.crt` / `<host>.key`; nginx-proxy consumes them from the bind-mounted `./certs` by filename.
- `acme-companion` does **not** start; the backends' `LETSENCRYPT_*` labels are inert.
- Trust the local CA in the test browser (`mkcert -install`, or import the generated CA cert). No public DNS and no inbound :80 required.

**`TLS_MODE=letsencrypt` — public DNS, automatic certs.**

- Requires public A/AAAA records for all five hosts pointing at the VM, plus inbound :80 reachable for the HTTP-01 challenge — i.e. names you actually **own**. The `*.org` values in `.env.example` are placeholders; set real domains.
- `acme-companion` (started via the `letsencrypt` profile) issues/renews per each backend's `LETSENCRYPT_HOST` (= its `VIRTUAL_HOST`) and `DEFAULT_EMAIL=${LETSENCRYPT_EMAIL}`, writing into the same `./certs`.
- No `/etc/hosts` edits, no local CA, no `gen-tls-local.sh`.

Because the only differences are "does acme-companion run" and "who fills `./certs`", switching modes is a one-line `.env` edit plus a re-run of `up.sh`.

## 9. Verification / bring-up

**Order:** ensure sibling repos present → `cp .env.example .env` and edit `TLS_MODE`, domains, email/`VM_IP`, user → run `scripts/gen-certs.sh` once (SAML keypairs + X509 embed) → `docker compose build` (thiss, mdq) → `scripts/up.sh` (the §8 wrapper) → wait for IdP first-boot init and MDQ "loaded N objects". `up.sh` does the mode-specific work:

- **`TLS_MODE=local`:** runs `gen-tls-local.sh` (TLS certs → `./certs`), prints the `/etc/hosts` line to add on test machines, then `docker compose up -d` (no `letsencrypt` profile).
- **`TLS_MODE=letsencrypt`:** verifies the domains resolve publicly and :80 is reachable, then `COMPOSE_PROFILES=letsencrypt docker compose up -d` and waits for acme-companion to populate `./certs`.

**End-to-end test:**

1. `https://md.sa.org/entities/?q=demo` → JSON listing the IdP + mock IdPs (MDQ + metadata OK).
2. `https://service.sa.org/ds/` → search UI loads, typing shows IdPs (thiss-js → MDQ CORS via baked `MDQ_URL`).
3. `https://sp1.org/` → public content + SeamlessAccess button render (thiss.js loads cross-origin).
4. Click button → redirected to `service.sa.org/ds` with SP params → pick "Demo IdP".
5. Redirected to `idp.org` → authenticate as `${DEMO_USER}` / `${DEMO_PASS}`.
6. SAML POST back to `sp1.org/Shibboleth.sso/SAML2/POST` → redirect to `/secure/` → protected content visible (full SSO + attribute release).
7. Repeat on `sp2.org` → seamless SSO (existing IdP session, no re-prompt) → proves multi-SP federation.

**Failure triage:** button 404 → `service.sa.org` cert / CORS; empty DS search → check baked `MDQ_URL` (view-source) and hit `md.sa.org/entities/?q=` directly; login loop / "no SSO endpoint" → IdP/SP entityID or endpoint mismatch, or forwarded-proto emitting `http://...:8080`; logged in but protected content empty → `attribute-filter.xml` not releasing to that SP entityID.

## 10. Risk callouts (priority order)

1. **TLS/DNS mode** — pick `TLS_MODE` (§8) up front: `local` (private names in `/etc/hosts` + local CA, the default for a lab VM) or `letsencrypt` (needs real public DNS for names you own + inbound :80). The `*.org` example domains only work in `local` mode.
2. **Reverse-proxy forwarded-proto** so IdP and SPs emit `https://<host>` URLs while listening on plain HTTP behind nginx-proxy.
3. **IdP authn method decision** — §3's "built-in demo account or static credential" must be pinned down *before* building; the `unicon/shibboleth-idp` authn config is the most fragile part of bring-up. Decide the mechanism and where `${DEMO_USER}`/`${DEMO_PASS}` live up front, not at debug time.
4. **IdP attribute release + metadata trust** round trip.
5. **SP metadata ↔ shibd endpoint consistency** — hand-authored SP `EntityDescriptor`s (§5) must match the ACS locations/bindings `mod_shib` actually advertises for each entityID, or login fails with "no SSO endpoint"/binding mismatch. Prefer generating each SP's metadata from `https://${SPn_HOST}/Shibboleth.sso/Metadata` and trimming, over authoring by hand.
6. **entityID / SAML X509 sync** across the three XML files, the discojson, and the SP/IdP configs — handled by `.env` single-sourcing and `gen-certs.sh`.
7. **Config-injection contract** — only the `envsubst`-allowlisted vars (§2) reach the SPA; `MAX_SUGGESTED` in particular does **not**, and silently defaults to 5. Verify injected values with view-source on `https://${SERVICE_HOST}/ds/` before deeper debugging.
