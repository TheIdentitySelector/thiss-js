
# Docker compose environment to demo SeamlessAccess

This environment exposes 5 web sites:

- A shibboleth IdP
- A thiss-mdq service serving the metadata for the demo
- A SeamlessAccess SAML discovery site built with thiss-js. Each of the SPs will use SeamlessAccess Stardard integration as discovery for the IdP.
- 2 sites that will have a page each and will be secured by shibboleth SP, such that an unauthenticated user will see less content than an authenticated one (the contents will be provided later). These sites will show a Standard Integration SeamlessAccess button to provide access to the IdP.

The XML metadata held by the IdP and the 2 SPs will consist in just an EntityDescriptor for each of the 3 sites.
The discojson metadata served by the thiss-mdq site will include the 3 entries corresponding to the XML entities plus a few mock entities to populate the discovery service searches.

We will have 4 top level domains sp1.org, sp2.org, idp.org, and sa.org. sa.org has 2 subdomains, md.sa.org for the thiss-mdq server and service.sa.org for the thiss-js site. The names will be configurable.

Use https://github.com/nginx-proxy/nginx-proxy and https://hub.docker.com/r/nginxproxy/acme-companion as frontend fopr the rest of the services. It will run in a VM with the necessary DNS set up.
