require('webpack-icons-installer');
const zoid = require('zoid');
const inner = require('!ejs-loader!./cta/preload.html');
export const DiscoveryComponent = zoid.create({

    // The html tag used to render my component
    tag: 'thiss-component',

    url: {
        thiss: process.env.COMPONENT_URL,
    },
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
        width: true,
        height: true
    },
    
    contexts: {
        iframe: true,
        popup: false
    },

    backgroundColor: '#FFFFFF',

    prerenderTemplate: function(opts) {
        const _t = opts.document.createElement("html");
        _t.innerHTML = inner();
        console.log(_t.innerHTML);
        return _t;
    }

});
