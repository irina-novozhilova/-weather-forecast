import { getCurrentCity } from "./getCurrentCity";
import { getWeather } from "./getWeather";
import { initMap } from "./initMap";

export async function showWeather(el) {
  const weatherData = await getWeather(await getCurrentCity(), el);

  initMap(weatherData);
}
