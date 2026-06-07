const apikey ="7474f21bd418e228810b653fee97ded4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon")
async function checkWeather(city) {

    const response = await fetch(apiUrl + city +`&appid=${apikey}`);

    if(response.status == 404){

        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }
    else{
        var data = await response.json();

    console.groupCollapsed(data);

    document.querySelector(".city").innerHTML =data.name;
    document.querySelector(".temp").innerHTML =Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML =data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =data.wind.speed + "km/hr";

    if(data.weather[0].main == "Clouds"){
        weathericon.src ="img/cloudy.png";
    }
    else if(data.weather[0].main == "Clear"){
        weathericon.src = "img/sun.png";
    }
     else if(data.weather[0].main == "Rain"){
        weathericon.src = "img/rain.png";
    }
     else if(data.weather[0].main == "Drizzle"){
        weathericon.src = "img/sunny-rain.png";
    }
     else if(data.weather[0].main == "Snow"){
        weathericon.src = "img/snow.png";
    }
     else if(data.weather[0].main == "Mist"){
        weathericon.src = "img/fog.png";
    }

        document.querySelector(".error").style.display = "none"
        document.querySelector(".weather").style.display = "block"
    }
      
} 

searchbtn.addEventListener("click", () =>{

    checkWeather(searchbox.value);
})

let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let day = document.getElementById("day");
let date = document.getElementById("date");
let month = document.getElementById("month");
let year = document.getElementById("year");

function updateDateTime() {
    let currenttime = new Date();
    
    const daynum = currenttime.getDay();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    day.innerHTML = days[daynum];

    date.innerHTML = currenttime.getDate();
    month.innerHTML = currenttime.getMonth() + 1;
    year.innerHTML = currenttime.getFullYear();

    // Format with leading zeros if needed
    hrs.innerHTML = String(currenttime.getHours()).padStart(2, '0');
    min.innerHTML = String(currenttime.getMinutes()).padStart(2, '0');
}

// Call once immediately
updateDateTime();

// Update every minute
setInterval(updateDateTime, 60000);

