
import {DiscoveryComponent} from "./component"; /* webpackPrefetch: true */
import 'bootstrap/dist/css/bootstrap.min.css';

window.onload = function() {
    DiscoveryComponent({
       loginHandlerURL: process.env.BASE_URL+'ds/?target=https://google.com&return=/&entityID=https://ra21.mnt.se/shibboleth',
       backgroundColor: '#e9ecef'
    }).render('#login');
};
