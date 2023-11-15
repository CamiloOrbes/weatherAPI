async function consumeApiWithAxios(url) {
    try {
        const response = await axios.get(url);
        console.log(`Nos dio respuesta la api ${response.status}`);
        return response;
    } catch (error) {
        console.error(`Falló la petición a la API con error: ${error.message}`);
        alert("Ese pokemon no existe, revisa la ortografia,");
        return null; 
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
async function display(weat,temp){
    const weatherIconElement = document.querySelector('.weather-icon');
    weatherIconElement.src = `images/${weat.toLowerCase()}.png`;
    const weatherContainer = document.querySelector('.weather');
    weatherContainer.style.display = 'block';
    const tempElement = document.querySelector('.temp');
    tempElement.textContent = `${Math.round(temp)}°C`;
}
const apiKey = 'd3c39f57206d5904890771c822ffaac3';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

document.querySelector('button').addEventListener('click', async function() {
    var  ciudad = document.querySelector('input[type="text"]').value.toLowerCase();
    var url = `${apiUrl}${ciudad}&appid=${apiKey}`;
    var respuestaPeticion = await consumeApiWithAxios(url);
    var temperature = await tempConsult(respuestaPeticion);
    var weather = await weatherConsult(respuestaPeticion);
    display(weather,temperature);


})
