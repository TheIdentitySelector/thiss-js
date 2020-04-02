#!/usr/bin/env bash

set +x

TARGET=$1
SRC=${2:-./dist}

cd $SRC
for f in `find . -printf '%P\n'`; do
   if [ "x$f" != "x" -a -f $f ]; then
      d=`dirname $f`
      mkdir -p $TARGET/$d
      envsubst '${BASE_URL} ${STORAGE_DOMAIN} ${MDQ_URL} ${SEARCH_URL} ${DEFAULT_CONTEXT} ${LOGLEVEL} ${WHITELIST}' < $f > $TARGET/$f
   fi
done
