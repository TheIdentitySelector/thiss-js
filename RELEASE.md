# How to do a release

## In a local clone of the repo, create version in git

- git checkout staging
- Check all PRs in github
- merge development branches into staging, commit changes
- git stash local changes if any
- update version in package.json and Makefile and docs/conf.py
- update VERSION, OLD_VERSION, PRE_RELEASE in Makefile
- update version of thiss-ds in package.json dependencies (if needed)
- add entry in docs/releasenotes.rst 
- npm install
- make build
- git add Makefile and package-lock.json and package.json and docs and dist (in `dist-pre/v${API_VERSION}/${VERSION}`)
- if `$PREV_VERSION` did not reach production, git rm -r dist-pre/${PREV_VERSION}
- git tag, push, push tags
- make release in github
- readthedocs

## Build docker image

- make clean
- git fetch
- git checkout $VERSION
- make docker (providing all the needed env vars, see `Configuration` in the docs).

# Types of release

First we pre-release a version that adds the new version assets,
along with the old assets, and keeps the old entry points,
and deploy this.

To make such a pre-release version, we set the PRE_RELEASE variable
in the Makefile to 'true', and the OLD_VERSION to the version
currently in production.

Then we release a version with the same assets as the pre-release,
but with the new entry points.

For this, we create a new version in which the only change is setting
the PRE_RELEASE variable in the Makefile to 'false'.

# Wire-protocol invariants (post-robot / zoid)

post-robot >=10 tags every postMessage with a key embedding its own exact
version and silently drops anything else; zoid does the same. Two frames
only talk when their keys are byte-identical. Deployed services, cached
bundles and CDN-frozen integrator builds all speak:

- `__post_robot_10_0_14__` (persistence channel)
- `__post_robot_10_0_22__` + `__zoid_9_0_34__` (SP page <-> cta channel)

These keys are permanent, whatever library versions are packaged. The
post-robot dependency is an npm alias to `@krakenjs/post-robot`, re-keyed
at install time by `scripts/pin-post-robot-key.sh` (postinstall); `make
build` fails via `scripts/check-wire-surface.sh` if the built bundles
speak anything else. zoid stays pinned and bundled from
`zoid/dist/zoid.frame` only; never upgrade it without the same re-keying
treatment. Background and history: `post-robot-upgrade.md`.
