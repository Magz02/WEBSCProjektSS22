<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create new appointment</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
    <?php
        if(isset($_POST['create'])) {
            $creatorName = $_POST['creatorName'];
            $appointName = $_POST['appointName'];
            $description = $_POST['description'];
            $appDate = date($_POST['appDate']);

            require 'db/db.php';
            $query = "INSERT INTO appointments (creator, appName, description, date) values (?, ?, ?, ?);";
            $statement = $conn->prepare($query);
            if (!$statement->bind_param("ssss", $creatorName, $appointName, $description, $appDate)){
                echo "Binding not working.";
            }
            if (!$statement->execute()) {
                $error = "The Appointment could not be created. Try again!";
            }
        }
    ?>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="index.html">Main page</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../backend/newAppointment.php">Create new appointment</a>
            </li>
        </ul>
    </nav>
    <div>
        <form action="newAppointment.php" method="post">
            <div class="container" style="background-color: black;">
                <label for="creatorName">Your name:</label></br>
                <input type="text" id="creatorName" name="creatorName" placeholder="Jane Doe" required minlength="3"></br>
                
                <label for="appointName">Appointment name:</label></br>
                <input type="text" id="appointName" name="appointName" placeholder="Appointment name" required /></br>

                <label for="description">Description:</label></br>
                <textarea id="description" name="description" placeholder="Type your description (optional)..."></textarea></br>
                
                <label for="appDate">Date:</label></br>
                <input type="date" id="appDate" name="appDate" max="2030-12-31"></br> <!--Min als heutige Datum anlegen-->

                <input type="submit" name="create" value="Create the appointment" /></br>
                <?php
                    if (isset($error)) {
                        //When the submit button is clicked and the error is set from server's side, the error is shown on the client's side
                        echo '<span style="color: #ff2617";>' . $error . '</span>';
                    } else if (!isset($error) && isset($_POST["create"])) {
                        echo '<span style="color: yellowgreen">The Appointment was successfully created!</span>';
                        echo '<p>You will be redirected to the main page shortly.</p>';
                        header("Refresh: 3; url=../frontend/index.html");
                    }
                ?>
            </div>
        </form>
    </div>
    <!--code above-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>
</html>