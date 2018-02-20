function caricaDati (nome, data) {
    var pnomeapp = document.getElementById ("nome");
    pnomeapp.innerText = nome;
    var pdataapp = document.getElementById ("data");
    pdataapp.innerText = data;
    function location () {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition (funzioneOk, funzioneErrore);
        } else {
            alert('La geolocation non è disponibile');
        }
    }
}

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