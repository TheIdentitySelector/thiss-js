Release Notes
=============

Version 1.1.2
-------------

* Support for whitelisting domains. 

Whitelisting is a mechanism for simple ORIGIN-based ACLs in the persistence API. This approach is meant for 
small scale deployments and is not expected to scale. To turn on provide the WHITELIST environment variable
eg via the env plugin in webpack as illustrated by the standard Makefile

Version 1.1.3
-------------

* compatibility fixes for IE11


Version 1.2.0
-------------

* correctly implement hide-from-discovery
* fix footer

Version 1.2.1
-------------

* support for building in a docker container - no need to have node installed to deploy

Version 1.3.0
-------------

* UX for overriding limits on search results
* Notice and consent information

Version 1.3.1
------------

* Configurable links and service name in privacy notice
* Updated privacy notice text

Version 1.4.0
-------------

* Cancel backend calls as the user types
* Static artifacts provided as separate entrypoint

Version 1.4.1
-------------

* Include link to service when users klicks "learn more" link.
