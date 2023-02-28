import { getWeather } from "./getWeather";
import * as mockData from "./mockData";

describe("getWeather", () => {
  let el;
  let fetchSpy;

  beforeEach(() => {
    window.fetch = () => {};
    jest.clearAllMocks();
    el = document.createElement("div");
    fetchSpy = jest.spyOn(window, "fetch");
    fetchSpy.mockResolvedValue({
      json: () => Promise.resolve(mockData.weatherData),
    });
  });

  it("is a function", () => {
    expect(getWeather).toBeInstanceOf(Function);
  });

  it("makes call for weather", () => {
    getWeather("Saratov", el);
    expect(window.fetch).toHaveBeenCalledWith(
      "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Saratov&appid=e210384c65b4195059196d42f46ca457"
    );
  });

  it("get city 'Saratov', icon '04d', temp '-6.14'", async () => {
    const result = await getWeather("Saratov", el);

    expect(result.name).toBe("Saratov");
    expect(result.weather[0].icon).toBe("04d");
    expect(result.main.temp).toBe(-6.14);
  });

  it("has valid html", async () => {
    await getWeather("Saratov", el);
    expect(el.querySelectorAll("p")[0].innerHTML.indexOf("Город")).not.toBe(-1);
    expect(
      el.querySelectorAll("p")[1].innerHTML.indexOf("Текущая температура")
    ).not.toBe(-1);
    expect(el.querySelector("img")).toBeTruthy();
  });

  it("create basic markup", async () => {
    await getWeather("Saratov", el);
    expect(el.querySelectorAll("p")[0].innerHTML.indexOf("Saratov")).not.toBe(
      -1
    );
    expect(el.querySelectorAll("p")[1].innerHTML.indexOf("-6.14")).not.toBe(-1);
    expect(el.querySelector("img").getAttribute("src")).toBe(
      "http://openweathermap.org/img/wn/04d@2x.png"
    );
  });
});
