

const hex_sha1 = require('./sha1.js');

function _sha1_id(s) {
    return "{sha1}"+hex_sha1(s);
}

const entities = require("./edugain.json");
const idps = entities.filter(e => e.type === 'idp');
const entities_map = {};

entities.forEach(function (e) {
    e.entity_id = e.entityID;
    e.id = _sha1_id(e.entityID);
    entities_map[e.id] = e;
});

function lookup(id) {
    console.log('id: ', id)
    console.log('entities_map[id]: ', entities_map[id])
    return entities_map[id];
}

const trustInfo = require("./tinfo.json");
function trustInfoFilter(idps, entityID, trustProfile) {
    const trustSpecs = trustInfo.filter((ti) => {
        return ti.entityID === entityID;
    });
    let result = [...idps];
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
                        const inMd = idps.filter((idp) => (idp.entityID === ent.entity_id));
                        if (inMd.length > 0) {
                            result.push(inMd[0]);
                        }
                    } else {
                        result = result.filter((idp) => (idp.entityID !== ent.entity_id));
                    }
                }
            });
            profile.entity.forEach((ent) => {
                if (ent.entity_id in extraMd) {
                    result.push(extraMd[ent.entity_id]);
                }
            });
            profile.entities.forEach((ents) => {
                const select = ents.select;
                const match = ents.match;
                if (ents.include) {
                    results = results.filter((idp) => (idp[match] === select));
                } else {
                    results = results.filter((idp) => (idp[match] !== select));
                }
            });
        }
    }
    return results;
}


const search_properties = ["scope", "title"];

function search(s, entityID, trustProfile) {
    let m = RegExp(s,'i');
    console.log('s: ', s)
    console.log('m: ', m)
    let result = idps.filter(function(e) {
        return search_properties.some(function(p) {
            return  e.hasOwnProperty(p) && m.test(e[p]);
        })
    });
    if (entityID !== undefined) {
        result = trustInfoFilter(result, entityID, trustProfile);
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
        console.log('entities: ', q)
        if (!q) {
            q = req.query.q
        }
        const entityID = req.query.entityID;
        const trustProfile = req.query.trustProfile;
        return res.json(search(q, entityID, trustProfile));
    },
    'GET /entities/:path': (req, res) => {
        let id = req.params.path.split('.');
        console.log(id)
        let entity = lookup(id[0]);
        console.log('entity: ', entity)
        if (entity) {
            return res.json(entity);
        } else {
            return res.status(404).send("Not found");
        }
    }
};
module.exports = proxy;
