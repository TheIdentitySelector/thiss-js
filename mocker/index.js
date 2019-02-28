
const entities = require("./data.json");

function lookup(id) {
    return entities.find(entity => entity.id === id);
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