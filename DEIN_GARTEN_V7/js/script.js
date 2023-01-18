holeUser();

holeGaerten();

function holeUser() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://554280-4.web.fhgr.ch/php/holeUser.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // falls die Sitzung nicht abgelaufen ist, verarbeite die JSON antwort
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            // mache etwas
            // console.log(data);

            // console.log(data[0].name);

            document.querySelector("#username").innerHTML = data[0].name;

        })
}

function holeGaerten() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://554280-4.web.fhgr.ch/php/holeGaerten.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // falls die Sitzung nicht abgelaufen ist, verarbeite die JSON antwort
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            // mache etwas
            console.log(data);

            GaertenAnzeigen(data);

            // console.log(data[0].name);
            
        })
}

function GaertenAnzeigen(data) {

    data.forEach(garten => {


        if (parseInt(garten.status)) {

            garten.status = "<p class = 'verfuegbarkeit'>🪴Verfügbar</p>";

        } else {

            garten.status = "<p class = 'verfuegbarkeit'>🔴Nicht verfügbar</p>";

        }

        let gartenContainer = document.createElement("div");

        // Wenn keine Bild URL vorhanden schreibe placeholder URL in die variable
        garten.bild != '' ? garten.bild = garten.bild : garten.bild = "https://via.placeholder.com/400?text=Kein+Bild";

        gartenContainer.innerHTML =
        
        `<div class="garten">
        <img class="garten-image" src="${garten.bild}">
        <h2 class="inseratTitel">${garten.titel} <br> ${garten.status}</h2>
        <p class="beschreibung">${garten.beschreibung}</p>
        <p class="mietdauer">Verfügbare Mietdauer: ${garten.mietdauer}</p>

        <div class="mapouter">
            <div class="gmap_canvas">
            <iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=${garten.adresse}&t=&z=11&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
            </iframe>
            </div>
        </div>
        
        <a class="adresse" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${garten.adresse}">${garten.adresse}</a> <br>

        <p> <b> <span class="hashtags" id="Garten-${garten.ID}">  </span> </b> </p>
        <p class="preis">Preis: ${garten.preis} CHF</p>
        <a class="buttonfill kontaktieren" target="_blank" href="mailto:${garten.email}"> ${garten.name} kontaktieren</a>
        </div>`;
  
        document.getElementById("liste-garten").appendChild(gartenContainer);

        holeAusstattungenVonGarten(garten.ID);

    });

}

function holeAusstattungenVonGarten(id) {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('gartenID', id);

    fetch("https://554280-4.web.fhgr.ch/php/holeAusstattungenVonGarten.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // error handling if session is expired
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            if (data.length > 0) {

                data.forEach(element => {

                    // füge die Ausstattungen ins Dokument ein 
                    // (hook: ID, welche in der Funktion GaertenAnzeigen dynamisch vergeben wird)
                    document.getElementById("Garten-" + id).innerHTML += '-' + element.ausstattung + ' ';

                });

            }

        })

}

function logout(){

    localStorage.clear();
    window.location = "/login.html";

}