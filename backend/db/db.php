<?php 
    $host = "localhost";
    $DBusername = "bif2webscriptinguser";
    $DBpassword = "bif2021"; 
    $database = "appointment";

    //Verbindung $conn erstellen
    $conn = new mysqli($host, $DBusername, $DBpassword, $database);

    //Verbindung überprüfen, wenn es schiefläuft zeig error
    if ($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
    }
?>