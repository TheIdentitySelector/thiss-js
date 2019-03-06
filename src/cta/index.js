require('webpack-icons-installer');
require('es6-promise').polyfill();
require('fetch-ie8');
import {DiscoveryService} from "../discovery.js";
import {DiscoveryComponent} from "../component.js";
import '../assets/login.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ra21icon.svg';
import URLSearchParams from '@ungap/url-search-params';


let mdq = process.env.MDQ_URL;
let persistence = process.env.PERSISTENCE_URL;
let context = null;
let defaultText = "Your Institution";
let login_handler_url = window.xprops.loginHandlerURL;
let on_discovery = function () { window.top.location.href = login_handler_url; };
let on_institution_clicked = function(url, entity_id) { window.top.location.href = url; };

document.getElementById('main').style.background = window.xprops.backgroundColor;
document.getElementById('idpbutton').style.background = window.xprops.colors;

if (window.xprops.persistenceURL) {
    persistence = window.xprops.persistenceURL;
}

if (window.xprops.context) {
    context = window.xprops.context;
}

if (window.xprops.MDQ) {
    mdq = window.xprops.MDQ;
}

if (window.xprops.onDiscovery) {
    on_discovery = window.xprops.onDiscovery;
}

if (window.xprops.onInstitutionClicked) {
    on_institution_clicked = window.xprops.onInstitutionClicked;
}

let ds = new DiscoveryService(new URLSearchParams(window.location.search), mdq, persistence, context);

let start = Promise.resolve();
if (window.xprops.pinned) {
    start = ds.pin(window.xprops.pinned);
}

start.then(function() {
    let count = 0;
    ds.with_items(function (items) {
        let button = document.getElementById('idpbutton');
        let dsbutton = document.getElementById('dsbutton');
        let entity_id = "";
        if (items && items.length > 0) { // or things have gone very wrong...
            let item = items[items.length-1];
            if (item && item.entity && item.entity.title && item.entity.entityID) { // silly
                document.getElementById('spinner').style.display = "none";
                document.getElementById('title').innerText = item.entity.title;
                entity_id = item.entity.entityID;
                document.getElementById('headline').innerText = "Access through";
                document.getElementById('headline').className = "ra21-button-text-secondary";
                count += 1;
            }
        }

        if (count == 0) {
            document.getElementById('spinner').style.display = "none";
            document.getElementById('title').innerText = "Access through your institution";
            button.dataset['href'] = "";
            $("#dsbutton").hide();
        }

        button.addEventListener('click', function(event) {
            event.preventDefault();
            setTimeout(function() {
                let params = {'return': login_handler_url};
                if (entity_id) { // return the discovery response
                    ds.do_saml_discovery_response(entity_id, params).then(function (url) {
                        on_institution_clicked(url, entity_id);
                    });
                } else { // off to DS
                    on_discovery();
                }
                window.xchild.close();
            }, 1000);
        });

        dsbutton.addEventListener('click', function(event) {
            event.preventDefault();
            setTimeout(function() {
                on_discovery();
                window.xchild.close();
            }, 1000);
        });

        return items;
    });
});