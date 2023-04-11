// Global variable declaration
//variables fro weather API
var weatherApiKey = "855fad25288edda6cdf233e97e030127";
var latitude = 0;
var longitude = 0;
var currentWeather = document.querySelector('#current-weather');
var currentWeatherContent = "";
//get the current date
const date = new Date();
var dateString = date.toLocaleDateString();

//variables for national park
var nationalParkApiKey ="wyMlD52aDKYO8sIZ8Ix3x8MlocAQp0VtIGjyGluu";
var nationalParkSearchEl = $("#NPSearch");
var inputStateIdEl = $("#stateIdInput").val();
var NPListEl = $("#NPList");
var btnListEl = $("#btnList");
var NPInfo = [];

var NPInfoConatinerEl = $("<div>").attr("id","NPInfoContainer");
var parkInfoContainer = $("#infoContainer");
parkInfoContainer.append(NPInfoConatinerEl);


var btnListEl = $("<div>").attr("id","btnList");
parkInfoContainer.append(btnListEl);
//var btnListEl = $("#btnList");

//state id search with enter keypress
$("#stateIdInput").keypress(function(event) 
{
    if(event.keyCode === 13)
    {
        event.preventDefault();
        
        $("#NPSearch").click();
    }
});

//with state ID search get the national park list from the serverside API.
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
            console.log(NPInfo[i]);
            let npListLiEl = $("<li>").attr("class","NPLists").attr("id", "listOfNp");
            NPListEl.append(npListLiEl);
            var NPDataListEl  = $("<button>").attr("type","button").attr("class","NPLists").text(NPInfo[i]).val(inputStateIdEl);
           NPDataListEl.on("click",parkSelection);
            npListLiEl.append(NPDataListEl);
            
        }
    });
    
}  
// Storing State Id search in the localstorage.
var stateIdArray = [];
nationalParkSearchEl.on("click",function (event)
{   
    event.preventDefault();
    NPInfoConatinerEl.empty();
    var inputStateIdEl =$("#stateIdInput").val();
    stateIdArray.push(inputStateIdEl);
    console.log(stateIdArray);
    localStorage.setItem("stateIdInput",JSON.stringify(stateIdArray)); 
   
    if(inputStateIdEl === "" || inputStateIdEl === undefined)
    {
        
        alert("Please Enter valid statecode to display national parks");
    }
    else 
    {       
        getNationalPark(inputStateIdEl);
        displayNpStateList();
        $("#stateIdInput").val("");
    }

});

// Get the state id search from localstorage for further click event and display on page.
function displayNpStateList()
 {
    btnListEl.empty();
    var npStateIDList = JSON.parse(localStorage.getItem("stateIdInput")) || [];
    for (let index = 0; index <  npStateIDList.length; index++) 
    {
        const element =  npStateIDList[index].toUpperCase();
        console.log(element);
        var li= $("<li>").attr("class","li-element").attr("id", "liOfStateId");
        btnListEl.append(li);
        var btnListLiEL = $("<button>").attr("type","button").attr("class","li-element").text(element);
        li.append(btnListLiEL);
        btnListLiEL.on("click",npListButton);
    }
}

function npListButton() 
{
    NPInfoConatinerEl.empty();
    var  element= $(this).text();
    console.log(element);
    getNationalPark(element);
    
}
 displayNpStateList();

//get the information of the national parks from serverside api with state id search. 
var storeNPList = [];
function parkSelection (event)
{
   
    event.preventDefault();
    
    var stateId = event.target.value;
    var parkName = event.target.textContent;
    //get the parklist stored in the local store for the further click event.
    var storeNPList = JSON.parse(localStorage.getItem("National-Park-List")) || [];
    storeNPList.push(parkName);
    console.log(storeNPList);
    //stores the park list in the local storage 
    localStorage.setItem("National-Park-List", JSON.stringify(storeNPList));
        const requestUrl = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateId + "&api_key=" + nationalParkApiKey;
        $.ajax({
            url: requestUrl,
            method: 'GET',
        }).then(function(response)
        {
            console.log(response.data);
            NPInfoConatinerEl.empty();
            
            for(var i = 0; i < response.data.length; i++ )
            {
                if(response.data[i].fullName === parkName)
                {
                    //created div card to disolay information about national park
                    var card = $("<div>").addClass("card col-12 col-md-2 ");
                    var cardBody = $("<div>").addClass("card-body p-3 NPBody");
                    card.append(cardBody);

                    //displays name of the national park with link for information
                    var npNameHeading = $("<h4>").addClass("card-title");                    
                    var parkInfoLink = $("<a>").attr("href", response.data[i].url ).attr("target", "_blank").text(response.data[i].fullName);
                    npNameHeading.append(parkInfoLink);
                    cardBody.append(npNameHeading);

                    //displays descriptin for that national park
                    var npDescriptionTitle = $("<h2>").addClass("card-text DescriptionTitle").text("Description : ");
                    cardBody.append(npDescriptionTitle);
                    let npDescription = $("<p>").addClass("card-text DescriptionPara").text(response.data[i].description);
                    cardBody.append(npDescription);

                    //displays weather information 
                    var weatherInfoTitle = $("<h2>").addClass("card-text weatherInfoTitle").text("WeatherInfo : ");
                    cardBody.append(weatherInfoTitle);
                    wetherDescription = $("<p>").addClass("card-text wetherdescriptionPara").text(response.data[i].weatherInfo);
                    cardBody.append(wetherDescription);
                
                    //Displays current weather codndition of the city
                    //var currentWeatherInfoEl = $("<button>").attr("type","button").attr("class","currentWeatherInfo").text("Current Weather Information");
                    //cardBody.append(currentWeatherInfoEl);
                    
                    latitude = response.data[i].latitude;
                    longitude = response.data[i].longitude;
                    getCurrentConditions(latitude, longitude);
                    //currentWeatherInfoEl.on("click",
                    cardBody.append(currentWeather);
                    cardBody.append(currentWeatherContent);

                    //displays actities in that national parks
                    var npActivitiesTitle = $("<h2>").addClass("card-text ActivitiesTitle").text("Activities : ");
                    cardBody.append(npActivitiesTitle);
                                        
                    let npActivitiesList = [];
                    for(var j = 0; j < response.data[i].activities.length; j++ )
                    {
                        npActivitiesList.push(response.data[i].activities[j].name);
                    }
                   
                    let npActivities = $("<p>").addClass("card-text ActivitiesPara").text(npActivitiesList.join(", "));
                    cardBody.append(npActivities);

                    NPInfoConatinerEl.append(card);
                    currentWeatherContent.replaceWith(currentWeather);                    

                }
            }
        });
     
}


//local storage clears when page reloads
function reset()
 {
    localStorage.clear();
    btnListEl.empty();
}
window.onload = reset();

//getting weather ingormation from openweathermap api   
var weatherEl = document.querySelector(".weather");
var getCurrentConditions = (latitude, longitude) => 
{
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial" + "&appid=" + weatherApiKey
    fetch(weatherURL)
    .then((response) => 
    {
    console.log(response);
    return response.json();
    })
    .then(data => 
    {
    console.log("DATA: ", data)
   
    displayCurrentConditions(data);
     return data;
    });
}

//Displays the weather information
function displayCurrentConditions (data) {    

    currentWeatherContent = document.createElement("div");
    currentWeatherContent.setAttribute('id',"weatherInfo");

    
    currentWeatherContent.append("Curent Date :" + dateString );

    let h2 = document.createElement('h2');
    h2.textContent = data.name;
    currentWeatherContent.append(h2);
    h2.classList.add('weather');

    var ul = document.createElement('ul');
    ul.textContent = "Temp:"
    currentWeatherContent.append(ul);
    ul.classList.add('weather');
    var li = document.createElement('li');
    li.textContent = data.main.temp;
    currentWeatherContent.append(li);
    li.classList.add('weatherdata');

    var ul = document.createElement('ul');
    ul.textContent = "Feels like :"
    currentWeatherContent.append(ul);
    ul.classList.add('weather');
    var li = document.createElement('li');
    li.textContent = data.main.feels_like;
    currentWeatherContent.append(li);
    li.classList.add('weatherdata');

    var ul = document.createElement('ul');
    ul.textContent = "Temp high :"
    currentWeatherContent.append(ul);
    ul.classList.add('weather');
    var li = document.createElement('li');
    li.textContent = data.main.temp_max
    currentWeatherContent.append(li);

    li.classList.add('weatherdata');
    var ul = document.createElement('ul');
    ul.textContent = "Temp low :"
    currentWeatherContent.append(ul);
    ul.classList.add('weather');
    var li = document.createElement('li');
    li.textContent = data.main.temp_min;
    currentWeatherContent.append(li);

    li.classList.add('weatherdata');
    var ul = document.createElement('ul');
    ul.textContent = "Wind speed: ";
    currentWeatherContent.append(ul);
    ul.classList.add('weather');
    var li = document.createElement('li');
    li.textContent = data.wind.speed;
    currentWeatherContent.append(li);

    li.classList.add('weatherdata');

    currentWeather.appendChild(currentWeatherContent);
    
}

