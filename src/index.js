import {DiscoveryComponent} from "./component"; /* webpackPrefetch: true */
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.scss';
import './assets/sa-black.svg'

window.onload = function() {
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://cpauth.icos-cp.eu/saml/cpauth',
        trustProfile: 'global1'
    }).render('#login1');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://cpauth.icos-cp.eu/saml/cpauth',
        trustProfile: 'provider'
    }).render('#login2');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://cpauth.icos-cp.eu/saml/cpauth',
        trustProfile: 'other'
    }).render('#login3');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://cpauth.icos-cp.eu/saml/cpauth',
        trustProfile: 'customer'
    }).render('#login4');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://test-edusign.ed-integrations.com/shibboleth',
        trustProfile: 'customer2'
    }).render('#login5');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://test-edusign.ed-integrations.com/shibboleth',
        trustProfile: 'customer3'
    }).render('#login6');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://test-edusign.ed-integrations.com/shibboleth',
        trustProfile: 'customer4'
    }).render('#login7');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://box-idp.nordu.net/simplesaml/module.php/saml/sp/metadata.php/default-sp',
        trustProfile: 'customer'
    }).render('#login8');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://box-idp.nordu.net/simplesaml/module.php/saml/sp/metadata.php/default-sp',
        trustProfile: 'customer2'
    }).render('#login9');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://box-idp.nordu.net/simplesaml/module.php/saml/sp/metadata.php/default-sp',
        trustProfile: 'customer3'
    }).render('#login10');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://box-idp.nordu.net/simplesaml/module.php/saml/sp/metadata.php/default-sp',
        trustProfile: 'customer4'
    }).render('#login11');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://csucoast.infoready4.com/shibboleth',
        trustProfile: 'customer'
    }).render('#login12');
};
