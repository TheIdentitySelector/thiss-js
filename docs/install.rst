Building and Installing
=======================

Note that most users won't want to install and deploy their own isntance of thiss-js but will most likely want to use one of the existing service instances such as service.seamlessaccess.org.

The included Makefile has a number of targets aimed at those who want to build and package their own instance:

* ``make setup``: Runs ``npm install`` to install all node dependencies
* ``make start``: Runs a local development instance with a mocked MDQ/Search service (based on edugain)
* ``make local``: Runs a local development instance for a local pyFF instance running on port 8000
* ``make build``: Builds the instance running on thiss.io in the dist directory
* ``make standalone``: Builds a standalone instance used in the docker container (with envsubst) in the dist directory
* ``make sameserver``: Builds a lightweight host agnostic replacement for the deprecated embedded pyFF DS when pyFF is running on the same server
* ``make docker``: Builds a docker container (thiss-js:<version>) based on ``standalone`` and nginx

Configuration
=============

The thiss-js application is a set of SPAs and web components that are configured via environment variables via calls to process.env.Deploying the apps essentially either amounts to building the app with the environment variables set, or substituting the environment variables at runtime. This latter approach is what is done in the docker container start.sh.

The thiss-js button component is partially configured by the caller that can pass several parameters into the button change its behaviour. This is documented in detail in the thiss-ds-js package.

*Basic parameters:*

* MDQ_URL: URL to the MDQ (metadata query protocol) endpoint
* SEARCH_URL: URL to the MDQ search service
* BASE_URL: the URL where the applications are published
* STORAGE_DOMAIN: the ORIGIN used for the storage/persistence layer
* DEFAULT_CONTEXT: the context where storage objects are persisted
* LOGLEVEL: controls logging to the browser console

*Configuration related to access control*

* WHITELIST: a comma-separated list of ORIGINs allowed to access the persistence layer directly

*Configuration related to notice and consent/privacy policy notice*

* LEARN_MORE_URL: a URL where the user can learn more about privacy of the service
* SERVICE_NAME: the name of the service
* SERVICE_URL: the information URL/landing page of the service

Deploy to CDN
=============

If you are deploying to a CDN origin server (eg netlify or github pages) simply copy the files from the build directory over to the CDN origin server.

Running docker
==============

In order to run your own instance of thiss-js you need a search-capable MDQ server (eg `pyFF <pyff.io>`_ or `thiss-mdq <https://github.com/TheIdentitySelector/thiss-mdq>`_) with some metadata in it. Assuming your MDQ is running on port 8080 in a container called mdq the following should work:

.. code-block:: bash

  # docker run -ti -p 9000:80 \
        -e MDQ_URL=http://mdq:8080/entities \
        -e SEARCH_URL=http://mdq:8080/entities \
        -e BASE_URL=http://localhost:9000/ \
        -e STORAGE_DOMAIN="example.com" \
        thiss-js:1.0.0

* Replace example.com with the domain of your DS instance - eg localhost if you are just experimenting.
* Some MDQ implementations have multiple search endpoints - you only need one that is capable of returning JSON-formatted metadata for this to work. 
* Running your own instance of thiss-js means having your own ORIGIN for browser local storage.  If you want to share storage domain with another instance of thiss-js then you're better off implementing your own discovery frontend (eg to thiss.io). This is documented in github.com/TheIdentitySelector/thiss-ds-js.
* The docker container does not currently support overriding all configuration parameters.Consult the start.sh script in the docker dir for details.