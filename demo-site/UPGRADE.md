# Upgrading a running demo site

This file covers two kinds of change to a demo that is already up: a new
thiss-js version in the `thiss` service, and new demo-site configuration
pulled from git. Commands run from `thiss-js/demo-site`. `plan.md` has the
design; `README.md` the first bring-up.

## 1. A new thiss-js version

The `thiss` image bakes in `../dist-pre/<THISS_VERSION>` (root `Dockerfile`:
`COPY dist-pre /dist`). A new version therefore needs a build of the
application, a new image, and a recreated container.

1. In the repo root, set `VERSION` in the `Makefile` and run `make build`. It
   writes `dist-pre/<VERSION>/` and checks the wire surface.
2. In `.env`, set `THISS_VERSION` to that version and `THISS_PREV_VERSION` to
   the version that was running.
3. Rebuild and recreate only that service:

   ```bash
   docker compose build thiss
   docker compose up -d thiss
   ```

   `up.sh` alone does not rebuild an image whose build context changed.
4. Check `https://${SERVICE_HOST}/ds/` with view-source: the injected
   `MDQ_URL` and friends must still be the demo's values.

Browsers cache the entry points (`/thiss.js`, `/cta/`, `/ds/`, `/ps/`)
independently, so for a while a page can run an old button against a new
persistence service (`docs/install.rst`, "Upgrading a running instance").
Releases are built to tolerate that. The demo deploys the release form directly
(`PRE_RELEASE` is not set, so `/new/` is not served); the pre-release rehearsal
with `/new/upgrade-test/` is a production procedure, not a demo one. Clear the
site data for `${SERVICE_HOST}` in the browser when a stale entry point gets in
the way of a test.

## 2. New demo-site configuration from git

After `git pull`, in this order:

1. **`.env` keys.** New templates may need new variables. Compare:

   ```bash
   diff <(grep -o '^[A-Z0-9_]*=' .env.example | sort) <(grep -o '^[A-Z0-9_]*=' .env | sort)
   ```

   Add the missing keys to `.env`. `render.sh` leaves an unset variable empty
   without complaint; `gen-certs.sh` and `up.sh` stop on it (`set -u`).
2. **SAML keys and htpasswd.** `./scripts/gen-certs.sh` keeps existing keypairs
   and generates only the missing ones, rewrites every htpasswd from `.env`,
   re-stashes the certificate bodies and renders the templates.
3. **TLS certificates and hosts.** `./scripts/up.sh` renders again, mints TLS
   certificates for hosts that have none (`TLS_MODE=local`), prints the full
   `/etc/hosts` line, and runs `docker compose up -d`. Update `/etc/hosts` on
   every test machine when the line grew.
4. **Containers.** `docker compose up -d` recreates services whose definition
   changed (new mounts, new services) and leaves the others running. Changes
   that live inside a mounted file need a restart of the service that reads it:

   | changed | then |
   |---|---|
   | `metadata/metadata.json` (rendered) | `docker compose restart mdq` (read at start) |
   | an IdP's `conf/`, `credentials/`, `views/` | `docker compose restart idp` (or `idp2`, `idp3`) |
   | an SP's `shibboleth2.xml`, vhost, metadata mounts | `docker compose up -d --force-recreate sp1` (or `sp2`); a plain `restart` leaves a stale `shibd.sock` and the SP crash-loops |
   | `sp*/html/*.tmpl` | nothing: Apache serves the rendered file from the bind mount |
   | `sp1/html/extra-md.json` | nothing: served by SP1's Apache from the html bind mount |
   | `docker-compose.yml` | `docker compose up -d` |

Recreating an IdP container regenerates its sealer key, which invalidates the
sessions it issued; users log in again. Browser-persisted institution choices
live in the browser under the `DEFAULT_CONTEXT` context and survive every step
above.

## 3. Change log

### 2026-10-22: suggested institutions and filtering-in move to SP1 (plan §12)

- `./scripts/up.sh` (or `render.sh`): renders `sp1/html/extra-md.json`; the
  stale `sp2/html/extra-md.json` can be deleted.
- `docker compose up -d --force-recreate sp1 sp2`: SP1 gains the
  `idp3-metadata.xml` mount, SP2 loses it; both vhosts and `shibboleth2.xml`
  changed.
- Verify with README steps 8 to 12 (now on SP1).

### 2026-10-21: third IdP and filtering-in (plan §11)

Needs thiss-js 4.0.12 or later in the `thiss` service (section 1).

- `.env`: add `IDP3_HOST`, `IDP3_ENTITYID`, `IDP3_SCOPE`, `DEMO3_USER`,
  `DEMO3_PASS`, `DEMO3_DISPLAYNAME`, `DEMO3_MAIL` from `.env.example`.
- `./scripts/gen-certs.sh`: generates `idp3/config/credentials/` and renders
  `metadata/idp3-metadata.xml` and `sp2/html/extra-md.json` (since
  2026-10-22: `sp1/html/extra-md.json`).
- `./scripts/up.sh`: a TLS certificate for `${IDP3_HOST}`, one more name in the
  `/etc/hosts` line, the new `idp3` service (same image as `idp`, no rebuild),
  and `sp2` recreated for its new metadata mount.
- Verify with README steps 8 to 12.
