How to do a release:

## In the repo

- git checkout staging
- Check all PRs in github
- merge development branches into staging
- make build
- commit build (in `dist-pre/v${API_VERSION}`)
- update version in package.json and Makefile and docs/conf.py
- update version of thiss-ds in package.json dependencies (if needed)
- add entry in docs/releasenotes.rst 
- npm install
- add package-lock.json and package.json and docs and commit
- git tag, push, push tags
- make release in github
- readthedocs

## Release API version for production

When a new version is incompatible with the one currently in production, 
we need to release a new version of the API, that will be served under a
`v${API_VERSION}/` path.

To do this, we need to increment the API_VERSION in the Makefile.

## Upgrade API version for production

When a new version is compatible with the current version in production,
we can just update the same API version. This is a 2 step process:

First we pre-release a version that adds the new version assets,
along with the old assets, and keeps the old entry points,
and deploy this.

Then we release a version with the same assets as the pre-release,
but with the new entry points.

To make the pre-release version, we set the version currently in production
as OLD_VERSION in the Makefile, run `make prebuild`, and follow the "in the repo"
instructions above.

TEMP NOTE: currently in produuction is 2.1.98, but this does not have the assets in
dist-pre, we need to collect them somehow.

Then to make the real release we follow normal procedure.


## Deploying


make clean

- Lower the cache settings (both max-age and s-maxage) to 10h
- Wait for all the previously cached content to expire - for the maximum of the previous max-age and s-maxage.
- Deploy version new-1
- Check everything looks correct
- Deploy version new-2
- Restore previous cache settings after 10 hours

## Incompatibilities

This strategy works when the old and the new version of the entrypoints (`/cta`, `/ps/`, `/ds`) are compatible functionally in any combination.
If there are incompatibilities in this regard, we'd have to break the release into more steps, so that in each step there are no incompatibilities.
