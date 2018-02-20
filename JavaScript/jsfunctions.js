var mainlat;
var mainlon;

function caricaDati (nome, data, arr) {
    addName (nome, data);
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition (functionGo, functionError);
    } else {
        document.getElementById ("idgeocoor").innerText = "La geolocation non è disponibile";
    }
    addTable (arr);
}

function addName (nome, data) {
    document.getElementById ("nome").innerText = nome;
    document.getElementById ("data").innerText = data;
}

function functionGo (posizione){
    if(posizione && posizione.coords) {
        var latitudine = posizione.coords.latitude.toFixed(2);
        var longitudine  = posizione.coords.longitude.toFixed(2);
        mainlat = latitudine;
        mainlon = longitudine;
        var app = "[" + latitudine + "," + longitudine + "]";
        document.getElementById ("idgeocoor").innerText = app;
    }
}

function miaFunzioneCallback(){
    var mapProp= {
        center:new google.maps.LatLng(mainlat,mainlon),
        zoom:16,
    };
    var map=new google.maps.Map(document.getElementById("mappa"),mapProp);
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