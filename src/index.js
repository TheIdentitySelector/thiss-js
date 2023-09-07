import {DiscoveryComponent} from "./component"; /* webpackPrefetch: true */
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.scss';
import './assets/sa-black.svg'

window.onload = function() {
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}`,
        backgroundColor: '#e9ecef',
        entityID: 'https://example.com/shibboleth',
        trustProfile: 'customer'
    }).render('#login');
};
