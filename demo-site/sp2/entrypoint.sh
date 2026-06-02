#!/bin/bash
# Start shibd, then Apache in the foreground (PID 1 stays alive with Apache).
set -e

mkdir -p /run/shibboleth
# On a container restart the previous run's UNIX socket lingers and shibd dies
# with "listener failed to initialize" — remove it so restarts are robust.
rm -f /run/shibboleth/shibd.sock
# shibd daemonizes; wait for its socket before Apache starts handling /Shibboleth.sso
shibd

for _ in $(seq 1 30); do
    [ -S /run/shibboleth/shibd.sock ] && break
    sleep 1
done

# APACHE_* envs are normally set by /etc/apache2/envvars
. /etc/apache2/envvars
exec apache2 -D FOREGROUND
