How to do a release:

- git checkout staging
- Check all PRs in github
- merge development branch into staging
- update version in package.json and Makefile and docs/conf.py
- update version of thiss-ds in package.json dependencies (if needed)
- add entry in docs/releasenotes.rst 
- npm install
- add package-lock.json and package.json and docs and commit
- git tag, push, push tags
- make release in github
- readthedocs
