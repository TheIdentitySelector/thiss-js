#!/bin/bash

cd /dist
for f in `find . -printf '%P\n'; do
   envsubst '${PUBLIC_HOSTNAME} ${MDQ_SERVER}' < $f > /usr/share/nginx/html/$f
done

nginx -c /etc/nginx/nginx.conf
