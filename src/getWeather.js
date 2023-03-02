import { setCenter } from "./initMap";

const appId = "e210384c65b4195059196d42f46ca457";
const getWeatherByCityUrl = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeather(cityName, el) {
  const element = el;
  const weatherDataResponse = await window.fetch(
    `${getWeatherByCityUrl}?units=metric&q=${cityName}&appid=${appId}`
  );

  const weatherData = await weatherDataResponse.json();

  element.innerHTML = `
      <p>Город ${weatherData.name}</p>
      <p>Текущая температура ${weatherData.main.temp}</p>
      <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="weather" />
`;

  setCenter(weatherData);
  return weatherData;
}
