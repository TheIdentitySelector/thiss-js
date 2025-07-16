FROM debian:bookworm
MAINTAINER Leif Johansson <leifj@sunet.se>

# Create a non-root user for nginx
RUN groupadd -r nginx && useradd -r -g nginx -s /bin/false -M nginx

RUN apt-get update -q && apt-get install -yy nginx openssl nginx-extras gettext-base

COPY dist-pre /dist
ADD docker/start.sh /
RUN chmod a+rx /start.sh
ADD scripts/subst-vars.sh /
RUN chmod a+rx /subst-vars.sh

# Create necessary directories and set ownership
RUN mkdir -p /var/log/nginx /var/lib/nginx /var/cache/nginx /run/nginx /tmp/nginx && \
    chown -R nginx:nginx /var/log/nginx /var/lib/nginx /var/cache/nginx /run/nginx /tmp/nginx && \
    chmod -R 755 /var/log/nginx /var/lib/nginx /var/cache/nginx /run/nginx /tmp/nginx && \
    chmod -R 644 /dist && \
    find /dist -type d -exec chmod 755 {} \;

ENV BASE_URL "http://localhost/"
ENV COMPONENT_URL "http://localhost/cta/"
ENV PERSISTENCE_URL "http://localhost/ps/"
ENV MDQ_URL "http://localhost:8000/entities/"
ENV SEARCH_URL "http://localhost:8000/api/search"
ENV MDQ_HOSTPORT "localhost:8000"
ENV STORAGE_DOMAIN "localhost"
ENV LOGLEVEL "warn"
ENV DEFAULT_CONTEXT "local"
ENV MIN_SEARCH_LENGTH "3"

ENTRYPOINT ["/start.sh"]
