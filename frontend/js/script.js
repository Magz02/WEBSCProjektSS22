let addSuccess = ""

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
        data: 
    })
}

function addAppointment() {
    const status = $("#accepted");

    const date = new Date($("#appDate").val());

    const json = {
        "creator": $("#creatorName").val(),
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