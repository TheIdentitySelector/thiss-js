

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
function trustInfoFilter(preresult, entityID, trustProfile) {
    console.log('running trustInfoFilter entityID: ', entityID)
    console.log('running trustInfoFilter trustProfile: ', trustProfile)

    const trustSpecs = trustInfo.filter((ti) => {
        console.log('ti: ', ti)
        return ti.entityID === entityID;
    });
    console.log('running trustInfoFilter trustSpecs: ', trustSpecs)

    let result = [...preresult];
    console.log('running trustInfoFilter result: ', result)

    if (trustSpecs.length > 0) {
        const trustSpec = trustSpecs[0];
        const extraMd = trustSpec.extra_md || {};
        const profile = trustSpec.profiles[trustProfile];
        console.log('running trustInfoFilter trustSpec: ', trustSpec)
        console.log('running trustInfoFilter extraMd: ', extraMd)
        console.log('running trustInfoFilter profile: ', profile)

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
            });
            profile.entity.forEach((ent) => {
                if (ent.entity_id in extraMd) {
                    result.push(extraMd[ent.entity_id]);
                }
            });
        }
    }
    return result;
}


const search_properties = ["scope", "title"];

function search(s, entityID, trustProfile) {
    console.log('search')
    console.log('search entityID: ', entityID)
    console.log('search trustProfile: ', trustProfile)

    let result;
    if (s !== null) {
        let m = RegExp(s,'i');
        console.log('s: ', s)
        console.log('m: ', m)
        result = idps.filter(function(e) {
            return search_properties.some(function(p) {
                return  e.hasOwnProperty(p) && m.test(e[p]);
            })
        });
    } else {
        result = idps;
    }
    if (entityID !== undefined) {
        console.log('init trustInfoFilter')
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
        if (!q) {
            q = req.query.q
        }
        const entityID = decodeURI(req.query.entityID);
        const trustProfile = decodeURI(req.query.trustProfile);
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
