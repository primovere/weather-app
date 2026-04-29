async function getWeather(city) {
  const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=6699YUL929BVGXBW9L6FSM5NF&contentType=json`;
  console.log(URL);

  try {
    const response = await fetch(URL);
    const weatherData = await response.json();
    console.log(weatherData);
  } catch (err) {
    console.error("City not found");
  }
}
