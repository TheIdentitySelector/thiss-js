import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import 'core-js/actual';
const postRobot = require("post-robot");

library.add(faPen);
dom.watch();

import {ds_response_url, json_mdq_pre_get, DiscoveryService} from "@theidentityselector/thiss-ds/src/discovery.js";
import {requestingStorageAccess} from "../storage/index.js";
import hex_sha1 from '@theidentityselector/thiss-ds/src/sha1.js';

import {DiscoveryComponent} from "../component";
import Localization from '../localization.js'

import '../assets/cta.scss'
import '../assets/sa-icon.svg';
import saWhite from '../assets/sa-white.svg';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let mdq = process.env.MDQ_URL;
let persistence = process.env.PERSISTENCE_URL;
let context = process.env.DEFAULT_CONTEXT || "thiss.io";
let entityID = null;
let trustProfile = null;
let defaultText = "Your Institution";
let login_initiator_url = window.xprops.loginInitiatorURL || window.xprops.loginHandlerURL;
let discovery_request = window.xprops.discoveryRequest;
let discovery_response = window.xprops.discoveryResponse;
let entity_id = null;

if (!discovery_request)
    discovery_request = login_initiator_url;

if (!discovery_response)
    discovery_response = login_initiator_url;

if (window.xprops.entityID)
    entityID = window.xprops.entityID;

if (window.xprops.trustProfile)
    trustProfile = window.xprops.trustProfile;

if (discovery_request !== discovery_response && typeof discovery_request === 'string' && entityID && trustProfile) {
    // assume discoveryRequest is the URL of an instance of our DS
    const search_string = `entityID=${encodeURIComponent(entityID)}&trustProfile=${trustProfile}`;
    if (new URL(discovery_request).searchParams.size > 0) {
        discovery_request =  `${discovery_request}&${search_string}`
    } else {
        discovery_request =  `${discovery_request}?${search_string}`
    }
}

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

const recoverPersisted = (start, context) => {
    Promise.all(start).then(function() {
        ds.ps.entities(context).then(result => result.data).then(function(items) {
            const item_promises = items.reverse().map(item => json_mdq_pre_get(`{sha1}${hex_sha1(item.entity.entityID)}`, trustProfile, entityID, mdq));
            Promise.allSettled(item_promises).then(results => {
                let found = false;
                results.forEach(result => {
                    if (!found && result.status === 'fulfilled') {
                        found = true;
                        const item = result.value;
                        document.getElementById('title').innerText = item.title;
                        entity_id = item.entity_id || item.entityID;
                        document.getElementById('headline').innerText = localization.translateString('cta-button-header');
                        document.getElementById('headline').className = "ra21-button-text-secondary";
                        document.getElementById('dsbutton').hidden = false;
                    }
                });
                if (!found) {
                    document.getElementById('title').innerText = localization.translateString('cta-button-placeholder');
                }
            })
        }).then(() => ds.ps.expire()).catch(ex => {
            document.getElementById('title').innerText = localization.translateString('cta-button-placeholder');
        });
    });
}

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
let ds = new DiscoveryService(mdq, persistence, context, {entityID: entityID, trustProfile: trustProfile});

let start = [];
if (window.xprops.pinned) {
    start.push(ds.pin(window.xprops.pinned));
}

postRobot.on('init', {window: ds.ps.dst}, function(event) {
    recoverPersisted(start, context);
});

function initializeUI() {

    let button = document.getElementById('idpbutton');
    let dsbutton = document.getElementById('dsbutton');
    let main = document.getElementById('main');

    main.style.background = window.xprops.backgroundColor;
    button.style.background = window.xprops.color;
    button.style.boxShadow = "0 0 0 5px " + window.xprops.color;
    dsbutton.style.color = window.xprops.color;

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

    dsbutton.hidden = true;

    button.addEventListener('click', function(event) {
        if (entity_id !== null) { // return the discovery response
            ds.do_saml_discovery_response(entity_id).then(item => {
               discovery_response(item.entity);
            });
        } else { // off to DS
            requestingStorageAccess(discovery_request);
            //discovery_request();
        }
    });

    button.addEventListener('keypress', function (event) {
        if (e.key === 'Enter') {
            button.click()
        }
    });

    dsbutton.addEventListener('click', function(event) {
        event.preventDefault();
        requestingStorageAccess(discovery_request);
    });

    dsbutton.addEventListener('keypress', function (event) {
        if (e.key === 'Enter') {
            dsbutton.click()
        }
    });

    if (!ds.ps.expire) {
        ds.ps.expire = function() {}
    }
}
if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", initializeUI);
} else {
  // `DOMContentLoaded` has already fired
  initializeUI();
}
