import {assert} from 'chai';
import {extraMDEndpointFrom, normalizeExtraMD, fetchExtraMD, findExtra} from '../src/extra-md.js';

describe('extraMDEndpointFrom', function () {
    it('accepts absolute https URLs', function () {
        assert.equal(extraMDEndpointFrom('https://sp.example.com/extra-md'), 'https://sp.example.com/extra-md');
    });
    it('accepts http only on an http page', function () {
        assert.isNull(extraMDEndpointFrom('http://sp.example.com/extra-md'));
        assert.equal(extraMDEndpointFrom('http://sp.example.com/extra-md', 'http:'), 'http://sp.example.com/extra-md');
    });
    it('rejects everything else', function () {
        ['/extra-md', 'javascript:alert(1)', 'data:application/json,[]', '', null, undefined, 42].forEach(v => {
            assert.isNull(extraMDEndpointFrom(v), String(v));
        });
    });
});

describe('normalizeExtraMD', function () {
    it('flags entities and fills both id fields', function () {
        const out = normalizeExtraMD([{entityID: 'https://idp.example.org/idp', title: 'IdP'}]);
        assert.deepEqual(out, [{entityID: 'https://idp.example.org/idp', entity_id: 'https://idp.example.org/idp', title: 'IdP', extra_md: true}]);
        assert.equal(normalizeExtraMD([{entity_id: 'https://a'}])[0].entityID, 'https://a');
    });
    it('drops unusable entries', function () {
        const out = normalizeExtraMD([
            null, 'x', {title: 'no id'}, {entityID: ''},
            {entityID: 'https://h', hidden: true}, {entityID: 'https://h2', hidden: 'true'},
            {entityID: 'https://a&b'}, {entityID: 'https://a#b'}, {entityID: 'https://a b'},
            {entityID: 'https://kept', hidden: 'false'},
        ]);
        assert.deepEqual(out.map(e => e.entityID), ['https://kept']);
    });
    it('joins an array of domains', function () {
        assert.equal(normalizeExtraMD([{entityID: 'https://a', domains: ['a.org', 'b.org']}])[0].domains, 'a.org;b.org');
    });
    it('treats non-arrays as empty', function () {
        [null, undefined, {}, 'x', 1].forEach(v => assert.deepEqual(normalizeExtraMD(v), []));
    });
});

describe('fetchExtraMD', function () {
    const reply = (ok, status, contentType, body) => () => Promise.resolve({
        ok, status, headers: {get: () => contentType}, json: () => Promise.resolve(body)});
    const original = global.fetch;
    afterEach(() => { global.fetch = original; });

    it('resolves to the normalized list', async function () {
        global.fetch = reply(true, 200, 'application/json; charset=utf-8', [{entityID: 'https://a'}, {title: 'no id'}]);
        assert.deepEqual((await fetchExtraMD('https://x')).map(e => e.entityID), ['https://a']);
    });
    it('resolves to an empty list on a non-JSON reply, an error status or a network error', async function () {
        global.fetch = reply(true, 200, 'text/html', []);
        assert.deepEqual(await fetchExtraMD('https://x'), []);
        global.fetch = reply(false, 500, 'application/json', [{entityID: 'https://a'}]);
        assert.deepEqual(await fetchExtraMD('https://x'), []);
        global.fetch = () => Promise.reject(new TypeError('Failed to fetch'));
        assert.deepEqual(await fetchExtraMD('https://x'), []);
    });
});

describe('findExtra', function () {
    it('looks up by entityID', function () {
        const list = normalizeExtraMD([{entityID: 'https://a'}, {entityID: 'https://b'}]);
        assert.equal(findExtra(list, 'https://b').entityID, 'https://b');
        assert.isUndefined(findExtra(list, 'https://c'));
        assert.isUndefined(findExtra([], 'https://a'));
    });
});
