Building and Installing
=======================

Note that most users won't want to install and deploy their own instance of thiss-js but will most likely want to use one of the existing service instances such as service.seamlessaccess.org.

The included Makefile has a number of targets aimed at those who want to build and package their own instance:

* ``make setup``: Runs ``npm install`` to install all node dependencies
* ``make start``: Runs a local development instance. Must be provided with a MDQ_URL environment variable pointing to an MDQ service, e.g. `https://md.thiss.io/entities/`.
* ``make local``: Runs a local development instance for a local pyFF instance running on port 8080
* ``make build``: Builds the instance running on thiss.io in the dist directory
* ``make standalone``: Builds a standalone instance used in the docker container (with envsubst) in the dist directory
* ``make sameserver``: Builds a lightweight host agnostic replacement for the deprecated embedded pyFF DS when pyFF is running on the same server
* ``make docker``: Builds a docker container (thiss-js:<version>) based on ``standalone`` and nginx

Configuration
=============

The thiss-js application is a set of SPAs and web components that are configured via environment variables via calls to process.env. Deploying the apps essentially either amounts to building the app with the environment variables set, or substituting the environment variables at runtime. This latter approach is what is done in the docker container start.sh.

The thiss-js button component is partially configured by the caller that can pass several parameters into the button change its behaviour. This is documented in detail in the thiss-ds-js package.

*Basic parameters:*

* MDQ_URL: URL to the MDQ (metadata query protocol) endpoint
* SEARCH_URL: URL to the MDQ search service
* BASE_URL: the URL where the applications are published
* STORAGE_DOMAIN: the ORIGIN used for the storage/persistence layer
* DEFAULT_CONTEXT: the context where storage objects are persisted
* LOGLEVEL: controls logging to the browser console
* MIN_SEARCH_LENGTH: Controls the minimum number of characters that must be entered into the DS search input to start an MDQ search
* SAA_COMPLIANT_BROWSERS: Comma separated list of browsers that implement the Storage Access API with handler for localStorage (at this point (July 2025) only chrome and chromium derivatives).
* MAX_SUGGESTED: Maximum number of suggested institutions that SPs can set.

*Configuration related to access control*

* WHITELIST: a comma-separated list of ORIGINs allowed to access the persistence layer directly

*Configuration of the docker container (runtime only, see start.sh)*

* CACHE_CONTROL: the ``Cache-Control`` header nginx sends for every resource. Default ``public, max-age=36000, must-revalidate, s-maxage=36000, proxy-revalidate``, i.e. ten hours. After an upgrade, browsers can keep the old entry points for this long, so old and new components coexist during that window (they are built to interoperate). Set it short on instances used for development.

* PUBLIC_PATH_PREFIX: To run the discovery service on a path other than /, you must build the app with an environment variable PUBLIC_PATH_PREFIX starting and ending in /. Then the prefix must be included in BASE_URL (and COMPONENT_URL and PERSISTENCE_URL if set).

Deploy to CDN
=============

If you are deploying to a CDN origin server (eg netlify or github pages) simply copy the files from the build directory over to the CDN origin server.

Running docker
==============

In order to run your own instance of thiss-js you need a search-capable MDQ server (eg `pyFF <pyff.io>`_ or `thiss-mdq <https://github.com/TheIdentitySelector/thiss-mdq>`_) with some metadata in it. Assuming your MDQ is running on port 8080 in a container called mdq the following should work:

.. code-block:: bash

  # docker run -ti -p 9000:80 \
        -e MDQ_URL=http://mdq:8080/entities/ \
        -e SEARCH_URL=http://mdq:8080/entities/ \
        -e BASE_URL=http://example.com/ \
        -e STORAGE_DOMAIN="example.com" \
        thiss-js:1.0.0

* Replace example.com with the domain of your DS instance - eg localhost if you are just experimenting.
* Some MDQ implementations have multiple search endpoints - you only need one that is capable of returning JSON-formatted metadata for this to work. 
* Running your own instance of thiss-js means having your own ORIGIN for browser local storage.  If you want to share storage domain with another instance of thiss-js then you're better off implementing your own discovery frontend (eg to thiss.io). This is documented in github.com/TheIdentitySelector/thiss-ds-js.
* The docker container substitutes a fixed set of configuration parameters at startup; the others are fixed at build time. The list is the envsubst allow-list in ``scripts/subst-vars.sh``.

Upgrading a running instance
============================

Browsers cache the entry points (``/thiss.js``, ``/cta/``, ``/ds/``, ``/ps/``) for the ``CACHE_CONTROL`` lifetime, and
each one independently. After an upgrade, a page can therefore run an old button against a new persistence service, or
the reverse, for up to that long. Every release is built so that such mixed pairs keep working, and releases are made
in pairs so that the mix can be tested before users see it:

1. A pre-release version with ``PRE_RELEASE=true`` in the Makefile and ``PREV_VERSION`` set to the version in
   production. Its image serves the production entry points unchanged and adds the new assets; the new entry points are
   reachable under ``/new/`` only. Deploy it, then open ``/new/upgrade-test/`` (with the trailing slash) and go through
   every card: each combination of old and new button, persistence service and discovery service must work, and the
   automated client checks must all be green.
2. The release version, identical except for ``PRE_RELEASE=false``, which switches the entry points to the new version.
   Deploy it once the pre-release checks pass.

To roll back after step 2, redeploy the pre-release image of step 1, not the previous version: browsers that have
already cached the new entry points keep requesting the new assets, which the previous version's image does not contain.

Mixed pairs work because the message protocol between the components is pinned: the post-robot wire dialect of the
persistence channel and the zoid keys of the button channel never change, whatever library versions a release packages.
``make build`` fails if a build violates this. The mechanics and the history are in ``RELEASE.md`` and
``post-robot-upgrade.md`` in the repository.
