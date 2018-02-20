var meteo = {
    "coord": {
        "lon": 45.77,
        "lat": 9.92
    },
    "weather": {
        "id": 803,
        "main": "Clouds",
        "description": "Broken clouds",
        "icon": "04n"
    },
    "base": "cmc stations",
    "main": {
        "temp": 6,
        "pressure": 1019,
        "humidity": 83,
        "temp_min": -1.5,
        "temp_max": 7.2,
        "sea_level": 10,
        "grnd_level": 20
    },
    "wind":{
        "speed": 5.1,
        "deg": 150
    },
    "clouds": {
        "all": 75
    },
    "rain": {
        "3h": 3
    },
    "snow": {
        "3h": 3
    },
    "dt": 1435658272,
    "sys": {
        "type": 1,
        "id": 8166,
        "message": 0.0166,
        "country": "AU",
        "sunrise": 1435610796,
        "sunset": 1435650870
    },
    "id": 2172797,
    "name": "Cairns",
    "cod": 200
}

function getWind () {
    return meteo.wind.speed + " m/s";
}

function getDescription () {
    return meteo.weather.description;
}

function getCoord () {
    return "[" + meteo.coord.lat.toFixed(2) + "," + meteo.coord.lon.toFixed(2) + "]";
}

function getPressure () {
    return meteo.main.pressure + " hpa";
}

function getTemp () {
    return meteo.main.temp + "°C";
}

function getSunrset () {
    return changeDate (meteo.sys.sunset);
}

function getSunrise () {
    return changeDate (meteo.sys.sunrise);
}

function changeDate (app) {
    var date = new Date(app * 1000);
    date.toLocaleTimeString();
    return date.getHours() + ":" + date.getMinutes ();
}

function getVet () {
    var vet = new Array ();
    vet.push (getWind ());
    vet.push (getDescription ());
    vet.push (getCoord ());
    vet.push (getPressure ());
    vet.push (getTemp ());
    vet.push (getSunrset ());
    vet.push (getSunrise ());
    return vet;
}