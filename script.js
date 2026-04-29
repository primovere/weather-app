async function getWeather(city) {
  const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=6699YUL929BVGXBW9L6FSM5NF&contentType=json`;
  console.log(URL);

  try {
    const response = await fetch(URL);
    const weatherData = await response.json();
    const processed = processWeatherData(weatherData);
    console.log(processed);
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
