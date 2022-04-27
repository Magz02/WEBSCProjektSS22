<?php
//commentHandler decides whether an comments needs to be added or read from from the db

require "db/db.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') { //add new one
    $jsonObj = json_decode(file_get_contents('php://input'));

    $appointment_id = $jsonObj->id;
    $creator = $jsonObj->creator;
    $text = $jsonObj->text;

    $query = "INSERT INTO comments (appointment_id, creator, text) VALUES (?, ?, ?);";
    $statement = $conn->prepare($query);
    $statement->bind_param("iss", $appointment_id, $creator, $text);
    $statement->execute();

    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode($jsonObj);

} else if ($method === 'GET') { //comments

    $query = "SELECT creator, appointment_id, text FROM comments";
    $statement = $conn->prepare($query);
    $statement->execute();
    $comments = $statement->get_result()->fetch_all(MYSQLI_ASSOC);

    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode($comments);

}

?>