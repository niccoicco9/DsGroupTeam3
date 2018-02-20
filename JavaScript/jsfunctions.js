function caricaDati (nome, data, arr) {
    addName (nome, data);
    /*location;*/
    addTable (arr);
}

function addName (nome, data) {
    document.getElementById ("nome").innerText = nome;
    document.getElementById ("data").innerText = data;
}

/*function location () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition (funzioneOk, funzioneErrore);
    } else {
        alert('La geolocation non è disponibile');
    }
}*/

function funzioneOk(posizione){
    if(posizione && posizione.coords){
        var latitudine = posizione.coords.latitude;
        var longitudine  = posizione.coords.longitude;
        var testo = "Latitudine: " + latitudine + " " + "Longitudine: " + longitudine;
        alert (testo);
    }
}

function funzioneErrore(error) {
    alert(error.message);
}

function addTable (arr) {
    document.getElementById ("idwind").innerText = arr[0];
    document.getElementById ("iddescription").innerText = arr[1];
    document.getElementById ("idgeocoor").innerText = arr[2];
    document.getElementById ("idpressure").innerText = arr[3];
    document.getElementById ("idtemperature").innerText = arr[4];
    document.getElementById ("idsunset").innerText = arr[5];
    document.getElementById ("idsunrise").innerText = arr[6];
}