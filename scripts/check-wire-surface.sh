#!/bin/sh
# Verify the wire dialects of a built asset tree.
#
# Frames only talk when their envelope keys match exactly (post-robot >=10
# embeds its version in the key; zoid does the same). Deployed services,
# cached bundles and CDN-frozen integrator builds speak:
#   __post_robot_10_0_14__            the persistence channel (app post-robot)
#   __post_robot_10_0_22__            zoid 9.0.34's inlined post-robot
#   __zoid_9_0_34__                   the SP page <-> cta channel
# These keys are permanent invariants regardless of packaged library
# versions (see post-robot-upgrade.md). This guard fails the build if the
# bundles speak anything else - e.g. a caret resolving to a new version at
# install time, an unpatched post-robot, or zoid bundled from source
# instead of zoid/dist/zoid.frame.
set -eu
dir="${1:?usage: check-wire-surface.sh <built-assets-dir>}"
keys=$(grep -rhoE '__post_robot_[0-9_]+__|__zoid_[0-9_]+__' "$dir" | sort -u)
expected='__post_robot_10_0_14__
__post_robot_10_0_22__
__zoid_9_0_34__'
if [ "$keys" != "$expected" ]; then
    echo "wire-surface check FAILED in $dir" >&2
    echo "found keys:" >&2; echo "$keys" >&2
    echo "expected exactly:" >&2; echo "$expected" >&2
    exit 1
fi
echo "wire-surface check OK: $dir speaks 10_0_14 / 10_0_22 / zoid_9_0_34"
