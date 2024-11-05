const postRobot = require("post-robot");
import {DiscoveryComponent} from "./component"; /* webpackPrefetch: true */
import {DiscoveryService} from "@theidentityselector/thiss-ds/src/discovery.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.scss';
import './assets/sa-black.svg'

window.onload = function() {
    const ds = new DiscoveryService(
      process.env.MDQ_URL,
      process.env.PERSISTENCE_URL,
      {
        selector: "#checkbox-sa-1",
    });
    ds.ps.entities(ds.context).then(function(result) {
        if (result && result.data) {
            updateUI(result.data);
        }
    });
    const updateUI = (data) => {
        const elem = window.document.getElementById("out-adv-1");
        elem.innerHTML = "";
        data.forEach(function (entity) {
            let p = window.document.createElement('p');
            p.append(entity.entity.entityID);
            elem.appendChild(p);
        });
    };
    const entity = {
      "title":"Cornell University",
      "domain":"cornell.edu",
      "entity_id":"https://shibidp.cit.cornell.edu/idp/shibboleth",
      "entityID":"https://shibidp.cit.cornell.edu/idp/shibboleth",
      "strictProfile":true,
      "hint":false,
      "id": "{sha1}95fbb224d65c28db71176a3b8e58c38281675884"
    };
    const button = window.document.getElementById("adv-set-entity");
    button.addEventListener("click", (e) => {
        ds.ps.update(ds.context, entity);
    });

    postRobot.on('start', {window: ds.ps.dst}, function(event) {
        ds.ps.entities(ds.context).then(function(result) {
            if (result && result.data) {
                updateUI(result.data);
            }
        });
    });
    // ########################################################################################### //
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://cpauth.icos-cp.eu/saml/cpauth',
        discoveryResponse: `${process.env.BASE_URL}result`
    }).render('#login0');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://cpauth.icos-cp.eu/saml/cpauth',
        trustProfile: 'incommon-wayfinder',
        discoveryResponse: `${process.env.BASE_URL}result`
    }).render('#login05');
    DiscoveryComponent.render({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://cpauth.icos-cp.eu/saml/cpauth',
        trustProfile: 'swamid-edugain',
        discoveryResponse: `${process.env.BASE_URL}result`
    },
    '#login06');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://cpauth.icos-cp.eu/saml/cpauth',
        trustProfile: 'swamid',
        discoveryResponse: `${process.env.BASE_URL}result`
    }).render('#login07');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://cpauth.icos-cp.eu/saml/cpauth',
        trustProfile: 'incommon-regauth',
        discoveryResponse: `${process.env.BASE_URL}result`
    }).render('#login08');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://cpauth.icos-cp.eu/saml/cpauth',
        trustProfile: 'global1',
        discoveryResponse: `${process.env.BASE_URL}result`
    }).render('#login1');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://cpauth.icos-cp.eu/saml/cpauth',
        trustProfile: 'provider',
        discoveryResponse: `${process.env.BASE_URL}result`
    }).render('#login2');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://cpauth.icos-cp.eu/saml/cpauth',
        trustProfile: 'other',
        discoveryResponse: `${process.env.BASE_URL}result`
    }).render('#login3');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://cpauth.icos-cp.eu/saml/cpauth',
        trustProfile: 'customer',
        discoveryResponse: `${process.env.BASE_URL}result`
    }).render('#login4');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://cpauth.icos-cp.eu/saml/cpauth',
        trustProfile: 'customer2',
        discoveryResponse: `${process.env.BASE_URL}result`
    }).render('#login5');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://cpauth.icos-cp.eu/saml/cpauth',
        trustProfile: 'customer3',
        discoveryResponse: `${process.env.BASE_URL}result`
    }).render('#login6');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://cpauth.icos-cp.eu/saml/cpauth',
        trustProfile: 'customer4',
        discoveryResponse: `${process.env.BASE_URL}result`
    }).render('#login7');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://box-idp.nordu.net/simplesaml/module.php/saml/sp/metadata.php/default-sp',
        trustProfile: 'customer',
        discoveryResponse: `${process.env.BASE_URL}result`
    }).render('#login8');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://box-idp.nordu.net/simplesaml/module.php/saml/sp/metadata.php/default-sp',
        trustProfile: 'customer2',
        discoveryResponse: `${process.env.BASE_URL}result`
    }).render('#login9');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://box-idp.nordu.net/simplesaml/module.php/saml/sp/metadata.php/default-sp',
        trustProfile: 'customer3',
        discoveryResponse: `${process.env.BASE_URL}result`
    }).render('#login10');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://box-idp.nordu.net/simplesaml/module.php/saml/sp/metadata.php/default-sp',
        trustProfile: 'customer4',
        discoveryResponse: `${process.env.BASE_URL}result`
    }).render('#login11');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'https://csucoast.infoready4.com/shibboleth',
        trustProfile: 'customer',
        discoveryResponse: `${process.env.BASE_URL}result`
    }).render('#login12');
    DiscoveryComponent({
        loginHandlerURL: process.env.BASE_URL+`ds/?target=https://google.com&return=${process.env.BASE_URL}result`,
        backgroundColor: '#e9ecef',
        entityID: 'http://fs.liu.se/adfs/services/trust',
        trustProfile: 'other',
        discoveryResponse: `${process.env.BASE_URL}result`
    }).render('#login13');
};
