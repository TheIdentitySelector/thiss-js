require('webpack-icons-installer');
import './assets/login.css';
import './assets/ra21icon.svg';
//import './assets/fontawesome/fontawesome-all.css';
var zoid = require('zoid');

export let component = zoid.create({

    // The html tag used to render my component
    tag: 'my-onclick-component',

    url: {
        dev: 'http://localhost:8080/login.html',
    },
    defaultEnv: 'dev',

    // default dimensions for the component
    dimensions: {
    	width: '320px',
    	height: '80px'
    },
    
    // defines the log level in the JavaScript console
    defaultLogLevel: 'warn', // debug,info,warn,error
    
    // defines if the container should be resized
    autoResize: {
        width: true,
        height: true
    },
    
    // defined for an iframe context - see https://github.com/krakenjs/zoid/blob/master/docs/api.md for additional details
    contexts: {
        iframe: true,
        popup: false
    },

    prerenderTemplate: function(opts) {
        var div = opts.document.createElement("div");
        div.setAttribute("class","btn-group btn-block");
        div.innerHTML = '<button type="button" class="btn btn-primary"><i id="spinner" class="fa fa-circle-o-notch fa-spin"></i></button>';
        return div;
    }

});
