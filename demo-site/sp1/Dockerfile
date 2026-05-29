# Generic Apache + mod_shib service provider. No demo-specific config is baked
# in — shibboleth2.xml, the vhost, credentials, the IdP metadata and the HTML
# all arrive via docker-compose bind mounts, so the same image serves sp1 and
# sp2 and never needs rebuilding when domains change.
FROM debian:bookworm

RUN apt-get update -q \
    && apt-get install -yy --no-install-recommends \
        apache2 libapache2-mod-shib ca-certificates \
    && a2enmod shib headers \
    && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
