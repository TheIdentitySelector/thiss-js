# Shibboleth IdP for the demo. We extend the upstream image and rely on
# docker-compose bind mounts for all demo-specific config (idp.properties,
# metadata-providers, attribute-resolver/filter, credentials, htpasswd) so the
# image itself stays generic and rebuild-free when domains change.
#
# NOTE (plan §10.3): the unicon image is the most version-sensitive part of the
# stack. This expects an image that serves the IdP over plain HTTP on :8080
# behind the TLS-terminating nginx-proxy and honours X-Forwarded-Proto. If your
# pinned tag only exposes https on :4443, set VIRTUAL_PORT=4443 +
# VIRTUAL_PROTO=https on the idp service in docker-compose.yml instead.
ARG IDP_IMAGE=unicon/shibboleth-idp:4.1.0
FROM ${IDP_IMAGE}

# All runtime config arrives via bind mounts (see docker-compose.yml).
