FROM debian:stable
MAINTAINER Leif Johansson <leifj@sunet.se>
RUN apt-get update -q && apt-get install -yy nginx libnginx-mod-http-lua nginx-extras gettext-base
COPY dist /dist
COPY docker/nginx.conf /etc/nginx/nginx.conf
ADD docker/start.sh /
RUN chmod a+rx /start.sh
ENV BASE_URL "http://localhost"
ENV COMPONENT_URL "http://localhost/cta"
ENV PERSISTENCE_URL "http://localhost/ps"
ENV MDQ_URL "http://localhost:8000/entities"
ENV SEARCH_URL "http://localhost:8000/api/search"
ENV STORAGE_DOMAIN "localhost"
ENV LOGLEVEL "warn"
ENV DEFAULT_CONTEXT "local"
ENTRYPOINT ["/start.sh"]
