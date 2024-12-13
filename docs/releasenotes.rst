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
-------------

* Configurable links and service name in privacy notice
* Updated privacy notice text

Version 1.4.0
-------------

* Cancel backend calls as the user types
* Static artifacts provided as separate entrypoint

Version 1.4.1
-------------

* Include link to service when users klicks "learn more" link.

Version 1.5.0
-------------

* Multiple dependency updates
* Accessibility updates
* Progressive scrolling in discovery service
* Additional customizability (se docs)
* Make sure entity_id and entityID attributes are treated as equivalent in the API (issue #135)

Version 1.6.0
-------------

* Initial support for entity refresh
* i18n

Version 1.6.1
-------------

* i18n fixes for docker image
* Swedish translation

Version 1.6.2
-------------

* fixes for cache headers in docker image
* fixes for i18n

Version 1.6.3
-------------

* minor fixes

Version 1.6.4
-------------

* translation for several African languages
* multiple accessibility fixes

Version 1.6.5
-------------

* Docker build fix

Version 1.6.6
-------------

* Docker build fix

Version 1.6.7
-------------

* nginx.conf fix

Version 2.0.0
-------------

* Using trust profiles to filter results
* Using DiscoveryResponse in SP md to warn users of unknown return url

Version 2.0.1
-------------

* Accessibility and style fixes

Version 2.0.2
-------------

* Bugfixes

Version 2.1.1
-------------

* Using the Storage Access API in standard mode

Version 2.1.2
-------------

* Using the Storage Access API in advanced mode

Version 2.1.3
-------------

* Fix storage problem when localStorage is not available and we fall back to using cookies

Version 2.1.4
-------------

* Fix problem with docker

Version 2.1.5
-------------

* Bugfixes and cleanup

Version 2.1.6
-------------

* Fixing problems in iOS browsers
* Fix problem with the discovery response warning
* Cleanup

Version 2.1.8
-------------

* Fixing problem moving local entities to global in chrome

Version 2.1.9
-------------

* Fix problem with code not available in the thiss.js bundle
* Fix problem with hardcoded context

Version 2.1.10
--------------

* Missing context in demo page

Version 2.1.11
--------------

* Some UI details

Version 2.1.13
--------------

* Documentation

Version 2.1.15
--------------

* Special behaviour for shibboleth session initiator

Version 2.1.16
--------------

* Docs & API

Version 2.1.17
--------------

* Revert special behaviour for shibboleth session initiator
* Docs

Version 2.1.18
--------------

* Allow configuring std button with DS URL & trust profile
* Docs

Version 2.1.21
--------------

* Fix banana-i18n dependency
