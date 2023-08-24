import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import 'core-js/actual';

library.add(faPen);
dom.watch();

import {DiscoveryService, ds_response_url} from "@theidentityselector/thiss-ds";
import {DiscoveryComponent} from "../component";
import Localization from '../localization.js'

import '../assets/cta.scss'
import '../assets/sa-icon.svg';
import saWhite from '../assets/sa-white.svg';

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

let button = document.getElementById('idpbutton');
let dsbutton = document.getElementById('dsbutton');
let main = document.getElementById('main');

main.style.background = window.xprops.backgroundColor;
button.style.background = window.xprops.color;
button.style.boxShadow = "0 0 0 5px " + window.xprops.color;
dsbutton.style.color = window.xprops.color;
let entityID = window.xprops.entityID || null;
let trustProfile = window.xprops.trustProfile || null;

let ctaFocus = false

const setCtaFocus = () => {
    button.style.boxShadow = "0 0 0 1px, 0 0 0 4px " + window.xprops.color;
}

const clearCtaFocus = () => {
    button.style.boxShadow = "0 0 0 5px " + window.xprops.color;
}

button.addEventListener('focus', (event) => {
    ctaFocus = true
    setCtaFocus()
});

button.addEventListener('blur', (event) => {
    ctaFocus = false
    clearCtaFocus()
});

button.addEventListener('mouseover', (event) => {
    if (!ctaFocus) {
        setCtaFocus()
    }
});

button.addEventListener('mouseout', (event) => {
    if (!ctaFocus) {
        clearCtaFocus()
    }
});

const localization = new Localization(window.xprops.locale);

if (window.xprops.persistenceURL) {
    persistence = window.xprops.persistenceURL;
}

if (window.xprops.context) {
    context = window.xprops.context;
}

if (window.xprops.MDQ) {
    mdq = window.xprops.MDQ;
}

let ds = new DiscoveryService(mdq, persistence, context, entityID, trustProfile);

let start = [];
if (window.xprops.pinned) {
    start.push(ds.pin(window.xprops.pinned));
}

dsbutton.hidden = true;
let entity_id = null;

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

button.addEventListener('keypress', function (event) {
    if (e.key === 'Enter') {
        button.click()
    }
});

dsbutton.addEventListener('click', function(event) {
    event.preventDefault();
    discovery_request();
});

dsbutton.addEventListener('keypress', function (event) {
    if (e.key === 'Enter') {
        dsbutton.click()
    }
});

if (!ds.ps.expire) {
    ds.ps.expire = function() {}
}

Promise.all(start).then(function() {
    ds.ps.entities(context).then(result => result.data).then(function(items) {
        if (items && items.length > 0) { // or things have gone very wrong...
            let item = items[items.length-1];
            document.getElementById('title').innerText = item.entity.title;
            entity_id = item.entity.entity_id || item.entity.entityID;
            document.getElementById('headline').innerText = localization.translateString('cta-button-header');
            document.getElementById('headline').className = "ra21-button-text-secondary";
            dsbutton.hidden = false;
        } else {
            document.getElementById('title').innerText = localization.translateString('cta-button-placeholder');
        }
    }).then(() => ds.ps.expire()).catch(ex => {
          document.getElementById('title').innerText = localization.translateString('cta-button-placeholder');
    });
});
