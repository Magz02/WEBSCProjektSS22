<?php

require "db/db.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') { //comment creation
    $jsonObj = json_decode(file_get_contents('php://input'));

    $appointment_id = $jsonObj->id;
    $creator = $jsonObj->creator;
    $text = $jsonObj->text;

    $query = "INSERT INTO comments (appointment_id, creator, text) VALUES (?, ?, ?);";
    $statement = $conn->prepare($query);
    $statement->bind_param("iss", $appointment_id, $creator, $text);
    $statement->execute();
}

?>