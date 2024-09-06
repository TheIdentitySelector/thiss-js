import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const entityID = urlParams.get('entityID');
    $("#choice").text(entityID)
});

