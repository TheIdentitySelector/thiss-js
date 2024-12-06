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

Using the SAML discovery service requires a SAML SP implementation supporting the `SAML identity provider discovery protocol <http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-idp-discovery.pdf>`_, eg `Shibboleth <https://shibboleth.net>`_, `SimpleSAMLphp <https://simplesamlphp.org/>`_ or `pysaml2 <https://github.com/IdentityPython/pysaml2>`_. In this case you simply configure the SP to use https://your.thiss-js.instance/ds/ as the discovery service URL eg https://use.thiss.io/ds or https://service.seamlessaccess.org/ds.

Login Button Component
----------------------

If your SP supports SAML discovery *or something similar* you can deploy the login button component to your SP to simplify the discovery process for your users if they typically only use a single IdP. In this case the user only has to find their identity provider once for each device/browser. On each following visit to your relying party the user can simply click on the login button componet and be taken directly to their preferred identity provider.

The login button component is instantiated like this:

.. code-block:: js

    <script src="https://your.service/thiss.js"/>
    <div id="login"> </div>
    <script>
        window.onload = function() {
           thiss.DiscoveryComponent({
               // other parameters - cf below
               loginInitiatorURL: 'https://sp.example.com/Shibboleth.sso/Login?target=https://sp.example.com/loginhandler',
           }).render('#login');
        };
    </script>


This example assumes the client uses the shibboleth SP but all SPs provides a mechanism to initiate a login flow. This is typically triggered by sending the user to a URL that triggers the SAML authentication request.

The login button component accepts the following configuration parameters in the call to DiscoveryComponent

.. code-block:: js

    {
      loginInitiatorURL: #<string|callable> a URL compatible with the Shibboleth login initiator protocol - acts as both discoveryRequest and discoveryResponse
      persistenceURL: #<string> the URL of the persistence service

      MDQ: #<string|callable> a callback (either function or MDQ service URL) used to lookup metadata. By default the MDQ service configured will be used.
      pinned: #<string> the entityID of a pinned IdP. This has the effect of overriding the default choice in the button and persisting it.
      backgroundColor: # <string> (default '#FFFFFF') the background color of the iframe where the button is rendered
      color: # <string> (default '#0079ff') the color of the button
    }

The discovery component can also be rendered via a static `render` method, that takes the same options as the DiscoveryComponent constructor,
plus the selector in which to render the button:

.. code-block:: js

    <script src="https://your.service/thiss.js"/>
    <div id="login"> </div>
    <script>
        window.onload = function() {
           thiss.DiscoveryComponent.render({
               // other parameters - cf above
               loginInitiatorURL: 'https://sp.example.com/Shibboleth.sso/Login?target=https://sp.example.com/loginhandler',
           },
           '#login');
        };
    </script>

The login button is rendered in an iframe with a fixed size.

When you initiate the button for use with the Shibboleth SP you typically only provide the loginInitiatorURL parameter (and possibly the color and backgroundColor parameters). The loginInitiatorURL should map to a Shibboleth SessionInitiator configuration which is configured for discovery. In theory you can use any SAML discovery service but the intent is of course to use the thiss-js discovery service.

A typicall Shibboleth configuration matching the above call to the login button might look something like this:

.. code-block:: xml

    <SessionInitiator type="Chaining" Location="/Login" id="ds" relayState="cookie">
       <SessionInitiator type="SAML2" defaultACSIndex="1" acsByIndex="false" template="bindingTemplate.html"/>
       <SessionInitiator type="Shib1" defaultACSIndex="5"/>
       <SessionInitiator type="SAMLDS" URL="https://your.service/ds"/>
    </SessionInitiator>


You typically provide a target parameter with the loginInitiatorURL which in Shibboleth has the effect of sending the user to a secondary URL after successful authentication. The target URL is typically used to create the user session in your application.

To use a trust profile to pre-filter the results returned by the DS, you would add a `trustProfile` parameter to the URL of the discovery service configured into Shibboleth, so something like:

.. code-block:: xml

    <SessionInitiator type="Chaining" Location="/Login" id="ds" relayState="cookie">
       <SessionInitiator type="SAML2" defaultACSIndex="1" acsByIndex="false" template="bindingTemplate.html"/>
       <SessionInitiator type="Shib1" defaultACSIndex="5"/>
       <SessionInitiator type="SAMLDS" URL="https://your.service/ds/?trustProfile=some-profile"/>
    </SessionInitiator>

An alternative to use a trust profile would be to configure the discovery service as `loginInitiatorURL`, like this:

.. code-block:: js

    <script src="https://your.service/thiss.js"/>
    <div id="login"> </div>
    <script>
        window.onload = function() {
           thiss.DiscoveryComponent.render({
               loginInitiatorURL: 'https://use.thiss.io/ds/?return=https%3A//example.com/Shibboleth.sso/Login%3Ftarget%3D/sign',
               entityID: 'https://example.com/shibboleth',
               trustProfile: 'some-profile',
           },
           '#login');
        };
    </script>

If you are not using Shibboleth pls consult your SAML SP documentation for functional equivalents of the Shibboleth SessionInitiator concept.

Persistence Service
-------------------

In order to directly interact with the persistence service and low-level discovery components you need to implement your own components using the low-level APIs in `thiss-ds-js <https://github.com/TheIdentitySelector/thiss-ds-js>`_.

The persistence service supports ACLs based on whitelisting (currently). Turn on by providing a comma-separated list of domains in the env variable WHITELIST. Only ORIGINs that end with any of the items in the list (remember that port-numbers are part of the ORIGIN if present!) are allowed to call the API when this feature is turned on. This is only meant for small scale deployments.
