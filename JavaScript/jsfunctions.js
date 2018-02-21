var map, infoWindow;
function initMap () {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 45.5094965,
            lng: 9.2315997
        },
        zoom: 14
    });
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here');
            infoWindow.open(map);
            map.setCenter(pos);
        },functionError);
    } else {
        functionError
    }
}

function caricaDati (nome, data, arr) {
    addName (nome, data);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition (functionGo, functionError);
    } else {
        functionError
    }
    addTable (arr);
}

function addName (nome, data) {
    document.getElementById ("nome").innerText = nome;
    document.getElementById ("data").innerText = data;
}

function functionGo (posizione){
    document.getElementById ("idgeocoor").innerText = "[" + posizione.coords.latitude.toFixed (2) + "," + posizione.coords.longitude.toFixed (2) + "]";
}

function functionError (error) {
    document.getElementById ("idgeocoor").innerText = error.message;
}

function addTable (arr) {
    document.getElementById ("idwind").innerText = arr[0];
    document.getElementById ("iddescription").innerText = arr[1];
    document.getElementById ("idpressure").innerText = arr[3];
    document.getElementById ("idtemperature").innerText = arr[4];
    document.getElementById ("idsunset").innerText = arr[6];
    document.getElementById ("idsunrise").innerText = arr[5];
}