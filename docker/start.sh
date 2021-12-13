#!/bin/bash

if [ ! -f /etc/ssl/private/dhparam.pem ]; then
   openssl dhparam 2048 > /etc/ssl/private/dhparam.pem
fi

cat>/etc/nginx/nginx.conf<<EOF
daemon off;

error_log /dev/stdout warn;

load_module modules/ndk_http_module.so;

events {
    worker_connections 2048;
}

http {
   server {
      include "mime.types";
      charset utf-8;
      charset_types text/html text/xml text/plain text/vnd.wap.wml application/javascript application/rss+xml application/json;
      source_charset utf-8;

EOF

if [ "x${TLS_CERT}" != "x" -a "x${TLS_KEY}" != "x" ]; then
cat>>/etc/nginx/nginx.conf<<EOF
      listen 443 ssl backlog=4096;
      ssl_certificate ${TLS_CERT};
      ssl_certificate_key ${TLS_KEY};
      ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
      ssl_prefer_server_ciphers on;
      ssl_ciphers ECDH+AESGCM:ECDH+AES256:ECDH+AES128:DH+3DES:!ADH:!AECDH:!MD5;
      ssl_dhparam /etc/ssl/private/dhparam.pem;
      ssl_session_cache   shared:SSL:40m;
      ssl_session_timeout 4h;
      ssl_session_tickets on;
EOF
else
cat>>/etc/nginx/nginx.conf<<EOF
      listen 80;
EOF
fi

cat>>/etc/nginx/nginx.conf<<EOF

      location / {
         location ~*  \.html$ {
            sendfile on;
            tcp_nopush on;
            tcp_nodelay on;
            keepalive_timeout 65;
            expires 1h;
            add_header Cache-Control max-age=300, must-revalidate, s-maxage=300, proxy-revalidate
         }
         location ~*  \.(jpg|jpeg|png|gif|svg|ico|css|js|eot|ttf|woff|woff2)$ {
            sendfile on;
            tcp_nopush on;
            tcp_nodelay on;
            keepalive_timeout 65;
            expires 10d;
            add_header Cache-Control: public, max-age=604800, must-revalidate, s-maxage=604800, proxy-revalidate
         }
         root /usr/share/nginx/html;
         try_files \$uri \$uri/index.html \$uri.html @mdq;
      }

      location @mdq {
         proxy_pass http://${MDQ_HOSTPORT};
      }
   }
}
EOF

cd /dist
for f in `find . -printf '%P\n'`; do
   if [ "x$f" != "x" -a -f $f ]; then
      d=`dirname $f`
      mkdir -p /usr/share/nginx/html/$d
      envsubst '${BASE_URL} ${STORAGE_DOMAIN} ${MDQ_URL} ${SEARCH_URL} ${DEFAULT_CONTEXT} ${LOGLEVEL} ${WHITELIST}' < $f > /usr/share/nginx/html/$f
   fi
done

nginx -c /etc/nginx/nginx.conf
