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

Version 2.1.22
--------------

* Fix problem with return param in cta

Version 2.1.26
--------------

* Docs

Version 2.1.27
--------------

* Fix bug in pre-loaded standard button

Version 2.1.28
--------------

* Docs
* Localization of entities in search results, rememberd choice, CTA button

Version 2.1.30
--------------

* Backwards compatibility with ps 1.0.19
* Bugfixes

Version 2.1.31
--------------

* Do not refresh entities from MDQ in persistence service
* Bugfixes

Version 2.1.32
--------------

* Bugfixes

Version 2.1.34
--------------

* Avoid huge cookie names

Version 2.1.35
--------------

* Cleanup and bugfixes

Version 2.1.36
--------------

* Update demo code

Version 2.1.37
--------------

* Only use SAA with compliant browsers

Version 2.1.38
--------------

* Make list of compliant SAA browsers configurable
* Fully disable using cookies for storage
* Do not use SAA when PS in different host than CTA button

Version 2.1.39
--------------

* Forget current version of pinning

Version 2.1.40
--------------

* Remove storage-access-granted event

Version 2.1.41
--------------

* Restore missing svg's

Version 2.1.46
--------------

* Make configurable the min string length that is sent to the MDQ by the search
* Downgrade zoid and belter for backwards compatibility
* Send entityID as param to DS when there is no trustProfile
* Wait in the standard button for translations file to be loaded

Version 2.1.48
--------------

* Fix demo

Version 2.1.51
--------------

* Swedish translation
* Fix demo

Version 2.1.53
--------------

* Cache settings applied to all resources

Version 2.1.56
--------------

* Fix CSP bug where the CSP header requires unsafe-eval
* API method for advanced users to ask the persistence service whether there is storage access
* Recover the favicon which got lost at some point
* Removal of DiscoveryResponse warning for maintainence
* Serve assets and entrypoints from previous version

Version 2.1.57
--------------

* Serve new entrypoints

Version 2.1.60
--------------

* Updated documentation
* Support for HAProxy's Health checks
* Add lang attribute to button and discovery service pages
* Add clear method to persistence service API
* Allow running the discovery service on a path other than /
* Pre expire of IdP:s when marked with `hide-from-discovery`
* Run nginx as non-root user

Version 2.1.61
--------------

* Branding in the discovery service

Version 2.1.67
--------------

* Configure list of SAA compliant browsers

Version 2.1.119
---------------

* New release procedure

Version 2.1.126
---------------

* Center "access to" message in discovery service page
* CSS fixes
* Suggested institutions

Version 2.1.127
---------------

* Some bug fixes

Version 2.1.141
---------------

* New release procedure

Version 2.1.152
---------------

* Suggested institutions bug fixes
* Make displaying the SP logo configurable

Version 2.1.155
---------------

* Max number of suggested institutions
* Update docs

Version 2.1.162
---------------

* Notifications to the user
* Opt in to discovery Responses warning 

Version 2.1.165
---------------

* Pre-releases to test upgrades

Version 2.1.169
---------------

* Some accessibility improvements

Version 2.1.179
---------------

* Fix timing issue with suggested institutions
* Remove top padding in ds in small devices

Version 2.1.197
---------------

* Fix some accessibility and style issues
* Add code for the demo sites
* Use special logo for the populated standard button
