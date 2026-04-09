const postRobot = require("post-robot");
import {DiscoveryComponent} from "./component"; /* webpackPrefetch: true */
import {DiscoveryService} from "@theidentityselector/thiss-ds/src/discovery.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.scss';
import './assets/sa-black.svg'

window.onload = function() {
    DiscoveryComponent.render({
      loginHandlerURL: process.env.BASE_URL+`ds/?entityID=${encodeURIComponent("https://demo.beta.seamlessaccess.org/shibboleth")}&return=${encodeURIComponent("https://demo.beta.seamlessaccess.org/Shibboleth.sso/Login")}`,
        discoveryResponse: `${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
    }, '#login0');
}; 
