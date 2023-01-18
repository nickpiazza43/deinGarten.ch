<?php

require('config.php');

// Get variables out of POST
$email = $_POST["email"];
$benutzername = $_POST["benutzername"];
$password = $_POST["password"];

// hashing password for no plain passwords in DB
$password = password_hash($password, PASSWORD_DEFAULT);

// Run the isUsernameExists Function
// Which returns true if username exists
// or false if it doesn't

if (isUsernameExists($email)) {
    // Print error
    print_r('Diese Email existiert bereits!');
} else {

    //If User does not exist insert them into the DB
$sql = "INSERT INTO user (name, email, password) VALUES (:Name, :Email, :Password)";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute(array('Name' => $benutzername, 'Email' => $email, 'Password' => $password));

if ($erfolg) {
    // Print Success
    print_r('<a class="buttonfill" href="login.html"> Registrierung Erfolgreich – weiter zum Login</a>');

} else {
    // Print Error for debugging
    print_r($erfolg);
};

};

function isUsernameExists($email) {
    // Load Config.php into the function
    require('config.php');
    // Get all entries from user where email is the same as $email
    $sql = "SELECT * FROM user WHERE email = ?";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute(array($email));
    
    if ($stmt -> rowCount() > 0 ) {
        return true;
    }

    return false;
}


// require('config.php');

// $email = $_POST["email"];
// $benutzername = $_POST["benutzername"];
// $password = $_POST["password"];

// $password = password_hash($password, PASSWORD_DEFAULT);

// $sql = "INSERT INTO user (name, email, password) VALUES (:Name, :Email, :Password)";

// $stmt = $pdo->prepare($sql);

// $erfolg = $stmt->execute(array('Name' => $benutzername, 'Email' => $email, 'Password' => $password));

// if ($erfolg) {

//     print_r('Registrierung erfolgreich.');
// } else {

//     print_r($erfolg);
// };