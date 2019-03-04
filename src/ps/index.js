const postRobot = require("post-robot");
const Storages = require('js-storage');

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

// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      let o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      let len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      let thisArg = arguments[1];

      // 5. Let k be 0.
      let k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        let kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    },
    configurable: true,
    writable: true
  });
}

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
};

function _ctx(context) {
    if (context == undefined) {
        context = "thiss.io"
    }
    let entity = event.data.entity;
    let ns = Storages.initNamespaceStorage(context);
    let storage = ns.localStorage;
    storage.set('_name', context);
    return storage;
}

function is_valid(item, ts) {
    return item !== undefined && item.last_refresh !== undefined && item.last_refresh + cache_time > ts;
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
        if (entity.domains) {
            let domains = entity.domains.split(';') || [];
            entity.domain = domains[0];
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

function get_entity(storage, id) {
    if (storage.isSet(id)) {
        return storage.get(id);
    } else {
        return undefined;
    }
}

postRobot.on('update', {window: window.parent}, function(event) {
    let entity = event.data.entity;
    let storage = _ctx(event.data.context);
    let now = _timestamp();
    let id = entity.entity_id.hexEncode();
    let item = get_entity(storage, id);
    if (!is_valid(item, now)) {
        item = { "last_refresh": now, "entity": entity };
    } else {
        item.last_refresh = now;
        item.entity = entity;
    }
    console.log(item);
    storage.set(id, clean_item(item));
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
    console.log(storage.keys());
    return storage.keys().filter(k => k !== undefined && k !== '_name')
        .map(k => clean_item(get_entity(storage, k)))
        .sort(function(a,b) {
            return a.last_refresh - b.last_refresh;
        });
});

postRobot.on('entity', {window: window.parent}, function(event) {
    let storage = _ctx(event.data.context);
    let entity_id = event.data.entity_id;
    if (entity_id === undefined) {
        return undefined;
    } else {
        let item = get_entity(storage, entity_id.hexEncode());
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
        storage.remove(entity_id.hexEncode());
    }
});