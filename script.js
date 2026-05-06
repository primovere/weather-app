const form = document.querySelector("form");
const display = document.querySelector(".display");
const addressInput = document.querySelector("#address");
const state = {
  status: "idle",
  data: null,
  error: null,
};

function setState(newState) {
  let keys = Object.keys(state);
  keys.forEach((key) => {
    if (!Object.hasOwn(newState, key)) return;
    state[key] = newState[key];
  });
  render(state);
}

async function getWeather(city) {
  const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=6699YUL929BVGXBW9L6FSM5NF&contentType=json`;
  console.log(URL);

  try {
    const response = await fetch(URL);
    const weatherData = await response.json();
    const processed = processWeatherData(weatherData);
    return {
      status: "success",
      data: processed,
      error: null,
    };
  } catch (err) {
    return {
      status: "error",
      data: null,
      error: err,
    };
  }
}

function processWeatherData(data) {
  return {
    address: data.address,
    temp: data.currentConditions.temp,
    conditions: data.currentConditions.conditions,
  };
}

function render(state) {
  switch (state.status) {
    case "idle":
      break;
    case "loading":
      display.innerHTML = `<p class='loading'>Loading</p>`;
      break;
    case "success":
      display.innerHTML = `
        <h2>${state.data.address}</h2>
        <h3>Temperature</h3>
        <span>${state.data.temp}</span>
        <h3>Weather</h3>
        <span>${state.data.conditions}</span>
        `;
      break;
    case "error":
      display.innerHTML = `<p class='error'>City not found.</p>`;
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = addressInput.value.trim();

  if (!city) return;

  setState({ status: "loading" });

  const result = await getWeather(city);

  setState(result);
});
