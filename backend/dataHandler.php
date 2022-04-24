<?php
//dataHandler decides whether an appointment needs to be added or deleted from the db

require "db/db.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') { //table creation

} else if ($method === 'POST') { //add new one
    $jsonObj = json_decode(file_get_contents('php://input'));

    $creator = $jsonObj->creator;
    $appName = $jsonObj->appName;
    $description = $jsonObj->description;
    $date = $jsonObj->date;

    $query = "INSERT INTO appointments (creator, appName, description, date) values (?, ?, ?, ?);";
    $statement = $conn->prepare($query);
    $statement->bind_param("ssss", $creator, $appName, $description, $date);
    $statement->execute();
}
?>