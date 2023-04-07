// Variables 
var weatherApiKey = "855fad25288edda6cdf233e97e030127";
var currentWeather = document.querySelector('#current-weather');

//variables for national park
var nationalParkApiKey ="wyMlD52aDKYO8sIZ8Ix3x8MlocAQp0VtIGjyGluu";
var nationalParkSearchEl = $("#NPSearch");
var inputStateIdEl = $("#stateIdInput").val();
var NPListEl = $("#NPList");
var NPInfo = [];
var NPList = document.querySelector('#NPList');
var inputStateId = document.querySelector('#stateIdInput');


$("#stateIdInput").keypress(function(event) 
{
    if(event.keyCode === 13)
    {
        event.preventDefault();
        $("#NPSearch").click();
    }
});

var getNationalPark = function(inputStateIdEl)
{
    
    const requestUrl = "https://developer.nps.gov/api/v1/parks?stateCode=" + inputStateIdEl + "&api_key=" + nationalParkApiKey;
    $.ajax({
        url: requestUrl,
        method: 'GET',
    }).then(function(response)
    {
        console.log(response.data);

        // getCurrentConditions(data.latitude.longitude);
        NPListEl.empty();
        NPInfo = [];

        for(var i = 0; i < response.data.length; i++ ){
        
            NPInfo.push(response.data[i].fullName);
        console.log(NPInfo);
       // NPListEl.append("<li>" + NPInfo[i] + "</li>");
      var  NPDataListEl  = $("<button>").attr("type","button").attr("class","NPList").text(NPInfo[i]);

           NPListEl.append(NPDataListEl);
        }
    });
}    

nationalParkSearchEl.on("click",function (event) {
    
    event.preventDefault();
    var inputStateIdEl =$("#stateIdInput").val();
    localStorage.setItem("stateIdInput", inputStateIdEl);
    localStorage.getItem("stateIdInput");
    if(inputStateIdEl === "")
    {
        alert("Please Enter valid statecode to display national parks");
    }
    else {
        
        getNationalPark(inputStateIdEl);
        
        $("#stateIdInput").val("");
    }
});

NPListEl.on("click","NPList", function (event)
{
    event.preventDefault();

});



var getCurrentConditions = (latitude, longitude) => {
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + weatherApiKey
    fetch(weatherURL)
    .then((response) => {
    console.log(response);
    return response.json();
})
.then(data => {
     console.log("CURR DAY: ", data);
    //  displayCurrentConditions(data);
})}
    
// };
// this function is to display the city name, temp, and an icon. the function is getting called on line 26, so that I can use the data from the getcurrentconditions function.
// function displayCurrentConditions (data) {
//     let h2 = document.createElement('h2');
//     h2.textContent = data.name;
//     currentWeather.append(h2);
//     h2.classList.add('city-weather');
//     var ul = document.createElement('ul');
//     ul.textContent = "Temp:"
//     currentWeather.append(ul);
//     ul.classList.add('city-weather');
//     var li = document.createElement('li');
//     li.textContent = data.main.temp;
//     currentWeather.append(li);
//     li.classList.add('city-weather');
//     var img = document.createElement('img');
//     img.imgContent = data.weather[0].icon
//     currentWeather.append('img');
  
   
    
// }
// // This is the search city button.
// cityBtn.addEventListener("click", function () {
//     // Obtain city name from the search box
//     var city = $('#city-input').val();
//     getCurrentConditions(city);
// });

