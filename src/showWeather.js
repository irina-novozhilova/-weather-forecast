import { getCurrentCity } from "./getCurrentCity";
import { getWeather } from "./getWeather";

export async function showWeather(el) {
  await getWeather(await getCurrentCity(), el);
}
