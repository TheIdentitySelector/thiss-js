require('webpack-icons-installer');
import {DiscoveryComponent} from "./component";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

window.onload = function() {
   DiscoveryComponent.render({
       returnURL: 'https://localhost/Shibboleth.sso/Login?target=https://google.com',
       backgroundColor: '#e9ecef'
   }, '#container');
};