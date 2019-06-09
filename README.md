thiss.io Discovery Service
---

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/TheIdentitySelector/thiss-js/graphs/commit-activity)
[![Coverage Status](https://coveralls.io/repos/github/TheIdentitySelector/thiss-js/badge.svg?branch=master)](https://coveralls.io/github/TheIdentitySelector/thiss-js?branch=master)
[![Build Status](https://travis-ci.com/TheIdentitySelector/thiss-js.svg?branch=master)](https://travis-ci.com/TheIdentitySelector/thiss-js)
[![Known Vulnerabilities](https://snyk.io/test/github/TheIdentitySelector/thiss-js/badge.svg)](https://snyk.io/test/github/TheIdentitySelector/thiss-js)
[![Dependencies](https://david-dm.org/TheIdentitySelector/thiss-js.svg)](https://david-dm.org/TheIdentitySelector/thiss-js)


This is the thiss.io service endpoint. It can be combined with a Search capable MDQ service to form a complete discovery service for identity federations.

1. install node.js
2. make setup (install all dependencies)
3. make start (launch development server and display CTA button test iframe)

Building
---

Building is via various node and docker commands depending on what you want. The main Makefile has a few useful targets:

* `make setup`: Install all node dependencies
* `make start`: Runs a local development instance with a mocked MDQ/Search service (based on edugain)
* `make local`: Runs a local development instance for a local pyFF instance running on port 8000
* `make build`: Builds the instance running on thiss.io in the dist directory
* `make standalone`: Builds a standalone instance used in the docker container (with envsubst) in the dist directory
* `make docker`: Builds a docker container (thiss-js:<version>) based on `standalone` and nginx

Running `make setup` is typically required at least once so your builds can progress.
