<?php

require "db/db.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') { //GET all dates to append them to their appointments in index.html

    $query = "SELECT app_id, appDate FROM availdates;";
    $statement = $conn->prepare($query);
    $statement->execute();
    $dates = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
    
    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode($dates);
}

?>