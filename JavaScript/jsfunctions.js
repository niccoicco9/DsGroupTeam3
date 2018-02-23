/*
 * global variable
 */
var map, infoWindow;
var pos = {
    lat: 43.325231,
    lng: 23.412342
    /*lat: 45.5094965,
    lng: 9.2315997*/
};

$(document).ready(function(){
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + pos.lat + "&lon=" + pos.lng + "&APPID=ee6b293d773f4fcd7e434f79bbc341f2";
    $.getJSON(url, function(dataw) {
        $(document).delay(2000);
        addTable (dataw);
        functionGo ();
    });
    $.getJSON("https://randomuser.me/api/?results=1", function(datap) {
        addName (datap);
    });

    setTimeout( function() {}, 10000);
    url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pos.lat + "," + pos.lng + "&key=AIzaSyD-fxKwF1sWWcV49zr9q0cT97l6fIqZj-E";
    $.getJSON(url, function(datal) {
        addLocation (datal);
    });
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
    setTimeout( function() {
        $("#geocoor").text("[" + pos.lat.toFixed (2) + "," + pos.lng.toFixed (2) + "]");
    }, 10000);
    
}

function addName (app) {
    if (app.results[0].gender=="male") {
        $("#hello").text("Ciao e Benvenuto ");
    } else {
        $("#hello").text("Ciao e Benvenuta ");
    }
    $("#nome").text(app.results[0].name.first + " " + app.results[0].name.last);
    $("#data").text((app.results[0].registered).split(" ")[0]);
}

function addLocation (app) {
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function addTable (app) {
    $("#wind").text(app.wind.speed + " m/s");
    $("#description").text(app.weather[0].description);
    $("#pressure").text(app.main.pressure + " hpa");
    $("#temperature").text((app.main.temp-272.15).toFixed (0) + "°C");
    $("#iconimg").text("https://openweathermap.org/img/w/" + app.weather[0].icon + ".png");
    $("#sunset").text((new Date(app.sys.sunset*1000)).toLocaleTimeString());
    $("#sunrise").text((new Date(app.sys.sunrise*1000)).toLocaleTimeString());
}