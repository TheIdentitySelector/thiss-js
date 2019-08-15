Introduction
============

The Identity Selector Software (thiss.io) is an implementation of an identity selector supported by `the Coalition for Seamless Access <https://seamlessaccess.org/>`_. It implements a discovery service using the `RA21.org <https://ra21.org>`_ `recommended practices for discovery UX <https://groups.niso.org/apps/group_public/download.php/21376/NISO_RP-27-2019_RA21_Identity_Discovery_and_Persistence-public_comment.pdf>`_.

The Identity Selector Software suite is a front-channel identity selector for distributed identity ecosystems aka `Federated Identity Management <https://en.wikipedia.org/wiki/Federated_identity>`_. The objective is to simplify the process of choosing an "identity provider" by having the browser remember the users choice in browser local store. Currently the system has been used for large-scale SAML-based identity federations but there are no intrinsic dependencies to SAML as such and the system could be easily adapted to other protocols that follow the common pattern of federation by relying on redirecting the user to an authentication provider of some sort.

The system was designed with privacy as the number one focus. No information is shared with the relying party during the identity provider choice process. This is ensured by relying on the browser security model and judicious use of inter-domain communicatiton using post-message.

This package (thiss-ds-js) contains the parts needed to write a client that talks to an instance of a thiss-js service (eg use.thiss.io or service.seamlessaccess.org).

Architecture
------------

The Identity Selector Software (thiss.io) is a set of front-channel (aka browser-based) cross-domain APIs using post-message (built using the `post-robot <https://github.com/krakenjs/post-robot>`_ package):

* A persistence API that allows store & retrieval of information about the last N (3) identity providers used to authenticate a user. Unlike simlilar project (eg google account chooser) the information stored does not include any PII (eg email-addresses) but only identifies the identity provider used in a way consistent with the authentication protocol used.
* A discovery API that implements `SAML identity provider discovery <http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-idp-discovery.pdf>`_ layered on top of the persistence API

Both of these APIs have a *server* and a *client* component. The client APIs can be found in `thiss-ds-js <https://github.com/TheIdentitySelector/thiss-ds-js>`_. The server components can be found in this repository. The server component is implemented as javascript running in an iframe fetched from a service URI. This ORIGIN (in the sense of the w3c security model) protects access to the browser local store and ensures that the calling page only has access to the intended API. The calling page (aka the client) is responsible for initializing the iframe but after this no longer has any control over the code executing inside it. The *server* iframe, while executing in the client browser, is therefore sandboxed from the calling page.

The persistence API is completely protocol agnostic eg has no dependency on SAML, all of which are in the discovery API. Future versions are expected to provide similar APIs for OpenID Connect supporting `OpenID connect federation <https://openid.net/specs/openid-connect-federation-1_0.html>`_ and possibly other protocols.

Audience
--------

This documentation is mostly aimed at integrators and developers who want to understand how the components matching the thiss-ds-js API are implemented and/or want to deploy their own instances of this software instead of relying on an existing service like use.thiss.io or service.seamlessaccess.org
