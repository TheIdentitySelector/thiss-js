// Institutions added by the SP (filtering-in.md): the DS side of the extra
// metadata endpoint. Decisions in filtering-in-implementation.md. Markup:
// #ds-extra in index.ejs, templates/extra_header.html and extra.html.
import * as $ from 'jquery';
import 'ejs/ejs.min';
import {json_mdq_get_sp, ds_response_url} from "@theidentityselector/thiss-ds/src/discovery.js";
import Localization from '../localization.js';
import {extraMDEndpointFrom, fetchExtraMD, findExtra} from '../extra-md.js';
import extraHeaderHTML from './templates/extra_header.html';
import extraHTML from './templates/extra.html';

const mdq_url = process.env.MDQ_URL || "https://md.seamlessaccess.org/entities/";
const minSearchLength = Number.parseInt(process.env.MIN_SEARCH_LENGTH) || 3;
const localization = new Localization();
const urlParams = new URLSearchParams(window.location.search);
const entityID = urlParams.get('entityID');
export const extraMDEndpoint = extraMDEndpointFrom(urlParams.get('extraMDEndpoint'), window.location.protocol);

let entitiesPromise = null;
let spTitlePromise = null;

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

function lang() {
    return (localization.locale || 'en').split('-')[0];
}

function localTitle(entity) {
    if (entity.title_langs && entity.title_langs[lang()]) return entity.title_langs[lang()];
    return entity.title || entity.entity_id;
}

// The SP title for the header, as suggested.js resolves it; null without an
// entityID, in which case the generic wording is used.
function spTitle() {
    if (spTitlePromise === null) {
        spTitlePromise = entityID
            ? json_mdq_get_sp(entityID, mdq_url).then(sp => sp ? localTitle(sp) : entityID)
            : Promise.resolve(null);
    }
    return spTitlePromise;
}

// English fallback when the locale file is not loaded yet (as suggested.js
// does for the remove label).
function headerString(title) {
    const key = title ? 'extra-institutions-header' : 'extra-institutions-header-generic';
    const translated = localization.translateString(key, title);
    if (translated && translated !== key) return translated;
    return title ? `Institutions added by ${title}` : 'Institutions added by this site';
}

// Renders the section under the search box, with or without saved choices
// (filtering-in-implementation.md, decision 8). A no-op when the user has
// started a search by the time the endpoint answers.
export function showExtra() {
    clearExtra();
    const templ = ejs.compile(extraHTML);
    Promise.all([extraEntities(), spTitle()]).then(([entities, title]) => {
        if (entities.length === 0) return;
        if (($('#searchinput').val() || '').length >= minSearchLength) return;
        $('#ds-extra-header').html(ejs.render(extraHeaderHTML, {
            headerString: headerString(title),
            learnMoreString: localization.translateString('ds-search-learn-more'),
        }));
        entities.forEach(entity => {
            localization.updateDynamic(entity);
            $('#ds-extra-list').append(templ({
                title: localTitle(entity),
                title_i18n: entity.entityID,
                domain: entity.domain || '',
                entity_id: entity.entity_id,
            }));
        });
    });
}

// The click on an extra row. Unlike DiscoveryService.saml_discovery_response,
// the item is built from the endpoint's entity, not looked up in MDQ, and is
// stored with its extra_md flag. The redirect does not depend on the
// persistence reply.
export function selectExtra(ds, entity_id, persist) {
    return extraEntities().then(entities => {
        const entity = findExtra(entities, entity_id);
        if (!entity) throw new Error(`${entity_id} is not in the extra metadata`);
        const now = Date.now();
        const item = {entity: entity, last_refresh: now, last_use: now};
        const stored = persist
            ? ds.ps.update(ds.context, item).catch(err => console.log(`Error persisting extra entity: ${err}`))
            : Promise.resolve();
        return stored.then(() => {
            const params = Object.fromEntries(new URLSearchParams(window.location.search));
            window.top.location.href = ds_response_url(entity, params);
        });
    }).catch(err => console.log(err));
}

document.addEventListener('sa:locale-changed', () => {
    if ($('#extra-header-string').length > 0)
        spTitle().then(title => $('#extra-header-string').text(headerString(title)));
});
