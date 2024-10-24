import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import 'core-js/actual';

library.add(faPen);
dom.watch();

import {DiscoveryService, ds_response_url, json_mdq_pre_get} from "../dsjs/discovery.js";
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
let context = "thiss.io";
let entityID = null;
let trustProfile = null;
let defaultText = "Your Institution";
let login_initiator_url = urlParams.get("loginInitiatorURL") || urlParams.get("loginHandlerURL");
let discovery_request = urlParams.get("discoveryRequest");
let discovery_response = urlParams.get("discoveryResponse");

if (!discovery_request)
    discovery_request = login_initiator_url;

if (!discovery_response)
    discovery_response = login_initiator_url;

if (urlParams.get("entityID"))
    entityID = urlParams.get("entityID");

if (urlParams.get("trustProfile"))
    trustProfile = urlParams.get("trustProfile");

if (entityID)
    discovery_request =  `${discovery_request}&entityID=${encodeURIComponent(entityID)}`

if (entityID && trustProfile)
    discovery_request =  `${discovery_request}&trustProfile=${trustProfile}`

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

main.style.background = urlParams.get("backgroundColor");
button.style.background = urlParams.get("color");
button.style.boxShadow = "0 0 0 5px " + urlParams.get("color");
dsbutton.style.color = urlParams.get("color");

let ctaFocus = false

const setCtaFocus = () => {
    button.style.boxShadow = "0 0 0 1px, 0 0 0 4px " + urlParams.get("color");
}

const clearCtaFocus = () => {
    button.style.boxShadow = "0 0 0 5px " + urlParams.get("color");
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

const localization = new Localization(urlParams.get("locale"));

if (urlParams.get("persistenceURL")) {
    persistence = urlParams.get("persistenceURL");
}

if (urlParams.get("context")) {
    context = urlParams.get("context");
}

if (urlParams.get("MDQ")) {
    mdq = urlParams.get("MDQ");
}

let ds = new DiscoveryService(mdq, persistence, context, entityID, trustProfile);

let start = [];
if (urlParams.get("pinned")) {
    start.push(ds.pin(urlParams.get("pinned")));
}

dsbutton.hidden = true;
let entity_id = null;

button.addEventListener('click', function(event) {
    if (entity_id !== null) { // return the discovery response
        ds.do_saml_discovery_response(entity_id).then(item => {
           discovery_response(item.entity);
        });
    } else { // off to DS
      console.log(`Entrring into SAA handler`);
        ds.storageAccessHandler(discovery_request);
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
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

await timeout(5000);

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
                    dsbutton.hidden = false;
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
