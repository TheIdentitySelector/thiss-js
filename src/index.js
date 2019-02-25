require('webpack-icons-installer');
import {DiscoveryComponent} from "./component";
import 'bootstrap/dist/css/bootstrap.min.css';

window.onload = function() {
   DiscoveryComponent.render({
       loginHandlerURL: process.env.BASE_URL+'ds/?target=https://google.com&return=#',
       backgroundColor: '#e9ecef'
   }, '#container');
};
