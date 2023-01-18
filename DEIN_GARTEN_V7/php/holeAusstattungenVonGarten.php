<?php

require("config.php");
require("autorisieren.php");

$gartenID = $_POST["gartenID"];

$sql = "

SELECT a.ID, a.ausstattung FROM ausstattung a 
INNER JOIN garten_hat_ausstattung junc ON a.ID = junc.ausstattung_id
WHERE junc.garten_id = '$gartenID';

";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}
