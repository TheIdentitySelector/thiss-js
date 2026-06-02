# Shibboleth IdP for the demo. We extend the upstream image and rely on
# docker-compose bind mounts for all demo-specific config (idp.properties,
# metadata-providers, attribute-resolver/filter, credentials, htpasswd) so the
# image itself stays generic and rebuild-free when domains change.
#
# NOTE (plan §10.3): the IdP image is the most version-sensitive part of the
# stack. Default is i2incommon/shib-idp (Internet2/InCommon — the maintained
# successor of the old TIER/unicon image), Shibboleth IdP v5 on Tomcat. It serves
# its own https on :443, so docker-compose fronts it with VIRTUAL_PORT=443 +
# VIRTUAL_PROTO=https. Pin a dated tag (e.g. 5.1.6_YYYYMMDD_rocky9_multiarch) in
# .env for reproducibility; `latest5` just tracks the newest v5 build.
ARG IDP_IMAGE=i2incommon/shib-idp:latest5
FROM ${IDP_IMAGE}

# All runtime config arrives via bind mounts (see docker-compose.yml).
