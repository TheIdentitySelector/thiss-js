#!/bin/bash

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
   cat>/etc/ssl/private/dhparam.pem<<EOF
-----BEGIN DH PARAMETERS-----
MIIBCAKCAQEA//////////+t+FRYortKmq/cViAnPTzx2LnFg84tNpWp4TZBFGQz
+8yTnc4kmz75fS/jY2MMddj2gbICrsRhetPfHtXV/WVhJDP1H18GbtCFY2VVPe0a
87VXE15/V8k1mE8McODmi3fipona8+/och3xWKE2rec1MKzKT0g6eXq8CrGCsyT7
YdEIqUuyyOP7uWrat2DX9GgdT0Kj3jlN9K5W7edjcrsZCwenyO4KbXCeAvzhzffi
7MA0BM0oNC9hkXL+nOmFg/+OTxIy7vKBg8P+OxtMb61zO7X8vC7CIAXFjvGDfRaD
ssbzSibBsu/6iGtCOGEoXJf//////////wIBAg==
-----END DH PARAMETERS-----
EOF
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

export CACHE_CONTROL=${CACHE_CONTROL:-"public, max-age=36000, must-revalidate, s-maxage=36000, proxy-revalidate"}

cat>>/etc/nginx/nginx.conf<<EOF

      location / {
         location ~*  \.(jpg|jpeg|png|gif|svg|ico|html|json|css|js|eot|ttf|woff|woff2)$ {
            sendfile on;
            tcp_nopush on;
            tcp_nodelay on;
            keepalive_timeout 65;
            add_header 'Cache-Control' '${CACHE_CONTROL}';
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
