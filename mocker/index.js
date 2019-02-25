
const entities = require("./data.json");

function lookup(id) {
    entities.forEach(function(entity) {
       if (entity.id == id) { return entity; }
    });
    return undefined;
}

const search_properties = ["scopes", "title"];

function search(q) {
    let result = [];
    entities.forEach(function(entity) {
        search_properties.forEach(function(p) {
            if (entity.hasOwnProperty(p)) {
                if (entity[p].indexOf(q) > 0) {
                    result.push(entity);
                }
            }
        })
    });
    return result;
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
    'GET /entities/:id': (req, res) => {
        let entity = lookup(req.params.id);
        if (entity) {
            return res.json(entity);
        } else {
            return res.status(404).send("Not found");
        }
    }
};
module.exports = proxy;