<?php

require_once('config.php');
require_once('autorisieren.php');

$userID = $_POST["userID"];
$gartenID = $_POST["gartenID"];

$sql = "DELETE FROM garten WHERE user = ? AND ID = ?";
$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute([$userID, $gartenID]);

if ($erfolg) {

    loescheAusstattungen($gartenID);

} else {

    print_r($erfolg);
};


function loescheAusstattungen($gartenID){

    require('config.php');

    // lösche die alten ausstattungen
    $sql = "DELETE FROM garten_hat_ausstattung WHERE garten_id = ?";
    $stmt = $pdo->prepare($sql);

    $erfolg = $stmt->execute([$gartenID]);

    if ($erfolg){

        echo "Garten und Ausstattungen wurden gelöscht!";

    }else{

        $erfolg;

    }

}