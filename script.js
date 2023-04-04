// var button = document.getElementById('button');
// button.addEventListener('click', function() {
//     console.log('button clicked');
//     });
// Path: index.html
/* <button id="button">Click me</button> */

// Variables 
var weatherApiKey = "855fad25288edda6cdf233e97e030127";
var artistBtn = document.querySelector('#search-artist');
var cityBtn = document.querySelector('#search-city');



// this function is to get and display current weather conditions.
var getCurrentConditions = (city) => {
    var weatherURL ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherApiKey;
    fetch(weatherURL)
    .then((response) => {
    console.log(response);
    return response.json();
})
.then(data => {
    var ul = $('#city-results'); 
    
    console.log("CURR DAY: ", data);

})
    
};
// This is the search city button.
cityBtn.addEventListener("click", function () {
    // Obtain city name from the search box
    var city = $('#city-input').val();
    getCurrentConditions(city);
});

$( function() {
    $( "#datepicker" ).datepicker();
  } );
