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
      loginInitiatorURL: #<string|callable> a URL compatible with the Shibboleth login initiator protocol - can act as both discoveryRequest and discoveryResponse
      discoveryRequest:  #<string|callable> a URL or callable that initiates a discovery flow
      discoveryResponse: #<string|callable> a URL or callable that handles a discovery response
      persistenceURL: #<string> the URL of the persistence service

      entityID: #<string> (Optional) The entityID of the SP.
      trustProfile: #<string> (Optional) The name of a trust profile published by the SP.

      MDQ: #<string|callable> a callback (either function or MDQ service URL) used to lookup metadata. By default the MDQ service configured will be used.
      pinned: #<string> the entityID of a pinned IdP. This has the effect of overriding the default choice in the button and persisting it.
      backgroundColor: # <string> (default '#FFFFFF') the background color of the iframe where the button is rendered
      color: # <string> (default '#0079ff') the color of the button
    }

The login button is rendered in an iframe with a fixed size.

When you initiate the button for use with the Shibboleth SP you typically only provide the loginInitiatorURL parameter (and possibly the color and backgroundColor parameters). The loginInitiatorURL should map to a Shibboleth SessionInitiator configuration which is configured for discovery. In theory you can use any SAML discovery service but the intent is of course to use the thiss-js discovery service.

A typical Shibboleth configuration matching the above call to the login button might look something like this:

.. code-block:: xml

    <SessionInitiator type="Chaining" Location="/Login" id="ds" relayState="cookie">
       <SessionInitiator type="SAML2" defaultACSIndex="1" acsByIndex="false" template="bindingTemplate.html"/>
       <SessionInitiator type="Shib1" defaultACSIndex="5"/>
       <SessionInitiator type="SAMLDS" URL="https://your.service/ds"/>
    </SessionInitiator>


You typically provide a target parameter with the loginInitiatorURL which in Shibboleth has the effect of sending the user to a secondary URL after successful authentication. The target URL is typically used to create the user session in your application.

To configure the button with discoveryRequest & discoveryResponse, using the discovery service URL as discoveryRequest, you will need to add your entityID to the DS URL, like so:

.. code-block:: js

    <script src="https://your.service/thiss.js"/>
    <div id="login"> </div>
    <script>
        window.onload = function() {
           thiss.DiscoveryComponent({
               discoveryRequest: 'https://your.service/ds/?entityID=https://your.entity/ID',
               discoveryResponse: 'https://sp.example.com/Shibboleth.sso/Login?target=/some-resource/',
           }).render('#login');
        };
    </script>

Using a trust profile
.....................

To use a trust profile to pre-filter the results returned by the DS you have to add an `entityID` and `trustProfile` parameter to the URL of the discovery service configured into the SP software, so something like this for Shibboleth SP:

.. code-block:: xml

    <SessionInitiator type="Chaining" Location="/DS/some-profile-name" id="some-profile-name">
       <SessionInitiator type="SAML2" acsIndex="1" template="bindingTemplate.html"/>
       <SessionInitiator type="SAMLDS" URL="https://your.discovery.service/ds/?trustProfile=some-profile-name"/>
    </SessionInitiator>

Then, you would construct the `DiscoveryComponent` as follows:

.. code-block:: js

    <script src="https://your.service/thiss.js"/>
    <div id="login"> </div>
    <script>
        window.onload = function() {
           thiss.DiscoveryComponent({
               loginInitiatorURL: 'https://sp.example.com/Shibboleth.sso/DS/some-profile-name?target=/some-resource/',
               entityID: 'https://your.entity/ID',
               trustProfile: 'some-profile-name'
           }).render('#login');
        };
    </script>

Alternatively, without needing to use shibboleth or modify its configuration, it is possible to use a trust profile setting `discoveryRequest` pointing to an instance of the Discovery Service provided by this package, and `discoveryResponse` to a different URL or callable to handles the discovery response.

.. code-block:: js

    <script src="https://your.service/thiss.js"/>
    <div id="login"> </div>
    <script>
        window.onload = function() {
           thiss.DiscoveryComponent({
               discoveryRequest: 'https://your.service/ds/',
               discoveryResponse: 'https://sp.example.com/Shibboleth.sso/Login?target=/some-resource/',
               entityID: 'https://your.entity/ID',
               trustProfile: 'some-profile-name'
           }).render('#login');
        };
    </script>

Persistence Service
-------------------

In order to directly interact with the persistence service and low-level discovery components you need to implement your own components using the low-level APIs in `thiss-ds-js <https://github.com/TheIdentitySelector/thiss-ds-js>`_.

The persistence service supports ACLs based on whitelisting (currently). Turn on by providing a comma-separated list of domains in the env variable WHITELIST. Only ORIGINs that end with any of the items in the list (remember that port-numbers are part of the ORIGIN if present!) are allowed to call the API when this feature is turned on. This is only meant for small scale deployments.
