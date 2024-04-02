
# StorageAccess API demo

This is a minimal implementation of a setup where we attempt to set
a cookie from the top level and read it from an iframe embedded in
a different origin, to mimic the behaviour of the persistence service
used in SeamlessAccess.

It consists on these parts:

* An origin (`test.sa.net`) representing SeamlessAccess, serving 2 pages:
  * A page (page1) meant to be visited at the top level, located at `/`,
    that will set a cookie as soon as it is loaded, will allow a visitor
    to change the value of the stored cookie by clicking on a button(s),
    and will also display links to navigate to the 2 origins
    representing SPs (see below).
  * A page (page2), located at `iframe.html`, meant to be embedded in an
    iframe within a service provider page. This embedded page will:
    1. Attempt to use the Storage Access API to read the cookie set
       by the top level page1 mentioned above and display it within the
       iframe.
    2. Display a link to navigate to page1 at the top level. If in step (1)
       page2 had no storage access permission, clicking on this link will
       also use the Storage Access API to attempt to gain permission, possibly
       via prompting the end user, so that in a subsequent visit to the SP
       page, the page2 in the iframe will have storage access.
* Two origins (`test.sp1.net` and `test.sp2.net`) representing service
  providers, that embed the page2 mentioned above in an iframe.

## Using it

To launch the demo:

```bash
  $ git clone https://github.com/TheIdentitySelector/thiss-js/
  $ cd thiss-js/experiments/storage-access-demo
  $ mkdir logs
```

Make TLS certificates. mkcert is a handy tool for this.

```bash
  $ mkdir certs
  $ cd certs
  $ mkcert test.sp1.net
  $ mkcert test.sp2.net
  $ mkcert test.sa.net
  $ cd -
```

Add the needed origins to you hosts file:

```bash
  $ sudo vim /etc/hosts   # Add test.sp1.net, test.sp2.net, and test.sa.net to 127.0.0.1
```

Set 3 variables in `nginx-env`:

* USERNAME: your user name at localhost, owner of the cloned repo.
* CERTS_LOCATION: Full path of directory where you have put the TLS certs,
  with no trailing slash.
* DEMO_LOCATION: Full path to the `storage-access-demo` directory within
  the cloned repo, with no trailing slash

Set the above variables in nginx.conf, e.g. with envsubst

```bash
  $ source nginx-env
  $ envsubst < nginx-template.conf > nginx.conf
```

Run nginx:

```bash
  $ sudo nginx -c /path/to/storage-access-demo/nginx.conf
```

Now it should be possible to browse https://test.sp1.net, https://test.sp2.net,
and https://test.sa.net.

Note that to check the Storage Access API implementation in chrome, it is
necessary to set the [Test third party cookie phaseout](chrome://flags/#test-third-party-cookie-phaseout)
flag to enabled.

Note that if you have not used mkcert or you have not run `mkcert -install`,
you may need to add the self-signed certs to the browser's trusted certs.
