<?php

require('config.php');
require("autorisieren.php");

//userID muss auch noch übermittelt werden

$user = $_POST["user"];

$titel = $_POST["titel"];
$bild = $_POST["bild"];
$adresse = $_POST["adresse"];
$mietdauer = $_POST["mietdauer"];
$beschreibung = $_POST["beschreibung"];
$preis = $_POST["preis"];
$status = $_POST["status"];


$ausstattungen = json_decode($_POST['ausstattungen']);

$sql = "INSERT INTO garten (titel, bild, adresse, mietdauer, beschreibung, preis, user, status) VALUES (:Titel, :Bild, :Adresse, :Mietdauer, :Beschreibung, :Preis, :User, :Status)";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute(array('Titel' => $titel, 'Bild' => $bild, 'Adresse' => $adresse, 'Mietdauer' => $mietdauer, 'Beschreibung' => $beschreibung, 'Preis' => $preis, 'User' => $user, 'Status' => $status));

if ($erfolg) {

    print_r('Garten erfolgreich erstellt!');

    $letzteID = $pdo->lastInsertId();

    insertAusstattungen($ausstattungen, $letzteID);

} else {

    print_r($erfolg);
};



function insertAusstattungen($ausstattungen, $letzteID){

    require('config.php');

    // und wenn überhaupt Ausstattungen angeklickt wurden
    if (sizeof($ausstattungen) > 0) {

        $sql = "INSERT INTO garten_hat_ausstattung (garten_id, ausstattung_id) VALUES (:garten_id, :ausstattung_id)";

        $stmt = $pdo->prepare($sql);

        foreach ($ausstattungen as $ausstattung) {

            $erfolg = $stmt->execute(array('garten_id' => $letzteID, 'ausstattung_id' => $ausstattung));
        }

        if ($erfolg) {

            print_r("Dein Inserat wurde mit Ausstattungen erstellt.");

        } else {

            // gib die Fehlermeldung aus
            print_r($erfolg);
        }
    } else {

        print_r("Dein Inserat wurde ohne Ausstattungen erstellt.");
    }
} 