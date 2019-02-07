const assert = require('assert');
const chai = require('chai');
const MockBrowser = require('mock-browser').mocks.MockBrowser;
const window = new MockBrowser().getWindow();

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
    });

    it('exists', function() {
        chai.expect(DiscoveryService).to.exist;
    });

    it('has a working constructor', function() {
        chai.expect(new DiscoveryService("http://localhost","http://localhost")).to.exist;
    });

    it('shims LocalStorage', function() {
       let ds = new DiscoveryService("http://localhost", "local://");
       ds.get_storage().onConnect().then(function(storage) {
           chai.expect(typeof storage).to.equal('object');
           chai.expect(typeof storage.set).to.equal('function');
           chai.expect(typeof storage.get).to.equal('function');
           chai.expect(typeof storage.onConnect).to.equal('function');
       });
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