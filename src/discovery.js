import {PersistenceService} from "./persist";
const hex_sha1 = require('./sha1.js').default;
const cache_time = 60 * 10 * 1000; // 10 minutes

let _querystring = (function(paramsArray) {
   let params = {};

   for (let i = 0; i < paramsArray.length; ++i) {
      let param = paramsArray[i].split('=', 2);
      if (param.length !== 2)
         continue;

      params[param[0]] = decodeURIComponent(param[1].replace(/\+/g, " "));
   }

   return params;
})(window.location.search.substr(1).split('&'));

function _timestamp() {
   if (typeof Date.now === 'function') {
      return Date.now();
   }

   return new Date().getTime();
}

function _sha1_id(s) {
    return "{sha1}"+hex_sha1(s);
}

function json_mdq_get(id, mdq_url) {
    let opts = {method: 'GET', headers: {}};
    console.log(mdq_url + id + ".json");
    return fetch(mdq_url + id + ".json",opts).then(function (response) {
       if (response.status == 404) {
           throw new URIError("Entity not found in MDQ server");
       }
       return response;
    }).then(function (response) {
        let contentType = response.headers.get("content-type");
        if(contentType && contentType.includes("application/json")) {
            return response.json();
        }
        throw new SyntaxError("MDQ didn't provide a JSON response");
    }).then(function(data) {
        if (Object.prototype.toString.call(data) === "[object Array]") {
            data = data[0];
        }
        return data;
    }).catch(function(error) {
        console.log(error);
        //Promise.reject(error);
    });
}

export class DiscoveryService {

    constructor(mdq, persistence_url, context = "thiss.io") {
        console.log("making ds from "+mdq+" and "+persistence_url+" and "+context);
        if (typeof mdq === 'function') {
            this.mdq = mdq;
        } else {
            this.mdq = function(entity_id) { return json_mdq_get(_sha1_id(entity_id), mdq) }
        }
        this.ps = new PersistenceService(persistence_url);
        this.context = context;
    }

    with_items(callback) {
        let obj = this;
        this.ps.entities(this.context).then(result => callback(result.data)).then(function(result) {
            if (result && result.data) {
                result.data.forEach(function (entity) {
                    this.ps.update(obj.context, entity);
                });
            }
        });
    }

    saml_discovery_response(entity_id) {
        let params = _querystring;
        return this.do_saml_discovery_response(entity_id, params).then(function (url) {
            if (url) {
                window.location = url;
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    pin(entity_id) {
        return this.do_saml_discovery_response(entity_id, {});
    }

    do_saml_discovery_response(entity_id, params) {
        let obj = this;
        console.log(entity_id);
        return obj.ps.entity(obj.context, entity_id).then(function(result) {
            return result.data;
        }).then(function(entity) {
            if (entity === undefined) {
                return obj.mdq(entity_id).then(function(entity) {
                    if (entity) {
                        obj.ps.update(obj.context, entity);
                    }
                    return entity;
                });
            } else {
                return Promise.resolve(entity);
            }
        }).then(function(entity) {
            if (params['return']) {
                console.log("returning discovery response...");
                let qs = params['return'].indexOf('?') === -1 ? '?' : '&';
                let returnIDParam = params['returnIDParam'];
                if (!returnIDParam) {
                    returnIDParam = "entityID";
                }
                let response = params['return'];
                if (entity_id) {
                    response += qs + returnIDParam + '=' + entity_id;
                }
                console.log(response);
                return response;
            } else {
                Promise.reject("missing return parameter in query-string")
            }
        });
    }

    remove(entity_id) {
        return this.ps.remove(this.context, entity_id);
    }

}
