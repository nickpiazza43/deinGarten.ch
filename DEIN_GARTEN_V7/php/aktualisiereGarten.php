<?php

require_once('config.php');
require_once('autorisieren.php');

$userID = $_POST["userID"];
$titel = $_POST["titel"];
$adresse = $_POST["adresse"];
$mietdauer = $_POST["mietdauer"];
$beschreibung = $_POST["beschreibung"];
$preis = $_POST["preis"];
$status = $_POST["status"];

$bild = $_POST["bild"];

$gartenID = $_POST["gartenID"];

$ausstattungen = json_decode($_POST['ausstattungen']);

$sql = "UPDATE garten SET titel=?, bild=?, adresse=?, mietdauer=?, beschreibung=?, preis=?, status=? WHERE user=?";
$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute([$titel, $bild, $adresse, $mietdauer, $beschreibung, $preis, $status, $userID]);

// falls erfolg true bzw. 1 ist
if ($erfolg) {

    loescheAlteAusstattungen($gartenID);
    insertNeueAusstattungen($ausstattungen, $gartenID);

} else {

    print_r($erfolg);

};


function loescheAlteAusstattungen($gartenID){

    require('config.php');

    // lösche die alten ausstattungen
    $sql = "DELETE FROM garten_hat_ausstattung WHERE garten_id = ?";
    $stmt = $pdo->prepare($sql);

    $stmt->execute([$gartenID]);

}

function insertNeueAusstattungen($ausstattungen, $gartenID){

require('config.php');

// füge die neuen ausstattungen ein, wenn überhaupt ausstattungen angeklickt wurden
if (sizeof($ausstattungen) > 0) {

    $sql = "INSERT INTO garten_hat_ausstattung (garten_id, ausstattung_id) VALUES (:garten_id, :ausstattung_id)";
    $stmt = $pdo->prepare($sql);

    foreach ($ausstattungen as $ausstattung) {

        $erfolg = $stmt->execute(array('garten_id' => $gartenID, 'ausstattung_id' => $ausstattung));
    }

    if ($erfolg) {

        print_r("Dein Inserat wurde aktualisiert.");

    } else {

        // gib die Fehlermeldung aus
        print_r($erfolg);
    }
    
} else {

    print_r("Dein Inserat wurde ohne Ausstattungen aktualisiert.");
}

}
