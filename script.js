// Variables 
var weatherApiKey = "855fad25288edda6cdf233e97e030127";
var latitude = 0;
var longitude = 0;
var currentWeather = document.querySelector('#current-weather');

//variables for national park
var nationalParkApiKey ="wyMlD52aDKYO8sIZ8Ix3x8MlocAQp0VtIGjyGluu";
var nationalParkSearchEl = $("#NPSearch");
var inputStateIdEl = $("#stateIdInput").val();
var NPListEl = $("#NPList");
var NPInfo = [];
var NPList = document.querySelector('#NPList');
var inputStateId = document.querySelector('#stateIdInput');


var NPInfoConatinerEl = $("<div>").attr("id","NPInfoContainer");
var parkInfoContainer = $("#infoContainer");
parkInfoContainer.append(NPInfoConatinerEl);


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

        NPListEl.empty();
        NPInfo = [];
        
        for(var i = 0; i < response.data.length; i++ )
        {
        
            NPInfo.push(response.data[i].fullName);
            console.log(NPInfo);
          // NPListEl.append("<li>" + NPInfo[i] + "</li>");
            var NPDataListEl  = $("<button>").attr("type","button").attr("class","NPList").text(NPInfo[i]).val(inputStateIdEl);
             NPListEl.append(NPDataListEl);
             NPDataListEl.on("click",parkSelection);
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


// get history from local storage if any
// searchEl.addEventListener("click", function () {
//     const searchTerm = cityEl.value;
//     getWeather(searchTerm);
//     searchHistory.push(searchTerm);
//     localStorage.setItem("search", JSON.stringify(searchHistory));
//     renderSearchHistory();
// });




function parkSelection (event)
{
    event.preventDefault();
    console.log(event.target.value);
    console.log(event.target.textContent);
    var stateId = event.target.value;
    var parkName = event.target.textContent;

    var storeNPList = JSON.parse(localStorage.getItem("National-Park-List")) || [];
    storeNPList.push(parkName);
    localStorage.setItem("National-Park-List", JSON.stringify(storeNPList));
        const requestUrl = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateId + "&api_key=" + nationalParkApiKey;
        $.ajax({
            url: requestUrl,
            method: 'GET',
        }).then(function(response)
        {
            console.log(response.data);
            NPInfoConatinerEl.empty();
            latitude = response.data.latitude;
            longitude = response.data.longitude; 
            getCurrentConditions(latitude, longitude); 
            for(var i = 0; i < response.data.length; i++ )
            {
                if(response.data[i].fullName === parkName)
                {
                    var card = $("<div>").addClass("card col-12 col-md-2 ");
                    var cardBody = $("<div>").addClass("card-body p-3 NPBody");
                    var NPName = $("<h4>").addClass("card-title").text(response.data[i].fullName);
                    var NPDescription = $("<p>").addClass("card-text Description").text("Description : " + response.data[i].description );
                    var NPActivities = $("<p>").addClass("card-text Activities").text("Activities : " + response.data[i].activities[i].name);
                    
                    cardBody.append(NPName, NPDescription, NPActivities);
                    card.append(cardBody);
                     NPInfoConatinerEl.append(card);
                }
            }
        });
     
}



    




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

