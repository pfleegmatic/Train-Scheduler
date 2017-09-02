<script>
// Initialize Firebase ??"https://train-database.firebaseio.com/"
  var config = {
    apiKey: "AIzaSyDUFbkSrcv1by112f47fQfoTn9rUsjIGYo",
    authDomain: "project-1-dc253.firebaseapp.com",
    databaseURL: "https://project-1-dc253.firebaseio.com",
    projectId: "project-1-dc253",
    storageBucket: "project-1-dc253.appspot.com",
    messagingSenderId: "838586150577"
  };
  firebase.initializeApp(config);
  console.log(config);

  var database = firebase.database();
  console.log(database);

//create click event when user submits form
  $("#addTrainBtn").on("click", function(){

    var trainName= $("#trainNameInput").val().trim();
    var destinationName = $("#destinationInput").val().trim();
    var firstTrainTime = moment($("#trainTimeInput").val().trim(),"HH:mm").format("HH:mm");
    var frequencyTime = $("#frequencyInput").val().trim();
  
//create temp storage into an object of the user inputs; childSnapShot

var newTrainInfo = {
  name: trainName,
  place: destinationName,
  fTrainTime: firstTrainTime,
  frequency: frequencyTime
}

//upload train data to database

database.ref().push(newTrainInfo);
console.log(newTrainInfo.name);

//clears text from boxes. study .val()
$("#trainNameInput").val("");
$("#destinationInput").val("");
$("#trainTimeInput").val("");
$("#frequencyInput").val("");
//prevents going to new page
return false;
});//close add train btn event

//create firebase event
database.ref().on("child_added", function(childSnapshot){//study firebase event and  childSnapShot
  console.log(childSnapshot.val());

//store childSnapSot values into a variable

var trainName=childSnapshot.val().name;
var destinationName=childSnapshot.val().place;
var firstTrainTime=childSnapshot.val().fTrainTime;
var frequencyTime =childSnapshot.val().frequency;


//
var firstTimeConverted = moment(firstTrainTime, "HH:mm");
console.log(firstTimeConverted);

//store format in current time
var currentTime = moment().format("HH:mm");
console.log("Current time: " + currentTime);

//store time difference between current time and train arrival time in variable
var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
console.log(firstTrainTime); //store in fb
console.log("Time Difference: " + timeDifference); //store in fb

//calculate remaining time leftover and store in variable
var timeRemainder = timeDifference % frequencyTime;
console.log(timeRemainder); //store in fb

//calculate minutes until train and store in variable
var minutesTilTrain = frequencyTime - timeRemainder;//store in fb

//when is the next train?
var nextTrain = moment().add(minutesTilTrain,"minutes").format("HH:mm"); //store in fb
//add tag to #trainTable at <tbody>
$("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destinationName + "</td><td>" + nextTrain + "</td><td>" + frequencyTime + "</td><td>" + minutesTilTrain +"</td><td>");
});//close firebase on event


// <tr> tag defines a row in an HTML table.
// <td> regular cell in tale
// <th> header cell in table

//The <tbody> tag is used to group the body content in an HTML table.
//The <tbody> element is used in conjunction with the <thead> and <tfoot> elements to specify each part of a table (body, header, footer).
//Browsers can use these elements to enable scrolling of the table body independently of the header and footer. Also, when printing a large table that spans multiple pages, these elements can enable the table header and footer to be printed at the top and bottom of each page.
//The <tbody> tag must be used in the following context: As a child of a <table> element, after any <caption>, <colgroup>, and <thead> elements.

</script>

