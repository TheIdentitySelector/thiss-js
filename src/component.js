//import { create } from '@krakenjs/zoid'
import * as zoid from '@krakenjs/zoid/dist/zoid.frame';
import {toCSS, destroyElement} from '@krakenjs/belter/src';
import raw_preload_template from './cta/preload.html'
import 'ejs/ejs.min';
//import {requestingStorageAccess} from "./storage/index.js";


/**
  * Generate a 32 byte random identifier.
  *
  * @returns {string} a random string
  */
function randID() {
     return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

function _set_default_props(opts) {
    if (opts.props.color === undefined) {
        opts.props.color = "#216e93";
    }
    if (opts.props.backgroundColor === undefined) {
        opts.props.backgroundColor = "#FFFFFF";
    }
    if (opts.dimensions.width === undefined) {
        opts.dimensions.width = '350px';
    }
    if (opts.dimensions.height === undefined) {
        opts.dimensions.height = '85px';
    }
    opts.props.dimensions = opts.dimensions;
}

function prerenderTemplate(opts) {

    let login_initiator_url = opts.props.loginInitiatorURL || opts.props.loginHandlerURL;
    let discovery_request = opts.props.discoveryRequest;
    let discovery_response = opts.props.discoveryResponse;
    let entityID = opts.props.entityID;
    let trustProfile = opts.props.trustProfile;

    if (!discovery_request)
        discovery_request = login_initiator_url;

    if (!discovery_response)
        discovery_response = login_initiator_url;

    if (discovery_request !== discovery_response && typeof discovery_request === 'string') {
        // assume discoveryRequest is the URL of an instance of our DS
        let search_string = `return=${encodeURIComponent(discovery_response)}`;
        if (entityID && trustProfile) {
            search_string = `${search_string}&entityID=${encodeURIComponent(entityID)}&trustProfile=${trustProfile}`;
        }
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
    const preload_template = ejs.compile(raw_preload_template);

    _set_default_props(opts);
    const _t = opts.doc.createElement("html");
    _t.innerHTML = preload_template(opts.props);
    let elem = _t.querySelector('#fallbacklink');
    if (elem === null)
        elem = _t;
    elem.addEventListener('click', function(event) {
        event.preventDefault();
        discovery_request();
        //requestingStorageAccess(discovery_request);
    });
    return _t;
}

function containerTemplate(opts) {
    _set_default_props(opts);

    opts.frame.setAttribute('title', 'SeamlessAccess Button')
    opts.frame.setAttribute('aria-label', 'SeamlessAccess Button')
    opts.frame.setAttribute('role', 'presentation')

    let uid = opts.uid;
    let doc = opts.doc;
    let props = opts.props;
    let height = opts.dimensions.height;
    let width = opts.dimensions.width;
    let frame = opts.frame;
    let prerenderFrame = opts.prerenderFrame;
    let event = opts.event;

    const div = doc.createElement('div');
    div.setAttribute('id', uid);
    const style = doc.createElement('style');
    if (props.cspNonce) {
        style.setAttribute('nonce', props.cspNonce);
    }

    style.appendChild(doc.createTextNode(`
        #${ uid } {
            display: inline-block;
            position: relative;
            width: ${ width };
            height: ${ height };
        }
        #${ uid } > iframe {
            display: inline-block;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            /* transition: opacity .2s ease-in-out; */
        }
        #${ uid } > iframe.invisible {
            opacity: 0;
        }
        #${ uid } > iframe.visible {
            opacity: 1;
    }
    `));

    div.appendChild(frame);
    div.appendChild(prerenderFrame);
    div.appendChild(style);

    prerenderFrame.classList.add('visible');
    frame.classList.add('invisible');

    event.on('zoid-rendered', () => {
        prerenderFrame.classList.remove('visible');
        prerenderFrame.classList.add('invisible');

        frame.classList.remove('invisible');
        frame.classList.add('visible');

        setTimeout(() => {
            destroyElement(prerenderFrame);
        }, 1);
    });
    return div;
}

export const DiscoveryComponent = zoid.create({

    // The html tag used to render my component
    tag: 'thiss-cta',

    url: process.env.COMPONENT_URL,

    defaultEnv: 'thiss',

    // default dimensions for the component
    dimensions: {
    	width: '350px',
    	height: '85px'
    },

    // defines the log level in the JavaScript console
    defaultLogLevel: process.env.LOGLEVEL,

    // defines if the container should be resized
    autoResize: {
        width: false,
        height: false
    },

    contexts: {
        iframe: true,
        popup: false
    },

    backgroundColor: '#FFFFFF',
    color: '#0079ff',
    locale: null,

    containerTemplate: containerTemplate,
    prerenderTemplate: prerenderTemplate
});

DiscoveryComponent.render = function(props, selector) {
  return DiscoveryComponent(props).render(selector);
};
