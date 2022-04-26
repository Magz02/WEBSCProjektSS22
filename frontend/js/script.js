let appointments = [];

$(() => {
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
            status.append("<p style='white'>You will be redirected to the main page shortly.</p>");
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

function addComment(id) {

    const json = {
        "id": id,
        "creator": $("#creator" + id).val(),
        "text": $("#comment" + id).val()
    }

    $.ajax({
        type: "POST",
        url: "../backend/commentHandler.php",
        data: JSON.stringify(json),
        dataType: "json",
        contentType: "json",
        success: function (response) {
            console.log("Success");
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function createTable(appointment) {
    // Elements declaration
    let id = appointment.id;
    let table = $("#table"); 
    let div = $("<div class='appointment' />");
    let innerDiv = $("<div class='details' id='" + id + "' />");
    let name = $("<br><input type='text' id='creator" + id + "' name='" + id + "'  />")
    let comment = $("<br><textarea id='comment" + id + "' name='" + id + "'  />");
    let newComment = "<br><button onclick='addComment(" + id + ")'>Create the comment</button>";
    let commentDiv = $("<div class='comments' id='comments" + id + "' />");
    
    // HTML Elements append // InnerDiv = Details (default = hidden), Div = Whole Appointment
    innerDiv.append("<p>Description: " + appointment.description + "</p>");
    innerDiv.append("<p>Date (to be changed to choosing dates): </br>" + appointment.date + "</p>");
    commentDiv.append("<label for='creator" + id + "' />Your name:</label>");
    commentDiv.append(name);
    commentDiv.append("<br><label for='comment" + id + "' />Type in your comment:</label>");
    commentDiv.append(comment);
    commentDiv.append(newComment);
    div.append("<h1>" + appointment.appName + "</h1>");
    div.append("<h3>Creator: " + appointment.creator + "</h3>");
    div.append("<h3>Location: " + appointment.location + "</h3>");
    div.append("<button type='button' class='btn btn-success' id='hideShow" + id + "' onclick='show(" + id + ")'>Show details</button>");
    div.append("<button type='button' class='btn btn-success' id='hideShowComs" + id + "' onclick='showComs(" + id + ")'>Show comments</button>")
    div.append(innerDiv.hide());
    div.append(commentDiv.hide());

    // If expired
    let today = new Date().toISOString().split('T')[0];
    if (appointment.date < today) {
        div.append("<p style='color: red'>This appointment has already expired!</p>");
    }

    // Appends new div in preexisting div in index.html
    table.append(div);
}

function setMinimum() {
    //source: https://www.demo2s.com/javascript/javascript-input-datetime-local-set-min-date-to-today.html
    let dateTime = document.getElementById("appDate").value;
    let today = new Date().toISOString().split('T')[0];
    today = today + "T00:00:00"
    document.getElementById("appDate").setAttribute('min', today);
}

function hide(id) {
    $("#" + id).fadeOut(500);
    $("#hideShow" + id).html("Show details");
    $("#hideShow" + id).attr("class", "btn btn-success");
    $("#hideShow" + id).attr("onclick","show("+ id +")");
}

function show(id) {
    $("#" + id).fadeIn(500);
    $("#hideShow" + id).html("Hide details");
    $("#hideShow" + id).attr("class", "btn btn-danger");
    $("#hideShow" + id).attr("onclick","hide(" + id + ")");
}

function showComs(id) {
    $("#comments" + id).fadeIn(500);
    $("#hideShowComs" + id).html("Hide comments");
    $("#hideShowComs" + id).attr("class", "btn btn-danger");
    $("#hideShowComs" + id).attr("onclick","hideComs(" + id + ")");
}

function hideComs(id) {
    $("#comments" + id).fadeOut(500);
    $("#hideShowComs" + id).html("Show comments");
    $("#hideShowComs" + id).attr("class", "btn btn-success");
    $("#hideShowComs" + id).attr("onclick","showComs(" + id + ")");
}

function more() {
    let anotherDate = $("<input type='datetime-local' id='appDate' name='appDate' max='2030-12-31T23:59:59' />");
    let btnMore = "<button onclick='more()'>+</button>";
    let btnLess = "<button onclick='less()'>-</button><br>";
    $("#dates").append(anotherDate);
    $("#dates").append(btnMore);
    $("#dates").append(btnLess);
}

function less() {

}