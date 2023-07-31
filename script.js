const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const temp_min = document.getElementById('temp_min');
const temp_max = document.getElementById('temp_max');
const feels_like = document.getElementById('feels_like');
const pressure = document.getElementById('pressure');

const deg = document.getElementById('deg');
const visibility = document.getElementById('visibility');
const lat = document.getElementById('lat');
const lon = document.getElementById('lon');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');
const weather = document.querySelector('.weather');
const weather2 = document.querySelector('.weather2');

async function checkWeather(city) {
    const api_key = "79e2edb17a3303917391a690038c242c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());


    if (weather_data.cod === `404`) {
        weather.style.display = "none";
        location_not_found.style.display = "flex";
        weather2.style.display = "none";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    weather.style.display = "flex";
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    weather2.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    temp_min.innerHTML = `${(weather_data.main.temp_min - 273.15).toFixed(2)}°C`;
    temp_max.innerHTML = `${(weather_data.main.temp_max - 273.15).toFixed(2)}°C`;
    feels_like.innerHTML = `${Math.round(weather_data.main.feels_like - 273.15)}°C`;
    pressure.innerHTML = `${weather_data.main.pressure}mbar`;

    deg.innerHTML = `${weather_data.wind.deg}°`;
    visibility.innerHTML = `${weather_data.visibility / 1000}km`;
    lat.innerHTML = `${weather_data.coord.lat}°N`;
    lon.innerHTML = `${weather_data.coord.lon}°E`;

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "/img/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "/img/clear.png";
            break;
        case 'Rain':
            weather_img.src = "/img/rain.png";
            break;
        case 'Haze':
            weather_img.src = "/img/haze.png";
            break;
        case 'Snow':
            weather_img.src = "/img/snow.png";
            break;
        case 'Thunderstorm':
            weather_img.src = "/img/thunderstorm.png";
            break;

    }

    console.log(weather_data);
}


searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});