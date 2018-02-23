/*
 * global variable
 */
var map, infoWindow, globlalweather, globalperson;

$(document).ready(function(){
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=ee6b293d773f4fcd7e434f79bbc341f2", function(data) {
        globlalweather = data;
    });
    $.getJSON("https://randomuser.me/api/?results=1", function(data) {
        globalperson = data;
    });
    addTable ();
});


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

function caricaDati (nome, data, titolo) {
    addName (nome, data, titolo);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition (functionGo, functionError);
    } else {
        functionError
    }
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
    var weather = globlalweather.results[0];
    document.getElementById ("idwind").innerText = weather.wind.speed;
    document.getElementById ("iddescription").innerText = weather.weather["description"];
    document.getElementById ("idpressure").innerText = weather.main.pressure;
    document.getElementById ("idtemperature").innerText = weather.main.temp;
    document.getElementById ("idsunset").innerText = weather.sys.sunset;
    document.getElementById ("idsunrise").innerText = weather.sys.sunrise;
}