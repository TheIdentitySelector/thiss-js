const postRobot = require("post-robot");
let whitelist = [];
if (process.env.WHITELIST && process.env.WHITELIST.length > 0) {
    whitelist = process.env.WHITELIST.split(',').map(s => s.trim())
}
const Storages = require('@theidentityselector/js-storage');
let pubkey = undefined;
if (process.env.AUTH_PUBKEY && process.env.PUBKEY.length > 0) {
    pubkey = process.env.AUTH_PUBKEY;
}

import { base64url } from 'rfc4648'

const cache_time = 60 * 10 * 1000;

if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

function _timestamp() {
   return Date.now();
}

String.prototype.hexEncode = function(){
    let hex, i;

    let result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
};

String.prototype.hexDecode = function(){
    let j;
    let hexes = this.match(/.{1,4}/g) || [];
    let back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
};

class ContextStack {
    constructor(names) {
        this.contexts = names.map(n => _ctx(n));
    }

    keys() {
        let _keys = {};
        this.contexts.forEach(ctx => ctx.keys().forEach(k => _keys[k]=true));
        return _keys.keys();
    }

    get(k) {
        let ctx = this.contexts.find(ctx => ctx.isSet(k));
        return ctx ? ctx.get(k) : undefined;
    }

    set(k, v) {
        this.contexts[0].set(k,v)
    }

    isSet(k) {
       let ctx = this.contexts.find(ctx => ctx.isSet(k));
       return ctx ? true : false;
    }

    distance(context) {
        return this.contexts.findIndex(ctx => ctx.get('_name') === context);
    }
}

function _ctx(context) {
    if (!context) {
        context = process.env.DEFAULT_CONTEXT
    }
    let ns = Storages.initNamespaceStorage(context);
    let storage = ns.localStorage;
    storage.set('_name', context);
    return storage;
}

function is_valid(item, ts) {
    return item !== undefined && item.last_refresh !== undefined && item.last_refresh + cache_time > ts;
}

function clean_item(item) {
    if (item.entity) {
    let entity = item.entity;
        if (entity.entityID && !entity.entity_id) {
            entity.entity_id = entity.entityID;
        }
        if (entity.icon && !entity.entity_icon) {
            entity.entity_icon = entity.icon;
        }
        if (entity.domains) {
            let domains = entity.domains.split(';') || [];
            entity.domain = domains[0];
        }
        if (entity.last_refresh && !entity.last_use) {
            entity.last_use = entity.last_refresh;
        }
        if (!entity.title) {
            entity.title = entity.entity_id;
        }
    }
    return item;
}

function gc(storage) {
    storage.keys().filter(k => k !== undefined && k !== '_name')
        .map(k => clean_item(get_entity(storage, k)))
        .sort(function(a,b) {
            return b.last_use - a.last_use;
        }).slice(3).forEach(function (item) {
            storage.remove(item.entity.entity_id.hexEncode());
        });
}

function get_entity(storage, id) {
    if (storage.isSet(id)) {
        return storage.get(id);
    } else {
        return undefined;
    }
}

async function check_apikey (event, jwKey) {
  const jwsSigningInput = event.data.apikey.split('.').slice(0, 2).join('.')
  const jwsSignature = event.data.apikey.split('.')[2]
  return window.crypto.subtle
    .importKey('jwk', jwKey, {
         name: 'ECDSA',
         hash: { name: 'SHA-256' }
       }, false, ['verify'])
    .then(key=>
      window.crypto.subtle.verify(
        {
            name: 'ECDSA',
            hash: {name: 'SHA-256' }},
        key,
        base64url.parse(jwsSignature, { loose: true }),
        new TextEncoder().encode(jwsSigningInput))
      ).then(function(valid) { event.valid = valid; return event })
}

function validate(event) {
    event.valid = false
    if (whitelist && whitelist.length > 0) {
        event.valid = whitelist.some(o => { return event.origin.endsWith(o) })
    } else if (pubkey && pubkey.length > 0) {
        if (event.data.apikey.length > 0) {
            return check_apikey(event, pubkey)
        }
    } else {
        event.valid = true
    }
    return Promise.resolve(event)
}

function check_access(event) {
    if (!event.valid) {
        throw new Error(`Access denied from ${event.origin}`)
    }
    return event;
}

postRobot.on('update', {window: window.parent}, function(event) {
    return validate(event).then(check_access).then(event => {
        let entity = event.data.entity;
        let storage = _ctx(event.data.context);
        let now = _timestamp();
        if (entity.entityID && !entity.entity_id) {
            entity.entity_id = entity.entityID;
        }
        let id = entity.entity_id.hexEncode();
        let item = get_entity(storage, id);
        if (!is_valid(item, now)) {
            item = {"last_refresh": now, "last_use": now, "entity": entity};
        } else {
            item.last_refresh = now;
            item.last_use = now;
            item.entity = entity;
        }
        storage.set(id, clean_item(item));
        gc(storage);
        return item;
    })
});

postRobot.on('entities', {window: window.parent}, function(event) {
    return validate(event).then(check_access).then(event => {
        let storage = _ctx(event.data.context);
        let count = event.data.count;
        if (count === undefined) {
            count = 3;
        }
        let now = _timestamp();
        return storage.keys().filter(k => k !== undefined && k !== '_name')
            .map(k => clean_item(get_entity(storage, k)))
            .sort(function (a, b) {
                return a.last_use - b.last_use;
            }).slice(0, count);
    })
});

postRobot.on('entity', {window: window.parent}, function(event) {
    return validate(event).then(check_access).then(event => {
        let storage = _ctx(event.data.context);
        let entity_id = event.data.entity_id;
        if (!entity_id) {
            throw new Error("Unable to find entity_id in request")
        }
        let id = entity_id.hexEncode();
        let item = get_entity(storage, id);
        if (item) {
            let now = _timestamp();
            item.last_use = now;
            storage.set(id, clean_item(item));
        }
        return item;
    })
});

postRobot.on('remove', {window: window.parent}, function(event) {
    return validate(event).then(check_access).then(event => {
        let storage = _ctx(event.data.context);
        let entity_id = event.data.entity_id;
        if (entity_id === undefined) {
        } else {
            storage.remove(entity_id.hexEncode());
        }
    })
});
