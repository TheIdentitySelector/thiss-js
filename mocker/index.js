

const hex_sha1 = require('./sha1.js');

function _sha1_id(s) {
    return "{sha1}"+hex_sha1(s);
}

const entities = require("./disco.json");
const idps = entities.filter(e => e.type === 'idp');
const entities_map = {};

entities.forEach(function (e) {
    e.entity_id = e.entityID;
    e.id = _sha1_id(e.entityID);
    entities_map[e.id] = e;
});

function lookup(id) {
    return entities_map[id];
}


const trustInfo = require("./disco_sp.json");
const tiIdps = trustInfo.filter(e => e.type === 'idp');
const tiEntitiesMap = {};
trustInfo.forEach(function (e) {
    e.entity_id = e.entityID;
    tiEntitiesMap[e.entityID] = e;
});

function lookup_with_profile(id, entityID, trustProfileName) {
    try {
        // here we check that the requested entity fits with the specified trust profile,
        // and add a hint if necessary
        let entity = entities_map[id];

        const trustProfile = tiEntitiesMap[entityID]['profiles'][trustProfileName];
        const extraMetadata = tiEntitiesMap[entityID]['extra_md'];
        const strictProfile = trustProfile.strict;

        let fromExtraMd = false;
        // first we check whether the entity comes from external metadata
        if (entityID in extraMetadata) {
            entity = {...extraMetadata[id]};
            fromExtraMd = true;
        }
        // if the entity is not in the internal or external metadata, return not found.
        if (!entity) {
            console.log('if the entity is not in the internal or external metadata, return not found.')
            return entity;
        }
        let seen = false;

        // check whether the entity is selected by some specific entity clause
        trustProfile.entity.forEach((e) => {
            if (e.include && e.entity_id === entity.entity_id) {
                seen = true;
            } else if (!e.include && e.entity_id !== entity.entity_id) {
                seen = true;
            }
        });
        // if the entity comes from external metadata,
        // return it only if it was selectd by the profile,
        // otherwise return not found.
        if (fromExtraMd) {
            if (seen) {
                return entity;
            } else {
                return undefined;
            }
        }
        // check whether the entity is selected by some entities clause in the profile
        trustProfile.entities.forEach((e) => {
            if (e.include && entity[e.match] === e.select) {
                seen = true;
            } else if ((!e.include) && entity[e.match] !== e.select) {
                seen = true;
            } else {
                seen = false;
            }
        });

        // if the profile is strict, return the entity if it was selected by the profile,
        // and not found otherwise
        if (strictProfile) {
            if (seen) {
                return entity;
            } else {
                return undefined;
            }
            // if the profile is not strict, set the hint if the entity was not selected by the profile,
            // and return the entity.
        } else {
            if (seen) {
                entity = {...entity};
                entity.hint = trustProfile.display_name;
            }
            return entity;
        }
    } catch (e) {
        // on error return not found
        console.log(`Error looking up entity with id ${id} and trust profile ${entityID} for sp ${trustProfileName}: ${e}`);
        return undefined;
    }
}

function trustInfoFilter(preresult, entityID, trustProfile) {
    const trustSpecs = trustInfo.filter((ti) => {
        return ti.entityID === entityID;
    });
    let result = [...preresult];
    if (trustSpecs.length > 0) {
        const trustSpec = trustSpecs[0];
        const extraMd = trustSpec.extra_md || {};
        const profile = trustSpec.profiles[trustProfile];
        if (profile !== undefined) {
            let emptied = false;
            profile.entity.forEach((ent) => {
                if (!(ent.entity_id in extraMd)) {

                    if (ent.include) {

                        if (!emptied) {

                            result = [];
                            emptied = true;
                        }
                        const inMd = preresult.filter((idp) => (idp.entityID === ent.entity_id));
                        if (inMd.length > 0) {
                            inMd[0].trust_profile = trustProfile
                            if (profile.hasOwnProperty('strict')) {
                                inMd[0].strict = profile.strict
                            } else {
                                inMd[0].strict = false
                            }

                            result.push(inMd[0]);
                        }
                    } else {
                        result = result.filter((idp) => (idp.entityID !== ent.entity_id));
                    }
                }
            });

            profile.entities.forEach((ents) => {
                const select = ents.select;
                const match = ents.match;
                if (ents.include) {

                    result = result.filter((idp) => (idp[match] === select));
                } else {
                    result = result.filter((idp) => (idp[match] !== select));
                }

                result = result.map((institution) => {
                    institution.strict = profile.strict
                    institution.trust_profile = trustProfile

                    return institution
                })
            });
            profile.entity.forEach((ent) => {
                if (ent.entity_id in extraMd) {
                    extraMd.trust_profile = trustProfile

                    if (profile.hasOwnProperty('strict')) {
                        extraMd[ent.entity_id].strict = profile.strict
                    } else {
                        extraMd[ent.entity_id].strict = false
                    }

                    result.push(extraMd[ent.entity_id]);
                }
            });
            if (!profile.strict) {
                const selected = result.map(idp => idp.entityID);
                result = [];
                for (idp of idps) {
                    const newIdp = {...idp};
                    newIdp.trust_profile = trustProfile

                    if (newIdp.hint === undefined && (selected.includes(newIdp.entityID))) {
                        newIdp.hint = profile.display_name;
                    }

                    newIdp.strict = false

                    result.push(newIdp);
                }
            }
        }
    }

    return result;
}


const search_properties = ["scope", "title"];

function search(s, entityID, trustProfile) {
    let result = idps;
    if (entityID !== null) {
        result = trustInfoFilter(result, entityID, trustProfile);
    }
    if (s !== null) {
        let m = RegExp(s,'i');

        result = result.filter(function(e) {
            return search_properties.some(function(p) {
                return  e.hasOwnProperty(p) && m.test(e[p]);
            })
        });
    }
    return result;
}

const proxy = {
    _proxy: {
        proxy: {
            '': 'http://127.0.0.1:8080/',
        },
        changeHost: true
    },
    '/entities/': (req, res) => {
        let q = req.query.query;
        if (!q) {
            q = req.query.q
        }
        const entityID = decodeURI(req.query.entityID);
        const trustProfile = decodeURI(req.query.trustProfile);
        return res.json(search(q, entityID, trustProfile));
    },
    'GET /entities/:path/:entity_id/:trust_profile': (req, res) => {
        let entityID = null
        let trustProfile = null
        let id = req.params.path.split('.');

        if (req.params.hasOwnProperty('entity_id')) {
            entityID = decodeURI(req.params.entity_id);
        }

        if (req.params.hasOwnProperty('trust_profile')) {
            trustProfile = req.params.trust_profile;
        }

        let entity

        if (entityID && trustProfile) {
            entity = lookup_with_profile(id[0], entityID, trustProfile);
            if (!entity) {
                entity = lookup(id[0])
            }
        } else {
            entity = lookup(id[0])
        }

        if (entity) {
            return res.json(entity);
        } else {
            return res.status(404).send("Not found");
        }
    }
};
module.exports = proxy;
