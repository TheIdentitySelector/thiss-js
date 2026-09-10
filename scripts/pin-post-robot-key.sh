#!/bin/sh
# Pin the post-robot wire protocol to the 10.0.14 dialect.
#
# post-robot >=10 tags every postMessage with a key embedding its own exact
# version and silently drops anything else; deployed services, cached bundles
# and CDN-frozen integrator builds all speak __post_robot_10_0_14__. On top of
# that, the modern line (10.0.46+, 11.x) changed the envelope payload from one
# message object to a batched message array, so key pinning alone is not
# enough: each generation drops the other's payload shape. This script patches
# the installed @krakenjs/post-robot dist so that new builds
#   - send:    one old-style object envelope per message (no batching),
#   - receive: both shapes (array as-is; single object wrapped as [object]).
# The packaged library version may change, the wire dialect must not.
# Runs from postinstall; idempotent; fails hard if the pinned version's code
# drifts from the expected anchors. See post-robot-upgrade.md.
#
# Only dist/post-robot.js (what webpack bundles via the package main) carries
# the behavioral patch. The min/ie variants and globals.js get the key pin
# only and must not be bundled.
set -eu
dir=node_modules/post-robot

# 1. Key pin, all variants.
for f in "$dir"/globals.js "$dir"/dist/post-robot.js "$dir"/dist/post-robot.min.js "$dir"/dist/post-robot.ie.js "$dir"/dist/post-robot.ie.min.js; do
    [ -f "$f" ] || { echo "pin-post-robot-key: missing $f" >&2; exit 1; }
    sed -i \
        -e "s/\`__post_robot_\${ formatVersion(pkg.version) }__\`/'__post_robot_10_0_14__'/" \
        -e 's/__post_robot_[0-9][0-9_]*__/__post_robot_10_0_14__/g' \
        "$f"
    grep -q '__post_robot_10_0_14__' "$f" || { echo "pin-post-robot-key: key pin failed in $f" >&2; exit 1; }
done

# 2. Wire-format patch on the bundled dist.
python3 - "$dir/dist/post-robot.js" <<'PYEOF'
import re, sys

path = sys.argv[1]
src = open(path).read()

RECV_OLD = 'if (Array.isArray(parseMessages)) return parseMessages;'
RECV_NEW = ('if (Array.isArray(parseMessages)) return parseMessages;\n'
            '                    if (parseMessages && "string" == typeof parseMessages.type) return [ parseMessages ];')
SEND_MARK = '_messages[_mi]'

if RECV_NEW.split('\n')[1].strip() in src and SEND_MARK in src:
    print("pin-post-robot-key: wire-format patch already applied")
    sys.exit(0)

if RECV_OLD not in src:
    sys.exit("pin-post-robot-key: receive anchor not found; post-robot version drifted?")
src = src.replace(RECV_OLD, RECV_NEW, 1)

send_re = re.compile(
    r'var serializedMessage = serializeMessage\(win, domain, \(\(_ref = \{\}\)\.__post_robot_10_0_14__ = domainBuffer\.buffer \|\| \[\],\s*'
    r'_ref\), \{\s*on: on,\s*send: send\s*\}\);\s*'
    r'var _ref;\s*'
    r'delete domainBuffer\.buffer;\s*'
    r'var strategies = Object\.keys\(SEND_MESSAGE_STRATEGIES\);\s*'
    r'var errors = \[\];\s*'
    r'for \(var _i2 = 0; _i2 < strategies\.length; _i2\+\+\) \{\s*'
    r'var strategyName = strategies\[_i2\];\s*'
    r'try \{\s*'
    r'SEND_MESSAGE_STRATEGIES\[strategyName\]\(win, serializedMessage, domain\);\s*'
    r'\} catch \(err\) \{\s*'
    r'errors\.push\(err\);\s*'
    r'\}\s*'
    r'\}\s*'
    r'if \(errors\.length === strategies\.length\) throw new Error\(',
    re.S)

SEND_NEW = '''var _messages = domainBuffer.buffer || [];
                    var _ref;
                    delete domainBuffer.buffer;
                    var strategies = Object.keys(SEND_MESSAGE_STRATEGIES);
                    var errors = [];
                    for (var _mi = 0; _mi < _messages.length; _mi++) {
                        var serializedMessage = serializeMessage(win, domain, ((_ref = {}).__post_robot_10_0_14__ = _messages[_mi], _ref), {
                            on: on,
                            send: send
                        });
                        for (var _i2 = 0; _i2 < strategies.length; _i2++) {
                            var strategyName = strategies[_i2];
                            try {
                                SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
                            } catch (err) {
                                errors.push(err);
                            }
                        }
                    }
                    if (errors.length && errors.length === strategies.length * _messages.length) throw new Error('''

src, n = send_re.subn(SEND_NEW, src, count=1)
if n != 1:
    sys.exit("pin-post-robot-key: send anchor not found; post-robot version drifted?")

open(path, 'w').write(src)
print("pin-post-robot-key: wire-format patch applied to dist/post-robot.js")
PYEOF

node --check "$dir/dist/post-robot.js" || { echo "pin-post-robot-key: patched dist fails syntax check" >&2; exit 1; }
echo "pin-post-robot-key: node_modules/post-robot pinned to the 10.0.14 wire dialect"
