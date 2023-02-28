import { getCurrentCity } from "./getCurrentCity";
import { getWeather } from "./getWeather";

export async function showWeather(el) {
  getWeather(await getCurrentCity(), el);
}
