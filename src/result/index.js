import {DiscoveryComponent} from "./component"; /* webpackPrefetch: true */
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.scss';
import './assets/sa-black.svg'

window.onload = function() {
    const entityID = urlParams.get('entityID');
    $("#choice").text(entityID)
};

