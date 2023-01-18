<?php

require("config.php");
require("autorisieren.php");

$sql = "

SELECT GARTEN.ID, GARTEN.titel, GARTEN.bild, GARTEN.adresse, MD.mietdauer, GARTEN.beschreibung, GARTEN.preis, U.name, U.email, GARTEN.status, GARTEN.timestamp
FROM garten GARTEN
INNER JOIN user U
ON GARTEN.user = U.ID
INNER JOIN mietdauer MD
ON GARTEN.mietdauer = MD.ID
ORDER BY GARTEN.timestamp DESC;

";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}
