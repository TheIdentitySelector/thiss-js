import {DiscoveryComponent} from "./component"; /* webpackPrefetch: true */
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.scss';
import './assets/sa-black.svg'

window.onload = function() {
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://cpauth.icos-cp.eu/saml/cpauth',
        trustProfile: 'customer'
    }).render('#login1');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://cpauth.icos-cp.eu/saml/cpauth',
        trustProfile: 'other'
    }).render('#login2');
};
