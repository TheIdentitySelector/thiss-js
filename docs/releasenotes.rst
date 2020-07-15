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
