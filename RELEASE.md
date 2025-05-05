How to do a release:

## In the repo

- git checkout staging
- Check all PRs in github
- merge development branch into staging
- Create 2 consecutive versions both with the same code:
  - one that 1st builds the assets of the new versions (call them new-1 and new-2) and then builds the assets of the version currently deployed (call it old)
  - one that 1st builds the assets of the old version and then builds the assets of the new (1 & 2) versions
- In the Makefile, set OLD_VERSION to the version currently deployed
- In the Dockerfile, in version new-1 set `COPY dist2 /dist` before `COPY dist/. /dist/`
- In the Dockerfile, in version new-2 set `COPY dist /dist` before `COPY dist2/. /dist/`
- update version in package.json and Makefile and docs/conf.py
- update version of thiss-ds in package.json dependencies (if needed)
- add entry in docs/releasenotes.rst 
- npm install
- add package-lock.json and package.json and docs and commit
- git tag, push, push tags
- make release in github
- readthedocs

See this for an example:
https://github.com/TheIdentitySelector/thiss-js/compare/2.1.56...TheIdentitySelector:2.1.57

## Deploying

- Lower the cache settings (both max-age and s-maxage) to 10h
- Wait for all the previously cached content to expire - for the maximum of the previous max-age and s-maxage.
- Deploy version new-1
- Check everything looks correct
- Deploy version new-2
- Restore previous cache settings after 10 hours
