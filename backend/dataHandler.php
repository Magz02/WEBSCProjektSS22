<?php
//dataHandler decides whether an appointment needs to be added or deleted from the db

require "db/db.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') { //table creation

    $query = "SELECT id, creator, location, appName, description, date FROM appointments";
    $statement = $conn->prepare($query);
    $statement->execute();
    $appointments = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode($appointments);

} else if ($method === 'POST') { //add new one
    $jsonObj = json_decode(file_get_contents('php://input'));

    $creator = $jsonObj->creator;
    $location = $jsonObj->location;
    $appName = $jsonObj->appName;
    $description = $jsonObj->description;
    $date = $jsonObj->date;

    $query = "INSERT INTO appointments (creator, location, appName, description, date) values (?, ?, ?, ?, ?);";
    $statement = $conn->prepare($query);
    $statement->bind_param("sssss", $creator, $location, $appName, $description, $date);
    $statement->execute();

    //to get the app_id so u know which dates belong to which appointment(did i write which wrong? looks wrong lol)
    $queryery = "SELECT id FROM appointments WHERE appName = ?;";
    $statement = $conn->prepare($query);
    $statement->bind_param("s", $appName);
    $statement->execute();
    $result = $statement->get_result();
    $row = mysqli_fetch_array($result);
    $appId = $row['id'];

    //the dates all get put into another table(with app_id?)
    $query = "INSERT INTO availdates (app_id,date) values (?);";
    $statement = $conn->prepare($query);
    $statement->bind_param("is",$appId, $date);
    $statement->execute();
} else if ($method === 'DELETE') { //delete one entry

}
?>