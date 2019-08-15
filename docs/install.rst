Building and Installing
=======================

Note that most users won't want to install and deploy their own isntance of thiss-js but will most likely want to use one of the existing service instances such as service.seamlessaccess.org.

The included Makefile has a number of targets aimed at those who want to build and package their own instance:

* ``make setup``: Runs ``npm install`` to install all node dependencies
* ``make start``: Runs a local development instance with a mocked MDQ/Search service (based on edugain)
* ``make local``: Runs a local development instance for a local pyFF instance running on port 8000
* ``make build``: Builds the instance running on thiss.io in the dist directory
* ``make standalone``: Builds a standalone instance used in the docker container (with envsubst) in the dist directory
* ``make docker``: Builds a docker container (thiss-js:<version>) based on ``standalone`` and nginx

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
