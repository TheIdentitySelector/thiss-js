FROM debian:stable
MAINTAINER Leif Johansson <leifj@sunet.se>
RUN apt-get update -q && apt-get install -yy nginx libnginx-mod-http-lua nginx-extras
COPY dist /
COPY docker/nginx.conf /etc/nginx/nginx.conf
ADD docker/start.sh /
RUN chmod a+rx /start.sh
ENV PUBLIC_HOSTNAME "localhost"
ENV MDQ_SERVER "localhost:8000"
ENTRYPOINT ["/start.sh"]
