const postRobot = require("post-robot");
const Storages = require('js-storage');

const cache_time = 60 * 10 * 1000;

function _timestamp() {
   if (typeof Date.now === 'function') {
      return Date.now();
   }

   return new Date().getTime();
}

function _ctx(context) {
    if (context == undefined) {
        context = "thiss.io"
    }
    let entity = event.data.entity;
    let ns = Storages.initNamespaceStorage(context);
    return ns.localStorage;
}

function is_valid(item, ts) {
    return item && item.last_refresh && item.last_refresh + cache_time < ts;
}

function clean_item(item) {
    if (item.entity && (item.entity.entity_id || item.entity.entityID) && item.entity.title) {
        let entity = item.entity;
        if (entity && entity.entityID && !entity.entity_id) {
           entity.entity_id = entity.entityID;
        }
        if (entity && !entity.entity_icon && entity.icon) {
           entity.entity_icon = entity.icon;
        }
    }

    return item;
}

function expire_items(storage) {
    let _tbd = [];
    let now = _timestamp();
    storage.keys().forEach(function (k) {
        let item = storage.get(k);
        if (!is_valid(item, now)) {
            _tbd.push(k);
        }
    });
    _tbd.forEach(k => storage.remove(k));
}

function get_entity(storage, entity_id) {
    if (storage.isSet(entity_id)) {
        return storage.get(entity_id);
    } else {
        return undefined;
    }
}

postRobot.on('update', {window: window.parent}, function(event) {
    let entity = event.data.entity;
    let storage = _ctx(event.data.context);
    let now = _timestamp();
    let item = get_entity(storage, entity.entity_id);
    if (is_valid(item, now)) {
        item = { "last_refresh": now, "entity": entity };
    } else {
        item.last_refresh = now;
        item.entity = entity;
    }
    storage.set(entity.entity_id, clean_item(item));
    expire_items(storage);
    return entity;
});

postRobot.on('entities', {window: window.parent}, function(event) {
    let storage = _ctx(event.data.context);
    let count = event.data.count;
    if (count === undefined) {
        count = 3;
    }
    let now = _timestamp();
    return storage.keys().filter(item => item !== undefined).map(function (k) {
        let item = clean_item(get_entity(storage, k));
    }).filter(item => is_valid(item, now)).sort(function(a,b) {
        return a.last_refresh - b.last_refresh;
    }).slice(count - 1).map(item => item.entity);
});

postRobot.on('entity', {window: window.parent}, function(event) {
    let storage = _ctx(event.data.context);
    let entity_id = event.data.entity_id;
    if (entity_id === undefined) {
        return undefined;
    } else {
        let item = get_entity(storage, entity_id);
        if (is_valid(item)) {
            return item.entity;
        } else {
            return undefined;
        }
    }
});

postRobot.on('remove', {window: window.parent}, function(event) {
    let storage = _ctx(event.data.context);
    let entity_id = event.data.entity_id;
    if (entity_id === undefined) {
    } else {
        storage.del(entity_id);
    }
});