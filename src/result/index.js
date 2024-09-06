import 'bootstrap/dist/css/bootstrap.min.css';

window.onload = function() {
    const entityID = urlParams.get('entityID');
    $("#choice").text(entityID)
};

