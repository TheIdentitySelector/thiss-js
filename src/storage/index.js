/*
 * JS Storage Plugin
 *
 * Copyright (c) 2016 Julien Maurel
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 * https://github.com/julien-maurel/js-storage
 *
 * Version: 1.0.4
 */

import Cookies from "js-cookie";

String.prototype.hexEncode = function(){
    let hex, i;

    let result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
};

async function getStorages (local = false) {

    let handle;
    if (local) {
      handle = window;
    } else {
      handle = await getStorageHandle();
    }
    const storagePerm = await hasSAPerm();

    // Variables used by utilities functions (like isPlainObject...)
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var fnToString = hasOwn.toString;
    var ObjectFunctionString = fnToString.call(Object);
    var getProto = Object.getPrototypeOf;
    var apis = {};

    // Prefix to use with cookie fallback
    var cookie_local_prefix = "ls_";
    var cookie_session_prefix = "ss_";

    // Get items from a storage
    function _get() {
        var storage = this._type, l = arguments.length, s = handle[storage], a = arguments, a0 = a[0], vi, ret, tmp, i, j;
        if (l < 1) {
            throw new Error('Minimum 1 argument must be given');
        } else if (Array.isArray(a0)) {
            // If second argument is an array, return an object with value of storage for each item in this array
            ret = {};
            for (i in a0) {
                if (a0.hasOwnProperty(i)) {
                    vi = a0[i];
                    try {
                        ret[vi] = JSON.parse(s.getItem(vi));
                    } catch (e) {
                        ret[vi] = s.getItem(vi);
                    }
                }
            }
            return ret;
        } else if (l == 1) {
            // If only 1 argument, return value directly
            try {
                return JSON.parse(s.getItem(a0));
            } catch (e) {
                return s.getItem(a0);
            }
        } else {
            // If more than 1 argument, parse storage to retrieve final value to return it
            // Get first level
            try {
                ret = JSON.parse(s.getItem(a0));
            } catch (e) {
                throw new ReferenceError(a0 + ' is not defined in this storage');
            }
            // Parse next levels
            for (i = 1; i < l - 1; i++) {
                ret = ret[a[i]];
                if (ret === undefined) {
                    throw new ReferenceError([].slice.call(a, 1, i + 1).join('.') + ' is not defined in this storage');
                }
            }
            // If last argument is an array, return an object with value for each item in this array
            // Else return value normally
            if (Array.isArray(a[i])) {
                tmp = ret;
                ret = {};
                for (j in a[i]) {
                    if (a[i].hasOwnProperty(j)) {
                        ret[a[i][j]] = tmp[a[i][j]];
                    }
                }
                return ret;
            } else {
                return ret[a[i]];
            }
        }
    }

    // Set items of a storage
    function _set() {
        var storage = this._type, l = arguments.length, s = handle[storage], a = arguments, a0 = a[0], a1 = a[1], vi, to_store = isNaN(a1) ? {} : [], type, tmp, i;
        if (l < 1 || !_isPlainObject(a0) && l < 2) {
            throw new Error('Minimum 2 arguments must be given or first parameter must be an object');
        } else if (_isPlainObject(a0)) {
            // If first argument is an object, set values of storage for each property of this object
            for (i in a0) {
                if (a0.hasOwnProperty(i)) {
                    vi = a0[i];
                    if (!_isPlainObject(vi) && !this.alwaysUseJson) {
                        s.setItem(i, vi);
                    } else {
                        s.setItem(i, JSON.stringify(vi));
                    }
                }
            }
            return a0;
        } else if (l == 2) {
            // If only 2 arguments, set value of storage directly
            if (typeof a1 === 'object' || this.alwaysUseJson) {
                s.setItem(a0, JSON.stringify(a1));
            } else {
                s.setItem(a0, a1);
            }
            return a1;
        } else {
            // If more than 3 arguments, parse storage to retrieve final node and set value
            // Get first level
            try {
                tmp = s.getItem(a0);
                if (tmp != null) {
                    to_store = JSON.parse(tmp);
                }
            } catch (e) {
            }
            tmp = to_store;
            // Parse next levels and set value
            for (i = 1; i < l - 2; i++) {
                vi = a[i];
                type = isNaN(a[i + 1]) ? "object" : "array";
                if (!tmp[vi] || type == "object" && !_isPlainObject(tmp[vi]) || type == "array" && !Array.isArray(tmp[vi])) {
                    if (type == "array") tmp[vi] = [];
                    else tmp[vi] = {};
                }
                tmp = tmp[vi];
            }
            tmp[a[i]] = a[i + 1];
            s.setItem(a0, JSON.stringify(to_store));
            return to_store;
        }
    }

    // Remove items from a storage
    function _remove() {
        var storage = this._type, l = arguments.length, s = handle[storage], a = arguments, a0 = a[0], to_store, tmp, i, j;
        if (l < 1) {
            throw new Error('Minimum 1 argument must be given');
        } else if (Array.isArray(a0)) {
            // If first argument is an array, remove values from storage for each item of this array
            for (i in a0) {
                if (a0.hasOwnProperty(i)) {
                    s.removeItem(a0[i]);
                }
            }
            return true;
        } else if (l == 1) {
            // If only 2 arguments, remove value from storage directly
            s.removeItem(a0);
            return true;
        } else {
            // If more than 2 arguments, parse storage to retrieve final node and remove value
            // Get first level
            try {
                to_store = tmp = JSON.parse(s.getItem(a0));
            } catch (e) {
                throw new ReferenceError(a0 + ' is not defined in this storage');
            }
            // Parse next levels and remove value
            for (i = 1; i < l - 1; i++) {
                tmp = tmp[a[i]];
                if (tmp === undefined) {
                    throw new ReferenceError([].slice.call(a, 1, i).join('.') + ' is not defined in this storage');
                }
            }
            // If last argument is an array,remove value for each item in this array
            // Else remove value normally
            if (Array.isArray(a[i])) {
                for (j in a[i]) {
                    if (a[i].hasOwnProperty(j)) {
                        delete tmp[a[i][j]];
                    }
                }
            } else {
                delete tmp[a[i]];
            }
            s.setItem(a0, JSON.stringify(to_store));
            return true;
        }
    }

    // Remove all items from a storage
    function _removeAll(reinit_ns) {
        var keys = _keys.call(this), i;
        for (i in keys) {
            if (keys.hasOwnProperty(i)) {
                _remove.call(this, keys[i]);
            }
        }
        // Reinitialize all namespace storages
        if (reinit_ns) {
            for (i in apis.namespaceStorages) {
                if (apis.namespaceStorages.hasOwnProperty(i)) {
                    _createNamespace(i);
                }
            }
        }
    }

    // Check if items of a storage are empty
    function _isEmpty() {
        var l = arguments.length, a = arguments, a0 = a[0], i;
        if (l == 0) {
            // If no argument, test if storage is empty
            return (_keys.call(this).length == 0);
        } else if (Array.isArray(a0)) {
            // If first argument is an array, test each item of this array and return true only if all items are empty
            for (i = 0; i < a0.length; i++) {
                if (!_isEmpty.call(this, a0[i])) {
                    return false;
                }
            }
            return true;
        } else {
            // If at least 1 argument, try to get value and test it
            try {
                var v = _get.apply(this, arguments);
                // Convert result to an object (if last argument is an array, _get return already an object) and test each item
                if (!Array.isArray(a[l - 1])) {
                    v = {'totest': v};
                }
                for (i in v) {
                    if (v.hasOwnProperty(i) && !(
                            (_isPlainObject(v[i]) && _isEmptyObject(v[i])) ||
                            (Array.isArray(v[i]) && !v[i].length) ||
                            (typeof v[i] !== 'boolean' && !v[i])
                        )) {
                        return false;
                    }
                }
                return true;
            } catch (e) {
                return true;
            }
        }
    }

    // Check if items of a storage exist
    function _isSet() {
        var l = arguments.length, a = arguments, a0 = a[0], i;
        if (l < 1) {
            throw new Error('Minimum 1 argument must be given');
        }
        if (Array.isArray(a0)) {
            // If first argument is an array, test each item of this array and return true only if all items exist
            for (i = 0; i < a0.length; i++) {
                if (!_isSet.call(this, a0[i])) {
                    return false;
                }
            }
            return true;
        } else {
            // For other case, try to get value and test it
            try {
                var v = _get.apply(this, arguments);
                // Convert result to an object (if last argument is an array, _get return already an object) and test each item
                if (!Array.isArray(a[l - 1])) {
                    v = {'totest': v};
                }
                for (i in v) {
                    if (v.hasOwnProperty(i) && !(v[i] !== undefined && v[i] !== null)) {
                        return false;
                    }
                }
                return true;
            } catch (e) {
                return false;
            }
        }
    }

    // Get keys of a storage or of an item of the storage
    function _keys() {
        var storage = this._type, l = arguments.length, s = handle[storage], keys = [], o = {};
        // If at least 1 argument, get value from storage to retrieve keys
        // Else, use storage to retrieve keys
        if (l > 0) {
            o = _get.apply(this, arguments);
        } else {
            o = s;
        }
        if (o && o._cookie) {
            // If storage is a cookie, use js-cookie to retrieve keys
            var cookies = Cookies.get();
            for (var key in cookies) {
                if (cookies.hasOwnProperty(key) && key != '') {
                    keys.push(key.replace(o._prefix, ''));
                }
            }
        } else {
            for (var i in o) {
                if (o.hasOwnProperty(i)) {
                    keys.push(i);
                }
            }
        }
        return keys;
    }

    // Create new namespace storage
    function _createNamespace(name) {
        if (!name || typeof name != "string") {
            throw new Error('First parameter must be a string');
        }
        if (storage_available) {
            if (!handle.localStorage.getItem(name)) {
                handle.localStorage.setItem(name, '{}');
            }
            if (!handle.sessionStorage.getItem(name)) {
                handle.sessionStorage.setItem(name, '{}');
            }
        } else {
            if (!handle.localCookieStorage.getItem(name)) {
                handle.localCookieStorage.setItem(name, '{}');
            }
            if (!handle.sessionCookieStorage.getItem(name)) {
                handle.sessionCookieStorage.setItem(name, '{}');
            }
        }
        var ns = {
            localStorage: _extend({}, apis.localStorage, {_ns: name}),
            sessionStorage: _extend({}, apis.sessionStorage, {_ns: name})
        };
        if (cookies_available) {
            if (!handle.cookieStorage.getItem(name)) {
                handle.cookieStorage.setItem(name, '{}');
            }
            ns.cookieStorage = _extend({}, apis.cookieStorage, {_ns: name});
        }
        apis.namespaceStorages[name] = ns;
        return ns;
    }

    // Test if storage is natively available on browser
    function _testStorage(name) {
        if (storagePerm && handle.navigator) {
            return false;
        }
        var foo = 'jsapi';
        try {
            if (!handle[name]) {
                return false;
            }
            handle[name].setItem(foo, foo);
            handle[name].removeItem(foo);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Test if a variable is a plain object (from jQuery)
    function _isPlainObject(obj) {
        var proto, Ctor;

        // Detect obvious negatives
        // Use toString instead of jQuery.type to catch host objects
        if (!obj || toString.call(obj) !== "[object Object]") {
            return false;
        }

        proto = getProto(obj);

        // Objects with no prototype (e.g., `Object.create( null )`) are plain
        if (!proto) {
            return true;
        }

        // Objects with prototype are plain iff they were constructed by a global Object function
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    }

    // Test if a variable is an empty object (from jQuery)
    function _isEmptyObject(obj) {
        var name;

        for (name in obj) {
            return false;
        }
        return true;
    }

    // Merge objects
    function _extend() {
        var i = 1;
        var result = arguments[0];
        for (; i < arguments.length; i++) {
            var attributes = arguments[i];
            for (var key in attributes) {
                if (attributes.hasOwnProperty(key)) {
                    result[key] = attributes[key];
                }
            }
        }
        return result;
    }

    // Check if storages are natively available on browser and check is js-cookie is present
    //var storage_available = false;
    var storage_available = _testStorage('localStorage');
    var cookies_available = typeof Cookies !== 'undefined';

    apis.storage_available = storage_available;
    apis.cookies_available = cookies_available;

    // Namespace object
    var storage = {
        _type: '',
        _ns: '',
        _callMethod: function (f, a) {
            a = Array.prototype.slice.call(a);
            var p = [], a0 = a[0];
            if (this._ns) {
                p.push(this._ns);
            }
            if (typeof a0 === 'string' && a0.indexOf('.') !== -1) {
                a.shift();
                [].unshift.apply(a, a0.split('.'));
            }
            [].push.apply(p, a);
            return f.apply(this, p);
        },
        // Define if plugin always use JSON to store values (even to store simple values like string, int...) or not
        alwaysUseJson: false,
        // Get items. If no parameters and storage have a namespace, return all namespace
        get: function () {
            if (!storage_available && !cookies_available){
                return null;
            }
            return this._callMethod(_get, arguments);
        },
        // Set items
        set: function () {
            var l = arguments.length, a = arguments, a0 = a[0];
            if (l < 1 || !_isPlainObject(a0) && l < 2) {
                throw new Error('Minimum 2 arguments must be given or first parameter must be an object');
            }
            if (!storage_available && !cookies_available){
                return null;
            }
            // If first argument is an object and storage is a namespace storage, set values individually
            if (_isPlainObject(a0) && this._ns) {
                for (var i in a0) {
                    if (a0.hasOwnProperty(i)) {
                        this._callMethod(_set, [i, a0[i]]);
                    }
                }
                return a0;
            } else {
                var r = this._callMethod(_set, a);
                if (this._ns) {
                    return r[a0.split('.')[0]];
                } else {
                    return r;
                }
            }
        },
        // Delete items
        remove: function () {
            if (arguments.length < 1) {
                throw new Error('Minimum 1 argument must be given');
            }
            if (!storage_available && !cookies_available){
                return null;
            }
            return this._callMethod(_remove, arguments);
        },
        // Delete all items
        removeAll: function (reinit_ns) {
            if (!storage_available && !cookies_available){
                return null;
            }
            if (this._ns) {
                this._callMethod(_set, [{}]);
                return true;
            } else {
                return this._callMethod(_removeAll, [reinit_ns]);
            }
        },
        // Items empty
        isEmpty: function () {
            if (!storage_available && !cookies_available){
                return null;
            }
            return this._callMethod(_isEmpty, arguments);
        },
        // Items exists
        isSet: function () {
            if (arguments.length < 1) {
                throw new Error('Minimum 1 argument must be given');
            }
            if (!storage_available && !cookies_available){
                return null;
            }
            return this._callMethod(_isSet, arguments);
        },
        // Get keys of items
        keys: function () {
            if (!storage_available && !cookies_available){
                return null;
            }
            return this._callMethod(_keys, arguments);
        }
    };

    // Use js-cookie for compatibility with old browsers and give access to cookieStorage
    if (cookies_available) {
        // sessionStorage is valid for one window/tab. To simulate that with cookie, we set a name for the window and use it for the name of the cookie
        if (!handle.name) {
            handle.name = Math.floor(Math.random() * 100000000);
        }
        var cookie_storage = {
            _cookie: true,
            _prefix: '',
            _expires: null,
            _path: null,
            _domain: null,
            setItem: function (n, v) {
                Cookies.set(this._prefix + n, v, {expires: this._expires, path: this._path, domain: this._domain, sameSite: "None", secure: true, partitioned: !storagePerm});
            },
            getItem: function (n) {
                return Cookies.get(this._prefix + n);
            },
            removeItem: function (n) {
                return Cookies.remove(this._prefix + n, {path: this._path});
            },
            clear: function () {
                var cookies = Cookies.get();
                for (var key in cookies) {
                    if (cookies.hasOwnProperty(key) && key != '') {
                        if (!this._prefix && key.indexOf(cookie_local_prefix) === -1 && key.indexOf(cookie_session_prefix) === -1 || this._prefix && key.indexOf(this._prefix) === 0) {
                            Cookies.remove(key);
                        }
                    }
                }
            },
            setExpires: function (e) {
                this._expires = e;
                return this;
            },
            setPath: function (p) {
                this._path = p;
                return this;
            },
            setDomain: function (d) {
                this._domain = d;
                return this;
            },
            setConf: function (c) {
                if (c.path) {
                    this._path = c.path;
                }
                if (c.domain) {
                    this._domain = c.domain;
                }
                if (c.expires) {
                    this._expires = c.expires;
                }
                return this;
            },
            setDefaultConf: function () {
                this._path = this._domain = this._expires = null;
            }
        };
        if (!storage_available) {
            handle.localCookieStorage = _extend({}, cookie_storage, {
                _prefix: cookie_local_prefix,
                _expires: 365 * 10
            });
            handle.sessionCookieStorage = _extend({}, cookie_storage, {_prefix: cookie_session_prefix + handle.name + '_'});
        }
        handle.cookieStorage = _extend({}, cookie_storage);
        // cookieStorage API
        apis.cookieStorage = _extend({}, storage, {
            _type: 'cookieStorage',
            setExpires: function (e) {
                handle.cookieStorage.setExpires(e);
                return this;
            },
            setPath: function (p) {
                handle.cookieStorage.setPath(p);
                return this;
            },
            setDomain: function (d) {
                handle.cookieStorage.setDomain(d);
                return this;
            },
            setConf: function (c) {
                handle.cookieStorage.setConf(c);
                return this;
            },
            setDefaultConf: function () {
                handle.cookieStorage.setDefaultConf();
                return this;
            }
        });
    }

    // Get a new API on a namespace
    apis.initNamespaceStorage = function (ns) {
        return _createNamespace(ns);
    };
    if (storage_available) {
        // localStorage API
        apis.localStorage = _extend({}, storage, {_type: 'localStorage'});
        // sessionStorage API
        apis.sessionStorage = _extend({}, storage, {_type: 'sessionStorage'});
    } else {
        // localStorage API
        apis.localStorage = _extend({}, storage, {_type: 'localCookieStorage'});
        // sessionStorage API
        apis.sessionStorage = _extend({}, storage, {_type: 'sessionCookieStorage'});
    }
    // List of all namespace storage
    apis.namespaceStorages = {};
    // Remove all items in all storages
    apis.removeAllStorages = function (reinit_ns) {
        apis.localStorage.removeAll(reinit_ns);
        apis.sessionStorage.removeAll(reinit_ns);
        if (apis.cookieStorage) {
            apis.cookieStorage.removeAll(reinit_ns);
        }
        if (!reinit_ns) {
            apis.namespaceStorages = {};
        }
    };
    // About alwaysUseJson
    // By default, all values are string on html storages and the plugin don't use json to store simple values (strings, int, float...)
    // So by default, if you do storage.setItem('test',2), value in storage will be "2", not 2
    // If you set this property to true, all values set with the plugin will be stored as json to have typed values in any cases
    apis.alwaysUseJsonInStorage = function (value) {
        storage.alwaysUseJson = value;
        apis.localStorage.alwaysUseJson = value;
        apis.sessionStorage.alwaysUseJson = value;
        if (apis.cookieStorage) {
            apis.cookieStorage.alwaysUseJson = value;
        }
    };

    return apis;
}

function _timestamp() {
   return Date.now();
}

export function clean_item(item) {
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

const mdq_url = process.env.MDQ_URL;

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

export async function get_entity(storage, id) {
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

export function set_entity(storage, entity) {
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

let Storages = await getStorages();
let globalStorages = await getStorages(true);

export function ctx(context) {
    if (!context) {
        context = process.env.DEFAULT_CONTEXT
    }
    let ns = Storages.initNamespaceStorage(context);
    let storage = ns.localStorage;
    storage.set('_name', context);
    return storage;
}

export function ctx_local(context) {
    if (!context) {
        context = process.env.DEFAULT_CONTEXT
    }
    let ns = globalStorages.initNamespaceStorage(context);
    let storage = ns.localStorage;
    storage.set('_name', context);
    return storage;
}

export async function set_global_entities(entities, context) {
    Storages = await getStorages();
    context = context || process.env.DEFAULT_CONTEXT;
    if (entities) {
        let storage = ctx(context);
        entities.forEach(entity => {
            set_entity(storage, entity);
        });
    }
}
export async function get_local_institutions(context) {
    context = context || process.env.DEFAULT_CONTEXT;
    let local_storage = ctx_local(context);

    let keys = local_storage.keys().filter(k => k !== undefined && k !== '_name');
    const local_stored_institutions = [];
    for (let k of keys) {
        let item = await get_entity(local_storage, k);
        local_stored_institutions.push(clean_item(item));
    }
    return local_stored_institutions;
}
/**
 * Check for Storage Access permission and request it if absent and possible
 *
 * @param {entity_id} [string] the entityID of the SAML identity provider to be
 *     removed
 */
export const requestingStorageAccess = (callback) => {
  if (document.hasStorageAccess) {
    // Check whether access has been granted using the Storage Access API.
    // Note on page load this will always be false initially so we could be
    // skipped in this example, but including for completeness for when this
    // is not so obvious.
    document.hasStorageAccess()
        .then(hasAccess => {
          if (!hasAccess) {
              get_local_institutions().then(entities => {
                  document.requestStorageAccess()
                      .then(storage => {
                          set_global_entities(entities).then(() => {
                              callback();
                          }).catch(err => {
                              callback();
                          });
                      })
                      .catch(err => { callback(); });
              }).catch(err => {
                  document.requestStorageAccess()
                      .then(storage => {
                          callback();
                      })
                      .catch(err => { callback(); });
              });
          } else {
            navigator.permissions.query({name : 'storage-access'})
                .then(permission => {
                  if (permission) {
                    if (permission.state === 'granted') {
                      document.requestStorageAccess()
                          .then(storage => { callback(); })
                          .catch(err => { callback(); });
                    } else if (permission.state === 'prompt') {
                        get_local_institutions().then(entities => {
                            document.requestStorageAccess()
                                .then(storage => {
                                    set_global_entities(entities).then(() => {
                                        callback();
                                    }).catch(err => {
                                        callback();
                                    });
                                })
                                .catch(err => { callback(); });
                        }).catch(err => {
                            document.requestStorageAccess()
                                .then(storage => { callback(); })
                                .catch(err => { callback(); });
                        });
                    } else if (permission.state === 'denied') {
                      callback();
                    }
                  } else {
                    callback();
                  }
                })
                .catch(err => {
                  document.requestStorageAccess()
                      .then(storage => { callback(); })
                      .catch(err => { callback(); });
                });
          }
        })
        .catch(err => { callback(); });
  } else {
    callback();
  }
}

export async function getStorageHandle() {
  // Check if Storage Access API is supported
  if (!document.requestStorageAccess) {
    // Storage Access API is not supported so best we can do is
    // hope it's an older browser that doesn't block 3P cookies.
    console.log('API not supported');
    return window;
  }

  // Check if access has already been granted
  if (await document.hasStorageAccess()) {
    console.log('access has already been granted');
    const handle = await document.requestStorageAccess({all: true});
    return handle || window;
  }

  // Check the storage-access permission
  // Wrap this in a try/catch for browsers that support the
  // Storage Access API but not this permission check
  // (e.g. Safari and older versions of Firefox).
  let permission;
  try {
    permission = await navigator.permissions.query(
      {name: 'storage-access'}
    );
  } catch (error) {
    // storage-access permission not supported. Assume no cookie access.
    return window;
  }

  if (permission) {
    if (permission.state === 'granted') {
      // Permission has previously been granted so can just call
      // requestStorageAccess() without a user interaction and
      // it will resolve automatically.
      try {
        const handle = await document.requestStorageAccess({all: true});
        return handle || window;
      } catch (error) {
        // This shouldn't really fail if access is granted, but return false
        // if it does.
        return window;
      }
    } else if (permission.state === 'prompt') {
      // Need to call requestStorageAccess() after a user interaction
      // (potentially with a prompt). Can't do anything further here,
      // so handle this in the click handler.
      return window;
    } else if (permission.state === 'denied') {
      // Currently not used. See:
      // https://github.com/privacycg/storage-access/issues/149
      return window;
    }
  }
  // By default return false, though should really be caught by one of above.
  return window;
}

export async function hasSAPerm() {
  // Check if Storage Access API is supported
  if (!document.hasStorageAccess) {
    // Storage Access API is not supported so best we can do is
    // hope it's an older browser that doesn't block 3P cookies.
    return true;
  }
  // Check if access has already been granted
  if (await document.hasStorageAccess()) {
    return true;
  }
  // Check the storage-access permission
  // Wrap this in a try/catch for browsers that support the
  // Storage Access API but not this permission check
  // (e.g. Safari and older versions of Firefox).
  let permission;
  try {
    permission = await navigator.permissions.query(
      {name: 'storage-access'}
    );
  } catch (error) {
    // storage-access permission not supported. Assume no cookie access.
    return false;
  }

    if (permission) {
    if (permission.state === 'granted') {
      // Permission has previously been granted so can just call
      // requestStorageAccess() without a user interaction and
      // it will resolve automatically.
        return true;
    } else if (permission.state === 'prompt') {
      // Need to call requestStorageAccess() after a user interaction
      // (potentially with a prompt). Can't do anything further here,
      // so handle this in the click handler.
      return false;
    } else if (permission.state === 'denied') {
      // Currently not used. See:
      // https://github.com/privacycg/storage-access/issues/149
      return false;
    }
  }
  // By default return false, though should really be caught by one of above.
  return false;
}

export default getStorages;
