import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.scss';

window.onload = function() {
    const entityID = urlParams.get('entityID');
    $("#choice").text(entityID)
};

