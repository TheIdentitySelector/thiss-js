FROM debian:stable
MAINTAINER Leif Johansson <leifj@sunet.se>
RUN apt-get update -q && apt-get install -yy nginx libnginx-mod-http-lua nginx-extras gettext-base
COPY dist /dist
COPY docker/nginx.conf /etc/nginx/nginx.conf
ADD docker/start.sh /
RUN chmod a+rx /start.sh
ENV PUBLIC_HOSTNAME "localhost"
ENV MDQ_HOST "localhost"
ENV MDQ_PORT "8000"
ENV MDQ_URL "http://localhost:8000/entities"
ENV SEARCH_URL "http://localhost:8000/api/search"
ENTRYPOINT ["/start.sh"]
