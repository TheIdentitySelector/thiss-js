const assert = require('assert');
const chai = require('chai');
const MockBrowser = require('mock-browser').mocks.MockBrowser;
const window = new MockBrowser().getWindow();
const fetchMock = require('fetch-mock');
const { Response, Request, Headers, fetch } = require('isomorphic-fetch');

describe('ds-client.js', function() {
   it('polyfills Object.values', function() {
       chai.expect(Object.values).to.exist;
       chai.expect(typeof Object.values).to.equals('function');
   });
});

describe('DiscoveryService', function() {

    beforeEach(function() {
       global.window = window;
       global.DiscoveryService = require('../src/ds-client.js').DiscoveryService;
       global.fetchMock = fetchMock;
    });

    it('exists', function() {
        chai.expect(DiscoveryService).to.exist;
    });

    it('has a working constructor', function() {
        chai.expect(new DiscoveryService("http://localhost","http://localhost")).to.exist;
    });

    it('shims LocalStorage when storage_url is local://', function() {
       let ds = new DiscoveryService("http://localhost", "local://");
       ds.storage().onConnect().then(function(storage) {
           chai.expect(typeof storage).to.equal('object');
           chai.expect(typeof storage.set).to.equal('function');
           chai.expect(typeof storage.get).to.equal('function');
           chai.expect(typeof storage.onConnect).to.equal('function');
       });
    });

    it('is able to run MDQ', function () {
        let ds = new DiscoveryService("http://localhost", "local://");
        fetchMock.get('*',[{
            "domain": "example.com",
            "title": "Example.com Login",
            "auth": "saml",
            "scope": "example.com",
            "entityID": "https://idp.example.com/idp",
            "hidden": "false"
        }]);
        ds.mdq('{sha1}d0469ad9c683b6cf90de8210fba9a15b75fd3b2e')
            .then(function (entity) {
                chai.expect(entity).to.exist;
                chai.expect(entity.entityID).to.equal("https://idp.example.com/idp");
            });
        fetchMock.reset();
    });

});

describe('LocalStoreShim', function() {

   beforeEach(function() {
       global.window = window;
       global.LocalStoreShim = require('../src/ds-client.js').LocalStoreShim;
    });

    it('exists', function() {
        chai.expect(LocalStoreShim).to.exist;
    });

    it('stores', function() {
        let store = new LocalStoreShim();
        store.set("a","b");
        chai.expect(store).to.exist;
    });

    it('stores and retrieves', function() {
        let store = new LocalStoreShim();
        store.set("a","b");
        store.get('a').then(function(x) {
            chai.expect(x).to.equal('b');
        });
    });

});