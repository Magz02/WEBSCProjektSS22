let appointments = [];

$(() => {
    fetchAppointments();
    $("#newAppointment").on("click", addAppointment);
    $("#btnDeleteAppointment").on("click", deleteAppointment);
});

//Creates table with Appointments
function fetchAppointments() {
    $.ajax({
        type: "GET",
        url: "../backend/dataHandler.php",
        cache: false,
        dataType: "json",
        success: function (response) {
            appointments = response;
            appointments.forEach(createTable);
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function addAppointment() {
    const status = $("#accepted");

    const date = new Date($("#appDate").val());

    const json = {
        "creator": $("#creatorName").val(),
        "location": $("#location").val(),
        "appName": $("#appointName").val(),
        "description": $("#description").val(),
        "date": date
    };

    $.ajax({
        type: "POST",
        url: "../backend/dataHandler.php",
        data: JSON.stringify(json),
        dataType: "json",
        contentType: "json",
        success: function (response) {
            status.html("<span style='color: yellowgreen'>The Appointment was successfully created!</span>");
            status.html("<p style='white'>You will be redirected to the main page shortly.</p>");
            setTimeout(location.replace("../index.html"), 3000);
        },
        error: function (e) {
            console.log(e);
            status.html("<span style='color: #ff2617';>The Appointment could not be created. Try again!</span>");
        }
    });
}

function deleteAppointment() {
    $.ajax({

    });
}

function createTable(appointment) {
    let table = $("#table"); 
    let div = $("<div class='appointment' />");
    div.append("<h1>" + appointment.appName + "</h1>");
    div.append("<h3>Creator: " + appointment.creator + "</h3>");
    div.append("<h3>Location: " + appointment.location + "</h3>");
    div.append("<p>Description: " + appointment.description + "</p>");
    div.append("<p>Date (to be changed to choosing dates): </br>" + appointment.date + "</p>")
    let today = new Date().toISOString().split('T')[0];
    if (appointment.date < today) {
        div.append("<p style='color: red'>This appointment has already expired!</p>");
    }
    table.append(div);
    console.log(appointment.appName);
}

function setMinimum() {
    //source: https://www.demo2s.com/javascript/javascript-input-datetime-local-set-min-date-to-today.html
    let dateTime = document.getElementById("appDate").value;
    let today = new Date().toISOString().split('T')[0];
    today = today + "T00:00:00"
    document.getElementById("appDate").setAttribute('min', today);
}

setMinimum();