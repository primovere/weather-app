const form = document.querySelector("form");
const display = document.querySelector(".display");
const addressInput = document.querySelector("#address");

async function getWeather(city) {
  const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=6699YUL929BVGXBW9L6FSM5NF&contentType=json`;
  console.log(URL);

  try {
    const response = await fetch(URL);
    const weatherData = await response.json();
    const processed = processWeatherData(weatherData);
    return processed;
  } catch (err) {
    console.error("City not found");
  }
}

function processWeatherData(data) {
  return {
    address: data.address,
    temp: data.currentConditions.temp,
    conditions: data.currentConditions.conditions,
  };
}

function displayData(data) {
  display.innerHTML = `
  <h2>${data.address}</h2>
  <h3>Temperature</h3>
  <span>${data.temp}</span>
  <h3>Weather</h3>
  <span>${data.conditions}</span>
  `;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = addressInput.value.trim();

  if (!city) return;

  const data = await getWeather(city);

  if (!data) return;

  displayData(data);
});
