const postRobot = require("post-robot");
import 'core-js/actual';

import {requestingStorageAccess, hasSAPerm} from "../saa.js";
import getStorages from "../storage/index.js";

let whitelist = [];
let expire_enabled = false;
if (process.env.WHITELIST && process.env.WHITELIST.length > 0) {
    whitelist = process.env.WHITELIST.split(',').map(s => s.trim())
}
if (process.env.EXPIRE_ENABLED) {
    let v = process.env.EXPIRE_ENABLED.toLowerCase()
    expire_enabled = (v === 'true') || (v === 'on') || (v === '1')
}

let Storages = await getStorages();
let globalStorages = await getStorages(true);
const storagePerm = await hasSAPerm();
let doPersist = false;

const max_cache_time = 30  * 1000;
const item_ttl = parseInt(process.env.ITEM_TTL || "3600") * 1000;


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

function _ctx_global(context) {
    if (!context) {
        context = process.env.DEFAULT_CONTEXT
    }
    let ns = globalStorages.initNamespaceStorage(context);
    let storage = ns.localStorage;
    storage.set('_name', context);
    return storage;
}

function is_valid(item, ts) {
    const a = item.last_refresh + max_cache_time  + item_ttl
    return item !== undefined && item.last_refresh !== undefined && item.last_refresh + max_cache_time  + item_ttl > ts;
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
    console.log("gc...")
    storage.keys().filter(k => k !== undefined && k !== '_name')
        .map(k => clean_item(get_entity(storage, k)))
        .sort(function(a,b) {
            return b.last_use - a.last_use;
        }).slice(3).forEach(function (item) {
            storage.remove(item.entity.entity_id.hexEncode());
        });
    let now = _timestamp();
    storage.keys().filter(k => k !== undefined && k !== '_name')
        .map(k => get_entity(storage, k))
        .forEach(item => {
            if (!is_valid(item, now)) {
                console.log("... removing")
                storage.remove(item.entity.entity_id.hexEncode())
            }
        });
}

function get_entity(storage, id) {
    if (storage.isSet(id)) {
        return storage.get(id);
    } else {
        return undefined;
    }
}

function check_access(event) {
    if (whitelist && whitelist.length > 0) {
        if (!whitelist.some(o => { return event.origin.endsWith(o) })) {
            throw `Access denied from ${event.origin}`
        }
    }
}

function set_entity(storage, entity) {
    let item;
    let now = _timestamp();
    if (entity.entity != undefined) { // we were given the full metadata interface
        item = entity;
        entity = item.entity;
    } else { // legacy interface
        item = {"last_refresh": now, "last_use": now, "entity": entity};
    }

    if (entity.entityID && !entity.entity_id) {
        entity.entity_id = entity.entityID;
    }
    let id = entity.entity_id.hexEncode();
    item = clean_item(item);
    return storage.set(id, item)
}

const advCheckbox = document.getElementById('ps-checkbox-adv');

if (advCheckbox) {
    advCheckbox.addEventListener('click', async (event) => {

        const global_storage = _ctx_global();
        let stored_institutions = global_storage.keys().filter(k => k !== undefined && k !== '_name')
            .map(k => clean_item(get_entity(global_storage, k)));

        requestingStorageAccess(async () => {
            Storages = await getStorages();
            const storage = _ctx();

            stored_institutions.forEach(ins => {
                set_entity(storage, ins);
            });
            postRobot.send(window.parent, 'init')
            postRobot.send(window.parent, 'start')
        });
        doPersist = advCheckbox.checked;
    });
    if (storagePerm) {
        advCheckbox.checked = true;
        doPersist = true;
    } else {
        advCheckbox.checked = false;
        doPersist = false;
    }
}

postRobot.on('persist', {window: window.parent}, function(event) {
    if (!doPersist) {
        return
    }
    check_access(event);
    let entities = event.data.entities;
    let storage = _ctx(event.data.context);
    storage.removeAll();
    storage.set('_name', event.data.context);

    entities.forEach(entity => {
        set_entity(storage, entity)
    })
});

postRobot.on('update', {window: window.parent}, function(event) {
    if (!doPersist) {
        return
    }
    check_access(event);
    let entity = event.data.entity;
    let storage = _ctx(event.data.context);
    const ret = set_entity(storage, entity);
    postRobot.send(window.parent, 'start');
    return ret;
});

postRobot.on('expire', {window: window.parent}, function(event) {
    if (expire_enabled) {
        check_access(event);
        let storage = _ctx(event.data.context);
        gc(storage);
        let global_storage = _ctx_global(event.data.context);
        gc(global_storage);
    }
});

postRobot.on('entities', {window: window.parent}, async function(event) {
    Storages = await getStorages();
    check_access(event);
    let storage = _ctx(event.data.context);
    let global_storage = _ctx_global(event.data.context);
    let count = event.data.count;
    if (count === undefined) {
        count = 3;
    }

    let now = _timestamp();
    let stored_institutions = storage.keys().filter(k => k !== undefined && k !== '_name')
        .map(k => clean_item(get_entity(storage, k)));
    
    let global_stored_institutions = global_storage.keys().filter(k => k !== undefined && k !== '_name')
        .map(k => clean_item(get_entity(global_storage, k)));

    const dedup_institutions = stored_institutions.map(ins => ins.entityID);
    global_stored_institutions.forEach(ins => {
        if (!dedup_institutions.includes(ins.entityID)) {
            stored_institutions.push(ins);
        }
    });
    
    stored_institutions = stored_institutions
        .sort(function(a,b) {
            return a.last_use - b.last_use;
        }).slice(-count);

    return stored_institutions
});

postRobot.on('entity', {window: window.parent}, function(event) {
    check_access(event);
    let storage = _ctx(event.data.context);
    let global_storage = _ctx_global(event.data.context);
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
    let item_global = get_entity(global_storage, id);
    if (item_global) {
        let now = _timestamp();
        item.last_use = now;
        global_storage.set(id, clean_item(item));
    }
    return item || item_global;
});

postRobot.on('remove', {window: window.parent}, function(event) {
    check_access(event);
    let storage = _ctx(event.data.context);
    let global_storage = _ctx_global(event.data.context);
    let entity_id = event.data.entity_id;
    if (entity_id === undefined) {
    } else {
        storage.remove(entity_id.hexEncode());
        global_storage.remove(entity_id.hexEncode());
    }
});

postRobot.send(window.parent, 'init');
