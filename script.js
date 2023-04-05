// Variables 
var weatherApiKey = "855fad25288edda6cdf233e97e030127";
var trailBtn = document.querySelector('#search-trail');
var cityBtn = document.querySelector('#search-city');
var currentWeather = document.querySelector('#current-weather');



// this function is to get current weather conditions.
var getCurrentConditions = (city) => {
    var weatherURL ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + weatherApiKey;
    fetch(weatherURL)
    .then((response) => {
    console.log(response);
    return response.json();
})
.then(data => {
     console.log("CURR DAY: ", data);
     displayCurrentConditions(data);
})
    
};
// this function is to display the city name, temp, and an icon. the function is fetting called on line 26, so that I can use the data from the getcurrentconditions function.
function displayCurrentConditions (data) {
    let h2 = document.createElement('h2');
    h2.textContent = data.name;
    currentWeather.append(h2);
    h2.classList.add('city-weather');
    var ul = document.createElement('ul');
    ul.textContent = "Temp:"
    currentWeather.append(ul);
    ul.classList.add('city-weather');
    var li = document.createElement('li');
    li.textContent = data.main.temp;
    currentWeather.append(li);
    li.classList.add('city-weather');
    var img = document.createElement('img');
    img.imgContent = data.weather[0].icon
    currentWeather.append('img');
  
   
    
}
// This is the search city button.
cityBtn.addEventListener("click", function () {
    // Obtain city name from the search box
    var city = $('#city-input').val();
    getCurrentConditions(city);
});

$( function() {
    $( "#datepicker" ).datepicker();
  } );
