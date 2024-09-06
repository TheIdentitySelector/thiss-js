import 'bootstrap/dist/css/bootstrap.min.css';

window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const entityID = urlParams.get('entityID');
    $("#choice").text(entityID)
};

