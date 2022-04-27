<?php
//dataHandler decides whether an appointment needs to be added, deleted or read from the db

require "db/db.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') { //table creation

    $query = "SELECT id, creator, location, appName, description, duration, latestDate FROM appointments;";
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
    $duration = $jsonObj->duration;
    $latestDate = $jsonObj->latestDate;

    //checks if data has been given from the user, if not, cancells further reading
    if ($creator == null || $location == null || $appName == null || $duration == null) {
        exit;
    }

    //inserts an appointment to appointments table
    $query = "INSERT INTO appointments (creator, location, appName, description, duration, latestDate) values (?, ?, ?, ?, ?, ?);";
    $statement = $conn->prepare($query);
    $statement->bind_param("ssssis", $creator, $location, $appName, $description, $duration, $latestDate);
    if (!$statement->execute()) {
        exit;
    }

    //searches for an id of now created appointment
    $getId = "SELECT * FROM appointments WHERE appName = ?;";
    $statementId = $conn->prepare($getId);
    $statementId->bind_param("s", $appName);
    if (!$statementId->execute()) {
        exit;
    }

    //creates an integer out of the result of the query $getId
    $result = $statementId->get_result();
    $row = mysqli_fetch_array($result);
    $appId = $row['id'];

    //loops through dates array and adds them to availdates DB-Table
    foreach ($jsonObj->date as $date) {
        $queryDates = "INSERT INTO availdates (app_id, appDate) VALUES (?, ?);";
        $statementDates = $conn->prepare($queryDates);
        $statementDates->bind_param("is", $appId, $date);
        if (!$statementDates->execute()) {
            exit;
        }
    }

    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode($jsonObj);
    
} else if ($method === 'DELETE') { //delete one entry
    $jsonObj = json_decode(file_get_contents('php://input'));

    $id = $jsonObj->id; 

    //Deletes comments and availdates first because of FK constraints (otherwise it would not work)
    $queryComments = "DELETE FROM comments WHERE appointment_id = ?";
    $statementComments = $conn->prepare($queryComments);
    $statementComments->bind_param("i", $id);
    if (!$statementComments->execute()) {
        exit;
    }

    $queryDates = "DELETE FROM availdates WHERE app_id = ?";
    $statementDates = $conn->prepare($queryDates);
    $statementDates->bind_param("i", $id);
    if (!$statementDates->execute()) {
        exit;
    }

    $query = "DELETE FROM appointments WHERE id = ?";
    $statement = $conn->prepare($query);
    $statement->bind_param("i", $id);
    if (!$statement->execute()) {
        exit;
    }

    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode($jsonObj);
}
?>