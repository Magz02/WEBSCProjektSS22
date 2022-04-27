let appointments = [];
let comments = [];
let dates = [];
//latestDate is set as some date in the distant past, to make it easier to compare to any new given date
let latestDate = new Date('2020-01-01T00:00');

$(() => {
    $("#newAppointment").on("click", addAppointment);
});

///////////////////////////  FETCH  ///////////////////////////

//gets a json response with appointments db-table which it later uses to create "Table" divs in index.html
//is being loaded onload of index.html
function fetchAppointments() {
    $.ajax({
        type: "GET",
        url: "../backend/dataHandler.php",
        cache: false,
        dataType: "json",
        success: function (response) {
            appointments = response;
            appointments.forEach(createTable); //loops through all appointments to create "Table" divs in index.html
            fetchComments();
        },
        error: function (e) {
            console.log(e);
        }
    });
}

//gets a json response with comments db-table which it later uses to create "Comment" divs in "Table" divs in index.html
function fetchComments() {
    $.ajax({
        type: "GET",
        url: "../backend/commentHandler.php",
        cache: false,
        dataType: "json",
        success: function (response) {
            comments = response;

            //loops through all comments to create "Comment" divs in "Table" divs in index.html
            comments.forEach(createComment); 
            fetchDates();
        },
        error: function (e) {
            console.log(e);
        }
    });
}

//gets a json response with dates db-table which it later uses to create "Dates" divs in "Details" divs in 
//"Table" divs in index.html
function fetchDates() {
    $.ajax({
       type: "GET",
       url: "../backend/appointmentHandler.php",
       cache: false,
       dataType: "json",
       success: function (response) {
           dates = response;

           //loops through all dates to append them in "details" divs
           dates.forEach(createDates);
       },
       error: function (e) {
           console.log(e);
       }
    });
}

///////////////////////////  AJAX ADD/DELETE  ///////////////////////////


function addAppointment() {
    const status = $("#accepted");

    //creates an array which contains user inputs with dates (1-5 Dates)
    const datesJson = Array.from($(".appDate")).map(d=>new Date($(d).val()));
    datesJson.forEach(findLatest);

    const json = {
        "creator": $("#creatorName").val(),
        "location": $("#location").val(),
        "appName": $("#appointName").val(),
        "description": $("#description").val(),
        "date": datesJson,
        "duration": $("#duration").val(),
        "latestDate": latestDate
    };

    $.ajax({
        type: "POST",
        url: "../backend/dataHandler.php",
        data: JSON.stringify(json),
        dataType: "json",
        contentType: "json",
        success: function (response) {
            console.log(response);
            status.html("<span style='color: yellowgreen'>The Appointment was successfully created!</span>");
            status.append("<p style='color: white'>You will be redirected to the main page shortly.</p>");
            setTimeout(location.replace("index.html"), 5000);
        },
        error: function (e) {
            console.log(e);
            status.html("<span style='color: #ff2617';>The Appointment could not be created. Try again!</span>");
        }
    });
}

function deleteAppointment(id) {

    const json = {
        "id": id
    };

    $.ajax({
        type: "DELETE",
        url: "../backend/dataHandler.php",
        data: JSON.stringify(json),
        dataType: "json",
        contentType: "json",
        success: function (response) {
            setTimeout(location.replace("index.html"));
        },
        error: function (e) {
            console.log(e);
        }
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
            $("#comments" + id).append("<span style='color: yellowgreen'>The Comment was successfully created!</span>");
            setTimeout(location.replace("index.html"), 1500);
        },
        error: function (e) {
            console.log(e);
        }
    });
}

///////////////////////////  FUNCTIONS  ///////////////////////////

//This function compares every element of datesJson table to find which element is the one that is going to
//take place at the latest moment
function findLatest(element) {
    if (element > latestDate) {
        latestDate = element;
    }
}

//creates "Table" divs with appointments (only the most important informations)
function createTable(appointment, dates) {
    // Elements declaration
    let id = appointment.id;
    let table = $("#table"); 
    let div = $("<div class='appointment' />");
    let innerDiv = $("<div class='details' id='" + id + "' />");
    let name = $("<br><input type='text' id='creator" + id + "' name='" + id + "'  />")
    let comment = $("<br><textarea id='comment" + id + "' name='" + id + "'  />");
    let newComment = "<br><button onclick='addComment(" + id + ")'>Create the comment</button>";
    let commentDiv = $("<div class='comments' id='comments" + id + "' />");
    
    // HTML Elements append // InnerDiv = Details (default = hidden), Div = Whole Appointment (most important infos)
    innerDiv.append("<p>Description: " + appointment.description + "</p>");
    innerDiv.append("<p>Duration (in minutes): " + appointment.duration + "</p>");
    innerDiv.append("<p>Available dates: </br></p>");
    div.append("<h1>" + appointment.appName + "</h1>");
    div.append("<h3>Creator: " + appointment.creator + "</h3>");
    div.append("<h3>Location: " + appointment.location + "</h3>");
    div.append("<button type='button' class='btn btn-success' id='hideShow" + id + "' onclick='show(" + id + ")'>Show details</button>");
    div.append("<button type='button' class='btn btn-success' id='hideShowComs" + id + "' onclick='showComs(" + id + ")'>Show comments</button>")
    div.append(innerDiv.hide());
    div.append(commentDiv.hide());

    //gets today's date
    let today = new Date().toISOString().split('T')[0];
    if (appointment.latestDate < today) { //if is expired, inform and make it possible to delete the appointment
        div.append("<p style='color: red'>This appointment has already expired!</p>");
        div.append("<button type='button' class='btn btn-danger' onclick='deleteAppointment(" + id + ")'>Click here to delete this appointment</button>" )
    } else { //only if the appointment has not expired yet, should the user have the possibility to add a comment
        commentDiv.append("<label for='creator" + id + "' />Your name:</label>");
        commentDiv.append(name);
        commentDiv.append("<br><label for='comment" + id + "' />Type in your comment:</label>");
        commentDiv.append(comment);
        commentDiv.append(newComment);
    }

    // Appends new div in preexisting div in index.html
    table.append(div);
}

//creates "Comment" divs with comments
function createComment(comment) {
    //Elements declaration
    let id = comment.appointment_id;
    let commentSection = $("#comments" + id);
    let commentDiv = $("<div style='background-color: white; color: black;' />");

    // HTML Elements append
    commentDiv.append("<h5>" + comment.creator + "</h5>");
    commentDiv.append("<h6>" + comment.text + "</h6>");

    // Appends new div in preexisting comments div in index.html->table->commentDiv
    commentSection.append(commentDiv);
}

//appends available dates in non-sorted order for the user to see them (no voting available)
function createDates(dates) {
    //Elements declaration
    let id = dates.app_id;
    let section = $("#" + id);
    let date = "<p>⚪" + dates.appDate + "</p>";

    //Appends new p element with a date to the corresponding section
    section.append(date);
}

//sets the minimum date for today to each input field
function setMinimum(number) {
    //source: https://www.demo2s.com/javascript/javascript-input-datetime-local-set-min-date-to-today.html
    let dateTime = document.getElementById("appDate" + number).value;
    let today = new Date().toISOString().split('T')[0];
    today = today + "T00:00:00"
    document.getElementById("appDate" + number).setAttribute('min', today);
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

let datum = 1;

//adds another input field for date
function more() {
    datum++;
    let anotherDate = $("<input type='datetime-local' class='appDate' id='appDate" + datum + "' name='appDate" + datum + "' max='2030-12-31T23:59:59' /><br class='toDelete'>");
    $("#dates").append(anotherDate);
    setMinimum(datum);
    if (datum === 2) { //when the number of input fields is no longer 1, let the user remove one field again
        $('#btnLess').prop('disabled', false);
    } else if (datum === 5) { //when the number of input fields is increased to 5, do not let user increase it more
        $('#btnMore').prop('disabled', true);
    }
}

//removes the last input field of all for date
function less() {
    $("#appDate" + datum).remove();
    //removes the <br> after the input field (BRs are created with a class toDelete)
    $(".toDelete").last().remove();
    datum--;
    if (datum === 1) { //when the number of input fields is reduced to 1, do not let user reduce it more
        $('#btnLess').prop('disabled', true);
    } else if (datum === 4) { //when the number of input fields is no longer 5, let the user add one more field again
        $('#btnMore').prop('disabled', false);
    }
}