/*
 * global variable
 */
var map, infoWindow;
var pos = {
    lat: 45.5094965,
    lng: 9.2315997
};

$(document).ready(function(){
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + pos.lat + "&lon=" + pos.lng + "&APPID=ee6b293d773f4fcd7e434f79bbc341f2";
    $.getJSON(url, function(dataw) {
        addTable (dataw);
    });
    $.getJSON("https://randomuser.me/api/?results=1", function(datap) {
        addName (datap);
    });
    functionGo ();
});

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: pos.lat,
            lng: pos.lng
        },
        zoom: 14
    });
    infoWindow = new google.maps.InfoWindow;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos.lat = position.coords.latitude;
            pos.lng = position.coords.longitude;
            infoWindow.setPosition(pos);
            infoWindow.setContent('You are Here!!');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function functionGo () {
    $("#idgeocoor").text("[" + pos.lat.toFixed (2) + "," + pos.lng.toFixed (2) + "]");
}

function addName (app) {
    var person = app.results[0];
    if (person.gender=="male") {
        $("#hello").text("Ciao e Benvenuto" + "<p id=\"nome\"></p>");
        $("#nome").text(person.name.first + " " + person.name.last);
    } else {
        $("#hello").text("Ciao e Benvenuta" + "<p id=\"nome\"></p>");
        $("#nome").text(person.name.first + " " + person.name.last);
    }
    $("#data").text(person.registered);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function addTable (app) {
    $("#wind").text(app.wind.speed);
    $("#description").text(app.weather[0].description);
    $("#pressure").text(app.main.pressure);
    $("#temperature").text(app.main.temp);
    $("#sunset").text(app.sys.sunset);
    $("#sunrise").text(app.sys.sunrise);
}