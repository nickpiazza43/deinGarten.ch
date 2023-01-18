var gartenID;

var ausstattungen = [];

holeUserGarten();

holeAlleAusstattungen();


function neuerGarten() {

    console.log("Neuen Garten erstellen!");

    let titel = document.querySelector("#titel").value;
    let adresse = document.querySelector("#adresse").value;
    let bild = document.querySelector("#bild").value;
    let beschreibung = document.querySelector("#beschreibung").value;
    let mietdauer = document.querySelector("#mietdauer").value;
    let preis = document.querySelector("#preis").value;
    let status = document.querySelector("input[name='status']:checked").value;

    let formData = new FormData();
    formData.append('titel', titel);
    formData.append('adresse', adresse);
    formData.append('bild', bild);
    formData.append('beschreibung', beschreibung);
    formData.append('mietdauer', mietdauer);
    formData.append('preis', preis);
    formData.append('status', status);
    
    formData.append('ausstattungen', JSON.stringify(ausstattungen));
    
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    formData.append('user', userID);


    fetch("https://554280-4.web.fhgr.ch/php/neuerGarten.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((response) => {

            return response.text();

        })
        .then((data) => {

            // console.log(data);

            document.querySelector('#nachricht').innerHTML = data;

             // zeige den korrekten Button an
             document.querySelector('#button-neue').classList.add("hidden");
               // zeige den korrekten Button an
               document.querySelector('#button-aktualisieren').classList.remove("hidden");
               document.querySelector('#button-loeschen').classList.remove("hidden");

        })

}

function holeUserGarten() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://554280-4.web.fhgr.ch/php/holeUserGarten.php",
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

            console.log(data);

            // falls es noch keinen Garten zu diesem User gibt
            // falls es noch keinen Garten zu diesem User gibt
            // falls es noch keinen Garten zu diesem User gibt
            if (data.length == 0) {

                // zeige Infotext an
                document.querySelector('#infoText').innerHTML = "Fülle dieses Formular aus, um deinen Garten aufzuschalten:"

                // zeige den korrekten Button an
                document.querySelector('#button-neue').classList.remove("hidden");

                // falls es bereits einen Garten zu diesem User gibt
                // falls es bereits einen Garten zu diesem User gibt
                // falls es bereits einen Garten zu diesem User gibt
            } else {

                // speichere die garten ID in der globalen variable
                // diese brauchen wir später zum aktualisieren und löschen des Gartens
                gartenID = data[0].ID;

                // zeige Infotext an
                document.querySelector('#infoText').innerHTML = "Hier kannst du deinen Garten bearbeiten:"

                // zeige den korrekten Button an
                document.querySelector('#button-aktualisieren').classList.remove("hidden");
                document.querySelector('#button-loeschen').classList.remove("hidden");

                // fülle das Formular mit den Werten aus der DB aus
                document.querySelector('#titel').value = data[0].titel;
                document.querySelector('#adresse').value = data[0].adresse;
                document.querySelector('#beschreibung').value = data[0].beschreibung;
                document.querySelector('#mietdauer').value = data[0].mietdauer;
                document.querySelector('#preis').value = data[0].preis;
                document.querySelector('#bild').value = data[0].bild;
                document.querySelector('#bild-vorschau').src = data[0].bild;

                // setze den korrekten Status (Radiobutton) aus den Infos der DB
                if (data[0].status == 1) {

                    document.querySelector('#status-frei').checked = true;

                } else {

                    document.querySelector('#status-besetzt').checked = true;

                }

                // färbe die Ausstattungen dieses Gartens korrekt ein
                holeAusstattungenVonGarten(gartenID);

            }
        })
}

function aktualisiereGarten() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    // Formulardaten in Body übertragen
    let titel = document.querySelector('#titel').value;
    let adresse = document.querySelector('#adresse').value;
    let beschreibung = document.querySelector('#beschreibung').value;
    let mietdauer = document.querySelector('#mietdauer').value;
    let preis = document.querySelector('#preis').value;
    let bild = document.querySelector('#bild').value;
    let status = document.querySelector('input[name="status"]:checked').value;

    let jsonAusstattungen = JSON.stringify(ausstattungen)

    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('titel', titel);
    formData.append('adresse', adresse);
    formData.append('beschreibung', beschreibung);
    formData.append('mietdauer', mietdauer);
    formData.append('preis', preis);
    formData.append('status', status);
    formData.append('bild', bild);

    formData.append('ausstattungen', jsonAusstattungen);

    formData.append('gartenID', gartenID);

    fetch("https://554280-4.web.fhgr.ch/php/aktualisiereGarten.php",
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

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            // zeige die Nachricht an
            document.querySelector('#nachricht').innerHTML = data;

        })
}

function loescheGarten() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('gartenID', gartenID);

    fetch("https://554280-4.web.fhgr.ch/php/loescheGarten.php",
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

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            console.log(data);

            document.querySelector('#nachricht').innerHTML = data;

            // button aktualisieren
            document.querySelector('#button-neue').classList.remove("hidden");
            document.querySelector('#button-aktualisieren').classList.add("hidden");
            document.querySelector('#button-loeschen').classList.add("hidden");

            // Formularfelder leeren
            document.querySelector('#titel').value = "";
            document.querySelector('#adresse').value = "";
            document.querySelector('#beschreibung').value = "";
            document.querySelector('#mietdauer').value = "";
            document.querySelector('#preis').value = "";
            document.querySelector('#bild').value = "";
            document.querySelector('#status-frei').checked = false;
            document.querySelector('#status-besetzt').checked = false;

            document.querySelector('#bild-vorschau').src = "";

            document.querySelector('.ausstattung').style = "Color: black;";

            // Variablen leeren
            ausstattungen = [];
            gartenID = "";

        })
};

//Ausstattungen
//Ausstattungen
//Ausstattungen
//Ausstattungen
//Ausstattungen

function holeAlleAusstattungen() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    fetch("https://554280-4.web.fhgr.ch/php/holeAlleAusstattungen.php",
        {
            body: "",
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

            data.forEach(ausstattung => {

                // schreibe Ausstattungen ins HTML
                let dieseAusstattung = document.createElement("div");

                dieseAusstattung.innerHTML = " <p onclick='addAusstattung(" + ausstattung.ID + ")' id='" + ausstattung.ID + "' class='ausstattung'> -" + ausstattung.ausstattung + "</p> ";

                dieseAusstattung.style = 'margin-right: 10px; cursor: pointer;';
                document.getElementById("ausstattungen").appendChild(dieseAusstattung);

            });

        })

    
}

function addAusstattung(id) {

    // Prüfe, ob ausstattung bereits im Array ist 
    if (ausstattungen.indexOf(id) == -1) {

        document.getElementById(id).style = "Color: blue;"

        ausstattungen.push(id);

    } else {

        document.getElementById(id).style = "Color: black;"

        ausstattungen.splice(ausstattungen.indexOf(id), 1);

    }

    console.log(ausstattungen);

}

function holeAusstattungenVonGarten(id) {

    // get authentication variables from localstorage
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

            if (data) {

                data.forEach(ausstattung => {

                    // färbe die ausstattungen ein
                    document.getElementById(ausstattung.ID).style = "color: Blue;";

                    // pushe die ausstattungen in die globale variable
                    ausstattungen.push(parseInt(ausstattung.ID));

                });

            }

        })

}

//Logout
//Logout
//Logout
//Logout
//Logout

function logout(){

    localStorage.clear();
    window.location = "/login.html";

}