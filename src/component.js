const zoid = require('zoid/dist/zoid.frame');
const preload_template = require('!ejs-loader!./cta/preload.html');
import {toCSS, destroyElement} from 'belter/src';

/**
 * The stub for the (zoid) DiscoveryComponent
 */

function _set_default_props(opts) {
    if (opts.props.color === undefined) {
        opts.props.color = "#0079ff";
    }
    if (opts.props.backgroundColor === undefined) {
        opts.props.backgroundColor = "#FFFFFF";
    }
    if (opts.dimensions.width === undefined) {
        opts.dimensions.width = '350px';
    }
    if (opts.dimensions.height === undefined) {
        opts.dimensions.height = '80px';
    }
    opts.props.dimensions = opts.dimensions;
}

function prerenderTemplate(opts) {
    _set_default_props(opts);
    console.log(opts);
    const _t = opts.doc.createElement("html");

    _t.innerHTML = preload_template(opts.props);
    return _t;
}

function containerTemplate(opts) {
    _set_default_props(opts);

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
    	height: '80px'
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

    containerTemplate: containerTemplate,
    prerenderTemplate: prerenderTemplate
});

DiscoveryComponent.render = function(props, selector) {
  return DiscoveryComponent(props).render(selector);
};