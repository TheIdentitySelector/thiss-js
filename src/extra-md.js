// Filtering-in (filtering-in.md): helpers shared by the standard button and
// the DS for the SP-provided extra metadata endpoint. Decisions in
// filtering-in-implementation.md. No thiss-ds import: that pulls in
// post-robot, which needs window, and this module is unit-tested in node.

// The endpoint URL, or null when the value is not usable. Only absolute https
// URLs are accepted; http only when the page itself is http (demo site), since
// an https page cannot fetch it anyway.
export function extraMDEndpointFrom(value, pageProtocol = 'https:') {
    if (typeof value !== 'string' || value === '') return null;
    let url;
    try {
        url = new URL(value);
    } catch (err) {
        return null;
    }
    if (url.protocol === 'https:' || (url.protocol === 'http:' && pageProtocol === 'http:'))
        return url.href;
    return null;
}

// The endpoint's discojson array reduced to the entities the DS may offer,
// each flagged extra_md. Dropped: entries without an id, hidden entries, and
// entries whose id would break the return URL (ds_response_url concatenates
// it unencoded). An array of domains is joined as clean_item expects.
export function normalizeExtraMD(data) {
    if (!Array.isArray(data)) return [];
    const entities = [];
    data.forEach(e => {
        if (!e || typeof e !== 'object') return;
        const id = e.entityID || e.entity_id;
        if (typeof id !== 'string' || id === '' || /[&#\s]/.test(id)) return;
        if (e.hidden === true || e.hidden === "true") return;
        const entity = {...e, entityID: id, entity_id: id, extra_md: true};
        if (Array.isArray(entity.domains)) entity.domains = entity.domains.join(';');
        entities.push(entity);
    });
    return entities;
}

// Resolves to the normalized list; an unreachable or malformed endpoint
// resolves to an empty list, so callers treat both the same way. Same rules
// as thiss-ds json_mdq: GET with Accept: application/json, JSON reply required.
export function fetchExtraMD(url) {
    const opts = {method: 'GET', headers: {'Accept': 'application/json'}};
    return fetch(url, opts).then(response => {
        const contentType = response.headers.get("content-type");
        if (!response.ok)
            throw new Error(`HTTP ${response.status}`);
        if (!contentType || !contentType.includes("application/json"))
            throw new SyntaxError("extra metadata endpoint didn't provide a JSON response");
        return response.json();
    }).then(normalizeExtraMD).catch(err => {
        console.log(`Error fetching extra metadata from ${url}: ${err}`);
        return [];
    });
}

export function findExtra(entities, entityID) {
    return entities.find(e => e.entityID === entityID);
}
