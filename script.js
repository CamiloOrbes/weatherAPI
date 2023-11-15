async function consumeApiWithAxios(url) {
    try {
        const response = await axios.get(url);
        console.log(`Nos dio respuesta la api ${response.status}`);
        return response;  
    } catch (error) {
        console.error(`Falló la petición a la API con error: ${error.message}`);
        return error.response; 
    }
}

async function weatherConsult(resp) {
    const respApi = await resp;
    const datos = respApi.data;
    const weatherJson = datos.weather[0].main;
    return weatherJson;
}
async function tempConsult(resp) {
    const respApi = await resp;
    const datos = respApi.data;
    const tempeatureJson = datos.main.temp;
    return tempeatureJson;
}
async function humidityConsult(resp) {
    const respApi = await resp;
    const datos = respApi.data;
    const humidityJson = datos.main.humidity;;
    return humidityJson;
}
async function windConsult(resp) {
    const respApi = await resp;
    const datos = respApi.data;
    const windJson = datos.wind.speed;
    return windJson;
}
async function cityConsult(resp) {
    const respApi = await resp;
    const datos = respApi.data;
    const cityJson = datos.name;
    return cityJson;
}
async function display(weat,temp,humi,wind,city){
    const weatherIconElement = document.querySelector('.weather-icon');
    weatherIconElement.src = `images/${weat.toLowerCase()}.png`;
    const weatherContainer = document.querySelector('.weather');
    weatherContainer.style.display = 'block';
    const tempElement = document.querySelector('.temp');
    tempElement.textContent = `${Math.round(temp)}°C`;
    const humiElement = document.querySelector('.humidity');
    humiElement.textContent = `${humi}%`;
    const windElement = document.querySelector('.wind');
    windElement.textContent = `${wind}km/h`;
    const cityElement = document.querySelector('.city');
    cityElement.textContent = `${city}`;
    var errorContainer = document.querySelector('.error');
    errorContainer.style.display = 'none';
}
const apiKey = 'd3c39f57206d5904890771c822ffaac3';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

document.querySelector('button').addEventListener('click', async function() {
    var  apiCity = document.querySelector('input[type="text"]').value.toLowerCase();
    var url = `${apiUrl}${apiCity}&appid=${apiKey}`;
    var respuestaPeticion = await consumeApiWithAxios(url);
    if (respuestaPeticion.status === 200){
        var temperature = await tempConsult(respuestaPeticion);
        var weather = await weatherConsult(respuestaPeticion);
        var humidity = await humidityConsult(respuestaPeticion);
        var wind = await windConsult(respuestaPeticion);
        var city = await cityConsult(respuestaPeticion);
        display(weather,temperature,humidity,wind,city);
    }
    else {
        var weatherContainer = document.querySelector('.weather');
        var errorContainer = document.querySelector('.error');
        weatherContainer.style.display = 'none';
        errorContainer.style.display = 'block';
    }
})
