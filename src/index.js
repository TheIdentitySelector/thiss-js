
import {DiscoveryComponent} from "./component";
import 'bootstrap/dist/css/bootstrap.min.css';

window.onload = function() {
   DiscoveryComponent.render({
       loginHandlerURL: process.env.BASE_URL+'ds/?target=https://google.com&return=/&entityID=https://ra21.mnt.se/shibboleth',
       backgroundColor: '#e9ecef'
   }, '#login');
};
