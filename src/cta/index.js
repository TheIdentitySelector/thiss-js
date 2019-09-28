import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons/faPlusSquare';

library.add(faPlusSquare);
dom.watch();

import {DiscoveryService, ds_response_url} from "@theidentityselector/thiss-ds";
import "../component.js";
import '../assets/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ra21icon.svg';

let mdq = process.env.MDQ_URL;
let persistence = process.env.PERSISTENCE_URL;
let context;
let defaultText = "Your Institution";
let login_initiator_url = window.xprops.loginInitiatorURL || window.xprops.loginHandlerURL;
let discovery_request = window.xprops.discoveryRequest;
let discovery_response = window.xprops.discoveryResponse;

if (!discovery_request)
    discovery_request = login_initiator_url;

if (!discovery_response)
    discovery_response = login_initiator_url;

if (typeof discovery_request !== 'function') {
    let discovery_request_url = discovery_request;
    discovery_request = function () {
        window.top.location.href = discovery_request_url;
    };
}

if (typeof discovery_response !== 'function') {
    let discovery_response_url = discovery_response;
    discovery_response = function (entity) {
        let params = {'return': discovery_response_url};
        return window.top.location.href = ds_response_url(entity, params);
    };
}

document.getElementById('main').style.background = window.xprops.backgroundColor;
document.getElementById('idpbutton').style.background = window.xprops.color;

if (window.xprops.persistenceURL) {
    persistence = window.xprops.persistenceURL;
}

if (window.xprops.context) {
    context = window.xprops.context;
}

if (window.xprops.MDQ) {
    mdq = window.xprops.MDQ;
}

let ds = new DiscoveryService(mdq, persistence, context);

let start = [];
if (window.xprops.pinned) {
    start.push(ds.pin(window.xprops.pinned));
}

Promise.all(start).then(function() {
    let count = 0;
    let entity_id = null;
    let button = document.getElementById('idpbutton');
    let dsbutton = document.getElementById('dsbutton');
    dsbutton.hidden = true;

    button.addEventListener('click', function(event) {
        event.preventDefault();
        if (entity_id !== null) { // return the discovery response
            ds.do_saml_discovery_response(entity_id).then(item => {
               discovery_response(item.entity);
            });
        } else { // off to DS
            discovery_request();
        }
    });

    dsbutton.addEventListener('click', function(event) {
        event.preventDefault();
        discovery_request();
    });

    ds.with_items(function (items) {
        if (items && items.length > 0) { // or things have gone very wrong...
            let item = items[items.length-1];
            if (item && item.entity && item.entity.title && item.entity.entityID) { // silly
                document.getElementById('title').innerText = item.entity.title;
                entity_id = item.entity.entityID;
                document.getElementById('headline').innerText = "Access through";
                document.getElementById('headline').className = "ra21-button-text-secondary";
                count += 1;
            }
        }

        if (count == 0) {
            document.getElementById('title').innerText = "Access through your institution";
        } else {
            dsbutton.hidden = false;
        }

        return items;
    });
});
