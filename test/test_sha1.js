var hex_sha1 = require('../src/sha1.js').default;
var assert = require('assert');
var chai = require('chai');

describe('sha1 - yes we know sha1 is bad', function() {
   it('should fail with TypeError on undefined input', function() {
      chai.expect(function() {hex_sha1(undefined)}).to.throw(TypeError);
   });
   it('should correctly process the empty string', function() {
      chai.expect(hex_sha1('')).to.equal('da39a3ee5e6b4b0d3255bfef95601890afd80709');
   });
   it('should correctly process https://idp.sunet.se/shibboleth', function() {
      chai.expect(hex_sha1('https://idp.sunet.se/shibboleth')).to.equal('3ae1e0782311042cd3b735bd9e0db92c013fadde');
   });
   
});

