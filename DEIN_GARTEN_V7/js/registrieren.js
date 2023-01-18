// console.log("Hello Registrierung");
let form1 = document.querySelector('#registrieren');

form1.addEventListener('submit', async (e) => {

    document.querySelector('#nachricht').innerHTML = "";

    e.preventDefault();

    if (javaValidation()){
        registrieren();
    } else {
        document.querySelector('#nachricht').innerHTML = "Ungültige Email";
    }
});



function registrieren(){

    let benutzername = document.querySelector("#benutzername").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    let formData = new FormData();
    formData.append('benutzername', benutzername);
    formData.append('email', email);
    formData.append('password', password);

   
    fetch("https://554280-4.web.fhgr.ch/php/registrieren.php",
        {
            body: formData,
            method: "post",
        })

        .then((response) => {

            return response.text();

        })
        .then((data) => {

        // console.log(data);

        document.querySelector('#nachricht').innerHTML = data;

        if (data == "Registrierung erfolgreich.") {

            document.querySelector('#button-login').classList.remove("hidden");
        }

        })

    }



    function javaValidation(){
        let email = document.querySelector('#email').value;

        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }



 /*    function javaValidation(){
        let email = document.querySelector('#email').value;

        let pattern = '@';

        let result = pattern.match(email);

        return result;
    } */