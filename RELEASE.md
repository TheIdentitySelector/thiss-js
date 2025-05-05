How to do a release:

## In the repo

- git checkout staging
- Check all PRs in github
- merge development branch into staging
- Create 2 consecutive versions both with the same code.
  - These versions:
    - one 1st adds to the docker image the assets of the new versions (call them new-1 and new-2) and then the assets of the version currently deployed (call it old)
    - the other 1st adds the assets of the old version and then adds the assets of the new (1 & 2) versions.
    - the idea is to have the new-1 version serving the exact same app as the old version, but prepared to serve the assets for the new app, so that when the new-2 version is deployed, in the window in which some backend nodes are serving new-1 and some new-2, the new-2 app will be able to find the assets it needs when it hits a node still with new-1.
  - To achieve that:
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

## Incompatibilities

This strategy works when the old and the new version of the entrypoints (`/cta`, `/ps/`, `/ds`) are compatible functionally in any combination.
If there are incompatibilities in this regard, we'd have to break the release into more steps, so that in each step there are no incompatibilities.
