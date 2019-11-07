Release Notes
=============

Version 1.1.2
-------------

* Support for whitelisting domains. 

Whitelisting is a mechanism for simple ORIGIN-based ACLs in the persistence API. This approach is meant for 
small scale deployments and is not expected to scale. To turn on provide the WHITELIST environment variable
eg via the env plugin in webpack as illustrated by the standard Makefile
