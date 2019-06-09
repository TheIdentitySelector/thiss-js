#!/bin/bash

cd /dist
for f in `find . -printf '%P\n'`; do
   if [ "x$f" != "x" -a -f $f ]; then
      d=`dirname $f`
      mkdir -p /usr/share/nginx/html/$d
      envsubst '${BASE_URL} ${STORAGE_DOMAIN} ${MDQ_URL} ${SEARCH_URL}' < $f > /usr/share/nginx/html/$f
   fi
done

nginx -c /etc/nginx/nginx.conf
