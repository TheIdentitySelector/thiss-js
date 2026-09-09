#!/bin/sh
# Pin the post-robot wire envelope key to __post_robot_10_0_14__.
#
# post-robot >=10 tags every postMessage with a key embedding its own exact
# version and silently drops anything else, so two frames can only talk when
# their keys are byte-identical. Deployed services, cached bundles and
# CDN-frozen integrator builds all speak __post_robot_10_0_14__; the packaged
# library version may change, the wire key must not. Runs from postinstall;
# idempotent. See post-robot-upgrade.md in the thiss-js repo.
set -eu
dir=node_modules/post-robot
files="$dir/globals.js $dir/dist/post-robot.js $dir/dist/post-robot.min.js $dir/dist/post-robot.ie.js $dir/dist/post-robot.ie.min.js"
for f in $files; do
    [ -f "$f" ] || { echo "pin-post-robot-key: missing $f" >&2; exit 1; }
    # globals.js builds the key from pkg.version at bundle time; dist files
    # carry it as a baked literal. Rewrite both forms.
    sed -i \
        -e "s/\`__post_robot_\${ formatVersion(pkg.version) }__\`/'__post_robot_10_0_14__'/" \
        -e 's/__post_robot_[0-9][0-9_]*__/__post_robot_10_0_14__/g' \
        "$f"
    grep -q '__post_robot_10_0_14__' "$f" || { echo "pin-post-robot-key: pin failed in $f" >&2; exit 1; }
done
echo "pin-post-robot-key: node_modules/post-robot pinned to __post_robot_10_0_14__"
