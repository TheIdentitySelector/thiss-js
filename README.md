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

Running (docker)
---

Assuming your pyFF instance is running on port 8000 in a container called 'pyff' the following should work:

```
docker run -ti -p 9000:80 -e MDQ_URL=http://pyff:8000/entities -e SEARCH_URL=http://pyff:8000/api/search -e BASE_URL=http://localhost:9000/ -e STORAGE_DOMAIN="localhost"  thiss-js:1.0.0
```

Aternatively using docker-compose:

```
version: "3"
services:
   thiss_js:
      image: thiss-js:1.0.0
      container_name: thiss_js
      ports:
         - "9000:80"
      environment:
         - MDQ_URL=http://pyff:8000/entities
         - SEARCH:URL=http://pyff:8000/api/search
         - BASE_URL=http://localhost:9000/
         - STORAGE_DOMAIN=localhost
   pyff:
      build: .
      image: docker.sunet.se/pyff:${PYFF_VERSION:-api}
      container_name: pyff-api
```

This requires a version of pyff that has the api modifications merged.

A few notes on deployment
---

* Running your own instance of thiss-js means having your own ORIGIN for browser local storage.
* If you want to share storage domain with another instance of thiss-js then you're better off implementing your own discovery frontend (eg to thiss.io). This is documented in github.com/TheIdentitySelector/thiss-ds-js.
