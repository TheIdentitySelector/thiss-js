// Institutions added by the SP (filtering-in.md): the DS side of the extra
// metadata endpoint. Decisions in filtering-in-implementation.md. Markup:
// #ds-extra in index.ejs, templates/extra_header.html and extra.html.
import * as $ from 'jquery';
import {extraMDEndpointFrom, fetchExtraMD} from '../extra-md.js';

const urlParams = new URLSearchParams(window.location.search);
export const extraMDEndpoint = extraMDEndpointFrom(urlParams.get('extraMDEndpoint'), window.location.protocol);

let entitiesPromise = null;

// The endpoint's entities, fetched once per page load. Resolves to an empty
// list when there is no usable endpoint, so callers need no special case.
export function extraEntities() {
    if (entitiesPromise === null) {
        entitiesPromise = extraMDEndpoint ? fetchExtraMD(extraMDEndpoint) : Promise.resolve([]);
    }
    return entitiesPromise;
}

export function clearExtra() {
    $('#ds-extra-header').html('');
    $('#ds-extra-list').html('');
}
