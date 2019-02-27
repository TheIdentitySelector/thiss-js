const assert = require('assert');
const chai = require('chai');
const MockBrowser = require('mock-browser').mocks.MockBrowser;
const window = new MockBrowser().getWindow();
const fetchMock = require('fetch-mock');
const { Response, Request, Headers, fetch } = require('isomorphic-fetch');

describe('DiscoveryService', function() {

    beforeEach(function() {
       global.window = window;
       global.DiscoveryService = require('../src/discovery.js').DiscoveryService;
       global.fetchMock = fetchMock;
    });

    it('exists', function() {
        chai.expect(DiscoveryService).to.exist;
    });

    it('has a working constructor', function() {
        chai.expect(new DiscoveryService("http://localhost","http://localhost","foo")).to.exist;
    });

    it('is able to run MDQ', function () {
        let ds = new DiscoveryService("http://localhost","http://localhost/ps");
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