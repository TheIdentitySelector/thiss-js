const assert = require('assert');
const chai = require('chai');
const MockBrowser = require('mock-browser').mocks.MockBrowser;
const window = new MockBrowser().getWindow();

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

});