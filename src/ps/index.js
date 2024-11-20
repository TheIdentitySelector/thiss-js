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

const mdq_url = process.env.MDQ_URL;

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

async function gc(storage) {
    console.log("gc...")
    const keys = storage.keys().filter(k => k !== undefined && k !== '_name');
    let stored_institutions = [];
    for (let k of keys) {
        let item = await get_entity(storage, k);
        stored_institutions.push(item);
    }
    stored_institutions
        .sort(function(a,b) {
            return b.last_use - a.last_use;
        }).slice(3).forEach(function (item) {
            storage.remove(item.entity.entity_id.hexEncode());
        });
    let now = _timestamp();
    stored_institutions = [];
    for (let k of keys) {
        let item = await get_entity(storage, k);
        stored_institutions.push(item);
    }
    stored_institutions
        .forEach(item => {
            if (!is_valid(item, now)) {
                console.log("... removing")
                storage.remove(item.entity.entity_id.hexEncode())
            }
        });
}

async function mdq_get(id) {
    let url = mdq_url + id + ".json"

    let opts = {method: 'GET', headers: {'Accept':'application/json'}};
    const resp = await fetch(url, opts);
    if (resp.status == 404) {
        return undefined;
    }
    let data;
    let contentType = resp.headers.get("content-type");
    if(contentType && contentType.includes("application/json")) {
        data = resp.json();
    }
    if (Array.isArray(data) && data.length > 0) {
        data = data[0];
    }
    return data;
}

async function get_entity(storage, id) {
    if (storage.isSet(id)) {
        const item = storage.get(id);
        if (item) {
            const refreshed = await mdq_get(item.entity.id);
            item.entity = refreshed;
        }
        return item;
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
    item.entity = {
        entity_id: entity.entity_id,
        entityID: entity.entity_id,
        id: entity.id
    };
    let id = entity.entity_id.hexEncode();
    item = clean_item(item);
    return storage.set(id, item)
}

async function get_entities(context) {
    Storages = await getStorages();
    let storage = _ctx(context);
    let global_storage = _ctx_global(context);

    let now = _timestamp();
    let keys = storage.keys().filter(k => k !== undefined && k !== '_name');
    let stored_institutions = [];
    for (let k of keys) {
        let item = await get_entity(storage, k);
        stored_institutions.push(clean_item(item));
    }
    keys = global_storage.keys().filter(k => k !== undefined && k !== '_name');
    const global_stored_institutions = [];
    for (let k of keys) {
        let item = await get_entity(global_storage, k);
        global_stored_institutions.push(clean_item(item));
    }
    const dedup_institutions = stored_institutions.map(ins => ins.entity.entityID);
    global_stored_institutions.forEach(ins => {
        if (!dedup_institutions.includes(ins.entity.entityID)) {
            stored_institutions.push(ins);
        }
    });
    stored_institutions = stored_institutions
        .sort(function(a,b) {
            return a.last_use - b.last_use;
        });
    return stored_institutions
}

function remove_entity(context, entity_id) {
    let storage = _ctx(context);
    let global_storage = _ctx_global(context);
    if (entity_id === undefined) {
    } else {
        storage.remove(entity_id.hexEncode());
        global_storage.remove(entity_id.hexEncode());
    }
}

async function reduceCookieStorage(context) {
    const entities = await get_entities(context);
    if ((!Storages.storage_available) && Storages.cookies_available) {
        entities.forEach((entity, idx) => {
            let max_idx = entities.length - 1;
            if (idx < max_idx - 1) {
                remove_entity(context, entities[idx].entity.entity_id);
            }
        });
    }
}

const advCheckbox = document.getElementById('ps-checkbox-adv');
let checkboxVisible = false;
if (advCheckbox.checkVisibility) {
    checkboxVisible = advCheckbox.checkVisibility();
}

if (checkboxVisible) {
    advCheckbox.addEventListener('click', async (event) => {

        const global_storage = _ctx_global();
        const keys = global_storage.keys().filter(k => k !== undefined && k !== '_name');
        const stored_institutions = [];
        for (let k of keys) {
            let item = await get_entity(global_storage, k);
            stored_institutions.push(clean_item(item));
        }
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
    if (checkboxVisible && !doPersist) {
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

postRobot.on('update', {window: window.parent}, async function(event) {
    if (checkboxVisible && !doPersist) {
        return
    }
    check_access(event);
    await reduceCookieStorage(event.data.context);
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
    check_access(event);

    let count = event.data.count;
    if (count === undefined) {
        count = 3;
    }
    let stored_institutions = await get_entities(event.data.context);
    stored_institutions = stored_institutions.slice(-count);
    return stored_institutions
});

postRobot.on('entity', {window: window.parent}, async function(event) {
    check_access(event);
    let storage = _ctx(event.data.context);
    let global_storage = _ctx_global(event.data.context);
    let entity_id = event.data.entity_id;
    if (!entity_id) {
        throw new Error("Unable to find entity_id in request")
    }
    let id = entity_id.hexEncode();
    let item = await get_entity(storage, id);
    if (item) {
        let now = _timestamp();
        item.last_use = now;
        storage.set(id, clean_item(item));
    }
    let item_global = await get_entity(global_storage, id);
    if (item_global) {
        let now = _timestamp();
        item_global.last_use = now;
        global_storage.set(id, clean_item(item_global));
    }
    return item || item_global;
});

postRobot.on('remove', {window: window.parent}, function(event) {
    check_access(event);
    remove_entity(event.data.context, event.data.entity_id);
});

postRobot.send(window.parent, 'init');
