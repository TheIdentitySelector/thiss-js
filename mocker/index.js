

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
    return entities_map[id];
}

const search_properties = ["scope", "title"];

function search(s) {
    let m = RegExp(s,'i');
    return idps.filter(function(e) {
        return search_properties.some(function(p) {
            return  e.hasOwnProperty(p) && m.test(e[p]);
        })
    });
}

const proxy = {
    _proxy: {
        proxy: {
            '/entities/': 'http://localhost:8080/',
        },
        changeHost: true
    },
    'GET /entities/': (req, res) => {
        let q = req.query.query;
        return res.json(search(q));
    },
    'GET /entities/:path': (req, res) => {
        let id = req.params.path.split('.');
        let entity = lookup(id[0]);
        if (entity) {
            return res.json(entity);
        } else {
            return res.status(404).send("Not found");
        }
    }
};
module.exports = proxy;
