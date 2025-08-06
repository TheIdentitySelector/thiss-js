# How to do a release

## In a local clone of the repo, create version in git

- git checkout staging
- Check all PRs in github
- merge development branches into staging, commit changes
- update version in package.json and Makefile and docs/conf.py
- update API_VERSION, prev versions, pre-release in Makefile
- update version of thiss-ds in package.json dependencies (if needed)
- add entry in docs/releasenotes.rst 
- npm install
- make build
- commit build (in `dist-pre/v${API_VERSION}`)
- git add Makefile and package-lock.json and package.json and docs and dist (in `dist-pre/v${API_VERSION}/${VERSION}`)
- if `$PREV_VERSION` did not reach production, git rm -r dist-pre/v${API_VERSION}/${PREV_VERSION}
- git tag, push, push tags
- make release in github
- readthedocs

## Build docker image

- make clean
- git fetch
- git checkout $VERSION
- make docker (providing all the needed env vars, see `Configuration` in the docs).

# Types of release

## Release API version for production

When a new version is incompatible with the one currently in production, 
we need to release a new version of the API, that will be served under a
`v${API_VERSION}/` path.

To do this, we need to increment the API_VERSION in the Makefile.

In a subsequent version, update the PREV_API_VERSION in the Makefile.

## Upgrade API version for production

When a new version is compatible with the current version in production,
we can just update the same API version. This is a 2 step process:

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
