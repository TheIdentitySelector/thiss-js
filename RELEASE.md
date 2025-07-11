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

## Deploying

- Lower the cache settings (both max-age and s-maxage) to 10h
- Wait for all the previously cached content to expire - for the maximum of the previous max-age and s-maxage.
- Deploy version new-1
- Check everything looks correct
- Deploy version new-2
- Restore previous cache settings after 10 hours

## Incompatibilities

This strategy works when the old and the new version of the entrypoints (`/cta`, `/ps/`, `/ds`) are compatible functionally in any combination.
If there are incompatibilities in this regard, we'd have to break the release into more steps, so that in each step there are no incompatibilities.
