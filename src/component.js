/**
  * Generate a 32 byte random identifier.
  *
  * @returns {string} a random string
  */
//import { create } from '@krakenjs/zoid'
import * as zoid from '@krakenjs/zoid/dist/zoid.frame';
import {toCSS, destroyElement} from 'belter/src';

function randID() {
     return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

//const url = process.env.COMPONENT_URL;

/**
 * A DiscoveryComponent class representing the business logic of a SAML disocvery service.
 *
class _DiscoveryComponent {
 */

    /**
     * The constructor takes 1 parameter:
     *
     * @param {props} [object] properties for the DS
     */
/**
    constructor(props) {
        this.props = props;
    }

    render(selector) {
        let frame = window.document.createElement('iframe');
        frame.style['height'] = '85px';
        frame.style['width'] = '350px';
        frame.style['border'] = '0px';
        frame.style['background-color'] = this.props.backgroundColor || 'transparent';
        if (this.props.color) {
            frame.style['color'] = this.props.color;
        }
        frame.setAttribute('title', 'SeamlessAccess Button')
        frame.setAttribute('aria-label', 'SeamlessAccess Button')
        frame.setAttribute('role', 'presentation')
        frame.id = "ps_"+randID();
        const elem = window.document.body.querySelector(selector);
        elem.appendChild(frame);
        const params = new URLSearchParams(this.props).toString();
        frame.src = `${url}?${params}`;
        return frame;
    }
}

export function DiscoveryComponent (props) {
    return new _DiscoveryComponent(props);
}
*/


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

    if (!discovery_request)
        discovery_request = login_initiator_url;


    if (typeof discovery_request !== 'function') {
        let discovery_request_url = discovery_request;
        discovery_request = function () {
            window.top.location.href = discovery_request_url;
        };
    }

    _set_default_props(opts);
    const _t = opts.doc.createElement("html");
    _t.innerHTML = preload_template(opts.props);
    _t.addEventListener('click', function(event) {
        event.preventDefault();
        discovery_request();
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

    /*
    event.on('zoid-resize', ({ width: newWidth, height: newHeight }) => {
        if (typeof newWidth === 'number') {
            div.style.width = toCSS(newWidth);
        }

        if (typeof newHeight === 'number') {
            div.style.height = toCSS(newHeight);
        }
    });
     */

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

    //containerTemplate: containerTemplate,
    //prerenderTemplate: prerenderTemplate
});

DiscoveryComponent.render = function(props, selector) {
  return DiscoveryComponent(props).render(selector);
};
