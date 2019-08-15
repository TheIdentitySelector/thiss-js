Components
==========

The thiss-js includes the following components:

* A persistence service accessible via the `thiss-ds-js <https://github.com/TheIdentitySelector/thiss-ds-js>`_ PersitenceService API in the ``/ps/`` URI context.
* A SAML discovery service in the ``/ds/`` URI context
* A login button component available via ``/thiss.js``

Each service requires some form of integration to be used by a relying party. A good introduction to the various forms of integration is `the integration guide over at thiss.io <https://thiss.io/integration>`_.

By order of complexity the alternatives are:

OASIS Identity Provider Discovery
---------------------------------

Using the SAML discovery service requires a SAML SP implementation supporting the `SAML identity provider discovery protocol <http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-idp-discovery.pdf>`_, eg `Shibboleth <https://shibboleth.net>`_, `SimpleSAMLphp <https://simplesamlphp.org/>`_ or `pysaml2 <https://github.com/IdentityPython/pysaml2>`_. In this case you simply configure the SP to use https://your.thiss-js.instance/ds/ as the discovery service URL eg https://use.thiss.io/ds or https://service.seamlessaccess.org/ds. Note that just clicking on these links will most likely get you a 400 error (Bad Request) since the OASIS discovery protocol requires certain parameters to be sent along - your SAML SP knows how!

Login Button Component
----------------------

If your SP supports SAML discovery *or something similar* you can deploy the login button component to your SP to simplify the discovery process for your users if they typically only use a single IdP. In this case the user only has to find their identity provider once for each device/browser. On each following visit to your relying party the user can simply click on the login button componet and be taken directly to their preferred identity provider.

An example of how to do this is described in https://thiss.io/use/. Essentially you load a javascript from the service called thiss.js which contains a function to initialize and render the login button component on a DOM selector of your choice.

Persistence Service
-------------------

In order to directly interact with the persistence service and low-level discovery components you need to implement your own components using the low-level APIs in `thiss-ds-js <https://github.com/TheIdentitySelector/thiss-ds-js>`_.
