#!/bin/bash

if [ -f /etc/ssl/private/dhparam.pem ]; then
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

EOF

if [ "x${TLS_CERT}" != "x" -a "x${TLS_KEY}" != "x" ]; then
cat>>/etc/nginx/nginx.conf<<EOF
      listen 443 ssl;
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
      envsubst '${BASE_URL} ${STORAGE_DOMAIN} ${MDQ_URL} ${SEARCH_URL}' < $f > /usr/share/nginx/html/$f
   fi
done

nginx -c /etc/nginx/nginx.conf
