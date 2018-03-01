/*
 * global variable
 * jshint esversion: 6
 */
var map, infoWindow;
var pos = {
    lat: 43.325231,
    lng: 23.412342
    /*lat: 45.5094965,
    lng: 9.2315997*/
};
$(document).ready(function(){
    setTimeout( function() {
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + pos.lat + "&lon=" + pos.lng + "&APPID=ee6b293d773f4fcd7e434f79bbc341f2";
        $.getJSON(url, function(dataw) {
            $(document).delay(2000);
            addTable (dataw);
            functionGo ();
        });
    }, 10000);
    setTimeout( function() {
        var url = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + pos.lat + "&lon=" + pos.lng + "&APPID=ee6b293d773f4fcd7e434f79bbc341f2&";
        $.getJSON(url, function(dataf) {
            $(document).delay(2000);
            addTableForecast (dataf);
        });
    }, 10000);
    $.getJSON("https://randomuser.me/api/?results=1", function(datap) {
        addName (datap);
    });
    setTimeout( function() {
        url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pos.lat + "," + pos.lng + "&key=AIzaSyD-fxKwF1sWWcV49zr9q0cT97l6fIqZj-E";
        $.getJSON(url, function(datal) {
            addLocation (datal);
        });
    }, 10000);
});
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: pos.lat,
            lng: pos.lng
        },
        zoom: 15
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
            setTimeout( function() {
                $("#loader").css("display", "none");
            }, 5000);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}
function functionGo () {
    $("#geocoor").text("[" + pos.lat.toFixed (2) + "," + pos.lng.toFixed (2) + "]");
}
function addName (app) {
    if (app.results[0].gender=="male") {
        $("#hello").text("Ciao e Benvenuto ");
    } else {
        $("#hello").text("Ciao e Benvenuta ");
    }
    $("#nome").text(app.results[0].name.first + " " + app.results[0].name.last);
    //$("#data").text((app.results[0].registered).split(" ")[0]);
    $("#data").text((app.results[0].registered));
}
function addLocation (app) {
    $("#city").text(app.results[0].address_components[2].long_name);
    $("#country").text(app.results[0].address_components[6].long_name);
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? window.location.replace("../HTML/error.html") : 'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
function addTable (app) {
    $("#wind").text(app.wind.speed + " m/s " /*+ windDirection((app.wind.deg).toFixed (2))*/);
    $("#description").text(app.weather[0].description);
    $("#pressure").text(app.main.pressure + " hpa");
    $("#humidity").text(app.main.humidity + "%");
    $("#iconimg").attr("src","https://openweathermap.org/img/w/" + app.weather[0].icon + ".png");
    $("#sunset").text((new Date(app.sys.sunset*1000)).toLocaleTimeString());
    $("#sunrise").text((new Date(app.sys.sunrise*1000)).toLocaleTimeString());
    $("#temperature").text((app.main.temp-274.15).toFixed (0) + "°C");
}
function addTableForecast (app) {
    for (var cont=1;cont<7;cont++) {
        $("#day"+cont).text(getNextDay(app.list[cont].dt*1000));
        $("#mintemperature"+cont).text((app.list[cont].temp.min-274.15).toFixed (0) + "°C");
        $("#maxtemperature"+cont).text((app.list[cont].temp.max-274.15).toFixed (0) + "°C");
        $("#daytemperature"+cont).text((app.list[cont].temp.day-274.15).toFixed (0) + "°C");
        $("#morningtemperature"+cont).text((app.list[cont].temp.morn-274.15).toFixed (0) + "°C");
        $("#eveningtemperature"+cont).text((app.list[cont].temp.eve-274.15).toFixed (0) + "°C");
        $("#nighttemperature"+cont).text((app.list[cont].temp.night-274.15).toFixed (0) + "°C");
        $("#pressure"+cont).text(app.list[cont].pressure + " hpa");
        $("#cloudness"+cont).text(app.list[cont].clouds);
        $("#humidity"+cont).text(app.list[cont].humidity + "%");
        $("#iconimg"+cont).attr("src", "https://openweathermap.org/img/w/" + app.list[cont].weather[0].icon + ".png");
        $("#weather"+cont).text(app.list[cont].weather[0].main);
        $("#weathercondition"+cont).text(app.list[cont].weather[0].description);
        $("#windspeed"+cont).text(app.list[cont].speed + " m/s");
        $("#windirection"+cont).text(windDirection(app.list[cont].deg.toFixed (2)));
    }
}
function getNextDay (app) {
   var date = moment(app);
   var formatted = date.format('ddd DD/MM/YYYY');
   return formatted;
}
function windDirection (deg) {
    var north = "North";
    var est = "Est";
    var south = "South";
    var west = "West";
    if (deg>348.75 && deg<11.25) {
        return north+"("+deg+")";
    }
    if (deg>11.25 && deg<33.75) {
        return north+"-"+north+"-"+est+"("+deg+")";
    }
    if (deg>33.75 && deg<56.25) {
        return north+"-"+est+"("+deg+")";
    }
    if (deg>56.25 && deg<78.75) {
        return est+"-"+north+"-"+est+"("+deg+")";
    }
    if (deg>78.75 && deg<101.25) {
        return est+"("+deg+")";
    }
    if (deg>101.25 && deg<123.75) {
        return est+"-"+south+"-"+est+"("+deg+")";
    }
    if (deg>123.75 && deg<146.25) {
        return south+"-"+est+"("+deg+")";
    }
    if (deg>146.25 && deg<168.75) {
        return south+"-"+south+"-"+est+"("+deg+")";
    }
    if (deg>168.75 && deg<191.25) {
        return south+"("+deg+")";
    }
    if (deg>191.25 && deg<213.75) {
        return south+"-"+south+"-"+west+"("+deg+")";
    }
    if (deg>213.75 && deg<236.25) {
        return south+"-"+west+"("+deg+")";
    }
    if (deg>236.25 && deg<258.75) {
        return west+"-"+south+"-"+west+"("+deg+")";
    }
    if (deg>258.75 && deg<281.25) {
        return west+"("+deg+")";
    }
    if (deg>281.25 && deg<303.75) {
        return west+"-"+north+"-"+west+"("+deg+")";
    }
    if (deg>303.75 && deg<326.25) {
        return north+"-"+west+"("+deg+")";
    }
    if (deg>326.25 && deg<348.75) {
        return north+"-"+north+"-"+west+"("+deg+")";
    }
}