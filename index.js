const weatherForm = document.getElementById("weatherForm")
const cityInput = document.getElementById("cityInput")
const card = document.getElementById("card")
const apiKey = "d536e02dde78666729b749c2c6b80526"

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();
    const cityName = cityInput.value;

    if(cityName){
        try{
            const weatherData = await getWeatherData(cityName)
            displayWeatherData(weatherData);
        }
        catch(error){
            console.error(error);
            errorMessage(error);
        }
    }
    else{
        errorMessage("Please enter a city name")
    }
})


async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data") 
    }

    return await response.json()
}


function displayWeatherData(data){
    console.log(data)

    const {name : city, main : {temp, humidity}, weather : [{description, id}]} = data;

    const cityNameDisplay = document.createElement("h1")
    const temperatureDisplay = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const descriptionDisplay = document.createElement("p")
    const weatherEmoji = document.createElement("p")

    card.textContent = ""
    card.style.display = "flex"

    cityNameDisplay.textContent = city;
    cityNameDisplay.classList.add("cityNameDisplay")

    temperatureDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    temperatureDisplay.classList.add("temperatureDisplay")

    humidityDisplay.textContent = `Humidity: ${humidity}`;
    humidityDisplay.classList.add("humidityDisplay")

    descriptionDisplay.textContent = description;
    descriptionDisplay.classList.add("descriptionDisplay")

    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji")

    card.appendChild(cityNameDisplay)
    card.appendChild(temperatureDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(descriptionDisplay)
    card.appendChild(weatherEmoji)
}

function getWeatherEmoji(id){

    switch(true){
        case (id >= 200 && id <= 300):
            return "⛈️"
        case (id >= 300 && id <= 400):
            return "🌦️"
        case (id >= 500 && id <= 600):
            return "🌧️"
        case (id >= 600 && id <= 700):
            return "❄️"
        case (id >= 700 && id <= 800):
            return "🌫️"
        case (id === 800):
            return "☀️"
        case (id >= 801 && id <= 810):
            return "☁️"
    }
    
}

function errorMessage(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex"
    card.appendChild(errorDisplay);
}