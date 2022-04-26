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
} else if ($methid === 'DELETE') { //delete one entry

}
?>